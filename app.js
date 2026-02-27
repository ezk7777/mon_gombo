/* =====================================================
   QuickTask MVP — app.js
   Router · Mock data · All screen logic
   ===================================================== */
'use strict';

/* ====================== MOCK DATA ====================== */
const MOCK_USERS = [
  { id: 'u1', role: 'student', firstName: 'Kouamé', lastName: 'Assi', age: 19, city: 'Abidjan — Cocody', phone: '07 00 11 22 33', rating: 4.8, completedJobs: 14, reliabilityScore: 92, joinedDate: '2025-09' },
];

/* Gradient fallbacks per category (shown when Unsplash image fails) */
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

/* Returns an inline style string for a job card image with a gradient fallback */
function cardBg(job) {
  const grad = CAT_GRADIENTS[job.cat] || CAT_GRADIENTS.autre;
  if (!job.image) return `background:${grad};`;
  // The gradient is set as background, then background-image overlays it.
  // If the image fails to load, the gradient shows through.
  return `background:${grad}; background-image:url('${job.image}'); background-size:cover; background-position:center;`;
}

const CAT_ICONS = {
  livraison: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  service: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>`,
  scolaire: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>`,
  bricolage: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  event: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  digital: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  autre: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><path d="M12 3v18M12 3l4 4M12 3L8 7M3 12h18M3 12l4-4M3 12l4 4"/></svg>`,
};

const MOCK_JOBS = [
  { id: 'j1', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=500&auto=format&fit=crop', title: "Gérance d'une cabine Mobile Money", cat: 'service', desc: "Besoin de quelqu'un de sérieux pour gérer ma cabine Mobile Money / Wave à Adjamé Roxy pour la journée entière de demain. Tu dois être habitué aux transferts.", reward: 5000, dist: 2.1, duration: 'Journée', location: 'Adjamé, Abidjan', urgent: true, isNew: true, posterName: 'Didier Ouattara', posterRating: 4.8, posterJobs: 23, postedAgo: '15 min', applicants: 3 },
  { id: 'j2', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=500&auto=format&fit=crop', title: "Livraison 15 plats d'Alloko et Poulet", cat: 'livraison', desc: "Cherche un livreur avec moto pour distribuer 15 plats d'alloko et poulet braisé de Cocody vers une petite fête à Yopougon. Très urgent, doit être récupéré avant 19h.", reward: 8000, dist: 4.5, duration: '2h', location: 'Yopougon, Abidjan', urgent: true, isNew: true, posterName: 'Tante Marie', posterRating: 4.9, posterJobs: 67, postedAgo: '41 min', applicants: 1 },
  { id: 'j3', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=500&auto=format&fit=crop', title: 'Répétiteur Maths classe de 3ème', cat: 'scolaire', desc: "Je cherche un étudiant brillant pour des cours de renforcement en Mathématiques pour mon fils en classe de 3ème. Préparation du BEPC. 2h de cours cette semaine.", reward: 6000, dist: 0.8, duration: '2h', location: 'Cocody Riviera 3', urgent: false, isNew: true, posterName: 'Bintou S.', posterRating: 4.7, posterJobs: 12, postedAgo: '1h', applicants: 4 },
  { id: 'j4', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=500&auto=format&fit=crop', title: 'Coiffure à domicile (Tresses au fil)', cat: 'service', desc: "Recherche coiffeuse rapide et minutieuse pour me faire des tresses au fil avec rajouts, en préparation pour un baptême ce weekend. Tout le matériel est à la maison.", reward: 7000, dist: 1.2, duration: 'Demi-journée', location: 'Marcory Zone 4', urgent: false, isNew: false, posterName: 'Yasmine K.', posterRating: 4.5, posterJobs: 8, postedAgo: '2h', applicants: 2 },
  { id: 'j5', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=500&auto=format&fit=crop', title: 'Aide plomberie - Fuite sous le lavabo', cat: 'bricolage', desc: "Urgente fuite d'eau dans la cuisine sous le lavabo. Recherche un jeune débrouillard ou plombier apprenti pour venir stopper la fuite. Pièces à remplacer si nécessaire.", reward: 4000, dist: 0.5, duration: '1h', location: 'Riviera Palmeraie', urgent: true, isNew: false, posterName: 'Jean-Marc', posterRating: 4.3, posterJobs: 3, postedAgo: '15 min', applicants: 0 },
  { id: 'j6', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=500&auto=format&fit=crop', title: 'Aide service traiteur pour Mariage', cat: 'event', desc: "Recherche 2 jeunes dynamiques pour aider au service (boissons et débarrassage) d'un petit mariage de 50 personnes. Tenue correcte exigée (pantalon noir, chemise blanche).", reward: 12000, dist: 6.0, duration: 'Journée', location: 'Plateau', urgent: false, isNew: true, posterName: 'Events 225', posterRating: 5.0, posterJobs: 104, postedAgo: '3h', applicants: 11 },
  { id: 'j7', image: 'https://images.unsplash.com/photo-1542744094-24638ea0b56c?q=80&w=500&auto=format&fit=crop', title: 'Création flyer pro pour mon maquis', cat: 'digital', desc: "J'ai besoin d'une belle affiche numérique pour annoncer la soirée 'Choukouya Party' de mon maquis. Utilise Canva ou Photoshop. Travail en télétravail.", reward: 5000, dist: 0, duration: '2h', location: 'En ligne', urgent: false, isNew: false, posterName: 'Maquis Le Boss', posterRating: 4.6, posterJobs: 18, postedAgo: '5h', applicants: 6 },
  { id: 'j8', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=500&auto=format&fit=crop', title: 'Installation Antenne TV Parabole', cat: 'bricolage', desc: "Je viens d'acheter un bouquet TV et j'ai besoin de quelqu'un qui a l'habitude de fixer et de régler les paraboles sur le toit. Échelle disponible sur place.", reward: 8000, dist: 3.2, duration: '2h', location: 'Treichville', urgent: false, isNew: false, posterName: 'Patrice K.', posterRating: 4.2, posterJobs: 5, postedAgo: '1 jour', applicants: 1 },
];

const MOCK_APPLICATIONS = [
  { jobId: 'j2', title: "Livraison 15 plats d'Alloko", cat: 'livraison', status: 'applied', reward: 8000, date: 'Aujourd\'hui 10h30' },
  { jobId: 'j7', title: 'Création flyer pro maquis', cat: 'digital', status: 'pending', reward: 5000, date: 'Hier 15h20' },
  { jobId: 'j8', title: 'Installation Antenne TV', cat: 'bricolage', status: 'done', reward: 8000, date: '22 Fév' },
  { jobId: 'j3', title: 'Répétiteur Maths 3ème', cat: 'scolaire', status: 'done', reward: 6000, date: '20 Fév' },
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
  postedJobs: [
    {
      id: 'p123',
      title: 'Mock Mission - À valider (SME)',
      cat: 'digital',
      desc: 'Créer un logo et une bannière pour mes réseaux sociaux.',
      reward: 15000,
      duration: '3h',
      location: 'En ligne',
      status: 'completed_by_student',
      date: 'Aujourd\'hui',
      posterName: 'SME Démo'
    }
  ],
};

/* ====================== HELPERS ====================== */
function $(id) { return document.getElementById(id); }
function showToast(msg, type = '') {
  const t = $('toast');
  t.textContent = msg;
  t.className = `toast${type ? ' ' + type : ''}`;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}
function fmtReward(n) { return n.toLocaleString('fr-CI') + ' FCFA'; }
function escHtml(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

/* ====================== ROUTER ====================== */
function showScreen(id) {
  document.querySelectorAll('.app-screen').forEach(s => s.classList.remove('active'));
  const s = $(`screen-${id}`);
  if (s) s.classList.add('active');
  appState.currentScreen = id;
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.screen === id);
  });
  // Re-render dynamic screens
  if (id === 'dashboard') renderDashboard();
  if (id === 'profile') renderProfile();
}

function goAuth(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(`screen-${screenId}`).classList.add('active');
}

/* ====================== VALIDATION HELPERS ====================== */

/** Show/clear inline field error */
function fieldErr(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.style.display = msg ? 'block' : 'none';
}

/** Letters, accents, spaces, hyphens and apostrophes only */
function isValidName(v) {
  return /^[A-Za-zÀ-ÿ\s\-']+$/.test(v.trim()) && v.trim().length >= 2;
}

/** Digits only, 8-10 chars (Côte d'Ivoire phone) */
function isValidPhone(v) {
  return /^\d{8,10}$/.test(v.replace(/\s/g, ''));
}

/** Min 6 chars, at least one digit, at least one special char */
function isValidPassword(v) {
  return v.length >= 6 && /\d/.test(v) && /[^A-Za-z0-9]/.test(v);
}

/** Score: 0=weak 1=medium 2=strong */
function passwordScore(v) {
  let score = 0;
  if (v.length >= 6) score++;
  if (/\d/.test(v) && /[^A-Za-z0-9]/.test(v)) score++;
  if (v.length >= 10) score++;
  return Math.min(score, 2);
}

/** Update password strength UI */
function updatePwdStrength(val, fillId, labelId, strengthId) {
  const el = document.getElementById(strengthId);
  const fill = document.getElementById(fillId);
  const lbl = document.getElementById(labelId);
  if (!el || !fill || !lbl) return;
  if (!val) { el.style.display = 'none'; return; }
  el.style.display = 'block';
  const score = passwordScore(val);
  const levels = [
    { w: '33%', color: '#EF4444', text: '🔴 Faible — ajoute un chiffre et un symbole' },
    { w: '66%', color: '#F59E0B', text: '🟡 Moyen — encore un peu plus long' },
    { w: '100%', color: '#22C55E', text: '🟢 Fort !' },
  ];
  fill.style.width = levels[score].w;
  fill.style.background = levels[score].color;
  lbl.textContent = levels[score].text;
  lbl.style.color = levels[score].color;
}

/* ---- Real-time input filters ---- */

/** Block non-letter keystrokes on name fields */
function attachNameFilter(inputId, errId) {
  const el = document.getElementById(inputId);
  if (!el) return;
  el.addEventListener('input', () => {
    // Strip digits and special chars (keep letters/accents/spaces/hyphens)
    const cleaned = el.value.replace(/[^A-Za-zÀ-ÿ\s\-']/g, '');
    if (el.value !== cleaned) el.value = cleaned;
    fieldErr(errId, cleaned && !isValidName(cleaned) ? 'Lettres uniquement (min 2 caractères)' : '');
  });
}

/** Block non-digit keystrokes on phone fields */
function attachPhoneFilter(inputId, errId) {
  const el = document.getElementById(inputId);
  if (!el) return;
  el.addEventListener('input', () => {
    const cleaned = el.value.replace(/\D/g, '');
    if (el.value !== cleaned) el.value = cleaned;
    fieldErr(errId, cleaned.length > 0 && !isValidPhone(cleaned) ? 'Numéro invalide (8 à 10 chiffres uniquement)' : '');
  });
}

/** Attach password strength listener */
function attachPwdStrength(inputId, errId, fillId, labelId, strengthId) {
  const el = document.getElementById(inputId);
  if (!el) return;
  el.addEventListener('input', () => {
    const v = el.value;
    updatePwdStrength(v, fillId, labelId, strengthId);
    if (v && !isValidPassword(v)) {
      fieldErr(errId, 'Requis : min 6 car. + 1 chiffre + 1 symbole (!@#$%...)');
    } else {
      fieldErr(errId, '');
    }
  });
}

/* Attach all filters after DOM ready */
attachNameFilter('studFirst', 'studFirstErr');
attachNameFilter('studLast', 'studLastErr');
attachPhoneFilter('studPhone', 'studPhoneErr');
attachPwdStrength('studPass', 'studPassErr', 'studPwdFill', 'studPwdLabel', 'studPwdStrength');

attachNameFilter('smeContactName', 'smeContactErr');
attachPhoneFilter('smePhone', 'smePhoneErr');
attachPwdStrength('smePass', 'smePassErr', 'smePwdFill', 'smePwdLabel', 'smePwdStrength');

attachPhoneFilter('loginEmail', 'loginEmailErr');

/* ---- Operator selector (Orange / Wave) ---- */
document.querySelectorAll('.operator-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.operator-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const hidden = document.getElementById('studOperator');
    if (hidden) hidden.value = btn.dataset.op;
  });
});

/* ====================== SMS OTP ====================== */
let _otpCallback = null;   // called when OTP verified
let _otpPrevScreen = null; // screen to go back to
const DEMO_OTP = '1234';

function sendOtp(phone, prevScreen, onSuccess) {
  _otpCallback = onSuccess;
  _otpPrevScreen = prevScreen;
  // Display phone in OTP screen
  const phoneEl = document.getElementById('otpPhone');
  if (phoneEl) phoneEl.textContent = phone || '--';
  // Clear boxes
  [0, 1, 2, 3].forEach(i => {
    const box = document.getElementById(`otp${i}`);
    if (box) box.value = '';
  });
  document.getElementById('otpError').textContent = '';
  goAuth('otp');
  showToast(`📱 Code SMS envoyé au ${phone} (démo: 1234)`, 'success');
  // Focus first box
  setTimeout(() => { const b = document.getElementById('otp0'); if (b) b.focus(); }, 300);

  // Countdown for resend button
  startResendCountdown();
}

function startResendCountdown() {
  const btn = document.getElementById('otpResendBtn');
  if (!btn) return;
  let secs = 30;
  btn.disabled = true;
  btn.textContent = `Renvoyer (${secs}s)`;
  const t = setInterval(() => {
    secs--;
    btn.textContent = secs > 0 ? `Renvoyer (${secs}s)` : 'Renvoyer le code';
    if (secs <= 0) { btn.disabled = false; clearInterval(t); }
  }, 1000);
}

/* OTP box auto-advance */
[0, 1, 2, 3].forEach(i => {
  const box = document.getElementById(`otp${i}`);
  if (!box) return;
  box.addEventListener('input', () => {
    // keep only digits
    box.value = box.value.replace(/\D/g, '').slice(-1);
    if (box.value && i < 3) document.getElementById(`otp${i + 1}`).focus();
  });
  box.addEventListener('keydown', e => {
    if (e.key === 'Backspace' && !box.value && i > 0) {
      document.getElementById(`otp${i - 1}`).focus();
    }
  });
});

document.getElementById('otpVerifyBtn').addEventListener('click', () => {
  const code = [0, 1, 2, 3].map(i => document.getElementById(`otp${i}`).value).join('');
  const errEl = document.getElementById('otpError');
  if (code.length < 4) { errEl.textContent = 'Saisissez les 4 chiffres du code.'; return; }
  if (code !== DEMO_OTP) {
    errEl.textContent = '❌ Code incorrect. Réessaie.';
    // Shake OTP boxes
    document.getElementById('otpBoxes').classList.add('otp-shake');
    setTimeout(() => document.getElementById('otpBoxes').classList.remove('otp-shake'), 500);
    return;
  }
  errEl.textContent = '';
  showToast('✅ Numéro vérifié !', 'success');
  if (_otpCallback) _otpCallback();
});

document.getElementById('otpResendBtn').addEventListener('click', () => {
  const phoneEl = document.getElementById('otpPhone');
  showToast(`📱 Code renvoyé au ${phoneEl?.textContent} (démo: 1234)`, 'success');
  [0, 1, 2, 3].forEach(i => { const b = document.getElementById(`otp${i}`); if (b) b.value = ''; });
  document.getElementById('otp0').focus();
  startResendCountdown();
});

document.getElementById('otpBack').addEventListener('click', () => {
  goAuth(_otpPrevScreen || 'splash');
});

/* ====================== AUTH ====================== */
function login(user) {
  appState.loggedIn = true;
  appState.user = user;
  // Show app shell over auth screens
  const shell = $('app-shell');
  shell.style.display = 'block';
  shell.style.position = 'fixed';
  shell.style.inset = '0';
  shell.style.zIndex = '400';
  shell.style.background = 'var(--bg)';
  // Load data & render
  loadApplied();
  renderHome();
  renderNav();          // ← role-based nav
  showScreen('home');
  updateHeader();
}

/** PME login: enter dashboard immediately, verification runs in background */
function loginSme(user) {
  appState.loggedIn = true;
  appState.user = { ...user, role: 'sme', verificationPending: true };
  const shell = $('app-shell');
  shell.style.display = 'block';
  shell.style.position = 'fixed';
  shell.style.inset = '0';
  shell.style.zIndex = '400';
  shell.style.background = 'var(--bg)';
  loadApplied();
  renderHome();
  renderNav();
  showScreen('home');
  updateHeader();
  // Show pending-verification banner at top of home screen
  showVerifBanner();
}

/** Render role-specific bottom nav */
function renderNav() {
  const role = appState.user?.role;
  const nav = $('bottomNav');
  if (!nav) return;
  if (role === 'student') {
    // Students: Accueil | Stats | Profil  (no Publier)
    nav.innerHTML = `
      <button class="nav-item active" data-screen="home">
        <span class="nav-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span>
        <span class="nav-label">Accueil</span>
      </button>
      <button class="nav-item" data-screen="dashboard">
        <span class="nav-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></span>
        <span class="nav-label">Stats</span>
      </button>
      <button class="nav-item" data-screen="profile">
        <span class="nav-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
        <span class="nav-label">Profil</span>
      </button>`;
  } else {
    // SME / demo: Accueil | Publier (+) | Stats | Profil
    nav.innerHTML = `
      <button class="nav-item active" data-screen="home">
        <span class="nav-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span>
        <span class="nav-label">Accueil</span>
      </button>
      <button class="nav-item" data-screen="post">
        <span class="nav-icon post-btn-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
        <span class="nav-label">Publier</span>
      </button>
      <button class="nav-item" data-screen="dashboard">
        <span class="nav-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></span>
        <span class="nav-label">Stats</span>
      </button>
      <button class="nav-item" data-screen="profile">
        <span class="nav-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
        <span class="nav-label">Profil</span>
      </button>`;
  }
  // Re-attach nav click listeners after DOM rebuild
  attachNavListeners();
}

/** Show amber banner on home screen for PME with pending verification */
function showVerifBanner() {
  // Remove any existing banner first
  const existing = document.getElementById('verifBanner');
  if (existing) existing.remove();
  const banner = document.createElement('div');
  banner.id = 'verifBanner';
  banner.className = 'verif-banner';
  banner.innerHTML = `
    <span>⏳</span>
    <div>
      <strong>Vérification en cours</strong>
      <p>Vos documents sont en examen (max 24h). Vous pourrez publier des missions dès validation.</p>
    </div>
    <button class="verif-banner-close" onclick="this.parentElement.remove()" title="Fermer">✕</button>`;
  // Insert at top of home screen
  const homeScreen = $('screen-home');
  if (homeScreen) homeScreen.prepend(banner);
}

function loadApplied() {
  try {
    const saved = JSON.parse(localStorage.getItem('qt_applied') || '[]');
    appState.appliedJobs = new Set(saved);
  } catch (_) { }
}
function saveApplied() {
  localStorage.setItem('qt_applied', JSON.stringify([...appState.appliedJobs]));
}

$('loginForm').addEventListener('submit', e => {
  e.preventDefault();
  const phone = $('loginEmail').value.replace(/\s/g, '');
  // Demo: accept any credentials, but trigger OTP
  sendOtp(phone || '07XXXXXXXX', 'login', () => {
    login(MOCK_USERS[0]);
    showToast('Connexion réussie 👋', 'success');
  });
});

$('signupStudentForm').addEventListener('submit', e => {
  e.preventDefault();
  // Validate before proceeding
  const first = $('studFirst').value;
  const last = $('studLast').value;
  const phone = $('studPhone').value.replace(/\s/g, '');
  const pass = $('studPass').value;
  let ok = true;

  if (!isValidName(first)) { fieldErr('studFirstErr', 'Prénom invalide (lettres uniquement)'); ok = false; }
  if (!isValidName(last)) { fieldErr('studLastErr', 'Nom invalide (lettres uniquement)'); ok = false; }
  if (!isValidPhone(phone)) { fieldErr('studPhoneErr', 'Numéro invalide (8-10 chiffres)'); ok = false; }
  if (!isValidPassword(pass)) { fieldErr('studPassErr', 'Mot de passe trop faible (chiffre + symbole requis)'); ok = false; }
  if (!ok) return;

  const operator = $('studOperator')?.value || 'orange';
  const pendingUser = {
    ...MOCK_USERS[0],
    role: 'student',
    firstName: first,
    lastName: last,
    city: $('studCity').value,
    phone,
    operator,
    status: 'pending',
  };

  sendOtp(phone, 'signup-student', () => {
    login(pendingUser);
    showToast('Compte Étudiant créé avec succès 🎉', 'success');
  });
});

$('signupSmeForm').addEventListener('submit', e => {
  e.preventDefault();
  const contact = $('smeContactName').value;
  const phone = $('smePhone').value.replace(/\s/g, '');
  const pass = $('smePass').value;
  let ok = true;

  if (!isValidName(contact)) { fieldErr('smeContactErr', 'Nom invalide (lettres uniquement)'); ok = false; }
  if (!isValidPhone(phone)) { fieldErr('smePhoneErr', 'Numéro invalide (8-10 chiffres)'); ok = false; }
  if (!isValidPassword(pass)) { fieldErr('smePassErr', 'Mot de passe trop faible (chiffre + symbole requis)'); ok = false; }
  if (!ok) return;

  sendOtp(phone, 'signup-sme', () => {
    const smeUser = {
      ...MOCK_USERS[0],
      role: 'sme',
      firstName: contact,
      lastName: $('smeCompanyName').value || 'PME',
      city: "Côte d'Ivoire",
      phone,
    };
    loginSme(smeUser);
    showToast('Compte PME créé ! Vérification en cours 🏢', 'success');
  });
});

$('smeVerifyBypass').addEventListener('click', () => {
  const user = {
    ...MOCK_USERS[0],
    role: 'sme',
    firstName: $('smeContactName').value || 'Client',
    lastName: $('smeCompanyName').value || 'Pro',
    city: "Côte d'Ivoire",
    phone: $('smePhone').value,
  };
  login(user);
  showToast('Compte Pro activé (Démo) ✅', 'success');
});

// Navigation between auth screens
$('splashLogin').addEventListener('click', () => goAuth('login'));
$('splashSignupBtn').addEventListener('click', () => goAuth('role'));
$('splashDemo').addEventListener('click', () => {
  // Demo logs in as default student user
  login({ ...MOCK_USERS[0], role: 'student' });
  showToast('Mode démo activé 🎮', 'success');
});

$('loginBack').addEventListener('click', () => goAuth('splash'));
$('goLoginFromRole').addEventListener('click', () => goAuth('login'));
$('goSignup').addEventListener('click', () => goAuth('role'));

$('roleBack').addEventListener('click', () => goAuth('splash'));
$('roleStudent').addEventListener('click', () => goAuth('signup-student'));
$('roleSme').addEventListener('click', () => goAuth('signup-sme'));

$('signupStudentBack').addEventListener('click', () => goAuth('role'));
$('signupSmeBack').addEventListener('click', () => goAuth('role'));

/** Re-attach nav click listeners (called after renderNav() rebuilds the nav DOM) */
function attachNavListeners() {
  document.querySelectorAll('#bottomNav .nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const screen = btn.dataset.screen;
      if (!screen) return;
      document.querySelectorAll('#bottomNav .nav-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showScreen(screen);
    });
  });
}

/* ====================== HEADER ====================== */
function updateHeader() {
  if (!appState.user) return;
  const u = appState.user;
  $('homeGreeting').textContent = `Bonjour, ${u.firstName} 👋`;
  $('locText').textContent = u.city;
  $('headerAvatar').textContent = (u.firstName[0] + (u.lastName ? u.lastName[0] : '')).toUpperCase();
}
$('headerAvatar').addEventListener('click', () => showScreen('profile'));

/* ====================== HOME / DISCOVERY ====================== */
function renderHome() {
  renderUrgentScroll();
  renderJobsGrid();
}

function getFilteredJobs() {
  let jobs = [...appState.jobs, ...appState.postedJobs];
  // Category
  if (appState.filteredCat !== 'all') {
    jobs = jobs.filter(j => j.cat === appState.filteredCat);
  }
  // Distance
  if (appState.filterDist !== 'all') {
    const d = parseFloat(appState.filterDist);
    jobs = jobs.filter(j => j.dist <= d || j.dist === 0);
  }
  // Reward
  if (appState.filterReward !== 'all') {
    const r = parseInt(appState.filterReward);
    jobs = jobs.filter(j => j.reward >= r);
  }
  // Search
  if (appState.searchQ.trim()) {
    const q = appState.searchQ.toLowerCase();
    jobs = jobs.filter(j => j.title.toLowerCase().includes(q) || j.desc.toLowerCase().includes(q) || j.location.toLowerCase().includes(q));
  }
  return jobs;
}

function renderUrgentScroll() {
  const urgent = appState.jobs.filter(j => j.urgent).slice(0, 5);
  const container = $('urgentScroll');
  container.innerHTML = urgent.map(j => `
    <div class="job-card-h" data-id="${j.id}">
      <div class="job-card-cover" style="${cardBg(j)} background-size:cover; background-position:center;"
           onerror="this.style.backgroundImage='none'; this.style.background='${CAT_GRADIENTS[j.cat] || CAT_GRADIENTS.autre}';">
        <span class="job-urgent-badge">🔴 Urgent</span>
      </div>
      <div class="job-card-pad">
        <div class="job-meta" style="margin-bottom:8px">
          <span class="job-reward">${fmtReward(j.reward)}</span>
        </div>
        <div class="job-title">${escHtml(j.title)}</div>
        <div class="job-loc">📍 ${escHtml(j.location)}</div>
        <div class="job-poster">
          <div class="job-poster-avatar">${j.posterName[0]}</div>
          <div>
            <div class="job-poster-name">${escHtml(j.posterName)}</div>
            <div class="job-poster-stars">${'★'.repeat(Math.round(j.posterRating))}${'☆'.repeat(5 - Math.round(j.posterRating))}</div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
  container.querySelectorAll('.job-card-h').forEach(card => {
    card.addEventListener('click', () => openJobDetail(card.dataset.id));
  });
}

