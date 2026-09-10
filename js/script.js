/**
 * JAVASCRIPT PRINCIPALE - OL3 Ristorante Pizzeria
 * Gestione navigazione, menu, prenotazioni e Pannello Tavoli a 2 colonne con WhatsApp.
 */

const STORAGE_KEY = 'ol3_prenotazioni_db';

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

// Normalizza e pulisce qualsiasi numero di telefono per WhatsApp (standard internazionale 39...)
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

// Normalizza e pulisce le stringhe data
function cleanDate(d) {
  if (!d) return '';
  let s = String(d).trim();
  if (s.includes('GMT')) {
    try {
      const dt = new Date(s);
      if (!isNaN(dt.getTime())) {
        const dd = String(dt.getDate()).padStart(2, '0');
        const mm = String(dt.getMonth() + 1).padStart(2, '0');
        const yyyy = dt.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
      }
    } catch(e) {}
  }
  return s;
}

// Normalizza e pulisce le stringhe orario
function cleanTime(t) {
  if (!t) return '';
  let s = String(t).trim();
  if (s.includes('GMT')) {
    try {
      const dt = new Date(s);
      if (!isNaN(dt.getTime())) {
        const hh = String(dt.getHours()).padStart(2, '0');
        const min = String(dt.getMinutes()).padStart(2, '0');
        return `${hh}:${min}`;
      }
    } catch(e) {}
  }
  return s;
}

