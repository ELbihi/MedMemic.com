// import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
// import { ChevronLeft, ChevronRight, Check, AlertCircle, Plus, Trash2, Clock, User, Heart, Activity, Thermometer, Droplets } from 'lucide-react';
// import { supabase } from '@/integrations/supabase/client';
// import { useAuth } from '@/hooks/useAuth';
// import { toast } from '@/hooks/use-toast';

// // Separate components for better performance
// const TextInput = React.memo(({ value, onChange, placeholder, error, ...props }) => (
//   <div>
//     <input
//       type="text"
//       value={value || ''}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder}
//       className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//       {...props}
//     />
//     {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
//   </div>
// ));

// const TextArea = React.memo(({ value, onChange, placeholder, error, rows = 3, ...props }) => (
//   <div>
//     <textarea
//       value={value || ''}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder}
//       rows={rows}
//       className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
//       {...props}
//     />
//     {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
//   </div>
// ));

// const SelectInput = React.memo(({ value, onChange, options, placeholder, error, ...props }) => (
//   <div>
//     <select
//       value={value || ''}
//       onChange={(e) => onChange(e.target.value)}
//       className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//       {...props}
//     >
//       {placeholder && <option value="">{placeholder}</option>}
//       {options.map((option) => (
//         <option key={option.value} value={option.value}>
//           {option.label}
//         </option>
//       ))}
//     </select>
//     {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
//   </div>
// ));

// // Learning Objective Item Component
// const LearningObjectiveItem = React.memo(({ objective, index, onUpdate, onRemove, canRemove }) => {
//   const handleChange = useCallback((field, value) => {
//     onUpdate(index, field, value);
//   }, [index, onUpdate]);

//   const handleRemove = useCallback(() => {
//     onRemove(index);
//   }, [index, onRemove]);

//   return (
//     <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
//       <div className="flex justify-between items-start mb-3">
//         <h4 className="font-medium text-gray-900">Learning Objective {index + 1}</h4>
//         {canRemove && (
//           <button
//             type="button"
//             onClick={handleRemove}
//             className="text-red-600 hover:text-red-800"
//           >
//             <Trash2 size={16} />
//           </button>
//         )}
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <SelectInput
//           value={objective.verb}
//           onChange={(value) => handleChange('verb', value)}
//           options={[
//             { value: 'Identify', label: 'Identify' },
//             { value: 'Perform', label: 'Perform' },
//             { value: 'Analyze', label: 'Analyze' },
//             { value: 'Evaluate', label: 'Evaluate' },
//             { value: 'Apply', label: 'Apply' }
//           ]}
//           placeholder="Select verb"
//         />
//         <div className="md:col-span-2">
//           <TextArea
//             value={objective.content}
//             onChange={(value) => handleChange('content', value)}
//             placeholder="What should students be able to do? (e.g., 'signs of respiratory distress in pediatric patients')"
//             rows={2}
//           />
//         </div>
//       </div>
//       <div className="mt-3">
//         <SelectInput
//           value={objective.timeLimit}
//           onChange={(value) => handleChange('timeLimit', value)}
//           options={[
//             { value: '1 minute', label: '1 minute' },
//             { value: '2 minutes', label: '2 minutes' },
//             { value: '3 minutes', label: '3 minutes' },
//             { value: '5 minutes', label: '5 minutes' },
//             { value: 'No time limit', label: 'No time limit' }
//           ]}
//         />
//       </div>
//     </div>
//   );
// });

// // Critical Action Item Component
// const CriticalActionItem = React.memo(({ action, index, onUpdate, onRemove, canRemove }) => {
//   const handleChange = useCallback((field, value) => {
//     onUpdate(index, field, value);
//   }, [index, onUpdate]);

//   const handleRemove = useCallback(() => {
//     onRemove(index);
//   }, [index, onRemove]);

//   return (
//     <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
//       <div className="flex justify-between items-start mb-3">
//         <h4 className="font-medium text-gray-900">Critical Action {index + 1}</h4>
//         {canRemove && (
//           <button
//             type="button"
//             onClick={handleRemove}
//             className="text-red-600 hover:text-red-800"
//           >
//             <Trash2 size={16} />
//           </button>
//         )}
//       </div>
//       <div className="space-y-4">
//         <TextArea
//           value={action.description}
//           onChange={(value) => handleChange('description', value)}
//           placeholder="Describe the critical action (e.g., 'Establish IV access and begin fluid resuscitation')"
//           rows={2}
//         />
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <SelectInput
//             value={action.timeRequirement}
//             onChange={(value) => handleChange('timeRequirement', value)}
//             options={[
//               { value: 'within 1 minute', label: 'within 1 minute' },
//               { value: 'within 2 minutes', label: 'within 2 minutes' },
//               { value: 'within 3 minutes', label: 'within 3 minutes' },
//               { value: 'within 5 minutes', label: 'within 5 minutes' },
//               { value: 'within 10 minutes', label: 'within 10 minutes' }
//             ]}
//           />
//           <SelectInput
//             value={action.category}
//             onChange={(value) => handleChange('category', value)}
//             options={[
//               { value: 'Assessment', label: 'Assessment' },
//               { value: 'Intervention', label: 'Intervention' },
//               { value: 'Monitoring', label: 'Monitoring' },
//               { value: 'Communication', label: 'Communication' },
//               { value: 'Documentation', label: 'Documentation' }
//             ]}
//           />
//         </div>
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             id={`required-${index}`}
//             checked={action.required}
//             onChange={(e) => handleChange('required', e.target.checked)}
//             className="mr-2"
//           />
//           <label htmlFor={`required-${index}`} className="text-sm text-gray-700">
//             Required for successful completion
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// });

