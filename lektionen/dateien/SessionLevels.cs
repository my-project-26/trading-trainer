using System;
using System.Collections.Generic;
using System.Linq;
using cAlgo.API;

namespace cAlgo
{
    // Färbt den Hintergrund der Sessions (Asien 18:00–03:00, London 03:00–09:30,
    // NY-Kasse 09:30–16:00 New York) und zeichnet deren Hoch/Tief.
    // "Handelstage" = 1 zeigt genau das, was für den Journal-Eintrag des
    // aktuellen Tages gebraucht wird: Vortag NY-Kasse + heute Asien, London, NY.
    // Rechnet intern immer in New-Yorker Zeit inkl. Sommer-/Winterzeit,
    // unabhängig von der Zeitzone, die im Chart eingestellt ist.
    [Indicator(IsOverlay = true, TimeZone = TimeZones.EasternStandardTime, AccessRights = AccessRights.None)]
    public class SessionLevels : Indicator
    {
        // ---------- Allgemein ----------
        [Parameter("Handelstage", DefaultValue = 1, MinValue = 1, MaxValue = 30, Group = "Allgemein")]
        public int TradingDays { get; set; }

        [Parameter("Hintergrund färben", DefaultValue = true, Group = "Allgemein")]
        public bool ShowBackground { get; set; }

        [Parameter("Deckkraft Hintergrund (0–255)", DefaultValue = 45, MinValue = 0, MaxValue = 255, Group = "Allgemein")]
        public int BackgroundAlpha { get; set; }

        [Parameter("Linie NY-Eröffnung 09:30", DefaultValue = true, Group = "Allgemein")]
        public bool ShowNyOpenLine { get; set; }

        [Parameter("Hoch/Tief-Linien", DefaultValue = true, Group = "Allgemein")]
        public bool ShowLevels { get; set; }

        [Parameter("Preis-Beschriftung", DefaultValue = true, Group = "Allgemein")]
        public bool ShowLabels { get; set; }

        [Parameter("Linien bis NY-Schluss verlängern", DefaultValue = true, Group = "Allgemein")]
        public bool ExtendLines { get; set; }

        [Parameter("Linienstärke", DefaultValue = 1, MinValue = 1, MaxValue = 5, Group = "Allgemein")]
        public int Thickness { get; set; }

        // ---------- Sessions ein/aus ----------
        [Parameter("Asien zeigen", DefaultValue = true, Group = "Sessions")]
        public bool ShowAsia { get; set; }

        [Parameter("London zeigen", DefaultValue = true, Group = "Sessions")]
        public bool ShowLondon { get; set; }

        [Parameter("NY-Kasse (RTH) zeigen", DefaultValue = true, Group = "Sessions")]
        public bool ShowRth { get; set; }

        // ---------- Farben ----------
        [Parameter("Farbe Asien", DefaultValue = "MediumPurple", Group = "Farben")]
        public Color AsiaColor { get; set; }

        [Parameter("Farbe London", DefaultValue = "Goldenrod", Group = "Farben")]
        public Color LondonColor { get; set; }

        [Parameter("Farbe NY-Kasse / Vortag", DefaultValue = "DarkGray", Group = "Farben")]
        public Color RthColor { get; set; }

        [Parameter("Farbe NY-Eröffnung 09:30", DefaultValue = "DodgerBlue", Group = "Farben")]
        public Color NyOpenColor { get; set; }

        private enum Sess { Asia, London, Rth }

        private class Range
        {
            public double High = double.MinValue;
            public double Low = double.MaxValue;
        }

        private const string Prefix = "SL_";
        private const int AsiaStartMin = 18 * 60;      // 18:00
        private const int LondonStartMin = 3 * 60;     // 03:00
        private const int RthStartMin = 9 * 60 + 30;   // 09:30
        private const int RthEndMin = 16 * 60;         // 16:00

        private string _fmt;

        protected override void Initialize()
        {
            _fmt = "F" + Symbol.Digits;

            // Hintergrund-Flächen an den sichtbaren Preisbereich anpassen
            Chart.ScrollChanged += e => Redraw();
            Chart.ZoomChanged += e => Redraw();
            Chart.SizeChanged += e => Redraw();
        }

