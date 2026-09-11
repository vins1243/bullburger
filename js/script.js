/**
 * JAVASCRIPT PRINCIPALE - Bullburger
 * Gestione prenotazioni con scambiatore di data, messaggi WhatsApp in grassetto e sync controllata.
 */

const STORAGE_KEY = 'bullburger_prenotazioni_db';

document.addEventListener('DOMContentLoaded', () => {
  renderCommonData();
  renderHighlights();
  renderStory();
  renderPhilosophy();
  renderGallery();
  renderMenu();
  renderContactMap();
  initNavigation();
  initReservationForm();
  initAdminDashboard();
});

function getGoogleSheetEndpoint() {
  if (SITE_CONFIG.googleSheetEndpoint && SITE_CONFIG.googleSheetEndpoint.trim() !== '') {
    return SITE_CONFIG.googleSheetEndpoint.trim();
  }
  return "https://script.google.com/macros/s/AKfycbywuk8Mgl7oeB8vrXjmsftYINLiRTpuRNToJYdur0TDXJTXAvJXA_9GfmGeuQuwT80h/exec";
}

// Pulizia numero per WhatsApp
function formatWhatsAppNumber(phone) {
  if (!phone) return '';
  let cleaned = String(phone).replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0039')) {
    cleaned = cleaned.substring(4);
  } else if (cleaned.startsWith('39') && cleaned.length > 10) {
    cleaned = cleaned.substring(2);
  }
  return '39' + cleaned;
}