// // Phase Item Component
// const PhaseItem = React.memo(({ phase, index, onUpdate }) => {
//   const handleChange = useCallback((field, value) => {
//     onUpdate(index, field, value);
//   }, [index, onUpdate]);

//   return (
//     <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
//       <div className="mb-4">
//         <h4 className="font-medium text-gray-900 flex items-center">
//           <Clock size={20} className="mr-2 text-blue-600" />
//           Phase {phase.phaseNumber}: {phase.phaseName}
//         </h4>
//         <p className="text-sm text-gray-600 mt-1">{phase.durationRange}</p>
//       </div>
      
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Phase Description
//           </label>
//           <TextArea
//             value={phase.description}
//             onChange={(value) => handleChange('description', value)}
//             placeholder="Describe what happens in this phase..."
//             rows={3}
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Expected User Actions
//           </label>
//           <TextArea
//             value={phase.expectedUserActions}
//             onChange={(value) => handleChange('expectedUserActions', value)}
//             placeholder="What should the learner do in this phase?"
//             rows={2}
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Progression Trigger
//           </label>
//           <TextInput
//             value={phase.progressionTrigger}
//             onChange={(value) => handleChange('progressionTrigger', value)}
//             placeholder="What triggers progression to the next phase?"
//           />
//         </div>
//       </div>
//     </div>
//   );
// });

// // Vital Signs Item Component
// const VitalSignsItem = React.memo(({ vital, index, onUpdate }) => {
//   const handleChange = useCallback((field, value) => {
//     onUpdate(index, field, value);
//   }, [index, onUpdate]);

//   return (
//     <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
//       <div className="mb-4">
//         <h4 className="font-medium text-gray-900 flex items-center">
//           <Activity size={20} className="mr-2 text-blue-600" />
//           Time Point: {vital.timePoint} minutes (Phase {vital.phaseNumber})
//         </h4>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             <Heart size={16} className="inline mr-1" />
//             Heart Rate (bpm)
//           </label>
//           <TextInput
//             value={vital.heartRate}
//             onChange={(value) => handleChange('heartRate', value)}
//             placeholder="80"
//             type="number"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Blood Pressure (mmHg)
//           </label>
//           <TextInput
//             value={vital.bloodPressure}
//             onChange={(value) => handleChange('bloodPressure', value)}
//             placeholder="120/80"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Respiratory Rate (breaths/min)
//           </label>
//           <TextInput
//             value={vital.respiratoryRate}
//             onChange={(value) => handleChange('respiratoryRate', value)}
//             placeholder="16"
//             type="number"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             <Droplets size={16} className="inline mr-1" />
//             Oxygen Saturation (%)
//           </label>
//           <TextInput
//             value={vital.oxygenSaturation}
//             onChange={(value) => handleChange('oxygenSaturation', value)}
//             placeholder="98"
//             type="number"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             <Thermometer size={16} className="inline mr-1" />
//             Temperature (°F)
//           </label>
//           <TextInput
//             value={vital.temperature}
//             onChange={(value) => handleChange('temperature', value)}
//             placeholder="98.6"
//             type="number"
//             step="0.1"
//           />
//         </div>
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Clinical Notes
//         </label>
//         <TextArea
//           value={vital.clinicalNotes}
//           onChange={(value) => handleChange('clinicalNotes', value)}
//           placeholder="Additional observations or notes for this time point..."
//           rows={2}
//         />
//       </div>
//     </div>
//   );
// });

// const ScenarioCreator = ({ onBack }) => {
//   const { user } = useAuth();
  
//   // Main wizard state
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [templates, setTemplates] = useState([]);
//   const [errors, setErrors] = useState({});

//   // Form data state with useRef to prevent re-renders during typing
//   const formDataRef = useRef({
//     // Step 1: Template & Basic Info
//     selectedTemplate: null,
//     title: '',
//     specialty: '',
//     difficulty: 'intermediate',
//     targetLearners: '',
//     durationMinutes: 12,
//     patientName: '',
//     patientAge: '',
//     patientWeight: '',
//     patientGender: 'male',
//     chiefComplaint: '',
//     correctDiagnosis: '',
    