        public override void Calculate(int index)
        {
            if (!IsLastBar)
                return;

            Redraw();
        }

        private void Redraw()
        {
            if (Bars.Count == 0)
                return;

            // ---------- Zeitraum bestimmen ----------
            DateTime lastTime = Bars.OpenTimes.LastValue;
            DateTime currentDay = TryGetSession(lastTime, out _, out DateTime d) ? d : lastTime.Date;

            DateTime minDay = currentDay;
            for (int k = 1; k < TradingDays; k++)
                minDay = PrevTradingDay(minDay);

            DateTime vortagDay = PrevTradingDay(minDay);
            DateTime cutoff = vortagDay.AddMinutes(RthStartMin);

            // ---------- Hoch/Tief je Session sammeln ----------
            var ranges = new Dictionary<(Sess, DateTime), Range>();

            for (int i = Bars.Count - 1; i >= 0; i--)
            {
                DateTime t = Bars.OpenTimes[i];
                if (t < cutoff)
                    break;

                if (!TryGetSession(t, out Sess s, out DateTime day))
                    continue;

                bool inRange = day >= minDay;
                bool isVortag = s == Sess.Rth && day == vortagDay;
                if (!inRange && !isVortag)
                    continue;

                var key = (s, day);
                if (!ranges.TryGetValue(key, out Range r))
                {
                    r = new Range();
                    ranges[key] = r;
                }

                if (Bars.HighPrices[i] > r.High) r.High = Bars.HighPrices[i];
                if (Bars.LowPrices[i] < r.Low) r.Low = Bars.LowPrices[i];
            }

            // Vertikaler Bereich für die Hintergrund-Flächen
            double top = Chart.TopY;
            double bottom = Chart.BottomY;
            double pad = Math.Max(top - bottom, Symbol.TickSize * 100);
            double yTop = top + pad;
            double yBottom = bottom - pad;

            var drawn = new HashSet<string>();

            foreach (var kv in ranges)
            {
                Sess s = kv.Key.Item1;
                DateTime day = kv.Key.Item2;
                Range r = kv.Value;

                if (!IsEnabled(s))
                    continue;

                bool isVortag = s == Sess.Rth && day < minDay;

                GetSessionTimes(s, day, out DateTime start, out DateTime end);
                Color color = GetColor(s);
                string id = Prefix + s + "_" + day.ToString("yyyyMMdd");

                // ---------- Hintergrund ----------
                if (ShowBackground)
                {
                    Color fill = Color.FromArgb(BackgroundAlpha, color.R, color.G, color.B);
                    var rect = Chart.DrawRectangle(id + "_BG", start, yBottom, end, yTop, fill);
                    rect.IsFilled = true;
                    rect.IsInteractive = false;
                    drawn.Add(id + "_BG");
                }

                // ---------- Linie NY-Eröffnung ----------
                if (ShowNyOpenLine && s == Sess.Rth && !isVortag)
                {
                    var v = Chart.DrawVerticalLine(id + "_V", start, NyOpenColor, Thickness, LineStyle.Dots);
                    v.IsInteractive = false;
                    drawn.Add(id + "_V");
                }

                if (!ShowLevels)
                    continue;

                // ---------- Hoch/Tief ----------
                DateTime lineEnd = end;
                if (ExtendLines)
                {
                    // Asien/London -> bis NY-Schluss desselben Handelstags
                    // NY-Kasse -> bis NY-Schluss des nächsten Handelstags (= Vortageslevel)
                    lineEnd = s == Sess.Rth
                        ? NextTradingDay(day).AddMinutes(RthEndMin)
                        : day.AddMinutes(RthEndMin);
                }

                string name = isVortag ? "Vortag" : GetName(s);
                string dayText = day.ToString("dd.MM");

                var hl = Chart.DrawTrendLine(id + "_H", start, r.High, lineEnd, r.High, color, Thickness, LineStyle.Solid);
                hl.IsInteractive = false;
                drawn.Add(id + "_H");

                var ll = Chart.DrawTrendLine(id + "_L", start, r.Low, lineEnd, r.Low, color, Thickness, LineStyle.Solid);
                ll.IsInteractive = false;
                drawn.Add(id + "_L");

                if (ShowLabels)
                {
                    var ht = Chart.DrawText(id + "_HT", name + " Hoch " + dayText + "  " + r.High.ToString(_fmt), start, r.High, color);
                    ht.VerticalAlignment = VerticalAlignment.Top;
                    ht.HorizontalAlignment = HorizontalAlignment.Right;
                    ht.FontSize = 10;
                    drawn.Add(id + "_HT");

                    var lt = Chart.DrawText(id + "_LT", name + " Tief " + dayText + "  " + r.Low.ToString(_fmt), start, r.Low, color);
                    lt.VerticalAlignment = VerticalAlignment.Bottom;
                    lt.HorizontalAlignment = HorizontalAlignment.Right;
                    lt.FontSize = 10;
                    drawn.Add(id + "_LT");
                }
            }

            // ---------- Alte Objekte dieses Indikators entfernen ----------
            var stale = Chart.Objects
                .Where(o => o.Name.StartsWith(Prefix) && !drawn.Contains(o.Name))
                .Select(o => o.Name)
                .ToList();

            foreach (var n in stale)
                Chart.RemoveObject(n);
        }

