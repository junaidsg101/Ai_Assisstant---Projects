import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sun, Battery, Zap, DollarSign, Leaf, Clock, Download } from "lucide-react";

interface RecommendationProps {
  data: {
    solarCapacity: number;
    batteryCapacity: number;
    inverterSize: number;
    panelsNeeded: number;
    totalCost: number;
    annualSavings: number;
    paybackYears: number;
    co2Reduction: number;
    monthlyBill: number;
    location: string;
  };
}

export function RecommendationCard({ data }: RecommendationProps) {
  const stats = [
    { icon: Sun, label: "Solar Capacity", value: `${data.solarCapacity} kW`, color: "bg-amber-100 text-amber-700" },
    { icon: Battery, label: "Battery Storage", value: `${data.batteryCapacity} kWh`, color: "bg-emerald-100 text-emerald-700" },
    { icon: Zap, label: "Inverter Size", value: `${data.inverterSize} kW`, color: "bg-blue-100 text-blue-700" },
    { icon: DollarSign, label: "Total Investment", value: `$${data.totalCost.toLocaleString()}`, color: "bg-purple-100 text-purple-700" },
  ];

  return (
    <Card className="shadow-xl border-emerald-200/60 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Recommended System Design</CardTitle>
            <p className="text-sm text-emerald-100 mt-1">{data.location} · Optimized for your needs</p>
          </div>
          <Badge className="bg-white/20 text-white border-white/30">
            {data.panelsNeeded} panels
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className={`h-10 w-10 rounded-lg ${color} flex items-center justify-center mb-3`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-xs text-slate-500 mb-1">{label}</p>
              <p className="text-lg font-bold text-slate-800">{value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-emerald-800">Annual Savings</span>
              <span className="text-2xl font-bold text-emerald-600">${data.annualSavings.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Payback Period</span>
              <span className="text-sm font-semibold text-slate-800">{data.paybackYears} years</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
            <Leaf className="h-8 w-8 text-amber-600" />
            <div>
              <p className="text-sm font-semibold text-amber-800">CO₂ Reduction</p>
              <p className="text-lg font-bold text-amber-700">{data.co2Reduction.toLocaleString()} kg/year</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
            <Button variant="outline" className="flex-1 border-emerald-300 text-emerald-700 hover:bg-emerald-50">
              <Clock className="h-4 w-4 mr-2" />
              Schedule Consult
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}