//     // Step 2: Learning Objectives & Critical Actions
//     learningObjectives: [
//       { id: 'obj-1', verb: 'Identify', content: '', timeLimit: '3 minutes' }
//     ],
//     criticalActions: [
//       { id: 'action-1', description: '', timeRequirement: 'within 2 minutes', category: 'Assessment', required: true }
//     ],
    
//     // Step 3: Scenario Phases
//     phases: [
//       { 
//         id: 'phase-1',
//         phaseNumber: 1, 
//         phaseName: 'Initial Assessment', 
//         durationRange: '0-4 min',
//         description: '',
//         availableActions: [],
//         expectedUserActions: '',
//         progressionTrigger: ''
//       },
//       { 
//         id: 'phase-2',
//         phaseNumber: 2, 
//         phaseName: 'Diagnostic Phase', 
//         durationRange: '4-8 min',
//         description: '',
//         availableActions: [],
//         expectedUserActions: '',
//         progressionTrigger: ''
//       },
//       { 
//         id: 'phase-3',
//         phaseNumber: 3, 
//         phaseName: 'Treatment Phase', 
//         durationRange: '8-12 min',
//         description: '',
//         availableActions: [],
//         expectedUserActions: '',
//         progressionTrigger: ''
//       }
//     ],
    
//     // Step 4: Vital Signs
//     vitalSigns: [
//       { id: 'vital-1', timePoint: 2, phaseNumber: 1, heartRate: '', bloodPressure: '', respiratoryRate: '', oxygenSaturation: '', temperature: '', clinicalNotes: '' },
//       { id: 'vital-2', timePoint: 6, phaseNumber: 2, heartRate: '', bloodPressure: '', respiratoryRate: '', oxygenSaturation: '', temperature: '', clinicalNotes: '' },
//       { id: 'vital-3', timePoint: 10, phaseNumber: 3, heartRate: '', bloodPressure: '', respiratoryRate: '', oxygenSaturation: '', temperature: '', clinicalNotes: '' }
//     ]
//   });

//   // Force re-render state
//   const [, forceUpdate] = useState({});
//   const triggerUpdate = useCallback(() => {
//     forceUpdate({});
//   }, []);

//   // Load templates from Supabase on component mount
//   useEffect(() => {
//     loadTemplates();
//   }, []);

//   const loadTemplates = async () => {
//     try {
//       setIsLoading(true);
//       const { data, error } = await supabase
//         .from('vital_sign_templates')
//         .select('*')
//         .order('condition_name');
      
//       if (error) throw error;
//       setTemplates(data || []);
//     } catch (error) {
//       console.error('Error loading templates:', error);
//       toast({
//         title: "Error loading templates",
//         description: "Failed to load templates. Please refresh the page.",
//         variant: "destructive"
//       });
//       setErrors({ general: 'Failed to load templates. Please refresh the page.' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Stable form update functions
//   const updateFormField = useCallback((field, value) => {
//     formDataRef.current[field] = value;
//     triggerUpdate();
//   }, [triggerUpdate]);

//   const updateLearningObjective = useCallback((index, field, value) => {
//     const objectives = [...formDataRef.current.learningObjectives];
//     objectives[index] = { ...objectives[index], [field]: value };
//     formDataRef.current.learningObjectives = objectives;
//     triggerUpdate();
//   }, [triggerUpdate]);

//   const updateCriticalAction = useCallback((index, field, value) => {
//     const actions = [...formDataRef.current.criticalActions];
//     actions[index] = { ...actions[index], [field]: value };
//     formDataRef.current.criticalActions = actions;
//     triggerUpdate();
//   }, [triggerUpdate]);

//   const updatePhase = useCallback((index, field, value) => {
//     const phases = [...formDataRef.current.phases];
//     phases[index] = { ...phases[index], [field]: value };
//     formDataRef.current.phases = phases;
//     triggerUpdate();
//   }, [triggerUpdate]);

//   const updateVitalSigns = useCallback((index, field, value) => {
//     const vitals = [...formDataRef.current.vitalSigns];
//     vitals[index] = { ...vitals[index], [field]: value };
//     formDataRef.current.vitalSigns = vitals;
//     triggerUpdate();
//   }, [triggerUpdate]);

//   // Add/Remove functions with stable IDs
//   const addLearningObjective = useCallback(() => {
//     const newObjective = { 
//       id: `obj-${Date.now()}`, 
//       verb: 'Identify', 
//       content: '', 
//       timeLimit: '3 minutes' 
//     };
//     formDataRef.current.learningObjectives = [...formDataRef.current.learningObjectives, newObjective];
//     triggerUpdate();
//   }, [triggerUpdate]);

//   const removeLearningObjective = useCallback((index) => {
//     formDataRef.current.learningObjectives = formDataRef.current.learningObjectives.filter((_, i) => i !== index);
//     triggerUpdate();
//   }, [triggerUpdate]);

//   const addCriticalAction = useCallback(() => {
//     const newAction = { 
//       id: `action-${Date.now()}`, 
//       description: '', 
//       timeRequirement: 'within 2 minutes', 
//       category: 'Assessment', 
//       required: true 
//     };
//     formDataRef.current.criticalActions = [...formDataRef.current.criticalActions, newAction];
//     triggerUpdate();
//   }, [triggerUpdate]);

