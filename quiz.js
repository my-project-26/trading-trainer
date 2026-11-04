/* Trading-Lerncenter · Fragenbank, Hilfen und Bild-Drills */

F.smtNq = () => F.smt('nq');
F.smtEs = () => F.smt('es');

/* ---------- Zusätzliche Schaubilder für die Hilfe ---------- */
F.bosDown = () => {
  const sp = TT.mirror(F.bos(), 109);
  sp.lines[0].t = 'jüngster Gipfel'; sp.lines[1].t = 'älterer Gipfel';
  sp.marks = [{ i: 9, at: 'l', t: 'letztes Tal' }];
  sp.pr = 100; sp.alt = 'BOS im Abwärtstrend: erst der Schluss über dem jüngsten Gipfel zählt';
  return sp;
};
F.lowerHigh = () => ({
  c: [...STAIR.slice(5), [115, 115.4, 112.2, 112.6], [112.6, 115.8, 112.3, 115.4], [115.4, 115.6, 113.4, 113.8], [113.8, 114.2, 112.8, 113.6]],
  lines: [{ y: 118, x0: 9, cls: 'aux', t: 'Hoch' }, { y: 112.2, x0: 11, t: 'jüngstes Tal' }],
  marks: [{ i: 12, at: 'h', t: 'tieferes Hoch' }, { i: 11, at: 'l', t: 'höheres Tal' }],
  h: 240, pr: 84, pad: 0.1, alt: 'Ein tieferes Hoch im Aufwärtstrend bricht die Struktur nicht'
});
F.cleanup = () => ({
  c: [...FVG5, [109.8, 112, 109.5, 111.6], [111.6, 113.8, 111.2, 113.4], [113.4, 114, 111.8, 112.2], [112.2, 115.6, 112, 115.2], null],
  zones: [{ x0: 1, lo: 102, hi: 104.5, cls: 'zw', t: 'nie zurückgelaufen: löschen', ta: 'r', tp: 'b' }],
  marks: [{ i: 8, at: 'h', t: 'neues Hoch' }],
  w: 340, pad: 0.12, alt: 'Ein FVG, das nicht gebraucht wurde, wird gelöscht'
});
F.ifvgStack = () => {
  const sp = TT.mirror(F.stacked(), 108);
  sp.zones.forEach(z => { z.cls = 'zs'; });
  sp.zones[0].t = 'oberstes: zählt'; sp.zones[1].t = 'FVG 2'; sp.zones[2].t = 'FVG 3';
  sp.alt = 'Gestapelte bärische FVGs: für die Inversion nach oben zählt das oberste';
  return sp;
};

/* ---------- Fragenbank ----------
   l = Lektion, a = Index der richtigen Antwort, fig = optionale Abbildung */
