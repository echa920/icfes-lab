/* ICFES Lab — lógica de la aplicación */
'use strict';

const KEY  = 'icfeslab.v2';
const KEYQ = 'icfeslab.v2.enCurso';   // intento de diagnóstico sin terminar
const $  = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));
const byId = (id) => BANCO.find(q => q.id === id);
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));

/* ==================================================================
   Puntajes
   Global = [ (3·LC + 3·MAT + 3·SOC + 3·CN + 1·ING) ÷ 13 ] × 5  → 0–500
================================================================== */
function globalScore(areaScores) {
  let num = 0, den = 0;
  for (const a of AREAS) {
    const v = areaScores[a.id];
    if (typeof v !== 'number' || isNaN(v)) continue;
    num += a.peso * v; den += a.peso;
  }
  return den ? Math.round((num / den) * 5) : 0;
}

/* Puntaje 0–100 por área a partir del porcentaje de aciertos.
   El Icfes usa Teoría de Respuesta al Ítem, que no es pública; esto es una
   curva de aproximación calibrada para que 50 % de aciertos caiga cerca del
   promedio nacional (~51). Es orientación, no pronóstico. */
function areaScore(ok, n) {
  if (!n) return 0;
  const pct = ok / n;
  return Math.max(0, Math.min(100, Math.round(100 * Math.pow(pct, 0.95))));
}

function nivelDe(areaId, score) {
  const escala = NIVELES[areaId];
  for (let i = 0; i < escala.length; i++) if (score <= escala[i].max) return { n: escala[i].n, i };
  return { n: escala[escala.length - 1].n, i: escala.length - 1 };
}

/* ==================================================================
   Datos de ejemplo — 5 intentos con promedio global exacto de 268
   (248 + 259 + 267 + 278 + 288) ÷ 5 = 268
================================================================== */
const DEMO_ATTEMPTS = [
  { date:'2026-05-09', kind:'Diagnóstico', nQ:20, ok:10, demo:true, areas:{ lc:53, mat:46, soc:51, cn:48, ing:51 } },
  { date:'2026-06-13', kind:'Diagnóstico', nQ:20, ok:11, demo:true, areas:{ lc:55, mat:48, soc:53, cn:50, ing:55 } },
  { date:'2026-07-18', kind:'Diagnóstico', nQ:20, ok:11, demo:true, areas:{ lc:57, mat:50, soc:54, cn:52, ing:55 } },
  { date:'2026-08-22', kind:'Diagnóstico', nQ:20, ok:12, demo:true, areas:{ lc:59, mat:53, soc:56, cn:54, ing:57 } },
  { date:'2026-09-19', kind:'Diagnóstico', nQ:20, ok:12, demo:true, areas:{ lc:61, mat:56, soc:58, cn:56, ing:56 } }
];

function seedState() {
  const st = {
    examDate: '2027-03-14',
    goal: 320,
    attempts: DEMO_ATTEMPTS.map(a => ({ ...a, global: globalScore(a.areas) })),
    stats: {},     // por área: { n, ok }  — solo práctica
    wrong: [],     // ids fallados pendientes
    seen: [],      // ids vistos alguna vez
    videos: [],
    hasDemo: true
  };
  for (const a of AREAS) st.stats[a.id] = { n: 0, ok: 0 };
  return st;
}

function normalize(st) {
  if (!st || typeof st !== 'object') return seedState();
  if (!st.stats) st.stats = {};
  for (const a of AREAS) if (!st.stats[a.id]) st.stats[a.id] = { n: 0, ok: 0 };
  if (!Array.isArray(st.attempts)) st.attempts = [];
  if (!Array.isArray(st.wrong)) st.wrong = [];
  if (!Array.isArray(st.seen)) st.seen = [];
  if (!Array.isArray(st.videos)) st.videos = [];
  if (!st.examDate) st.examDate = '2027-03-14';
  if (typeof st.goal !== 'number') st.goal = 320;
  // descarta ids que ya no existen en el banco
  st.wrong = st.wrong.filter(byId);
  st.seen  = st.seen.filter(byId);
  return st;
}

let S = (() => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? normalize(JSON.parse(raw)) : seedState();
  } catch (e) { return seedState(); }
})();

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
}

/* ==================================================================
   Router
================================================================== */
const VIEWS = ['inicio','promedio','diag','practica','progreso','mas','quiz','result','review'];
const TABS  = ['inicio','promedio','diag','practica','progreso','mas'];

function go(view) {
  for (const v of VIEWS) { const el = $('#view-' + v); if (el) el.hidden = (v !== view); }
  $$('nav button').forEach(b => b.setAttribute('aria-current', String(b.dataset.go === view)));
  window.scrollTo(0, 0);
  if (view === 'inicio')   renderInicio();
  if (view === 'promedio') renderPromedio();
  if (view === 'diag')     renderDiag();
  if (view === 'practica') renderPractica();
  if (view === 'progreso') renderProgreso();
  if (view === 'mas')      renderMas();
}

