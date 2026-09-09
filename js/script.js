/**
 * JAVASCRIPT PRINCIPALE
 * Renderizza dinamicamente i dati di SITE_CONFIG e gestisce l'interattività.
 */

document.addEventListener('DOMContentLoaded', () => {
  renderBrandAndTexts();
  renderHighlights();
  renderStory();
  renderPhilosophy();
  renderGallery();
  renderMenu();
  renderContact();
  initNavigation();
  initReservationForm();
});

// Renderizza Testi del Brand e Top Bar
function renderBrandAndTexts() {
  document.querySelectorAll('[data-brand-name]').forEach(el => el.textContent = SITE_CONFIG.brand.name);
  document.querySelectorAll('[data-brand-tagline]').forEach(el => el.textContent = SITE_CONFIG.brand.tagline);
  document.querySelectorAll('[data-brand-since]').forEach(el => el.textContent = SITE_CONFIG.brand.since);
  document.querySelectorAll('[data-contact-address]').forEach(el => el.textContent = SITE_CONFIG.contact.address + ', ' + SITE_CONFIG.contact.cap + ' ' + SITE_CONFIG.contact.city + ' (' + SITE_CONFIG.contact.province + ')');
  document.querySelectorAll('[data-contact-phone]').forEach(el => {
    el.textContent = SITE_CONFIG.contact.phoneDisplay;
    el.setAttribute('href', 'tel:' + SITE_CONFIG.contact.phone);
  });
  document.querySelectorAll('[data-contact-hours]').forEach(el => el.textContent = SITE_CONFIG.contact.hours);

  // Social Links
  const fbLinks = document.querySelectorAll('.social-fb');
  fbLinks.forEach(a => a.href = SITE_CONFIG.socials.facebook);
  const igLinks = document.querySelectorAll('.social-ig');
  igLinks.forEach(a => a.href = SITE_CONFIG.socials.instagram);
}

// Renderizza I 3 Punti di Forza
function renderHighlights() {
  const container = document.getElementById('highlights-container');
  if (!container) return;

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
  if (titleEl) titleEl.textContent = SITE_CONFIG.story.title;
  if (bodyEl) {
    bodyEl.innerHTML = SITE_CONFIG.story.paragraphs.map(p => `<p>${p}</p>`).join('');
  }
}

// Renderizza Filosofia / Tempo
function renderPhilosophy() {
  const titleEl = document.getElementById('philosophy-title');
  const textEl = document.getElementById('philosophy-text');
  if (titleEl) titleEl.textContent = SITE_CONFIG.philosophy.title;
  if (textEl) textEl.textContent = SITE_CONFIG.philosophy.text;
}

// Renderizza Galleria
function renderGallery() {
  const container = document.getElementById('gallery-container');
  if (!container) return;

  container.innerHTML = SITE_CONFIG.gallery.map(item => `
    <div class="gallery-item">
      <img src="${item.url}" alt="${item.caption}" loading="lazy">
      <div class="gallery-overlay">
        <span class="gallery-caption">${item.caption}</span>
      </div>
    </div>
  `).join('');
}

// Renderizza Menu con Categorie e Filtri
function renderMenu() {
  const tabsContainer = document.getElementById('menu-tabs');
  const listContainer = document.getElementById('menu-category-list');
  if (!tabsContainer || !listContainer) return;

  // Render Tabs
  tabsContainer.innerHTML = `
    <button class="menu-tab-btn active" data-category="all">TUTTO IL MENU</button>
    ${SITE_CONFIG.menu.categories.map(cat => `
      <button class="menu-tab-btn" data-category="${cat.id}">${cat.name}</button>
    `).join('')}
  `;

  // Render Category Groups
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

  // Event listener sui Tab
  tabsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-tab-btn')) {
      document.querySelectorAll('.menu-tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const catId = e.target.getAttribute('data-category');
      displayCategories(catId);
    }
  });
}

// Renderizza Dati Contatto e Mappa
function renderContact() {
  const mapIframe = document.getElementById('maps-iframe');
  if (mapIframe) {
    mapIframe.src = SITE_CONFIG.contact.mapsEmbedUrl;
  }
}

// Navigazione, Navbar Scrolled e Mobile Toggle
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

// Gestione modulo prenotazione
function initReservationForm() {
  const form = document.getElementById('reservation-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('res-name').value;
    const date = document.getElementById('res-date').value;
    const guests = document.getElementById('res-guests').value;

    alert(`Grazie ${name}! La richiesta di prenotazione per ${guests} persone il ${date} è stata inviata con successo. Verrai ricontattato a breve per la conferma.`);
    form.reset();
  });
}
