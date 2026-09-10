import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle, Sun } from "lucide-react";

interface InsightsProps {
  data: {
    forecast: Array<{ month: string; consumption: number; generation: number }>;
    anomalies: Array<{ date: string; severity: string; description: string }>;
    generation: Array<{ hour: string; generation: number }>;
  };
}

export function InsightsPanel({ data }: InsightsProps) {
  const maxGeneration = Math.max(...data.generation.map((g) => g.generation));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="shadow-lg border-blue-200/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            AI Consumption Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {data.forecast.map((item) => (
              <div key={item.month} className="flex items-center gap-3">
                <span className="w-10 text-xs font-medium text-slate-600">{item.month}</span>
                <div className="flex-1 h-6 rounded bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded"
                    style={{ width: `${(item.consumption / 800) * 100}%` }}
                  />
                </div>
                <span className="w-12 text-xs text-right text-slate-600">{item.consumption} kWh</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-amber-200/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            Anomaly Detection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.anomalies.map((anomaly) => (
              <div key={anomaly.date} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">{anomaly.date}</span>
                  <Badge
                    className={
                      anomaly.severity === "High"
                        ? "bg-red-100 text-red-700"
                        : anomaly.severity === "Medium"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-blue-100 text-blue-700"
                    }
                  >
                    {anomaly.severity}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600">{anomaly.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-emerald-200/60 md:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
            <Sun className="h-5 w-5 text-emerald-600" />
            Predicted Solar Generation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-1 h-32">
            {data.generation.map((item) => (
              <div key={item.hour} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-gradient-to-t from-amber-400 to-orange-500 rounded-t"
                  style={{ height: `${(item.generation / maxGeneration) * 100}%` }}
                />
                {parseInt(item.hour) % 4 === 0 && (
                  <span className="text-[10px] text-slate-500">{item.hour}</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}