//   const removeCriticalAction = useCallback((index) => {
//     formDataRef.current.criticalActions = formDataRef.current.criticalActions.filter((_, i) => i !== index);
//     triggerUpdate();
//   }, [triggerUpdate]);

//   // Handle template selection and auto-populate vital signs
//   const handleTemplateSelect = useCallback((template) => {
//     formDataRef.current.selectedTemplate = template;
//     formDataRef.current.specialty = template.specialty;
//     formDataRef.current.correctDiagnosis = template.condition_name;

//     // Auto-populate vital signs from template
//     if (template.template_data && template.template_data.progression) {
//       const progression = template.template_data.progression;
//       const newVitalSigns = [
//         {
//           id: 'vital-1',
//           timePoint: 2,
//           phaseNumber: 1,
//           heartRate: progression['0-4']?.heart_rate || '',
//           bloodPressure: progression['0-4']?.blood_pressure || '',
//           respiratoryRate: progression['0-4']?.respiratory_rate || '',
//           oxygenSaturation: progression['0-4']?.oxygen_saturation || '',
//           temperature: progression['0-4']?.temperature || '',
//           clinicalNotes: progression['0-4']?.clinical_notes || ''
//         },
//         {
//           id: 'vital-2',
//           timePoint: 6,
//           phaseNumber: 2,
//           heartRate: progression['4-8']?.heart_rate || '',
//           bloodPressure: progression['4-8']?.blood_pressure || '',
//           respiratoryRate: progression['4-8']?.respiratory_rate || '',
//           oxygenSaturation: progression['4-8']?.oxygen_saturation || '',
//           temperature: progression['4-8']?.temperature || '',
//           clinicalNotes: progression['4-8']?.clinical_notes || ''
//         },
//         {
//           id: 'vital-3',
//           timePoint: 10,
//           phaseNumber: 3,
//           heartRate: progression['8-12']?.heart_rate || '',
//           bloodPressure: progression['8-12']?.blood_pressure || '',
//           respiratoryRate: progression['8-12']?.respiratory_rate || '',
//           oxygenSaturation: progression['8-12']?.oxygen_saturation || '',
//           temperature: progression['8-12']?.temperature || '',
//           clinicalNotes: progression['8-12']?.clinical_notes || ''
//         }
//       ];
//       formDataRef.current.vitalSigns = newVitalSigns;
//     }

//     triggerUpdate();
//   }, [triggerUpdate]);

//   // Form validation for each step
//   const validateStep = (step) => {
//     const newErrors = {};
//     const formData = formDataRef.current;
    
//     switch (step) {
//       case 1:
//         if (!formData.selectedTemplate) newErrors.template = 'Please select a template';
//         if (!formData.title.trim()) newErrors.title = 'Title is required';
//         if (!formData.patientName.trim()) newErrors.patientName = 'Patient name is required';
//         if (!formData.patientAge.trim()) newErrors.patientAge = 'Patient age is required';
//         if (!formData.chiefComplaint.trim()) newErrors.chiefComplaint = 'Chief complaint is required';
//         break;
//       case 2:
//         if (formData.learningObjectives.some(obj => !obj.content.trim())) {
//           newErrors.objectives = 'All learning objectives must have content';
//         }
//         if (formData.criticalActions.some(action => !action.description.trim())) {
//           newErrors.actions = 'All critical actions must have descriptions';
//         }
//         break;
//       case 3:
//         if (formData.phases.some(phase => !phase.description.trim() || !phase.expectedUserActions.trim())) {
//           newErrors.phases = 'All phases must have descriptions and expected user actions';
//         }
//         break;
//       case 4:
//         if (formData.vitalSigns.some(vital => !vital.heartRate || !vital.oxygenSaturation)) {
//           newErrors.vitals = 'Heart rate and oxygen saturation are required for all time points';
//         }
//         break;
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Navigation functions
//   const nextStep = () => {
//     if (validateStep(currentStep)) {
//       setCurrentStep(Math.min(currentStep + 1, 5));
//     }
//   };

//   const prevStep = () => {
//     setCurrentStep(Math.max(currentStep - 1, 1));
//   };

//   // Save scenario to database
//   const saveScenario = async () => {
//     if (!user) {
//       toast({
//         title: "Authentication required",
//         description: "You must be logged in to create scenarios.",
//         variant: "destructive"
//       });
//       return;
//     }

//     const formData = formDataRef.current;

//     // Validate all steps before saving
//     const allStepsValid = [1, 2, 3, 4].every(step => validateStep(step));
//     if (!allStepsValid) {
//       toast({
//         title: "Validation errors",
//         description: "Please correct errors in all steps before saving.",
//         variant: "destructive"
//       });
//       return;
//     }
    
//     try {
//       setIsLoading(true);
      
