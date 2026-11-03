/* Trading-Lerncenter · Inhalte: Abbildungen, Themen, Glossar */

/* ---------- Kerzendaten ---------- */
const STAIR = [ // Aufwärtstrend: Tal 1, Gipfel 4, Tal 6, Gipfel 9, Tal 11, Gipfel 14
  [103, 103.6, 101.4, 101.8], [101.8, 102.4, 100, 101.6], [101.6, 104.2, 101.2, 103.8], [103.8, 106.4, 103.4, 106],
  [106, 108, 105.4, 106.6], [106.6, 107.1, 104.8, 105.2], [105.2, 105.8, 104, 105.4], [105.4, 108.6, 105, 108.2],
  [108.2, 111, 107.8, 110.6], [110.6, 113, 110, 111.2], [111.2, 111.8, 109.2, 109.6], [109.6, 110.2, 108.5, 109.9],
  [109.9, 113.2, 109.5, 112.8], [112.8, 116, 112.4, 115.6], [115.6, 118, 115, 116.4], [116.4, 116.9, 114.6, 115]
];
const FVG5 = [ // bullisches FVG: K1 = 1, K2 = 2, K3 = 3, Zone 102–104,5
  [101, 101.8, 100.2, 100.6], [100.6, 102, 100, 101.6], [101.6, 108.4, 101.3, 108], [108, 109.5, 104.5, 109], [109, 110.2, 108.2, 109.8]
];
const SWING9 = [
  [108, 108.4, 105.6, 106], [106, 106.3, 102.3, 103], [103, 103.5, 100, 101.5], [101.5, 105, 101, 104.5], [104.5, 107.6, 104, 107],
  [107, 109.6, 106.5, 109], [109, 111, 107.5, 108], [108, 109.2, 105, 105.5], [105.5, 106, 103.5, 104]
];
const CHAIN = [
  [106, 106.4, 104.6, 105], [105, 105.4, 103, 103.4], [103.4, 103.8, 101.8, 102.2], [102.2, 104.2, 101.9, 103.6],
  [103.6, 103.9, 101.4, 101.8], [101.8, 102.1, 100.4, 100.7], [100.7, 101.3, 99.4, 100.5], [100.5, 101.8, 100.2, 101.6],
  [101.6, 103, 101.2, 102.8], [102.8, 105.6, 101.6, 105.2], [105.2, 106.4, 104.2, 106], [106, 106.2, 104.4, 104.6],
  [104.6, 105.4, 103.4, 105.2], [105.2, 107.4, 105, 107.1], [107.1, 109.2, 106.8, 108.9], [108.9, 109.6, 107.2, 108.2],
  [108.2, 111.4, 108, 111], [111, 114.4, 110.6, 113.8], [113.8, 114.1, 112.6, 113]
];

