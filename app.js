'use strict';

/* ====================== MOCK DATA ====================== */
const MOCK_USERS = [
  { id: 'u1', role: 'student', firstName: 'Kouamé', lastName: 'Assi', age: 19, city: 'Abidjan — Cocody', phone: '07 00 11 22 33', rating: 4.8, completedJobs: 14, reliabilityScore: 92, joinedDate: '2025-09' },
];

const CAT_GRADIENTS = {
  livraison: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
  service: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
  scolaire: 'linear-gradient(135deg, #0052FF 0%, #06B6D4 100%)',
  bricolage: 'linear-gradient(135deg, #374151 0%, #6B7280 100%)',
  event: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
  digital: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
  autre: 'linear-gradient(135deg, #F59E0B 0%, #22C55E 100%)',
  menage: 'linear-gradient(135deg, #14B8A6 0%, #22C55E 100%)',
  courses: 'linear-gradient(135deg, #F97316 0%, #FBBF24 100%)',
  jardinage: 'linear-gradient(135deg, #22C55E 0%, #14B8A6 100%)',
  demenagement: 'linear-gradient(135deg, #64748B 0%, #94A3B8 100%)',
  garde: 'linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)',
};

function cardBg(job) {
  const grad = CAT_GRADIENTS[job.cat] || CAT_GRADIENTS.autre;
  if (!job.image) return `background:${grad};`;
  return `background:${grad}; background-image:url('${job.image}'); background-size:cover; background-position:center;`;
}

