import { useState } from "react";
import { SolarCalculator } from "@/components/SolarCalculator";
import { RecommendationCard } from "@/components/RecommendationCard";
import { InsightsPanel } from "@/components/InsightsPanel";
import { Button } from "@/components/ui/button";
import { Sun, Leaf, Zap, TrendingUp } from "lucide-react";

export default function App() {
  const [recommendation, setRecommendation] = useState<any>(null);
  const [insights, setInsights] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50/50 to-emerald-50/30">
      <header className="border-b border-amber-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Sun className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Smart Solar AI</h1>
              <p className="text-xs text-slate-500">Intelligent Solar & Battery Sizing</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
              <Leaf className="h-4 w-4" />
              Eco Optimized
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <SolarCalculator onRecommend={setRecommendation} onInsights={setInsights} />
          </div>
          <div className="lg:col-span-2 space-y-6">
            {recommendation ? (
              <>
                <RecommendationCard data={recommendation} />
                {insights && <InsightsPanel data={insights} />}
              </>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center max-w-md">
                  <div className="h-20 w-20 mx-auto rounded-2xl bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center mb-6">
                    <Zap className="h-10 w-10 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-3">Get Your Solar Recommendation</h2>
                  <p className="text-slate-600 mb-6">
                    Enter your details to receive a personalized solar + battery system design with savings estimates and environmental impact.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { icon: TrendingUp, label: "AI Forecasts" },
                      { icon: Zap, label: "Smart Sizing" },
                      { icon: Leaf, label: "CO₂ Savings" },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="p-4 rounded-xl bg-white shadow-sm border border-amber-100">
                        <Icon className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                        <p className="text-xs font-medium text-slate-600">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}