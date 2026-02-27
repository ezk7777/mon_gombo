'use strict';

/* ====================== MOCK DATA & STATE ====================== */
const MOCK_USERS = [
  { id: 'u1', role: 'student', firstName: 'Kouamé', lastName: 'Assi', age: 19, city: 'Abidjan — Cocody', phone: '07 00 11 22 33', rating: 4.8, completedJobs: 14, reliabilityScore: 92, joinedDate: '2025-09' },
];

const CAT_ICONS = {
  livraison: '🛵', service: '❤️', scolaire: '📚', bricolage: '🛠️', event: '🎉', digital: '💻', autre: '✨'
};

let appState = {
  loggedIn: false,
  user: null,
  currentScreen: 'home',
  currentJob: null,
  appliedJobs: new Set(),
  filteredCat: 'all',
  jobs: [
    { id: 'j1', title: "Gérance de cabine Mobile Money", cat: 'service', desc: "Sérieux demandé à Adjamé Roxy.", reward: 5000, dist: 2.1, duration: 'Journée', location: 'Adjamé', urgent: true, posterName: 'Didier', posterRating: 4.8, postedAgo: '15 min' },
    { id: 'j2', title: "Livraison Alloko", cat: 'livraison', desc: "Urgent avant 19h.", reward: 8000, dist: 4.5, duration: '2h', location: 'Yopougon', urgent: true, posterName: 'Marie', posterRating: 4.9, postedAgo: '41 min' }
  ],
  postedJobs: [],
};

/* ====================== FONCTIONS GLOBALES (Accessibles au HTML) ====================== */

// 1. Navigation
window.showScreen = function(id) {
  document.querySelectorAll('.app-screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(`screen-${id}`);
  if (target) target.classList.add('active');
  
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.screen === id);
  });

  if (id === 'dashboard') renderDashboard();
  if (id === 'home') renderHome();
};

window.goAuth = function(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(`screen-${screenId}`);
  if (target) target.classList.add('active');
};

// 2. Authentification
window.handleLogin = function(user) {
  appState.loggedIn = true;
  appState.user = user;
  document.getElementById('app-shell').style.display = 'block';
  document.getElementById('homeGreeting').textContent = `Bonjour, ${user.firstName} 👋`;
  renderNav(user.role);
  window.showScreen('home');
};

// 3. Actions Missions
window.openJobDetail = function(jobId) {
  const job = appState.jobs.find(j => j.id === jobId);
  if (!job) return;
  appState.currentJob = job;
  
  const applied = appState.appliedJobs.has(job.id);
  document.getElementById('detailContent').innerHTML = `
    <h2 style="padding:20px">${job.title}</h2>
    <p style="padding:0 20px">${job.desc}</p>
    <div style="padding:20px">
      <button class="apply-btn ${applied ? 'applied' : ''}" id="applyBtn" 
              onclick="applyCurrentJob()" ${applied ? 'disabled' : ''}>
        ${applied ? '✓ Postulé' : '⚡ Postuler maintenant'}
      </button>
    </div>
  `;
  window.showScreen('detail');
};

window.applyCurrentJob = function() {
  if (!appState.currentJob) return;
  appState.appliedJobs.add(appState.currentJob.id);
  showToast('Candidature envoyée ! 🎉', 'success');
  window.openJobDetail(appState.currentJob.id); 
};

window.quickApply = function(jobId) {
  appState.appliedJobs.add(jobId);
  showToast('Postulé avec succès ! ⚡', 'success');
  renderHome();
};

/* ====================== RENDU UI ====================== */

function renderHome() {
  const grid = document.getElementById('jobsGrid');
  if (!grid) return;
  grid.innerHTML = appState.jobs.map(j => `
    <div class="job-card-v" onclick="openJobDetail('${j.id}')">
      <div class="job-card-body">
        <div class="job-title">${j.title}</div>
        <div class="job-reward">${j.reward.toLocaleString()} FCFA</div>
        <button class="job-apply-quick" onclick="event.stopPropagation(); quickApply('${j.id}')">
          ${appState.appliedJobs.has(j.id) ? '✓' : 'Postuler ⚡'}
        </button>
      </div>
    </div>
  `).join('');
}

function renderNav(role) {
  const nav = document.getElementById('bottomNav');
  nav.innerHTML = `
    <button class="nav-item active" onclick="showScreen('home')">Accueil</button>
    ${role === 'sme' ? '<button class="nav-item" onclick="showScreen(\'post\')">Publier</button>' : ''}
    <button class="nav-item" onclick="showScreen('dashboard')">Stats</button>
  `;
}

function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast show ${type}`;
  setTimeout(() => t.classList.remove('show'), 3000);
}

/* ====================== INITIALISATION AU CHARGEMENT ====================== */

document.addEventListener('DOMContentLoaded', () => {
  // Branchement des boutons Splash
  document.getElementById('splashDemo').onclick = () => window.handleLogin(MOCK_USERS[0]);
  document.getElementById('splashLogin').onclick = () => window.goAuth('login');
  document.getElementById('splashSignupBtn').onclick = () => window.goAuth('role');

  // Retours
  document.getElementById('loginBack').onclick = () => window.goAuth('splash');
  if(document.getElementById('detailBack')) 
     document.getElementById('detailBack').onclick = () => window.showScreen('home');

  // Formulaire Login
  document.getElementById('loginForm').onsubmit = (e) => {
    e.preventDefault();
    window.handleLogin(MOCK_USERS[0]);
  };

  window.goAuth('splash');
});