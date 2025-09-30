import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { 
  Heart, 
  Thermometer, 
  Activity, 
  Droplets,
  Zap,
  TrendingUp,
  AlertTriangle,
  Eye,
  EyeOff
} from "lucide-react";

interface VitalSigns {
  heartRate: number;
  bloodPressure: { systolic: number; diastolic: number };
  respiratory: number;
  temperature: number;
  oxygenSat: number;
  painScore: number;
}

interface VitalTrend {
  time: string;
  heartRate: number;
  oxygenSat: number;
  temperature: number;
}

interface VitalSignsMonitorProps {
  patient: {
    name: string;
    age: string;
    condition: "stable" | "uncomfortable" | "distressed" | "critical";
  };
    // vitals: VitalSigns;
  isActive: boolean;
}

const VitalSignsMonitor = ({ patient, isActive }: VitalSignsMonitorProps) => {
  const [vitals, setVitals] = useState<VitalSigns>({
    heartRate: 125,
    bloodPressure: { systolic: 95, diastolic: 60 },
    respiratory: 28,
    temperature: 38.9,
    oxygenSat: 94,
    painScore: 4
  });

  const [trendData, setTrendData] = useState<VitalTrend[]>([
    { time: "10:00", heartRate: 130, oxygenSat: 92, temperature: 39.1 },
    { time: "10:05", heartRate: 128, oxygenSat: 93, temperature: 39.0 },
    { time: "10:10", heartRate: 125, oxygenSat: 94, temperature: 38.9 },
  ]);

  const [showECGWave, setShowECGWave] = useState(true);
  const [alarmsMuted, setAlarmsMuted] = useState(false);

  // Simulate real-time vital sign changes
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setVitals(prev => ({
        ...prev,
        heartRate: prev.heartRate + (Math.random() - 0.5) * 4,
        oxygenSat: Math.max(90, Math.min(100, prev.oxygenSat + (Math.random() - 0.5) * 2)),
        respiratory: Math.max(20, Math.min(35, prev.respiratory + (Math.random() - 0.5) * 2)),
        temperature: Math.max(36, Math.min(42, prev.temperature + (Math.random() - 0.5) * 0.2))
      }));

      // Add new trend data point every 5 seconds
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      });

      setTrendData(prev => {
        const newData = [...prev, {
          time: timeString,
          heartRate: vitals.heartRate,
          oxygenSat: vitals.oxygenSat,
          temperature: vitals.temperature
        }];
        return newData.slice(-10); // Keep last 10 data points
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isActive, vitals.heartRate, vitals.oxygenSat, vitals.temperature]);

  const getVitalStatus = (vital: string, value: number) => {
    switch (vital) {
      case "heartRate":
        if (value > 140 || value < 50) return "critical";
        if (value > 120 || value < 60) return "elevated";
        return "normal";
      case "respiratory":
        if (value > 35 || value < 12) return "critical";
        if (value > 28 || value < 16) return "elevated";
        return "normal";
      case "oxygenSat":
        if (value < 88) return "critical";
        if (value < 95) return "elevated";
        return "normal";
      case "temperature":
        if (value > 40 || value < 35) return "critical";
        if (value > 38.5 || value < 36) return "elevated";
        return "normal";
      default:
        return "normal";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "critical";
      case "elevated": return "warning";
      case "normal": return "normal";
      default: return "normal";
    }
  };

  const ECGWaveform = () => (
    <div className="h-16 bg-monitor-bg rounded-lg p-2 overflow-hidden relative">
      <svg className="w-full h-full" viewBox="0 0 400 60">
        <motion.path
          d="M0,30 L50,30 L55,10 L60,50 L65,30 L70,30 L400,30"
          stroke="hsl(var(--monitor-green))"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      <div className="absolute top-1 right-2 text-xs text-monitor-green">
        ECG Lead II
      </div>
    </div>
  );

  const PainScale = () => (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>No Pain</span>
        <span>Worst Pain</span>
      </div>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
          <div
            key={level}
            className={`w-6 h-6 rounded-full text-xs flex items-center justify-center text-white ${
              level <= vitals.painScore
                ? level <= 3 ? "bg-normal" : level <= 6 ? "bg-warning" : "bg-critical"
                : "bg-muted"
            }`}
          >
            {level}
          </div>
        ))}
      </div>
      <div className="text-center">
        <span className="text-sm font-medium">Pain Score: {vitals.painScore}/10</span>
      </div>
    </div>
  );

  return (
    <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
      {/* Medical Cart Base */}
      <div className="relative">
        {/* Cart Shadow */}
        <div className="absolute -bottom-2 left-2 right-2 h-3 bg-black/20 blur-sm rounded-full transform rotate-1"></div>
        
        {/* Medical Cart Surface */}
        <div className="bg-gradient-to-br from-stone-100 to-stone-200 p-4 rounded-2xl shadow-2xl border border-stone-300/50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-stone-50 to-stone-100 p-2 rounded-xl mb-3 border border-stone-200/70">
            <div className="text-xs text-stone-600 font-medium text-center">Medical Cart • Station 01</div>
          </div>
          
          {/* Monitor Screen Container */}
          <div className="relative bg-slate-800 p-4 rounded-xl shadow-inner border-2 border-slate-700">
            {/* Screen Bezel */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl"></div>
            <div className="absolute inset-2 bg-black rounded-lg"></div>
            
            {/* Screen Content */}
            <div className="relative z-10 space-y-3">
              {/* Monitor Header */}
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 text-sm font-medium">Patient Monitor</span>
                </div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>

              {/* Vital Signs Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Heart Rate */}
                <motion.div
                  animate={{
                    scale: getVitalStatus("heartRate", vitals.heartRate) === "critical" ? [1, 1.02, 1] : 1
                  }}
                  transition={{ duration: 1, repeat: getVitalStatus("heartRate", vitals.heartRate) === "critical" ? Infinity : 0 }}
                  className="bg-emerald-900/30 p-3 rounded-lg border border-emerald-500/20"
                >
                  <div className="flex items-center justify-center mb-1">
                    <Heart className={`w-4 h-4 ${getVitalStatus("heartRate", vitals.heartRate) === "critical" ? "text-red-400" : getVitalStatus("heartRate", vitals.heartRate) === "elevated" ? "text-amber-400" : "text-emerald-400"}`} />
                  </div>
                  <div className={`text-lg font-bold text-center ${getVitalStatus("heartRate", vitals.heartRate) === "critical" ? "text-red-400" : getVitalStatus("heartRate", vitals.heartRate) === "elevated" ? "text-amber-400" : "text-emerald-400"}`}>
                    {Math.round(vitals.heartRate)}
                  </div>
                  <div className="text-xs text-emerald-300/70 text-center">HR</div>
                </motion.div>

                {/* Oxygen Saturation */}
                <motion.div
                  animate={{
                    scale: getVitalStatus("oxygenSat", vitals.oxygenSat) === "critical" ? [1, 1.02, 1] : 1
                  }}
                  transition={{ duration: 1.5, repeat: getVitalStatus("oxygenSat", vitals.oxygenSat) === "critical" ? Infinity : 0 }}
                  className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/20"
                >
                  <div className="flex items-center justify-center mb-1">
                    <Zap className={`w-4 h-4 ${getVitalStatus("oxygenSat", vitals.oxygenSat) === "critical" ? "text-red-400" : getVitalStatus("oxygenSat", vitals.oxygenSat) === "elevated" ? "text-amber-400" : "text-blue-400"}`} />
                  </div>
                  <div className={`text-lg font-bold text-center ${getVitalStatus("oxygenSat", vitals.oxygenSat) === "critical" ? "text-red-400" : getVitalStatus("oxygenSat", vitals.oxygenSat) === "elevated" ? "text-amber-400" : "text-blue-400"}`}>
                    {Math.round(vitals.oxygenSat)}%
                  </div>
                  <div className="text-xs text-blue-300/70 text-center">SpO₂</div>
                </motion.div>

                {/* Blood Pressure */}
                <div className="bg-amber-900/30 p-3 rounded-lg border border-amber-500/20">
                  <div className="flex items-center justify-center mb-1">
                    <Droplets className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-sm font-bold text-amber-400 text-center">
                    {vitals.bloodPressure.systolic}/{vitals.bloodPressure.diastolic}
                  </div>
                  <div className="text-xs text-amber-300/70 text-center">BP</div>
                </div>

                {/* Temperature */}
                <motion.div
                  animate={{
                    scale: getVitalStatus("temperature", vitals.temperature) === "critical" ? [1, 1.02, 1] : 1
                  }}
                  transition={{ duration: 2, repeat: getVitalStatus("temperature", vitals.temperature) === "critical" ? Infinity : 0 }}
                  className="bg-orange-900/30 p-3 rounded-lg border border-orange-500/20"
                >
                  <div className="flex items-center justify-center mb-1">
                    <Thermometer className={`w-4 h-4 ${getVitalStatus("temperature", vitals.temperature) === "critical" ? "text-red-400" : getVitalStatus("temperature", vitals.temperature) === "elevated" ? "text-amber-400" : "text-orange-400"}`} />
                  </div>
                  <div className={`text-sm font-bold text-center ${getVitalStatus("temperature", vitals.temperature) === "critical" ? "text-red-400" : getVitalStatus("temperature", vitals.temperature) === "elevated" ? "text-amber-400" : "text-orange-400"}`}>
                    {vitals.temperature.toFixed(1)}°C
                  </div>
                  <div className="text-xs text-orange-300/70 text-center">TEMP</div>
                </motion.div>
              </div>

              {/* ECG Waveform */}
              {showECGWave && (
                <div className="bg-black/50 rounded-lg p-2 border border-emerald-500/20">
                  <div className="h-12 overflow-hidden relative">
                    <svg className="w-full h-full" viewBox="0 0 200 40">
                      <motion.path
                        d="M0,20 L25,20 L28,8 L30,32 L32,20 L35,20 L200,20"
                        stroke="#10b981"
                        strokeWidth="1.5"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                    </svg>
                    <div className="absolute top-1 right-2 text-xs text-emerald-400/80">
                      ECG
                    </div>
                  </div>
                </div>
              )}

              {/* Status Indicators */}
              <div className="flex justify-between items-center pt-2 border-t border-slate-700">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${patient.condition === "critical" ? "bg-red-400 animate-pulse" : patient.condition === "distressed" ? "bg-amber-400" : "bg-emerald-400"}`}></div>
                  <span className="text-xs text-slate-300 capitalize">{patient.condition}</span>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowECGWave(!showECGWave)}
                    className="h-6 w-6 p-0 text-slate-400 hover:text-emerald-400 hover:bg-emerald-900/20"
                  >
                    {showECGWave ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setAlarmsMuted(!alarmsMuted)}
                    className={`h-6 w-6 p-0 text-slate-400 hover:text-emerald-400 hover:bg-emerald-900/20 ${alarmsMuted ? 'text-red-400' : ''}`}
                  >
                    <span className="text-xs">{alarmsMuted ? "🔇" : "🔊"}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Base Details */}
          <div className="mt-3 flex justify-between items-center">
            <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg"></div>
            <div className="text-xs text-stone-600">STA-01</div>
            <div className="w-3 h-3 bg-stone-300 rounded-full"></div>
          </div>
        </div>

        {/* Critical Alert Overlay */}
        {!alarmsMuted && (getVitalStatus("heartRate", vitals.heartRate) === "critical" || 
         getVitalStatus("oxygenSat", vitals.oxygenSat) === "critical") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -top-8 left-0 right-0 bg-red-500/90 text-white text-xs font-bold text-center py-1 px-2 rounded-full shadow-lg border border-red-400"
          >
            <div className="flex items-center justify-center space-x-1">
              <AlertTriangle className="w-3 h-3 animate-pulse" />
              <span>CRITICAL</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VitalSignsMonitor;