// Normalizza un oggetto prenotazione (anche in caso di vecchi dati CSV concatenati)
function normalizeBooking(b) {
  if (!b) return null;

  // Gestione difensiva se l'intera riga è finita nel campo name
  if (typeof b.name === 'string' && b.name.includes(',') && b.name.includes('book_')) {
    const p = b.name.split(',');
    if (p.length >= 7) {
      return {
        id: p[0].trim(),
        created_at: p[1].trim() + ' ' + p[2].trim(),
        name: p[3].trim(),
        phone: p[4].trim(),
        date: cleanDate(p[5]),
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
    date: cleanDate(b.date),
    time: cleanTime(b.time),
    guests: String(b.guests || ''),
    notes: String(b.notes || ''),
    status: String(b.status || 'In attesa')
  };
}

// Renderizza Testi del Brand, Contatti e Link Social Ufficiali
function renderCommonData() {
  document.querySelectorAll('[data-brand-name]').forEach(el => el.textContent = SITE_CONFIG.brand.name);
  document.querySelectorAll('[data-contact-address]').forEach(el => el.textContent = SITE_CONFIG.contact.address + ', ' + SITE_CONFIG.contact.cap + ' ' + SITE_CONFIG.contact.city + ' (' + SITE_CONFIG.contact.province + ')');
  document.querySelectorAll('[data-contact-phone]').forEach(el => {
    el.textContent = SITE_CONFIG.contact.phoneDisplay;
    el.setAttribute('href', 'tel:' + SITE_CONFIG.contact.phone);
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

// Gestione invio modulo prenotazione (prenota.html)
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

    const booking = {
      id: 'book_' + Date.now(),
      created_at: new Date().toLocaleString('it-IT'),
      name: name,
      phone: phone,
      date: date,
      time: time,
      guests: guests,
      email: email,
      notes: notes,
      status: 'In attesa'
    };

    // Salva in cache locale
    saveBookingLocally(booking);

    // Invia al Google Sheet
    const endpoint = getGoogleSheetEndpoint();
    if (endpoint) {
      fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(booking)
      }).catch(err => console.log('Sincronizzazione Sheet:', err));
    }

    // Invia a Netlify Forms
    const formData = new FormData(form);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    }).catch(() => {});

    // Mostra la scheda di conferma
    if (successCard) {
      document.getElementById('confirmed-date-time').textContent = `${date} ore ${time}`;
      document.getElementById('confirmed-guests').textContent = guests;
      document.getElementById('confirmed-phone').textContent = phone;
      form.style.display = 'none';
      successCard.style.display = 'block';
      successCard.scrollIntoView({ behavior: 'smooth' });
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


// Inizializza Dashboard Amministratore (Mostra solo richieste in attesa, rimuove appena confermate o rifiutate)
async function initAdminDashboard() {
  const container = document.getElementById('pending-bookings-list');
  if (!container) return;

  const countBadge = document.getElementById('pending-count-badge');
  const toggleAll = document.getElementById('toggle-show-all');

  let showAll = false;

  async function fetchAndRender() {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--text-muted);">
        <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--accent-gold); margin-bottom: 12px;"></i>
        <p>Sincronizzazione in tempo reale con Google Sheets...</p>
      </div>
    `;

    const endpoint = getGoogleSheetEndpoint();
    let bookings = [];

    try {
      const res = await fetch(endpoint);
      const json = await res.json();
      if (json && json.status === 'success' && Array.isArray(json.data)) {
        bookings = json.data.map(normalizeBooking).filter(Boolean);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
      } else {
        bookings = getStoredBookings();
      }
    } catch (e) {
      console.warn('Lettura da Google Sheets non riuscita, uso cache:', e);
      bookings = getStoredBookings();
    }

    renderList(bookings);
  }

  function renderList(bookings) {
    // Filtra: per default SOLO le richieste 'In attesa' (quelle confermate o rifiutate NON escono più nella pagina web)
    const pendingOnly = bookings.filter(b => b.status === 'In attesa');
    const toDisplay = showAll ? bookings : pendingOnly;

    if (countBadge) {
      countBadge.textContent = pendingOnly.length;
    }

    if (toDisplay.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 70px 20px; background: var(--bg-card); border-radius: 8px; color: var(--text-muted); border: 1px solid var(--border-card);">
          <i class="fa-regular fa-circle-check" style="font-size: 3.5rem; color: var(--accent-green); margin-bottom: 18px; display:block;"></i>
          <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: #fff; margin-bottom: 8px;">Tutto aggiornato!</h3>
          <p style="font-size: 0.95rem; max-width: 500px; margin: 0 auto 20px;">Non ci sono nuove richieste in sospeso da confermare. Le richieste elaborate sono state archiviate correttamente sul foglio Google.</p>
          <a href="https://docs.google.com/spreadsheets/d/1u5aKXWIb00V_u038qUka_eje1f8DpvLuG0wznZmRpcI/edit" target="_blank" rel="noopener" class="btn-secondary-hero" style="display: inline-block; width: auto; padding: 10px 22px;">
            <i class="fa-solid fa-table"></i> Consulta Storico Completo su Google Drive
          </a>
        </div>
      `;
      return;
    }

    container.innerHTML = toDisplay.map(b => {
      const waNum = formatWhatsAppNumber(b.phone);

      // Link conferma WhatsApp
      const confirmText = encodeURIComponent(
        `Gentile ${b.name}, ti confermiamo con piacere la prenotazione del tavolo per ${b.guests} da OL3 Ristorante Pizzeria per il giorno ${b.date} alle ore ${b.time}. Vi aspettiamo in Piazza Enrico Berlinguer a Villapiana Lido! Per variazioni contattaci al 352 038 9996. A presto, Lo Staff OL3.`
      );
      const confirmUrl = `https://api.whatsapp.com/send?phone=${waNum}&text=${confirmText}`;

      // Link rifiuto WhatsApp
      const rejectText = encodeURIComponent(
        `Gentile ${b.name}, ci dispiace informarti che per il giorno ${b.date} alle ore ${b.time} il nostro locale OL3 è al completo e non abbiamo tavoli disponibili. Ci scusiamo per il disagio e speriamo di poterti accogliere prossimamente! Un cordiale saluto, Lo Staff OL3.`
      );
      const rejectUrl = `https://api.whatsapp.com/send?phone=${waNum}&text=${rejectText}`;

      let cardBorderClass = 'table-card-pending';
      let badgeLabel = 'IN ATTESA';
      let badgeStyle = 'background: rgba(214, 175, 93, 0.18); color: var(--accent-gold);';

      if (b.status === 'Confermato') {
        cardBorderClass = 'table-card-confirmed';
        badgeLabel = 'CONFERMATO';
        badgeStyle = 'background: rgba(37, 211, 102, 0.18); color: var(--accent-green);';
      } else if (b.status === 'Rifiutato') {
        cardBorderClass = '';
        badgeLabel = 'RIFIUTATO';
        badgeStyle = 'background: rgba(209, 56, 43, 0.18); color: #ff786b;';
      }

      return `
        <div class="table-card ${cardBorderClass}" id="booking-card-${b.id}" style="transition: all 0.4s ease; padding: 24px;">
          <div class="table-card-header">
            <span class="table-card-name" style="font-size: 1.35rem;">${b.name}</span>
            <div>
              <span style="font-size: 0.75rem; padding: 4px 10px; border-radius: 20px; font-weight: 700; ${badgeStyle}">
                ${badgeLabel}
              </span>
            </div>
          </div>

          <div class="table-card-info" style="font-size: 0.95rem; margin: 12px 0 16px;">
            <span><i class="fa-regular fa-calendar" style="color: var(--accent-gold);"></i> <strong>Data:</strong> ${b.date}</span>
            <span><i class="fa-regular fa-clock" style="color: var(--accent-gold);"></i> <strong>Ore:</strong> ${b.time}</span>
            <span><i class="fa-solid fa-users" style="color: var(--accent-gold);"></i> <strong>Ospiti:</strong> ${b.guests}</span>
            <span><i class="fa-solid fa-phone" style="color: var(--accent-gold);"></i> <a href="tel:${b.phone}" style="color: #fff; text-decoration: underline;">${b.phone}</a></span>
            <span style="font-size: 0.80rem; color: #888; margin-left: auto;">Inviata: ${b.created_at || 'Adesso'}</span>
          </div>

          ${b.notes ? `
            <div style="font-size: 0.90rem; color: #d5cfc7; background: rgba(0,0,0,0.3); padding: 10px 14px; border-radius: 4px; margin-bottom: 16px; border-left: 3px solid var(--accent-gold);">
              <strong>Note del cliente:</strong> ${b.notes}
            </div>
          ` : ''}

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 14px;">
            <a href="${confirmUrl}" target="_blank" rel="noopener" class="btn-whatsapp-confirm" onclick="processAndRemove('${b.id}', 'Confermato')">
              <i class="fa-brands fa-whatsapp"></i> CONFERMA VIA WHATSAPP
            </a>
            <a href="${rejectUrl}" target="_blank" rel="noopener" class="btn-whatsapp-reject" onclick="processAndRemove('${b.id}', 'Rifiutato')">
              <i class="fa-solid fa-xmark"></i> RIFIUTA VIA WHATSAPP
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  // Quando clicchi Conferma o Rifiuta: aggiorna Google Sheets e rimuove subito la card dalla pagina
  window.processAndRemove = function(id, status) {
    const card = document.getElementById(`booking-card-${id}`);
    if (card && !showAll) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(-15px)';
      setTimeout(() => {
        card.remove();
        // Aggiorna contatore
        const remaining = document.querySelectorAll('.table-card').length;
        if (countBadge) countBadge.textContent = remaining;
        if (remaining === 0) {
          fetchAndRender();
        }
      }, 350);
    }

    // Aggiorna cache locale
    const list = getStoredBookings();
    const item = list.find(b => String(b.id) === String(id));
    if (item) {
      item.status = status;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    // Aggiorna in background su Google Sheets
    const endpoint = getGoogleSheetEndpoint();
    if (endpoint) {
      fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'update_status', id: id, status: status })
      }).catch(() => {});
    }
  };

  fetchAndRender();

  const refreshBtn = document.getElementById('admin-refresh-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', fetchAndRender);
  }

  if (toggleAll) {
    toggleAll.addEventListener('change', (e) => {
      showAll = e.target.checked;
      renderList(getStoredBookings());
    });
  }

  // Auto-refresh ogni 30s
  setInterval(fetchAndRender, 30000);
}