/* ==================================================================
   INICIO
================================================================== */
const avgGlobal = () => S.attempts.length
  ? Math.round(S.attempts.reduce((s, a) => s + a.global, 0) / S.attempts.length) : null;

function latestAreas() {
  if (S.attempts.length) return S.attempts[S.attempts.length - 1].areas;
  const out = {};
  for (const a of AREAS) out[a.id] = areaScore(S.stats[a.id].ok, S.stats[a.id].n);
  return out;
}

function renderDday() {
  const d = new Date(S.examDate + 'T00:00:00');
  const t = new Date(); t.setHours(0, 0, 0, 0);
  const days = Math.round((d - t) / 86400000);
  $('#dday').textContent = isNaN(days) ? '—' : (days > 0 ? days : days === 0 ? 'hoy' : '—');
  $('#ddayLbl').textContent = days === 0 ? 'es hoy' : days < 0 ? 'fecha pasada' : 'días para la prueba';
  $('#ddayBtn').title = 'Prueba: ' + S.examDate + ' — toca para cambiarla';
}

function renderInicio() {
  renderDday();

  if (!S.attempts.length) {
    $('#heroTitle').textContent = 'Sin puntajes aún';
    $('#heroSub').textContent = 'Empieza con el diagnóstico para saber dónde estás parado.';
  } else {
    const n = S.attempts.length, last = S.attempts[n-1].global, first = S.attempts[0].global;
    const d = last - first;
    $('#heroTitle').textContent = 'Último puntaje: ' + last + ' / 500';
    $('#heroSub').textContent = n === 1
      ? 'Un aplicante registrado · meta ' + S.goal
      : n + ' aplicantes · promedio ' + avgGlobal() + ' · ' +
        (d >= 0 ? '+' + d : d) + ' entre el primero y el último · meta ' + S.goal;
  }

  const totQ  = S.attempts.reduce((s,a) => s + (a.nQ||0), 0) + AREAS.reduce((s,a) => s + S.stats[a.id].n, 0);
  const totOk = S.attempts.reduce((s,a) => s + (a.ok||0), 0) + AREAS.reduce((s,a) => s + S.stats[a.id].ok, 0);
  $('#stExams').textContent = S.attempts.length;
  $('#stQs').textContent    = totQ;
  $('#stAcc').textContent   = totQ ? Math.round(100*totOk/totQ) + '%' : '—';

  const areas = latestAreas();
  $('#areaBars').innerHTML = AREAS.map(a => {
    const v = areas[a.id] || 0, lv = nivelDe(a.id, v);
    const cls = lv.i >= 3 ? 'n4' : lv.i === 2 ? 'n3' : '';
    return '<div class="area"><div class="areaTop"><b>' + a.nombre + '</b>' +
      '<span class="lvl ' + cls + '">' + lv.n + '</span>' +
      '<span class="tiny">peso ' + a.peso + '</span>' +
      '<em>' + v + ' / 100</em></div>' +
      '<div class="bar"><i style="width:' + v + '%;background:' + a.color + '"></i></div></div>';
  }).join('');

  renderChart();
}