//       // Create main scenario
//       const { data: scenario, error: scenarioError } = await supabase
//         .from('scenarios')
//         .insert({
//           title: formData.title,
//           specialty: formData.specialty,
//           difficulty: formData.difficulty,
//           target_learners: formData.targetLearners,
//           duration_minutes: formData.durationMinutes,
//           patient_name: formData.patientName,
//           patient_age: formData.patientAge,
//           patient_weight: formData.patientWeight,
//           patient_gender: formData.patientGender,
//           chief_complaint: formData.chiefComplaint,
//           correct_diagnosis: formData.correctDiagnosis,
//           condition_template: formData.selectedTemplate?.condition_name,
//           created_by: user.id
//         })
//         .select()
//         .single();

//       if (scenarioError) throw scenarioError;

//       const scenarioId = scenario.id;

//       // Create phases
//       const phasesData = formData.phases.map(phase => ({
//         scenario_id: scenarioId,
//         phase_number: phase.phaseNumber,
//         phase_name: phase.phaseName,
//         duration_range: phase.durationRange,
//         description: phase.description,
//         available_actions: phase.availableActions,
//         expected_user_actions: phase.expectedUserActions,
//         progression_trigger: phase.progressionTrigger
//       }));

//       await supabase.from('scenario_phases').insert(phasesData);

//       // Create vital signs
//       const vitalsData = formData.vitalSigns.map(vital => ({
//         scenario_id: scenarioId,
//         time_point: vital.timePoint,
//         phase_number: vital.phaseNumber,
//         heart_rate: vital.heartRate,
//         blood_pressure: vital.bloodPressure,
//         respiratory_rate: vital.respiratoryRate,
//         oxygen_saturation: vital.oxygenSaturation,
//         temperature: vital.temperature,
//         clinical_notes: vital.clinicalNotes
//       }));

//       await supabase.from('scenario_vitals').insert(vitalsData);

//       // Create learning objectives
//       const objectivesData = formData.learningObjectives.map((obj, index) => ({
//         scenario_id: scenarioId,
//         objective_order: index + 1,
//         objective_text: obj.content,
//         verb: obj.verb,
//         time_limit: obj.timeLimit
//       }));

//       await supabase.from('scenario_learning_objectives').insert(objectivesData);

//       // Create critical actions
//       const actionsData = formData.criticalActions.map((action, index) => ({
//         scenario_id: scenarioId,
//         action_order: index + 1,
//         action_description: action.description,
//         time_requirement: action.timeRequirement,
//         is_required: action.required,
//         category: action.category
//       }));

//       await supabase.from('scenario_critical_actions').insert(actionsData);

//       toast({
//         title: "Success!",
//         description: "Scenario created successfully!",
//         variant: "default"
//       });
      
//       // Reset form
//       setCurrentStep(1);
//       formDataRef.current = {
//         selectedTemplate: null,
//         title: '',
//         specialty: '',
//         difficulty: 'intermediate',
//         targetLearners: '',
//         durationMinutes: 12,
//         patientName: '',
//         patientAge: '',
//         patientWeight: '',
//         patientGender: 'male',
//         chiefComplaint: '',
//         correctDiagnosis: '',
//         learningObjectives: [{ id: 'obj-1', verb: 'Identify', content: '', timeLimit: '3 minutes' }],
//         criticalActions: [{ id: 'action-1', description: '', timeRequirement: 'within 2 minutes', category: 'Assessment', required: true }],
//         phases: [
//           { id: 'phase-1', phaseNumber: 1, phaseName: 'Initial Assessment', durationRange: '0-4 min', description: '', availableActions: [], expectedUserActions: '', progressionTrigger: '' },
//           { id: 'phase-2', phaseNumber: 2, phaseName: 'Diagnostic Phase', durationRange: '4-8 min', description: '', availableActions: [], expectedUserActions: '', progressionTrigger: '' },
//           { id: 'phase-3', phaseNumber: 3, phaseName: 'Treatment Phase', durationRange: '8-12 min', description: '', availableActions: [], expectedUserActions: '', progressionTrigger: '' }
//         ],
//         vitalSigns: [
//           { id: 'vital-1', timePoint: 2, phaseNumber: 1, heartRate: '', bloodPressure: '', respiratoryRate: '', oxygenSaturation: '', temperature: '', clinicalNotes: '' },
//           { id: 'vital-2', timePoint: 6, phaseNumber: 2, heartRate: '', bloodPressure: '', respiratoryRate: '', oxygenSaturation: '', temperature: '', clinicalNotes: '' },
//           { id: 'vital-3', timePoint: 10, phaseNumber: 3, heartRate: '', bloodPressure: '', respiratoryRate: '', oxygenSaturation: '', temperature: '', clinicalNotes: '' }
//         ]
//       };
//       triggerUpdate();

//     } catch (error) {
//       console.error('Error saving scenario:', error);
//       toast({
//         title: "Error saving scenario",
//         description: error.message || "Please try again.",
//         variant: "destructive"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Get current form data for rendering
//   const formData = formDataRef.current;

