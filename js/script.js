/**
 * JAVASCRIPT PRINCIPALE - OL3 Ristorante Pizzeria
 * Gestione navigazione, menu, prenotazioni con conferma WhatsApp e Dashboard Amministratore.
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

// Renderizza Testi del Brand, Contatti e Link Social Ufficiali
function renderCommonData() {
  document.querySelectorAll('[data-brand-name]').forEach(el => el.textContent = SITE_CONFIG.brand.name);
  document.querySelectorAll('[data-contact-address]').forEach(el => el.textContent = SITE_CONFIG.contact.address + ', ' + SITE_CONFIG.contact.cap + ' ' + SITE_CONFIG.contact.city + ' (' + SITE_CONFIG.contact.province + ')');
  document.querySelectorAll('[data-contact-phone]').forEach(el => {
    el.textContent = SITE_CONFIG.contact.phoneDisplay;
    el.setAttribute('href', 'tel:' + SITE_CONFIG.contact.phone);
  });
  document.querySelectorAll('[data-contact-hours]').forEach(el => el.textContent = SITE_CONFIG.contact.hours);

  // Aggiornamento link Instagram e Facebook ufficiali
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

// Renderizza I 3 Punti di Forza
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

// Renderizza La Nostra Storia
function renderStory() {
  const titleEl = document.getElementById('story-title');
  const bodyEl = document.getElementById('story-paragraphs');
  if (titleEl && SITE_CONFIG.story) titleEl.textContent = SITE_CONFIG.story.title;
  if (bodyEl && SITE_CONFIG.story) {
    bodyEl.innerHTML = SITE_CONFIG.story.paragraphs.map(p => `<p>${p}</p>`).join('');
  }
}

// Renderizza Filosofia
function renderPhilosophy() {
  const titleEl = document.getElementById('philosophy-title');
  const textEl = document.getElementById('philosophy-text');
  if (titleEl && SITE_CONFIG.philosophy) titleEl.textContent = SITE_CONFIG.philosophy.title;
  if (textEl && SITE_CONFIG.philosophy) textEl.textContent = SITE_CONFIG.philosophy.text;
}

// Renderizza Galleria
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

// Renderizza Menu Completo
function renderMenu() {
  const tabsContainer = document.getElementById('menu-tabs');
  const listContainer = document.getElementById('menu-category-list');
  if (!tabsContainer || !listContainer || !SITE_CONFIG.menu) return;

  const totalItems = SITE_CONFIG.menu.categories.reduce((sum, c) => sum + c.items.length, 0);

  // Render Tabs
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

// Renderizza Mappa
function renderContactMap() {
  const mapIframe = document.getElementById('maps-iframe');
  if (mapIframe && SITE_CONFIG.contact) {
    mapIframe.src = SITE_CONFIG.contact.mapsEmbedUrl;
  }
}

// Navigazione e Menu Mobile
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

// Pulizia e formattazione numero WhatsApp italiano internazionale
function formatWhatsAppNumber(phone) {
  let cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0039')) {
    cleaned = cleaned.substring(4);
  } else if (cleaned.startsWith('39') && cleaned.length > 10) {
    cleaned = cleaned.substring(2);
  }
  return '39' + cleaned;
}

// Gestione Modulo Prenotazione (prenota.html)
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

    // Oggetto prenotazione
    const booking = {
      id: 'book_' + Date.now(),
      created_at: new Date().toISOString(),
      name: name,
      phone: phone,
      whatsapp_phone: formatWhatsAppNumber(phone),
      date: date,
      time: time,
      guests: guests,
      email: email,
      notes: notes,
      status: 'In attesa'
    };

    // Salva nel database locale (consultabile su gestione-prenotazioni.html)
    saveBookingLocally(booking);

    // Invia i dati anche a Netlify Forms in background se supportato
    const formData = new FormData(form);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    }).catch(() => {});

    // Mostra la scheda di conferma personalizzata con messaggio WhatsApp
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

  // Aggiunge in cima o in ordine cronologico
  list.unshift(booking);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {}
}

function getStoredBookings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
}

// Inizializza Pannello Gestione Prenotazioni (gestione-prenotazioni.html)
function initAdminDashboard() {
  const container = document.getElementById('admin-bookings-container');
  if (!container) return;

  let bookings = getStoredBookings();

  // Dati dimostrativi se vuoto per permettere all'utente di provare subito i tasti WhatsApp
  if (bookings.length === 0) {
    bookings = [
      {
        id: 'book_demo_1',
        created_at: new Date().toISOString(),
        name: 'Marco Rossi',
        phone: '340 123 4567',
        whatsapp_phone: '393401234567',
        date: '2026-09-12',
        time: '20:30',
        guests: '4 persone',
        notes: 'Un seggiolone per bambino, preferenza tavolo vicino al giardino',
        status: 'In attesa'
      },
      {
        id: 'book_demo_2',
        created_at: new Date(Date.now() - 3600000).toISOString(),
        name: 'Chiara Esposito',
        phone: '333 987 6543',
        whatsapp_phone: '393339876543',
        date: '2026-09-13',
        time: '21:00',
        guests: '2 persone',
        notes: 'Un ospite è celiaco (pizze senza glutine)',
        status: 'In attesa'
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }

  function renderList(filter = 'all') {
    const list = getStoredBookings();
    const filtered = filter === 'all' ? list : list.filter(b => b.status === filter);

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; background: var(--bg-card); border-radius: 8px; color: var(--text-muted);">
          <i class="fa-regular fa-calendar-check" style="font-size: 3rem; color: var(--accent-gold); margin-bottom: 16px;"></i>
          <h3>Nessuna prenotazione trovata per questo filtro</h3>
          <p>Le nuove richieste inoltrate dai clienti compariranno automaticamente qui in ordine di arrivo.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(b => {
      const waNumber = formatWhatsAppNumber(b.phone);

      // Messaggio di conferma WhatsApp
      const confirmText = encodeURIComponent(
        `Gentile ${b.name}, ti confermiamo con piacere la prenotazione del tavolo per ${b.guests} da OL3 Ristorante Pizzeria per il giorno ${b.date} alle ore ${b.time}. Vi aspettiamo in Piazza Enrico Berlinguer a Villapiana Lido! Per qualsiasi variazione contattaci al 352 038 9996. A presto, Lo Staff OL3.`
      );
      const confirmUrl = `https://wa.me/${waNumber}?text=${confirmText}`;

      // Messaggio di rifiuto/non disponibilità WhatsApp
      const rejectText = encodeURIComponent(
        `Gentile ${b.name}, ci dispiace informarti che per il giorno ${b.date} alle ore ${b.time} il nostro locale OL3 è al completo e non abbiamo tavoli disponibili. Ci scusiamo per il disagio e speriamo di poterti accogliere molto presto! Un cordiale saluto, Lo Staff OL3.`
      );
      const rejectUrl = `https://wa.me/${waNumber}?text=${rejectText}`;

      let badgeClass = 'badge-attesa';
      if (b.status === 'Confermato') badgeClass = 'badge-confermato';
      if (b.status === 'Rifiutato') badgeClass = 'badge-rifiutato';

      let cardStatusClass = 'status-attesa';
      if (b.status === 'Confermato') cardStatusClass = 'status-confermato';
      if (b.status === 'Rifiutato') cardStatusClass = 'status-rifiutato';

      const formattedTime = new Date(b.created_at).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
      const formattedDate = new Date(b.created_at).toLocaleDateString('it-IT');

      return `
        <div class="admin-card ${cardStatusClass}" data-id="${b.id}">
          <div>
            <div class="admin-card-header">
              <span class="admin-card-name">${b.name}</span>
              <span class="status-badge ${badgeClass}">${b.status}</span>
              <span style="font-size: 0.78rem; color: var(--text-muted); margin-left: auto;">
                Ricevuta il ${formattedDate} ore ${formattedTime}
              </span>
            </div>

            <div class="admin-card-details">
              <span><i class="fa-regular fa-calendar"></i> <strong>${b.date}</strong></span>
              <span><i class="fa-regular fa-clock"></i> <strong>${b.time}</strong></span>
              <span><i class="fa-solid fa-users"></i> ${b.guests}</span>
              <span><i class="fa-solid fa-phone"></i> <a href="tel:${b.phone}" style="color: var(--accent-gold); text-decoration: underline;">${b.phone}</a></span>
              ${b.email ? `<span><i class="fa-regular fa-envelope"></i> ${b.email}</span>` : ''}
            </div>

            ${b.notes ? `
              <div class="admin-card-notes">
                <strong>Note cliente:</strong> ${b.notes}
              </div>
            ` : ''}
          </div>

          <div class="admin-actions">
            <a href="${confirmUrl}" target="_blank" rel="noopener" class="btn-whatsapp-confirm" onclick="updateBookingStatus('${b.id}', 'Confermato')">
              <i class="fa-brands fa-whatsapp"></i> CONFERMA VIA WHATSAPP
            </a>
            <a href="${rejectUrl}" target="_blank" rel="noopener" class="btn-whatsapp-reject" onclick="updateBookingStatus('${b.id}', 'Rifiutato')">
              <i class="fa-solid fa-xmark"></i> RIFIUTA VIA WHATSAPP
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  window.updateBookingStatus = function(id, newStatus) {
    const list = getStoredBookings();
    const item = list.find(b => b.id === id);
    if (item) {
      item.status = newStatus;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      setTimeout(() => renderList('all'), 300);
    }
  };

  renderList('all');

  // Filtri pulsanti
  document.querySelectorAll('.admin-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderList(btn.getAttribute('data-status'));
    });
  });
}