// Conversione in formato ISO YYYY-MM-DD per confronti precisi
function toIsoDate(d) {
  if (!d) return '';
  let s = String(d).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (m) {
    return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`;
  }
  if (s.includes('GMT')) {
    try {
      const dt = new Date(s);
      if (!isNaN(dt.getTime())) {
        const y = dt.getFullYear();
        const mo = String(dt.getMonth() + 1).padStart(2, '0');
        const day = String(dt.getDate()).padStart(2, '0');
        return `${y}-${mo}-${day}`;
      }
    } catch(e) {}
  }
  return s;
}

// Data formattata in italiano per display (es. 15/09/2026)
function formatItalianDate(d) {
  const iso = toIsoDate(d);
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    const p = iso.split('-');
    return `${p[2]}/${p[1]}/${p[0]}`;
  }
  return d;
}

// Data leggibile estesa (es. "Giovedì, 17 Settembre 2026")
function formatFriendlyDate(isoDate) {
  if (!isoDate || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return 'Tutte le date';
  const p = isoDate.split('-');
  const dt = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const str = dt.toLocaleDateString('it-IT', options);
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function cleanTime(t) {
  if (!t) return '';
  let s = String(t).trim();
  if (s.includes('GMT')) {
    try {
      const dt = new Date(s);
      if (!isNaN(dt.getTime())) {
        return `${String(dt.getHours()).padStart(2, '0')}:${String(dt.getMinutes()).padStart(2, '0')}`;
      }
    } catch(e) {}
  }
  return s;
}

// Normalizza e pulisce le prenotazioni
function normalizeBooking(b) {
  if (!b) return null;

  if (typeof b.name === 'string' && b.name.includes(',') && b.name.includes('book_')) {
    const p = b.name.split(',');
    if (p.length >= 7) {
      return {
        id: p[0].trim(),
        created_at: p[1].trim() + ' ' + p[2].trim(),
        name: p[3].trim(),
        phone: p[4].trim(),
        date: toIsoDate(p[5]),
        time: cleanTime(p[6]),
        guests: p[7].trim(),
        notes: p[8] ? p[8].trim() : '',
        status: b.status || (p[9] ? p[9].trim() : 'In attesa')
      };
    }
  }

  return {
    id: String(b.id || ('book_' + Date.now())),
    created_at: String(b.created_at || ''),
    name: String(b.name || 'Cliente'),
    phone: String(b.phone || ''),
    date: toIsoDate(b.date),
    time: cleanTime(b.time),
    guests: String(b.guests || ''),
    notes: String(b.notes || ''),
    status: String(b.status || 'In attesa')
  };
}

function renderCommonData() {
  document.querySelectorAll('[data-brand-name]').forEach(el => el.textContent = SITE_CONFIG.brand.name);
  document.querySelectorAll('[data-contact-address]').forEach(el => {
    el.textContent = SITE_CONFIG.contact.address + ', ' + SITE_CONFIG.contact.cap + ' ' + SITE_CONFIG.contact.city + ' (' + SITE_CONFIG.contact.province + ')';
    if (el.tagName === 'A') {
      el.href = SITE_CONFIG.contact.mapsPlaceUrl || 'https://www.google.com/maps/place/Bull+Burger/@39.8053935,16.3968208,13z/data=!4m21!1m14!4m13!1m4!2m2!1d16.3879341!2d39.8195049!4e1!1m6!1m2!1s0x133f5fc4a03ec043:0x80ad513960d73089!2sBull+Burger,+Via+Nazionale,+S.da+Statale+106+Jonica,+87076+Villapiana+Lido+CS!2m2!1d16.4871083!2d39.8060219!3e0!3m5!1s0x133f5fc4a03ec043:0x80ad513960d73089!8m2!3d39.8060219!4d16.4871083!16s%2Fg%2F11gjj9by7s?entry=ttu';
      el.target = '_blank';
      el.rel = 'noopener';
    }
  });
  document.querySelectorAll('[data-contact-hours]').forEach(el => el.textContent = SITE_CONFIG.contact.hours);

  document.querySelectorAll('.social-fb').forEach(a => {
    a.href = SITE_CONFIG.socials.facebook;
    a.target = '_blank';
    a.rel = 'noopener';
  });
  document.querySelectorAll('.social-ig').forEach(a => {
    a.href = SITE_CONFIG.socials.instagram;
    a.target = '_blank';
    a.rel = 'noopener';
  });
}

function renderHighlights() {
  const container = document.getElementById('highlights-container');
  if (!container || !SITE_CONFIG.highlights) return;

  container.innerHTML = SITE_CONFIG.highlights.map(item => `
    <div class="highlight-card">
      <div class="highlight-num">${item.number}</div>
      <h3 class="highlight-title">${item.title}</h3>
      <p class="highlight-text">${item.text}</p>
    </div>
  `).join('');
}

function renderStory() {
  const titleEl = document.getElementById('story-title');
  const bodyEl = document.getElementById('story-paragraphs');
  if (titleEl && SITE_CONFIG.story) titleEl.textContent = SITE_CONFIG.story.title;
  if (bodyEl && SITE_CONFIG.story) {
    bodyEl.innerHTML = SITE_CONFIG.story.paragraphs.map(p => `<p>${p}</p>`).join('');
  }
}

function renderPhilosophy() {
  const titleEl = document.getElementById('philosophy-title');
  const textEl = document.getElementById('philosophy-text');
  if (titleEl && SITE_CONFIG.philosophy) titleEl.textContent = SITE_CONFIG.philosophy.title;
  if (textEl && SITE_CONFIG.philosophy) textEl.textContent = SITE_CONFIG.philosophy.text;
}

function renderGallery() {
  const container = document.getElementById('gallery-container');
  if (!container || !SITE_CONFIG.gallery) return;

  container.innerHTML = SITE_CONFIG.gallery.map(item => `
    <div class="gallery-item">
      <img src="${item.url}" alt="${item.caption}" loading="lazy">
      <div class="gallery-overlay">
        <span class="gallery-caption">${item.caption}</span>
      </div>
    </div>
  `).join('');
}

function renderMenu() {
  const tabsContainer = document.getElementById('menu-tabs');
  const listContainer = document.getElementById('menu-category-list');
  if (!tabsContainer || !listContainer || !SITE_CONFIG.menu) return;

  const totalItems = SITE_CONFIG.menu.categories.reduce((sum, c) => sum + c.items.length, 0);

  tabsContainer.innerHTML = `
    <button class="menu-tab-btn active" data-category="all">TUTTO IL MENU (${totalItems})</button>
    ${SITE_CONFIG.menu.categories.map(cat => `
      <button class="menu-tab-btn" data-category="${cat.id}">${cat.name} (${cat.items.length})</button>
    `).join('')}
  `;

  function displayCategories(filterId) {
    const categoriesToDisplay = filterId === 'all' 
      ? SITE_CONFIG.menu.categories 
      : SITE_CONFIG.menu.categories.filter(c => c.id === filterId);

    listContainer.innerHTML = categoriesToDisplay.map(cat => `
      <div class="menu-category-group" id="cat-${cat.id}">
        <h3 class="category-title">${cat.name}</h3>
        <p class="category-subtitle">${cat.subtitle}</p>
        <div class="menu-items-grid">
          ${cat.items.map(dish => `
            <div class="menu-card">
              <div class="menu-card-info">
                <div class="menu-item-header">
                  <h4 class="menu-item-name">${dish.name}</h4>
                  <span class="menu-item-price">${dish.price}</span>
                </div>
                <p class="menu-item-desc">${dish.description}</p>
                <div class="menu-tags">
                  ${dish.tags.map(t => `<span class="tag-badge">${t}</span>`).join('')}
                </div>
              </div>
              ${dish.image ? `
                <div class="menu-card-thumb">
                  <img src="${dish.image}" alt="${dish.name}" loading="lazy">
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  displayCategories('all');

  tabsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-tab-btn')) {
      document.querySelectorAll('.menu-tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const catId = e.target.getAttribute('data-category');
      displayCategories(catId);
    }
  });
}

function renderContactMap() {
  const mapIframe = document.getElementById('maps-iframe');
  if (mapIframe && SITE_CONFIG.contact) {
    mapIframe.src = SITE_CONFIG.contact.mapsEmbedUrl;
  }
}

function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

function initReservationForm() {
  const form = document.getElementById('reservation-form');
  const successCard = document.getElementById('booking-success-card');
  if (!form) return;

  const dateInput = document.getElementById('res-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('res-name').value.trim();
    const phone = document.getElementById('res-phone').value.trim();
    const date = document.getElementById('res-date').value;
    const time = document.getElementById('res-time').value;
    const guests = document.getElementById('res-guests').value;
    const email = document.getElementById('res-email') ? document.getElementById('res-email').value.trim() : '';
    const notes = document.getElementById('res-notes') ? document.getElementById('res-notes').value.trim() : '';

    const tablesNeeded = Math.ceil(parseInt(guests, 10) / 2);
    const bookingId = 'BULL_' + Date.now();

    const booking = {
      id: bookingId,
      created_at: new Date().toLocaleString('it-IT'),
      name: name,
      phone: phone,
      date: date,
      time: time,
      guests: guests,
      tables: tablesNeeded,
      email: email,
      notes: notes,
      status: 'Confermata'
    };

    saveBookingLocally(booking);

    // Sincronizzazione con Google Sheet via Google Apps Script (POST + GET Fallback)
    const endpoint = getGoogleSheetEndpoint();
    if (endpoint) {
      // 1. POST
      fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(booking)
      }).catch(err => console.log('Sincronizzazione POST Sheet:', err));

      // 2. GET Fallback (garantisce al 100% l'inserimento senza blocchi CORS su Safari mobile)
      const getParams = new URLSearchParams({
        action: 'book',
        id: booking.id,
        name: booking.name,
        phone: booking.phone,
        date: booking.date,
        time: booking.time,
        guests: booking.guests,
        tables: String(booking.tables),
        notes: booking.notes
      });
      fetch(endpoint + '?' + getParams.toString(), { mode: 'no-cors' })
        .catch(err => console.log('Sincronizzazione GET Sheet:', err));
    }

    // Mostra schermata di conferma immediata (senza WhatsApp)
    if (successCard) {
      const displayTurno = time.includes("20:00") ? "1° Turno (20:00 - 21:30)" : "2° Turno (dalle 21:30)";
      if (document.getElementById('confirmed-date-time')) {
        document.getElementById('confirmed-date-time').textContent = `${formatItalianDate(date)} • ${displayTurno}`;
      }
      if (document.getElementById('confirmed-guests')) {
        document.getElementById('confirmed-guests').textContent = `${guests} Persone`;
      }
      if (document.getElementById('confirmed-code')) {
        document.getElementById('confirmed-code').textContent = bookingId;
      }
      if (document.getElementById('confirmed-name')) {
        document.getElementById('confirmed-name').textContent = name;
      }
      if (document.getElementById('confirmed-tables-count')) {
        document.getElementById('confirmed-tables-count').textContent = `${tablesNeeded} Tavoli da 2 posti`;
      }

      form.style.display = 'none';
      successCard.style.display = 'block';
      successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

function saveBookingLocally(booking) {
  let list = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) list = JSON.parse(raw);
  } catch (e) {}

  list.unshift(booking);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {}
}