//   // Progress indicator
//   const ProgressIndicator = () => {
//     const steps = [
//       { number: 1, title: 'Template & Basics' },
//       { number: 2, title: 'Objectives & Actions' },
//       { number: 3, title: 'Scenario Phases' },
//       { number: 4, title: 'Vital Signs' },
//       { number: 5, title: 'Review & Save' }
//     ];

//     return (
//       <div className="mb-8">
//         <div className="flex items-center justify-between">
//           {steps.map((step, index) => (
//             <div key={step.number} className="flex items-center">
//               <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
//                 currentStep === step.number 
//                   ? 'bg-blue-600 border-blue-600 text-white' 
//                   : currentStep > step.number
//                   ? 'bg-green-600 border-green-600 text-white'
//                   : 'border-gray-300 text-gray-400'
//               }`}>
//                 {currentStep > step.number ? <Check size={20} /> : step.number}
//               </div>
//               <div className="ml-3">
//                 <div className={`text-sm font-medium ${
//                   currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
//                 }`}>
//                   {step.title}
//                 </div>
//               </div>
//               {index < steps.length - 1 && (
//                 <div className={`w-16 h-0.5 mx-4 ${
//                   currentStep > step.number ? 'bg-green-600' : 'bg-gray-300'
//                 }`} />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // Step 1: Template & Basic Info
//   const Step1 = () => (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Medical Condition Template</h3>
//         {errors.template && <div className="text-red-600 text-sm mb-4 flex items-center"><AlertCircle size={16} className="mr-1" />{errors.template}</div>}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {templates.map((template) => (
//             <div
//               key={template.id}
//               onClick={() => handleTemplateSelect(template)}
//               className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
//                 formData.selectedTemplate?.id === template.id
//                   ? 'border-blue-600 bg-blue-50'
//                   : 'border-gray-200 hover:border-gray-300'
//               }`}
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <h4 className="font-medium text-gray-900">{template.condition_name}</h4>
//                 {formData.selectedTemplate?.id === template.id && (
//                   <Check size={20} className="text-blue-600" />
//                 )}
//               </div>
//               <p className="text-sm text-gray-600 mb-2">{template.specialty}</p>
//               <p className="text-xs text-gray-500">{template.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="grid md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Scenario Title *
//           </label>
//           <TextInput
//             value={formData.title}
//             onChange={(value) => updateFormField('title', value)}
//             placeholder="Enter scenario title"
//             error={errors.title}
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Medical Specialty *
//           </label>
//           <TextInput
//             value={formData.specialty}
//             onChange={(value) => updateFormField('specialty', value)}
//             placeholder="Emergency Medicine, Cardiology, etc."
//           />
//         </div>
//       </div>

//       <div className="grid md:grid-cols-3 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Difficulty Level
//           </label>
//           <SelectInput
//             value={formData.difficulty}
//             onChange={(value) => updateFormField('difficulty', value)}
//             options={[
//               { value: 'beginner', label: 'Beginner' },
//               { value: 'intermediate', label: 'Intermediate' },
//               { value: 'advanced', label: 'Advanced' }
//             ]}
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Target Learners
//           </label>
//           <TextInput
//             value={formData.targetLearners}
//             onChange={(value) => updateFormField('targetLearners', value)}
//             placeholder="Medical students, Residents, etc."
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Duration (minutes)
//           </label>
//           <TextInput
//             value={formData.durationMinutes}
//             onChange={(value) => updateFormField('durationMinutes', parseInt(value) || 12)}
//             type="number"
//             min="1"
//             max="60"
//           />
//         </div>
//       </div>

//       <div>
//         <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
//           <User size={20} className="mr-2" />
//           Patient Information
//         </h4>
        
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Patient Name *
//             </label>
//             <TextInput
//               value={formData.patientName}
//               onChange={(value) => updateFormField('patientName', value)}
//               placeholder="John Doe"
//               error={errors.patientName}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Age *
//             </label>
//             <TextInput
//               value={formData.patientAge}
//               onChange={(value) => updateFormField('patientAge', value)}
//               placeholder="45"
//               error={errors.patientAge}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Weight (kg)
//             </label>
//             <TextInput
//               value={formData.patientWeight}
//               onChange={(value) => updateFormField('patientWeight', value)}
//               placeholder="70"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Gender
//             </label>
//             <SelectInput
//               value={formData.patientGender}
//               onChange={(value) => updateFormField('patientGender', value)}
//               options={[
//                 { value: 'male', label: 'Male' },
//                 { value: 'female', label: 'Female' },
//                 { value: 'other', label: 'Other' }
//               ]}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="grid md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Chief Complaint *
//           </label>
//           <TextArea
//             value={formData.chiefComplaint}
//             onChange={(value) => updateFormField('chiefComplaint', value)}
//             placeholder="Patient's primary concern or reason for seeking care"
//             error={errors.chiefComplaint}
//             rows={3}
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Correct Diagnosis
//           </label>
//           <TextInput
//             value={formData.correctDiagnosis}
//             onChange={(value) => updateFormField('correctDiagnosis', value)}
//             placeholder="The expected final diagnosis"
//           />
//         </div>
//       </div>
//     </div>
//   );

