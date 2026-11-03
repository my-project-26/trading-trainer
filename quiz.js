/* Trading-Lerncenter · Fragenbank und Bild-Drills */

F.smtNq = () => F.smt('nq');
F.smtEs = () => F.smt('es');

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

/* ---------- Bild-Drills (zufällig erzeugt) ---------- */
const rand = (a, b) => a + Math.random() * (b - a);
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const de = (v, d = 1) => v.toFixed(d).replace('.', ',');
const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const jitter = (arr, j) => arr.map(v => v + rand(-j, j));

function clampHigh(k, max) { k[1] = Math.min(k[1], max); k[1] = Math.max(k[1], k[0], k[3]); }
function clampLow(k, min) { k[2] = Math.max(k[2], min); k[2] = Math.min(k[2], k[0], k[3]); }
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
      c.push(R(t));
      const lowVer = Math.random() < 0.5;
      let sp = { c: c.map(R), lines: [{ y: H, x0: 3, t: 'Hoch' }], hl: [10], pr: 50, w: 360 };
      if (lowVer) { sp = TT.mirror(sp, 100); sp.lines[0].t = 'Tief'; }
      const dist = Math.abs(sp.c[10][3] - sp.lines[0].y);
      const side = lowVer ? (isSweep ? 'über' : 'unter') : (isSweep ? 'unter' : 'über');
      return {
        q: 'Ist die markierte Kerze ein Sweep oder ein Durchbruch?', sp,
        o: ['Sweep', 'Durchbruch'], a: isSweep ? 0 : 1,
        e: `Der Schluss liegt ${de(dist)} Punkte ${side} dem ${lowVer ? 'Tief' : 'Hoch'}. ${isSweep ? (lowVer ? 'Lunte drunter, Schluss zurück = Sweep.' : 'Docht drüber, Schluss zurück = Sweep.') : 'Schluss jenseits des Levels = Durchbruch.'}`
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
      const after = { c, xl: [{ i: 1, t: 'K1' }, { i: 2, t: 'K2' }, { i: 3, t: 'K3' }], w: 300, pad: 0.16 };
      if (kind === 'gap') after.zones = [{ x0: 1, lo: c[1][1], hi: c[3][2], cls: 'zb', t: 'FVG', ta: 'r' }];
      else after.zones = [{ x0: 1, x1: 3, lo: c[3][2], hi: c[1][1], cls: 'zw', t: 'überlappen', ta: 'r', tp: 'b' }];
      let sp = { c, xl: after.xl, w: 300, pad: 0.16 }, spAfter = after;
      if (bear) { sp = TT.mirror(sp, 105); spAfter = TT.mirror(after, 105); if (kind === 'gap') spAfter.zones[0].cls = 'zs'; }
      const ans = kind === 'none' ? 2 : bear ? 1 : 0;
      const e = kind === 'none'
        ? (bear ? 'Lunte K1 und Docht K3 überlappen. Keine Lücke, kein FVG.' : 'Docht K1 und Lunte K3 überlappen. Keine Lücke, kein FVG.')
        : (bear ? 'Die Lunte von K1 liegt höher als der Docht von K3. Dazwischen ist die Lücke.' : 'Der Docht von K1 liegt tiefer als die Lunte von K3. Dazwischen ist die Lücke.');
      return { q: 'Bullisches FVG, bärisches FVG oder keins?', sp, after: spAfter, o: ['Bullisches FVG', 'Bärisches FVG', 'Kein FVG'], a: ans, e, fixed: true };
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
      c.push(R(t));
      const down = Math.random() < 0.5;
      let sp = { c: c.map(R), lines: [{ y: T, x0: 11, t: down ? 'jüngster\nGipfel' : 'jüngstes Tal' }], hl: [18], pr: 86 };
      if (down) { sp = TT.mirror(sp, 109); sp.lines[0].t = 'jüngster\nGipfel'; }
      const q = down ? 'Abwärtstrend. Die Linie ist der jüngste Gipfel. Ist die markierte Kerze ein BOS nach oben?' : 'Aufwärtstrend. Die Linie ist das jüngste Tal. Ist die markierte Kerze ein BOS nach unten?';
      return {
        q, sp, o: ['Ja, BOS', 'Nein, kein BOS'], a: isBos ? 0 : 1, fixed: true,
        e: isBos ? `Die Kerze schließt ${down ? 'über dem Gipfel' : 'unter dem Tal'}. Das ist der Bruch.` : `${down ? 'Nur der Docht sticht darüber' : 'Nur die Lunte sticht darunter'}, der Schluss bleibt ${down ? 'darunter' : 'darüber'}. Kein BOS.`
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
      const opts = ['A', 'B', 'C'];
      return {
        q: down ? 'Abwärtstrend. Welche Linie beobachtest du für einen BOS nach oben?' : 'Aufwärtstrend. Welche Linie beobachtest du für einen BOS nach unten?',
        sp, o: opts, a: opts.indexOf(L[0]), fixed: true,
        e: `${L[0]} ist ${down ? 'der jüngste Gipfel' : 'das jüngste Tal'}. ${L[1]} ist ${down ? 'ein älterer Gipfel' : 'ein älteres Tal'}, ${L[2]} liegt auf der falschen Seite.`
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
      let t;
      if (valid) { const cl = rand(102.6, 104.1); t = [o, o + rand(0.1, 0.4), Math.random() < 0.6 ? rand(100.6, 101.5) : cl - rand(0.3, 0.6), cl]; }
      else { const cl = rand(99.6, 101.1); t = [o, o + rand(0.1, 0.4), cl - rand(0.3, 1), cl]; }
      c.push(R(t));
      const bear = Math.random() < 0.5;
      let sp = { c: c.map(R), zones: [{ x0: 1, lo: 102, hi: 104.5, cls: 'zb', t: 'FVG', ta: 'l' }], hl: [7], w: 320, pad: 0.12 };
      if (bear) { sp = TT.mirror(sp, 105); sp.zones[0].cls = 'zs'; }
      const name = bear ? 'bärische' : 'bullische';
      return {
        q: `Ist das ${name} FVG nach der markierten Kerze noch gültig?`, sp, o: ['Gültig', 'Ungültig'], a: valid ? 0 : 1, fixed: true,
        e: valid ? 'Der Schluss liegt in der Zone. Dochte und Lunten dürfen durchstechen.' : `Der Schluss liegt ${bear ? 'über' : 'unter'} der Zone. Damit ist das FVG ungültig (und wird zum IFVG).`
      };
    }
  },

  swing: {
    name: 'Tal und Gipfel finden', l: 3,
    gen() {
      const lows = [105, 103, 100.5, 102.5, 101.8, 100.8, 99.8, 99];
      const c = lows.map((lv, i) => {
        const b0 = lv + rand(0.4, 0.9), b1 = b0 + rand(0.8, 2.2);
        const up = Math.random() < 0.5;
        return R([up ? b0 : b1, b1 + rand(0.2, 0.7), lv, up ? b1 : b0]);
      });
      const L = shuffle(['A', 'B', 'C']);
      let sp = { c, badges: [{ i: 2, at: 'l', t: L[0] }, { i: 4, at: 'l', t: L[1] }, { i: 6, at: 'l', t: L[2] }], w: 320, pad: 0.18 };
      const top = Math.random() < 0.5;
      if (top) sp = TT.mirror(sp, 103);
      const opts = ['A', 'B', 'C'];
      return {
        q: top ? 'Welche Kerze ist ein Swing-Hoch (Gipfel)?' : 'Welche Kerze ist ein Swing-Tief (Tal)?', sp, o: opts, a: opts.indexOf(L[0]), fixed: true,
        e: top ? `Bei ${L[0]} liegt der Docht höher als bei beiden Nachbarn. Bei ${L[1]} und ${L[2]} ist der rechte Nachbar höher.`
          : `Bei ${L[0]} liegt die Lunte tiefer als bei beiden Nachbarn. Bei ${L[1]} und ${L[2]} ist der rechte Nachbar tiefer.`
      };
    }
  },

  eq: {
    name: 'Equilibrium rechnen', l: 11,
    gen() {
      const lo = 7500 + 2 * Math.floor(rand(0, 150));
      const span = 2 * Math.floor(rand(10, 40));
      const hi = lo + span, eq = lo + span / 2;
      if (Math.random() < 0.5) {
        const d = Math.max(4, 2 * Math.round(span / 8));
        const o = shuffle([eq, eq + d, eq - d]);
        return { q: `Aufwärtsbewegung von Tief ${lo.toLocaleString('de-DE')} bis Hoch ${hi.toLocaleString('de-DE')}. Wo liegt das Equilibrium?`, o: o.map(v => v.toLocaleString('de-DE')), a: o.indexOf(eq), fixed: true, e: `(${lo.toLocaleString('de-DE')} + ${hi.toLocaleString('de-DE')}) ÷ 2 = ${eq.toLocaleString('de-DE')}.` };
      }
      const p = Math.random() < 0.5 ? eq - Math.round(rand(2, span / 2 - 1)) : eq + Math.round(rand(2, span / 2 - 1));
      const disc = p < eq;
      return { q: `Bewegung von ${lo.toLocaleString('de-DE')} bis ${hi.toLocaleString('de-DE')}. Der Preis steht bei ${p.toLocaleString('de-DE')}. Premium oder Discount?`, o: ['Discount (günstig)', 'Premium (teuer)'], a: disc ? 0 : 1, fixed: true, e: `EQ = ${eq.toLocaleString('de-DE')}. Der Preis liegt ${disc ? 'darunter: Discount' : 'darüber: Premium'}.` };
    }
  },

  size: {
    name: 'Positionsgröße', l: 4,
    gen() {
      const acc = pick([10000, 25000, 50000, 100000]);
      const risk = pick([0.5, 1]);
      const stop = pick([4, 5, 8, 10, 20, 25]);
      const lots = acc * risk / 100 / stop;
      const fmt = v => (Math.round(v * 100) / 100).toLocaleString('de-DE');
      const o = shuffle([lots, lots * 10, lots / 10]);
      return {
        q: `Konto ${acc.toLocaleString('de-DE')} €, Risiko ${de(risk)} %, Stop ${stop} Punkte, 1 € je Punkt und Lot. Wie viele Lots?`,
        o: o.map(fmt), a: o.indexOf(lots), fixed: true,
        e: `${fmt(acc * risk / 100)} € ÷ ${stop} Punkte ÷ 1 € = ${fmt(lots)} Lots.`
      };
    }
  }
};