function renderJobsGrid() {
  const jobs = getFilteredJobs();
  const grid = $('jobsGrid');
  const empty = $('emptyState');
  const countBadge = $('jobsCountBadge');

  if (jobs.length === 0) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    countBadge.textContent = '';
  } else {
    empty.classList.add('hidden');
    countBadge.textContent = `${jobs.length} mission${jobs.length > 1 ? 's' : ''}`;
    grid.innerHTML = jobs.map(j => `
      <div class="job-card-v" data-id="${j.id}">
        <div class="job-card-v-img" style="${cardBg(j)} background-size:cover; background-position:center;">
          <div class="job-cat-icon-float">${CAT_ICONS[j.cat] || ''}</div>
        </div>
        <div class="job-card-body">
          <div class="job-title">${escHtml(j.title)}</div>
          <div class="job-loc">📍 ${escHtml(j.location)}</div>
          <div class="job-meta">
            <span class="job-reward">${fmtReward(j.reward)}</span>
            ${j.urgent ? '<span class="job-urgent">🔴</span>' : ''}
            <span class="job-time" style="margin-left:auto">${j.postedAgo}</span>
          </div>
        </div>
        <div class="job-card-footer">
          <span>⏱ ${j.duration} · ★ ${j.posterRating}</span>
          ${appState.appliedJobs.has(j.id)
        ? '<span class="job-applied-badge">✓ Postulé</span>'
        : `<button class="job-apply-quick" data-id="${j.id}" onclick="event.stopPropagation(); quickApply('${j.id}')" title="Postuler rapidement">Postuler ⚡</button>`
      }
        </div>
      </div>
    </div>
  `).join('');
    grid.querySelectorAll('.job-card-v').forEach(card => {
      card.addEventListener('click', () => openJobDetail(card.dataset.id));
    });
  }

  // Filter chips
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      appState.filteredCat = chip.dataset.cat;
      renderJobsGrid();
    });
  });

  $('filterDist').addEventListener('change', () => {
    appState.filterDist = $('filterDist').value;
    renderJobsGrid();
  });
  $('filterReward').addEventListener('change', () => {
    appState.filterReward = $('filterReward').value;
    renderJobsGrid();
  });

  let searchTimeout;
  $('searchInput').addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      appState.searchQ = $('searchInput').value;
      renderJobsGrid();
    }, 280);
  });

  $('seeAllBtn').addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    document.querySelector('.filter-chip[data-cat="all"]').classList.add('active');
    appState.filteredCat = 'all';
    renderJobsGrid();
  });

  /* ====================== JOB DETAIL ====================== */
  function openJobDetail(jobId) {
    const job = [...appState.jobs, ...appState.postedJobs].find(j => j.id === jobId);
    if (!job) return;
    appState.currentJob = job;
    renderJobDetail(job);
    // Hide home, show detail (no nav switch)
    document.querySelectorAll('.app-screen').forEach(s => s.classList.remove('active'));
    $('screen-detail').classList.add('active');
  }

  function renderJobDetail(job) {
    const applied = appState.appliedJobs.has(job.id);
    $('detailContent').innerHTML = `
    <div class="detail-hero" style="background-image:linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(255,255,255,1) 100%), url('${job.image}'); background-size:cover; background-position:center; height:220px; position:relative; margin:-20px -20px 0;"></div>
    <div class="detail-hero-content" style="padding: 10px 0 20px; border-bottom: 1px solid var(--border);">
      <div class="detail-cat-badge" style="display:inline-flex;align-items:center;padding:4px 10px;background:var(--primary-l);color:var(--primary);border-radius:50px;font-size:0.8rem;font-weight:600;margin-bottom:8px;">
        ${CAT_ICONS[job.cat] || ''} <span style="margin-left:6px">${job.cat.charAt(0).toUpperCase() + job.cat.slice(1)}</span>
      </div>
      <div class="detail-title">${escHtml(job.title)}</div>
      <div class="detail-meta">
        <span class="detail-badge badge-reward">💰 ${fmtReward(job.reward)}</span>
        ${job.dist > 0 ? `<span class="detail-badge badge-dist">📍 ${job.dist} km</span>` : '<span class="detail-badge badge-dist">💻 En ligne</span>'}
        <span class="detail-badge badge-duration">⏱ ${job.duration}</span>
        ${job.urgent ? '<span class="detail-badge badge-urgent">🔴 Urgent</span>' : ''}
      </div>
      <div style="font-size:0.78rem;color:var(--text3);margin-top:10px;">Publiée ${job.postedAgo} · ${job.applicants} postulant(s)</div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">📋 Description de la mission</div>
      <p>${escHtml(job.desc)}</p>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">📍 Lieu de mission</div>
      <p style="font-weight:600">${escHtml(job.location)}</p>
      ${job.dist > 0 ? `<p style="color:var(--text3);font-size:0.82rem;margin-top:4px">À ${job.dist} km de votre position</p>` : '<p style="color:var(--cyan);font-size:0.82rem;margin-top:4px">🌐 Mission en télétravail</p>'}
      ${job.dist > 0 ? `<div style="margin-top:12px;height:120px;border-radius:12px;background:url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=400&h=120&auto=format&fit=crop') center/cover;display:flex;align-items:center;justify-content:center;border:1px solid var(--border);"><button class="btn btn-primary" style="padding:6px 12px;font-size:0.75rem;border-radius:50px;box-shadow:var(--shadow)">🗺️ Ouvrir la carte</button></div>` : ''}
    </div>

    <div class="detail-section">
      <div class="detail-section-title">👤 Donneur de mission</div>
      <div class="detail-poster-card">
        <div class="detail-poster-av">${job.posterName[0]}</div>
        <div>
          <div class="detail-poster-name">${escHtml(job.posterName)}</div>
          <div class="detail-poster-meta">${job.posterJobs} missions publiées</div>
        </div>
        <div class="detail-poster-stats">
          <div class="detail-poster-rating">★ ${job.posterRating}</div>
          <div class="detail-poster-jobs" style="font-size:0.7rem;color:var(--text3)">Note</div>
        </div>
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">✅ Ce qu'on attendra de toi</div>
      <ul style="font-size:0.88rem;color:var(--text2);line-height:1.8;padding-left:18px">
        <li>Être disponible à l'heure convenue</li>
        <li>Travail soigné et professionnel</li>
        <li>Bonne communication avec le client</li>
        <li>Laisser un avis après la mission</li>
      </ul>
    </div>

    <!-- Apply bar -->
    <div class="detail-apply-bar">
      <div class="apply-quick-info">
        <div class="apply-reward">${fmtReward(job.reward)}</div>
        <div class="apply-duration">⏱ ${job.duration}</div>
      </div>
      <button class="apply-btn ${applied ? 'applied' : ''}" id="applyBtn"
        onclick="applyCurrentJob()" ${applied ? 'disabled' : ''}>
        ${applied ? '\u2713 Post\u00fcl\u00e9' : '\u26a1 Postuler maintenant'}
      </button>
    </div>
  `;
    // Apply button bound via global onclick (avoids timing issues with innerHTML injection)
    // See applyCurrentJob() below
  }

  function handleApply(job) {
    if (!job) return;
    appState.appliedJobs.add(job.id);
    saveApplied();
    // Add to mock applications
    MOCK_APPLICATIONS.unshift({
      jobId: job.id, title: job.title, cat: job.cat,
      status: 'applied', reward: job.reward, date: 'Aujourd\'hui'
    });
    // Update apply button in detail view if open
    const btn = $('applyBtn');
    if (btn) { btn.disabled = true; btn.classList.add('applied'); btn.textContent = '\u2713 Post\u00fcl\u00e9'; }
    // Show confirmation modal
    $('applyModal').classList.remove('hidden');
    $('modalTitle').textContent = 'Candidature envoy\u00e9e ! \uD83C\uDF89';
    $('modalSub').textContent = `Ta candidature pour "${job.title}" a \u00e9t\u00e9 envoy\u00e9e \u00e0 ${job.posterName}. Tu seras notifi\u00e9(e) rapidement.`;
    renderJobsGrid();
  }

  /** Global function called by inline onclick on the apply button */
  function applyCurrentJob() {
    handleApply(appState.currentJob);
  }

  $('detailBack').addEventListener('click', () => {
    $('screen-detail').classList.remove('active');
    $('screen-home').classList.add('active');
    appState.currentScreen = 'home';
  });

  $('detailShare').addEventListener('click', () => showToast('Lien copié dans le presse-papier 📋'));

  // Modal
  $('modalClose').addEventListener('click', () => $('applyModal').classList.add('hidden'));
  $('modalViewDash').addEventListener('click', () => {
    $('applyModal').classList.add('hidden');
    $('screen-detail').classList.remove('active');
    showScreen('dashboard');
  });

  /* ====================== POST JOB & PAYMENT ====================== */
  let pendingJob = null;

  $('postForm').addEventListener('submit', e => {
    e.preventDefault();
    const title = $('postTitle').value;
    const cat = $('postCat').value;
    const desc = $('postDesc').value;
    const reward = parseInt($('postReward').value);
    const duration = $('postDuration').value;
    const loc = $('postLoc').value;

    if (!cat) { showToast('Choisir une catégorie', 'error'); return; }
    if (reward < 500) { showToast('Rémunération minimum : 500 FCFA', 'error'); return; }

    pendingJob = {
      id: 'p' + Date.now(), title, cat, desc, reward, dist: 0.5, duration,
      location: loc, urgent: false, isNew: true,
      posterName: appState.user.firstName + ' ' + appState.user.lastName[0] + '.',
      posterRating: 5.0, posterJobs: 0,
      postedAgo: "À l'instant", applicants: 0,
    };

    // Prompt payment (Escrow) instead of instant post
    $('paymentModal').classList.remove('hidden');
  });

  $('cancelPaymentBtn').addEventListener('click', () => {
    $('paymentModal').classList.add('hidden');
    pendingJob = null;
  });

  // Select pack logic
  let selectedPack = 1;
  $('paySingleBtn').addEventListener('click', () => {
    selectedPack = 1;
    $('paySingleBtn').style.borderColor = 'var(--primary)';
    $('paySingleBtn').style.background = 'var(--primary-l)';
    $('payPackBtn').style.borderColor = 'var(--border)';
    $('payPackBtn').style.background = 'transparent';
  });
  $('payPackBtn').addEventListener('click', () => {
    selectedPack = 3;
    $('payPackBtn').style.borderColor = 'var(--primary)';
    $('payPackBtn').style.background = 'var(--primary-l)';
    $('paySingleBtn').style.borderColor = 'var(--border)';
    $('paySingleBtn').style.background = 'transparent';
  });

  $('confirmPaymentBtn').addEventListener('click', () => {
    if (!pendingJob) return;
    const btn = $('confirmPaymentBtn');
    const originalText = btn.textContent;
    btn.textContent = 'Connexion Mobile Money...';

    setTimeout(() => {
      // Escrow simulation successful
      appState.postedJobs.unshift(pendingJob);
      appState.jobs.unshift(pendingJob);
      $('postForm').reset();
      $('paymentModal').classList.add('hidden');
      btn.textContent = originalText;
      showToast(`Paiement de ${selectedPack === 1 ? '500' : '1000'} FCFA effectué ! Mission publiée.`, 'success');
      setTimeout(() => showScreen('home'), 800);
      renderHome();
      pendingJob = null;
    }, 1500);
  });

  $('postBack').addEventListener('click', () => showScreen('home'));

  /* ====================== DASHBOARD & VALIDATION ====================== */
  window.markJobDoneByStudent = (jobId) => {
    const app = MOCK_APPLICATIONS.find(a => a.jobId === jobId);
    if (app) app.status = 'completed_by_student';

    // Also update SME posted jobs if it exists there (for local state sync)
    const posted = appState.postedJobs.find(j => j.id === jobId);
    if (posted) posted.status = 'completed_by_student';

    showToast('Mission marquée comme terminée. En attente du client.', 'success');
    renderDashboard();
  };

  window.validateJobBySME = (jobId) => {
    // Update SME posted jobs
    const posted = appState.postedJobs.find(j => j.id === jobId);
    if (posted) posted.status = 'done';

    // Also update student mock apps
    const app = MOCK_APPLICATIONS.find(a => a.jobId === jobId);
    if (app) app.status = 'done';

    showToast('Paiement validé ! Fonds transférés à l\'étudiant.', 'success');
    renderDashboard();
  };

  function renderDashboard() {
    const u = appState.user;
    const isSME = u.role === 'sme';

    // Determine relevant list
    // SME: posted jobs. Student: applied operations
    const apps = isSME
      ? appState.postedJobs.map(j => ({ ...j, jobId: j.id, status: 'pending', date: 'En cours' }))
      : MOCK_APPLICATIONS;

    const done = apps.filter(a => a.status === 'done');

    // Commission logic: 10% deduction on earnings
    const grossEarnings = done.reduce((s, a) => s + a.reward, 0);
    const netEarnings = isSME ? grossEarnings : grossEarnings * 0.9;
    const completedCount = isSME ? done.length : (done.length + u.completedJobs);

    $('dashBody').innerHTML = `
    <!-- KPIs -->
    <div class="dash-kpi-grid">
      <div class="dash-kpi">
        <div class="dash-kpi-icon">📤</div>
        <div class="dash-kpi-val">${isSME ? appState.postedJobs.length : apps.length + appState.appliedJobs.size}</div>
        <div class="dash-kpi-label">${isSME ? 'Missions publiées' : 'Candidatures'}</div>
      </div>
      <div class="dash-kpi">
        <div class="dash-kpi-icon">✅</div>
        <div class="dash-kpi-val">${completedCount}</div>
        <div class="dash-kpi-label">Missions validées</div>
      </div>
      <div class="dash-kpi" style="border:1px solid var(--primary)">
        <div class="dash-kpi-icon" style="color:var(--primary)">💰</div>
        <div class="dash-kpi-val" style="font-size:1.05rem;color:var(--primary)">${fmtReward(netEarnings)}</div>
        <div class="dash-kpi-label">${isSME ? 'Dépenses' : 'Gains (Net)'}</div>
      </div>
      <div class="dash-kpi" style="cursor:pointer" onclick="showScreen('profile')">
        <div class="dash-kpi-icon">⭐</div>
        <div class="dash-kpi-val">${u.rating || 5.0}</div>
        <div class="dash-kpi-label">Note</div>
      </div>
    </div>

    <!-- Reliability score (Only for student) -->
    ${!isSME ? `
    <div class="dash-card">
      <div class="dash-card-header">
        <div class="dash-card-title">🎯 Score de fiabilité</div>
        <span class="dash-card-badge" style="background:${u.reliabilityScore >= 80 ? 'var(--success-l)' : 'var(--warn-l)'};color:${u.reliabilityScore >= 80 ? 'var(--success)' : 'var(--warn)'}">
          ${u.reliabilityScore >= 80 ? '🏅 Excellent' : '📈 En progrès'}
        </span>
      </div>
      <div class="progress-wrap">
        <div class="progress-label"><span>Missions complétées</span><span>${completedCount}/20</span></div>
        <div class="progress-bar"><div class="progress-fill fill-primary" style="width:${(completedCount / 20) * 100}%"></div></div>
      </div>
    </div>` : ''}

    <!-- Recent applications / missions -->
    <div class="dash-card">
      <div class="dash-card-header">
        <div class="dash-card-title">📋 ${isSME ? 'Missions en cours (Escrow)' : 'Mes candidatures'}</div>
      </div>
      ${apps.length === 0 ? '<p style="font-size:0.85rem;color:var(--text3);padding:10px">Aucune donnée.</p>' : ''}
      ${apps.map(a => `
        <div class="mission-item" style="display:flex; flex-direction:column; gap:8px;">
          <div style="display:flex; align-items:center; width:100%;">
            <div class="mission-item-icon">${CAT_ICONS[a.cat] || '✨'}</div>
            <div class="mission-item-body">
              <div class="mission-item-title">${escHtml(a.title)}</div>
              <div class="mission-item-meta">${a.date} · ${fmtReward(a.reward)} ${!isSME ? '<br><span style="color:var(--success);font-size:0.7rem">Gains Net : ' + fmtReward(a.reward * 0.9) + ' (Commission 10%)</span>' : ''}</div>
            </div>
            <span class="mission-item-status ${a.status === 'done' ? 'status-done' : (a.status === 'completed_by_student' ? 'status-applied' : (a.status === 'pending' ? 'status-pending' : 'status-applied'))}">
              ${a.status === 'done' ? '✓ Terminé' : (a.status === 'completed_by_student' ? 'En validation' : (a.status === 'pending' ? '⏳ En cours' : '📤 Candidaté'))}
            </span>
          </div>
          <!-- VALIDATION ACTIONS -->
          ${a.status !== 'done' ? `
          <div style="border-top:1px dashed var(--border); padding-top:8px; display:flex; justify-content:flex-end;">
            ${isSME
          ? (a.status === 'completed_by_student'
            ? `<button class="btn btn-primary" style="font-size:0.75rem;padding:6px 12px;display:flex;align-items:center;gap:4px" onclick="validateJobBySME('${a.jobId}')">🛡️ Valider le paiement & travail</button>`
            : `<span style="font-size:0.75rem;color:var(--text3)">En attente de l'étudiant</span>`)
          : (a.status === 'pending' || a.status === 'applied' // allow marking done on applied for demo sake
            ? `<button class="btn btn-outline" style="font-size:0.75rem;padding:6px 12px;border-color:var(--primary);color:var(--primary)" onclick="markJobDoneByStudent('${a.jobId}')">✅ Marquer comme terminé</button>`
            : `<span style="font-size:0.75rem;color:var(--warn)">En attente de validation PME</span>`)
        }
          </div>
          ` : ''}
        </div>
      `).join('')}
    </div>
  `;
  }

  /* ====================== PROFILE ====================== */
  function renderProfile() {
    const u = appState.user;
    $('profileHeader').innerHTML = `
    <div class="profile-avatar">${(u.firstName[0] + u.lastName[0]).toUpperCase()}</div>
    <div class="profile-name">${u.firstName} ${u.lastName}</div>
    <div class="profile-handle">@${u.firstName.toLowerCase()}${u.age} · ${u.city}</div>
    <div class="profile-badges">
      ${u.completedJobs >= 10 ? '<span class="profile-badge">🏅 Vétéran</span>' : ''}
      ${u.rating >= 4.5 ? '<span class="profile-badge">⭐ Top noté</span>' : ''}
      <span class="profile-badge">✅ Vérifié</span>
      <span class="profile-badge">🎓 Étudiant</span>
    </div>
  `;

    $('profileBody').innerHTML = `
    <!-- Stats -->
    <div class="profile-stats-row">
      <div class="profile-stat">
        <div class="profile-stat-val">${u.completedJobs}</div>
        <div class="profile-stat-label">Missions faites</div>
      </div>
      <div class="profile-stat">
        <div class="profile-stat-val">★ ${u.rating}</div>
        <div class="profile-stat-label">Note moy.</div>
      </div>
      <div class="profile-stat">
        <div class="profile-stat-val">${u.reliabilityScore}%</div>
        <div class="profile-stat-label">Fiabilité</div>
      </div>
    </div>

    <!-- Info -->
    <div class="profile-card">
      <div class="profile-card-section">
        <div class="profile-field-label">Nom complet</div>
        <div class="profile-field-value">${u.firstName} ${u.lastName}</div>
      </div>
      <div class="profile-card-section">
        <div class="profile-field-label">Âge</div>
        <div class="profile-field-value">${u.age} ans</div>
      </div>
      <div class="profile-card-section">
        <div class="profile-field-label">Ville</div>
        <div class="profile-field-value">📍 ${u.city}</div>
      </div>
      <div class="profile-card-section">
        <div class="profile-field-label">Téléphone</div>
        <div class="profile-field-value">${u.phone}</div>
      </div>
      <div class="profile-card-section">
        <div class="profile-field-label">Membre depuis</div>
        <div class="profile-field-value">${u.joinedDate}</div>
      </div>
    </div>

    <!-- Menu -->
    <div class="profile-card">
      ${[
        { icon: '📋', label: 'Mes candidatures', screen: 'dashboard' },
        { icon: '📢', label: 'Missions publiées', screen: 'post' },
        { icon: '⭐', label: 'Mes avis reçus', screen: null },
        { icon: '🔔', label: 'Notifications', screen: null },
        { icon: '🔒', label: 'Confidentialité & Sécurité', screen: null },
        { icon: '❓', label: 'Aide & Support', screen: null },
      ].map(item => `
        <div class="profile-menu-item" ${item.screen ? `onclick="showScreen('${item.screen}')"` : ''}>
          <div class="profile-menu-icon">${item.icon}</div>
          <div class="profile-menu-label">${item.label}</div>
          <div class="profile-menu-arrow">›</div>
        </div>
      `).join('')}
    </div>

    <!-- Logout -->
    <button class="btn btn-ghost btn-full" id="logoutBtn" style="margin-top:4px">Se déconnecter</button>
  `;
    $('logoutBtn').addEventListener('click', () => {
      appState.loggedIn = false; appState.user = null;
      $('app-shell').classList.add('hidden');
      goAuth('splash');
      showToast('Déconnexion réussie');
    });
  }

  /* ====================== BOTTOM NAV ====================== */
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => showScreen(item.dataset.screen));
  });

  /* ====================== INIT ====================== */
  window.showScreen = showScreen;       // expose to inline onclick
  window.applyCurrentJob = applyCurrentJob; // expose to inline onclick in detail view
  window.quickApply = quickApply;       // expose to inline onclick on grid cards
  goAuth('splash');

  /** Quick-apply from a grid card (no detail page needed) */
  function quickApply(jobId) {
    if (appState.appliedJobs.has(jobId)) return;
    const job = [...appState.jobs, ...appState.postedJobs].find(j => j.id === jobId);
    if (!job) return;
    appState.currentJob = job; // set for the modal
    handleApply(job);
  }
}
  