//   // Step 2: Learning Objectives & Critical Actions
//   const Step2 = () => (
//     <div className="space-y-8">
//       <div>
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold text-gray-900">Learning Objectives</h3>
//           <button
//             type="button"
//             onClick={addLearningObjective}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             <Plus size={20} className="mr-2" />
//             Add Objective
//           </button>
//         </div>
//         {errors.objectives && <div className="text-red-600 text-sm mb-4">{errors.objectives}</div>}
        
//         <div className="space-y-4">
//           {formData.learningObjectives.map((objective, index) => (
//             <LearningObjectiveItem
//               key={objective.id}
//               objective={objective}
//               index={index}
//               onUpdate={updateLearningObjective}
//               onRemove={removeLearningObjective}
//               canRemove={formData.learningObjectives.length > 1}
//             />
//           ))}
//         </div>
//       </div>

//       <div>
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold text-gray-900">Critical Actions</h3>
//           <button
//             type="button"
//             onClick={addCriticalAction}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             <Plus size={20} className="mr-2" />
//             Add Action
//           </button>
//         </div>
//         {errors.actions && <div className="text-red-600 text-sm mb-4">{errors.actions}</div>}
        
//         <div className="space-y-4">
//           {formData.criticalActions.map((action, index) => (
//             <CriticalActionItem
//               key={action.id}
//               action={action}
//               index={index}
//               onUpdate={updateCriticalAction}
//               onRemove={removeCriticalAction}
//               canRemove={formData.criticalActions.length > 1}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   // Step 3: Scenario Phases
//   const Step3 = () => (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Scenario Phases</h3>
//         <p className="text-gray-600 mb-6">
//           Define what happens in each phase of the scenario and what learners should do.
//         </p>
//         {errors.phases && <div className="text-red-600 text-sm mb-4">{errors.phases}</div>}
//       </div>
      
//       <div className="space-y-6">
//         {formData.phases.map((phase, index) => (
//           <PhaseItem
//             key={phase.id}
//             phase={phase}
//             index={index}
//             onUpdate={updatePhase}
//           />
//         ))}
//       </div>
//     </div>
//   );

//   // Step 4: Vital Signs
//   const Step4 = () => (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Vital Signs Progression</h3>
//         <p className="text-gray-600 mb-6">
//           Define how vital signs change throughout the scenario at key time points.
//         </p>
//         {errors.vitals && <div className="text-red-600 text-sm mb-4">{errors.vitals}</div>}
//       </div>
      
//       <div className="space-y-6">
//         {formData.vitalSigns.map((vital, index) => (
//           <VitalSignsItem
//             key={vital.id}
//             vital={vital}
//             index={index}
//             onUpdate={updateVitalSigns}
//           />
//         ))}
//       </div>
//     </div>
//   );

//   // Step 5: Review & Save
//   const Step5 = () => (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Your Scenario</h3>
//         <p className="text-gray-600 mb-6">
//           Please review all the information below and click "Create Scenario" when ready.
//         </p>
//       </div>

//       <div className="space-y-6">
//         <div className="p-4 border border-gray-200 rounded-lg">
//           <h4 className="font-medium text-gray-900 mb-2">Basic Information</h4>
//           <div className="grid md:grid-cols-2 gap-4 text-sm">
//             <div><strong>Title:</strong> {formData.title}</div>
//             <div><strong>Specialty:</strong> {formData.specialty}</div>
//             <div><strong>Difficulty:</strong> {formData.difficulty}</div>
//             <div><strong>Duration:</strong> {formData.durationMinutes} minutes</div>
//             <div><strong>Patient:</strong> {formData.patientName}, {formData.patientAge} years old, {formData.patientGender}</div>
//             <div><strong>Template:</strong> {formData.selectedTemplate?.condition_name}</div>
//           </div>
//           <div className="mt-2">
//             <strong>Chief Complaint:</strong> {formData.chiefComplaint}
//           </div>
//         </div>

//         <div className="p-4 border border-gray-200 rounded-lg">
//           <h4 className="font-medium text-gray-900 mb-2">Learning Objectives ({formData.learningObjectives.length})</h4>
//           <ul className="list-disc list-inside text-sm space-y-1">
//             {formData.learningObjectives.map((obj, index) => (
//               <li key={obj.id}>{obj.verb}: {obj.content} ({obj.timeLimit})</li>
//             ))}
//           </ul>
//         </div>

//         <div className="p-4 border border-gray-200 rounded-lg">
//           <h4 className="font-medium text-gray-900 mb-2">Critical Actions ({formData.criticalActions.length})</h4>
//           <ul className="list-disc list-inside text-sm space-y-1">
//             {formData.criticalActions.map((action, index) => (
//               <li key={action.id}>{action.description} ({action.timeRequirement})</li>
//             ))}
//           </ul>
//         </div>

