/* Trading-Lerncenter · Chart-Engine
   Zeichnet schematische Kerzencharts als SVG mit Beschriftungen.
   Kerze: [open, high, low, close] oder null (leerer Platz). */
const TT = (() => {
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const r1 = v => Math.round(v * 10) / 10;

  function text(x, y, t, o = {}) {
    const lines = String(t).split('\n');
    const fs = o.fs || 12, lh = fs * 1.18;
    let y0 = y;
    if (o.v === 'mid') y0 = y - (lines.length - 1) * lh / 2 + fs * 0.36;
    else if (o.v === 'bottom') y0 = y - (lines.length - 1) * lh;
    const cls = 'lab' + (o.cls ? ' ' + o.cls : '');
    const st = o.fs ? ` font-size="${o.fs}"` : '';
    return `<text class="${cls}" x="${r1(x)}" y="${r1(y0)}" text-anchor="${o.a || 'middle'}"${st}>` +
      lines.map((l, i) => `<tspan x="${r1(x)}" dy="${i ? r1(lh) : 0}">${esc(l)}</tspan>`).join('') + '</text>';
  }

  // Spiegelt einen Chart vertikal (Aufwärts- wird Abwärtsversion)
  function mirror(sp, m) {
    const f = p => (typeof p === 'number' ? r1(2 * m - p) : p === 'h' ? 'l' : p === 'l' ? 'h' : p);
    const o = JSON.parse(JSON.stringify(sp));
    o.c = sp.c.map(k => (k ? [f(k[0]), f(k[2]), f(k[1]), f(k[3])] : null));
    (o.lines || []).forEach(l => { l.y = f(l.y); });
    (o.zones || []).forEach(z => { const lo = f(z.hi), hi = f(z.lo); z.lo = lo; z.hi = hi; if (z.tp) z.tp = z.tp === 'b' ? 'a' : 'b'; });
    (o.legs || []).forEach(g => { g.p = g.p.map(([i, p]) => [i, f(p)]); });
    ['calls', 'marks', 'badges'].forEach(k => (o[k] || []).forEach(a => {
      if (a.p !== undefined) a.p = f(a.p);
      if (a.at !== undefined) a.at = f(a.at);
      if (a.dy !== undefined) a.dy = -a.dy;
    }));
    (o.arrows || []).forEach(a => { a.f = [a.f[0], f(a.f[1])]; a.t = [a.t[0], f(a.t[1])]; });
    if (o.range) o.range = [f(o.range[1]), f(o.range[0])];
    return o;
  }

  function chart(sp) {
    const c = sp.c, n = c.length;
    const W = sp.w || 420, H = sp.h || 230;
    const hasR = (sp.lines || []).some(l => l.t && (l.side || 'r') === 'r');
    const pl = sp.pl ?? 8, pr = sp.pr ?? (hasR ? 92 : 8);
    const pt = sp.pt ?? ((sp.bands || sp.title) ? 26 : 14), pb = sp.pb ?? (sp.xl ? 24 : 12);
    let lo = Infinity, hi = -Infinity;
    const inc = v => { if (typeof v === 'number') { lo = Math.min(lo, v); hi = Math.max(hi, v); } };
    c.forEach(k => { if (k) { inc(k[1]); inc(k[2]); } });
    (sp.lines || []).forEach(l => { if (!l.free) inc(l.y); });
    (sp.zones || []).forEach(z => { inc(z.lo); inc(z.hi); });
    if (sp.range) { inc(sp.range[0]); inc(sp.range[1]); }
    const pad = (hi - lo) * (sp.pad ?? 0.12);
    lo -= pad; hi += pad;
    const sw = (W - pl - pr) / n;
    const X = i => pl + sw * (i + 0.5);
    const E = i => pl + sw * i;                 // linke Kante des Platzes i
    const Y = p => pt + (hi - p) / (hi - lo) * (H - pt - pb);
    const bw = Math.max(3, Math.min(sw * (sp.bw || 0.62), 60));
    const P = (i, p) => {                        // Preis oder 'h'/'l' einer Kerze
      if (p === 'h') return c[i][1];
      if (p === 'l') return c[i][2];
      if (p === 'o') return c[i][0];
      if (p === 'c') return c[i][3];
      return p;
    };
    const xEnd = x1 => (x1 === undefined || x1 === 'end') ? W - pr : E(x1 + 1);
    let s = '';

    // Session-Bänder
    (sp.bands || []).forEach((b, k) => {
      s += `<rect class="band ${b.cls || (k % 2 ? 'band-b' : 'band-a')}" x="${r1(E(b.x0))}" y="0" width="${r1(E(b.x1 + 1) - E(b.x0))}" height="${H - pb + 4}"/>`;
      if (b.t) s += text((E(b.x0) + E(b.x1 + 1)) / 2, 15, b.t, { cls: 'band-t', fs: 11 });
    });

    // Zonen
    (sp.zones || []).forEach(z => {
      const x0 = E(z.x0 ?? 0), x1 = xEnd(z.x1);
      const y0 = Y(z.hi), y1 = Y(z.lo);
      s += `<rect class="zone ${z.cls || 'zb'}" x="${r1(x0)}" y="${r1(y0)}" width="${r1(x1 - x0)}" height="${r1(Math.max(1, y1 - y0))}"/>`;
      if (z.t) {
        const ta = z.ta || 'r';
        const tx = ta === 'l' ? x0 + 4 : ta === 'c' ? (x0 + x1) / 2 : x1 - 4;
        const anchor = ta === 'l' ? 'start' : ta === 'c' ? 'middle' : 'end';
        const lines = String(z.t).split('\n').length;
        const big = (y1 - y0) > lines * 13 + 2 && !z.tp;
        if (big) s += text(tx, (y0 + y1) / 2, z.t, { a: anchor, v: 'mid', cls: 'zt ' + (z.cls || 'zb'), fs: 11 });
        else if (z.tp === 'b') s += text(tx, y1 + 12, z.t, { a: anchor, cls: 'zt ' + (z.cls || 'zb'), fs: 11 });
        else s += text(tx, y0 - 4, z.t, { a: anchor, v: 'bottom', cls: 'zt ' + (z.cls || 'zb'), fs: 11 });
      }
    });

    // Linien
    const rlabs = [];
    (sp.lines || []).forEach(l => {
      const x0 = E(l.x0 ?? 0), x1 = xEnd(l.x1), y = Y(l.y);
      s += `<line class="hl ${l.cls || 'lv'}" x1="${r1(x0)}" x2="${r1(x1)}" y1="${r1(y)}" y2="${r1(y)}"/>`;
      if (!l.t) return;
      const side = l.side || 'r';
      if (side === 'r') rlabs.push({ y, t: l.t, cls: l.cls || 'lv' });
      else if (side === 'a') s += text(x1 - 2, y - 4, l.t, { a: 'end', v: 'bottom', cls: 'll ' + (l.cls || 'lv'), fs: 11 });
      else if (side === 'b') s += text(x1 - 2, y + 13, l.t, { a: 'end', cls: 'll ' + (l.cls || 'lv'), fs: 11 });
      else if (side === 'al') s += text(x0 + 2, y - 4, l.t, { a: 'start', v: 'bottom', cls: 'll ' + (l.cls || 'lv'), fs: 11 });
      else if (side === 'bl') s += text(x0 + 2, y + 13, l.t, { a: 'start', cls: 'll ' + (l.cls || 'lv'), fs: 11 });
    });
    // rechte Beschriftungen ohne Überlappung
    rlabs.sort((a, b) => a.y - b.y);
    rlabs.forEach(r => { r.h = String(r.t).split('\n').length * 13; r.py = r.y; });
    for (let i = 1; i < rlabs.length; i++) {
      const a = rlabs[i - 1], b = rlabs[i];
      const min = a.py + a.h / 2 + b.h / 2 + 1;
      if (b.py < min) b.py = min;
    }
    const over = rlabs.length ? rlabs[rlabs.length - 1].py + rlabs[rlabs.length - 1].h / 2 - (H - 2) : 0;
    if (over > 0) rlabs.forEach(r => { r.py -= over; });
    for (let i = rlabs.length - 2; i >= 0; i--) {
      const a = rlabs[i], b = rlabs[i + 1];
      const max = b.py - a.h / 2 - b.h / 2 - 1;
      if (a.py > max) a.py = max;
    }
    rlabs.forEach(r => {
      if (Math.abs(r.py - r.y) > 2) s += `<line class="lead ${r.cls}" x1="${W - pr}" y1="${r1(r.y)}" x2="${W - pr + 6}" y2="${r1(r.py)}"/>`;
      s += text(W - pr + 8, r.py, r.t, { a: 'start', v: 'mid', cls: 'll ' + r.cls, fs: 11 });
    });

    // Legs
    (sp.legs || []).forEach(g => {
      const pts = g.p.map(([i, p]) => `${r1(X(i))},${r1(Y(P(i, p)))}`).join(' ');
      s += `<polyline class="leg ${g.cls || ''}" points="${pts}"/>`;
      g.p.forEach(([i, p]) => { s += `<circle class="legdot ${g.cls || ''}" cx="${r1(X(i))}" cy="${r1(Y(P(i, p)))}" r="3"/>`; });
    });

    // Hervorhebungen
    (sp.hl || []).forEach(i => {
      const k = c[i];
      s += `<rect class="hlbox" x="${r1(X(i) - bw / 2 - 4)}" y="${r1(Y(k[1]) - 4)}" width="${r1(bw + 8)}" height="${r1(Y(k[2]) - Y(k[1]) + 8)}" rx="4"/>`;
    });

    // Kerzen
    const fade = new Set(sp.fade || []);
    c.forEach((k, i) => {
      if (!k) return;
      const [o, h, l, cl] = k;
      const up = cl >= o;
      const cls = (up ? 'up' : 'dn') + (fade.has(i) ? ' fade' : '');
      const x = X(i);
      const bwi = bw * ((sp.bwx && sp.bwx[i]) || 1);
      const top = Y(Math.max(o, cl)), bot = Y(Math.min(o, cl));
      s += `<g class="k ${cls}"><line class="w" x1="${r1(x)}" x2="${r1(x)}" y1="${r1(Y(h))}" y2="${r1(Y(l))}"/>` +
        `<rect class="b" x="${r1(x - bwi / 2)}" y="${r1(top)}" width="${r1(bwi)}" height="${r1(Math.max(1.2, bot - top))}"/></g>`;
    });

    if (sp.title) s += text(pl + 2, 13, sp.title, { a: 'start', cls: 'ttl', fs: 12 });

    // Pfeile
    (sp.arrows || []).forEach(a => {
      const x1 = X(a.f[0]), y1 = Y(P(a.f[0], a.f[1])), x2 = X(a.t[0]), y2 = Y(P(a.t[0], a.t[1]));
      s += `<line class="arr ${a.cls || ''}" x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}" marker-end="url(#ah)"/>`;
      if (a.lab) s += text((x1 + x2) / 2 + (a.ldx || 0), (y1 + y2) / 2 + (a.ldy || 0), a.lab, { cls: 'note', fs: 11, a: a.la || 'middle' });
    });

    // Beschriftung mit Führungslinie
    (sp.calls || []).forEach(a => {
      const k = c[a.i];
      const p = P(a.i, a.p);
      let x = X(a.i);
      if (a.e) x += Math.sign(a.dx || 1) * bw / 2;
      const y = Y(p);
      const tx = x + (a.dx || 0), ty = y + (a.dy || 0);
      const anchor = a.a || (a.dx > 0 ? 'start' : a.dx < 0 ? 'end' : 'middle');
      const ex = tx - (anchor === 'start' ? 3 : anchor === 'end' ? -3 : 0);
      const ey = ty + (anchor === 'middle' ? (a.dy < 0 ? 4 : -10) : 0);
      s += `<line class="lead" x1="${r1(x)}" y1="${r1(y)}" x2="${r1(ex)}" y2="${r1(ey)}"/><circle class="dot" cx="${r1(x)}" cy="${r1(y)}" r="2.4"/>`;
      const v = anchor === 'middle' ? (a.dy < 0 ? 'bottom' : 'top') : 'mid';
      const yy = v === 'top' ? ty + 2 : ty;
      s += text(tx, yy, a.t, { a: anchor, v: v === 'top' ? undefined : v, cls: 'note' + (a.cls ? ' ' + a.cls : ''), fs: a.fs || 11.5 });
      void k;
    });

    // Text über / unter der Kerze
    (sp.marks || []).forEach(m => {
      const k = c[m.i];
      const up = m.at === 'h';
      const y = up ? Y(k[1]) - 7 : Y(k[2]) + 15;
      s += text(X(m.i) + (m.dx || 0), y, m.t, { v: up ? 'bottom' : undefined, cls: 'mark' + (m.cls ? ' ' + m.cls : ''), fs: m.fs || 11.5 });
    });

    // Buchstaben-Marken
    (sp.badges || []).forEach(b => {
      let x, y;
      if (b.line !== undefined) { x = W - pr + 14; y = Y(b.line); }
      else {
        const k = c[b.i];
        x = X(b.i) + (b.dx || 0);
        if (b.at === 'h') y = Y(k[1]) - 14;
        else if (b.at === 'l') y = Y(k[2]) + 14;
        else y = Y(b.at) + (b.dy || 0);
      }
      s += `<g class="badge ${b.cls || ''}"><circle cx="${r1(x)}" cy="${r1(y)}" r="9.5"/>${text(x, y, b.t, { v: 'mid', cls: 'bt', fs: 11.5 })}</g>`;
    });

    // X-Beschriftungen
    (sp.xl || []).forEach(x => {
      s += text(X(x.i) + (x.dx || 0), H - 7, x.t, { cls: 'xl', fs: 11 });
    });

    const label = sp.alt ? ` aria-label="${esc(sp.alt)}"` : '';
    return `<svg class="ch" viewBox="0 0 ${W} ${H}" role="img"${label} style="max-width:${Math.round(W * 1.45)}px" preserveAspectRatio="xMidYMid meet">` +
      `<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="ahp"/></marker></defs>` +
      s + '</svg>';
  }

  // Erzeugt Kerzen aus Schlusskursen mit gleichmäßigen Dochten (deterministisch über seed)
  function rng(seed) {
    let t = seed >>> 0;
    return () => { t += 0x6D2B79F5; let x = Math.imul(t ^ t >>> 15, 1 | t); x ^= x + Math.imul(x ^ x >>> 7, 61 | x); return ((x ^ x >>> 14) >>> 0) / 4294967296; };
  }
  function walk(start, closes, rnd = Math.random, wick = [0.2, 0.9]) {
    let o = start;
    return closes.map(cl => {
      const h = Math.max(o, cl) + wick[0] + rnd() * (wick[1] - wick[0]);
      const l = Math.min(o, cl) - wick[0] - rnd() * (wick[1] - wick[0]);
      const k = [r1(o), r1(h), r1(l), r1(cl)];
      o = cl;
      return k;
    });
  }

  return { chart, mirror, walk, rng, r1, esc };
})();