function renderChart() {
  const svg = $('#chart');
  const W = 660, H = 200, PL = 44, PR = 16, PT = 18, PB = 32;
  const pts = S.attempts.map(a => a.global);

  if (pts.length < 2) {
    svg.innerHTML = '<text x="' + (W/2) + '" y="' + (H/2) + '" fill="#6b7f9c" font-size="14" ' +
      'text-anchor="middle">Con dos intentos o más aparece aquí tu evolución.</text>';
    return;
  }

  const all = pts.concat([S.goal]);
  const lo = Math.max(0,   Math.min(...all) - 25);
  const hi = Math.min(500, Math.max(...all) + 25);
  const x = i => PL + (W - PL - PR) * (i / (pts.length - 1));
  const y = v => PT + (H - PT - PB) * (1 - (v - lo) / (hi - lo));

  let g = '';
  for (let k = 0; k <= 3; k++) {
    const v = lo + (hi - lo) * k / 3, yy = y(v);
    g += '<line x1="'+PL+'" y1="'+yy.toFixed(1)+'" x2="'+(W-PR)+'" y2="'+yy.toFixed(1)+
         '" stroke="#22334c" stroke-width="1"/>' +
         '<text x="'+(PL-8)+'" y="'+(yy+4).toFixed(1)+'" fill="#6b7f9c" font-size="11" ' +
         'text-anchor="end">'+Math.round(v)+'</text>';
  }
  // meta
  if (S.goal >= lo && S.goal <= hi) {
    g += '<line x1="'+PL+'" y1="'+y(S.goal).toFixed(1)+'" x2="'+(W-PR)+'" y2="'+y(S.goal).toFixed(1)+
         '" stroke="#34d399" stroke-width="1.5" stroke-dasharray="6 4" opacity=".8"/>' +
         '<text x="'+(W-PR)+'" y="'+(y(S.goal)-7).toFixed(1)+'" fill="#34d399" font-size="11" ' +
         'text-anchor="end">meta '+S.goal+'</text>';
  }
  // promedio
  const avg = avgGlobal();
  g += '<line x1="'+PL+'" y1="'+y(avg).toFixed(1)+'" x2="'+(W-PR)+'" y2="'+y(avg).toFixed(1)+
       '" stroke="#fbbf24" stroke-width="1" stroke-dasharray="4 4" opacity=".5"/>' +
       '<text x="'+(PL+6)+'" y="'+(y(avg)-7).toFixed(1)+'" fill="#fbbf24" font-size="11">prom. '+avg+'</text>';

  g += '<path d="' + pts.map((v,i) => (i?'L':'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1)).join(' ') +
       '" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';

  pts.forEach((v, i) => {
    g += '<circle cx="'+x(i).toFixed(1)+'" cy="'+y(v).toFixed(1)+'" r="4.5" fill="#0b1220" ' +
         'stroke="#38bdf8" stroke-width="2.5"/>' +
         '<text x="'+x(i).toFixed(1)+'" y="'+(y(v)-12).toFixed(1)+'" fill="#e8eef8" font-size="11.5" ' +
         'font-weight="700" text-anchor="middle">'+v+'</text>' +
         '<text x="'+x(i).toFixed(1)+'" y="'+(H-10)+'" fill="#6b7f9c" font-size="10.5" ' +
         'text-anchor="middle">'+(i+1)+'</text>';
  });
  svg.innerHTML = g;
}

/* ==================================================================
   PROMEDIO — un puntaje por aplicante, en orden de registro
================================================================== */
const aplicante = (i) => 'Aplicante ' + (i + 1);

function renderPromedio() {
  const avg = avgGlobal();
  const n = S.attempts.length;

  $('#avgScore').textContent = avg === null ? '—' : avg;
  const C = 2 * Math.PI * 57;
  const frac = avg === null ? 0 : Math.min(avg / 500, 1);
  $('#ringArc').setAttribute('stroke-dasharray', C.toFixed(1));
  $('#ringArc').setAttribute('stroke-dashoffset', (C * (1 - frac)).toFixed(1));

  if (avg === null) {
    $('#avgTitle').textContent = 'Promedio general';
    $('#avgSub').textContent = 'Sin puntajes registrados todavía.';
  } else {
    const lo = Math.min(...S.attempts.map(a => a.global));
    const hi = Math.max(...S.attempts.map(a => a.global));
    $('#avgTitle').textContent = 'Promedio de ' + n + (n === 1 ? ' aplicante' : ' aplicantes');
    $('#avgSub').textContent = avg + ' de 500 · más bajo ' + lo + ' · más alto ' + hi +
      ' · meta ' + S.goal;
  }

  /* lista: Aplicante 1 score, Aplicante 2 score, ... */
  $('#applicants').innerHTML = !n
    ? '<div class="empty">Cada intento que registres aparece aquí como un aplicante.</div>'
    : S.attempts.map((a, i) => {
        const dif = a.global - avg;
        const rel = dif === 0 ? '<span class="tiny">en el promedio</span>'
          : dif > 0 ? '<span style="color:var(--ok)">+' + dif + ' sobre el promedio</span>'
                    : '<span style="color:var(--bad)">' + dif + ' bajo el promedio</span>';
        return '<div class="hrow"><div class="sc">' + a.global + '</div>' +
          '<div class="mt"><b>' + aplicante(i) + ' score' +
          (a.demo ? '<span class="tag">ejemplo</span>' : '') + '</b>' +
          '<small>' + a.ok + '/' + a.nQ + ' correctas · ' + a.date + '</small></div>' +
          '<div class="dl">' + rel + '</div></div>';
      }).join('');

  /* tabla con el desglose por área de cada aplicante */
  if (!n) { $('#applicantTbl').innerHTML = ''; return; }
  const head = '<thead><tr><th>Aplicante</th>' +
    AREAS.map(a => '<th>' + a.corto + '</th>').join('') + '<th>Global</th></tr></thead>';
  const body = '<tbody>' + S.attempts.map((a, i) =>
      '<tr><td>' + aplicante(i) + '</td>' +
      AREAS.map(ar => '<td>' + (a.areas[ar.id] ?? '—') + '</td>').join('') +
      '<td><b>' + a.global + '</b></td></tr>'
    ).join('') +
    '<tr><td><b>Promedio</b></td>' +
    AREAS.map(ar => {
      const vals = S.attempts.map(a => a.areas[ar.id]).filter(v => typeof v === 'number');
      const m = vals.length ? Math.round(vals.reduce((s,v) => s+v, 0) / vals.length) : '—';
      return '<td><b>' + m + '</b></td>';
    }).join('') +
    '<td><b style="color:var(--acc)">' + avg + '</b></td></tr></tbody>';
  $('#applicantTbl').innerHTML = head + body;
}

/* ==================================================================
   DIAGNÓSTICO
================================================================== */
function pendingDiag() {
  try {
    const raw = localStorage.getItem(KEYQ);
    if (!raw) return null;
    const p = JSON.parse(raw);
    return (p && Array.isArray(p.ids) && p.ids.length) ? p : null;
  } catch (e) { return null; }
}

function renderDiag() {
  const p = pendingDiag();
  $('#btnDiagResume').hidden = !p;
  if (p) {
    const answered = p.ans.filter(v => v !== null).length;
    $('#btnDiagResume').textContent = 'Continuar intento guardado (' + answered + '/' + p.ids.length + ')';
  }
}

/* ==================================================================
   PRÁCTICA — filtros
================================================================== */
let F = { area: 'all', dif: 'all', set: 'all' };

function filtered() {
  return BANCO.filter(q => {
    if (F.area !== 'all' && q.a !== F.area) return false;
    if (F.dif !== 'all' && q.d !== Number(F.dif)) return false;
    if (F.set === 'wrong'  && !S.wrong.includes(q.id)) return false;
    if (F.set === 'unseen' && S.seen.includes(q.id)) return false;
    return true;
  });
}

function renderPractica() {
  const mk = (id, items, key) => {
    $(id).innerHTML = items.map(it =>
      '<button class="chip" data-k="' + key + '" data-v="' + it.v + '" aria-pressed="' +
      (F[key] === it.v) + '"' + (it.dis ? ' disabled' : '') + '>' + it.t + '</button>'
    ).join('');
  };

  mk('#fArea', [{ v:'all', t:'Todas' }].concat(AREAS.map(a => ({ v:a.id, t:a.corto }))), 'area');
  mk('#fDif',  [{ v:'all', t:'Cualquiera' },{ v:'1', t:'Fácil' },{ v:'2', t:'Media' },{ v:'3', t:'Difícil' }], 'dif');
  mk('#fSet',  [
    { v:'all',    t:'Todo el banco' },
    { v:'wrong',  t:'Solo las que fallé (' + S.wrong.length + ')', dis: S.wrong.length === 0 },
    { v:'unseen', t:'No vistas (' + BANCO.filter(q => !S.seen.includes(q.id)).length + ')' }
  ], 'set');

  $$('.chip').forEach(b => {
    b.onclick = () => { F[b.dataset.k] = b.dataset.v; renderPractica(); };
  });

  const n = filtered().length;
  $('#fCount').textContent = n === 0
    ? 'Ningún resultado con estos filtros.'
    : n + (n === 1 ? ' pregunta coincide' : ' preguntas coinciden') +
      (n > 15 ? ' — la ronda tomará 15 al azar.' : '.');
  $('#btnPractStart').disabled = n === 0;
}

/* ==================================================================
   Motor del quiz
================================================================== */
let Q = null;

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startPractice() {
  const pool = filtered();
  if (!pool.length) return;
  Q = {
    mode:'practice', ids: shuffle(pool).slice(0, 15).map(q => q.id),
    i:0, picked:null, ans:[], dud:[], label:'Práctica'
  };
  go('quiz'); renderQ();
}

function startDiag(resume) {
  if (resume) {
    Q = { mode:'diag', ids:resume.ids, i:resume.i||0, picked:null,
          ans:resume.ans, dud:resume.dud||[], label:'Diagnóstico', endsAt:resume.endsAt };
  } else {
    Q = { mode:'diag', ids:DIAG_IDS.slice(), i:0, picked:null,
          ans:DIAG_IDS.map(() => null), dud:[], label:'Diagnóstico',
          endsAt: Date.now() + 30 * 60000 };
  }
  persistDiag();
  go('quiz'); renderQ(); startTimer();
}

function persistDiag() {
  if (!Q || Q.mode !== 'diag') return;
  try {
    localStorage.setItem(KEYQ, JSON.stringify({
      ids:Q.ids, i:Q.i, ans:Q.ans, dud:Q.dud, endsAt:Q.endsAt
    }));
  } catch (e) {}
}
function clearDiag() { try { localStorage.removeItem(KEYQ); } catch (e) {} }

function startTimer() {
  stopTimer();
  const el = $('#qTimer'); el.hidden = false;
  const tick = () => {
    const left = Math.max(0, Q.endsAt - Date.now());
    const m = Math.floor(left / 60000), s = Math.floor((left % 60000) / 1000);
    el.textContent = m + ':' + String(s).padStart(2, '0');
    el.classList.toggle('warn', left < 300000);
    if (left <= 0) { stopTimer(); finish(true); }
  };
  tick();
  Q.timer = setInterval(tick, 1000);
}
function stopTimer() {
  if (Q && Q.timer) { clearInterval(Q.timer); Q.timer = null; }
  const el = $('#qTimer'); if (el) el.hidden = true;
}

function renderNav() {
  if (Q.mode !== 'diag') { $('#qNav').hidden = true; return; }
  $('#qNav').hidden = false;
  $('#qNav').innerHTML = Q.ids.map((id, k) => {
    const cls = [k === Q.i ? 'here' : '', Q.ans[k] !== null ? 'done' : '', Q.dud.includes(k) ? 'dud' : '']
      .filter(Boolean).join(' ');
    return '<button class="' + cls + '" data-j="' + k + '">' + (k + 1) + '</button>';
  }).join('');
  $$('#qNav button').forEach(b => {
    b.onclick = () => { Q.i = Number(b.dataset.j); persistDiag(); renderQ(); };
  });
}

function renderQ() {
  const q = byId(Q.ids[Q.i]);
  const isDiag = Q.mode === 'diag';
  Q.picked = isDiag ? Q.ans[Q.i] : null;

  $('#qCount').textContent = 'Pregunta ' + (Q.i+1) + ' de ' + Q.ids.length + ' · ' + Q.label +
    (isDiag ? '' : ' · ' + AREAS.find(a => a.id === q.a).corto + ' · ' + DIFS[q.d]);
  $('#qProg').style.width = (100 * (isDiag ? Q.ans.filter(v => v !== null).length : Q.i) / Q.ids.length) + '%';

  const ctx = $('#qCtx');
  if (q.ctx) { ctx.textContent = q.ctx; ctx.hidden = false; } else { ctx.hidden = true; }
  $('#qText').textContent = q.q;
  $('#qFb').hidden = true;

  const L = ['A','B','C','D'];
  $('#qOpts').innerHTML = q.o.map((t, k) =>
    '<button class="opt' + (Q.picked === k ? ' sel' : '') + '" data-k="' + k + '">' +
    '<span class="k">' + L[k] + '</span><span>' + esc(t) + '</span></button>'
  ).join('');

  $$('#qOpts .opt').forEach(b => {
    b.onclick = () => {
      if (b.disabled) return;
      $$('#qOpts .opt').forEach(x => x.classList.remove('sel'));
      b.classList.add('sel');
      Q.picked = Number(b.dataset.k);
      if (isDiag) {
        Q.ans[Q.i] = Q.picked; persistDiag(); renderNav();
        $('#btnSubmit').textContent = (() => {
          const f = Q.ans.filter(v => v === null).length;
          return f ? 'Entregar (' + f + ' sin responder)' : 'Entregar';
        })();
      }
      // en el diagnóstico la última pregunta no avanza: se entrega
      $('#btnNext').disabled = isDiag && (Q.i + 1 >= Q.ids.length);
    };
  });

  renderNav();

  const nb = $('#btnNext');
  nb.disabled = Q.picked === null;
  nb.dataset.state = 'answer';

  if (isDiag) {
    nb.textContent = Q.i + 1 < Q.ids.length ? 'Siguiente →' : 'Última pregunta';
    nb.dataset.state = 'move';
    nb.disabled = Q.i + 1 >= Q.ids.length;
    $('#btnPrev').hidden = Q.i === 0;
    $('#btnDud').hidden = false;
    $('#btnDud').textContent = Q.dud.includes(Q.i) ? '★ Dudosa' : '☆ Marcar dudosa';
    $('#btnSubmit').hidden = false;
    const falta = Q.ans.filter(v => v === null).length;
    $('#btnSubmit').textContent = falta ? 'Entregar (' + falta + ' sin responder)' : 'Entregar';
  } else {
    nb.textContent = 'Confirmar';
    $('#btnPrev').hidden = true; $('#btnDud').hidden = true; $('#btnSubmit').hidden = true;
  }
}

function confirmAnswer() {
  const q = byId(Q.ids[Q.i]);
  const correct = Q.picked === q.c;
  Q.ans[Q.i] = Q.picked;

  if (!S.seen.includes(q.id)) S.seen.push(q.id);
  const at = S.wrong.indexOf(q.id);
  if (correct) { if (at >= 0) S.wrong.splice(at, 1); } else if (at < 0) S.wrong.push(q.id);
  const st = S.stats[q.a]; st.n++; if (correct) st.ok++;
  save();

  $$('#qOpts .opt').forEach(b => {
    const k = Number(b.dataset.k);
    b.disabled = true; b.classList.remove('sel');
    if (k === q.c) b.classList.add('good');
    else if (k === Q.picked) b.classList.add('wrong');
  });

  const fb = $('#qFb');
  fb.className = 'fb ' + (correct ? 'good' : 'bad');
  fb.innerHTML = '<b>' + (correct ? '✓ Correcto' : '✗ Incorrecto — la respuesta es ' + ['A','B','C','D'][q.c]) +
                 '</b>' + esc(q.e);
  fb.hidden = false;

  const nb = $('#btnNext');
  nb.dataset.state = 'next';
  nb.textContent = (Q.i + 1 < Q.ids.length) ? 'Siguiente pregunta' : 'Ver resultado';
  nb.disabled = false;
}

function next() {
  Q.i++;
  if (Q.i >= Q.ids.length) { finish(false); return; }
  renderQ();
}

/* ==================================================================
   Resultado
================================================================== */
function finish(porTiempo) {
  stopTimer();
  const per = {};
  for (const a of AREAS) per[a.id] = { n:0, ok:0 };

  const detail = Q.ids.map((id, k) => {
    const q = byId(id), picked = Q.ans[k];
    const correct = picked === q.c;
    per[q.a].n++; if (correct) per[q.a].ok++;
    return { q, picked, correct };
  });

  const total = detail.length, ok = detail.filter(d => d.correct).length;
  Q.detail = detail;

  if (Q.mode === 'diag') {
    // el diagnóstico registra progreso y errores al entregar
    for (const d of detail) {
      if (!S.seen.includes(d.q.id)) S.seen.push(d.q.id);
      const at = S.wrong.indexOf(d.q.id);
      if (d.correct) { if (at >= 0) S.wrong.splice(at, 1); } else if (at < 0) S.wrong.push(d.q.id);
    }
    const areas = {};
    for (const a of AREAS) areas[a.id] = areaScore(per[a.id].ok, per[a.id].n);
    const g = globalScore(areas);
    S.attempts.push({
      date: new Date().toISOString().slice(0,10),
      kind: 'Diagnóstico', nQ: total, ok, areas, global: g
    });
    save(); clearDiag();

    $('#rNum').textContent = g;
    $('#rOf').textContent = 'puntaje global de 500 · ' + ok + ' de ' + total + ' correctas' +
      (porTiempo ? ' · se entregó al acabarse el tiempo' : '');
    $('#rBreak').innerHTML = AREAS.map(a => {
      const v = areas[a.id], lv = nivelDe(a.id, v);
      const cls = lv.i >= 3 ? 'n4' : lv.i === 2 ? 'n3' : '';
      return '<div class="area"><div class="areaTop"><b>' + a.nombre + '</b>' +
        '<span class="lvl ' + cls + '">' + lv.n + '</span>' +
        '<em>' + v + ' / 100 · ' + per[a.id].ok + '/' + per[a.id].n + '</em></div>' +
        '<div class="bar"><i style="width:' + v + '%;background:' + a.color + '"></i></div></div>';
    }).join('') +
    '<p class="tiny" style="margin-top:14px">Con 4 preguntas por área, una sola respuesta mueve el ' +
    'puntaje unos 25 puntos. Lee esto como punto de partida, no como pronóstico.</p>';
  } else {
    const pct = total ? Math.round(100*ok/total) : 0;
    $('#rNum').textContent = pct + '%';
    $('#rOf').textContent = ok + ' de ' + total + ' correctas · ' + Q.label;
    const flojas = AREAS.filter(a => per[a.id].n && per[a.id].ok/per[a.id].n < .6);
    $('#rBreak').innerHTML = flojas.length
      ? '<div class="card" style="background:var(--card2)">Para reforzar: <b>' +
        flojas.map(a => a.nombre).join(', ') + '</b>. Las falladas quedaron en el filtro ' +
        '"Solo las que fallé".</div>'
      : '<div class="card" style="background:#0f3026">Buen resultado en todas las áreas de esta ronda.</div>';
  }
  go('result');
}

function renderReview() {
  const L = ['A','B','C','D'];
  $('#reviewList').innerHTML = Q.detail.map((d, k) =>
    '<div class="rev">' +
      '<div class="revHd"><span class="mark ' + (d.correct?'ok':'no') + '">' +
        (d.correct?'✓':'✗') + '</span>' +
        'Pregunta ' + (k+1) + ' · ' + AREAS.find(a=>a.id===d.q.a).nombre + ' · ' + DIFS[d.q.d] +
      '</div>' +
      (d.q.ctx ? '<div class="ctx">' + esc(d.q.ctx) + '</div>' : '') +
      '<p class="qq">' + esc(d.q.q) + '</p>' +
      '<div class="ans" style="color:' + (d.correct ? 'var(--ok)' : 'var(--bad)') + '">Tu respuesta: ' +
        (d.picked === null ? 'sin responder' : L[d.picked] + '. ' + esc(d.q.o[d.picked])) + '</div>' +
      (d.correct ? '' : '<div class="ans" style="color:var(--ok)">Correcta: ' + L[d.q.c] + '. ' +
        esc(d.q.o[d.q.c]) + '</div>') +
      '<div class="ex">' + esc(d.q.e) + '</div>' +
    '</div>'
  ).join('');
  go('review');
}

/* ==================================================================
   PROGRESO
================================================================== */
function renderProgreso() {
  const h = $('#history');
  h.innerHTML = !S.attempts.length
    ? '<div class="empty">Todavía no hay intentos registrados.</div>'
    : S.attempts.slice().reverse().map((a, ri) => {
        const i = S.attempts.length - ri;
        const prev = S.attempts[S.attempts.length - ri - 2];
        const d = prev ? a.global - prev.global : null;
        const delta = d === null ? '—'
          : d > 0 ? '<span style="color:var(--ok)">▲ ' + d + '</span>'
          : d < 0 ? '<span style="color:var(--bad)">▼ ' + Math.abs(d) + '</span>' : '=';
        return '<div class="hrow"><div class="sc">' + a.global + '</div>' +
          '<div class="mt"><b>' + aplicante(i - 1) + ' · ' + a.kind +
          (a.demo ? '<span class="tag">ejemplo</span>' : '') +
          '</b><small>' + a.date + ' · ' + a.ok + '/' + a.nQ + ' correctas</small></div>' +
          '<div class="dl">' + delta + '</div></div>';
      }).join('');

  const any = AREAS.some(a => S.stats[a.id].n > 0);
  $('#areaAcc').innerHTML = !any
    ? '<div class="empty">Practica por área para ver tu porcentaje de acierto.</div>'
    : AREAS.map(a => {
        const st = S.stats[a.id], p = st.n ? Math.round(100*st.ok/st.n) : 0;
        return '<div class="area"><div class="areaTop"><b>' + a.nombre + '</b>' +
          '<em>' + (st.n ? p + '% · ' + st.ok + '/' + st.n : 'sin datos') + '</em></div>' +
          '<div class="bar"><i style="width:' + p + '%;background:' + a.color + '"></i></div></div>';
      }).join('');

  $('#coverage').innerHTML = AREAS.map(a => {
    const tot  = BANCO.filter(q => q.a === a.id).length;
    const seen = BANCO.filter(q => q.a === a.id && S.seen.includes(q.id)).length;
    const p = Math.round(100*seen/tot);
    return '<div class="area"><div class="areaTop"><b>' + a.nombre + '</b>' +
      '<em>' + seen + ' de ' + tot + ' vistas</em></div>' +
      '<div class="bar"><i style="width:' + p + '%;background:' + a.color + '"></i></div></div>';
  }).join('') +
  '<p class="tiny" style="margin:14px 0 0">Errores pendientes de repaso: <b>' + S.wrong.length + '</b></p>';
}

/* ==================================================================
   MÁS — videoteca y ajustes
================================================================== */
function ytId(url) {
  const m = String(url).match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

function renderMas() {
  $('#setDate').value = S.examDate;
  $('#setGoal').value = S.goal;
  $('#demoCard').hidden = !S.hasDemo;
  $('#vidArea').innerHTML = AREAS.map(a => '<option value="'+a.id+'">'+a.nombre+'</option>').join('') +
    '<option value="gen">Estrategia general</option>';

  const list = $('#vidList');
  if (!S.videos.length) {
    list.innerHTML = '<div class="empty">Todavía no has guardado videos.</div>';
  } else {
    const nom = id => id === 'gen' ? 'Estrategia general' : (AREAS.find(a=>a.id===id)||{}).nombre || id;
    list.innerHTML = S.videos.map((v, k) =>
      '<div class="vid"><div class="th">▶</div>' +
      '<div class="mt"><b>' + esc(v.t) + '</b><small>' + esc(nom(v.a)) + '</small></div>' +
      '<button class="btn alt sm" data-play="' + k + '">Ver</button>' +
      '<button class="x" data-del="' + k + '" title="Quitar">✕</button></div>'
    ).join('');
    $$('#vidList [data-play]').forEach(b => {
      b.onclick = () => {
        const v = S.videos[Number(b.dataset.play)];
        $('#vidPlayer').hidden = false;
        $('#vidPlayer').innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + v.id +
          '" allowfullscreen title="' + esc(v.t) + '" ' +
          'allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"></iframe>';
        $('#vidPlayer').scrollIntoView({ behavior:'smooth', block:'center' });
      };
    });
    $$('#vidList [data-del]').forEach(b => {
      b.onclick = () => {
        S.videos.splice(Number(b.dataset.del), 1); save();
        $('#vidPlayer').hidden = true; $('#vidPlayer').innerHTML = '';
        renderMas();
      };
    });
  }
}

/* ==================================================================
   Eventos
================================================================== */
$$('[data-go]').forEach(b => { b.onclick = () => go(b.dataset.go); });

$('#btnDiagStart').onclick = () => {
  const p = pendingDiag();
  if (p && !confirm('Hay un intento sin terminar. Empezar de cero lo descarta. ¿Continuar?')) return;
  clearDiag(); startDiag(null);
};
$('#btnDiagResume').onclick = () => { const p = pendingDiag(); if (p) startDiag(p); };

$('#btnPractStart').onclick = startPractice;
$('#btnPractReset').onclick = () => { F = { area:'all', dif:'all', set:'all' }; renderPractica(); };

$('#btnNext').onclick = function () {
  if (this.dataset.state === 'answer') confirmAnswer();
  else if (this.dataset.state === 'move') {
    if (Q.i + 1 < Q.ids.length) { Q.i++; persistDiag(); renderQ(); }
  }
  else next();
};
$('#btnPrev').onclick = () => { if (Q.i > 0) { Q.i--; persistDiag(); renderQ(); } };
$('#btnDud').onclick = () => {
  const at = Q.dud.indexOf(Q.i);
  if (at >= 0) Q.dud.splice(at, 1); else Q.dud.push(Q.i);
  persistDiag(); renderQ();
};
$('#btnSubmit').onclick = () => {
  const falta = Q.ans.filter(v => v === null).length;
  if (falta && !confirm('Quedan ' + falta + ' preguntas sin responder. ¿Entregar de todas formas?')) return;
  finish(false);
};
$('#btnQuit').onclick = () => {
  if (Q && Q.mode === 'diag') {
    if (!confirm('El intento queda guardado y puedes continuarlo después. ¿Salir?')) return;
    persistDiag();
  }
  stopTimer(); Q = null; go('inicio');
};
$('#btnReview').onclick = renderReview;

$('#clearDemo').onclick = () => {
  if (!confirm('Esto quita los 5 puntajes precargados. ¿Continuar?')) return;
  S.attempts = S.attempts.filter(a => !a.demo);
  S.hasDemo = false; save(); go('mas');
};

$('#ddayBtn').onclick = () => go('mas');

$('#btnSaveSet').onclick = () => {
  const d = $('#setDate').value, g = Number($('#setGoal').value);
  if (d) S.examDate = d;
  if (g >= 0 && g <= 500) S.goal = Math.round(g);
  save(); renderDday();
  alert('Ajustes guardados.');
};

$('#btnVidAdd').onclick = () => {
  const url = $('#vidUrl').value.trim(), t = $('#vidTitle').value.trim(), a = $('#vidArea').value;
  const id = ytId(url);
  if (!id) { alert('No reconocí el enlace. Debe ser de youtube.com o youtu.be.'); return; }
  S.videos.push({ id, t: t || 'Video sin título', a });
  save(); $('#vidUrl').value = ''; $('#vidTitle').value = ''; renderMas();
};

$('#btnExport').onclick = () => {
  const blob = new Blob([JSON.stringify(S, null, 2)], { type:'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'icfes-lab-respaldo-' + new Date().toISOString().slice(0,10) + '.json';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

$('#btnCopy').onclick = async () => {
  const txt = JSON.stringify(S);
  try {
    await navigator.clipboard.writeText(txt);
    alert('Respaldo copiado al portapapeles.');
  } catch (e) {
    $('#impBox').value = txt;
    alert('No pude usar el portapapeles. Te lo dejé en el cuadro de abajo para que lo copies.');
  }
};

$('#btnImport').onclick = () => {
  const raw = $('#impBox').value.trim();
  if (!raw) { alert('Pega primero el contenido del respaldo.'); return; }
  let obj;
  try { obj = JSON.parse(raw); }
  catch (e) { alert('Eso no es un JSON válido.'); return; }
  if (!confirm('Esto reemplaza tu progreso actual por el del respaldo. ¿Continuar?')) return;
  S = normalize(obj); save();
  $('#impBox').value = '';
  alert('Respaldo importado.');
  go('inicio');
};

$('#btnReset').onclick = () => {
  if (!confirm('Esto borra tus intentos, tu progreso por área y tus errores guardados. ¿Continuar?')) return;
  try { localStorage.removeItem(KEY); localStorage.removeItem(KEYQ); } catch (e) {}
  S = seedState(); S.attempts = []; S.hasDemo = false;
  save(); go('inicio');
};

/* guarda el diagnóstico si se cierra la pestaña a media prueba */
window.addEventListener('beforeunload', () => { if (Q && Q.mode === 'diag') persistDiag(); });

/* arranque */
save();
go('inicio');