const BANK = [
  // L1
  { id: 'l1a', l: 1, q: 'Warum setzt du dir kein festes Tagesziel in Euro?', o: ['Der Druck führt zu Trades ohne Setup', 'Weil Tagesziele steuerlich ungünstig sind', 'Weil der Markt Tagesziele erkennt'], a: 0, e: 'Druck → Overtrading. Ziel ist, die Regeln auszuführen.' },
  { id: 'l1b', l: 1, q: 'Wann kaufst du deine erste Challenge?', o: ['Nach positivem Backtest und Demo-Phase', 'Sofort nach Lektion 16', 'Nach dem ersten Gewinntrade'], a: 0, e: 'Phase 2 und 3 kommen vor Phase 4.' },
  { id: 'l1c', l: 1, q: 'Was ist Phase 2 deines Plans?', o: ['100 Setups von Hand backtesten, mit Journal', 'Demo-Konto live', 'FTMO-Challenge'], a: 0, e: 'Wissen → Backtest → Demo → Challenge.' },
  // L2
  { id: 'l2a', l: 2, q: 'Welche Trefferquote brauchst du mindestens bei einem CRV von 1 : 2?', o: ['Etwa 33 %', '50 %', '66 %'], a: 0, e: '1 ÷ (1 + 2) = 33 %.' },
  { id: 'l2b', l: 2, q: '40 % Treffer, CRV 1 : 2. Erwartung pro Trade?', o: ['+0,2 R', '−0,2 R', '+0,8 R'], a: 0, e: '0,4 × 2 − 0,6 = +0,2 R.' },
  { id: 'l2c', l: 2, q: 'Was bedeutet 1 R?', o: ['Der Betrag, den du verlierst, wenn der Stop greift', 'Ein Prozent des Kontos', 'Ein Punkt im Chart'], a: 0, e: 'R ist die Einheit für dein Risiko pro Trade.' },
  { id: 'l2d', l: 2, q: 'Du hast 3 Verluste in Folge. Was sagt das über die Strategie?', o: ['Fast nichts, erst viele Trades zeigen die Erwartung', 'Sie funktioniert nicht mehr', 'Der nächste Trade gewinnt sicher'], a: 0, e: 'Einzelne Trades sind Zufall.' },
  // L3
  { id: 'l3a', l: 3, q: 'Was ist die Lunte?', o: ['Der untere Schatten bis zum Low', 'Der obere Schatten bis zum High', 'Der Körper'], a: 0, e: 'Oben Docht, unten Lunte.' },
  { id: 'l3b', l: 3, q: 'Welcher Buchstabe zeigt auf die Lunte?', o: ['A', 'B', 'C'], a: 1, e: 'Die Lunte ist der untere Schatten.', fig: () => F.anatomy([{ i: 1, at: 110.5, t: 'A', dx: -34 }, { i: 1, at: 102, t: 'B', dx: -34 }, { i: 1, at: 106.5, t: 'C', dx: -44 }]) },
  { id: 'l3c', l: 3, q: 'Swing-Tief (Tal): Welche Kerze ist es?', o: ['Die mittlere von drei Kerzen mit der tiefsten Lunte', 'Die linke von drei Kerzen mit der tiefsten Lunte', 'Jede rote Kerze'], a: 0, e: 'Immer die mittlere. Links und rechts liegen die Lunten höher.' },
  { id: 'l3d', l: 3, q: 'Swing-Hoch (Gipfel): Welche Kerze ist es?', o: ['Die mittlere von drei Kerzen mit dem höchsten Docht', 'Die rechte von drei Kerzen mit dem höchsten Docht', 'Jede grüne Kerze'], a: 0, e: 'Links und rechts liegen die Dochte tiefer.' },
  { id: 'l3e', l: 3, q: 'Wo startet und endet ein Leg?', o: ['An Lunte bzw. Docht der mittleren Kerze eines Swings', 'An der ersten und dritten Kerze', 'Am Körper der Kerzen'], a: 0, e: 'Die Nachbarkerzen dienen nur der Prüfung.' },
  { id: 'l3f', l: 3, q: 'Zwei Gipfel hintereinander, kein Tal dazwischen. Wo endet das Leg?', o: ['Am höheren der beiden', 'Am ersten', 'Am zweiten'], a: 0, e: 'Ein Leg endet am extremsten Punkt.' },
  { id: 'l3g', l: 3, q: 'Woran erkennst du einen Aufwärtstrend?', o: ['Jedes Hoch und jedes Tief liegt höher als das vorige', 'Mehrere grüne Kerzen', 'Kurs über dem Vortag'], a: 0, e: 'Die Treppe: höhere Hochs UND höhere Tiefs.' },
  { id: 'l3h', l: 3, q: 'Die Hochs steigen, die Tiefs fallen. Was ist das?', o: ['Kein Trend, der Markt schwankt', 'Aufwärtstrend', 'Abwärtstrend'], a: 0, e: 'Beides muss steigen bzw. fallen.' },
  { id: 'l3i', l: 3, q: 'Welche Zeitrahmen nutzt TJR für das große Bild?', o: ['4 Stunden und 1 Stunde', '1 und 5 Minuten', 'Woche und Monat'], a: 0, e: '4h/1h für den Bias, 5m zum Handeln.' },
  // L4
  { id: 'l4a', l: 4, q: 'Konto 25.000 €, 1 % Risiko, Stop 10 Punkte, 1 € je Punkt und Lot. Wie viele Lots?', o: ['25', '2,5', '250'], a: 0, e: '250 € ÷ 10 ÷ 1 = 25.' },
  { id: 'l4b', l: 4, q: 'Was ist Overleveraging?', o: ['Zu große Position für das Konto', 'Zu viele Trades', 'Zu großer Stop'], a: 0, e: 'Overtrading = zu viele Trades, Overrisking = zu viel Risiko pro Trade.' },
  { id: 'l4c', l: 4, q: 'Wann halbierst du die Positionsgröße?', o: ['An News-Tagen und bei ungewöhnlich großem Stop', 'Nach einem Gewinn', 'Freitags'], a: 0, e: 'So macht es TJR.' },
  { id: 'l4d', l: 4, q: 'Wie viel riskierst du pro Trade, solange du testest?', o: ['Höchstens 1 %', '3 %', '5 %'], a: 0, e: 'Mit 1 % überlebt das Konto lange Verlustserien.' },
  { id: 'l4e', l: 4, q: 'Was legst du zuerst fest?', o: ['Den Stop, dann die Größe', 'Die Größe, dann den Stop', 'Das Ziel, dann die Größe'], a: 0, e: 'Die Größe folgt aus dem Stop.' },
  // L5
  { id: 'l5a', l: 5, q: 'Was liegt über einem Hoch?', o: ['Kauforders (Short-Stops und Ausbruchskäufer)', 'Verkaufsorders', 'Nichts'], a: 0, e: 'Ein Short-Stop ist ein Kauf.' },
  { id: 'l5b', l: 5, q: 'Was liegt unter einem Tief?', o: ['Verkaufsorders (Long-Stops und Ausbruchsverkäufer)', 'Kauforders', 'Nichts'], a: 0, e: 'Ein Long-Stop ist ein Verkauf.' },
  { id: 'l5c', l: 5, q: 'Docht über das Hoch, die Kerze schließt unter dem Hoch. Was ist das?', o: ['Sweep', 'Durchbruch', 'BOS'], a: 0, e: 'Kurz drüber, Schluss zurück.' },
  { id: 'l5d', l: 5, q: 'Docht über das Hoch, die Kerze schließt ebenfalls über dem Hoch. Was ist das?', o: ['Durchbruch', 'Sweep', 'Equal High'], a: 0, e: 'Schluss jenseits des Levels.' },
  { id: 'l5e', l: 5, q: 'Was folgt aus einem Sweep?', o: ['Die Möglichkeit einer Umkehr, die noch bestätigt werden muss', 'Ein sicherer Einstieg', 'Dass der Trend weiterläuft'], a: 0, e: '61 % der Sweeps drehten in deinen Daten.' },
  { id: 'l5f', l: 5, q: 'Warum ist ein Short-Stop eine Kauforder?', o: ['Eine Short-Position schließt man durch Kaufen', 'Der Broker will es so', 'Ist er nicht'], a: 0, e: 'Short = erst verkaufen, später zurückkaufen.' },
  // L6
  { id: 'l6a', l: 6, q: 'Was sind Equal Highs (EQH)?', o: ['Zwei oder mehr Hochs auf fast gleichem Preis', 'Das Hoch von Asien und London', 'Hoch und Tief derselben Kerze'], a: 0, e: 'Doppelte Liquidität an einer Stelle.' },
  { id: 'l6b', l: 6, q: 'Wann läuft London (New Yorker Zeit)?', o: ['03:00–08:30', '18:00–03:00', '08:30–17:00'], a: 0, e: 'In Deutschland meist 09:00–14:30.' },
  { id: 'l6c', l: 6, q: 'London hat das Asien-Hoch schon überschritten. Was gilt um 09:30?', o: ['Verbraucht, nicht mehr markieren', 'Wichtigstes Level des Tages', 'Zählt doppelt'], a: 0, e: 'Geholte Liquidität ist weg.' },
  { id: 'l6d', l: 6, q: 'Welches Level ist in diesem Chart schon verbraucht?', o: ['Asien-Hoch', 'London-Hoch', 'Asien-Tief'], a: 0, e: 'London lief schon über das Asien-Hoch.', fig: () => F.sessions() },
  { id: 'l6e', l: 6, q: 'Was ist Low-Resistance-Liquidität?', o: ['Gestapelte Tiefs im Aufwärtstrend (Hochs im Abwärtstrend)', 'Ein einzelnes Wochenhoch', 'Liquidität in der Nacht'], a: 0, e: 'Nach der Wende werden sie nacheinander geholt.' },
  { id: 'l6f', l: 6, q: 'CPI kommt um 08:30 New York. Wie spät ist es in Deutschland (normaler Abstand)?', o: ['14:30', '13:30', '15:30'], a: 0, e: '6 Stunden Abstand, in Umstellungswochen 5.' },
  { id: 'l6g', l: 6, q: 'Was bedeutet PDH?', o: ['Previous Day High, Hoch des Vortags', 'Premium Discount High', 'Pre-Day Hour'], a: 0, e: 'PDH/PDL = Hoch und Tief des Vortags.' },
  // L7
  { id: 'l7a', l: 7, q: 'Aufwärtstrend: Welches Level beobachtest du für den BOS?', o: ['Das jüngste Tal', 'Das tiefste Tief', 'Den jüngsten Gipfel'], a: 0, e: 'Jüngstes = letztes Tal der Treppe.' },
  { id: 'l7b', l: 7, q: 'Abwärtstrend: Welches Level beobachtest du für den BOS?', o: ['Den jüngsten Gipfel', 'Das tiefste Tief', 'Das Tageshoch'], a: 0, e: 'Spiegelverkehrt: Im Abwärtstrend schaust du nach oben.' },
  { id: 'l7c', l: 7, q: 'Aufwärtstrend. Eine Lunte sticht unter das jüngste Tal, der Schluss bleibt darüber. Was ist das?', o: ['Kein BOS, evtl. ein Sweep', 'BOS nach unten', 'Trendwechsel'], a: 0, e: 'Nur der Kerzenschluss zählt.' },
  { id: 'l7d', l: 7, q: 'Abwärtstrend. Eine Kerze schließt über dem jüngsten Gipfel. Was ist das?', o: ['BOS nach oben', 'Sweep', 'Nichts'], a: 0, e: 'Schluss über dem letzten Gipfel im Abwärtstrend.' },
  { id: 'l7e', l: 7, q: 'Aufwärtstrend. Es bildet sich ein tieferes Hoch. Ist die Struktur gebrochen?', o: ['Nein, im Aufwärtstrend zählt nur der Schluss unter dem Tal', 'Ja', 'Nur bei roter Kerze'], a: 0, e: 'Oben passiert nichts Entscheidendes.' },
  { id: 'l7f', l: 7, q: 'Welche Rolle hat der BOS in der Strategie?', o: ['Bestätigung', 'Möglichkeit', 'Fortsetzung'], a: 0, e: 'Sweep = Möglichkeit, BOS = Bestätigung, FVG/EQ = Fortsetzung.' },
  { id: 'l7g', l: 7, q: 'Warum steigst du nicht direkt beim BOS ein?', o: ['Er kann nur ein Rücklauf im größeren Trend sein', 'Der Spread ist zu hoch', 'TJR nutzt nur Limit-Orders'], a: 0, e: 'Erst die Fortsetzung zeigt, dass der neue Trend hält.' },
  // L8
  { id: 'l8a', l: 8, q: 'Bullisches FVG: Zwischen welchen Punkten liegt die Lücke?', o: ['Docht K1 und Lunte K3', 'Lunte K1 und Docht K3', 'Open und Close von K2'], a: 0, e: 'Docht K1 liegt tiefer als Lunte K3.' },
  { id: 'l8b', l: 8, q: 'Bärisches FVG: Zwischen welchen Punkten liegt die Lücke?', o: ['Lunte K1 und Docht K3', 'Docht K1 und Lunte K3', 'Close K1 und Open K3'], a: 0, e: 'Lunte K1 liegt höher als Docht K3.' },
  { id: 'l8c', l: 8, q: 'K1 ist rot, K2 steigt stark, Docht K1 liegt tiefer als Lunte K3. Was ist es?', o: ['Bullisches FVG', 'Kein FVG, weil K1 rot ist', 'Bärisches FVG'], a: 0, e: 'Die Farbe von K1 und K3 spielt keine Rolle.' },
  { id: 'l8d', l: 8, q: 'Bullisches FVG. Eine Kerze schließt IN der Zone. Status?', o: ['Gültig', 'Ungültig', 'Invertiert'], a: 0, e: 'Reinlaufen ist der normale Rücklauf.' },
  { id: 'l8e', l: 8, q: 'Bullisches FVG. Eine Kerze schließt UNTER der Zone. Status?', o: ['Ungültig', 'Gültig', 'Respektiert'], a: 0, e: 'Schluss jenseits der Unterkante.' },
  { id: 'l8f', l: 8, q: 'Bullisches FVG. Eine Lunte sticht unter die Zone, Schluss in der Zone. Status?', o: ['Gültig', 'Ungültig', 'Gebrochen'], a: 0, e: 'Lunten bilden das FVG, der Schluss bricht es.' },
  { id: 'l8g', l: 8, q: 'Welche Rolle hat das FVG in der Strategie?', o: ['Fortsetzung', 'Möglichkeit', 'Bestätigung'], a: 0, e: 'Sweep → BOS → Rücklauf ins FVG → Ziel.' },
  { id: 'l8h', l: 8, q: 'Neues Hoch, ohne ins bullische FVG zurückzulaufen. Was tust du?', o: ['FVG löschen, es wurde nicht gebraucht', 'Eine Woche aufheben', 'Als ungültig markieren'], a: 0, e: 'Alte FVGs nicht in die Zukunft ziehen.' },
  { id: 'l8i', l: 8, q: 'Drei bullische FVGs gestapelt, ohne Rücklauf. Welche sind gültig?', o: ['Alle', 'Nur das oberste', 'Nur das unterste'], a: 0, e: 'Der Preis kann in jedes zurücklaufen.' },
  // L9
  { id: 'l9a', l: 9, q: 'Was ist ein New Day Opening Gap?', o: ['Lücke zwischen 17:00-Schluss und 18:00-Eröffnung (NY)', 'Lücke zwischen Asien und London', 'Das erste FVG nach 09:30'], a: 0, e: 'Die tägliche Handelspause erzeugt die Lücke.' },
  { id: 'l9b', l: 9, q: 'Wann wird das Tages-Gap meistens gefüllt?', o: ['In der Asien-Session', 'Nach 09:30', 'Gar nicht'], a: 0, e: '87 % in deinen Daten.' },
  { id: 'l9c', l: 9, q: 'Wie entsteht eine Balanced Price Range?', o: ['Schnell hoch und schnell wieder runter durch denselben Bereich', 'Seitwärtsphase über Stunden', 'Gap übers Wochenende'], a: 0, e: 'Überlappung von bullischem und bärischem FVG.' },
  // L10
  { id: 'l10a', l: 10, q: 'Was ist ein Inverse FVG?', o: ['Ein FVG, durch das eine Kerze gegen den Trend geschlossen hat', 'Ein sehr kleines FVG', 'Ein FVG, das nie gefüllt wird'], a: 0, e: 'Die Fortsetzungszone hat nicht gehalten.' },
  { id: 'l10b', l: 10, q: 'Abwärtstrend, bärisches FVG. Ein Docht sticht über die Zone, Schluss in der Zone. IFVG?', o: ['Nein', 'Ja'], a: 0, e: 'Nur der Schluss über der Oberkante zählt.' },
  { id: 'l10c', l: 10, q: 'Welche Rolle hat das IFVG?', o: ['Bestätigung', 'Möglichkeit', 'Fortsetzung'], a: 0, e: 'Wie der BOS.' },
  { id: 'l10d', l: 10, q: 'Drei bärische FVGs gestapelt. Welches zählt für die Inversion nach oben?', o: ['Das oberste', 'Das unterste', 'Das mittlere'], a: 0, e: 'Die letzte Zone, die den Abwärtstrend trägt.' },
  { id: 'l10e', l: 10, q: 'Aufwärtstrend, bullisches FVG. Eine Kerze schließt unter der Zone. Was entsteht?', o: ['Bärisches IFVG', 'Bullisches IFVG', 'Sweep'], a: 0, e: 'Hinweis auf einen Wechsel nach unten.' },
  // L11
  { id: 'l11a', l: 11, q: 'Tief 7.600, Hoch 7.640. Wo liegt das EQ?', o: ['7.620', '7.610', '7.630'], a: 0, e: '(7.600 + 7.640) ÷ 2.' },
  { id: 'l11b', l: 11, q: 'Wo suchst du im Aufwärtstrend Longs?', o: ['Im Discount', 'Im Premium', 'Am Hoch'], a: 0, e: 'Günstig kaufen: unter dem EQ.' },
  { id: 'l11c', l: 11, q: 'Welcher Buchstabe markiert den Discount?', o: ['A', 'B'], a: 1, e: 'Discount = untere Hälfte unter dem EQ.', fig: () => F.eq([{ i: 3, at: 115, t: 'A', dx: -30 }, { i: 3, at: 103.5, t: 'B', dx: -30 }]) },
  { id: 'l11d', l: 11, q: 'Wie zeichnest du das EQ im Abwärtstrend?', o: ['Vom letzten Swing-Hoch zum letzten Swing-Tief', 'Vom Tagestief zum Tageshoch', 'Vom Open zum Close'], a: 0, e: 'Immer die aktuelle Bewegung, Docht zu Docht.' },
  { id: 'l11e', l: 11, q: 'Rolle des EQ in der Strategie?', o: ['Fortsetzung', 'Möglichkeit', 'Bestätigung'], a: 0, e: 'Wie das FVG.' },
  // L12
  { id: 'l12a', l: 12, q: 'US TECH 100 holt das London-Hoch, US 500 nicht. Was ist das?', o: ['Bärische SMT', 'Bullische SMT', 'Keine SMT'], a: 0, e: 'Höheres gegen tieferes Hoch.' },
  { id: 'l12b', l: 12, q: 'Auf welchem Index handelst du diese bärische SMT?', o: ['US 500', 'US TECH 100', 'Auf beiden gleich'], a: 0, e: 'Auf dem führenden, der das Hoch nicht geschafft hat.' },
  { id: 'l12c', l: 12, q: 'Wann ist eine SMT bedeutungsvoll?', o: ['Wenn sie an einem wichtigen Level entsteht', 'Immer', 'Nur nachts'], a: 0, e: 'Abweichungen gibt es ständig.' },
  { id: 'l12d', l: 12, q: 'Ersetzt die SMT den BOS?', o: ['Nein, sie verstärkt nur die Richtung', 'Ja'], a: 0, e: 'Bestätigung trotzdem durch BOS oder IFVG.' },
  // L13
  { id: 'l13a', l: 13, q: 'Wann ist das Manipulationsfenster (NY)?', o: ['09:30–09:50', '08:30–09:30', '09:50–10:10'], a: 0, e: 'Direkt nach der Eröffnung werden Levels gesweept.' },
  { id: 'l13b', l: 13, q: 'Wann ist das Makro-Fenster für den Einstieg (NY)?', o: ['09:50–10:10', '09:30–09:50', '13:00–14:00'], a: 0, e: 'Nach der Manipulation.' },
  { id: 'l13c', l: 13, q: 'Kein Trade bis 10:30 NY. Was tust du?', o: ['Aufhören für heute', 'Die PM-Session handeln', 'Größe erhöhen'], a: 0, e: 'Danach wird der Markt ruhiger.' },
  { id: 'l13d', l: 13, q: 'NY-Eröffnung 09:30. Wie spät in Deutschland bei 6 Stunden Abstand?', o: ['15:30', '14:30', '16:30'], a: 0, e: 'In Umstellungswochen 14:30.' },
  // L14
  { id: 'l14a', l: 14, q: 'Was ist der Daily Bias?', o: ['Deine Erwartung, ob du heute Longs oder Shorts suchst', 'Eine sichere Vorhersage', 'Der Durchschnittskurs des Vortags'], a: 0, e: 'Ein Filter, keine Vorhersage.' },
  { id: 'l14b', l: 14, q: 'Wann kippt dein Bias?', o: ['Wenn die letzte Fortsetzungszone durch einen Schluss bricht', 'Bei jeder roten Kerze', 'Um 10:30'], a: 0, e: 'Disrespekt der Zone ist der Hinweis.' },
  { id: 'l14c', l: 14, q: 'Bias bullisch, aber um 09:40 Sweep des London-Hochs, 5m-BOS nach unten, bärische SMT. Was tust du?', o: ['Dem Markt folgen und das Short-Setup prüfen', 'Ignorieren, der Bias ist bullisch', 'Long gehen'], a: 0, e: 'Genau TJRs Beispiel aus dem Strategie-Video.' },
  { id: 'l14d', l: 14, q: '1h-Aufwärtstrend. Vor 09:30 wird ein altes Tief gesweept, ohne Schluss unter dem letzten 1h-Tal. Bias?', o: ['Bullisch', 'Bärisch', 'Kein Bias'], a: 0, e: 'Struktur intakt, der Sweep war Manipulation.' },
  // L15
  { id: 'l15a', l: 15, q: 'Bring die Strategie in die richtige Reihenfolge.', o: ['Sweep → BOS/IFVG → Rücklauf ins FVG/EQ → Ziel', 'BOS → Sweep → FVG → Ziel', 'FVG → Sweep → BOS → Ziel'], a: 0, e: 'Möglichkeit → Bestätigung → Fortsetzung → Ziel.' },
  { id: 'l15b', l: 15, q: 'Welche Nummer im Chart ist die Bestätigung?', o: ['1', '2', '3', '4'], a: 1, e: 'Der Schluss über dem jüngsten Gipfel ist der BOS.', fig: () => F.chain() },
  { id: 'l15c', l: 15, q: 'Wo liegt der Stop?', o: ['Hinter dem Sweep-Extrem', 'Am Equilibrium', 'Fest 5 Punkte'], a: 0, e: 'Wird das Extrem überschritten, war die Idee falsch.' },
  { id: 'l15d', l: 15, q: 'Warum steigst du nicht ein, sobald der Preis das FVG berührt?', o: ['Erst die Reaktion zeigt, dass die Zone hält', 'Weil FVGs nie halten', 'Weil man nur am EQ einsteigt'], a: 0, e: '5er-Kerze schließen lassen oder 1er BOS/IFVG.' },
  { id: 'l15e', l: 15, q: 'Was zeigt der mechanische Test in deinen Daten?', o: ['Das Gerüst allein ist kein fertiges System', 'Die Strategie ist ein sicherer Gewinner', 'Sie funktioniert nur auf US 500'], a: 0, e: '−0,13 R pro Trade. Eigenes Backtesting ist nötig.' },
  // L16
  { id: 'l16a', l: 16, q: 'FTMO 2-Step, 100.000 €. Maximaler Tagesverlust?', o: ['5.000 €', '3.000 €', '10.000 €'], a: 0, e: '5 % Tageslimit.' },
  { id: 'l16b', l: 16, q: 'Heute realisiert −3.500 €, offen −1.800 €, Limit 5.000 €. Was gilt?', o: ['Limit gerissen, offene Positionen zählen mit', 'Alles ok, nur Realisiertes zählt', 'Nur am Tagesende relevant'], a: 0, e: '−5.300 € Equity.' },
  { id: 'l16c', l: 16, q: 'Was heißt „nachlaufender“ Maximalverlust?', o: ['Die Grenze steigt mit deinem Höchststand mit', 'Die Grenze sinkt mit jedem Verlust', 'Es gibt keine Grenze'], a: 0, e: 'Beim 1-Step mit dem höchsten Tagesschluss.' }
];

