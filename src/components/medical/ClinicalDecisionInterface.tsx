import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Search, 
  TestTube2, 
  Stethoscope,
  ClipboardList,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileText,
  Brain
} from "lucide-react";

interface ClinicalDecisionProps {
  onDecision: (decision: any) => void;
  patientCondition: string;
}

const ClinicalDecisionInterface = ({ onDecision, patientCondition }: ClinicalDecisionProps) => {
  const [activeTab, setActiveTab] = useState("history");
  const [clinicalNotes, setClinicalNotes] = useState("");
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [historyQuestions, setHistoryQuestions] = useState<string[]>([]);

  // Sample clinical data - in production this would be dynamic
  const historyOptions = [
    { id: "onset", question: "When did the symptoms start?", category: "Timeline" },
    { id: "triggers", question: "Any specific triggers or activities?", category: "Triggers" },
    { id: "fever", question: "Any fever at home? How high?", category: "Associated" },
    { id: "appetite", question: "Changes in appetite or eating?", category: "Associated" },
    { id: "sleep", question: "Any changes in sleep patterns?", category: "Associated" },
    { id: "medications", question: "Any medications given at home?", category: "Medications" },
    { id: "allergies", question: "Known allergies to medications?", category: "Allergies" },
    { id: "medical", question: "Past medical history?", category: "Past Medical" }
  ];

  const examOptions = [
    { id: "general", name: "General Appearance", time: "2 min", findings: "Alert, in mild distress" },
    { id: "head", name: "HEENT Examination", time: "3 min", findings: "Normocephalic, PERRLA, no lymphadenopathy" },
    { id: "cardiac", name: "Cardiac Examination", time: "3 min", findings: "Regular rate, no murmurs" },
    { id: "pulmonary", name: "Pulmonary Examination", time: "4 min", findings: "Decreased breath sounds bilateral bases" },
    { id: "abdomen", name: "Abdominal Examination", time: "3 min", findings: "Soft, non-tender, no masses" },
    { id: "neurologic", name: "Neurologic Examination", time: "5 min", findings: "Grossly normal, age-appropriate" },
    { id: "skin", name: "Skin Examination", time: "2 min", findings: "Warm, flushed, no rash" },
    { id: "extremities", name: "Extremities", time: "2 min", findings: "No edema, normal perfusion" }
  ];

  const diagnosticTests = [
    { 
      id: "cbc", 
      name: "Complete Blood Count", 
      time: "30 min", 
      cost: "$85",
      category: "Laboratory",
      urgency: "routine"
    },
    { 
      id: "cmp", 
      name: "Comprehensive Metabolic Panel", 
      time: "30 min", 
      cost: "$95",
      category: "Laboratory",
      urgency: "routine"
    },
    { 
      id: "cxr", 
      name: "Chest X-Ray", 
      time: "15 min", 
      cost: "$150",
      category: "Imaging",
      urgency: "urgent"
    },
    { 
      id: "blood_culture", 
      name: "Blood Culture", 
      time: "48-72 hr", 
      cost: "$120",
      category: "Microbiology",
      urgency: "routine"
    },
    { 
      id: "rapid_strep", 
      name: "Rapid Strep Test", 
      time: "5 min", 
      cost: "$25",
      category: "Point of Care",
      urgency: "stat"
    },
    { 
      id: "flu_test", 
      name: "Influenza PCR", 
      time: "2 hr", 
      cost: "$75",
      category: "Microbiology",
      urgency: "urgent"
    }
  ];

  const handleHistoryQuestion = (questionId: string) => {
    if (!historyQuestions.includes(questionId)) {
      setHistoryQuestions([...historyQuestions, questionId]);
      // Simulate patient response
      onDecision({ type: "history", questionId });
    }
  };

  const handleExamination = (examId: string) => {
    if (!selectedExams.includes(examId)) {
      setSelectedExams([...selectedExams, examId]);
      onDecision({ type: "examination", examId });
    }
  };

  const handleDiagnosticTest = (testId: string) => {
    if (!selectedTests.includes(testId)) {
      setSelectedTests([...selectedTests, testId]);
      onDecision({ type: "diagnostic", testId });
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "stat": return "critical";
      case "urgent": return "warning";
      case "routine": return "normal";
      default: return "normal";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 text-primary mr-2" />
            Clinical Decision Making
          </CardTitle>
          <CardDescription>
            Conduct your clinical assessment. Each decision affects patient outcomes and your score.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="history" className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-1" />
                History
              </TabsTrigger>
              <TabsTrigger value="examination" className="flex items-center">
                <Stethoscope className="w-4 h-4 mr-1" />
                Physical Exam
              </TabsTrigger>
              <TabsTrigger value="diagnostics" className="flex items-center">
                <TestTube2 className="w-4 h-4 mr-1" />
                Diagnostics
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center">
                <FileText className="w-4 h-4 mr-1" />
                Notes
              </TabsTrigger>
            </TabsList>

            {/* History Taking */}
            <TabsContent value="history" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {["Timeline", "Associated", "Medications", "Past Medical"].map((category) => (
                  <Card key={category} className="bg-muted/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">{category}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {historyOptions
                        .filter(option => option.category === category)
                        .map((option) => (
                          <motion.div
                            key={option.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              variant={historyQuestions.includes(option.id) ? "default" : "outline"}
                              size="sm"
                              className="w-full justify-start text-left h-auto p-3"
                              onClick={() => handleHistoryQuestion(option.id)}
                              disabled={historyQuestions.includes(option.id)}
                            >
                              <div className="flex items-center w-full">
                                {historyQuestions.includes(option.id) ? (
                                  <CheckCircle2 className="w-4 h-4 mr-2 text-success" />
                                ) : (
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                )}
                                <span className="text-sm">{option.question}</span>
                              </div>
                            </Button>
                          </motion.div>
                        ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {historyQuestions.length > 0 && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Patient Responses</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {historyQuestions.map((qId, index) => (
                      <motion.div
                        key={qId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 bg-white rounded-lg border"
                      >
                        <p className="text-xs text-muted-foreground mb-1">
                          {historyOptions.find(h => h.id === qId)?.question}
                        </p>
                        <p className="text-sm text-foreground">
                          {/* Simulated patient responses */}
                          {qId === "onset" && "Started 3 days ago, gradually getting worse"}
                          {qId === "fever" && "Yes, up to 102°F (38.9°C) this morning"}
                          {qId === "appetite" && "Hasn't eaten much in the last 2 days"}
                          {qId === "medications" && "Gave children's Tylenol every 6 hours"}
                          {qId === "allergies" && "No known drug allergies"}
                          {qId === "triggers" && "No specific triggers, started after playing outside"}
                          {qId === "sleep" && "Waking up coughing at night"}
                          {qId === "medical" && "Generally healthy, all vaccines up to date"}
                        </p>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Physical Examination */}
            <TabsContent value="examination" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {examOptions.map((exam) => (
                  <motion.div
                    key={exam.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all ${
                        selectedExams.includes(exam.id) 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => handleExamination(exam.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">{exam.name}</h4>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{exam.time}</span>
                            {selectedExams.includes(exam.id) && (
                              <CheckCircle2 className="w-4 h-4 text-success" />
                            )}
                          </div>
                        </div>
                        {selectedExams.includes(exam.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="text-xs text-muted-foreground p-2 bg-muted/30 rounded"
                          >
                            <strong>Findings:</strong> {exam.findings}
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Diagnostic Tests */}
            <TabsContent value="diagnostics" className="space-y-4">
              <div className="grid gap-4">
                {["Point of Care", "Laboratory", "Imaging", "Microbiology"].map((category) => (
                  <Card key={category} className="bg-muted/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center">
                        <TestTube2 className="w-4 h-4 mr-2" />
                        {category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {diagnosticTests
                        .filter(test => test.category === category)
                        .map((test) => (
                          <motion.div
                            key={test.id}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <Card 
                              className={`cursor-pointer transition-all ${
                                selectedTests.includes(test.id) 
                                  ? 'border-primary bg-primary/5' 
                                  : 'hover:border-primary/50'
                              }`}
                              onClick={() => handleDiagnosticTest(test.id)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <h4 className="font-medium text-sm">{test.name}</h4>
                                    <div className="flex items-center space-x-4 mt-1">
                                      <div className="flex items-center">
                                        <Clock className="w-3 h-3 text-muted-foreground mr-1" />
                                        <span className="text-xs text-muted-foreground">{test.time}</span>
                                      </div>
                                      <span className="text-xs text-muted-foreground">{test.cost}</span>
                                      <Badge 
                                        variant="outline" 
                                        className={`text-xs bg-${getUrgencyColor(test.urgency)}/10 text-${getUrgencyColor(test.urgency)} border-${getUrgencyColor(test.urgency)}/20`}
                                      >
                                        {test.urgency}
                                      </Badge>
                                    </div>
                                  </div>
                                  {selectedTests.includes(test.id) && (
                                    <CheckCircle2 className="w-5 h-5 text-success ml-2" />
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedTests.length > 0 && (
                <Card className="bg-warning/5 border-warning/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center">
                      <AlertCircle className="w-4 h-4 text-warning mr-2" />
                      Pending Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedTests.map((testId) => {
                        const test = diagnosticTests.find(t => t.id === testId);
                        return (
                          <div key={testId} className="flex items-center justify-between p-2 bg-white rounded border">
                            <span className="text-sm">{test?.name}</span>
                            <span className="text-xs text-muted-foreground">
                              Results in {test?.time}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Clinical Notes */}
            <TabsContent value="notes" className="space-y-4">
              <Card className="bg-gradient-card border-0">
                <CardHeader>
                  <CardTitle className="text-sm">Clinical Documentation</CardTitle>
                  <CardDescription>
                    Document your clinical reasoning and observations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Enter your clinical notes, differential diagnosis, and treatment plan..."
                    className="min-h-32"
                    value={clinicalNotes}
                    onChange={(e) => setClinicalNotes(e.target.value)}
                  />
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Assessment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-primary">{historyQuestions.length}</div>
                      <div className="text-xs text-muted-foreground">History Items</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-primary">{selectedExams.length}</div>
                      <div className="text-xs text-muted-foreground">Examinations</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-primary">{selectedTests.length}</div>
                      <div className="text-xs text-muted-foreground">Tests Ordered</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicalDecisionInterface;