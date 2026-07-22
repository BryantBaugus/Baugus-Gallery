import { PROJECTS, CATEGORIES } from './data.js';

const state = {
  activeFilter: 'All',
  navVisible: false,
  selectedId: null,
  viewMode: 'grid',
  mapPopup: null,
  expandLayers: [],
};

function legendColor(c) {
  return {
    sage: 'var(--color-accent-primary)',
    terracotta: 'var(--color-accent-secondary)',
    blue: 'var(--color-accent-water)',
    ochre: 'var(--color-accent-field)'
  }[c] || 'var(--color-accent-primary)';
}

/* ---------------- Nav ---------------- */
const nav = document.getElementById('nav');
const hero = document.getElementById('hero');

function updateNavVisibility() {
  const h = hero.offsetHeight || 500;
  const visible = window.scrollY > h - 80;
  if (visible !== state.navVisible) {
    state.navVisible = visible;
    nav.classList.toggle('is-visible', visible);
  }
}
window.addEventListener('scroll', updateNavVisibility, { passive: true });
updateNavVisibility();

/* ---------------- Projects section skeleton ---------------- */
const projectsRoot = document.getElementById('projects-root');
projectsRoot.innerHTML = `
  <div id="browse-view">
    <div class="section-header">
      <p class="kicker">Selected Work</p>
      <h2 class="title">Projects</h2>
      <div class="rule"></div>
      <p class="byline">Professional, academic, and research work in landscape architecture, architecture, and urban design</p>
    </div>
    <div class="filter-tabs" id="filter-tabs"></div>
    <div class="project-grid" id="project-grid"></div>
    <div class="map-view" id="map-view" style="display:none">
      <div class="globe-container" id="globe-container"></div>
      <p class="map-caption">Drag to rotate &middot; scroll to zoom &middot; click a marker for details</p>
      <div id="map-popup-root"></div>
    </div>
  </div>
  <div id="detail-view" style="display:none"></div>
`;

const browseViewEl = document.getElementById('browse-view');
const filterTabsEl = document.getElementById('filter-tabs');
const projectGridEl = document.getElementById('project-grid');
const mapViewEl = document.getElementById('map-view');
const globeContainerEl = document.getElementById('globe-container');
const mapPopupRootEl = document.getElementById('map-popup-root');
const detailViewEl = document.getElementById('detail-view');

/* ---------------- Globe (lazy, three.js) ---------------- */
let globeHandle = null;
let globeLoading = false;

async function ensureGlobe() {
  if (globeHandle || globeLoading) return;
  globeLoading = true;
  const { initGlobe } = await import('./globe.js');
  globeHandle = await initGlobe(globeContainerEl, PROJECTS, {
    onPinClick(project) {
      state.mapPopup = project;
      renderMapPopup();
    }
  });
  globeLoading = false;
}
function destroyGlobe() {
  if (globeHandle) {
    globeHandle.destroy();
    globeHandle = null;
  }
  globeContainerEl.innerHTML = '';
}

/* ---------------- Filter tabs ---------------- */
function renderFilterTabs() {
  const isMapView = state.viewMode === 'map';
  filterTabsEl.innerHTML = '';
  CATEGORIES.forEach(c => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = c;
    if (!isMapView && c === state.activeFilter) btn.classList.add('is-active');
    btn.addEventListener('click', () => setCategory(c));
    filterTabsEl.appendChild(btn);
  });
  const mapBtn = document.createElement('button');
  mapBtn.type = 'button';
  mapBtn.className = 'tab-map' + (isMapView ? ' is-active' : '');
  mapBtn.textContent = 'Map';
  mapBtn.addEventListener('click', () => openMap());
  filterTabsEl.appendChild(mapBtn);
}

/* ---------------- Grid view ---------------- */
function renderGrid() {
  const filtered = state.activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === state.activeFilter);

  projectGridEl.innerHTML = '';
  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = `project-card ${p.span === 'span 2' ? 'span-2' : 'span-1'}`;
    card.innerHTML = `
      <div class="card-image" style="aspect-ratio:${p.ratio}">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <div class="card-scrim"><p>${p.description}</p></div>
      </div>
      <div class="card-body">
        <h3 class="card-title">${p.title}</h3>
        <span class="tag tag-${p.tagColor}">${p.category}</span>
      </div>
    `;
    card.addEventListener('click', () => openProject(p.id));
    projectGridEl.appendChild(card);
  });
}

/* ---------------- Map view / popup ---------------- */
function renderMapPopup() {
  mapPopupRootEl.innerHTML = '';
  const p = state.mapPopup;
  if (!p) return;
  const el = document.createElement('div');
  el.className = 'map-popup';
  el.innerHTML = `
    <button class="popup-dismiss" type="button">&times;</button>
    <h4>${p.title}</h4>
    <span class="tag tag-${p.tagColor}">${p.category}</span>
    <div><button class="popup-open" type="button">View Project &rarr;</button></div>
  `;
  el.querySelector('.popup-dismiss').addEventListener('click', () => {
    state.mapPopup = null;
    renderMapPopup();
  });
  el.querySelector('.popup-open').addEventListener('click', () => openProject(p.id));
  mapPopupRootEl.appendChild(el);
}

/* ---------------- Detail view ---------------- */
function renderDetail(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  const hasThesis = !!p.thesis;
  const hasLegend = !!(p.legend && p.legend.length);

  detailViewEl.innerHTML = `
    <button class="back-button" type="button" id="back-btn">&larr; Back to Projects</button>
    <div class="section-header">
      <p class="kicker">${p.category}</p>
      <h2 class="title">${p.title}</h2>
      <div class="rule"></div>
      <p class="byline">Bryant Baugus</p>
    </div>
    ${p.role ? `<p class="detail-role">${p.role}</p>` : ''}
    <p class="detail-description">${p.description}</p>
    ${hasThesis ? `<div class="callout">${p.thesis}</div>` : ''}
    ${hasLegend ? `<div class="legend-list">${p.legend.map(l => `
      <div class="legend-item">
        <span class="legend-swatch" style="background:${legendColor(l.color)}"></span>
        <span class="legend-label">${l.label}</span>
      </div>`).join('')}</div>` : ''}
    <div class="gallery-grid">
      ${p.gallery.map((g, i) => `
        <figure class="gallery-item" data-idx="${i}">
          <div class="thumb"><img src="${g.image}" alt="${p.title}" loading="lazy"></div>
          ${g.caption ? `<figcaption>${g.caption}</figcaption>` : ''}
        </figure>`).join('')}
    </div>
  `;

  detailViewEl.querySelector('#back-btn').addEventListener('click', closeProject);
  detailViewEl.querySelectorAll('.gallery-item .thumb').forEach((thumb, i) => {
    thumb.addEventListener('click', () => expandEnter(p.gallery[i].image));
  });
}

/* ---------------- Top-level view switch ---------------- */
function renderView() {
  if (state.selectedId) {
    browseViewEl.style.display = 'none';
    detailViewEl.style.display = '';
    renderDetail(state.selectedId);
    return;
  }
  browseViewEl.style.display = '';
  detailViewEl.style.display = 'none';
  renderFilterTabs();
  if (state.viewMode === 'map') {
    projectGridEl.style.display = 'none';
    mapViewEl.style.display = '';
    ensureGlobe();
    renderMapPopup();
  } else {
    projectGridEl.style.display = '';
    mapViewEl.style.display = 'none';
    renderGrid();
  }
}

function setCategory(c) {
  destroyGlobe();
  state.activeFilter = c;
  state.viewMode = 'grid';
  state.mapPopup = null;
  renderView();
}
function openMap() {
  state.viewMode = 'map';
  state.mapPopup = null;
  renderView();
}
function openProject(id) {
  destroyGlobe();
  state.selectedId = id;
  state.mapPopup = null;
  renderView();
  const section = document.getElementById('projects');
  if (section) window.scrollTo({ top: section.offsetTop - 70, behavior: 'smooth' });
}
function closeProject() {
  state.selectedId = null;
  renderView();
}

renderView();

/* ---------------- Gallery crossfade expand overlay ---------------- */
let layerSeq = 0;
const layerEls = new Map();