/* ---------- Abbildungen ---------- */
const F = {
  anatomy: (badges) => {
    const sp = {
      c: [null, [104, 112, 100, 109], null, [109, 111, 101, 103], null], h: 250, bw: 0.62, pad: 0.06,
      calls: [
        { i: 1, p: 112, dx: -40, t: 'High' }, { i: 1, p: 110.5, dx: -40, t: 'Docht' },
        { i: 1, p: 109, dx: -40, t: 'Close', e: 1 }, { i: 1, p: 106.5, dx: -40, t: 'Körper', e: 1 },
        { i: 1, p: 104, dx: -40, t: 'Open', e: 1 }, { i: 1, p: 102, dx: -40, t: 'Lunte' }, { i: 1, p: 100, dx: -40, t: 'Low' },
        { i: 3, p: 111, dx: 40, t: 'High' }, { i: 3, p: 110, dx: 40, t: 'Docht' }, { i: 3, p: 109, dx: 40, t: 'Open', e: 1 },
        { i: 3, p: 106, dx: 40, t: 'Körper', e: 1 }, { i: 3, p: 103, dx: 40, t: 'Close', e: 1 },
        { i: 3, p: 102, dx: 40, t: 'Lunte' }, { i: 3, p: 101, dx: 40, t: 'Low' }
      ],
      xl: [{ i: 1, t: 'steigende Kerze' }, { i: 3, t: 'fallende Kerze' }],
      alt: 'Aufbau einer steigenden und einer fallenden Kerze'
    };
    if (badges) {
      sp.calls = [];
      sp.badges = badges;
    }
    return sp;
  },

  crv: () => ({
    c: [[103.6, 104, 102.6, 103], [103, 103.3, 101.6, 101.9], [101.9, 103.4, 101.6, 103.2], [103.2, 104.4, 102.9, 104.2],
      [104.2, 105.4, 103.8, 105], [105, 105.3, 104, 104.5], [104.5, 106.8, 104.3, 106.5], [106.5, 108.3, 106.2, 108],
      [108, 108.4, 107, 107.4], [107.4, 109.4, 107.1, 109.2], [109.2, 110.4, 108.9, 110.2]],
    zones: [{ x0: 3, lo: 101, hi: 104.2, cls: 'zr', t: 'Risiko 1 R\n3,2 Punkte', ta: 'r' },
      { x0: 3, lo: 104.2, hi: 110.6, cls: 'zg', t: 'Chance 2 R\n6,4 Punkte', ta: 'l' }],
    lines: [{ y: 110.6, x0: 3, cls: 'tgt', t: 'Ziel' }, { y: 104.2, x0: 3, cls: 'entry', t: 'Einstieg' }, { y: 101, x0: 3, cls: 'stop', t: 'Stop' }],
    pr: 70, alt: 'Long-Trade mit Stop, Einstieg und Ziel, CRV 1 zu 2'
  }),

  timeframe: () => {
    const rnd = TT.rng(7);
    const five = TT.walk(100, [100.6, 101.2, 100.8, 101.9, 102.6, 102.1, 103.4, 103, 104.1, 103.6, 104.6, 105], rnd, [0.15, 0.5]);
    const agg = [five[0][0], Math.max(...five.map(k => k[1])), Math.min(...five.map(k => k[2])), five[11][3]];
    return {
      c: [...five, null, null, agg, null], bwx: { 14: 2.2 },
      bands: [{ x0: 0, x1: 11, t: '12 × 5 Minuten' }, { x0: 13, x1: 15, t: '= 1 Stunde' }],
      calls: [{ i: 14, p: 'h', dx: -26, dy: 0, t: 'höchstes High', a: 'end' }, { i: 14, p: 'l', dx: -26, dy: 0, t: 'tiefstes Low', a: 'end' }],
      alt: 'Zwölf 5-Minuten-Kerzen ergeben eine 1-Stunden-Kerze'
    };
  },

  swing3: () => ({
    c: SWING9,
    lines: [{ y: 100, x0: 1, x1: 3, cls: 'aux' }, { y: 111, x0: 5, x1: 7, cls: 'aux' }],
    marks: [{ i: 6, at: 'h', t: 'Gipfel' }, { i: 2, at: 'l', t: 'Tal' }],
    calls: [{ i: 2, p: 'l', dx: 34, dy: 16, t: 'tiefste Lunte' }, { i: 6, p: 'h', dx: -30, dy: -14, t: 'höchster Docht', a: 'end' }],
    xl: [{ i: 1, t: 'links' }, { i: 2, t: 'Mitte' }, { i: 3, t: 'rechts' }, { i: 5, t: 'links' }, { i: 6, t: 'Mitte' }, { i: 7, t: 'rechts' }],
    pad: 0.16, alt: 'Swing-Tief und Swing-Hoch nach der 3-Kerzen-Regel'
  }),

  legs: () => ({
    c: STAIR,
    legs: [{ p: [[1, 'l'], [4, 'h'], [6, 'l'], [9, 'h'], [11, 'l'], [14, 'h']] }],
    marks: [{ i: 1, at: 'l', t: 'Tal' }, { i: 4, at: 'h', t: 'Gipfel' }, { i: 6, at: 'l', t: 'Tal' }, { i: 9, at: 'h', t: 'Gipfel' }, { i: 11, at: 'l', t: 'Tal' }, { i: 14, at: 'h', t: 'Gipfel' }],
    calls: [{ i: 2, p: 102.67, dx: -6, dy: -38, t: 'Leg ↑', a: 'end' }, { i: 10, p: 110.75, dx: 12, dy: -30, t: 'Leg ↓', a: 'start' }],
    pad: 0.14, alt: 'Legs verbinden Tal und Gipfel abwechselnd'
  }),

  stairUp: () => ({
    c: STAIR,
    legs: [{ p: [[1, 'l'], [4, 'h'], [6, 'l'], [9, 'h'], [11, 'l'], [14, 'h']], cls: 'soft' }],
    marks: [{ i: 1, at: 'l', t: 'Tief' }, { i: 4, at: 'h', t: 'Hoch' }, { i: 6, at: 'l', t: 'höheres\nTief' }, { i: 9, at: 'h', t: 'höheres\nHoch' }, { i: 11, at: 'l', t: 'höheres\nTief' }, { i: 14, at: 'h', t: 'höheres\nHoch' }],
    pad: 0.2, title: 'Aufwärtstrend', alt: 'Aufwärtstrend mit höheren Hochs und höheren Tiefs'
  }),

  stairDown: () => {
    const sp = TT.mirror({ c: STAIR, legs: [{ p: [[1, 'l'], [4, 'h'], [6, 'l'], [9, 'h'], [11, 'l'], [14, 'h']], cls: 'soft' }] }, 109);
    sp.marks = [{ i: 1, at: 'h', t: 'Hoch' }, { i: 4, at: 'l', t: 'Tief' }, { i: 6, at: 'h', t: 'tieferes\nHoch' }, { i: 9, at: 'l', t: 'tieferes\nTief' }, { i: 11, at: 'h', t: 'tieferes\nHoch' }, { i: 14, at: 'l', t: 'tieferes\nTief' }];
    sp.pad = 0.2; sp.title = 'Abwärtstrend'; sp.alt = 'Abwärtstrend mit tieferen Hochs und tieferen Tiefs';
    return sp;
  },

  liquidity: () => ({
    c: [[103, 104.4, 102.6, 104], [104, 106.2, 103.7, 105.8], [105.8, 108.4, 105.5, 108], [108, 110, 107.4, 108.6], [108.6, 108.9, 106.4, 106.8],
      [106.8, 107.1, 104.2, 104.6], [104.6, 104.9, 102.4, 102.8], [102.8, 103.2, 100.6, 101.2], [101.2, 101.6, 100, 101.3],
      [101.3, 103.4, 101, 103.1], [103.1, 105.2, 102.8, 104.9], [104.9, 106, 104.2, 105.5]],
    zones: [{ x0: 3, lo: 110, hi: 112.2, cls: 'zb', t: 'Kauforders\nShort-Stops + Ausbruchskäufer', ta: 'r' },
      { x0: 5, lo: 97.8, hi: 100, cls: 'zs', t: 'Verkaufsorders\nLong-Stops + Ausbruchsverkäufer', ta: 'r' }],
    lines: [{ y: 110, x0: 3, t: 'Hoch' }, { y: 100, x0: 8, t: 'Tief' }],
    pr: 50, pad: 0.04, alt: 'Über dem Hoch liegen Kauforders, unter dem Tief Verkaufsorders'
  }),

  sweep: () => ({
    c: [[101, 102.6, 100.6, 102.3], [102.3, 104.4, 102, 104.1], [104.1, 106, 103.7, 105.2], [105.2, 105.5, 103.4, 103.8], [103.8, 104.1, 102.4, 102.9],
      [102.9, 104.8, 102.6, 104.5], [104.5, 107.3, 104.2, 105.2], null, null],
    lines: [{ y: 106, x0: 2, x1: 7, t: 'Hoch' }], hl: [6], w: 320, pr: 46,
    calls: [{ i: 6, p: 'h', dx: -30, dy: -6, t: 'Docht drüber', a: 'end' }, { i: 6, p: 'c', dx: 22, dy: 24, t: 'Schluss\ndarunter', a: 'start', e: 1 }],
    title: 'Sweep', alt: 'Sweep: Docht über dem Hoch, Schluss darunter'
  }),

  breakout: () => ({
    c: [[101, 102.6, 100.6, 102.3], [102.3, 104.4, 102, 104.1], [104.1, 106, 103.7, 105.2], [105.2, 105.5, 103.4, 103.8], [103.8, 104.1, 102.4, 102.9],
      [102.9, 104.8, 102.6, 104.5], [104.5, 107.4, 104.3, 107.1], null, null],
    lines: [{ y: 106, x0: 2, x1: 7, t: 'Hoch' }], hl: [6], w: 320, pr: 46, range: [100.6, 107.4],
    calls: [{ i: 6, p: 'c', dx: -34, dy: -14, t: 'Schluss\ndarüber', a: 'end', e: 1 }],
    title: 'Durchbruch', alt: 'Durchbruch: Schluss über dem Hoch'
  }),

  sessions: () => ({
    c: [[101.5, 102.1, 101.2, 101.9], [101.9, 102.6, 101.7, 102.4], [102.4, 103, 102.1, 102.3], [102.3, 102.5, 101.4, 101.6], [101.6, 101.9, 100.6, 100.9],
      [100.9, 101.1, 99.5, 100.2], [100.2, 100.9, 99.9, 100.7], [100.7, 101.5, 100.4, 101.3], [101.3, 101.8, 101, 101.5],
      [101.5, 102.2, 101.4, 102], [102, 102.3, 101.2, 101.6], [101.6, 102.9, 101.5, 102.7], [102.7, 104, 102.5, 103.6], [103.6, 103.8, 102.9, 103.1], [103.1, 103.4, 102.6, 102.9],
      [102.9, 103.5, 102.7, 103.3], [103.3, 103.9, 103, 103.7], [103.7, 104.9, 103.5, 103.7], [103.7, 103.8, 102.4, 102.6], [102.6, 102.8, 101.6, 101.8],
      [101.8, 102, 100.9, 101.1], [101.1, 101.3, 100, 100.3], [100.3, 100.5, 99.3, 99.6], [99.6, 100.2, 99.4, 100]],
    bands: [{ x0: 0, x1: 8, t: 'Asien', cls: 'band-a' }, { x0: 9, x1: 14, t: 'London', cls: 'band-b' }, { x0: 15, x1: 23, t: 'New York', cls: 'band-a' }],
    lines: [{ y: 104, x0: 12, t: 'London-Hoch' }, { y: 103, x0: 2, x1: 12, cls: 'old', t: 'Asien-Hoch (geholt)', side: 'al' },
      { y: 101.2, x0: 10, t: 'London-Tief' }, { y: 99.5, x0: 5, t: 'Asien-Tief' }],
    calls: [{ i: 17, p: 'h', dx: 20, dy: -4, t: 'Sweep', a: 'start' }],
    xl: [{ i: 0, t: '18:00' }, { i: 9, t: '03:00' }, { i: 17, t: '09:30' }, { i: 23, t: '12:00' }],
    h: 250, pr: 84, alt: 'Session-Levels von Asien und London, New York holt das London-Hoch'
  }),

  eqh: () => ({
    c: [[103, 104.2, 102.6, 104], [104, 106.4, 103.8, 106.1], [106.1, 108, 105.7, 107.6], [107.6, 110, 107.2, 108.4], [108.4, 108.8, 106.2, 106.6],
      [106.6, 107, 105, 105.4], [105.4, 107.8, 105.1, 107.5], [107.5, 110, 107.3, 108.8], [108.8, 109.1, 107, 107.4], [107.4, 108.6, 107, 108.4],
      [108.4, 111.4, 108.2, 109.2], [109.2, 109.5, 106.2, 106.6], [106.6, 106.9, 103.8, 104.2]],
    lines: [{ y: 110, x0: 3, t: 'EQH\ngleiche Hochs' }],
    marks: [{ i: 3, at: 'h', t: 'Hoch 1' }, { i: 7, at: 'h', t: 'Hoch 2' }], hl: [10],
    calls: [{ i: 10, p: 'c', dx: 28, dy: 34, t: 'beide auf\neinmal geholt', a: 'start', e: 1 }],
    pr: 84, pad: 0.16, alt: 'Gleiche Hochs werden gemeinsam gesweept'
  }),

  lowres: () => ({
    c: [...STAIR, [115, 115.3, 111.6, 112], [112, 112.3, 108, 108.4], [108.4, 108.8, 105.4, 105.8], [105.8, 106.1, 103.6, 104.2], [104.2, 104.5, 101.6, 102], [102, 102.3, 99.6, 100.4]],
    lines: [{ y: 108.5, x0: 11, x1: 17, t: 'Tief 3', side: 'bl', cls: 'lv' }, { y: 104, x0: 6, x1: 19, t: 'Tief 2', side: 'bl', cls: 'lv' }, { y: 100, x0: 1, x1: 21, t: 'Tief 1', side: 'bl', cls: 'lv' }],
    calls: [{ i: 19, p: 'l', dx: -30, dy: 20, t: 'einer nach\ndem anderen', a: 'end' }],
    pad: 0.1, alt: 'Gestapelte Tiefs werden nach der Trendwende nacheinander geholt'
  }),

  bos: () => ({
    c: [...STAIR.slice(5), [115, 115.3, 111.5, 112], [112, 112.4, 110, 110.6], [110.6, 111, 107.6, 109.6], [109.6, 109.9, 106.8, 107.2], [107.2, 107.6, 105.6, 106]],
    lines: [{ y: 108.5, x0: 6, t: 'jüngstes Tal' }, { y: 104, x0: 1, cls: 'old', t: 'älteres Tal' }],
    marks: [{ i: 9, at: 'h', t: 'letzter Gipfel' }],
    badges: [{ i: 13, at: 'l', t: '1' }, { i: 14, at: 'h', t: '2' }],
    h: 250, pr: 84, pad: 0.1, alt: 'Break of Structure: erst der Schluss unter dem jüngsten Tal zählt'
  }),

  fvgBull: () => ({
    c: FVG5, zones: [{ x0: 1, lo: 102, hi: 104.5, cls: 'zb', t: 'bullisches FVG', ta: 'r', tp: 'b' }],
    calls: [{ i: 1, p: 'h', dx: -18, dy: -30, t: 'Docht K1', a: 'middle' }, { i: 3, p: 'l', dx: 30, dy: 0, t: 'Lunte K3', a: 'start' }],
    xl: [{ i: 1, t: 'K1' }, { i: 2, t: 'K2' }, { i: 3, t: 'K3' }], w: 300, pad: 0.16, title: 'Bullisch',
    alt: 'Bullisches FVG zwischen Docht von Kerze 1 und Lunte von Kerze 3'
  }),

  fvgBear: () => {
    const sp = TT.mirror({ c: FVG5, zones: [{ x0: 1, lo: 102, hi: 104.5, cls: 'zs', t: 'bärisches FVG', ta: 'r', tp: 'b' }] }, 105);
    sp.calls = [{ i: 1, p: 'l', dx: -18, dy: 30, t: 'Lunte K1', a: 'middle' }, { i: 3, p: 'h', dx: 30, dy: 0, t: 'Docht K3', a: 'start' }];
    sp.xl = [{ i: 1, t: 'K1' }, { i: 2, t: 'K2' }, { i: 3, t: 'K3' }]; sp.w = 300; sp.pad = 0.16; sp.title = 'Bärisch';
    sp.alt = 'Bärisches FVG zwischen Lunte von Kerze 1 und Docht von Kerze 3';
    return sp;
  },

  fvgNone: () => ({
    c: [[101, 101.8, 100.2, 100.6], [100.6, 102, 100, 101.6], [101.6, 108.4, 101.3, 108], [108, 109.5, 101.2, 109], [109, 110.2, 108.2, 109.8]],
    zones: [{ x0: 1, x1: 3, lo: 101.2, hi: 102, cls: 'zw' }],
    calls: [{ i: 1, p: 'h', dx: -18, dy: -30, t: 'Docht K1', a: 'middle' }, { i: 3, p: 'l', dx: 30, dy: 0, t: 'Lunte K3', a: 'start' }, { i: 3, p: 101.6, dx: 30, dy: 24, t: 'überlappen', a: 'start' }],
    xl: [{ i: 1, t: 'K1' }, { i: 2, t: 'K2' }, { i: 3, t: 'K3' }], w: 300, pad: 0.16, title: 'Kein FVG',
    alt: 'Kein FVG: Docht von Kerze 1 und Lunte von Kerze 3 überlappen'
  }),

  fvgValid: () => ({
    c: [...FVG5, [109.8, 111, 109.4, 110.6], [110.6, 110.9, 107.6, 108], [108, 108.3, 101.4, 103.4], [103.4, 107.2, 103, 106.8], [106.8, 111.8, 106.5, 111.4]],
    zones: [{ x0: 1, lo: 102, hi: 104.5, cls: 'zb', t: 'FVG', ta: 'l' }], hl: [7], w: 320,
    calls: [{ i: 7, p: 'l', dx: -30, dy: 14, t: 'Lunte darunter', a: 'end' }, { i: 7, p: 'c', dx: -40, dy: 0, t: 'Schluss in der Zone', a: 'end', e: 1 }],
    title: 'Gültig', pad: 0.12, alt: 'FVG bleibt gültig: Schluss in der Zone'
  }),

  fvgInvalid: () => ({
    c: [...FVG5, [109.8, 111, 109.4, 110.6], [110.6, 110.9, 107.6, 108], [108, 108.3, 100.4, 101], [101, 101.6, 99.2, 99.8], [99.8, 100.6, 98.4, 99]],
    zones: [{ x0: 1, lo: 102, hi: 104.5, cls: 'zb', t: 'FVG', ta: 'l' }], hl: [7], w: 320,
    calls: [{ i: 7, p: 'c', dx: -40, dy: 10, t: 'Schluss unter der Zone', a: 'end', e: 1 }],
    title: 'Ungültig', pad: 0.12, alt: 'FVG ungültig: Schluss unter der Zone'
  }),

  stacked: () => ({
    c: [[100, 100.8, 99.6, 100.5], [100.5, 101.2, 100.2, 101], [101, 105, 100.6, 104.8], [104.8, 106.4, 102.4, 106], [106, 110, 104.6, 109.6],
      [109.6, 111.2, 107.6, 110.8], [110.8, 115, 109.4, 114.6], [114.6, 116, 112.8, 115.4], [115.4, 116.4, 114.6, 116]],
    zones: [{ x0: 1, lo: 101.2, hi: 102.4, cls: 'zb', t: 'FVG 1', ta: 'r' }, { x0: 3, lo: 106.4, hi: 107.6, cls: 'zb', t: 'FVG 2', ta: 'r' }, { x0: 5, lo: 111.2, hi: 112.8, cls: 'zb', t: 'FVG 3', ta: 'r' }],
    w: 320, pad: 0.08, alt: 'Drei gestapelte bullische FVGs, alle gültig'
  }),

  ndog: () => ({
    c: [[101.6, 102.2, 101.2, 101.9], [101.9, 102.4, 101.5, 101.7], [101.7, 101.9, 100.8, 101], null, [103, 103.6, 102.6, 103.3], [103.3, 103.5, 102.2, 102.4],
      [102.4, 102.6, 101.3, 101.5], [101.5, 101.6, 100.6, 100.9], [100.9, 101.8, 100.7, 101.6]],
    bands: [{ x0: 3, x1: 3, t: 'Pause', cls: 'band-p' }],
    zones: [{ x0: 2, x1: 7, lo: 101, hi: 103, cls: 'zw', t: 'Tages-Gap', ta: 'l', tp: 'a' }],
    calls: [{ i: 7, p: 'l', dx: 0, dy: 16, t: 'gefüllt', a: 'middle' }],
    xl: [{ i: 2, t: '17:00' }, { i: 4, t: '18:00' }], w: 320, pad: 0.12, alt: 'Tages-Gap zwischen 17-Uhr-Schluss und 18-Uhr-Eröffnung'
  }),

  bpr: () => ({
    c: [[100, 101, 99, 100.5], [100.5, 108, 100, 107.5], [107.5, 110, 107, 109], [109, 110, 105, 105.5], [105.5, 106, 97, 97.5], [97.5, 99, 95, 96],
      [96, 100, 95.5, 99], [99, 104.5, 98.5, 104], [104, 104.5, 99, 99.5], [99.5, 100, 94, 94.5]],
    zones: [{ x0: 0, x1: 2, lo: 101, hi: 107, cls: 'zb', t: 'FVG ↑', ta: 'l', tp: 'a' }, { x0: 3, x1: 5, lo: 99, hi: 105, cls: 'zs', t: 'FVG ↓', ta: 'r', tp: 'a' }, { x0: 6, lo: 101, hi: 105, cls: 'zw', t: 'BPR', ta: 'r' }],
    w: 320, pad: 0.06, alt: 'Balanced Price Range: Überlappung von FVG nach oben und FVG nach unten'
  }),

  ifvg: () => {
    const base = { c: [...FVG5, [109.8, 111, 109.4, 110.6], [110.6, 110.9, 107.6, 108], [108, 108.3, 100.4, 101], [101, 101.6, 99.2, 99.8], [99.8, 100.6, 98.4, 99]], zones: [{ x0: 1, lo: 102, hi: 104.5, cls: 'zs', t: 'bärisches FVG', ta: 'l' }] };
    const sp = TT.mirror(base, 105);
    sp.hl = [7];
    sp.zones[0].ta = 'r'; sp.zones[0].tp = 'b';
    sp.calls = [{ i: 7, p: 'c', dx: -40, dy: 0, t: 'Schluss über der Zone', a: 'end', e: 1 }];
    sp.w = 320; sp.title = 'Bullisches IFVG';
    sp.pad = 0.12; sp.alt = 'Inverse FVG: Schluss über einem bärischen FVG im Abwärtstrend';
    return sp;
  },

  eq: (badges) => {
    const sp = {
      c: [[103, 103.4, 101.2, 101.6], [101.6, 102, 100, 101.4], [101.4, 104.6, 101, 104.2], [104.2, 107.8, 103.8, 107.4], [107.4, 109.4, 106.6, 109],
        [109, 113, 108.6, 112.6], [112.6, 116.2, 112, 115.8], [115.8, 120, 115.4, 118.2], [118.2, 118.6, 114.8, 115.2], [115.2, 115.6, 111.6, 112],
        [112, 112.4, 108.4, 109.2], [109.2, 111.8, 108.8, 111.5], [111.5, 115.2, 111.2, 114.8]],
      zones: [{ x0: 1, lo: 110, hi: 120, cls: 'zp', t: 'Premium\nteuer: Shorts', ta: 'l' }, { x0: 1, lo: 100, hi: 110, cls: 'zd', t: 'Discount\ngünstig: Longs', ta: 'r' }],
      lines: [{ y: 120, x0: 1, cls: 'aux', t: 'Hoch 120' }, { y: 110, x0: 1, cls: 'eq', t: 'EQ 110\n(50 %)' }, { y: 100, x0: 1, cls: 'aux', t: 'Tief 100' }],
      legs: [{ p: [[1, 'l'], [7, 'h']], cls: 'dash' }],
      calls: [{ i: 10, p: 'l', dx: 0, dy: 18, t: 'Rücklauf', a: 'middle' }],
      h: 250, pr: 70, pad: 0.06, alt: 'Equilibrium teilt die Bewegung in Premium und Discount'
    };
    if (badges) { sp.zones.forEach(z => { z.t = ''; }); sp.calls = []; sp.lines.forEach(l => { l.t = l.cls === 'eq' ? 'EQ' : ''; }); sp.badges = badges; }
    return sp;
  },

  smt: (which) => {
    const es = [[101, 101.8, 100.4, 101.5], [101.5, 102.6, 101.2, 102.3], [102.3, 103.4, 102, 103.1], [103.1, 103.5, 101.8, 102.1], [102.1, 102.4, 100.9, 101.3],
      [101.3, 102.8, 101, 102.5], [102.5, 103.8, 102.2, 103.5], [103.5, 104.2, 103.1, 103.9], [103.9, 104.6, 103.5, 104.1], [104.1, 104.3, 102.4, 102.7],
      [102.7, 103, 101.2, 101.5], [101.5, 101.8, 100.2, 100.5]];
    const nq = es.map(k => k.slice());
    nq[7] = [103.5, 104.6, 103.1, 104.4]; nq[8] = [104.4, 105.9, 104.1, 104.3]; nq[9] = [104.3, 104.5, 102.4, 102.7];
    if (which === 'nq') return {
      c: nq, lines: [{ y: 105, t: 'London-Hoch' }], hl: [8], h: 190, pr: 84, title: 'US TECH 100',
      calls: [{ i: 8, p: 'h', dx: -30, dy: -8, t: 'höheres Hoch', a: 'end' }], range: [100, 107.2],
      alt: 'US TECH 100 holt das London-Hoch'
    };
    return {
      c: es, lines: [{ y: 105, t: 'London-Hoch' }], hl: [8], h: 190, pr: 84, title: 'US 500',
      calls: [{ i: 8, p: 'h', dx: -30, dy: -34, t: 'tieferes Hoch', a: 'end' }], range: [100, 107.2],
      alt: 'US 500 schafft das London-Hoch nicht'
    };
  },

  chain: (badges) => {
    const sp = {
      c: CHAIN,
      zones: [{ x0: 8, x1: 13, lo: 103, hi: 104.2, cls: 'zb' }],
      calls: [{ i: 10, p: 103.6, dx: 0, dy: 34, t: 'FVG', a: 'middle' }],
      lines: [{ y: 114, x0: 12, cls: 'tgt', t: 'Ziel\nAsien-Hoch' }, { y: 105.2, x0: 12, cls: 'entry', t: 'Einstieg' },
        { y: 104.2, x0: 3, x1: 9, cls: 'aux', t: 'jüngster Gipfel', side: 'al' },
        { y: 100, t: 'London-Tief' }, { y: 99.1, x0: 12, cls: 'stop', t: 'Stop' }],
      badges: [{ i: 6, at: 'l', t: '1' }, { i: 9, at: 'h', t: '2' }, { i: 12, at: 'l', t: '3' }, { i: 17, at: 'h', t: '4' }],
      h: 270, pr: 78, pad: 0.06, alt: 'Komplette Strategie: Sweep, BOS, Rücklauf ins FVG, Ziel'
    };
    if (badges) { sp.badges = badges; sp.lines = sp.lines.filter(l => l.cls !== 'tgt'); sp.lines.forEach(l => { if (l.cls !== 'lv' && l.cls !== undefined) l.t = l.cls === 'aux' ? '' : l.t; }); }
    return sp;
  }
};