function getStoredBookings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map(normalizeBooking).filter(Boolean);
      }
    }
  } catch (e) {}
  return [];
}

// Inizializza Dashboard Amministratore (Zero refresh continui, scambiatore data in alto, messaggi WhatsApp con grassetti)
async /* ==========================================================================
   SIMULAZIONE SALA INTERATTIVA A 50 TAVOLI (GESTIONE-PRENOTAZIONI.HTML)
   Rosso = Disponibile (Libero) | Grigio = Occupato (Prenotato)
   ========================================================================== */

function initAdminDashboard() {
  const gridContainer = document.getElementById('tables-grid-container');
  if (!gridContainer) return; // Non siamo nella pagina di gestione

  let currentDate = new Date().toISOString().split('T')[0];
  let currentShift = '20:00'; // 20:00 = 1° Turno, 21:30 = 2° Turno
  let activeBookings = [];
  let currentSelectedBooking = null;

  const dateInput = document.getElementById('admin-target-date');
  const btnPrev = document.getElementById('btn-prev-day');
  const btnNext = document.getElementById('btn-next-day');
  const btnToday = document.getElementById('btn-today');
  const btnTurno1 = document.getElementById('btn-turno-1');
  const btnTurno2 = document.getElementById('btn-turno-2');
  const btnRefresh = document.getElementById('refresh-data-btn');

  const modal = document.getElementById('table-modal');
  const modalClose = document.getElementById('modal-close');
  const modalDelete = document.getElementById('modal-delete-btn');

  if (dateInput) {
    dateInput.value = currentDate;
    dateInput.addEventListener('change', () => {
      currentDate = dateInput.value;
      renderHall();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      const dt = new Date(currentDate);
      dt.setDate(dt.getDate() - 1);
      currentDate = dt.toISOString().split('T')[0];
      if (dateInput) dateInput.value = currentDate;
      renderHall();
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      const dt = new Date(currentDate);
      dt.setDate(dt.getDate() + 1);
      currentDate = dt.toISOString().split('T')[0];
      if (dateInput) dateInput.value = currentDate;
      renderHall();
    });
  }

  if (btnToday) {
    btnToday.addEventListener('click', () => {
      currentDate = new Date().toISOString().split('T')[0];
      if (dateInput) dateInput.value = currentDate;
      renderHall();
    });
  }

  if (btnTurno1 && btnTurno2) {
    btnTurno1.addEventListener('click', () => {
      currentShift = '20:00';
      btnTurno1.classList.add('active');
      btnTurno2.classList.remove('active');
      renderHall();
    });
    btnTurno2.addEventListener('click', () => {
      currentShift = '21:30';
      btnTurno2.classList.add('active');
      btnTurno1.classList.remove('active');
      renderHall();
    });
  }

  if (btnRefresh) {
    btnRefresh.addEventListener('click', () => {
      btnRefresh.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Aggiornamento...';
      fetchFromSheet().then(() => {
        btnRefresh.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> Aggiorna Dati dal Foglio';
        renderHall();
      });
    });
  }

  // Chiusura modale
  if (modalClose) {
    modalClose.addEventListener('click', () => modal.classList.remove('active'));
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  // Cancellazione prenotazione
  if (modalDelete) {
    modalDelete.addEventListener('click', () => {
      if (!currentSelectedBooking) return;
      if (confirm(`Confermi di voler cancellare la prenotazione di ${currentSelectedBooking.name}? I tavoli verranno liberati.`)) {
        // Rimuovi localmente
        const local = getLocalBookings().filter(b => b.id !== currentSelectedBooking.id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(local));

        // Rimuovi su Google Apps Script
        const endpoint = getGoogleSheetEndpoint();
        if (endpoint) {
          fetch(endpoint, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action: 'delete_booking', id: currentSelectedBooking.id })
          }).catch(() => {});
        }

        modal.classList.remove('active');
        fetchFromSheet().then(() => renderHall());
      }
    });
  }

  async function fetchFromSheet() {
    const endpoint = getGoogleSheetEndpoint();
    if (!endpoint) return;
    try {
      const resp = await fetch(endpoint);
      const res = await resp.json();
      if (res && res.status === 'success' && Array.isArray(res.data)) {
        activeBookings = res.data.map(normalizeBooking);
      }
    } catch(err) {
      console.log('Lettura Sheet locale:', err);
      activeBookings = getLocalBookings();
    }
  }

  function renderHall() {
    gridContainer.innerHTML = '';
    const bookings = (activeBookings && activeBookings.length > 0) ? activeBookings : getLocalBookings();

    
    // Se non ci sono prenotazioni per questa data, verifica se ce ne sono in altre date per aiutare l'utente
    const otherDateBookings = bookings.filter(b => toIsoDate(b.date) !== currentDate && b.status && !b.status.toLowerCase().includes('annull'));
    let hintContainer = document.getElementById('other-dates-hint');
    if (!hintContainer) {
      hintContainer = document.createElement('div');
      hintContainer.id = 'other-dates-hint';
      hintContainer.style.cssText = 'background: #faf2e1; border: 1px dashed var(--accent-red); border-radius: 8px; padding: 12px 18px; margin-bottom: 20px; font-size: 0.90rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;';
      const controlsBar = document.querySelector('.controls-bar');
      if (controlsBar) controlsBar.parentNode.insertBefore(hintContainer, controlsBar.nextSibling);
    }

    if (otherDateBookings.length > 0 && filtered.length === 0) {
      const datesList = [...new Set(otherDateBookings.map(b => toIsoDate(b.date)))];
      hintContainer.style.display = 'flex';
      hintContainer.innerHTML = `
        <div>
          <i class="fa-solid fa-calendar-check" style="color: var(--accent-red); margin-right: 6px;"></i>
          <strong>Attenzione:</strong> Ci sono prenotazioni attive registrate in altre date:
          ${datesList.map(d => `<button class="nav-date-btn" style="padding: 4px 10px; margin-left: 6px; font-size: 0.82rem;" onclick="document.getElementById('admin-target-date').value='${d}'; document.getElementById('admin-target-date').dispatchEvent(new Event('change'));">${formatItalianDate(d)}</button>`).join('')}
        </div>
      `;
    } else {
      if (hintContainer) hintContainer.style.display = 'none';
    }

    // Filtra prenotazioni per data e turno selezionato
    const filtered = bookings.filter(b => {
      const sameDate = (toIsoDate(b.date) === currentDate);
      const statusOk = b.status && !b.status.toLowerCase().includes('annull');
      const turnoStr = String(b.time || '').toLowerCase();
      const sameShift = (currentShift === '20:00') 
        ? (turnoStr.includes('20:00') || (turnoStr.includes('1') && !turnoStr.includes('dalle 21:30')))
        : (turnoStr.includes('21:30') || turnoStr.includes('2'));
      return sameDate && statusOk && sameShift;
    });

    // Mappa dei 50 tavoli (1..50)
    // Ciascun tavolo: { id: 1..50, booking: null/object, isLinked: bool }
    const tables = [];
    for (let i = 1; i <= 50; i++) {
      tables.push({ number: i, booking: null, isLinked: false });
    }

    let nextTableIdx = 0;
    let totalGuestsCount = 0;
    let totalTablesOccupied = 0;

    // Assegna i tavoli contigui per ogni prenotazione
    filtered.forEach(b => {
      const guests = parseInt(b.guests, 10) || 2;
      const needed = parseInt(b.tables, 10) || Math.ceil(guests / 2);
      totalGuestsCount += guests;
      totalTablesOccupied += needed;

      const groupTables = [];
      for (let k = 0; k < needed; k++) {
        if (nextTableIdx < 50) {
          tables[nextTableIdx].booking = b;
          tables[nextTableIdx].isLinked = (needed > 1);
          groupTables.push(tables[nextTableIdx].number);
          nextTableIdx++;
        }
      }
      b._assignedTableNumbers = groupTables;
    });

    // Aggiorna contatori in alto
    const availableTables = Math.max(0, 50 - totalTablesOccupied);
    const statAvail = document.getElementById('stat-available-tables');
    const statOcc = document.getElementById('stat-occupied-tables');
    const statGuests = document.getElementById('stat-total-guests');
    const statCount = document.getElementById('stat-bookings-count');

    if (statAvail) statAvail.textContent = availableTables;
    if (statOcc) statOcc.textContent = totalTablesOccupied;
    if (statGuests) statGuests.textContent = totalGuestsCount;
    if (statCount) statCount.textContent = filtered.length;

    // Renderizza i 50 blocchi tavolo nel rettangolo della sala
    tables.forEach(t => {
      const tableDiv = document.createElement('div');
      tableDiv.className = 'table-box ' + (t.booking ? 'occupied' : 'available') + (t.isLinked ? ' linked-group' : '');

      if (t.booking) {
        // TAVOLO GRIGIO (OCCUPATO)
        const b = t.booking;
        tableDiv.innerHTML = `
          <span class="table-num">T${String(t.number).padStart(2, '0')}</span>
          <span class="table-seats-badge"><i class="fa-solid fa-users"></i> ${b.guests}p</span>
          <span class="table-guest-name">${b.name.split(' ')[0]}</span>
        `;
        tableDiv.title = `Tavolo ${t.number}: Occupato da ${b.name} (${b.guests} ospiti). Clicca per dettagli.`;
        tableDiv.addEventListener('click', () => openBookingModal(b, t.number));
      } else {
        // TAVOLO ROSSO (DISPONIBILE)
        tableDiv.innerHTML = `
          <span class="table-num">T${String(t.number).padStart(2, '0')}</span>
          <span class="table-seats-badge"><i class="fa-solid fa-chair"></i> 2p</span>
          <span style="font-size: 0.65rem; font-weight: 700; margin-top: 3px; opacity: 0.9;">LIBERO</span>
        `;
        tableDiv.title = `Tavolo ${t.number}: Disponibile (2 posti liberi).`;
      }

      gridContainer.appendChild(tableDiv);
    });
  }

  function openBookingModal(b, clickedTableNum) {
    currentSelectedBooking = b;
    const modalTableLabel = document.getElementById('modal-table-label');
    const modalBookingId = document.getElementById('modal-booking-id');
    const modalClientName = document.getElementById('modal-client-name');
    const modalClientPhone = document.getElementById('modal-client-phone');
    const modalGuestsCount = document.getElementById('modal-guests-count');
    const modalTablesCount = document.getElementById('modal-tables-count');
    const modalShiftName = document.getElementById('modal-shift-name');
    const modalNotes = document.getElementById('modal-notes');

    const tableListStr = b._assignedTableNumbers && b._assignedTableNumbers.length > 0
      ? b._assignedTableNumbers.map(n => `T${String(n).padStart(2, '0')}`).join(', ')
      : `Tavolo T${String(clickedTableNum).padStart(2, '0')}`;

    if (modalTableLabel) modalTableLabel.textContent = `Tavoli: ${tableListStr}`;
    if (modalBookingId) modalBookingId.textContent = b.id || 'ID N/D';
    if (modalClientName) modalClientName.textContent = b.name || '-';
    if (modalClientPhone) {
      modalClientPhone.textContent = b.phone || '-';
      modalClientPhone.href = `tel:${b.phone}`;
    }
    if (modalGuestsCount) modalGuestsCount.textContent = `${b.guests} Ospiti`;
    if (modalTablesCount) modalTablesCount.textContent = `${b.tables || Math.ceil(parseInt(b.guests, 10)/2)} Tavoli da 2 uniti`;
    if (modalShiftName) modalShiftName.textContent = (currentShift === '20:00') ? '1° Turno (20:00 - 21:30)' : '2° Turno (dalle 21:30 in poi)';
    if (modalNotes) modalNotes.textContent = b.notes && b.notes.trim() !== '' ? b.notes : 'Nessuna nota o intolleranza segnalata';

    modal.classList.add('active');
  }

  // Caricamento iniziale
  fetchFromSheet().then(() => renderHall());
}