/* ---------- Hilfe bei falscher Antwort ----------
   f = Schaubilder (Name aus F oder 'TIMELINE'), x = ausführliche Erklärung, t = Thema im Nachschlagen */
const HELP = {
  l1a: { t: 'ziele', x: 'Ein Geldziel pro Tag verleitet dazu, Trades zu nehmen, obwohl kein Setup da ist, nur um das Ziel zu erreichen. Dein Ziel ist der Prozess: Regeln sauber ausführen, ins Journal schreiben, Ergebnisse über viele Trades vergleichen.' },
  l1b: { t: 'ziele', x: 'Reihenfolge: 1 Wissen → 2 Backtest mit 100 Setups → 3 Demo live 1–2 Monate → 4 Challenge. Erst wenn Backtest und Demo eine positive Erwartung zeigen, lohnt sich die Gebühr.' },
  l1c: { t: 'ziele', x: 'Phase 2 heißt: Du gehst 100 Setups in deinen Daten von Hand durch, nach festen Regeln, und schreibst jedes ins Journal. Erst so weißt du, ob die Strategie bei dir einen Vorteil hat.' },
  l2a: { f: ['crv'], t: 'crv', x: 'Bei CRV 1 : 2 gewinnst du pro Treffer 2 R und verlierst pro Fehlversuch 1 R. Break-even = 1 ÷ (1 + 2) = 33 %. Beispiel: 34 von 100 Treffern → 68 R Gewinn, 66 R Verlust → knapp im Plus.' },
  l2b: { f: ['crv'], t: 'crv', x: 'Erwartung = Trefferquote × CRV − Verlustquote. 0,4 × 2 = 0,8 R aus Gewinnern, minus 0,6 × 1 R aus Verlierern = +0,2 R pro Trade. Nach 100 Trades sind das +20 R.' },
  l2c: { f: ['crv'], t: 'crv', x: '1 R ist der Abstand Einstieg → Stop in Euro. Im Bild: Das rote Feld ist 1 R. Das Ziel liegt 2 R entfernt. So kannst du Trades mit verschiedenen Stops vergleichen.' },
  l2d: { t: 'crv', x: 'Auch mit 50 % Trefferquote sind 5–7 Verluste in Folge über 100 Trades normal. Wenige Trades sagen nichts. Erst eine große Stichprobe zeigt, ob die Erwartung positiv ist.' },
  l3a: { f: ['anatomy'], t: 'kerze', x: 'Oben = Docht (bis zum High), unten = Lunte (bis zum Low). Der Körper liegt zwischen Open und Close.' },
  l3b: { f: ['anatomy'], t: 'kerze', x: 'Die Lunte ist der dünne Strich UNTER dem Körper. A ist der Docht oben, C der Körper.' },
  l3c: { f: ['swing3'], t: 'swing', x: 'Nimm immer drei Kerzen und schau auf die MITTLERE. Ist ihre Lunte tiefer als die Lunte links UND rechts, ist sie ein Tal. Die Nachbarn sind nur der Vergleich. Die Farbe spielt keine Rolle.' },
  l3d: { f: ['swing3'], t: 'swing', x: 'Mittlere Kerze, deren Docht höher ist als der Docht links UND rechts. Im Bild: Die gestrichelte Linie am höchsten Docht wird von keinem Nachbarn erreicht.' },
  l3e: { f: ['legs'], t: 'legs', x: 'Die Punkte im Bild sitzen genau an der Lunte des Tals bzw. am Docht des Gipfels, also immer an der mittleren Kerze. Die erste und dritte Kerze des Dreierpacks sind nur Prüfkerzen.' },
  l3f: { f: ['legs'], t: 'legs', x: 'Ein Leg läuft immer bis zum extremsten Punkt der Bewegung. Gibt es zwei Gipfel ohne Tal dazwischen, ist der höhere das Ende des Legs. Der niedrigere war nur eine Pause.' },
  l3g: { f: ['stairUp'], t: 'trend', x: 'Prüfe zwei Dinge: Liegt jedes Hoch höher als das vorige? Und liegt jedes Tief höher als das vorige? Nur wenn beides stimmt, ist es eine Treppe nach oben. Kerzenfarben sagen nichts.' },
  l3h: { f: ['stairUp', 'stairDown'], t: 'trend', x: 'Aufwärts braucht höhere Hochs UND höhere Tiefs, abwärts tiefere Hochs UND tiefere Tiefs. Steigen die Hochs, während die Tiefs fallen, wird die Bewegung nur breiter. Das ist kein Trend.' },
  l3i: { f: ['timeframe'], t: 'zeitrahmen', x: 'Großes Bild auf 4h und 1h (Trend, Ziele, Bias), Handeln auf 5m (Sweep, BOS, FVG). Eine 1h-Kerze enthält zwölf 5m-Kerzen.' },
  l4a: { t: 'risiko', x: 'Schritt 1: Risiko in € = 25.000 × 1 % = 250 €. Schritt 2: durch den Stop teilen: 250 € ÷ 10 Punkte = 25 € pro Punkt. Schritt 3: durch den Wert pro Punkt je Lot: 25 ÷ 1 € = 25 Lots.' },
  l4b: { t: 'risiko', x: 'Overtrading = zu viele Trades. Overleveraging = Position zu groß für das Konto. Overrisking = zu viel Risiko pro Trade. Alle drei kommen meist vom Wunsch, schnell reich zu werden.' },
  l4c: { t: 'risiko', x: 'An News-Tagen (CPI, PPI, Zinsentscheid) springt der Preis stärker. Bei einem großen Stop wäre die Position sonst trotzdem zu riskant. In beiden Fällen halbierst du.' },
  l4d: { t: 'risiko', x: 'Mit 1 % pro Trade verlierst du nach 10 Verlusten in Folge etwa 10 %. Mit 3 % wären es fast 30 %, bei FTMO bist du dann längst raus.' },
  l4e: { f: ['crv'], t: 'risiko', x: 'Der Stop gehört dorthin, wo deine Idee falsch wäre (hinter das Sweep-Extrem). Erst danach rechnest du die Größe so, dass genau dein Risiko verloren geht, wenn der Stop greift.' },
  l5a: { f: ['liquidity'], t: 'liquiditaet', x: 'Über einem Hoch liegen die Stops der Short-Trader (ein Short wird durch Kaufen geschlossen) und die Kauforders der Ausbruchstrader. Beides sind Käufe.' },
  l5b: { f: ['liquidity'], t: 'liquiditaet', x: 'Unter einem Tief liegen die Stops der Long-Trader (ein Long wird durch Verkaufen geschlossen) und die Verkaufsorders der Ausbruchstrader. Beides sind Verkäufe.' },
  l5c: { f: ['sweep', 'breakout'], t: 'sweep', x: 'Schau nur auf den Schluss der Kerze. Liegt er wieder unter dem Hoch, wurden die Orders nur kurz geholt: Sweep. Liegt er darüber: Durchbruch.' },
  l5d: { f: ['sweep', 'breakout'], t: 'sweep', x: 'Der Docht über dem Hoch ist bei beiden gleich. Den Unterschied macht der Schluss: Schluss darüber = Durchbruch.' },
  l5e: { f: ['sweep'], t: 'sweep', x: 'Ein Sweep zeigt nur, dass Orders geholt wurden. Ob der Preis wirklich dreht, bestätigt erst ein BOS oder IFVG. In deinen Daten liefen fast 4 von 10 Sweeps trotzdem weiter.' },
  l5f: { f: ['liquidity'], t: 'liquiditaet', x: 'Short heißt: erst verkaufen, später zurückkaufen. Greift der Stop, wird automatisch zurückgekauft. Deshalb liegen über Hochs Kauforders.' },
  l6a: { f: ['eqh'], t: 'eqh', x: 'Zwei Hochs auf (fast) gleicher Höhe: Über beiden liegen Stops und Ausbruchsorders an derselben Stelle. Ein einziger Sweep holt die doppelte Liquidität.' },
  l6b: { f: ['TIMELINE'], t: 'sessions', x: 'Asien 18:00–03:00, London 03:00–08:30, New York 08:30–17:00 (NY-Zeit). In Deutschland +6 Stunden, in den Umstellungswochen +5.' },
  l6c: { f: ['sessions'], t: 'sessions', x: 'Im Bild läuft London über das Asien-Hoch (gepunktete Linie). Die Orders dort sind gefüllt. Um 09:30 markierst du nur noch Levels, die keiner geholt hat.' },
  l6d: { f: ['sessions'], t: 'sessions', x: 'Die gepunktete Linie endet dort, wo London darüber gelaufen ist. Offen bleiben London-Hoch, London-Tief und Asien-Tief.' },
  l6e: { f: ['lowres'], t: 'eqh', x: 'Im Aufwärtstrend entstehen viele Tiefs übereinander. Dreht der Trend, liegen dort gestapelte Stops. Der Preis holt sie wie Kekse aus der Dose, einen nach dem anderen.' },
  l6f: { f: ['TIMELINE'], t: 'zeiten', x: '08:30 New York + 6 Stunden = 14:30 in Deutschland. In den Wochen der Zeitumstellung sind es nur 5 Stunden.' },
  l6g: { t: 'eqh', x: 'PDH = Previous Day High, PDL = Previous Day Low: Hoch und Tief des gesamten Vortags (alle drei Sessions). Jeder sieht sie auf dem Tageschart, deshalb liegen dort viele Orders.' },
  l7a: { f: ['bos'], t: 'bos', x: 'Im Bild gibt es zwei Täler. Beobachtet wird das JÜNGSTE, also das zuletzt entstandene (lila), nicht das ältere, tiefere. Erst ein Schluss darunter (2) ist der BOS.' },
  l7b: { f: ['bosDown'], t: 'bos', x: 'Im Abwärtstrend ist alles gespiegelt: Du beobachtest den jüngsten Gipfel. Erst ein Schluss darüber bricht die Struktur nach oben.' },
  l7c: { f: ['bos'], t: 'bos', x: 'Kerze 1 im Bild: Die Lunte sticht unter das jüngste Tal, aber der Schluss bleibt darüber. Kein BOS. Erst Kerze 2 schließt darunter.' },
  l7d: { f: ['bosDown'], t: 'bos', x: 'Abwärtstrend + Schluss über dem jüngsten Gipfel = BOS nach oben. Ein Docht allein würde nicht reichen.' },
  l7e: { f: ['lowerHigh'], t: 'bos', x: 'Im Aufwärtstrend zählt nur die Unterseite. Ein tieferes Hoch ist ein Warnzeichen, aber gebrochen ist erst, wenn eine Kerze unter dem jüngsten Tal schließt.' },
  l7f: { f: ['chain'], t: 'strategie', x: 'Die Kette: 1 Sweep = Möglichkeit, 2 BOS = Bestätigung, 3 Rücklauf ins FVG/EQ = Fortsetzung, 4 nächstes Level = Ziel.' },
  l7g: { f: ['chain'], t: 'strategie', x: 'Nach dem BOS (2) wartest du auf den Rücklauf ins FVG und eine Reaktion (3). Steigst du direkt beim BOS ein, ist dein Stop riesig und der BOS war vielleicht nur ein Rücklauf.' },
  l8a: { f: ['fvgBull'], t: 'fvg', x: 'Bullisch (K2 steigt): Vergleiche den DOCHT von K1 (oben an K1) mit der LUNTE von K3 (unten an K3). Liegt der Docht tiefer als die Lunte, ist dazwischen die Lücke.' },
  l8b: { f: ['fvgBear'], t: 'fvg', x: 'Bärisch (K2 fällt): Vergleiche die LUNTE von K1 (unten an K1) mit dem DOCHT von K3 (oben an K3). Liegt die Lunte höher als der Docht, ist dazwischen die Lücke.' },
  l8c: { f: ['fvgBull'], t: 'fvg', x: 'Die Farben von K1 und K3 sind egal. Es zählt nur: K2 steigt stark, und zwischen Docht K1 und Lunte K3 ist eine Lücke. Also bullisches FVG.' },
  l8d: { f: ['fvgValid'], t: 'fvgstatus', x: 'Der Rücklauf in die Zone ist genau das, wofür das FVG da ist. Solange der Schluss in der Zone (oder darüber) liegt, ist es gültig.' },
  l8e: { f: ['fvgInvalid'], t: 'fvgstatus', x: 'Schließt eine Kerze unter der Unterkante eines bullischen FVG, haben die Käufer dort nicht gehalten. Ungültig. Daraus wird ein bärisches IFVG.' },
  l8f: { f: ['fvgValid'], t: 'fvgstatus', x: 'Wie beim BOS: Lunten und Dochte zählen nicht für den Bruch. Im Bild sticht die Lunte durch, der Schluss bleibt in der Zone: gültig.' },
  l8g: { f: ['chain'], t: 'strategie', x: 'Das FVG ist Schritt 3 der Kette: Nach Sweep (1) und BOS (2) läuft der Preis ins FVG zurück und setzt den neuen Trend fort.' },
  l8h: { f: ['cleanup'], t: 'fvgstatus', x: 'Hat der Preis ein neues Hoch gemacht, ohne das FVG zu brauchen, löschst du es. Sonst ist dein Chart voll mit alten Zonen, die keine Rolle mehr spielen.' },
  l8i: { f: ['stacked'], t: 'fvgstatus', x: 'Bei gestapelten FVGs ohne Rücklauf ist jedes einzelne noch gültig. Der Preis kann in jedes davon zurücklaufen.' },
  l9a: { f: ['ndog'], t: 'gaps', x: 'Um 17:00 New York schließt der Markt, um 18:00 öffnet er wieder. Liegt die Eröffnung woanders als der Schluss, entsteht die Lücke: das New Day Opening Gap.' },
  l9b: { f: ['ndog'], t: 'gaps', x: 'Das Gap entsteht um Mitternacht deutscher Zeit und wird in 87 % der Fälle schon in der Asien-Nacht gefüllt, also bevor dein Handelsfenster beginnt.' },
  l9c: { f: ['bpr'], t: 'gaps', x: 'Erst rauscht der Preis nach oben (bullisches FVG), dann genauso schnell wieder runter (bärisches FVG). Wo sich beide überlappen, ist die BPR.' },
  l10a: { f: ['ifvg'], t: 'ifvg', x: 'Im Abwärtstrend hält ein bärisches FVG den Preis normalerweise unten. Schließt eine Kerze darüber, hat es versagt. Das gebrochene FVG heißt Inverse FVG und bestätigt den Wechsel nach oben.' },
  l10b: { f: ['ifvg'], t: 'ifvg', x: 'Wie beim BOS zählt nur der Kerzenschluss. Ein Docht über die Zone mit Schluss in der Zone ist kein IFVG.' },
  l10c: { f: ['chain'], t: 'ifvg', x: 'Das IFVG steht an Schritt 2 der Kette, genau wie der BOS. Du nimmst die Bestätigung, die zuerst kommt.' },
  l10d: { f: ['ifvgStack'], t: 'ifvg', x: 'Bei gestapelten bärischen FVGs zählt für die Inversion nach oben das OBERSTE. Es ist die letzte Zone, die den Abwärtstrend noch trägt. Bricht nur ein unteres, kann das obere noch halten.' },
  l10e: { f: ['fvgInvalid'], t: 'ifvg', x: 'Ein bullisches FVG, unter dem eine Kerze schließt, wird zum bärischen IFVG. Es bestätigt einen möglichen Wechsel nach unten.' },
  l11a: { f: ['eq'], t: 'eq', x: 'EQ = (Tief + Hoch) ÷ 2. (7.600 + 7.640) ÷ 2 = 7.620. Oder: Spanne 40 Punkte, die Hälfte ist 20, also 7.600 + 20.' },
  l11b: { f: ['eq'], t: 'eq', x: 'Unter dem EQ ist es günstig (Discount, blau), darüber teuer (Premium, orange). Im Aufwärtstrend kaufst du günstig, also im Discount.' },
  l11c: { f: ['eq'], t: 'eq', x: 'Discount = untere Hälfte zwischen Tief und EQ. Premium = obere Hälfte zwischen EQ und Hoch.' },
  l11d: { f: ['eq'], t: 'eq', x: 'Immer nur die aktuelle Bewegung: im Abwärtstrend vom letzten Swing-Hoch bis zum letzten Swing-Tief, Docht zu Docht. Nie über den ganzen Tag.' },
  l11e: { f: ['chain'], t: 'eq', x: 'Das EQ ist wie das FVG eine Fortsetzungszone (Schritt 3). Fehlt ein FVG, läuft der Preis oft bis ins EQ zurück.' },
  l12a: { f: ['smtNq', 'smtEs'], t: 'smt', x: 'Einer schafft ein höheres Hoch, der andere nur ein tieferes. Das ist eine bärische SMT. Die Kraft nach oben fehlt.' },
  l12b: { f: ['smtNq', 'smtEs'], t: 'smt', x: 'Du handelst den FÜHRENDEN Index, also den, der das Hoch NICHT geholt hat. Er ist schon schwächer und läuft meist zuerst in die neue Richtung.' },
  l12c: { f: ['smtEs'], t: 'smt', x: 'Kleine Abweichungen zwischen den beiden Indizes gibt es ständig. Bedeutung hat eine SMT nur an Liquidität: Session-Hoch/-Tief, Vortageslevel, offensichtliche Hochs.' },
  l12d: { f: ['chain'], t: 'smt', x: 'Die SMT verstärkt nur die Richtung. Eingestiegen wird trotzdem erst nach der Bestätigung (Schritt 2: BOS oder IFVG).' },
  l13a: { f: ['TIMELINE'], t: 'zeiten', x: '09:30–09:50 New York, bei dir meist 15:30–15:50: Hier werden die offenen Levels gesweept. Nur beobachten.' },
  l13b: { f: ['TIMELINE'], t: 'zeiten', x: '09:50–10:10 New York, bei dir meist 15:50–16:10: Nach der Manipulation suchst du hier den Einstieg.' },
  l13c: { f: ['TIMELINE'], t: 'zeiten', x: 'Nach 10:30 NY (16:30 bei dir) wird der Markt ruhiger. Kein Setup bis dahin heißt: Feierabend. Das schützt vor Overtrading.' },
  l13d: { f: ['TIMELINE'], t: 'zeiten', x: '09:30 + 6 Stunden = 15:30. In den Umstellungswochen (März, Ende Oktober) sind es nur 5 Stunden, dann 14:30.' },
  l14a: { t: 'bias', x: 'Der Bias sagt dir nur, welche Setups du heute suchst: Longs oder Shorts. Er stimmte in deinen Daten nur an 53 % der Tage, also ist er ein Filter und keine Vorhersage.' },
  l14b: { f: ['fvgInvalid'], t: 'bias', x: 'Solange die letzte Fortsetzungszone (FVG oder EQ) hält, bleibt der Bias. Schließt eine Kerze durch die Zone, kippt er.' },
  l14c: { f: ['chain'], t: 'bias', x: 'Sweep, BOS und SMT zeigen klar nach unten. Der Markt hat deinen Bias widerlegt. Du folgst den Signalen, nicht deiner Meinung. So hat TJR im Video short verdient.' },
  l14d: { t: 'bias', x: 'Ein Sweep allein bricht keinen Trend. Solange keine 1h-Kerze unter dem letzten 1h-Tal schließt, bleibt die Struktur aufwärts. Der Sweep vor der Eröffnung war Manipulation, Ziel bleiben die Hochs.' },
  l15a: { f: ['chain'], t: 'strategie', x: '1 Sweep (Möglichkeit) → 2 BOS oder IFVG (Bestätigung) → 3 Rücklauf ins FVG/EQ (Fortsetzung) → 4 nächstes Level (Ziel). Im Bild sind die vier Schritte nummeriert.' },
  l15b: { f: ['chain'], t: 'strategie', x: '1 = Sweep des London-Tiefs, 2 = Schluss über dem jüngsten Gipfel (BOS, Bestätigung), 3 = Rücklauf ins FVG, 4 = Ziel.' },
  l15c: { f: ['chain'], t: 'strategie', x: 'Der Stop gehört hinter das Extrem des Sweeps (im Bild unter die Lunte von 1). Wird es unterschritten, war die Umkehr-Idee falsch.' },
  l15d: { f: ['chain'], t: 'strategie', x: 'Bei 3 im Bild läuft der Preis ins FVG und die Kerze schließt wieder darüber. Erst diese Reaktion zeigt, dass die Zone hält. Berühren allein reicht nicht.' },
  l15e: { t: 'strategie', x: 'Streng mechanisch angewendet lagen die vier Schritte bei −0,13 R pro Trade. Der Rahmen stimmt, aber den Vorteil musst du dir im Backtest selbst erarbeiten.' },
  l16a: { t: 'funded', x: '2-Step: 5 % Tageslimit. 100.000 € × 5 % = 5.000 €. Beim 1-Step wären es 3 % = 3.000 €.' },
  l16b: { t: 'funded', x: 'FTMO rechnet mit Equity, also inklusive offener Positionen: −3.500 € + (−1.800 €) = −5.300 €. Das ist mehr als 5.000 €, das Limit ist gerissen.' },
  l16c: { t: 'funded', x: 'Nachlaufend heißt: Steigt dein Konto, steigt die Verlustgrenze mit. Sie fällt aber nie zurück. Beim 1-Step wird sie mit dem höchsten Tagesschluss nachgezogen.' }
};