/* ---------- Lektionslinks ---------- */
const LESSONS = {
  1: ['Mindset & Ziele', '8NXrmLfMxLZxLehToFEDhk'], 2: ['Was Trading wirklich ist', 'S6yt4hcAH7zFJUp6y9wfrg'], 3: ['Kerzencharts lesen', '1L1z8azDgCDwd76X8MTdV5'],
  4: ['Risiko & Psychologie', 'PqwPBFMFv6TNfizqPZRsGJ'], 5: ['Liquidität', 'NyQZcpwpvJrd5m2ztmCb9X'], 6: ['Liquidität für Fortgeschrittene', '9y1FKeTWHqtFVmP7eQWvA2'],
  7: ['Break of Structure', 'BtxjzA7SxtfgNPzZECGUV4'], 8: ['Fair Value Gaps', 'Attq3fP9pE99PaGuEayHfe'], 9: ['Imbalances für Fortgeschrittene', '1XP5K4o4w7JuQiDopA6XWS'],
  10: ['Inverse FVG', '9LztpcMSBiZZqwNo4uWj1N'], 11: ['Equilibrium', 'TABxfmwzH7Vd9S7VeeCVjh'], 12: ['SMT-Divergenz', '4XKb5SuWtGKsHnL6vS4gb8'],
  13: ['Uhrzeiten', 'JuU5TF7pNNvvwF9VyMSapj'], 14: ['Daily Bias', 'QWXYFbCKwD4EJ67KVBn8Po'], 15: ['Die komplette Strategie', 'BuT3FN89Bxu5aCbVwpNBKh'],
  16: ['Funded Accounts', 'P83MWVUCEj6FUW1gK2dkz4']
};