const gallerySrim = document.createElement('div');
gallerySrim.className = 'scrim';
gallerySrim.addEventListener('click', () => expandLeave());
document.body.appendChild(gallerySrim);

const expandLayersRoot = document.createElement('div');
document.body.appendChild(expandLayersRoot);

function renderExpandLayers() {
  const layers = state.expandLayers;
  const activeIds = new Set(layers.map(l => l.id));

  for (const [id, el] of layerEls) {
    if (!activeIds.has(id)) {
      el.remove();
      layerEls.delete(id);
    }
  }

  layers.forEach((layer, i) => {
    let el = layerEls.get(layer.id);
    if (!el) {
      el = document.createElement('div');
      el.className = 'expand-layer';
      el.appendChild(document.createElement('img'));
      expandLayersRoot.appendChild(el);
      layerEls.set(layer.id, el);
    }
    const img = el.querySelector('img');
    if (img.src.indexOf(layer.image) === -1) img.src = layer.image;
    const isLast = i === layers.length - 1;
    el.style.transitionDuration = `${layer.duration}, ${layer.duration}`;
    el.style.opacity = String(layer.opacity);
    el.style.transform = `translate(-50%, -50%) scale(${layer.scale})`;
    el.style.pointerEvents = isLast ? 'auto' : 'none';
    el.onclick = isLast ? () => expandLeave() : null;
  });

  gallerySrim.style.opacity = layers.some(l => l.opacity === 1) ? '1' : '0';
  gallerySrim.style.pointerEvents = layers.length ? 'auto' : 'none';
}

function expandEnter(image) {
  const id = ++layerSeq;
  const prevIds = state.expandLayers.map(l => l.id);
  state.expandLayers = [...state.expandLayers, { id, image, opacity: 0, scale: 0.94, duration: '500ms' }];
  renderExpandLayers();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      state.expandLayers = state.expandLayers.map(l => {
        if (l.id === id) return { ...l, opacity: 1, scale: 1 };
        if (prevIds.includes(l.id)) return { ...l, opacity: 0, scale: 0.94, duration: '500ms' };
        return l;
      });
      renderExpandLayers();
    });
  });

  if (prevIds.length) {
    setTimeout(() => {
      state.expandLayers = state.expandLayers.filter(l => !prevIds.includes(l.id));
      renderExpandLayers();
    }, 500);
  }
}

function expandLeave() {
  if (!state.expandLayers.length) return;
  const idsToClose = state.expandLayers.map(l => l.id);
  state.expandLayers = state.expandLayers.map(l =>
    idsToClose.includes(l.id) ? { ...l, opacity: 0, scale: 0.94, duration: '500ms' } : l
  );
  renderExpandLayers();
  setTimeout(() => {
    state.expandLayers = state.expandLayers.filter(l => !idsToClose.includes(l.id));
    renderExpandLayers();
  }, 500);
}

/* ---------------- CV overlay (pdf.js) ---------------- */
const cvScrim = document.getElementById('cv-scrim');
const cvPanel = document.getElementById('cv-panel');
const cvContainer = document.getElementById('cv-container');
const cvOpenBtn = document.getElementById('cv-open-btn');
let cvRendered = false;

function openCV() {
  cvScrim.style.pointerEvents = 'auto';
  cvPanel.style.pointerEvents = 'auto';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      cvScrim.style.opacity = '1';
      cvPanel.style.opacity = '1';
      cvPanel.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
  if (!cvRendered) {
    cvRendered = true;
    import('./cv-viewer.js').then(({ renderCV }) => renderCV(cvContainer, 'assets/cv/bryant-baugus-cv.pdf'));
  }
}
function closeCV() {
  cvScrim.style.opacity = '0';
  cvPanel.style.opacity = '0';
  cvPanel.style.transform = 'translate(-50%, -50%) scale(0.94)';
  setTimeout(() => {
    cvScrim.style.pointerEvents = 'none';
    cvPanel.style.pointerEvents = 'none';
  }, 500);
}
cvOpenBtn.addEventListener('click', openCV);
cvScrim.addEventListener('click', closeCV);
cvPanel.addEventListener('click', closeCV);
cvContainer.addEventListener('click', e => e.stopPropagation());
