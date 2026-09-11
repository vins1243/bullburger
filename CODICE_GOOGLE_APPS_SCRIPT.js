/**
 * BACKEND GOOGLE APPS SCRIPT - BULL BURGER
 * Gestione automatica prenotazioni a capienza tavoli (50 tavoli da 2 posti = 100 posti max)
 * Turni: 1° Turno (20:00 - 21:30) | 2° Turno (dalle 21:30 in poi)
 *
 * Istruzioni:
 * 1. Apri il tuo Foglio Google "Prenotazioni Bull Burger - Gestione Tavoli"
 * 2. Vai su Estensioni > Apps Script
 * 3. Cancella tutto e incolla questo codice
 * 4. Clicca su Esegui Deploy > Nuovo Deploy
 * 5. Seleziona tipo: "Applicazione web" (Web app)
 * 6. Esegui come: "Me" (Il tuo account Google)
 * 7. Chi ha accesso: "Chiunque" (Anyone)
 * 8. Clicca "Esegui deploy", autorizza e copia l'URL della Web App generato.
 */

const MAX_TABLES = 50; // 50 tavoli da 2 persone = 100 posti complessivi

// Calcola quanti tavoli da 2 occupa una prenotazione (es. 1-2 pers -> 1 tavolo, 3-4 -> 2 tavoli, 5-6 -> 3 tavoli)
function calculateTables(guests) {
  const g = parseInt(guests, 10) || 1;
  return Math.ceil(g / 2);
}

// Normalizza data in formato ISO YYYY-MM-DD
function normalizeDate(d) {
  if (!d) return '';
  if (d instanceof Date) {
    return Utilities.formatDate(d, "GMT+2", "yyyy-MM-dd");
  }
  const s = String(d).trim();
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return m[0];
  const mIt = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (mIt) {
    return mIt[3] + '-' + mIt[2].padStart(2, '0') + '-' + mIt[1].padStart(2, '0');
  }
  return s;
}

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Prenotazioni") || SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const rows = sheet.getDataRange().getValues();
    const params = e ? e.parameter : {};

    // 1. VERIFICA DISPONIBILITÀ IN TEMPO REALE
    if (params && params.action === "check_availability") {
      const targetDate = normalizeDate(params.date);
      const guests = parseInt(params.guests, 10) || 2;
      const tablesNeeded = calculateTables(guests);

      let occupiedTurno1 = 0;
      let occupiedTurno2 = 0;

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row[0]) continue;
        const rowDate = normalizeDate(row[4]);
        const status = String(row[8] || '').trim().toLowerCase();

        // Conta solo prenotazioni attive/confermate (esclude Annullate o Rifiutate)
        if (rowDate === targetDate && status !== 'annullata' && status !== 'rifiutata') {
          const turno = String(row[5] || '').toLowerCase();
          const tablesInRow = parseInt(row[7], 10) || calculateTables(row[6]);

          if (turno.includes("20:00") || turno.includes("1") || turno.includes("21:30")) {
            if (turno.includes("20:00") || (turno.includes("1") && !turno.includes("dalle 21:30"))) {
              occupiedTurno1 += tablesInRow;
            } else {
              occupiedTurno2 += tablesInRow;
            }
          }
        }
      }

      const leftTurno1 = Math.max(0, MAX_TABLES - occupiedTurno1);
      const leftTurno2 = Math.max(0, MAX_TABLES - occupiedTurno2);

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        date: targetDate,
        guests: guests,
        tablesNeeded: tablesNeeded,
        turno1: {
          id: "20:00",
          name: "1° Turno (20:00 - 21:30)",
          tablesLeft: leftTurno1,
          available: (tablesNeeded <= leftTurno1)
        },
        turno2: {
          id: "21:30",
          name: "2° Turno (dalle 21:30)",
          tablesLeft: leftTurno2,
          available: (tablesNeeded <= leftTurno2)
        }
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 2. ELENCO TUTTE LE PRENOTAZIONI (PER IL PANNELLO GESTIONALE)
    const data = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row[0]) continue;

      data.push({
        id: String(row[0]),
        created_at: String(row[1]),
        name: String(row[2]),
        phone: String(row[3]),
        date: normalizeDate(row[4]),
        time: String(row[5]),
        guests: String(row[6]),
        tables: String(row[7] || calculateTables(row[6])),
        status: String(row[8] || 'Confermata'),
        notes: String(row[9] || '')
      });
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success", data: data }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  // Lock concorrenza per evitare overbooking simultaneo
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000); // attende fino a 15 secondi per completare l'operazione in sicurezza
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Prenotazioni") || SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const payload = JSON.parse(e.postData.contents);

    // AGGIORNAMENTO STATO (da pannello di gestione)
    if (payload.action === "update_status") {
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(payload.id)) {
          sheet.getRange(i + 1, 9).setValue(payload.status);
          return ContentService.createTextOutput(JSON.stringify({ status: "success", updated: true }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ status: "not_found" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ELIMINAZIONE PRENOTAZIONE
    if (payload.action === "delete_booking") {
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(payload.id)) {
          sheet.deleteRow(i + 1);
          return ContentService.createTextOutput(JSON.stringify({ status: "success", deleted: true }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ status: "not_found" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // NUOVA PRENOTAZIONE IMMEDIATA AUTOMATICA
    const targetDate = normalizeDate(payload.date);
    const guests = parseInt(payload.guests, 10) || 2;
    const tablesNeeded = calculateTables(guests);
    const chosenTurno = String(payload.time || '').trim();

    // Ricalcola tavoli attualmente occupati per verificare capienza
    const rows = sheet.getDataRange().getValues();
    let occupied = 0;

    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      if (!r[0]) continue;
      const rDate = normalizeDate(r[4]);
      const status = String(r[8] || '').trim().toLowerCase();

      if (rDate === targetDate && status !== 'annullata' && status !== 'rifiutata') {
        const rTurno = String(r[5] || '').toLowerCase();
        const rTables = parseInt(r[7], 10) || calculateTables(r[6]);

        const isSameTurno1 = (chosenTurno.includes("20:00") && (rTurno.includes("20:00") || (rTurno.includes("1") && !rTurno.includes("dalle 21:30"))));
        const isSameTurno2 = (chosenTurno.includes("21:30") && (rTurno.includes("21:30") || rTurno.includes("2")));

        if (isSameTurno1 || isSameTurno2) {
          occupied += rTables;
        }
      }
    }

    // Se non ci sono abbastanza tavoli liberi
    if ((occupied + tablesNeeded) > MAX_TABLES) {
      const left = Math.max(0, MAX_TABLES - occupied);
      return ContentService.createTextOutput(JSON.stringify({
        status: "full",
        message: "Spiacenti, i tavoli disponibili per questo turno sono esauriti.",
        tablesLeft: left
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Ci sono tavoli disponibili -> REGISTRA SUBITO COME CONFERMATA
    const bookingId = payload.id || ('BULL_' + Date.now());
    const createdAt = new Date().toLocaleString('it-IT');
    const displayTurno = chosenTurno.includes("20:00") ? "1° Turno (20:00 - 21:30)" : "2° Turno (dalle 21:30)";

    const newRow = [
      bookingId,
      createdAt,
      payload.name || '',
      payload.phone || '',
      targetDate,
      displayTurno,
      guests,
      tablesNeeded,
      'Confermata',
      payload.notes || ''
    ];

    sheet.appendRow(newRow);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      confirmed: true,
      bookingId: bookingId,
      tablesAssigned: tablesNeeded,
      tablesLeft: (MAX_TABLES - (occupied + tablesNeeded))
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