/* ---------- Bild-Drills (zufällig erzeugt) ---------- */
const rand = (a, b) => a + Math.random() * (b - a);
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const de = (v, d = 1) => v.toFixed(d).replace('.', ',');
const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const jitter = (arr, j) => arr.map(v => v + rand(-j, j));
const clone = o => JSON.parse(JSON.stringify(o));

function clampHigh(k, max) { k[1] = Math.min(k[1], max); k[1] = Math.max(k[1], k[0], k[3]); }
const R = k => k.map(TT.r1);

const DRILLS = {
  sweep: {
    name: 'Sweep oder Durchbruch', l: 5,
    gen() {
      const H = 100;
      const c = TT.walk(91.5, jitter([92.5, 95, 97.2, 98.6, 97, 95.2, 93.8, 95.2, 96.8, 97.8], 0.4));
      c[3][1] = H; c[3][3] = Math.min(c[3][3], H - 1.1); c[3][0] = Math.min(c[3][0], H - 1.6);
      c.forEach((k, i) => { if (i !== 3) clampHigh(k, H - 0.9); });
      const o = c[9][3];
      const isSweep = Math.random() < 0.5;
      let t;
      if (isSweep) { const cl = H - rand(1, 2.4); t = [o, H + rand(1.2, 2.8), Math.min(o, cl) - rand(0.2, 0.9), cl]; }
      else { const cl = H + rand(1, 2.4); t = [o, cl + rand(0.2, 1.2), o - rand(0.2, 0.8), cl]; }
      c.push(R(t), null, null);
      const low = Math.random() < 0.5;
      const word = low ? 'Tief' : 'Hoch';
      let sp = { c: c.map(k => k && R(k)), lines: [{ y: H, x0: 3, t: word }], hl: [10], pr: 50, w: 380 };
      let after = clone(sp);
      after.calls = [
        { i: 10, p: 'h', dx: -28, dy: -8, a: 'end', t: low ? 'Lunte darunter' : 'Docht darüber' },
        { i: 10, p: 'c', e: 1, dx: 18, dy: isSweep ? 24 : -24, a: 'start', t: isSweep ? (low ? 'Schluss wieder\ndarüber' : 'Schluss wieder\ndarunter') : (low ? 'Schluss\ndarunter' : 'Schluss\ndarüber') }
      ];
      if (low) { sp = TT.mirror(sp, 100); after = TT.mirror(after, 100); }
      const dist = Math.abs(sp.c[10][3] - H);
      const side = low ? (isSweep ? 'über' : 'unter') : (isSweep ? 'unter' : 'über');
      return {
        q: 'Ist die markierte Kerze ein Sweep oder ein Durchbruch?', sp, after,
        o: ['Sweep', 'Durchbruch'], a: isSweep ? 0 : 1, fixed: true,
        e: `Der Schluss liegt ${de(dist)} Punkte ${side} dem ${word}.`,
        x: `So prüfst du es: ${low ? 'Die Lunte' : 'Der Docht'} jenseits des Levels ist bei Sweep und Durchbruch gleich. Entscheidend ist nur, wo die Kerze SCHLIESST. ${isSweep ? `Hier liegt der Schluss wieder ${side} dem ${word}: Die Orders wurden nur geholt. Sweep.` : `Hier liegt der Schluss ${side} dem ${word}: Der Preis ist durch. Durchbruch.`}`
      };
    }
  },

  fvg: {
    name: 'FVG erkennen', l: 8,
    gen() {
      const k0o = 101 + rand(-0.4, 0.4);
      const k0 = [k0o, k0o + rand(0.4, 1), k0o - rand(0.8, 1.2), k0o - rand(0.2, 0.6)];
      const k1c = k0[3] + rand(-0.8, 0.8);
      const k1 = [k0[3], Math.max(k0[3], k1c) + rand(0.3, 0.9), Math.min(k0[3], k1c) - rand(0.3, 0.9), k1c];
      const body = rand(6.5, 9);
      const k2 = [k1[3], k1[3] + body + rand(0.2, 0.6), k1[3] - rand(0.2, 0.6), k1[3] + body];
      const kind = pick(['gap', 'gap', 'none']);
      const lun = kind === 'gap' ? k1[1] + rand(1.2, 3) : k1[1] - rand(0.6, 2);
      const k3c = k2[3] + rand(-1.2, 1.5);
      const k3 = [k2[3], Math.max(k2[3], k3c) + rand(0.3, 1), lun, k3c];
      const k4c = k3c + rand(-1, 1.5);
      const k4 = [k3c, Math.max(k3c, k4c) + rand(0.3, 0.8), Math.min(k3c, k4c) - rand(0.3, 0.8), k4c];
      const c = [k0, k1, k2, k3, k4].map(R);
      const bear = Math.random() < 0.5;
      const xl = [{ i: 1, t: 'K1' }, { i: 2, t: 'K2' }, { i: 3, t: 'K3' }];
      const after = { c, xl, w: 300, pad: 0.16 };
      after.zones = kind === 'gap'
        ? [{ x0: 1, lo: c[1][1], hi: c[3][2], cls: 'zb', t: 'FVG', ta: 'r', tp: 'b' }]
        : [{ x0: 1, x1: 3, lo: c[3][2], hi: c[1][1], cls: 'zw' }];
      after.calls = [{ i: 1, p: 'h', dx: -18, dy: -30, a: 'middle', t: 'K1' }, { i: 3, p: 'l', dx: 30, dy: 0, a: 'start', t: 'K3' }];
      let sp = { c, xl, w: 300, pad: 0.16 }, spAfter = after;
      if (bear) { sp = TT.mirror(sp, 105); spAfter = TT.mirror(after, 105); if (kind === 'gap') spAfter.zones[0].cls = 'zs'; }
      spAfter.calls[0].t = bear ? 'Lunte K1' : 'Docht K1';
      spAfter.calls[1].t = bear ? 'Docht K3' : 'Lunte K3';
      if (kind === 'none') spAfter.calls.push({ i: 3, p: bear ? spAfter.zones[0].hi - 0.3 : spAfter.zones[0].lo + 0.3, dx: 30, dy: bear ? -22 : 22, a: 'start', t: 'überlappen' });
      const ans = kind === 'none' ? 2 : bear ? 1 : 0;
      const pts = bear ? 'die Lunte von K1 mit dem Docht von K3' : 'den Docht von K1 mit der Lunte von K3';
      const e = kind === 'none'
        ? (bear ? 'Lunte K1 und Docht K3 überlappen. Keine Lücke, kein FVG.' : 'Docht K1 und Lunte K3 überlappen. Keine Lücke, kein FVG.')
        : (bear ? 'Die Lunte von K1 liegt höher als der Docht von K3. Dazwischen ist die Lücke.' : 'Der Docht von K1 liegt tiefer als die Lunte von K3. Dazwischen ist die Lücke.');
      return {
        q: 'Bullisches FVG, bärisches FVG oder keins?', sp, after: spAfter, o: ['Bullisches FVG', 'Bärisches FVG', 'Kein FVG'], a: ans, e, fixed: true,
        x: `So gehst du vor: 1. Wohin läuft die Mittelkerze K2? ${bear ? 'Nach unten' : 'Nach oben'}, also prüfst du auf ein ${bear ? 'bärisches' : 'bullisches'} FVG. 2. Vergleiche ${pts} (beschriftet). ${kind === 'none' ? 'Sie überlappen (graue Fläche). Keine Lücke, kein FVG.' : 'Dazwischen bleibt eine Lücke (farbige Zone). Das ist das FVG.'} Die Farben von K1 und K3 sind egal.`
      };
    }
  },

  bos: {
    name: 'BOS oder nicht', l: 7,
    gen() {
      const c = STAIR.map(k => k.slice());
      const T = 108.5;
      c.push([115, 115.3, 111.5, 112], [112, 112.4, T + rand(0.9, 1.6), 110.4]);
      const o = c[17][3];
      const isBos = Math.random() < 0.5;
      let t;
      if (isBos) { const cl = T - rand(0.9, 2.2); t = [o, o + rand(0.1, 0.5), cl - rand(0.2, 1), cl]; }
      else { const cl = T + rand(0.8, 1.6); t = [o, Math.max(o, cl) + rand(0.1, 0.5), T - rand(1, 2.4), cl]; }
      c.push(R(t), null, null);
      const down = Math.random() < 0.5;
      const lab = down ? 'jüngster\nGipfel' : 'jüngstes Tal';
      let sp = { c: c.map(k => k && R(k)), lines: [{ y: T, x0: 11, t: lab }], hl: [18], pr: 86 };
      let after = clone(sp);
      after.calls = isBos
        ? [{ i: 18, p: 'c', e: 1, dx: 16, dy: 22, a: 'start', t: down ? 'Schluss darüber:\nBOS' : 'Schluss darunter:\nBOS' }]
        : [{ i: 18, p: 'l', dx: -26, dy: 18, a: 'end', t: down ? 'nur Docht darüber' : 'nur Lunte darunter' },
          { i: 18, p: 'c', e: 1, dx: 16, dy: -20, a: 'start', t: down ? 'Schluss\ndarunter' : 'Schluss\ndarüber' }];
      if (down) { sp = TT.mirror(sp, 109); after = TT.mirror(after, 109); }
      const q = down ? 'Abwärtstrend. Die Linie ist der jüngste Gipfel. Ist die markierte Kerze ein BOS nach oben?' : 'Aufwärtstrend. Die Linie ist das jüngste Tal. Ist die markierte Kerze ein BOS nach unten?';
      return {
        q, sp, after, o: ['Ja, BOS', 'Nein, kein BOS'], a: isBos ? 0 : 1, fixed: true,
        e: isBos ? `Die Kerze schließt ${down ? 'über dem Gipfel' : 'unter dem Tal'}. Das ist der Bruch.` : `${down ? 'Nur der Docht sticht darüber' : 'Nur die Lunte sticht darunter'}, der Schluss bleibt ${down ? 'darunter' : 'darüber'}. Kein BOS.`,
        x: `So prüfst du es: Im ${down ? 'Abwärtstrend' : 'Aufwärtstrend'} beobachtest du ${down ? 'den jüngsten Gipfel' : 'das jüngste Tal'}. Dann schaust du nur auf den SCHLUSS der markierten Kerze. ${isBos ? `Er liegt ${down ? 'über' : 'unter'} der Linie: BOS.` : `Er liegt noch ${down ? 'unter' : 'über'} der Linie. ${down ? 'Der Docht' : 'Die Lunte'} allein bricht nichts, das ist höchstens ein Sweep.`}`
      };
    }
  },

  level: {
    name: 'Welches Level zählt', l: 7,
    gen() {
      const c = STAIR.map(k => k.slice());
      c.push([115, 115.3, 111.8, 112.2], [112.2, 112.6, 110.2, 110.8]);
      const down = Math.random() < 0.5;
      const L = shuffle(['A', 'B', 'C']);
      // L[0] = jüngstes Tal (108,5), L[1] = älteres Tal (104), L[2] = letzter Gipfel (118)
      let sp = {
        c: c.map(R), pr: 34,
        lines: [{ y: 108.5, x0: 11, cls: 'lv' }, { y: 104, x0: 6, cls: 'lv' }, { y: 118, x0: 14, cls: 'lv' }],
        badges: [{ line: 108.5, t: L[0] }, { line: 104, t: L[1] }, { line: 118, t: L[2] }]
      };
      if (down) sp = TT.mirror(sp, 109);
      sp.badges.forEach((b, i) => { b.line = sp.lines[i].y; });
      const after = clone(sp);
      const below = down ? 'al' : 'bl', above = down ? 'bl' : 'al';
      after.lines[0].t = (down ? 'jüngster Gipfel' : 'jüngstes Tal') + ' ✓'; after.lines[0].side = below;
      after.lines[1].t = (down ? 'älterer Gipfel' : 'älteres Tal') + ' ✗'; after.lines[1].side = below;
      after.lines[2].t = (down ? 'Tal: falsche Seite' : 'Gipfel: falsche Seite') + ' ✗'; after.lines[2].side = above;
      after.lines[1].cls = 'old'; after.lines[2].cls = 'old'; after.lines[2].x0 = 8;
      const opts = ['A', 'B', 'C'];
      return {
        q: down ? 'Abwärtstrend. Welche Linie beobachtest du für einen BOS nach oben?' : 'Aufwärtstrend. Welche Linie beobachtest du für einen BOS nach unten?',
        sp, after, o: opts, a: opts.indexOf(L[0]), fixed: true,
        e: `${L[0]} ist ${down ? 'der jüngste Gipfel' : 'das jüngste Tal'}.`,
        x: `So findest du es: Geh im Chart von rechts nach links und such ${down ? 'den ersten Gipfel' : 'das erste Tal'}, das du triffst. Das ist ${down ? 'der jüngste Gipfel' : 'das jüngste Tal'} (${L[0]}). ${L[1]} ist ${down ? 'ein älterer Gipfel weiter links' : 'ein älteres Tal weiter links'}, auch wenn es ${down ? 'höher' : 'tiefer'} liegt. ${L[2]} liegt auf der falschen Seite: Im ${down ? 'Abwärtstrend' : 'Aufwärtstrend'} bricht die Struktur nur ${down ? 'oben' : 'unten'}.`
      };
    }
  },

  fvgval: {
    name: 'FVG gültig oder ungültig', l: 8,
    gen() {
      const c = FVG5.map(k => k.slice());
      c.push([109.8, 111, 109.4, 110.6], [110.6, 110.9, 107.6 - rand(0, 1.5), 108]);
      const o = 108;
      const valid = Math.random() < 0.5;
      const deep = Math.random() < 0.6;
      let t;
      if (valid) { const cl = rand(102.6, 104.1); t = [o, o + rand(0.1, 0.4), deep ? rand(100.6, 101.5) : cl - rand(0.3, 0.6), cl]; }
      else { const cl = rand(99.6, 101.1); t = [o, o + rand(0.1, 0.4), cl - rand(0.3, 1), cl]; }
      c.push(R(t));
      const bear = Math.random() < 0.5;
      let sp = { c: c.map(R), zones: [{ x0: 1, lo: 102, hi: 104.5, cls: 'zb', t: 'FVG', ta: 'l' }], hl: [7], w: 320, pad: 0.12 };
      let after = clone(sp);
      after.calls = [{ i: 7, p: 'c', e: 1, dx: -40, dy: valid ? 0 : 10, a: 'end', t: valid ? 'Schluss in der Zone' : (bear ? 'Schluss über der Zone' : 'Schluss unter der Zone') }];
      if (valid && deep) after.calls.push({ i: 7, p: 'l', dx: -30, dy: 14, a: 'end', t: bear ? 'Docht darüber (egal)' : 'Lunte darunter (egal)' });
      if (bear) { sp = TT.mirror(sp, 105); after = TT.mirror(after, 105); sp.zones[0].cls = 'zs'; after.zones[0].cls = 'zs'; }
      const name = bear ? 'bärische' : 'bullische';
      return {
        q: `Ist das ${name} FVG nach der markierten Kerze noch gültig?`, sp, after, o: ['Gültig', 'Ungültig'], a: valid ? 0 : 1, fixed: true,
        e: valid ? 'Der Schluss liegt in der Zone.' : `Der Schluss liegt ${bear ? 'über' : 'unter'} der Zone.`,
        x: `So prüfst du es: Ignoriere ${bear ? 'den Docht' : 'die Lunte'} und schau nur, wo die Kerze SCHLIESST. In der Zone = gültig, das ist der normale Rücklauf. ${bear ? 'Über der Oberkante' : 'Unter der Unterkante'} = ungültig, dann wird es zum IFVG. ${valid ? 'Hier: Schluss in der Zone, also gültig.' : `Hier: Schluss ${bear ? 'über' : 'unter'} der Zone, also ungültig.`}`
      };
    }
  },

  swing: {
    name: 'Tal und Gipfel finden', l: 3,
    gen() {
      const lows = [105, 103, 100.5, 102.5, 101.8, 100.8, 99.8, 99];
      const c = lows.map(lv => {
        const b0 = lv + rand(0.4, 0.9), b1 = b0 + rand(0.8, 2.2);
        const up = Math.random() < 0.5;
        return R([up ? b0 : b1, b1 + rand(0.2, 0.7), lv, up ? b1 : b0]);
      });
      const L = shuffle(['A', 'B', 'C']);
      let sp = { c, badges: [{ i: 2, at: 'l', t: L[0] }, { i: 4, at: 'l', t: L[1] }, { i: 6, at: 'l', t: L[2] }], w: 320, pad: 0.2 };
      let after = clone(sp);
      after.lines = [{ y: lows[2], x0: 1, x1: 3, cls: 'tgt' }, { y: lows[4], x0: 3, x1: 5, cls: 'stop' }, { y: lows[6], x0: 5, x1: 7, cls: 'stop' }];
      after.xl = [{ i: 2, t: '✓' }, { i: 4, t: '✗' }, { i: 6, t: '✗' }];
      const top = Math.random() < 0.5;
      if (top) { sp = TT.mirror(sp, 103); after = TT.mirror(after, 103); }
      const opts = ['A', 'B', 'C'];
      return {
        q: top ? 'Welche Kerze ist ein Swing-Hoch (Gipfel)?' : 'Welche Kerze ist ein Swing-Tief (Tal)?', sp, after, o: opts, a: opts.indexOf(L[0]), fixed: true,
        e: top ? `${L[0]}: Der Docht liegt höher als bei beiden Nachbarn.` : `${L[0]}: Die Lunte liegt tiefer als bei beiden Nachbarn.`,
        x: top
          ? `So prüfst du es: Leg gedanklich eine Linie an den Docht der Kerze und schau, ob der linke UND der rechte Nachbar darunter bleiben. Bei ${L[0]} bleiben beide darunter (grün). Bei ${L[1]} und ${L[2]} sticht der rechte Nachbar über die Linie (rot), also kein Gipfel.`
          : `So prüfst du es: Leg gedanklich eine Linie an die Lunte der Kerze und schau, ob der linke UND der rechte Nachbar darüber bleiben. Bei ${L[0]} bleiben beide darüber (grün). Bei ${L[1]} und ${L[2]} sticht der rechte Nachbar unter die Linie (rot), also kein Tal.`
      };
    }
  },

  eq: {
    name: 'Equilibrium rechnen', l: 11,
    gen() {
      const lo = 7500 + 2 * Math.floor(rand(0, 150));
      const span = 2 * Math.floor(rand(10, 40));
      const hi = lo + span, eq = lo + span / 2;
      const n = v => v.toLocaleString('de-DE');
      const steps = 7, cl = [];
      for (let i = 1; i <= steps; i++) cl.push(lo + span * (i / steps) * 0.97);
      const c = TT.walk(lo + span * 0.03, cl, Math.random, [span * 0.01, span * 0.04]).map(R);
      c[0][2] = lo; c[steps - 1][1] = hi;
      const variant = Math.random() < 0.5 ? 'eq' : 'pd';
      const p = variant === 'pd' ? (Math.random() < 0.5 ? eq - Math.round(rand(2, span / 2 - 1)) : eq + Math.round(rand(2, span / 2 - 1))) : null;
      const after = {
        c, pr: 96, h: 230, pad: 0.06,
        zones: [{ x0: 0, lo: eq, hi, cls: 'zp', t: 'Premium', ta: 'l' }, { x0: 0, lo, hi: eq, cls: 'zd', t: 'Discount', ta: 'r' }],
        lines: [{ y: hi, cls: 'aux', t: 'Hoch ' + n(hi) }, { y: eq, cls: 'eq', t: 'EQ ' + n(eq) }, { y: lo, cls: 'aux', t: 'Tief ' + n(lo) }],
        legs: [{ p: [[0, 'l'], [steps - 1, 'h']], cls: 'dash' }]
      };
      if (p !== null) after.lines.push({ y: p, cls: 'lv', t: 'Preis ' + n(p) });
      if (variant === 'eq') {
        const d = Math.max(4, 2 * Math.round(span / 8));
        const o = shuffle([eq, eq + d, eq - d]);
        return {
          q: `Aufwärtsbewegung von Tief ${n(lo)} bis Hoch ${n(hi)}. Wo liegt das Equilibrium?`, o: o.map(n), a: o.indexOf(eq), fixed: true, after,
          e: `(${n(lo)} + ${n(hi)}) ÷ 2 = ${n(eq)}.`,
          x: `So rechnest du es schnell: Spanne = ${n(hi)} − ${n(lo)} = ${span} Punkte. Die Hälfte sind ${span / 2} Punkte. Tief + Hälfte = ${n(lo)} + ${span / 2} = ${n(eq)}.`
        };
      }
      const disc = p < eq;
      return {
        q: `Bewegung von ${n(lo)} bis ${n(hi)}. Der Preis steht bei ${n(p)}. Premium oder Discount?`, o: ['Discount (günstig)', 'Premium (teuer)'], a: disc ? 0 : 1, fixed: true, after,
        e: `EQ = ${n(eq)}. Der Preis liegt ${disc ? 'darunter: Discount' : 'darüber: Premium'}.`,
        x: `So prüfst du es: Erst das EQ rechnen: (${n(lo)} + ${n(hi)}) ÷ 2 = ${n(eq)}. Dann vergleichen: ${n(p)} ist ${disc ? 'kleiner' : 'größer'} als ${n(eq)}, liegt also in der ${disc ? 'unteren Hälfte (Discount, günstig)' : 'oberen Hälfte (Premium, teuer)'}.`
      };
    }
  },

  size: {
    name: 'Positionsgröße', l: 4,
    gen() {
      const acc = pick([10000, 25000, 50000, 100000]);
      const risk = pick([0.5, 1]);
      const stop = pick([4, 5, 8, 10, 20, 25]);
      const eur = acc * risk / 100;
      const lots = eur / stop;
      const fmt = v => (Math.round(v * 100) / 100).toLocaleString('de-DE');
      const o = shuffle([lots, lots * 10, lots / 10]);
      return {
        q: `Konto ${acc.toLocaleString('de-DE')} €, Risiko ${de(risk)} %, Stop ${stop} Punkte, 1 € je Punkt und Lot. Wie viele Lots?`,
        o: o.map(fmt), a: o.indexOf(lots), fixed: true,
        e: `${fmt(eur)} € ÷ ${stop} Punkte ÷ 1 € = ${fmt(lots)} Lots.`,
        x: `Schritt 1, Risiko in Euro: ${acc.toLocaleString('de-DE')} € × ${de(risk)} % = ${fmt(eur)} €. Schritt 2, durch den Stop: ${fmt(eur)} € ÷ ${stop} Punkte = ${fmt(lots)} € pro Punkt. Schritt 3, durch den Wert pro Punkt je Lot (1 €): ${fmt(lots)} Lots. Probe: ${fmt(lots)} Lots × ${stop} Punkte × 1 € = ${fmt(eur)} € Verlust, wenn der Stop greift.`
      };
    }
  }
};
