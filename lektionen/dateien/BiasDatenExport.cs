using System;
using System.Globalization;
using System.IO;
using System.Text;
using cAlgo.API;

namespace cAlgo.Robots
{
    // Exportiert Kerzen (Standard: US 500, M15) als CSV für den Bias-Trainer.
    // Zeitstempel in New-Yorker Zeit inkl. Sommer-/Winterzeit, unabhängig von der Chart-Zeitzone.
    // Läuft einmal beim Start, schreibt die Datei und stoppt sich selbst.
    [Robot(TimeZone = TimeZones.EasternStandardTime, AccessRights = AccessRights.FullAccess)]
    public class BiasDatenExport : Robot
    {
        [Parameter("Symbol", DefaultValue = "US 500")]
        public string ExportSymbol { get; set; }

        [Parameter("Zeiteinheit", DefaultValue = "Minute15")]
        public TimeFrame ExportTimeFrame { get; set; }

        [Parameter("Monate zurück", DefaultValue = 6, MinValue = 1, MaxValue = 36)]
        public int MonthsBack { get; set; }

        [Parameter("Zielordner (leer = Dokumente/BiasTrainer)", DefaultValue = "")]
        public string TargetFolder { get; set; }

        protected override void OnStart()
        {
            try
            {
                Bars bars = MarketData.GetBars(ExportTimeFrame, ExportSymbol);
                DateTime from = Server.Time.AddMonths(-MonthsBack);

                // Historie nachladen, bis der gewünschte Zeitraum abgedeckt ist
                int rounds = 0;
                while (bars.Count > 0 && bars.OpenTimes[0] > from && rounds < 1000)
                {
                    int loaded = bars.LoadMoreHistory();
                    if (loaded <= 0)
                        break;
                    rounds++;
                }

                if (bars.Count < 2)
                {
                    Print("Keine Kerzen für {0} gefunden. Symbolname prüfen.", ExportSymbol);
                    Stop();
                    return;
                }

                if (bars.OpenTimes[0] > from)
                    Print("Hinweis: Broker liefert Daten erst ab {0:yyyy-MM-dd}. Exportiert wird ab dort.", bars.OpenTimes[0]);

                string folder = string.IsNullOrWhiteSpace(TargetFolder)
                    ? Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), "BiasTrainer")
                    : TargetFolder.Trim();
                Directory.CreateDirectory(folder);

                var inv = CultureInfo.InvariantCulture;
                var sb = new StringBuilder();
                sb.AppendLine("Zeit_NY,Open,High,Low,Close,Volumen");

                int count = 0;
                DateTime first = DateTime.MinValue, last = DateTime.MinValue;

                // Letzte Kerze auslassen, weil sie noch nicht abgeschlossen ist
                for (int i = 0; i < bars.Count - 1; i++)
                {
                    DateTime t = bars.OpenTimes[i];
                    if (t < from)
                        continue;

                    sb.Append(t.ToString("yyyy-MM-dd HH:mm", inv)).Append(',')
                      .Append(bars.OpenPrices[i].ToString(inv)).Append(',')
                      .Append(bars.HighPrices[i].ToString(inv)).Append(',')
                      .Append(bars.LowPrices[i].ToString(inv)).Append(',')
                      .Append(bars.ClosePrices[i].ToString(inv)).Append(',')
                      .Append(bars.TickVolumes[i].ToString(inv))
                      .AppendLine();

                    if (count == 0) first = t;
                    last = t;
                    count++;
                }

                string safeSymbol = ExportSymbol.Replace(" ", "").Replace("/", "");
                string fileName = string.Format(inv, "{0}_{1}_{2:yyyyMMdd}_{3:yyyyMMdd}.csv",
                    safeSymbol, ExportTimeFrame, first, last);
                string path = Path.Combine(folder, fileName);

                File.WriteAllText(path, sb.ToString(), new UTF8Encoding(false));

                Print("Fertig: {0} Kerzen von {1:yyyy-MM-dd HH:mm} bis {2:yyyy-MM-dd HH:mm} (NY-Zeit).", count, first, last);
                Print("Datei: {0}", path);
            }
            catch (Exception ex)
            {
                Print("Export fehlgeschlagen: {0}", ex.Message);
            }

            Stop();
        }
    }
}