const CAT_ICONS = {
  livraison: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  service: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>`,
  scolaire: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>`,
  bricolage: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  event: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  digital: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  autre: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><path d="M12 3v18M12 3l4 4M12 3L8 7M3 12h18M3 12l4-4M3 12l4 4"/></svg>`,
};

const MOCK_JOBS = [
  { id: 'j1', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=500&auto=format&fit=crop', title: "Gérance d'une cabine Mobile Money", cat: 'service', desc: "Besoin de quelqu'un de sérieux pour gérer ma cabine Mobile Money / Wave à Adjamé Roxy pour la journée entière de demain.", reward: 5000, dist: 2.1, duration: 'Journée', location: 'Adjamé, Abidjan', urgent: true, isNew: true, posterName: 'Didier Ouattara', posterRating: 4.8, posterJobs: 23, postedAgo: '15 min', applicants: 3 },
  { id: 'j2', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=500&auto=format&fit=crop', title: "Livraison 15 plats d'Alloko", cat: 'livraison', desc: "Cherche un livreur avec moto pour distribuer 15 plats d'alloko. Très urgent.", reward: 8000, dist: 4.5, duration: '2h', location: 'Yopougon, Abidjan', urgent: true, isNew: true, posterName: 'Tante Marie', posterRating: 4.9, posterJobs: 67, postedAgo: '41 min', applicants: 1 },
];

const MOCK_APPLICATIONS = [
  { jobId: 'j2', title: "Livraison 15 plats d'Alloko", cat: 'livraison', status: 'applied', reward: 8000, date: 'Aujourd\'hui 10h30' },
];

/* ====================== STATE ====================== */
let appState = {
  loggedIn: false,
  user: null,
  currentScreen: 'home',
  currentJob: null,
  appliedJobs: new Set(),
  filteredCat: 'all',
  filterDist: 'all',
  filterReward: 'all',
  searchQ: '',
  jobs: [...MOCK_JOBS],
  postedJobs: [],
};

/* ====================== HELPERS ====================== */
function $(id) { return document.getElementById(id); }
function showToast(msg, type = '') {
  const t = $('toast');
  if(!t) return;
  t.textContent = msg;
  t.className = `toast ${type} show`;
  setTimeout(() => t.classList.remove('show'), 3200);
}
function fmtReward(n) { return n.toLocaleString('fr-CI') + ' FCFA'; }
function escHtml(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

/* ====================== ROUTER & AUTH ====================== */
function showScreen(id) {
  document.querySelectorAll('.app-screen').forEach(s => s.classList.remove('active'));
  const s = $(`screen-${id}`);
  if (s) s.classList.add('active');
  appState.currentScreen = id;
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.screen === id);
  });
  if (id === 'dashboard') renderDashboard();
  if (id === 'profile') renderProfile();
  if (id === 'home') renderHome();
}

function goAuth(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(`screen-${screenId}`).classList.add('active');
}

function login(user) {
  appState.loggedIn = true;
  appState.user = user;
  $('app-shell').classList.remove('hidden');
  $('app-shell').style.display = 'block';
  renderNav();
  updateHeader();
  showScreen('home');
}

function renderNav() {
  const role = appState.user?.role;
  const nav = $('bottomNav');
  if (!nav) return;
  nav.innerHTML = `
    <button class="nav-item active" data-screen="home">Accueil</button>
    ${role === 'sme' ? '<button class="nav-item" data-screen="post">Publier</button>' : ''}
    <button class="nav-item" data-screen="dashboard">Stats</button>
    <button class="nav-item" data-screen="profile">Profil</button>
  `;
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.onclick = () => showScreen(btn.dataset.screen);
  });
}

function updateHeader() {
  if (!appState.user) return;
  if($('homeGreeting')) $('homeGreeting').textContent = `Bonjour, ${appState.user.firstName} 👋`;
}

/* ====================== HOME & JOBS ====================== */
function renderHome() {
    renderJobsGrid();
}

function renderJobsGrid() {
  const grid = $('jobsGrid');
  if (!grid) return;

  const jobs = appState.jobs.filter(j => {
      if(appState.filteredCat !== 'all' && j.cat !== appState.filteredCat) return false;
      return true;
  });

  grid.innerHTML = jobs.map(j => `
    <div class="job-card-v" onclick="openJobDetail('${j.id}')">
      <div class="job-card-v-img" style="${cardBg(j)}"></div>
      <div class="job-card-body">
        <div class="job-title">${escHtml(j.title)}</div>
        <div class="job-reward">${fmtReward(j.reward)}</div>
        <div class="job-loc">📍 ${escHtml(j.location)}</div>
      </div>
      <div class="job-card-footer">
        <button class="btn-primary" onclick="event.stopPropagation(); quickApply('${j.id}')">Postuler ⚡</button>
      </div>
    </div>
  `).join('');
}

function openJobDetail(jobId) {
  const job = [...appState.jobs, ...appState.postedJobs].find(j => j.id === jobId);
  if (!job) return;
  appState.currentJob = job;
  
  const applied = appState.appliedJobs.has(job.id);
  $('detailContent').innerHTML = `
    <h2 style="padding:20px">${escHtml(job.title)}</h2>
    <p style="padding:0 20px">${escHtml(job.desc)}</p>
    <div class="detail-apply-bar">
      <button class="apply-btn ${applied ? 'applied' : ''}" id="applyBtn" 
              onclick="applyCurrentJob()" ${applied ? 'disabled' : ''}>
        ${applied ? '✓ Postulé' : '⚡ Postuler maintenant'}
      </button>
    </div>
  `;
  
  document.querySelectorAll('.app-screen').forEach(s => s.classList.remove('active'));
  $('screen-detail').classList.add('active');
}

function applyCurrentJob() {
  const job = appState.currentJob;
  if (!job) return;
  appState.appliedJobs.add(job.id);
  showToast('Candidature envoyée ! 🎉', 'success');
  openJobDetail(job.id); // Refresh view
  renderJobsGrid();
}

function quickApply(jobId) {
    appState.appliedJobs.add(jobId);
    showToast('Candidature éclair envoyée ! ⚡', 'success');
    renderJobsGrid();
}

/* ====================== DASHBOARD & PROFILE ====================== */
function renderDashboard() {
  $('dashBody').innerHTML = `<div style="padding:20px"><h3>Tes statistiques</h3><p>Missions complétées : ${appState.appliedJobs.size}</p></div>`;
}

function renderProfile() {
  $('profileBody').innerHTML = `
    <div style="padding:20px">
      <p><strong>Nom:</strong> ${appState.user.firstName}</p>
      <button class="btn btn-ghost" onclick="location.reload()">Se déconnecter</button>
    </div>`;
}

/* ====================== INIT & LISTENERS ====================== */
document.addEventListener('DOMContentLoaded', () => {
  // Splash & Auth
  $('splashLogin').onclick = () => goAuth('login');
  $('splashSignupBtn').onclick = () => goAuth('role');
  $('splashDemo').onclick = () => login(MOCK_USERS[0]);

  $('loginBack').onclick = () => goAuth('splash');
  $('detailBack').onclick = () => showScreen('home');

  $('loginForm').onsubmit = (e) => {
    e.preventDefault();
    login(MOCK_USERS[0]);
  };

  // Chips Catégories
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.onclick = () => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        appState.filteredCat = chip.dataset.cat;
        renderJobsGrid();
    };
  });

  goAuth('splash');
});

// Exposer les fonctions globales pour les onclick du HTML
window.openJobDetail = openJobDetail;
window.applyCurrentJob = applyCurrentJob;
window.quickApply = quickApply;
window.showScreen = showScreen;