//         <div className="p-4 border border-gray-200 rounded-lg">
//           <h4 className="font-medium text-gray-900 mb-2">Scenario Phases ({formData.phases.length})</h4>
//           <div className="space-y-2 text-sm">
//             {formData.phases.map((phase, index) => (
//               <div key={phase.id}>
//                 <strong>Phase {phase.phaseNumber}: {phase.phaseName}</strong> ({phase.durationRange})
//                 <br />
//                 <span className="text-gray-600">{phase.description}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="p-4 border border-gray-200 rounded-lg">
//           <h4 className="font-medium text-gray-900 mb-2">Vital Signs Timeline ({formData.vitalSigns.length} time points)</h4>
//           <div className="space-y-2 text-sm">
//             {formData.vitalSigns.map((vital, index) => (
//               <div key={vital.id}>
//                 <strong>{vital.timePoint} minutes:</strong> HR: {vital.heartRate}, BP: {vital.bloodPressure}, 
//                 RR: {vital.respiratoryRate}, O2 Sat: {vital.oxygenSaturation}%, Temp: {vital.temperature}°F
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   // Navigation buttons
//   const NavigationButtons = () => (
//     <div className="flex justify-between pt-6 border-t border-gray-200">
//       <div>
//         {currentStep > 1 && (
//           <button
//             type="button"
//             onClick={prevStep}
//             className="flex items-center px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//           >
//             <ChevronLeft size={20} className="mr-2" />
//             Previous
//           </button>
//         )}
//       </div>
      
//       <div>
//         {currentStep < 5 ? (
//           <button
//             type="button"
//             onClick={nextStep}
//             className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Next
//             <ChevronRight size={20} className="ml-2" />
//           </button>
//         ) : (
//           <button
//             type="button"
//             onClick={saveScenario}
//             disabled={isLoading}
//             className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
//           >
//             {isLoading ? 'Creating...' : 'Create Scenario'}
//             <Check size={20} className="ml-2" />
//           </button>
//         )}
//       </div>
//     </div>
//   );

//   if (isLoading && templates.length === 0) {
//     return (
//       <div className="flex justify-center items-center min-h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading templates...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="mb-6">
//         <button
//           onClick={onBack}
//           className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
//         >
//           <ChevronLeft size={20} className="mr-1" />
//           Back to Dashboard
//         </button>
        
//         <h2 className="text-2xl font-bold text-gray-900">Create New Scenario</h2>
//         <p className="text-gray-600 mt-2">
//           Build a comprehensive medical simulation scenario step by step.
//         </p>
//       </div>

//       {errors.general && (
//         <div className="mb-6 p-4 border border-red-300 rounded-lg bg-red-50">
//           <div className="flex items-center text-red-600">
//             <AlertCircle size={20} className="mr-2" />
//             {errors.general}
//           </div>
//         </div>
//       )}

//       <ProgressIndicator />

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//         {currentStep === 1 && <Step1 />}
//         {currentStep === 2 && <Step2 />}
//         {currentStep === 3 && <Step3 />}
//         {currentStep === 4 && <Step4 />}
//         {currentStep === 5 && <Step5 />}
        
//         <NavigationButtons />
//       </div>
//     </div>
//   );
// };

// export default ScenarioCreator;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhaseViewer from "./PhaseViewer";
import SimulationReport from "./SimulationReport";

const ScenarioCreator = ({ scenario }) => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [objectives, setObjectives] = useState(
    scenario.objectives.map(obj => ({ ...obj, achieved: false }))
  );
  const [simulationEnded, setSimulationEnded] = useState(false);

  const currentPhase = scenario.phases[currentPhaseIndex];

  // Gestion automatique si fin_temps = true
  useEffect(() => {
    if (currentPhase.fin_temps) {
      const timer = setTimeout(() => {
        handleNextPhase({ key: "auto" }); // passage automatique
      }, currentPhase.duration_ms || 5000);
      return () => clearTimeout(timer);
    }
  }, [currentPhase]);

  const handleNextPhase = (choice) => {
    // Marquer les objectifs atteints si c'est correct
    if (choice.correct) {
      choice.objectivesAchieved?.forEach(objId => {
        setObjectives(prev =>
          prev.map(o => o.id === objId ? { ...o, achieved: true } : o)
        );
      });
    }

    // Déterminer la prochaine phase
    const nextPhaseId = currentPhase.prochaine_phase?.[choice.key];
    if (currentPhase.fin_action || !nextPhaseId) {
      setSimulationEnded(true);
    } else {
      const nextIndex = scenario.phases.findIndex(p => p.id === nextPhaseId);
      if (nextIndex !== -1) {
        setCurrentPhaseIndex(nextIndex);
      } else {
        setSimulationEnded(true);
      }
    }
  };

  return (
    <div className="scenario-creator">
      {!simulationEnded ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <PhaseViewer phase={currentPhase} onActionChoice={handleNextPhase} />
          </motion.div>
        </AnimatePresence>
      ) : (
        <SimulationReport objectives={objectives} />
      )}
    </div>
  );
};

export default ScenarioCreator;