        // Ordnet eine Kerze (NY-Zeit) ihrer Session und ihrem Handelstag zu.
        // Asien ab 18:00 gehört bereits zum nächsten Handelstag.
        private bool TryGetSession(DateTime t, out Sess s, out DateTime day)
        {
            int m = t.Hour * 60 + t.Minute;

            if (m >= RthStartMin && m < RthEndMin)
            {
                s = Sess.Rth;
                day = t.Date;
                return true;
            }

            if (m >= AsiaStartMin)
            {
                s = Sess.Asia;
                day = NextTradingDay(t.Date);
                return true;
            }

            if (m < LondonStartMin)
            {
                s = Sess.Asia;
                day = t.Date;
                return true;
            }

            if (m >= LondonStartMin && m < RthStartMin)
            {
                s = Sess.London;
                day = t.Date;
                return true;
            }

            // 16:00–18:00: keine Session
            s = Sess.Rth;
            day = t.Date;
            return false;
        }

        private void GetSessionTimes(Sess s, DateTime day, out DateTime start, out DateTime end)
        {
            switch (s)
            {
                case Sess.Asia:
                    start = day.AddDays(-1).AddMinutes(AsiaStartMin);
                    end = day.AddMinutes(LondonStartMin);
                    break;
                case Sess.London:
                    start = day.AddMinutes(LondonStartMin);
                    end = day.AddMinutes(RthStartMin);
                    break;
                default:
                    start = day.AddMinutes(RthStartMin);
                    end = day.AddMinutes(RthEndMin);
                    break;
            }
        }

        private static DateTime NextTradingDay(DateTime d)
        {
            DateTime n = d.Date.AddDays(1);
            while (n.DayOfWeek == DayOfWeek.Saturday || n.DayOfWeek == DayOfWeek.Sunday)
                n = n.AddDays(1);
            return n;
        }

        private static DateTime PrevTradingDay(DateTime d)
        {
            DateTime p = d.Date.AddDays(-1);
            while (p.DayOfWeek == DayOfWeek.Saturday || p.DayOfWeek == DayOfWeek.Sunday)
                p = p.AddDays(-1);
            return p;
        }

        private bool IsEnabled(Sess s)
        {
            switch (s)
            {
                case Sess.Asia: return ShowAsia;
                case Sess.London: return ShowLondon;
                default: return ShowRth;
            }
        }

        private Color GetColor(Sess s)
        {
            switch (s)
            {
                case Sess.Asia: return AsiaColor;
                case Sess.London: return LondonColor;
                default: return RthColor;
            }
        }

        private static string GetName(Sess s)
        {
            switch (s)
            {
                case Sess.Asia: return "Asien";
                case Sess.London: return "London";
                default: return "NY";
            }
        }
    }
}
