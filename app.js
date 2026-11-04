/* Trading-Lerncenter · App */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const KEY = 'ttc.v1';
  let S = {};
  try { S = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { S = {}; }
  S.bank = S.bank || {}; S.drill = S.drill || {}; S.calc = S.calc || {};
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ohne Speicher weiter */ } };

  /* ---------- Farbschema ---------- */
  function setScheme(s) {
    document.documentElement.dataset.scheme = s;
    S.scheme = s; save();
    $$('#scheme button').forEach(b => b.setAttribute('aria-pressed', b.dataset.s === s));
  }
  $$('#scheme button').forEach(b => b.addEventListener('click', () => setScheme(b.dataset.s)));
  setScheme(S.scheme || 'rg');

  /* ---------- Zeit New York → Deutschland ---------- */
  function tzOffset(ts, tz) {
    const p = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).formatToParts(new Date(ts));
    const g = t => +p.find(x => x.type === t).value;
    return Date.UTC(g('year'), g('month') - 1, g('day'), g('hour'), g('minute'), g('second')) - ts;
  }
  function nyTs(hm) {
    const [h, m] = hm.split(':').map(Number);
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
    const g = t => +parts.find(x => x.type === t).value;
    const guess = Date.UTC(g('year'), g('month') - 1, g('day'), h, m);
    return guess - tzOffset(guess, 'America/New_York');
  }
  const de = hm => new Date(nyTs(hm)).toLocaleTimeString('de-DE', { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit' });
  const gap = () => Math.round((tzOffset(Date.now(), 'Europe/Berlin') - tzOffset(Date.now(), 'America/New_York')) / 36e5);

  /* ---------- Abbildungen ---------- */
  function renderFigs(root) {
    $$('figure[data-fig]', root).forEach(f => {
      const fn = F[f.dataset.fig];
      if (!fn) return;
      const cap = f.dataset.cap ? `<figcaption>${f.dataset.cap}</figcaption>` : '';
      f.innerHTML = `<div class="chwrap">${TT.chart(fn())}</div>${cap}`;
    });
    $$('td[data-ny]', root).forEach(td => { const [a, b] = td.dataset.ny.split('-'); td.textContent = de(a) + '–' + de(b); });
  }

  /* ---------- Nachschlagen ---------- */
  function buildLearn() {
    const nav = $('#tocnav'), sel = $('#tocsel'), list = $('#topics');
    let navH = '', selH = '<option value="">Thema wählen …</option>', html = '';
    BLOCKS.forEach(([b, name]) => {
      navH += `<h4>${b} · ${name}</h4>`;
      selH += `<optgroup label="${b} · ${name}">`;
      TOPICS.filter(t => t.b === b).forEach(t => {
        navH += `<a href="#t-${t.id}" data-id="${t.id}">${t.t}</a>`;
        selH += `<option value="${t.id}">${t.t}</option>`;
        const ln = t.l.map(n => `L${n}`).join(', ');
        const lessonLinks = t.l.map(n => `<a class="btn ghost" href="https://claude.ai/artifact/${LESSONS[n][1]}" target="_blank" rel="noopener">Lektion ${n} öffnen ↗</a>`).join('');
        const practice = t.l.length ? `<button class="btn" type="button" data-practice="${t.l[0]}">Fragen zu Lektion ${t.l[0]} üben</button>` : '';
        html += `<article class="topic" id="t-${t.id}" data-search="${TT.esc((t.t + ' ' + t.sum + ' ' + t.body.replace(/<[^>]+>/g, ' ')).toLowerCase())}">
<header><span class="tag">${b}${ln ? ' · ' + ln : ''}</span><h2>${t.t}</h2></header>
<p class="sum">${t.sum}</p>${t.body}
<div class="rule"><small>Regel</small>${t.rule}</div>
${t.err.length ? `<ul class="err">${t.err.map(e => `<li>${e}</li>`).join('')}</ul>` : ''}
<div class="tfoot">${practice}${lessonLinks}</div></article>`;
      });
      selH += '</optgroup>';
    });
    navH += `<h4>Nachschlagen</h4><a href="#t-glossar" data-id="glossar">Glossar A–Z</a>`;
    selH += '<option value="glossar">Glossar A–Z</option>';
    html += `<article class="topic glossary" id="t-glossar" data-search="glossar"><header><span class="tag">A–Z</span><h2>Glossar</h2></header><dl id="gl"></dl></article>`;
    nav.innerHTML = navH; sel.innerHTML = selH; list.innerHTML = html;
    renderGlossary('');
    renderFigs(list);
    renderTimeline();
    sel.addEventListener('change', () => { if (sel.value) document.getElementById('t-' + sel.value).scrollIntoView({ behavior: 'smooth' }); });
    list.addEventListener('click', e => {
      const p = e.target.closest('[data-practice]');
      if (p) { trainerFilter = 'L' + p.dataset.practice; trainerMode = 'bank'; location.hash = '#trainer'; }
      const g = e.target.closest('[data-go]');
      if (g) { e.preventDefault(); location.hash = '#' + g.dataset.go; }
    });
    $('#search').addEventListener('input', e => filterTopics(e.target.value.trim().toLowerCase()));
    // aktives Thema in der Navigation markieren
    const io = new IntersectionObserver(es => {
      es.forEach(en => { if (en.isIntersecting) { $$('#tocnav a').forEach(a => a.classList.toggle('on', 't-' + a.dataset.id === en.target.id)); } });
    }, { rootMargin: '-80px 0px -70% 0px' });
    $$('.topic', list).forEach(a => io.observe(a));
  }
  function renderGlossary(q) {
    const items = GLOSSARY.filter(([t, d]) => !q || (t + ' ' + d).toLowerCase().includes(q));
    $('#gl').innerHTML = items.map(([t, d]) => `<dt>${t}</dt><dd>${d}</dd>`).join('') || '<dd class="empty">Kein Begriff gefunden.</dd>';
  }
  function filterTopics(q) {
    let any = false;
    $$('#topics .topic').forEach(a => {
      if (a.id === 't-glossar') return;
      const show = !q || a.dataset.search.includes(q);
      a.hidden = !show; if (show) any = true;
    });
    renderGlossary(q);
    $('#t-glossar').hidden = q && !$('#gl dt');
    $('#noresult').hidden = any || !q || !$('#t-glossar').hidden;
  }
  function renderTimeline() {
    const el = document.getElementById('timeline');
    if (el) el.innerHTML = timelineHTML();
  }
  function timelineHTML() {
    const R = [
      ['Asien', '18:00', '03:00', 'Asien-Hoch und -Tief entstehen'],
      ['London', '03:00', '08:30', 'Holt oft ein Asien-Level'],
      ['Pre-Market', '08:30', '09:30', 'News um 08:30, erste Manipulation möglich'],
      ['Manipulation', '09:30', '09:50', 'Sweeps der offenen Levels', 1],
      ['Makro', '09:50', '10:10', 'Bestes Einstiegsfenster', 1],
      ['Letzte Chance', '10:10', '10:30', 'Danach kein neuer Trade'],
      ['PM-Session', '13:00', '16:00', 'Handelt TJR nicht'],
      ['Spread-Hour', '17:00', '18:00', 'Handelspause, hohe Spreads']
    ];
    let h = '<div class="tl"><div class="head"><span>New York</span><span>Deutschland</span><span>Phase</span></div>';
    R.forEach(r => { h += `<div class="${r[4] ? 'hot' : ''}"><span class="t">${r[1]}–${r[2]}</span><span class="t">${de(r[1])}–${de(r[2])}</span><span><b>${r[0]}</b> · ${r[3]}</span></div>`; });
    h += '</div>';
    const g = gap();
    if (g !== 6) h += `<p class="note-dst">Diese Woche Sonderfall: ${g} statt 6 Stunden Abstand. NY-Eröffnung ist um ${de('09:30')} Uhr.</p>`;
    return h;
  }

  /* ---------- Trainer ---------- */
  let trainerMode = 'bank', trainerFilter = 'all', drillKind = 'mix';
  let cur = null, last = null, answered = false;
  const learned = q => (S.bank[q.id] || {}).s >= 2;
  const pool = () => BANK.filter(q => trainerFilter === 'all' ? true : trainerFilter === 'wrong' ? ((S.bank[q.id] || {}).w > 0 && !learned(q)) : q.l === +trainerFilter.slice(1));

  function buildTrainer() {
    $$('#tmodes .chip').forEach(b => b.addEventListener('click', () => { trainerMode = b.dataset.m; renderTrainer(true); }));
    const g = $('#grid16');
    let h = `<button type="button" data-f="all"><b>Alle</b><span class="bar"><i></i></span></button>`;
    for (let n = 1; n <= 16; n++) h += `<button type="button" data-f="L${n}"><b>L${n}</b><span class="bar"><i></i></span></button>`;
    h += `<button type="button" data-f="wrong" style="grid-column:span 3"><b>Nur meine Fehler</b><span class="bar"><i></i></span></button>`;
    g.innerHTML = h;
    g.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; trainerFilter = b.dataset.f; renderTrainer(true); });
    const dk = $('#drillkinds');
    dk.innerHTML = `<button class="chip" type="button" data-k="mix">Gemischt</button>` + Object.entries(DRILLS).map(([k, d]) => `<button class="chip" type="button" data-k="${k}">${d.name}</button>`).join('');
    dk.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; drillKind = b.dataset.k; renderTrainer(true); });
    $('#next').addEventListener('click', () => nextQ());
    $('#reset').addEventListener('click', () => {
      if (trainerMode === 'bank') { S.bank = {}; } else { S.drill = {}; }
      save(); renderTrainer(true);
    });
  }

  function renderTrainer(fresh) {
    $$('#tmodes .chip').forEach(b => b.setAttribute('aria-pressed', b.dataset.m === trainerMode));
    $('#bankside').hidden = trainerMode !== 'bank';
    $('#drillside').hidden = trainerMode !== 'drill';
    $('#drillkinds').hidden = trainerMode !== 'drill';
    $$('#drillkinds .chip').forEach(b => b.setAttribute('aria-pressed', b.dataset.k === drillKind));
    $$('#grid16 button').forEach(b => {
      b.setAttribute('aria-pressed', b.dataset.f === trainerFilter);
      const f = b.dataset.f;
      const qs = BANK.filter(q => f === 'all' ? true : f === 'wrong' ? (S.bank[q.id] || {}).w > 0 : q.l === +f.slice(1));
      const pct = qs.length ? qs.filter(learned).length / qs.length * 100 : 0;
      $('i', b).style.width = pct + '%';
      if (f === 'wrong') $('b', b).textContent = `Nur meine Fehler (${qs.filter(q => !learned(q)).length})`;
    });
    stats();
    if (fresh) nextQ();
  }

  function stats() {
    if (trainerMode === 'bank') {
      const p = pool(), l = p.filter(learned).length;
      const half = p.filter(q => (S.bank[q.id] || {}).s === 1).length;
      $('#stat').textContent = p.length ? `${l} von ${p.length} sitzen` + (half ? ` · ${half} halb` : '') : '';
      $('#bar').style.width = (p.length ? l / p.length * 100 : 0) + '%';
      $('#bar2').style.width = (p.length ? half / p.length * 100 : 0) + '%';
      $('#scope').textContent = trainerFilter === 'all' ? 'Alle Lektionen' : trainerFilter === 'wrong' ? 'Nur Fehler' : `Lektion ${trainerFilter.slice(1)} · ${LESSONS[+trainerFilter.slice(1)][0]}`;
    } else {
      let n = 0, ok = 0, h = '';
      Object.entries(DRILLS).forEach(([k, d]) => {
        const s = S.drill[k] || { n: 0, ok: 0 };
        n += s.n; ok += s.ok;
        h += `<div><span>${d.name}</span><span class="mono">${s.n ? Math.round(s.ok / s.n * 100) + ' % · ' + s.n : '–'}</span></div>`;
      });
      $('#dstats').innerHTML = h;
      $('#streak').textContent = S.streak || 0;
      $('#stat').textContent = n ? `${ok} von ${n} richtig (${Math.round(ok / n * 100)} %)` : 'Noch keine Aufgaben';
      $('#bar').style.width = (n ? ok / n * 100 : 0) + '%';
      $('#bar2').style.width = '0%';
      $('#scope').textContent = drillKind === 'mix' ? 'Bild-Drill · gemischt' : 'Bild-Drill · ' + DRILLS[drillKind].name;
    }
  }

  function nextQ() {
    answered = false;
    $('#fb').innerHTML = ''; $('#next').hidden = true;
    $('#help').innerHTML = ''; $('#help').hidden = true;
    if (trainerMode === 'bank') {
      const open = pool().filter(q => !learned(q));
      if (!open.length) {
        $('#qbox').hidden = true; $('#done').hidden = false;
        $('#done').innerHTML = pool().length
          ? `<p class="big">Alles sitzt</p><p>Jede Frage in diesem Bereich zweimal hintereinander richtig.</p><button class="btn" type="button" id="again">Bereich neu üben</button>`
          : `<p class="big">Keine Fehler offen</p><p>Hier landen Fragen, die du falsch beantwortet hast, bis sie sitzen.</p>`;
        const a = $('#again'); if (a) a.addEventListener('click', () => { pool().forEach(q => { delete S.bank[q.id]; }); save(); renderTrainer(true); });
        return;
      }
      $('#qbox').hidden = false; $('#done').hidden = true;
      // Reihenfolge: falsche nach 2 anderen Fragen, einmal richtige nach 3, dann neue
      const turn = S.turn || 0;
      const st = q => S.bank[q.id] || {};
      const ago = q => turn - (st(q).t ?? -99);
      const rest = open.filter(q => q !== last);
      const groups = [
        rest.filter(q => st(q).t !== undefined && !st(q).s && ago(q) >= 2),
        rest.filter(q => st(q).s === 1 && ago(q) >= 3),
        rest.filter(q => st(q).t === undefined),
        rest
      ];
      const cand = groups.find(g => g.length) || open;
      const q = cand[Math.floor(Math.random() * cand.length)];
      last = q;
      const idx = shuffle(q.o.map((_, i) => i));
      cur = { kind: 'bank', q, order: idx, a: q.a };
      showQ(`Lektion ${q.l} · ${LESSONS[q.l][0]}`, q.q, q.fig ? q.fig() : null, idx.map(i => q.o[i]), q.o.length <= 2 || (q.fig && q.o.every(o => o.length <= 2)));
    } else {
      $('#qbox').hidden = false; $('#done').hidden = true;
      const kinds = Object.keys(DRILLS);
      const k = drillKind === 'mix' ? kinds[Math.floor(Math.random() * kinds.length)] : drillKind;
      const d = DRILLS[k].gen();
      cur = { kind: 'drill', k, d, order: d.o.map((_, i) => i), a: d.a };
      showQ(`${DRILLS[k].name} · Lektion ${DRILLS[k].l}`, d.q, d.sp || null, d.o, d.o.every(o => o.length <= 14));
    }
  }

  function showQ(tag, text, sp, opts, row) {
    $('#qtag').textContent = tag;
    $('#qt').textContent = text;
    $('#qfig').innerHTML = sp ? `<div class="chwrap">${TT.chart(sp)}</div>` : '';
    $('#qfig').hidden = !sp;
    const box = $('#opts');
    box.className = 'opts' + (row ? ' row' : '');
    box.innerHTML = '';
    opts.forEach((o, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'opt'; b.textContent = o;
      b.addEventListener('click', () => answer(i, b));
      box.appendChild(b);
    });
  }

  function answer(i, btn) {
    if (answered) return;
    answered = true;
    const orig = cur.order[i];
    const ok = orig === cur.a;
    $$('#opts .opt').forEach((b, k) => { b.disabled = true; if (cur.order[k] === cur.a) b.classList.add('right'); });
    if (!ok) btn.classList.add('wrong');
    let head, expl;
    if (cur.kind === 'bank') {
      const s = S.bank[cur.q.id] || { s: 0, w: 0 };
      if (ok) s.s += 1; else { s.s = 0; s.w += 1; }
      S.turn = (S.turn || 0) + 1;
      s.t = S.turn;
      S.bank[cur.q.id] = s;
      head = ok ? (s.s >= 2 ? 'Richtig, sitzt!' : 'Richtig. Noch einmal, dann sitzt sie.') : 'Nicht ganz. Die Frage kommt wieder.';
      expl = cur.q.e;
    } else {
      const s = S.drill[cur.k] || { n: 0, ok: 0 };
      s.n += 1; if (ok) s.ok += 1;
      S.drill[cur.k] = s;
      S.streak = ok ? (S.streak || 0) + 1 : 0;
      head = ok ? 'Richtig.' : 'Nicht ganz.';
      expl = cur.d.e;
      if (cur.d.after) { $('#qfig').innerHTML = `<div class="chwrap">${TT.chart(cur.d.after)}</div>`; $('#qfig').hidden = false; }
    }
    save();
    $('#fb').innerHTML = `<strong class="${ok ? 'ok' : 'no'}">${head}</strong> `;
    $('#fb').appendChild(document.createTextNode(expl));
    if (!ok) showHelp();
    $('#next').hidden = false; $('#next').focus({ preventScroll: true });
    renderTrainer(false);
  }

  /* Hilfe mit Schaubild bei falscher Antwort */
  const DRILL_TOPIC = { sweep: 'sweep', fvg: 'fvg', bos: 'bos', level: 'bos', fvgval: 'fvgstatus', swing: 'swing', eq: 'eq', size: 'risiko' };
  function showHelp() {
    let figs = '', x = '', topic = '';
    if (cur.kind === 'bank') {
      const h = HELP[cur.q.id];
      if (!h) return;
      figs = (h.f || []).map(name => name === 'TIMELINE' ? timelineHTML() : (F[name] ? `<div class="chwrap">${TT.chart(F[name]())}</div>` : '')).join('');
      x = h.x || ''; topic = h.t || '';
    } else {
      x = cur.d.x || '';
      topic = DRILL_TOPIC[cur.k] || '';
      if (cur.d.after) figs = '<p class="help-note">Oben im Chart ist jetzt beschriftet, worauf es ankommt.</p>';
    }
    const t = TOPICS.find(tp => tp.id === topic);
    const box = $('#help');
    box.innerHTML = `<p class="help-h">So geht's</p>${x ? `<p class="help-x">${TT.esc(x)}</p>` : ''}${figs ? `<div class="help-figs">${figs}</div>` : ''}` +
      (t ? `<button class="btn ghost" type="button" data-topic="${t.id}">Im Nachschlagen: ${TT.esc(t.t)}</button>` : '');
    box.hidden = false;
    const b = $('[data-topic]', box);
    if (b) b.addEventListener('click', () => { location.hash = '#t-' + b.dataset.topic; });
  }

  /* ---------- Werkzeuge ---------- */
  function buildTools() {
    // Tagesablauf
    const today = new Date().toLocaleDateString('de-DE', { timeZone: 'Europe/Berlin' });
    if (!S.check || S.check.date !== today) S.check = { date: today, done: [] };
    const steps = [
      ['vor ' + de('09:30'), [
        'News prüfen (forexfactory.com, rot = wichtig). News-Tag? Größe halbieren.',
        '4h und 1h: letzter BOS? Trend notieren.',
        'Position im Trend: läuft der Preis zu Hochs/Tiefs oder zurück in FVG/EQ?',
        'Offene Levels markieren: Asien, London, Vortag (max. 6 Linien).',
        'Bias ins Journal schreiben: Richtung, Ziel, wann er kippt.',
        'cTrader: Zeitzone UTC−5 (Winter), US 500 und US TECH 100 nebeneinander.'
      ]],
      [de('09:30') + '–' + de('09:50'), [
        'Nur beobachten: Welches Level wird gesweept?',
        'SMT am Level? Welcher Index ist führend?'
      ]],
      [de('09:50') + '–' + de('10:10'), [
        'Bestätigung im 5m: BOS oder IFVG in Gegenrichtung zum Sweep.',
        'Rücklauf ins FVG oder EQ, Reaktion abwarten.',
        'Stop hinter das Sweep-Extrem, Ziel nächstes offenes Level, Größe rechnen.'
      ]],
      ['ab ' + de('10:30'), [
        'Kein Setup? Feierabend.',
        'Journal: Screenshot, Regeln eingehalten?, Ergebnis in R.'
      ]]
    ];
    let h = '', n = 0;
    steps.forEach(([when, items]) => {
      h += `<li class="when">${when}</li>`;
      items.forEach(t => { const id = 'c' + n++; h += `<li><label><input type="checkbox" data-c="${id}" ${S.check.done.includes(id) ? 'checked' : ''}><span>${t}</span></label></li>`; });
    });
    $('#checks').innerHTML = h;
    $('#checkdate').textContent = today;
    $('#checks').addEventListener('change', e => {
      const id = e.target.dataset.c; if (!id) return;
      S.check.done = S.check.done.filter(x => x !== id);
      if (e.target.checked) S.check.done.push(id);
      save();
    });
    const g = gap();
    $('#gapnote').textContent = g === 6 ? 'Abstand New York – Deutschland heute: 6 Stunden.' : `Achtung, Umstellungswoche: heute ${g} statt 6 Stunden Abstand.`;

    // Rechner
    const num = v => parseFloat(String(v).replace(/\./g, '').replace(',', '.')) || 0;
    const fmt = (v, d = 2) => isFinite(v) ? v.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: d }) : '–';
    $$('.calc input, .calc select').forEach(el => {
      if (S.calc[el.id] !== undefined) el.value = S.calc[el.id];
      el.addEventListener('input', () => { S.calc[el.id] = el.value; save(); calc(); });
    });
    function calc() {
      const acc = num($('#p-acc').value), rk = num($('#p-risk').value), st = num($('#p-stop').value), vpp = num($('#p-vpp').value) || 1;
      const half = $('#p-half').value === '1' ? 0.5 : 1;
      const eur = acc * rk / 100 * half;
      $('#p-eur').textContent = fmt(eur) + ' €';
      $('#p-lots').textContent = st > 0 ? fmt(eur / st / vpp) : '–';
      const w = num($('#e-win').value) / 100, rr = num($('#e-rr').value);
      const ex = w * rr - (1 - w);
      $('#e-ex').textContent = (ex >= 0 ? '+' : '') + fmt(ex) + ' R';
      $('#e-ex').parentElement.className = ex >= 0 ? 'good' : 'warn';
      $('#e-be').textContent = rr > 0 ? fmt(100 / (1 + rr), 1) + ' %' : '–';
      const size = num($('#f-size').value), lim = num($('#f-lim').value) / 100, start = num($('#f-start').value) || size;
      const real = num($('#f-real').value), open = num($('#f-open').value);
      const loss = -(Math.min(0, real + open));
      const allowed = size * lim;
      const left = allowed - loss;
      $('#f-left').textContent = fmt(left) + ' €';
      $('#f-left').parentElement.className = left > 0 ? 'good' : 'warn';
      $('#f-floor').textContent = fmt(start - allowed) + ' €';
      void start;
    }
    calc();
  }

  /* ---------- Navigation ---------- */
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  function route() {
    const h = location.hash.replace('#', '');
    const view = h === 'trainer' ? 'trainer' : h === 'werkzeuge' ? 'werkzeuge' : 'lernen';
    $$('.view').forEach(v => { v.hidden = v.id !== 'v-' + view; });
    $$('.tabs a').forEach(a => a.setAttribute('aria-current', a.dataset.v === view ? 'page' : 'false'));
    if (view === 'trainer') renderTrainer(true);
    if (h.startsWith('t-')) { const el = document.getElementById(h); if (el) el.scrollIntoView(); }
    else window.scrollTo(0, 0);
  }
  buildLearn();
  buildTrainer();
  buildTools();
  window.addEventListener('hashchange', route);
  route();
})();
