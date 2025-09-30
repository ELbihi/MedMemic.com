import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Baby, Eye, Smile, Meh, Frown } from "lucide-react";

interface PatientState {
  condition: "stable" | "uncomfortable" | "distressed" | "critical";
  alertness: "alert" | "lethargic" | "unconscious";
  skinColor: "normal" | "pale" | "flushed" | "cyanotic";
  breathingPattern: "normal" | "labored" | "shallow" | "irregular";
  activity: "active" | "restless" | "quiet" | "limp";
}

interface PatientVisualizationProps {
  patient: {
    name: string;
    age: string;
    gender: string;
  };
  vitals: {
    heartRate: number;
    respiratory: number;
    oxygenSat: number;
    temperature: number;
  };
  onBodyPartClick: (bodyPart: string) => void;
}

const PatientVisualization = ({
  patient,
  vitals,
  onBodyPartClick,
}: PatientVisualizationProps) => {
  const [patientState, setPatientState] = useState<PatientState>({
    condition: "uncomfortable",
    alertness: "alert",
    skinColor: "flushed",
    breathingPattern: "labored",
    activity: "restless",
  });
  const [hoveredBodyPart, setHoveredBodyPart] = useState<string | null>(null);

  // Update patient state based on vitals
  useEffect(() => {
    const newState: PatientState = {
      condition: "stable",
      alertness: "alert",
      skinColor: "normal",
      breathingPattern: "normal",
      activity: "active",
    };

    if (
      vitals.oxygenSat < 88 ||
      vitals.heartRate > 150 ||
      vitals.temperature > 40
    ) {
      newState.condition = "critical";
      newState.alertness = "lethargic";
      newState.activity = "limp";
    } else if (
      vitals.oxygenSat < 95 ||
      vitals.heartRate > 130 ||
      vitals.respiratory > 30
    ) {
      newState.condition = "distressed";
      newState.activity = "restless";
    } else if (vitals.temperature > 38.5 || vitals.heartRate > 110) {
      newState.condition = "uncomfortable";
    }

    if (vitals.oxygenSat < 92) {
      newState.skinColor = "cyanotic";
    } else if (vitals.temperature > 38.5) {
      newState.skinColor = "flushed";
    } else if (vitals.temperature < 36.5) {
      newState.skinColor = "pale";
    }

    if (vitals.respiratory > 30) {
      newState.breathingPattern = "labored";
    } else if (vitals.respiratory < 16) {
      newState.breathingPattern = "shallow";
    }

    setPatientState(newState);
  }, [vitals]);

  // Top-down body parts for realistic patient overlay (percentage-based positioning)
  const topDownBodyParts = [
    { id: "head", label: "Head/HEENT", x: 42, y: 8, width: 16, height: 18 },
    { id: "neck", label: "Neck", x: 45, y: 26, width: 10, height: 8 },
    { id: "chest", label: "Chest/Lungs", x: 35, y: 34, width: 30, height: 30 },
    { id: "leftArm", label: "Left Arm", x: 25, y: 35, width: 8, height: 28 },
    { id: "rightArm", label: "Right Arm", x: 67, y: 35, width: 8, height: 28 },
    { id: "abdomen", label: "Abdomen", x: 40, y: 64, width: 20, height: 15 },
    { id: "leftLeg", label: "Left Leg", x: 35, y: 79, width: 12, height: 18 },
    { id: "rightLeg", label: "Right Leg", x: 53, y: 79, width: 12, height: 18 },
  ];

  // Keep original bodyParts for compatibility
  const bodyParts = [
    { id: "head", label: "Head/HEENT", x: 110, y: 15, width: 120, height: 120 },
    { id: "neck", label: "Neck", x: 140, y: 130, width: 70, height: 35 },
    { id: "chest", label: "Chest/Lungs", x: 100, y: 160, width: 140, height: 120 },
    { id: "leftArm", label: "Left Arm", x: 50, y: 160, width: 40, height: 130 },
    { id: "rightArm", label: "Right Arm", x: 250, y: 160, width: 40, height: 130 },
    { id: "leftLeg", label: "Left Leg", x: 110, y: 280, width: 50, height: 160 },
    { id: "rightLeg", label: "Right Leg", x: 190, y: 280, width: 50, height: 160 },
  ];

  const getConditionColor = () => {
    switch (patientState.condition) {
      case "stable":
        return "#22c55e"; // green
      case "uncomfortable":
        return "#f59e0b"; // yellow
      case "distressed":
        return "#ef4444"; // red
      case "critical":
        return "#b91c1c"; // dark red
      default:
        return "#6b7280"; // gray
    }
  };

  const getSkinColor = () => {
    switch (patientState.skinColor) {
      case "normal":
        return "#fcd5b2"; // light peach
      case "pale":
        return "#e5e7eb"; // pale gray
      case "flushed":
        return "#fca5a5"; // pink/red
      case "cyanotic":
        return "#93c5fd"; // blueish
      default:
        return "#fcd5b2";
    }
  };

  const getFacialExpression = () => {
    switch (patientState.condition) {
      case "stable":
        return <Smile className="w-8 h-8 text-green-600" />;
      case "uncomfortable":
        return <Meh className="w-8 h-8 text-yellow-500" />;
      case "distressed":
      case "critical":
        return <Frown className="w-8 h-8 text-red-600" />;
      default:
        return <Meh className="w-8 h-8 text-gray-500" />;
    }
  };

  const getEyeExpression = () => {
    switch (patientState.alertness) {
      case "alert":
        return "👁️";
      case "lethargic":
        return "😐";
      case "unconscious":
        return "😵";
      default:
        return "👁️";
    }
  };

  // Top-down interactive overlay - simplified for realistic patient view
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Interactive body parts - positioned over the realistic patient image */}
      <div className="relative w-full h-full">
        {/* Hover tooltip */}
        <AnimatePresence>
          {hoveredBodyPart && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="absolute top-4 left-4 backdrop-blur-sm bg-stone-800/80 text-white text-sm px-3 py-2 rounded-xl shadow-xl pointer-events-none z-50 border border-white/20"
            >
              <Eye className="w-4 h-4 inline mr-2" />
              Examine {bodyParts.find((p) => p.id === hoveredBodyPart)?.label}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top-down body part zones adapted for realistic patient */}
        {topDownBodyParts.map((part) => (
          <div
            key={part.id}
            className={`absolute cursor-pointer transition-all duration-200 rounded-xl ${
              hoveredBodyPart === part.id
                ? "bg-blue-400/30 border-2 border-blue-500 shadow-lg"
                : "bg-transparent border-2 border-transparent hover:bg-blue-300/20"
            }`}
            style={{
              left: `${part.x}%`,
              top: `${part.y}%`,
              width: `${part.width}%`,
              height: `${part.height}%`,
            }}
            onMouseEnter={() => setHoveredBodyPart(part.id)}
            onMouseLeave={() => setHoveredBodyPart(null)}
            onClick={() => onBodyPartClick(part.id)}
          />
        ))}

        {/* Breathing animation overlay for chest area */}
        <motion.div
          className="absolute left-[40%] top-[40%] w-[20%] h-[25%] pointer-events-none"
          animate={{
            scale: patientState.breathingPattern === "labored" ? [1, 1.03, 1] : [1, 1.01, 1],
          }}
          transition={{
            duration: 60 / vitals.respiratory,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className={`w-full h-full rounded-full ${
            patientState.breathingPattern === "labored" 
              ? "bg-amber-400/20 border border-amber-500/30" 
              : "bg-emerald-400/10 border border-emerald-500/20"
          }`} />
        </motion.div>

        {/* Patient status indicator (bottom right) */}
        <div className="absolute bottom-4 right-4 backdrop-blur-sm bg-white/20 border border-white/30 rounded-xl p-2 shadow-lg">
          <div className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: getConditionColor() }}
            />
            <span className="text-xs font-semibold capitalize text-stone-800">
              {patientState.condition}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientVisualization;