/* ---------- Themen ----------
   fig: <figure data-fig="name" data-cap="Bildunterschrift"></figure> */
const BLOCKS = [
  ['A', 'Grundlagen'], ['B', 'Liquidität'], ['C', 'Struktur & Zonen'], ['D', 'Kontext'], ['E', 'Strategie & Konto']
];

const TOPICS = [
  {
    id: 'ziele', b: 'A', l: [1], t: 'Mindset & Ziele',
    sum: 'Du misst Fortschritt am Prozess, nicht an einem Tagesziel.',
    body: `<p>Ein festes Tagesziel („heute 200 €“) erzeugt Druck. Druck führt zu Trades ohne Setup. Dein Ziel ist stattdessen, die Regeln sauber auszuführen und die Ergebnisse im Journal zu vergleichen.</p>
<div class="tbl"><table><thead><tr><th>Phase</th><th>Inhalt</th><th>Weiter, wenn …</th></tr></thead><tbody>
<tr><td>1 · Wissen</td><td>Lektion 1–16, Quiz ≥ 80 %</td><td>alle bestanden</td></tr>
<tr><td>2 · Backtest</td><td>100 Setups von Hand, mit Journal</td><td>positive Erwartung, Regeln &gt; 90 % eingehalten</td></tr>
<tr><td>3 · Demo live</td><td>gleiche Regeln in Echtzeit, 1–2 Monate</td><td>Ergebnis ähnlich wie im Backtest</td></tr>
<tr><td>4 · Challenge</td><td>FTMO mit max. 1 % Risiko</td><td>–</td></tr></tbody></table></div>`,
    rule: 'Kein Tagesziel. Regeln ausführen, Ergebnisse vergleichen.',
    err: ['Ein Geldziel pro Tag setzen', 'Phasen überspringen und direkt eine Challenge kaufen']
  },
  {
    id: 'crv', b: 'A', l: [2], t: 'Wahrscheinlichkeit & CRV',
    sum: 'Trading heißt Wahrscheinlichkeiten. Mit einem CRV von 1 : 2 reichen 34 % Treffer.',
    body: `<p>Das <strong>CRV</strong> (Chance-Risiko-Verhältnis) vergleicht den möglichen Gewinn mit dem Risiko. 1 R ist der Betrag, den du verlierst, wenn der Stop greift.</p>
<figure data-fig="crv" data-cap="Long-Trade: Risiko 1 R bis zum Stop, Chance 2 R bis zum Ziel"></figure>
<div class="tbl"><table><thead><tr><th>CRV</th><th>1 : 1</th><th>1 : 1,5</th><th>1 : 2</th><th>1 : 3</th></tr></thead><tbody>
<tr><td>nötige Trefferquote</td><td>50 %</td><td>40 %</td><td>33 %</td><td>25 %</td></tr></tbody></table></div>
<p class="formula">Break-even = 1 ÷ (1 + CRV)<br>Erwartung pro Trade = Treffer × CRV − (1 − Treffer)</p>
<p>Beispiel: 40 % Treffer, CRV 1 : 2 → 0,4 × 2 − 0,6 = <strong>+0,2 R</strong> pro Trade.</p>`,
    rule: 'Ein einzelner Trade ist Zufall. Erst viele Trades zeigen, ob die Erwartung positiv ist.',
    err: ['Nach einem Verlust die Strategie wechseln', 'Gewinner zu früh schließen und so das CRV zerstören']
  },
  {
    id: 'kerze', b: 'A', l: [3], t: 'Kerzen lesen',
    sum: 'Jede Kerze zeigt Open, High, Low und Close. Oben der Docht, unten die Lunte.',
    body: `<figure data-fig="anatomy" data-cap="Steigende Kerze: Close über Open. Fallende Kerze: Close unter Open."></figure>
<div class="terms">
<div><b>Docht</b><span>Der obere Schatten. Reicht bis zum High.</span></div>
<div><b>Lunte</b><span>Der untere Schatten. Reicht bis zum Low.</span></div>
<div><b>Körper</b><span>Zwischen Open und Close.</span></div>
<div><b>Farben</b><span>Rot/Grün oder Schwarz/Weiß wie bei TJR: hohl = steigend, gefüllt = fallend. Umschalten oben rechts.</span></div>
</div>`,
    rule: 'Dochte und Lunten bilden Levels und FVGs. Der Kerzenschluss bricht sie.',
    err: ['Docht und Lunte verwechseln', 'Den Körper statt Docht/Lunte als Hoch/Tief nehmen']
  },
  {
    id: 'zeitrahmen', b: 'A', l: [3], t: 'Zeitrahmen',
    sum: 'Eine große Kerze besteht aus vielen kleinen. 4h/1h für den Bias, 5m zum Handeln.',
    body: `<figure data-fig="timeframe" data-cap="Das High der 1-Stunden-Kerze ist das höchste High der zwölf 5-Minuten-Kerzen, das Low das tiefste Low."></figure>
<div class="terms">
<div><b>4h und 1h</b><span>Großes Bild: Trend, Ziele, Daily Bias.</span></div>
<div><b>15m</b><span>Session-Levels ablesen.</span></div>
<div><b>5m</b><span>Sweep, BOS, FVG, Einstieg.</span></div>
<div><b>1m</b><span>Optional für einen feineren Einstieg.</span></div>
</div>`,
    rule: 'Erst das große Bild, dann der kleine Zeitrahmen.',
    err: ['Im 1-Minuten-Chart nach einem Trend suchen, ohne das 1h-Bild zu kennen']
  },
  {
    id: 'swing', b: 'A', l: [3], t: 'Tal und Gipfel (Swing)',
    sum: 'Ein Swing ist immer die mittlere von drei Kerzen.',
    body: `<figure data-fig="swing3" data-cap="Tal: Die Lunte der mittleren Kerze liegt tiefer als die beiden Nachbarn. Gipfel: Der Docht der mittleren Kerze liegt höher als beide Nachbarn."></figure>
<div class="terms">
<div><b>Tal (Swing-Tief)</b><span>Mittlere Kerze, deren <strong>Lunte</strong> tiefer ist als die Lunten links und rechts.</span></div>
<div><b>Gipfel (Swing-Hoch)</b><span>Mittlere Kerze, deren <strong>Docht</strong> höher ist als die Dochte links und rechts.</span></div>
<div><b>Nachbarn</b><span>Die linke und rechte Kerze dienen nur zur Prüfung. Sie sind nie selbst der Swing-Punkt.</span></div>
<div><b>Außenstab</b><span>Eine Kerze kann gleichzeitig Tal und Gipfel sein, wenn Docht und Lunte beide Nachbarn überragen.</span></div>
</div>`,
    rule: 'Swing = mittlere Kerze. Tal an der Lunte, Gipfel am Docht.',
    err: ['Die linke oder rechte Kerze als Swing nehmen', 'Die letzte Kerze im Chart als Swing zählen, obwohl rechts noch kein Nachbar da ist']
  },
  {
    id: 'legs', b: 'A', l: [3], t: 'Legs',
    sum: 'Ein Leg verbindet einen Swing-Punkt mit dem nächsten: Tal → Gipfel → Tal.',
    body: `<figure data-fig="legs" data-cap="Jedes Leg startet und endet an Lunte oder Docht der mittleren Kerze."></figure>
<ol class="steps">
<li>Immer abwechselnd: Tal → Gipfel → Tal → Gipfel.</li>
<li>Nie einen Swing überspringen.</li>
<li>Stehen zwei Gipfel hintereinander, endet das Leg am <strong>extremeren</strong> (höheren) Punkt.</li>
<li>Zwischen zwei Swing-Punkten können beliebig viele Kerzen liegen.</li>
<li>Die Dreierpacks dürfen sich überlappen: Die rechte Nachbarkerze eines Tals kann die linke eines Gipfels sein.</li>
</ol>`,
    rule: 'Leg = Linie von Swing-Punkt zu Swing-Punkt, immer abwechselnd.',
    err: ['Leg an der ersten oder dritten Kerze ansetzen', 'Leg am Körper statt an Lunte/Docht ansetzen']
  },
  {
    id: 'trend', b: 'A', l: [3], t: 'Trend: die Treppe',
    sum: 'Aufwärtstrend = höhere Hochs UND höhere Tiefs. Abwärtstrend = beides tiefer.',
    body: `<div class="figs"><figure data-fig="stairUp" data-cap="Jedes Tief und jedes Hoch liegt höher als das vorige."></figure>
<figure data-fig="stairDown" data-cap="Spiegelbild: Jedes Hoch und jedes Tief liegt tiefer."></figure></div>
<p>Steigen nur die Hochs, während die Tiefs fallen, ist es keine Treppe. Dann schwankt der Markt.</p>`,
    rule: 'Trend ist Struktur, nicht Farbe. Drei grüne Kerzen sind kein Trend.',
    err: ['Trend an der Kerzenfarbe ablesen', 'Nur auf die Hochs schauen']
  },
  {
    id: 'risiko', b: 'A', l: [4], t: 'Risiko & Positionsgröße',
    sum: 'Maximal 1 % pro Trade. Die Positionsgröße folgt aus dem Stop, nicht aus dem Bauch.',
    body: `<p class="formula">Lots = Risiko in € ÷ Stop in Punkten ÷ Wert pro Punkt je Lot</p>
<p>Beispiel: 25.000 € Konto, 1 % = 250 €, Stop 10 Punkte, 1 € je Punkt und Lot → <strong>25 Lots</strong>.</p>
<div class="terms">
<div><b>Overtrading</b><span>Zu viele Trades. Du handelst, weil du handeln willst.</span></div>
<div><b>Overleveraging</b><span>Zu große Position für dein Konto.</span></div>
<div><b>Overrisking</b><span>Zu viel Risiko pro Trade. Ein schlechter Tag zerstört Wochen.</span></div>
<div><b>Größe halbieren</b><span>An News-Tagen (CPI, PPI, Zinsentscheid) und bei ungewöhnlich großem Stop.</span></div>
</div>
<p>Verlustserien sind normal. Mit 45 % Treffer sind 6–8 Verluste in Folge über 100 Trades üblich. Mit 1 % Risiko überlebt das Konto das locker.</p>
<p><a href="#werkzeuge" data-go="werkzeuge">→ Positionsgrößen-Rechner</a></p>`,
    rule: 'Erst den Stop festlegen, dann die Größe rechnen. Nie umgekehrt.',
    err: ['Größe nach Gefühl wählen', 'Nach Verlusten die Größe erhöhen, um aufzuholen']
  },
  {
    id: 'liquiditaet', b: 'B', l: [5], t: 'Liquidität',
    sum: 'Über Hochs liegen Kauforders, unter Tiefs Verkaufsorders. Dorthin will der Preis.',
    body: `<figure data-fig="liquidity" data-cap="Ein Short-Stop ist ein Kauf, ein Long-Stop ist ein Verkauf. Dazu kommen die Ausbruchstrader."></figure>
<p>Große Marktteilnehmer brauchen für eine große Short-Position viele Käufer auf einmal. Die finden sie genau über einem offensichtlichen Hoch. Deshalb läuft der Preis oft kurz darüber und dreht dann.</p>`,
    rule: 'Je offensichtlicher das Hoch oder Tief, desto mehr Orders liegen dort.',
    err: ['Über einem Hoch Verkaufsorders vermuten', 'Selbst als Ausbruchskäufer direkt über dem Hoch kaufen']
  },
  {
    id: 'sweep', b: 'B', l: [5], t: 'Sweep oder Durchbruch',
    sum: 'Sweep = Docht über das Level, Schluss zurück. Durchbruch = Schluss jenseits des Levels.',
    body: `<div class="figs"><figure data-fig="sweep" data-cap="Der Docht holt die Orders, der Schluss liegt wieder unter dem Hoch."></figure>
<figure data-fig="breakout" data-cap="Die Kerze schließt über dem Hoch. Das ist kein Sweep."></figure></div>
<p>Am Tief gilt alles spiegelverkehrt: Lunte darunter, Schluss wieder darüber = Sweep.</p>
<div class="stat"><b>61 %</b><span>der Sweeps in deinen Daten drehten zuerst. Fast 4 von 10 liefen trotzdem weiter.</span></div>`,
    rule: 'Ein Sweep ist eine Möglichkeit, kein Einstieg. Erst die Bestätigung (BOS/IFVG) zählt.',
    err: ['Direkt nach dem Sweep einsteigen', 'Eine Kerze mit Schluss über dem Hoch Sweep nennen']
  },
  {
    id: 'sessions', b: 'B', l: [6], t: 'Session-Levels',
    sum: 'Vor 15:30 markierst du die offenen Hochs und Tiefs von Asien, London und Vortag.',
    body: `<figure data-fig="sessions" data-cap="London hat das Asien-Hoch schon geholt. Offen bleiben London-Hoch, London-Tief und Asien-Tief. New York holt zuerst das London-Hoch und läuft dann zur Gegenseite."></figure>
<div class="tbl"><table><thead><tr><th>Session</th><th>New York</th><th>Deutschland</th></tr></thead><tbody>
<tr><td>Asien</td><td>18:00–03:00</td><td data-ny="18:00-03:00"></td></tr>
<tr><td>London</td><td>03:00–08:30</td><td data-ny="03:00-08:30"></td></tr>
<tr><td>New York</td><td>08:30–17:00</td><td data-ny="08:30-17:00"></td></tr></tbody></table></div>
<p>Die deutschen Zeiten werden für heute berechnet. Normal sind es 6 Stunden Abstand, in den Wochen der Zeitumstellung 5.</p>
<div class="stat"><b>84 %</b><span>der Tage holte London ein Asien-Level.</span></div>
<div class="stat"><b>70 %</b><span>der Tage erreichte New York bis 12:00 mindestens ein offenes Level.</span></div>`,
    rule: 'Nur offene Levels markieren, maximal 6 Linien. Geholte Liquidität ist verbraucht.',
    err: ['Bereits geholte Levels weiter markieren', 'Zu viele Linien zeichnen']
  },
  {
    id: 'eqh', b: 'B', l: [6], t: 'EQH, EQL und starke Ziele',
    sum: 'Gleiche Hochs oder Tiefs bündeln doppelte Liquidität. TJR: „Zwei Kekse sind besser als einer.“',
    body: `<figure data-fig="eqh" data-cap="Zwei Hochs auf fast gleichem Preis: Ein einziger Sweep holt beide."></figure>
<figure data-fig="lowres" data-cap="Low-Resistance-Liquidität: Gestapelte Tiefs im Aufwärtstrend werden nach der Wende nacheinander geholt."></figure>
<div class="terms">
<div><b>EQH / EQL</b><span>Equal Highs / Equal Lows: zwei oder mehr Hochs bzw. Tiefs auf fast gleichem Preis.</span></div>
<div><b>PDH / PDL</b><span>Previous Day High / Low: Hoch und Tief des Vortags über alle drei Sessions.</span></div>
<div><b>News-Hoch/-Tief</b><span>Hoch und Tief der Kerze, in der wichtige Daten kamen (meist 08:30 NY = 14:30 DE).</span></div>
<div><b>Extern / intern</b><span>Extern = Hochs und Tiefs. Intern = Ungleichgewichte wie FVGs.</span></div>
</div>`,
    rule: 'Der Preis läuft zu externer Liquidität oder füllt interne Ungleichgewichte.',
    err: ['EQH als Widerstand sehen, an dem man shortet, statt als Ziel']
  },
  {
    id: 'bos', b: 'C', l: [7], t: 'Break of Structure (BOS)',
    sum: 'Aufwärtstrend: Schluss unter dem jüngsten Tal. Abwärtstrend: Schluss über dem jüngsten Gipfel.',
    body: `<figure data-fig="bos" data-cap="1 = nur die Lunte sticht unter das jüngste Tal, Schluss darüber: kein BOS. 2 = Schluss darunter: BOS nach unten. Das ältere, tiefere Tal spielt keine Rolle."></figure>
<div class="terms">
<div><b>Im Aufwärtstrend</b><span>Beobachte das <strong>jüngste Tal</strong>. Schließt eine Kerze darunter: BOS nach unten.</span></div>
<div><b>Im Abwärtstrend</b><span>Beobachte den <strong>jüngsten Gipfel</strong>. Schließt eine Kerze darüber: BOS nach oben.</span></div>
<div><b>Neuer Swing</b><span>Entsteht ein neues Tal, wird es zum beobachteten Level.</span></div>
<div><b>Tieferes Hoch</b><span>Bricht einen Aufwärtstrend nicht. Dort zählt nur das Tal.</span></div>
</div>
<p>TJR: „It's not a candlestick wick, it's a candlestick closure.“</p>
<div class="stat"><b>47 %</b><span>aller Stiche unter das letzte Tief waren in deinen Daten nur eine Lunte ohne Schluss.</span></div>`,
    rule: 'BOS = Bestätigung. Nur der Kerzenschluss zählt.',
    err: ['Das tiefste statt das jüngste Tal beobachten', 'Eine Lunte als BOS zählen', 'Im Aufwärtstrend auf die Hochs schauen']
  },
  {
    id: 'fvg', b: 'C', l: [8], t: 'Fair Value Gap (FVG)',
    sum: 'Drei Kerzen. Bullisch: Docht K1 tiefer als Lunte K3. Bärisch: Lunte K1 höher als Docht K3.',
    body: `<div class="figs three"><figure data-fig="fvgBull" data-cap="Lücke zwischen Docht K1 und Lunte K3."></figure>
<figure data-fig="fvgBear" data-cap="Lücke zwischen Lunte K1 und Docht K3."></figure>
<figure data-fig="fvgNone" data-cap="Docht K1 und Lunte K3 überlappen."></figure></div>
<p>Die Farbe von K1 und K3 ist egal. Nur die starke Mittelkerze K2 zeigt die Richtung.</p>`,
    rule: 'FVG = Fortsetzung. Im Aufwärtstrend läuft der Preis zurück ins bullische FVG und steigt weiter.',
    err: ['Körper statt Docht/Lunte vergleichen', 'Die Farbe von K1 oder K3 bewerten']
  },
  {
    id: 'fvgstatus', b: 'C', l: [8], t: 'FVG gültig, ungültig, gestapelt',
    sum: 'Schluss in der Zone: gültig. Schluss jenseits der Zone: ungültig.',
    body: `<div class="figs"><figure data-fig="fvgValid" data-cap="Die Lunte sticht durch, der Schluss bleibt in der Zone: gültig."></figure>
<figure data-fig="fvgInvalid" data-cap="Die Kerze schließt unter der Zone: ungültig."></figure></div>
<figure data-fig="stacked" data-cap="Gestapelte FVGs ohne Rücklauf: alle gültig. Der Preis kann in jedes zurücklaufen."></figure>
<div class="terms">
<div><b>Gültig bis …</b><span>… es ungültig wird, genutzt wurde oder nicht mehr gebraucht wird.</span></div>
<div><b>Aufräumen</b><span>Neues Hoch ohne Rücklauf ins bullische FVG? Dann wurde es nicht gebraucht. Löschen.</span></div>
<div><b>Falle</b><span>Läuft der Preis in ein bärisches FVG, weil er eigentlich ein Hoch darüber holen will, ist das keine Fortsetzung.</span></div>
<div><b>Einstieg</b><span>Nie blind beim Berühren. Erst eine Reaktion abwarten.</span></div>
</div>
<div class="stat"><b>81 %</b><span>der 5-Minuten-FVGs liefen zurück in die Zone, <strong>60 %</strong> wurden ungültig. Ohne Kontext ist ein FVG ein Münzwurf.</span></div>`,
    rule: 'Dochte und Lunten bilden das FVG. Der Kerzenschluss bricht es.',
    err: ['FVG für ungültig halten, weil eine Lunte durchsticht', 'Alte FVGs tagelang mitschleppen']
  },
  {
    id: 'gaps', b: 'C', l: [9], t: 'Opening Gaps und BPR',
    sum: 'Gaps entstehen in Handelspausen. Eine BPR ist die Überlappung von zwei gegenläufigen FVGs.',
    body: `<div class="figs"><figure data-fig="ndog" data-cap="New Day Opening Gap: Lücke zwischen 17:00-Schluss und 18:00-Eröffnung New York."></figure>
<figure data-fig="bpr" data-cap="Balanced Price Range: Kommt der Preis zurück, läuft er meist zügig durch."></figure></div>
<div class="terms">
<div><b>NDOG</b><span>New Day Opening Gap, täglich zwischen 17 und 18 Uhr New York.</span></div>
<div><b>NWOG</b><span>New Week Opening Gap, zwischen Freitagsschluss und Sonntag 18:00. Meist größer.</span></div>
<div><b>New Candle Gap</b><span>Lücke zwischen zwei Kerzen im laufenden Handel. Laut TJR praktisch nutzlos.</span></div>
</div>
<div class="stat"><b>87 %</b><span>der Tages-Gaps wurden in deinen Daten schon in Asien gefüllt. Für dich als NY-Trader selten relevant.</span></div>`,
    rule: 'Gaps sind Magneten. Offen um 09:30 sind sie ein Kursziel.',
    err: []
  },
  {
    id: 'ifvg', b: 'C', l: [10], t: 'Inverse FVG (IFVG)',
    sum: 'Ein FVG gegen den neuen Trend wird durch einen Schluss gebrochen. Das bestätigt den Wechsel.',
    body: `<figure data-fig="ifvg" data-cap="Abwärtstrend: Eine Kerze schließt über dem bärischen FVG. Daraus wird ein bullisches IFVG."></figure>
<div class="terms">
<div><b>Bullisches IFVG</b><span>Schluss über der Oberkante eines bärischen FVG.</span></div>
<div><b>Bärisches IFVG</b><span>Schluss unter der Unterkante eines bullischen FVG.</span></div>
<div><b>Gestapelt</b><span>Für die Inversion nach oben zählt das oberste bärische FVG, nach unten das unterste bullische.</span></div>
<div><b>Rolle</b><span>Bestätigung, wie der BOS. Nimm die Bestätigung, die zuerst kommt.</span></div>
</div>
<div class="stat"><b>27 %</b><span>IFVG zuerst gegenüber <strong>52 %</strong> BOS zuerst in deinen Daten. Beide sind gleichwertig.</span></div>`,
    rule: 'Ungültiges FVG = IFVG = Bestätigung für die Gegenrichtung.',
    err: ['Ein Docht durch die Zone als Inversion zählen']
  },
  {
    id: 'eq', b: 'C', l: [11], t: 'Equilibrium, Premium, Discount',
    sum: 'EQ = Mitte der aktuellen Bewegung. Longs im Discount, Shorts im Premium.',
    body: `<figure data-fig="eq" data-cap="Vom letzten Tal zum letzten Gipfel, Docht zu Docht. EQ = (Hoch + Tief) ÷ 2."></figure>
<ol class="steps">
<li>Aufwärtstrend: vom letzten Swing-Tief zum letzten Swing-Hoch.</li>
<li>Abwärtstrend: vom letzten Swing-Hoch zum letzten Swing-Tief.</li>
<li>Neues Hoch? EQ neu zeichnen.</li>
<li>In cTrader: Fibonacci-Werkzeug, nur die 0,5-Linie.</li>
</ol>
<p>Ideal ist ein FVG, das im Discount liegt.</p>`,
    rule: 'EQ = Fortsetzung. Nicht beim Berühren kaufen, erst die Reaktion abwarten.',
    err: ['EQ über den ganzen Tag statt über die aktuelle Bewegung zeichnen', 'Im Aufwärtstrend im Premium kaufen']
  },
  {
    id: 'smt', b: 'D', l: [12], t: 'SMT-Divergenz',
    sum: 'Holt nur einer der beiden Indizes ein wichtiges Level, ist das ein Warnsignal.',
    body: `<div class="figs"><figure data-fig="smtNq" data-cap="US TECH 100 holt das London-Hoch: nachlaufender Index."></figure>
<figure data-fig="smtEs" data-cap="US 500 schafft es nicht: bärische SMT. US 500 ist führend, hier wird gehandelt."></figure></div>
<div class="terms">
<div><b>Bärische SMT</b><span>Einer macht ein höheres Hoch, der andere ein tieferes. Bärisch für beide.</span></div>
<div><b>Bullische SMT</b><span>Einer macht ein tieferes Tief, der andere ein höheres. Bullisch für beide.</span></div>
<div><b>Führender Index</b><span>Der, der das Level <strong>nicht</strong> holt. Auf ihm handelst du.</span></div>
<div><b>Nur an Levels</b><span>Kleine Abweichungen gibt es ständig. Zählen tun sie nur an Liquidität.</span></div>
</div>`,
    rule: 'SMT verstärkt eine Richtung. Die Bestätigung kommt trotzdem durch BOS oder IFVG.',
    err: ['Auf dem Index handeln, der das Level geholt hat', 'SMT ohne Level als Signal nehmen']
  },
  {
    id: 'zeiten', b: 'D', l: [13], t: 'Uhrzeiten',
    sum: 'Manipulation 09:30–09:50, Einstieg 09:50–10:10, nach 10:30 kein neuer Trade (NY-Zeit).',
    body: `<div class="timeline" id="timeline"></div>
<p>Die deutschen Zeiten werden für heute live berechnet.</p>
<div class="stat"><b>72 %</b><span>der ersten Morgen-Extreme entstanden in deinen Daten zwischen 09:30 und 09:50.</span></div>`,
    rule: 'Festes Zeitfenster. Kein Setup bis 10:30 NY? Feierabend.',
    err: ['Nachmittags weiterhandeln, weil morgens nichts kam', 'Zeitzone in cTrader falsch eingestellt (UTC−5 im Winter)']
  },
  {
    id: 'bias', b: 'D', l: [14], t: 'Daily Bias',
    sum: 'Vor der Eröffnung entscheidest du: Longs oder Shorts suchen? Ein Filter, keine Vorhersage.',
    body: `<div class="steps4">
<div><span class="k">1 · Trend</span><b>4h und 1h</b><span>Letzter BOS nach oben oder unten?</span></div>
<div><span class="k">2 · Position</span><b>Wo im Trend?</b><span>Läuft der Preis zu Hochs/Tiefs oder zurück in FVG/EQ?</span></div>
<div><span class="k">3 · Ziele</span><b>Liquidität</b><span>Vortag, Asien, London: Was ist offen?</span></div>
<div><span class="k">+ Respekt</span><b>Hält die Zone?</b><span>Bricht die letzte Fortsetzungszone, kippt der Bias.</span></div>
</div>
<p>Trends laufen von extern nach intern und zurück: Hoch → Rücklauf ins FVG/EQ → neues Hoch. Ein Sweep eines alten Tiefs kippt keinen Aufwärtstrend, solange kein Schluss unter dem letzten 1h-Tal kommt.</p>
<div class="stat"><b>53 %</b><span>Übereinstimmung zwischen 1h-Bias und Richtung bis Mittag. Kaum besser als ein Münzwurf.</span></div>`,
    rule: 'Widerlegt der Markt deinen Bias mit Sweep und Bestätigung, folgst du dem Markt.',
    err: ['Bias als Einstiegssignal nutzen', 'Gegen klare Signale am Bias festhalten']
  },
  {
    id: 'strategie', b: 'E', l: [15], t: 'Die komplette Strategie',
    sum: 'Möglichkeit → Bestätigung → Fortsetzung → Ziel.',
    body: `<figure data-fig="chain" data-cap="1 Sweep des London-Tiefs · 2 BOS über dem jüngsten Gipfel · 3 Rücklauf ins FVG mit Reaktion, Einstieg · 4 Ziel am nächsten Level. Stop hinter dem Sweep-Extrem."></figure>
<div class="steps4">
<div><span class="k">1 · Möglichkeit</span><b>Sweep</b><span>Offenes Session- oder Vortageslevel wird geholt.</span></div>
<div><span class="k">2 · Bestätigung</span><b>BOS oder IFVG</b><span>Im 5-Minuten-Chart, was zuerst kommt.</span></div>
<div><span class="k">3 · Fortsetzung</span><b>FVG oder EQ</b><span>Rücklauf, dann eine Kerze in Trade-Richtung.</span></div>
<div><span class="k">4 · Ziel</span><b>Liquidität</b><span>Nächstes offenes Level auf der Gegenseite.</span></div>
</div>
<p><strong>Stop:</strong> hinter das Sweep-Extrem. <strong>Verstärker:</strong> SMT am Sweep-Level. <strong>Vorher:</strong> Bias, Levels, Zeitfenster, Positionsgröße.</p>
<div class="stat"><b>−0,13 R</b><span>pro Trade, als die vier Schritte streng mechanisch auf 6 Monate angewendet wurden (53 Trades). Das Gerüst ist ein Rahmen, kein fertiges System. Phase 2 (Backtest) ist Pflicht.</span></div>`,
    rule: 'Kein Schritt darf fehlen. Sweep allein ist kein Trade.',
    err: ['Ohne Bestätigung einsteigen', 'Stop ans EQ statt hinter das Sweep-Extrem legen']
  },
  {
    id: 'funded', b: 'E', l: [16], t: 'Funded Accounts (FTMO)',
    sum: 'Gewinnziel erreichen, ohne Tages- oder Gesamtlimit zu reißen. Offene Positionen zählen mit.',
    body: `<div class="tbl"><table><thead><tr><th>Regel</th><th>2-Step</th><th>1-Step</th></tr></thead><tbody>
<tr><td>Gewinnziel</td><td>10 %, dann 5 %</td><td>10 %</td></tr>
<tr><td>Tagesverlust</td><td>5 %</td><td>3 %</td></tr>
<tr><td>Max. Verlust</td><td>10 % statisch</td><td>10 % nachlaufend (Tagesende)</td></tr></tbody></table></div>
<p>Der Tagesverlust zählt ab dem Kontostand um Mitternacht, inklusive offener Positionen. Prüfe die aktuellen Regeln vor dem Kauf in deinem FTMO-Konto.</p>
<p>Mit 3 % pro Trade bist du nach zwei Verlusten fast am 5-%-Tageslimit. Mit 1 % hast du fünf Fehlversuche Luft.</p>
<p><a href="#werkzeuge" data-go="werkzeuge">→ Tageslimit-Rechner</a></p>`,
    rule: 'Erst nach positivem Backtest und Demo-Phase eine Challenge kaufen.',
    err: ['Nur realisierte Verluste zählen', 'Mit 3 % Risiko pro Trade in die Challenge']
  },
  {
    id: 'daten', b: 'E', l: [], t: 'Deine Zahlen auf einen Blick',
    sum: 'Was 6 Monate US 500 und US TECH 100 (Apr–Okt 2026) gezeigt haben.',
    body: `<div class="tbl"><table><thead><tr><th>Messung</th><th>Ergebnis</th></tr></thead><tbody>
<tr><td>Sweeps, die zuerst drehten</td><td>61 %</td></tr>
<tr><td>London holt ein Asien-Level</td><td>84 %</td></tr>
<tr><td>NY holt bis 12:00 ein offenes Level</td><td>70 %</td></tr>
<tr><td>Stich unter das letzte Tal nur mit Lunte</td><td>47 %</td></tr>
<tr><td>5m-FVGs mit Rücklauf / ungültig</td><td>81 % / 60 %</td></tr>
<tr><td>Tages-Gap in Asien gefüllt</td><td>87 %</td></tr>
<tr><td>IFVG zuerst / BOS zuerst</td><td>27 % / 52 %</td></tr>
<tr><td>Erstes Morgen-Extrem 09:30–09:50</td><td>72 %</td></tr>
<tr><td>1h-Bias passte zur Richtung bis Mittag</td><td>53 %</td></tr>
<tr><td>Mechanische 4-Schritt-Strategie</td><td>−0,13 R pro Trade (53 Trades)</td></tr></tbody></table></div>`,
    rule: 'Kein Baustein allein ist ein Vorteil. Erst die Kombination plus Erfahrung.',
    err: []
  }
];

