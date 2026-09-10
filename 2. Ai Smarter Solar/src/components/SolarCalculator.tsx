import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Sun, Home, Battery, Wrench } from "lucide-react";

interface SolarCalculatorProps {
  onRecommend: (data: any) => void;
  onInsights: (data: any) => void;
}

export function SolarCalculator({ onRecommend, onInsights }: SolarCalculatorProps) {
  const [formData, setFormData] = useState({
    location: "San Francisco",
    monthlyBill: 250,
    roofArea: 500,
    backupHours: 4,
    criticalLoad: 2,
    hasEV: false,
    hasAC: true,
    hasPool: false,
  });

  const [loading, setLoading] = useState(false);

  const calculateRecommendation = () => {
    setLoading(true);
    setTimeout(() => {
      const annualConsumption = formData.monthlyBill * 12 * 0.8; // kWh (assuming $0.25/kWh)
      const peakSunHours = 5.2;
      const systemEfficiency = 0.8;
      const solarCapacity = (annualConsumption / 365) / (peakSunHours * systemEfficiency);
      const batteryCapacity = formData.backupHours * formData.criticalLoad * 1.2;
      const inverterSize = Math.max(formData.criticalLoad * 1.5, 5);
      const panelsNeeded = Math.ceil(solarCapacity / 0.4);
      const totalCost = solarCapacity * 1200 + batteryCapacity * 500 + inverterSize * 300;
      const annualSavings = formData.monthlyBill * 12 * 0.9;
      const paybackYears = totalCost / annualSavings;
      const co2Reduction = annualConsumption * 0.7;

      onRecommend({
        solarCapacity: Math.round(solarCapacity * 10) / 10,
        batteryCapacity: Math.round(batteryCapacity * 10) / 10,
        inverterSize: Math.round(inverterSize * 10) / 10,
        panelsNeeded,
        totalCost: Math.round(totalCost),
        annualSavings: Math.round(annualSavings),
        paybackYears: Math.round(paybackYears * 10) / 10,
        co2Reduction: Math.round(co2Reduction),
        monthlyBill: formData.monthlyBill,
        location: formData.location,
      });

      onInsights({
        forecast: generateForecast(),
        anomalies: generateAnomalies(),
        generation: generateGeneration(),
      });

      setLoading(false);
    }, 1500);
  };

  const generateForecast = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.map((month, i) => ({
      month,
      consumption: Math.round(600 + Math.sin(i / 2) * 150 + Math.random() * 50),
      generation: Math.round(500 + Math.cos(i / 2.5) * 200 + Math.random() * 50),
    }));
  };

  const generateAnomalies = () => [
    { date: "Mar 12", severity: "High", description: "Unusual consumption spike detected (2.3x normal)" },
    { date: "Feb 28", severity: "Medium", description: "Night-time usage above expected baseline" },
    { date: "Feb 15", severity: "Low", description: "Minor deviation in morning consumption pattern" },
  ];

  const generateGeneration = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return hours.map((hour) => ({
      hour: `${hour}:00`,
      generation: Math.max(0, Math.sin((hour - 6) / 12 * Math.PI) * 3.5 + Math.random() * 0.3),
    }));
  };

  return (
    <Card className="shadow-xl border-amber-200/60 bg-white/90 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-t-xl">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Home className="h-5 w-5" />
          System Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-slate-700">Location</Label>
          <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="San Francisco">San Francisco, CA</SelectItem>
              <SelectItem value="Los Angeles">Los Angeles, CA</SelectItem>
              <SelectItem value="Phoenix">Phoenix, AZ</SelectItem>
              <SelectItem value="Austin">Austin, TX</SelectItem>
              <SelectItem value="Miami">Miami, FL</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-slate-700">Monthly Electricity Bill ($)</Label>
          <Input
            type="number"
            value={formData.monthlyBill}
            onChange={(e) => setFormData({ ...formData, monthlyBill: Number(e.target.value) })}
            className="border-amber-200 focus:border-amber-400"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-slate-700">Roof Area (sq ft)</Label>
          <Input
            type="number"
            value={formData.roofArea}
            onChange={(e) => setFormData({ ...formData, roofArea: Number(e.target.value) })}
            className="border-amber-200 focus:border-amber-400"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-slate-700">Backup Hours Needed</Label>
          <Slider
            value={[formData.backupHours]}
            onValueChange={(value) => setFormData({ ...formData, backupHours: value[0] })}
            max={12}
            min={1}
            step={1}
            className="[&_[role=slider]]:bg-amber-500"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>1h</span>
            <span className="font-medium text-amber-600">{formData.backupHours}h</span>
            <span>12h</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-slate-700">Critical Load (kW)</Label>
          <Slider
            value={[formData.criticalLoad]}
            onValueChange={(value) => setFormData({ ...formData, criticalLoad: value[0] })}
            max={10}
            min={1}
            step={0.5}
            className="[&_[role=slider]]:bg-amber-500"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>1kW</span>
            <span className="font-medium text-amber-600">{formData.criticalLoad}kW</span>
            <span>10kW</span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <Label className="text-sm font-medium text-slate-700">Additional Loads</Label>
          <div className="space-y-2">
            {[
              { key: "hasEV", label: "Electric Vehicle" },
              { key: "hasAC", label: "Air Conditioning" },
              { key: "hasPool", label: "Pool Pump" },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-sm text-slate-700">{label}</span>
                <Switch
                  checked={formData[key as keyof typeof formData] as boolean}
                  onCheckedChange={(checked) => setFormData({ ...formData, [key]: checked })}
                  className="data-[state=checked]:bg-amber-500"
                />
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={calculateRecommendation}
          disabled={loading}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-3 shadow-lg shadow-amber-500/30"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⚡</span>
              Analyzing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sun className="h-5 w-5" />
              Generate Recommendation
            </span>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}