/* ---------- Glossar ---------- */
const GLOSSARY = [
  ['Ausbruchstrader', 'Kauft über einem Hoch bzw. verkauft unter einem Tief, sobald es bricht. Liefert Liquidität für die Großen.'],
  ['Außenstab', 'Kerze, deren Docht und Lunte beide Nachbarn überragen. Kann Tal und Gipfel zugleich sein.'],
  ['Bias (Daily Bias)', 'Erwartung vor der Eröffnung: Longs oder Shorts suchen. Filter, keine Vorhersage.'],
  ['BOS', 'Break of Structure. Schluss jenseits des jüngsten Tals (Aufwärtstrend) bzw. Gipfels (Abwärtstrend). Bestätigung.'],
  ['BPR', 'Balanced Price Range. Überlappung eines bullischen und eines bärischen FVG.'],
  ['CRV', 'Chance-Risiko-Verhältnis. Möglicher Gewinn geteilt durch Risiko.'],
  ['Discount', 'Untere Hälfte einer Bewegung unter dem EQ. Günstig, hier Longs.'],
  ['Docht', 'Oberer Schatten einer Kerze bis zum High.'],
  ['Durchbruch', 'Kerzenschluss jenseits eines Levels.'],
  ['EQ (Equilibrium)', '50-%-Linie der aktuellen Bewegung, Docht zu Docht. Fortsetzungszone.'],
  ['EQH / EQL', 'Gleiche Hochs / gleiche Tiefs. Doppelte Liquidität.'],
  ['Extern / intern', 'Extern = Hochs und Tiefs. Intern = Ungleichgewichte wie FVGs.'],
  ['Führender Index', 'Bei einer SMT der Index, der das Level nicht holt. Auf ihm wird gehandelt.'],
  ['FVG', 'Fair Value Gap. Lücke zwischen Docht K1 und Lunte K3 (bullisch) bzw. Lunte K1 und Docht K3 (bärisch). Fortsetzung.'],
  ['Gipfel', 'Swing-Hoch: mittlere von drei Kerzen mit dem höchsten Docht.'],
  ['IFVG', 'Inverse FVG. FVG, durch das eine Kerze gegen den Trend geschlossen hat. Bestätigung.'],
  ['Jüngstes Tal / jüngster Gipfel', 'Der zuletzt entstandene Swing-Punkt. Das Level für den BOS.'],
  ['Leg', 'Linie von einem Swing-Punkt zum nächsten, abwechselnd Tal und Gipfel.'],
  ['Liquidität', 'Ruhende Orders. Über Hochs Kauforders, unter Tiefs Verkaufsorders.'],
  ['Lot', 'Positionsgröße. Lots = Risiko € ÷ Stop-Punkte ÷ Wert pro Punkt je Lot.'],
  ['Low-Resistance-Liquidität', 'Gestapelte Tiefs im Aufwärtstrend (Hochs im Abwärtstrend), die nach einer Wende nacheinander geholt werden.'],
  ['Lunte', 'Unterer Schatten einer Kerze bis zum Low.'],
  ['Makro-Fenster', '09:50–10:10 New York. Bestes Einstiegsfenster.'],
  ['Manipulation', '09:30–09:50 New York. Sweeps der Session-Levels.'],
  ['NDOG / NWOG', 'New Day / New Week Opening Gap. Lücke durch die Handelspause.'],
  ['Overtrading, -leveraging, -risking', 'Zu viele Trades, zu große Position, zu viel Risiko.'],
  ['PDH / PDL', 'Previous Day High / Low. Hoch und Tief des Vortags.'],
  ['Premium', 'Obere Hälfte einer Bewegung über dem EQ. Teuer, hier Shorts.'],
  ['R', 'Einheit für das Risiko eines Trades. 1 R = Verlust, wenn der Stop greift.'],
  ['Session', 'Asien 18:00–03:00, London 03:00–08:30, New York 08:30–17:00 (NY-Zeit).'],
  ['SMT', 'Divergenz zwischen US 500 und US TECH 100 an einem wichtigen Level.'],
  ['Swing', 'Wendepunkt nach der 3-Kerzen-Regel: Tal oder Gipfel.'],
  ['Sweep', 'Docht bzw. Lunte jenseits eines Levels, Schluss zurück. Möglichkeit zur Umkehr.'],
  ['Tal', 'Swing-Tief: mittlere von drei Kerzen mit der tiefsten Lunte.'],
  ['Treppe', 'Trend: höhere Hochs und höhere Tiefs (aufwärts) oder tiefere Hochs und Tiefs (abwärts).']
];
