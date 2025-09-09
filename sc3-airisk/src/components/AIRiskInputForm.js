import React, {useState, useEffect} from "react";
import "./AIRisk.css";
import { RiskLevelUtils } from "./AIRiskForm";

const AIRiskInputForm = ({
    entries,
    form,
    setForm,
    handleChange,
    handleSubmit,
    handleCancel,
    editIndex = null,
    fieldsOpen,
    setFieldsOpen,
    resetTrigger
}) => {

  const [viewMode, setViewMode] = useState('basic');
  const [selectedValues, setSelectedValues] = useState({});

  // Reset selectedValues and viewMode when resetTrigger changes (but not when editing)
  useEffect(() => {
    if (resetTrigger > 0 && editIndex === null) {
      setSelectedValues({});
      setViewMode('basic'); // Reset to basic view mode when adding new process
    }
  }, [resetTrigger, editIndex]);

  // Populate selectedValues when editing an existing entry
  useEffect(() => {
    if (editIndex !== null && form) {
      // List of all select field names that use selectedValues
      const selectFields = [
        // Basic Risk Assessment
        'buyAI', 'embedAI', 'developAI', 'automatingDecisions',
        'impactsAdministrativeDecisions', 'triggersRealWorldAction', 'operatesAutonomously',
        'dataSensitivity', 'unintendedHarms', 'explainability',
        
        // Human Rights
        'humanRightsAlgorithmicDecision', 'humanRightsTradeOffs', 'humanRightsImpact',
        'humanRightsSuggestions', 'humanRightsAutonomy',
        
        // Community Benefits
        'communityBenefitsQuality', 'communityBenefitsProcessing', 'communityBenefitsFinancial',
        'communityBenefitsAdaptable', 'communityBenefitsNewService', 'communityBenefitsInnovation',
        
        // Community Harms
        'communityHarmsPhysicalConfidenceLevel', 'communityHarmsPsychologicalConfidenceLevel',
        'communityHarmsEnvironmentalConfidenceLevel', 'communityHarmsUnauthorisedUseConfidenceLevel',
        'communityHarmsImpactOnRightsConfidenceLevel', 'communityHarmsMisidentificationConfidenceLevel',
        'communityHarmsMisapplicationConfidenceLevel', 'communityHarmsOtherFinancialImpactConfidenceLevel',
        'communityHarmsIncorrectAdviceConfidenceLevel', 'communityHarmsInconvenienceDelayConfidenceLevel',
        'communityHarmsErosionOfTrustConfidenceLevel', 'communityHarmsEthicalImplicationsConfidenceLevel',
        'communityHarmsEconomicDisruptionConfidenceLevel', 'communityHarmsSocialInequalityConfidenceLevel',
        'communityHarmsOtherConfidenceLevel', 'communityHarmsReversibleConfidenceLevel',
        'communityHarmsIrreversibleConfidenceLevel', 'communityHarmsSecondaryCumulativeConfidenceLevel',
        
        // Community Risks
        'communityRisksNewOrExistingService', 'communityRisksDiscriminationUnintendedBias',
        'communityRisksSinglePointOfFailure', 'communityRisksHumanOversight',
        'communityRisksOverRelianceFalseAlert', 'communityRisksLinkageUnclear',
        'communityRisksExplainability', 'communityRisksBudgetOverrun',
        'communityRisksNonAISystems', 'communityRisksInformationCompliance',
        
        // Fairness Risks
        'fairnessRisksIncompleteData', 'fairnessRisksPoorlyDefined', 'fairnessRisksNoMonitoring',
        'fairnessRisksOutlierData', 'fairnessRisksDataCleansing', 'fairnessRisksBiasDetection',
        'fairnessRisksReproducibility', 'fairnessRisksDataLinking', 'fairnessRisksTrainingData',
        'fairnessRisksGeneral',
        
        // Fairness Controls
        'fairnessControlsDataSelection', 'fairnessControlsDataAvailability', 'fairnessControlsDataPopulation',
        'fairnessControlsDiversityInclusion', 'fairnessControlsGenderMinority', 'fairnessControlsPerformanceMeasures',
        'fairnessControlsPerformanceCalibration',
        
        // Privacy Controls
        'privacyControlsSensitiveChildren', 'privacyControlsSensitiveReligious', 'privacyControlsSensitiveRacial',
        'privacyControlsSensitivePolitical', 'privacyControlsSensitiveUnion', 'privacyControlsSensitiveGender',
        'privacyControlsSensitiveCriminalRecord', 'privacyControlsSensitiveHealth', 'privacyControlsSensitiveBiometric',
        'privacyControlsSensitiveOtherData', 'privacyByDesign', 'privacyImpactAssessment',
        
        // Transparency
        'transparencyConsultation', 'transparencyScopeGoals', 'transparencyRightToAppeal',
        'transparencyClearExplanations',
        
        // Accountability
        'accountabilityResponsibleUse', 'accountabilityResponsiblePolicy', 'accountabilityResponsibleMonitoring',
        'accountabilityResponsibleDataGovernance', 'accountabilityResponsibleTechnicalGovernance',
        'accountabilityResponsibleAppealRedress', 'accountabilityInterventionProcess',
        'accountabilityOverconfidenceProcess',
        
        // Elevated Risk & Procurement
        'elevatedRisk', 'procurementControls', 'procurementContractualClauses', 'procurementSupplierQuestions',
        'procurementResidualRiskFactors', 'procurementSystemRequirements', 'procurementRiskTreatments'
      ];

      // Initialize selectedValues from form data
      const formSelectedValues = {};
      selectFields.forEach(field => {
        // Include all fields from form, even if empty string
        formSelectedValues[field] = form[field] || '';
      });
      setSelectedValues(formSelectedValues);
      
      // Debug logging
      console.log('Editing row:', editIndex);
      console.log('Form data:', form);
      console.log('Populated selectedValues:', formSelectedValues);
    }
  }, [editIndex, form]);

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setSelectedValues(prev => ({...prev, [name]: value}));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Close the details section on submit
    setFieldsOpen(false);
    // Pass the selectedValues to the parent component
    handleSubmit(selectedValues);
  };

      // Function to scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Back to Top Button Component
    const BackToTopButton = ({ className = "" }) => (
        <div className={`air-back-to-top-container ${className}`}>
            <button 
                onClick={scrollToTop}
                className="air-back-to-top-btn"
                title="Back to top of page"
            >
                ↑ Back to Top
            </button>
        </div>
    );

  const getGuidanceText = (fieldName, value) => {
    const guidanceMap = {
      communityHarmsReversibleConfidenceLevel: {
        'no': 'Low Risk - Explain your answer',
        'yes-high': 'High Risk - Do not proceed until you receive legal advice. If you have legal approval: discuss this with all relevant stakeholders, you may need ethics approval, consider a Human Rights Impact Assessment. If your solution is operational - consult responsible officers for an appropriate equivalent action',
        'yes-low': 'Low Risk - Explain your answer',
        'unclear': 'High Risk - Pause the project and review with the responsible officers on how to resolve. If your solution is operational - consult responsible officers for an appropriate equivalent action.'
      },
      communityHarmsIrreversibleConfidenceLevel: {
        'no': 'Low Risk - Explain your answer',
        'yes-high': 'High Risk - You must seek approval from an ethics committee. You must have clear legal advice that allows you to proceed. Consult with all relevant stakeholders. Consider a Human Rights Impact Assessment',
        'yes-veryhigh': 'Very High Risk - Do not proceed until you receive clear legal advice. If you have legal approval: discuss this with all relevant stakeholders, seek approval from an ethics committee, consider a Human Rights Impact Assessment',
        'unclear-veryhigh': 'Very High Risk - Pause the project and review with the responsible officer how to resolve'
      },
      communityHarmsSecondaryCumulativeConfidenceLevel: {
        'no': 'Low Risk - Explain your answer',
        'yes-high': 'Very High Risk - Do not proceed until you receive legal advice. If you have legal approval: discuss this with all relevant stakeholders, you may need ethics approval, consider a Human Rights Impact Assessment. If your solution is operational - consult responsible officers for an appropriate equivalent action',
        'yes-low': 'Low Risk - Explain your answer',
        'unclear-veryhigh': 'Very High Risk - Pause the project and review with the responsible officer how to resolve'
      },
      communityRisksNonAISystems: {
        'yes': 'Low Risk - Explain your answer',
        'informally': 'High Risk - After your pilot, you must conduct a formal benefits review before scaling. If your solution is operational - consult responsible officers for an appropriate equivalent action',
        'no': 'Very High Risk - Do not proceed any further. Review with the responsible officers on how to resolve. If your solution is operational - consult responsible officers for an appropriate equivalent action',
        'na': 'N/A - Explain your answer'
      },
      communityRisksInformationCompliance: {
        'yes': 'Low Risk - If you have confirmed any other relevant acts, please list these in your response',
        'unclear': 'Very High Risk - Pause the project. Seek advice from an appropriate legal source or the Privacy Officer. You may need to redesign your project and or system. If your solution is operational - consult responsible officers for an appropriate equivalent action',
        'no': 'Very High Risk - Do not proceed any further unless you receive clear legal advice that allows you to proceed. Consider redesigning your project and or system. If your solution is operational - consult responsible officers for an appropriate equivalent action'
      },
      fairnessControlsPerformanceMeasures: {
        'yes': 'Low Risk - Explain your answer',
        'no-elevated': 'Very High Risk - For elevated risk uses of AI, pause the project until you have established performance measures and targets. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'no-nonelevated': 'Mid-range Risk - For non-elevated risk projects or systems, results should be treated as indicative and not relied on. Document your reasons. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'na': 'N/A - Document your reasons as to why this does not apply, then go to the next question.'
      },
      fairnessControlsDataPopulation: {
        'yes': 'Low Risk - Explain your answer',
        'partially-but-better': 'High Risk - Consider seeking advice from an ethics committee. Document how you have consulted with all relevant stakeholders before proceeding. Consider a Human Rights Impact Assessment. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'no-or-unclear': 'Very High Risk - Pause the project and review with the responsible officers on how to resolve. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'na': 'N/A - Document your reasons as to why this does not apply, then go to the next question.'
      },
      fairnessControlsDiversityInclusion: {
        'yes': 'Low Risk - Explain your answer',
        'partially-but-better': 'High Risk - Consider seeking advice from an ethics committee. Document how you have consulted with all relevant stakeholders before proceeding. Consider a Human Rights Impact Assessment. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'no-or-unclear': 'Very High Risk - Pause the project and review with the responsible officers on how to resolve. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'na': 'N/A - Document your reasons as to why this does not apply, then go to the next question.'
      },
      fairnessControlsGenderMinority: {
        'yes': 'Low Risk - Explain your answer',
        'partially-but-better': 'High Risk - Consider seeking advice from an ethics committee. Document how you have consulted with all relevant stakeholders before proceeding. Consider a Human Rights Impact Assessment. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'no-or-unclear': 'Very High Risk - Pause the project and review with the responsible officers on how to resolve. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'na': 'N/A - Document your reasons as to why this does not apply, then go to the next question.'
      },
      fairnessControlsDataSelection: {
        'yes': 'Low Risk - Explain your answer',
        'unclear': 'Very High Risk - Consult with relevant stakeholders on data options or implement a data improvement strategy or redesign your project/system',
        'no-but-better': 'High Risk - Document your reasons. Clearly demonstrate that you have consulted with all relevant stakeholders before proceeding. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'no': 'Very High Risk - Pause the project and review with the responsible officers on how to resolve. If your solution is operational - consult responsible officers for an appropriate equivalent action.'
      },
      fairnessControlsDataAvailability: {
        'yes': 'Low Risk - Explain your answer',
        'unclear': 'Very High Risk - Consult with relevant stakeholders to identify alternative data sources or implement a data improvement strategy or redesign your project/system',
        'partially-but-better': 'High Risk - Document your reasons and details to demonstrate that you have consulted with all relevant stakeholders before proceeding. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'no': 'Very High Risk - Pause the project and review with the responsible officers on how to resolve. If your solution is operational - consult responsible officers for an appropriate equivalent action.'
      },
      privacyControlsSensitiveChildren: {
        'na': 'Very Low Risk or N/A',
        'low': 'Low Risk',
        'mid-range': 'Mid-range Risk',
        'high': 'High Risk',
        'very-high': 'Very High Risk'
      },
      privacyControlsSensitiveReligious: {
        'na': 'Very Low Risk or N/A',
        'low': 'Low Risk',
        'mid-range': 'Mid-range Risk',
        'high': 'High Risk',
        'very-high': 'Very High Risk'
      },
      privacyControlsSensitiveRacial: {
        'na': 'Very Low Risk or N/A',
        'low': 'Low Risk',
        'mid-range': 'Mid-range Risk',
        'high': 'High Risk',
        'very-high': 'Very High Risk'
      },
      privacyControlsSensitivePolitical: {
        'na': 'Very Low Risk or N/A',
        'low': 'Low Risk',
        'mid-range': 'Mid-range Risk',
        'high': 'High Risk',
        'very-high': 'Very High Risk'
      },
      privacyControlsSensitiveUnion: {
        'na': 'Very Low Risk or N/A',
        'low': 'Low Risk',
        'mid-range': 'Mid-range Risk',
        'high': 'High Risk',
        'very-high': 'Very High Risk'
      },
      privacyControlsSensitiveGender: {
        'na': 'Very Low Risk or N/A',
        'low': 'Low Risk',
        'mid-range': 'Mid-range Risk',
        'high': 'High Risk',
        'very-high': 'Very High Risk'
      },
      privacyControlsSensitiveCriminalRecord: {
        'na': 'Very Low Risk or N/A',
        'low': 'Low Risk',
        'mid-range': 'Mid-range Risk',
        'high': 'High Risk',
        'very-high': 'Very High Risk'
      },
      privacyControlsSensitiveHealth: {
        'na': 'Very Low Risk or N/A',
        'low': 'Low Risk',
        'mid-range': 'Mid-range Risk',
        'high': 'High Risk',
        'very-high': 'Very High Risk'
      },
      privacyControlsConsent: {
        'low': 'Low Risk - Document the result, then go to the next question',
        'midrange': 'Mid-range Risk - For AI systems intended to operate under legislation which allows use of identifiable information, do not proceed unless you receive clear legal / independent privacy advice that allows you to proceed. The system should always be monitored for harms. If your solution is operational - consult responsible officers for an appropriate equivalent action',
        'high': 'High Risk - Pause the project until you have obtained consent or clear legal advice authorising use of this information. If your solution is operational - consult responsible officers for an appropriate equivalent action',
        'very-high': 'Very High Risk - Pause the project until you have obtained consent or clear legal advice authorising use of this information. If your solution is operational - consult responsible officers for an appropriate equivalent action',
        'na': 'N/A - Document your reasons as to why this does not apply'
      },
      privacyControlsCyberSecurity: {
        'low': 'Low Risk - Provide information that confirms you have done this and any key information to note for ongoing risk management',
        'very-high': 'Very High Risk - Pause the project until you meet mandatory requirements. If your solution is operational - consult responsible officers for an appropriate equivalent action'
      },
      privacyControlsSensitiveData: {
        'low': 'Low Risk - Document how you have confirmed this',
        'very-high': 'Very High Risk - Seek advice from an appropriate legal source or the Privacy Officer. Consider seeking approval from an ethics committee',
        'unclear': 'Very High Risk - Pause the project and review your data. Consider advice from an appropriate legal source or the Privacy Officer. If your solution is operational - consult responsible officers for an appropriate equivalent action'
      },

      // Privacy Impact Assessment
      privacyImpactAssessment: {
        'yes-low': 'Low Risk - Document the result, then go to the next question',
        'no': 'Very High Risk - Pause the project until you have completed a privacy impact assessment. If your solution is operational - consult responsible officers for an appropriate equivalent action',
        'na': 'N/A - Your system doesn\'t use or generate any sensitive information, confirmed with responsible officers, document below this confirmation'
      },

      // Transparency & Consultation
      transparencyConsultation: {
        'yes': 'Low Risk - Explain your answer, then go to next question',
        'authorised-use': 'Mid-range Risk - For AI systems intended to operate under legislation which allows use without community consultation, do not proceed unless you receive clear legal advice that allows you to proceed. The system should be always monitored for harms. If your solution is operational - consult responsible officers for an appropriate equivalent action',
        'partially': 'High Risk - Consider seeking advice from an ethics committee. Document here how you have consulted with all relevant stakeholders before proceeding. If your solution is operational - consult responsible officers for an appropriate equivalent action',
        'no': 'Very High Risk - Pause the project, develop a Community Engagement Plan and consult with the relevant community. If your solution is operational - consult responsible officers for an appropriate equivalent action',
        'na': 'N/A - Document your reasons as to why this does not apply, then go to next question'
      },

      // Accountability - Responsible Use
      accountabilityResponsibleUse: {
        'low': 'Low Risk - Document who is responsible to each point within the question',
        'very-high': 'Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action'
      },

      // Accountability - Responsible Policy
      accountabilityResponsiblePolicy: {
        'low': 'Low Risk - Document who is responsible to each point within the question',
        'very-high': 'Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action'
      },

      // Accountability - Responsible Monitoring
      accountabilityResponsibleMonitoring: {
        'low': 'Low Risk - Document who is responsible to each point within the question',
        'very-high': 'Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action'
      },

      // Accountability - Responsible Data Governance
      accountabilityResponsibleDataGovernance: {
        'low': 'Low Risk - Document who is responsible to each point within the question',
        'very-high': 'Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action'
      },

      // Accountability - Responsible Technical Governance
      accountabilityResponsibleTechnicalGovernance: {
        'low': 'Low Risk - Document who is responsible to each point within the question',
        'very-high': 'Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action'
      },

      // Accountability - Responsible Appeal & Redress
      accountabilityResponsibleAppealRedress: {
        'low': 'Low Risk - Document who is responsible to each point within the question',
        'very-high': 'Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action'
      },

      // Fairness Controls - Sensitive Biometric Data
      privacyControlsSensitiveBiometric: {
        'na': 'Very Low Risk or N/A',
        'low': 'Low Risk',
        'mid-range': 'Mid-range Risk',
        'high': 'High Risk',
        'very-high': 'Very High Risk'
      },

      // Fairness Controls - Other Sensitive Data (first instance)
      privacyControlsSensitiveOtherData: {
        'na': 'Very Low Risk or N/A',
        'low': 'Low Risk',
        'mid-range': 'Mid-range Risk',
        'high': 'High Risk',
        'very-high': 'Very High Risk'
      },

      // Privacy by Design & Security by Design
      privacyByDesign: {
        'no-or-unclear': 'Very High Risk - Pause the project, apply the principles before proceeding, document any points to resolve, then go to next question. Consider contacting the information and privacy officer or Cyber Team for any points not resolved. If your solution is operational - consult responsible officers for an appropriate equivalent action',
        'yes-low': 'Low Risk - Document any points to resolve below then go to next question. Consider contacting the information and privacy officer or Cyber Team for any points not resolved.',
        'partial': 'High Risk - Pause the project, apply the principles before proceeding, document any points to resolve then go to next question. Consider contacting the information and privacy officer or Cyber Team for any points not resolved. If your solution is operational - consult responsible officers for an appropriate equivalent action'
      },

      // Transparency - Scope and Goals
      transparencyScopeGoals: {
        'yes': 'Low Risk - Explain your answer, then go to next question',
        'no': 'Very High Risk - Make sure you communicate to relevant stakeholders and the community who are impacted before proceeding. If your solution is operational - consult responsible officers for an appropriate equivalent action',
        'na': 'N/A - Document your reasons as to why this does not apply, then go to next question'
      },

      // Transparency - Right to Appeal
      transparencyRightToAppeal: {
        'yes': 'Low Risk - Explain your answer, then go to next question',
        'no': 'Very High Risk - Pause your project, consult with relevant stakeholders and establish an appeals process. If your solution is operational - consult responsible officers for an appropriate equivalent action',
        'na': 'N/A - Document your reasons as to why this does not apply, then go to next question'
      },

      // Transparency - Clear Explanations
      transparencyClearExplanations: {
        'yes': 'Low Risk - Explain your answer, then go to next question',
        'no-but-person-decision': 'High Risk - Consult with relevant stakeholders and establish a process to readily reverse any decision or action made by the AI system. Actively monitor for potential harms.',
        'no': 'Very High Risk - Pause your project, consult with relevant stakeholders and establish an appeals process. If your solution is operational - consult responsible officers for an appropriate equivalent action',
        'na': 'N/A - Document your reasons as to why this does not apply, then go to next question'
      },

      // Human Intervention - Intervention Process
      accountabilityInterventionProcess: {
        'low': 'Low Risk - Document the details, then go to next question',
        'very-high': 'Very High Risk - Pause your project, consult with relevant stakeholders and establish appropriate processes. If your solution is operational - consult responsible officers for an appropriate equivalent action',
        'na': 'N/A - Document your reasons as to why this does not apply, then go to next question'
      },

      // Human Intervention - Overconfidence Process
      accountabilityOverconfidenceProcess: {
        'low': 'Low Risk - Document the details, then go to next question',
        'very-high': 'Very High Risk - Pause your project, consult with relevant stakeholders and establish appropriate processes. If your solution is operational - consult responsible officers for an appropriate equivalent action',
        'na': 'N/A - Document your reasons as to why this does not apply, then go to next question'
      },

      // Risk Mitigation - Elevated Risk
      elevatedRisk: {
        'yes-high': 'Very High Risk - Don\'t proceed without legal advice. If the pilot proceeds, pilot first with ongoing controls and monitoring. A formal review should be conducted after pilot phase. Conduct an independent risk audit, and your self-assessment needs to be reviewed by the company\'s AI Review Committee. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'yes-mid': 'Mid-range Risk - Don\'t proceed without legal advice. If the project proceeds, pilot first with ongoing controls and monitoring, consider a review by the company\'s AI Review Committee and conduct an independent risk audit. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'no-low': 'Low Risk - If the project proceeds, pilot first with ongoing controls and monitoring. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'no-very-low': 'Very Low Risk - Proceed with appropriate controls and monitoring.'
      },

      // Procurement - Procurement Controls
      procurementControls: {
        'yes': 'Low Risk - List the types of treatments that will be applied and categorise them against procurement controls mentioned above',
        'no': 'Very High Risk - Proceed to next step',
        'unclear': 'Very High Risk - Pause the project and review with the responsible officers and your risk team'
      },

      // Procurement - Contractual Clauses
      procurementContractualClauses: {
        'yes': 'Low Risk - Proceed to next step',
        'no': 'Very High Risk - Ensure that the contractual clauses and conditions are sufficient to mitigate identified risks and satisfy requirements',
        'unclear': 'Very High Risk - Pause the project and consult with either the legal team, responsible officers and risk teams (or both) to determine the status of the clauses and the path forward'
      },

      // Procurement - Supplier Questions
      procurementSupplierQuestions: {
        'yes': 'Very High Risk - Document the questions below that will require input from suppliers when you approach the market',
        'no': 'Low Risk - Proceed to next step',
        'unclear': 'Very High Risk - Pause the project and review with the responsible officers and your risk team'
      },

      // Procurement - Residual Risk Factors
      procurementResidualRiskFactors: {
        'yes': 'High Risk - You must use a contract if you proceed',
        'no': 'Low Risk - You should be guided by your procurement team',
        'unclear': 'High Risk - Pause the project and consult with either your legal team, responsible officers and risk teams before proceeding.  Please also provide further details.'
      },

      // Procurement - System Requirements
      procurementSystemRequirements: {
        'yes': 'Low Risk - Draft Statement of Requirements and Evaluation Criteria to adequately address the treatments. Document below the system requirements',
        'no': 'Very High Risk - Proceed to next step',
        'unclear': 'Very High Risk - Pause the project and review with the responsible officers and your risk team to determine the status of the treatments and the path forward'
      },

      // Procurement - Risk Treatments
      procurementRiskTreatments: {
        'yes': 'Low Risk - Document below the treatments and the order in which they are applied',
        'no': 'Very High Risk - Pause the project and consult with the appropriate subject matter experts to determine the risk treatment status',
        'unclear': 'Very High Risk - Pause the project and consult with the responsible officers and your risk team to determine the risk treatment status'
      },

      // Fairness Controls - Performance Calibration
      fairnessControlsPerformanceCalibration: {
        'yes': 'Low Risk - Explain your answer',
        'no-elevated': 'Very High Risk - For elevated risk uses of AI, pause the project until you have established performance measures and targets. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'no-nonelevated': 'Mid-range Risk - For non-elevated risk projects or systems, results should be treated as indicative and not relied on. Document your reasons. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'na': 'N/A - Document your reasons as to why this does not apply, then go to the next question.'
      }
    };
    
    return guidanceMap[fieldName]?.[value] || '';
  };

  // Function to extract risk level from guidance text and return appropriate CSS class
  const getGuidanceRiskClass = (fieldName, value) => {
    const guidanceText = getGuidanceText(fieldName, value);
    if (!guidanceText) return 'air-inputform-guidance-row';
    
    // Extract risk level from guidance text
    if (guidanceText.startsWith('Very High Risk')) {
      return 'air-inputform-guidance-row air-guidance-very-high-risk';
    } else if (guidanceText.startsWith('High Risk')) {
      return 'air-inputform-guidance-row air-guidance-high-risk';
    } else if (guidanceText.startsWith('Mid-range Risk')) {
      return 'air-inputform-guidance-row air-guidance-mid-range-risk';
    } else if (guidanceText.startsWith('Low Risk')) {
      return 'air-inputform-guidance-row air-guidance-low-risk';
    } else if (guidanceText.startsWith('Very Low Risk') || guidanceText.startsWith('N/A')) {
      return 'air-inputform-guidance-row air-guidance-very-low-risk';
    }
    
    // Default class for unknown risk levels
    return 'air-inputform-guidance-row';
  };

  // Check if Human Rights Impact Assessment is required
  const isHRIARequired = () => {
    const humanRightsFields = [
      'humanRightsImpact',
      'humanRightsTradeOffs', 
      'humanRightsSuggestions',
      'humanRightsAutonomy',
      'humanRightsAlgorithmicDecision'
    ];
    
    return humanRightsFields.some(field => selectedValues[field] === 'yes');
  };

  // Get highest risk rating in Community Benefits fieldset
  const getCommunityBenefitsHighestRisk = () => {
    const benefitsFields = [
      'communityBenefitsQuality',
      'communityBenefitsProcessing', 
      'communityBenefitsFinancial',
      'communityBenefitsAdaptable',
      'communityBenefitsNewService',
      'communityBenefitsInnovation'
    ];
    
    const maxLevel = RiskLevelUtils.getHighestRiskLevel(selectedValues, benefitsFields);
    return {
      text: RiskLevelUtils.getRiskLevelText(maxLevel),
      cssClass: RiskLevelUtils.getRiskLevelClass(maxLevel)
    };
  };

  // Get highest risk rating in Community Harms fieldset
  const getCommunityHarmsHighestRisk = () => {
    const harmsFields = [
      'communityHarmsPhysicalConfidenceLevel',
      'communityHarmsPsychologicalConfidenceLevel',
      'communityHarmsEnvironmentalConfidenceLevel',
      'communityHarmsUnauthorisedUseConfidenceLevel',
      'communityHarmsImpactOnRightsConfidenceLevel',
      'communityHarmsMisidentificationConfidenceLevel',
      'communityHarmsMisapplicationConfidenceLevel',
      'communityHarmsOtherFinancialImpactConfidenceLevel',
      'communityHarmsIncorrectAdviceConfidenceLevel',
      'communityHarmsInconvenienceDelayConfidenceLevel',
      'communityHarmsErosionOfTrustConfidenceLevel',
      'communityHarmsEthicalImplicationsConfidenceLevel',
      'communityHarmsEconomicDisruptionConfidenceLevel',
      'communityHarmsSocialInequalityConfidenceLevel',
      'communityHarmsOtherConfidenceLevel'
    ];
    
    // Process standard fields
    let maxLevel = RiskLevelUtils.getHighestRiskLevel(selectedValues, harmsFields);
    
    // Check special fields that have custom mappings
    const specialFields = [
      'communityHarmsReversibleConfidenceLevel',
      'communityHarmsIrreversibleConfidenceLevel',
      'communityHarmsSecondaryCumulativeConfidenceLevel'
    ];
    
    specialFields.forEach(field => {
      const value = selectedValues[field] || '';
      const level = RiskLevelUtils.getRiskLevel(field, value);
      if (level > maxLevel) {
        maxLevel = level;
      }
    });
    
    return {
      text: RiskLevelUtils.getRiskLevelText(maxLevel),
      cssClass: RiskLevelUtils.getRiskLevelClass(maxLevel)
    };
  };

  // Get highest risk rating in Community Risks fieldset
  const getCommunityRisksHighestRisk = () => {
    // First 8 fields use the same risk mapping as Community Harms standard fields
    const standardRisksFields = [
      'communityRisksNewOrExistingService',
      'communityRisksDiscriminationUnintendedBias',
      'communityRisksSinglePointOfFailure',
      'communityRisksHumanOversight',
      'communityRisksOverRelianceFalseAlert',
      'communityRisksLinkageUnclear',
      'communityRisksExplainability',
      'communityRisksBudgetOverrun'
    ];
    
    // Special Community Risks mapping for these fields (different option values)
    const specialRisksMapping = {
      'new': 1, // N/A
      'existing': 3, // Low Risk  
      'unclear': 4, // Mid-range Risk
      'high': 5, // High Risk
      'very-high': 6 // Very High Risk
    };
    
    const reverseLevels = {
      6: { text: 'Very High', cssClass: 'very-high' },
      5: { text: 'High', cssClass: 'high' },
      4: { text: 'Mid-range', cssClass: 'mid-range' },
      3: { text: 'Low', cssClass: 'low' },
      2: { text: 'Very Low', cssClass: 'very-low' },
      1: { text: 'N/A', cssClass: 'na' },
      0: { text: 'Not Set', cssClass: 'not-set' }
    };
    
    let maxLevel = 0;
    
    // Process first 7 fields with special mapping
    standardRisksFields.forEach(field => {
      const value = selectedValues[field] || '';
      const level = specialRisksMapping[value] || 0;
      if (level > maxLevel) {
        maxLevel = level;
      }
    });
    
    // Process last 2 special fields with distinct mappings
    const getSpecialRisksFieldLevel = (field, value) => {
      if (!value) return 0;
      
      if (field === 'communityRisksNonAISystems') {
        switch (value) {
          case 'no': return 6; // Very High risk - not considering alternatives
          case 'informally': return 5; // High risk - informal consideration
          case 'yes': return 3; // Low risk - proper consideration of alternatives
          case 'na': return 1; // N/A
          default: return 0;
        }
      }
      
      if (field === 'communityRisksInformationCompliance') {
        switch (value) {
          case 'no': return 6; // Very High risk - non-compliance
          case 'unclear': return 6; // Very High risk - uncertainty
          case 'yes': return 3; // Low risk - compliant
          default: return 0;
        }
      }
      
      return 0;
    };
    
    // Check last 2 special fields
    const specialFields = ['communityRisksNonAISystems', 'communityRisksInformationCompliance'];
    specialFields.forEach(field => {
      const value = selectedValues[field] || '';
      const level = getSpecialRisksFieldLevel(field, value);
      if (level > maxLevel) {
        maxLevel = level;
      }
    });
    
    return reverseLevels[maxLevel];
  };

  // Get highest risk rating in Fairness fieldset
  // Get highest risk rating in Fairness fieldset
  const getFairnessHighestRisk = () => {
    // Process fairness risk assessment fields (9 different risk categories)
    const fairnessRiskFields = [
      'fairnessRisksIncompleteData',
      'fairnessRisksPoorlyDefined', 
      'fairnessRisksNoMonitoring',
      'fairnessRisksOutlierData',
      'fairnessRisksDataCleansing',
      'fairnessRisksBiasDetection',
      'fairnessRisksReproducibility',
      'fairnessRisksDataLinking',
      'fairnessRisksTrainingData'
    ];

    let maxLevel = RiskLevelUtils.getHighestRiskLevel(selectedValues, fairnessRiskFields);

    // Also process the legacy fairnessRisksGeneral field if it exists
    const generalValue = selectedValues.fairnessRisksGeneral || '';
    const generalLevel = RiskLevelUtils.getRiskLevel('fairnessRisksGeneral', generalValue);
    if (generalLevel > maxLevel) {
      maxLevel = generalLevel;
    }

    // Process special mapping fields
    const specialFairnessFields = [
      'fairnessControlsDataSelection',
      'fairnessControlsDataAvailability', 
      'fairnessControlsDataPopulation',
      'fairnessControlsDiversityInclusion',
      'fairnessControlsGenderMinority',
      'fairnessControlsPerformanceMeasures',
      'fairnessControlsPerformanceCalibration'
    ];

    specialFairnessFields.forEach(field => {
      const value = selectedValues[field] || '';
      const level = RiskLevelUtils.getRiskLevel(field, value);
      if (level > maxLevel) {
        maxLevel = level;
      }
    });

    return {
      text: RiskLevelUtils.getRiskLevelText(maxLevel),
      cssClass: RiskLevelUtils.getRiskLevelClass(maxLevel)
    };
  };

  // Function to get the blue circle indicator for benefits table cells
  const getBenefitsIndicator = (benefitField, confidenceLevel) => {
    const selectedValue = selectedValues[benefitField];
    if (!selectedValue) return { indicator: '', cellClass: '' };
    
    const confidenceMapping = {
      'na': 'very_low_na',
      'very_low': 'very_low_na', 
      'low': 'low',
      'mid_range': 'mid_range',
      'high': 'high',
      'very_high': 'very_high'
    };
    
    if (confidenceMapping[selectedValue] === confidenceLevel) {
      return { 
        indicator: <span style={{color: '#007bff', fontSize: '24px'}}>🔵</span>,
        cellClass: `air-benefits-cell-${confidenceLevel}`
      };
    }
    return { indicator: '', cellClass: '' };
  };

  // Function to check if any Community Benefits field has a value selected
  const hasBenefitsSelections = () => {
    const benefitsFields = [
      'communityBenefitsQuality',
      'communityBenefitsProcessing', 
      'communityBenefitsFinancial',
      'communityBenefitsAdaptable',
      'communityBenefitsNewService',
      'communityBenefitsInnovation'
    ];
    
    return benefitsFields.some(field => selectedValues[field] && selectedValues[field] !== '');
  };

  // Function to check if any Community Harms field has a value selected
  const hasHarmsSelections = () => {
    const harmsFields = [
      'communityHarmsPhysicalConfidenceLevel',
      'communityHarmsPsychologicalConfidenceLevel',
      'communityHarmsEnvironmentalConfidenceLevel',
      'communityHarmsUnauthorisedUseConfidenceLevel',
      'communityHarmsImpactOnRightsConfidenceLevel',
      'communityHarmsMisidentificationConfidenceLevel',
      'communityHarmsMisapplicationConfidenceLevel',
      'communityHarmsOtherFinancialImpactConfidenceLevel',
      'communityHarmsIncorrectAdviceConfidenceLevel',
      'communityHarmsInconvenienceDelayConfidenceLevel',
      'communityHarmsErosionOfTrustConfidenceLevel',
      'communityHarmsEthicalImplicationsConfidenceLevel',
      'communityHarmsEconomicDisruptionConfidenceLevel',
      'communityHarmsSocialInequalityConfidenceLevel',
      'communityHarmsOtherConfidenceLevel',
      'communityHarmsReversibleConfidenceLevel',
      'communityHarmsIrreversibleConfidenceLevel',
      'communityHarmsSecondaryCumulativeConfidenceLevel'
    ];
    
    return harmsFields.some(field => selectedValues[field] && selectedValues[field] !== '');
  };

  // Function to check if any Community Risks field has a value selected
  const hasRisksSelections = () => {
    const risksFields = [
      'communityRisksNewOrExistingService',
      'communityRisksDiscriminationUnintendedBias',
      'communityRisksSinglePointOfFailure',
      'communityRisksHumanOversight',
      'communityRisksOverRelianceFalseAlert',
      'communityRisksLinkageUnclear',
      'communityRisksExplainability',
      'communityRisksBudgetOverrun',
      'communityRisksNonAISystems',
      'communityRisksInformationCompliance'
    ];
    
    return risksFields.some(field => selectedValues[field] && selectedValues[field] !== '');
  };

  // Function to get the circle indicator for harms table cells (reversed colors)
  const getHarmsIndicator = (harmField, riskLevel) => {
    const selectedValue = selectedValues[harmField];
    if (!selectedValue) return { indicator: '', cellClass: '' };
    
    const riskMapping = {
      'na': 'very_low_na',
      'very_low': 'very_low_na', 
      'low': 'low',
      'mid_range': 'mid_range',
      'high': 'high',
      'very_high': 'very_high'
    };
    
    if (riskMapping[selectedValue] === riskLevel) {
      return { 
        indicator: <span style={{color: '#007bff', fontSize: '24px'}}>🔵</span>,
        cellClass: `air-harms-cell-${riskLevel}`
      };
    }
    return { indicator: '', cellClass: '' };
  };

  // Function to get the circle indicator for special harms fields with custom mappings
  const getHarmsIndicatorSpecial = (harmField, riskLevel) => {
    const selectedValue = selectedValues[harmField];
    if (!selectedValue) return { indicator: '', cellClass: '' };
    
    // Map the special field values to risk levels
    const getSpecialRiskLevel = (field, value) => {
      if (field === 'communityHarmsReversibleConfidenceLevel') {
        switch (value) {
          case 'unclear': return 'high'; // High risk
          case 'yes-high': return 'high'; // High risk
          case 'yes-low': return 'low'; // Low risk
          case 'no': return 'low'; // Low risk
          default: return null;
        }
      }
      
      if (field === 'communityHarmsIrreversibleConfidenceLevel') {
        switch (value) {
          case 'yes-veryhigh': return 'very_high'; // Very High risk
          case 'unclear-veryhigh': return 'very_high'; // Very High risk
          case 'yes-high': return 'high'; // High risk (better than existing)
          case 'no': return 'low'; // Low risk
          default: return null;
        }
      }
      
      if (field === 'communityHarmsSecondaryCumulativeConfidenceLevel') {
        switch (value) {
          case 'unclear-veryhigh': return 'very_high'; // Very High risk
          case 'yes-high': return 'very_high'; // Very High risk
          case 'yes-low': return 'low'; // Low risk
          case 'no': return 'low'; // Low risk
          default: return null;
        }
      }
      
      return null;
    };
    
    const mappedRiskLevel = getSpecialRiskLevel(harmField, selectedValue);
    if (!mappedRiskLevel) return { indicator: '', cellClass: '' };
    
    // Convert risk level to table column format
    const riskMapping = {
      'very_low': 'very_low_na',
      'low': 'low',
      'mid_range': 'mid_range',
      'high': 'high',
      'very_high': 'very_high'
    };
    
    if (riskMapping[mappedRiskLevel] === riskLevel) {
      return { 
        indicator: <span style={{color: '#007bff', fontSize: '24px'}}>🔵</span>,
        cellClass: `air-harms-cell-${riskLevel}`
      };
    }
    return { indicator: '', cellClass: '' };
  };

  // Function to get the circle indicator for risks table cells (first 7 standard fields)
  const getRisksIndicator = (riskField, riskLevel) => {
    const selectedValue = selectedValues[riskField];
    if (!selectedValue) return { indicator: '', cellClass: '' };
    
    const riskMapping = {
      'new': 'very_low_na', // N/A
      'existing': 'low', // Low Risk
      'unclear': 'mid_range', // Mid-range Risk
      'high': 'high', // High Risk
      'very-high': 'very_high' // Very High Risk
    };
    
    if (riskMapping[selectedValue] === riskLevel) {
      return { 
        indicator: <span style={{color: '#007bff', fontSize: '24px'}}>🔵</span>,
        cellClass: `air-risks-cell-${riskLevel}`
      };
    }
    return { indicator: '', cellClass: '' };
  };

  // Function to get the circle indicator for special risks fields with custom mappings
  const getRisksIndicatorSpecial = (riskField, riskLevel) => {
    const selectedValue = selectedValues[riskField];
    if (!selectedValue) return { indicator: '', cellClass: '' };
    
    // Map the special field values to risk levels
    const getSpecialRiskLevel = (field, value) => {
      if (field === 'communityRisksNonAISystems') {
        switch (value) {
          case 'no': return 'very_high'; // Very High risk - not considering alternatives
          case 'informally': return 'high'; // High risk - informal consideration
          case 'yes': return 'low'; // Low risk - proper consideration
          case 'na': return 'very_low_na'; // N/A
          default: return null;
        }
      }
      
      if (field === 'communityRisksInformationCompliance') {
        switch (value) {
          case 'no': return 'very_high'; // Very High risk - non-compliance
          case 'unclear': return 'very_high'; // Very High risk - uncertainty
          case 'yes': return 'low'; // Low risk - compliant
          default: return null;
        }
      }
      
      return null;
    };
    
    const mappedRiskLevel = getSpecialRiskLevel(riskField, selectedValue);
    if (!mappedRiskLevel) return { indicator: '', cellClass: '' };
    
    if (mappedRiskLevel === riskLevel) {
      return { 
        indicator: <span style={{color: '#007bff', fontSize: '24px'}}>🔵</span>,
        cellClass: `air-risks-cell-${riskLevel}`
      };
    }
    return { indicator: '', cellClass: '' };
  };

  // Check if any fairness selections have been made
  const hasFairnessSelections = () => {
    // Fairness fields focus on algorithmic fairness and bias assessment
    const allFairnessFields = [
      // Risk assessment fields
      'fairnessRisksIncompleteData',
      'fairnessRisksPoorlyDefined', 
      'fairnessRisksNoMonitoring',
      'fairnessRisksOutlierData',
      'fairnessRisksDataCleansing',
      'fairnessRisksBiasDetection',
      'fairnessRisksReproducibility',
      'fairnessRisksDataLinking',
      'fairnessRisksTrainingData',
      // Note: Sensitive data fields (fairnessControlsSensitive*) moved to Privacy and Security
      // Fairness control fields
      'fairnessControlsDataSelection',
      'fairnessControlsDataAvailability', 
      'fairnessControlsDataPopulation',
      'fairnessControlsDiversityInclusion',
      'fairnessControlsGenderMinority',
      'fairnessControlsPerformanceMeasures',
      'fairnessControlsPerformanceCalibration'
    ];
    return allFairnessFields.some(field => selectedValues[field] && selectedValues[field] !== '');
  };

  // Get fairness risk indicator for table
  const getFairnessIndicator = (fieldValue, riskLevel) => {
    if (!fieldValue) {
      return { indicator: '', cellClass: '' };
    }
    
    // Handle N/A case
    if (riskLevel === 'very_low_na' && (fieldValue === 'na' || fieldValue === '')) {
      return { 
        indicator: <span style={{color: '#007bff', fontSize: '24px'}}>🔵</span>,
        cellClass: `air-risks-cell-very_low_na`
      };
    }
    
    // Map special field values to standard risk levels
    let mappedRiskLevel = fieldValue;
    
    // Handle special mappings for certain fields
    if (fieldValue === 'no' || fieldValue === 'unclear' || fieldValue === 'no-or-unclear' || fieldValue === 'no-elevated') {
      mappedRiskLevel = 'very-high';
    } else if (fieldValue === 'no-but-better' || fieldValue === 'yes-high' || fieldValue === 'partially-but-better') {
      mappedRiskLevel = 'high';
    } else if (fieldValue === 'no-nonelevated') {
      mappedRiskLevel = 'mid-range';
    } else if (fieldValue === 'yes' || fieldValue === 'yes-low') {
      mappedRiskLevel = 'low';
    }
    
    // Normalize risk level names to match field values (convert underscores to hyphens)
    let normalizedRiskLevel = riskLevel;
    if (riskLevel === 'very_high') {
      normalizedRiskLevel = 'very-high';
    } else if (riskLevel === 'mid_range') {
      normalizedRiskLevel = 'mid-range';
    }
    
    if (mappedRiskLevel === normalizedRiskLevel) {
      return { 
        indicator: <span style={{color: '#007bff', fontSize: '24px'}}>🔵</span>,
        cellClass: `air-risks-cell-${riskLevel}`
      };
    }
    return { indicator: '', cellClass: '' };
  };

  // Get accountability risk indicator for table
  const getAccountabilityIndicator = (fieldName, fieldValue, riskLevel) => {
    if (!fieldValue) {
      return { indicator: '', cellClass: '' };
    }
    
    // Handle standard accountability fields (first 5 fields)
    const standardFields = ['accountabilityTraining', 'accountabilityAwareness', 'accountabilityDocumentation', 
                           'accountabilityDecisionHistory', 'accountabilityThirdParties'];
    
    if (standardFields.includes(fieldName)) {
      // Handle N/A and very-low case
      if (riskLevel === 'very_low_na' && (fieldValue === 'na' || fieldValue === 'very-low')) {
        return { 
          indicator: <span style={{color: '#007bff', fontSize: '24px'}}>🔵</span>,
          cellClass: `air-risks-cell-very_low_na`
        };
      }
      
      // Map field values to risk levels
      let mappedRiskLevel = fieldValue;
      
      // Normalize risk level names
      let normalizedRiskLevel = riskLevel;
      if (riskLevel === 'very_high') {
        normalizedRiskLevel = 'very-high';
      } else if (riskLevel === 'mid_range') {
        normalizedRiskLevel = 'mid-range';
      }
      
      if (mappedRiskLevel === normalizedRiskLevel) {
        return { 
          indicator: <span style={{color: '#007bff', fontSize: '24px'}}>🔵</span>,
          cellClass: `air-risks-cell-${riskLevel}`
        };
      }
    }
    
    // Handle responsible officer fields
    if (fieldName.startsWith('accountabilityResponsible')) {
      if (riskLevel === 'very_low_na' && (fieldValue === 'na' || fieldValue === 'very-low')) {
        return { 
          indicator: <span style={{color: '#007bff', fontSize: '24px'}}>🔵</span>,
          cellClass: `air-risks-cell-very_low_na`
        };
      }
      if (riskLevel === 'low' && fieldValue === 'low') {
        return { 
          indicator: <span style={{color: '#007bff', fontSize: '24px'}}>🔵</span>,
          cellClass: `air-risks-cell-low`
        };
      }
      if (riskLevel === 'very_high' && fieldValue === 'very-high') {
        return { 
          indicator: <span style={{color: '#007bff', fontSize: '24px'}}>🔵</span>,
          cellClass: `air-risks-cell-very_high`
        };
      }
    }
    
    // Handle process fields (intervention and overconfidence)
    if (fieldName === 'accountabilityInterventionProcess' || fieldName === 'accountabilityOverconfidenceProcess') {
      if (riskLevel === 'very_low_na' && (fieldValue === 'na' || fieldValue === 'very-low')) {
        return { 
          indicator: <span style={{color: '#007bff', fontSize: '24px'}}>🔵</span>,
          cellClass: `air-risks-cell-very_low_na`
        };
      }
      if (riskLevel === 'low' && fieldValue === 'low') {
        return { 
          indicator: <span style={{color: '#007bff', fontSize: '24px'}}>🔵</span>,
          cellClass: `air-risks-cell-low`
        };
      }
      if (riskLevel === 'very_high' && fieldValue === 'very-high') {
        return { 
          indicator: <span style={{color: '#007bff', fontSize: '24px'}}>🔵</span>,
          cellClass: `air-risks-cell-very_high`
        };
      }
    }
    
    return { indicator: '', cellClass: '' };
  };

  // Get procurement risk indicator for table
  const getProcurementIndicator = (fieldName, fieldValue, riskLevel) => {
    if (!fieldValue) {
      return { indicator: '', cellClass: '' };
    }
    
    // Handle procurement field mappings
    let mappedRiskLevel = '';
    
    if (fieldName === 'procurementControls') {
      switch (fieldValue) {
        case 'yes': mappedRiskLevel = 'low'; break;
        case 'no': 
        case 'unclear': mappedRiskLevel = 'very-high'; break;
        default: break;
      }
    } else if (fieldName === 'procurementContractualClauses') {
      switch (fieldValue) {
        case 'yes': mappedRiskLevel = 'low'; break;
        case 'no': 
        case 'unclear': mappedRiskLevel = 'very-high'; break;
        default: break;
      }
    } else if (fieldName === 'procurementSupplierQuestions') {
      switch (fieldValue) {
        case 'yes': 
        case 'unclear': mappedRiskLevel = 'very-high'; break;
        case 'no': mappedRiskLevel = 'low'; break;
        default: break;
      }
    } else if (fieldName === 'procurementResidualRiskFactors') {
      switch (fieldValue) {
        case 'yes': 
        case 'unclear': mappedRiskLevel = 'high'; break;
        case 'no': mappedRiskLevel = 'low'; break;
        default: break;
      }
    } else if (fieldName === 'procurementSystemRequirements') {
      switch (fieldValue) {
        case 'yes': mappedRiskLevel = 'low'; break;
        case 'no': 
        case 'unclear': mappedRiskLevel = 'very-high'; break;
        default: break;
      }
    } else if (fieldName === 'procurementRiskTreatments') {
      switch (fieldValue) {
        case 'yes': mappedRiskLevel = 'low'; break;
        case 'no': 
        case 'unclear': mappedRiskLevel = 'very-high'; break;
        default: break;
      }
    }
    
    // Normalize risk level names
    let normalizedRiskLevel = riskLevel;
    if (riskLevel === 'very_high') {
      normalizedRiskLevel = 'very-high';
    } else if (riskLevel === 'mid_range') {
      normalizedRiskLevel = 'mid-range';
    }
    
    if (mappedRiskLevel === normalizedRiskLevel) {
      return { 
        indicator: <span style={{color: '#007bff', fontSize: '24px'}}>🔵</span>,
        cellClass: `air-risks-cell-${riskLevel}`
      };
    }
    
    return { indicator: '', cellClass: '' };
  };

  // Get overall risk indicator for summary table
  const getOverallRiskIndicator = (category, riskLevel) => {
    let highestRisk = { text: 'Not Set', cssClass: 'not-set' };
    
    if (category === 'community') {
      // Get highest risk from Community Harms and Community Risks
      const harmsRisk = getCommunityHarmsHighestRisk();
      const risksRisk = getCommunityRisksHighestRisk();
      
      // Convert risk levels to numeric values for comparison
      const riskLevelValues = {
        'Very High': 6, 'High': 5, 'Mid-range': 4, 'Low': 3, 'Very Low': 2, 'N/A': 1, 'Not Set': 0
      };
      
      const harmsValue = riskLevelValues[harmsRisk.text] || 0;
      const risksValue = riskLevelValues[risksRisk.text] || 0;
      
      highestRisk = harmsValue >= risksValue ? harmsRisk : risksRisk;
      
    } else if (category === 'fairness') {
      highestRisk = getFairnessHighestRisk();
      
    } else if (category === 'privacy') {
      highestRisk = getPrivacyAndSecurityHighestRisk();
      
    } else if (category === 'transparency') {
      highestRisk = getTransparencyHighestRisk();
      
    } else if (category === 'accountability') {
      highestRisk = getAccountabilityHighestRisk();
    }
    
    // Normalize risk level names for comparison
    let normalizedRiskLevel = riskLevel;
    if (riskLevel === 'very_high') {
      normalizedRiskLevel = 'very-high';
    } else if (riskLevel === 'mid_range') {
      normalizedRiskLevel = 'mid-range';
    } else if (riskLevel === 'very_low_na') {
      normalizedRiskLevel = 'very-low';
    }
    
    // Check if this risk level matches the highest risk for this category
    let categoryRiskLevel = highestRisk.cssClass;
    if (categoryRiskLevel === 'very-low' || categoryRiskLevel === 'na') {
      categoryRiskLevel = 'very-low';
    }
    
    // Handle "not-set" case - treat as very low/N/A
    if (categoryRiskLevel === 'not-set' && riskLevel === 'very_low_na') {
      categoryRiskLevel = 'very-low';
      normalizedRiskLevel = 'very-low';
    }
    
    if (categoryRiskLevel === normalizedRiskLevel || 
        (riskLevel === 'very_low_na' && (categoryRiskLevel === 'very-low' || categoryRiskLevel === 'na' || categoryRiskLevel === 'not-set'))) {
      return { 
        indicator: <span style={{color: '#007bff', fontSize: '24px'}}>🔵</span>,
        cellClass: `air-risks-cell-${riskLevel}`
      };
    }
    
    return { indicator: '', cellClass: '' };
  };

  // Get highest risk rating in Transparency fieldset
  const getTransparencyHighestRisk = () => {
    const reverseLevels = {
      6: { text: 'Very High', cssClass: 'very-high' },
      5: { text: 'High', cssClass: 'high' },
      4: { text: 'Mid-range', cssClass: 'mid-range' },
      3: { text: 'Low', cssClass: 'low' },
      2: { text: 'Very Low', cssClass: 'very-low' },
      1: { text: 'N/A', cssClass: 'na' },
      0: { text: 'Not Set', cssClass: 'not-set' }
    };

    let maxLevel = 0;

    // Standard risk levels mapping for most transparency fields
    const standardRiskLevels = {
      'very_high': 6,
      'very-high': 6,
      'high': 5,
      'mid_range': 4,
      'mid-range': 4,
      'low': 3,
      'very_low': 2,
      'na': 1,
      '': 0
    };

    // Standard transparency fields with direct risk level mappings
    const standardTransparencyFields = [
      'transparencyPurpose',
      'transparencyDataSources',
      'transparencyDataUsage', 
      'transparencyPublicAwareness',
      'transparencyUserFeedback',
      'transparencyAuditability'
    ];

    standardTransparencyFields.forEach(field => {
      const value = selectedValues[field] || '';
      const level = standardRiskLevels[value] || 0;
      if (level > maxLevel) {
        maxLevel = level;
      }
    });

    // Special transparency fields with custom mappings
    const getSpecialTransparencyFieldLevel = (field, value) => {
      if (!value) return 0;
      
      if (field === 'transparencyConsultation') {
        switch (value) {
          case 'no': return 6; // Very High Risk
          case 'partially': return 5; // High Risk
          case 'authorised-use': return 4; // Mid-range Risk
          case 'yes': return 3; // Low Risk
          case 'na': return 1; // N/A
          default: return 0;
        }
      }
      
      if (field === 'transparencyScopeGoals') {
        switch (value) {
          case 'no': return 6; // Very High Risk
          case 'yes': return 3; // Low Risk
          case 'na': return 1; // N/A
          default: return 0;
        }
      }
      
      if (field === 'transparencyRightToAppeal') {
        switch (value) {
          case 'no': return 6; // Very High Risk
          case 'yes': return 3; // Low Risk
          case 'na': return 1; // N/A
          default: return 0;
        }
      }
      
      if (field === 'transparencyClearExplanations') {
        switch (value) {
          case 'no': return 6; // Very High Risk
          case 'no-but-person-decision': return 5; // High Risk
          case 'yes': return 3; // Low Risk
          case 'na': return 1; // N/A
          default: return 0;
        }
      }
      
      return 0;
    };

    // Process special transparency fields
    const specialTransparencyFields = [
      'transparencyConsultation',
      'transparencyScopeGoals',
      'transparencyRightToAppeal',
      'transparencyClearExplanations'
    ];

    specialTransparencyFields.forEach(field => {
      const value = selectedValues[field] || '';
      const level = getSpecialTransparencyFieldLevel(field, value);
      if (level > maxLevel) {
        maxLevel = level;
      }
    });

    return reverseLevels[maxLevel] || reverseLevels[0];
  };

  // Check if there are any transparency field selections
  const hasTransparencySelections = () => {
    const allTransparencyFields = [
      'transparencyPurpose',
      'transparencyDataSources',
      'transparencyDataUsage',
      'transparencyPublicAwareness',
      'transparencyUserFeedback',
      'transparencyAuditability',
      'transparencyConsultation',
      'transparencyScopeGoals',
      'transparencyRightToAppeal',
      'transparencyClearExplanations'
    ];
    return allTransparencyFields.some(field => selectedValues[field] && selectedValues[field] !== '');
  };

  // Get transparency risk indicator for table
  const getTransparencyIndicator = (fieldValue, riskLevel) => {
    if (!fieldValue) {
      return { indicator: '', cellClass: '' };
    }
    
    // Handle N/A case
    if (riskLevel === 'very_low_na' && (fieldValue === 'na' || fieldValue === '')) {
      return { 
        indicator: <span style={{color: '#007bff', fontSize: '24px'}}>🔵</span>,
        cellClass: `air-risks-cell-very_low_na`
      };
    }
    
    // Map special field values to standard risk levels
    let mappedRiskLevel = fieldValue;
    
    // Handle special mappings for certain fields
    if (fieldValue === 'no' || fieldValue === 'unclear') {
      mappedRiskLevel = 'very-high';
    } else if (fieldValue === 'no-but-person-decision' || fieldValue === 'partially') {
      mappedRiskLevel = 'high';
    } else if (fieldValue === 'yes') {
      mappedRiskLevel = 'low';
    } else if (fieldValue === 'authorised-use') {
      mappedRiskLevel = 'mid-range';
    }
    
    // Normalize risk level names to match field values (convert underscores to hyphens)
    let normalizedRiskLevel = riskLevel;
    if (riskLevel === 'very_high') {
      normalizedRiskLevel = 'very-high';
    } else if (riskLevel === 'mid_range') {
      normalizedRiskLevel = 'mid-range';
    }
    
    if (mappedRiskLevel === normalizedRiskLevel) {
      return { 
        indicator: <span style={{color: '#007bff', fontSize: '24px'}}>🔵</span>,
        cellClass: `air-risks-cell-${riskLevel}`
      };
    }
    return { indicator: '', cellClass: '' };
  };

  // Get highest risk rating in Accountability fieldset
  const getAccountabilityHighestRisk = () => {
    const reverseLevels = {
      6: { text: 'Very High', cssClass: 'very-high' },
      5: { text: 'High', cssClass: 'high' },
      4: { text: 'Mid-range', cssClass: 'mid-range' },
      3: { text: 'Low', cssClass: 'low' },
      2: { text: 'Very Low', cssClass: 'very-low' },
      1: { text: 'N/A', cssClass: 'na' },
      0: { text: 'Not Set', cssClass: 'not-set' }
    };

    let maxLevel = 0;

    // Special accountability fields with custom mappings
    const getSpecialAccountabilityFieldLevel = (field, value) => {
      if (!value) return 0;
      
      // All the responsible officer fields have the same mapping
      if (field.startsWith('accountabilityResponsible')) {
        switch (value) {
          case 'very-high': return 6; // "No or unclear" = Very High Risk
          case 'low': return 3; // "Yes" = Low Risk
          default: return 0;
        }
      }
      
      if (field === 'accountabilityInterventionProcess' || field === 'accountabilityOverconfidenceProcess') {
        switch (value) {
          case 'very-high': return 6; // Very High Risk
          case 'low': return 3; // Low Risk
          case 'na': return 1; // N/A
          default: return 0;
        }
      }
      
      // Standard risk mapping for the new accountability fields
      if (['accountabilityTraining', 'accountabilityAwareness', 'accountabilityDocumentation', 
           'accountabilityDecisionHistory', 'accountabilityThirdParties'].includes(field)) {
        switch (value) {
          case 'very-high': return 6;
          case 'high': return 5;
          case 'mid-range': return 4;
          case 'low': return 3;
          case 'na': return 1;
          default: return 0;
        }
      }
      
      return 0;
    };

    // Process accountability fields with special mappings
    const accountabilityFields = [
      'accountabilityTraining',
      'accountabilityAwareness', 
      'accountabilityDocumentation',
      'accountabilityDecisionHistory',
      'accountabilityThirdParties',
      'accountabilityResponsibleUse',
      'accountabilityResponsiblePolicy',
      'accountabilityResponsibleMonitoring',
      'accountabilityResponsibleDataGovernance',
      'accountabilityResponsibleTechnicalGovernance',
      'accountabilityResponsibleAppealRedress',
      'accountabilityInterventionProcess',
      'accountabilityOverconfidenceProcess'
    ];

    accountabilityFields.forEach(field => {
      const value = selectedValues[field] || '';
      const level = getSpecialAccountabilityFieldLevel(field, value);
      if (level > maxLevel) {
        maxLevel = level;
      }
    });

    return reverseLevels[maxLevel] || reverseLevels[0];
  };

  // Get highest risk rating in Procurement fieldset
  const getProcurementHighestRisk = () => {
    const reverseLevels = {
      6: { text: 'Very High', cssClass: 'very-high' },
      5: { text: 'High', cssClass: 'high' },
      4: { text: 'Mid-range', cssClass: 'mid-range' },
      3: { text: 'Low', cssClass: 'low' },
      2: { text: 'Very Low', cssClass: 'very-low' },
      1: { text: 'N/A', cssClass: 'na' },
      0: { text: 'Not Set', cssClass: 'not-set' }
    };

    let maxLevel = 0;

    // Special procurement fields with custom mappings
    const getSpecialProcurementFieldLevel = (field, value) => {
      if (!value) return 0;
      
      if (field === 'procurementControls') {
        switch (value) {
          case 'yes': return 3; // Low Risk
          case 'no': return 6; // Very High Risk
          case 'unclear': return 6; // Very High Risk
          default: return 0;
        }
      }
      
      if (field === 'procurementContractualClauses') {
        switch (value) {
          case 'yes': return 3; // Low Risk
          case 'no': return 6; // Very High Risk
          case 'unclear': return 6; // Very High Risk
          default: return 0;
        }
      }
      
      if (field === 'procurementSupplierQuestions') {
        switch (value) {
          case 'yes': return 6; // Very High Risk
          case 'no': return 3; // Low Risk
          case 'unclear': return 6; // Very High Risk
          default: return 0;
        }
      }
      
      if (field === 'procurementResidualRiskFactors') {
        switch (value) {
          case 'yes': return 5; // High Risk
          case 'no': return 3; // Low Risk
          case 'unclear': return 5; // High Risk
          default: return 0;
        }
      }
      
      if (field === 'procurementSystemRequirements') {
        switch (value) {
          case 'yes': return 3; // Low Risk
          case 'no': return 6; // Very High Risk
          case 'unclear': return 6; // Very High Risk
          default: return 0;
        }
      }
      
      if (field === 'procurementRiskTreatments') {
        switch (value) {
          case 'yes': return 3; // Low Risk
          case 'no': return 6; // Very High Risk
          case 'unclear': return 6; // Very High Risk
          default: return 0;
        }
      }
      
      return 0;
    };

    // Process procurement fields with special mappings
    const procurementFields = [
      'procurementControls',
      'procurementContractualClauses',
      'procurementSupplierQuestions',
      'procurementResidualRiskFactors',
      'procurementSystemRequirements',
      'procurementRiskTreatments'
    ];

    procurementFields.forEach(field => {
      const value = selectedValues[field] || '';
      const level = getSpecialProcurementFieldLevel(field, value);
      if (level > maxLevel) {
        maxLevel = level;
      }
    });

    return reverseLevels[maxLevel] || reverseLevels[0];
  };

  // Get highest risk rating in Privacy and Security fieldset
  const getPrivacyAndSecurityHighestRisk = () => {
    const reverseLevels = {
      6: { text: 'Very High', cssClass: 'very-high' },
      5: { text: 'High', cssClass: 'high' },
      4: { text: 'Mid-range', cssClass: 'mid-range' },
      3: { text: 'Low', cssClass: 'low' },
      2: { text: 'Very Low', cssClass: 'very-low' },
      1: { text: 'N/A', cssClass: 'na' },
      0: { text: 'Not Set', cssClass: 'not-set' }
    };

    let maxLevel = 0;

    // Privacy and Security fields include both sensitive data and privacy controls
    const privacySecurityFields = [
      // Sensitive Data Cohort fields (currently in fairness section but belong to privacy)
      'privacyControlsSensitiveChildren',
      'privacyControlsSensitiveReligious',
      'privacyControlsSensitiveRacial',
      'privacyControlsSensitivePolitical',
      'privacyControlsSensitiveUnion',
      'privacyControlsSensitiveGender',
      'privacyControlsSensitiveCriminalRecord',
      'privacyControlsSensitiveHealth',
      'privacyControlsSensitiveBiometric',
      'privacyControlsSensitiveOtherData',
      // Privacy Controls
      'privacyByDesign',
      'privacyImpactAssessment',
      'privacyControlsConsent',
      'privacyControlsCyberSecurity',
      'privacyControlsSensitiveData'
    ];

    privacySecurityFields.forEach(field => {
      const value = selectedValues[field] || '';
      let level = 0;

      if (field.startsWith('privacyControlsSensitive')) {
        // Standard risk level mapping for sensitive data cohort size
        switch (value) {
          case 'very-high': level = 6;
            break;
          case 'high': level = 5;
            break;
          case 'mid-range': level = 4;
            break;
          case 'low': level = 3;
            break;
          case 'na': level = 1;
            break;
          default: level = 0;
        }
      } else if (field === 'privacyByDesign') {
        switch (value) {
          case 'yes-low': level = 3; // "Yes" = Low Risk
            break;
          case 'partial': level = 5; // "Partially" = High Risk
            break;
          case 'no-or-unclear': level = 6; // "No or unclear" = Very High Risk
            break;
          default: level = 0;
        }
      } else if (field === 'privacyImpactAssessment') {
        switch (value) {
          case 'yes-low': level = 3; // "Yes" = Low Risk
            break;
          case 'no': level = 6; // "No" = Very High Risk
            break;
          case 'na': level = 1; // "N/A" = N/A
            break;
          default: level = 0;
        }
      } else if (field === 'privacyControlsConsent') {
        switch (value) {
          case 'low': level = 3; // "Yes" = Low Risk
            break;
          case 'midrange': level = 4; // "Authorised use" = Mid-range Risk
            break;
          case 'high': level = 5; // "Partially" = High Risk
            break;
          case 'very-high': level = 6; // "No" = Very High Risk
            break;
          case 'na': level = 1; // "N/A" = N/A
            break;
          default: level = 0;
        }
      } else if (field === 'privacyControlsCyberSecurity') {
        switch (value) {
          case 'low': level = 3; // "Yes" = Low Risk
            break;
          case 'very-high': level = 6; // "No or Partially" = Very High Risk
            break;
          default: level = 0;
        }
      } else if (field === 'privacyControlsSensitiveData') {
        switch (value) {
          case 'low': level = 3; // "No" = Low Risk
            break;
          case 'very-high': level = 6; // "Yes" = Very High Risk
            break;
          case 'unclear': level = 6; // "Unclear" = Very High Risk
            break;
          default: level = 0;
        }
      }

      if (level > maxLevel) {
        maxLevel = level;
      }
    });

    return reverseLevels[maxLevel] || reverseLevels[0];
  };

  // Check if Privacy and Security fieldset has any selections
  const hasPrivacyAndSecuritySelections = () => {
    const privacySecurityFields = [
      'privacyControlsSensitiveChildren',
      'privacyControlsSensitiveReligious',
      'privacyControlsSensitiveRacial',
      'privacyControlsSensitivePolitical',
      'privacyControlsSensitiveUnion',
      'privacyControlsSensitiveGender',
      'privacyControlsSensitiveCriminalRecord',
      'privacyControlsSensitiveHealth',
      'privacyControlsSensitiveBiometric',
      'privacyControlsSensitiveOtherData',
      'privacyByDesign',
      'privacyImpactAssessment',
      'privacyControlsConsent',
      'privacyControlsCyberSecurity',
      'privacyControlsSensitiveData'
    ];
    
    return privacySecurityFields.some(field => selectedValues[field]);
  };

  // Get Privacy and Security indicator for summary table
  const getPrivacyAndSecurityIndicator = (fieldValue, riskLevel) => {
    if (!fieldValue) {
      return { indicator: '', cellClass: '' };
    }

    let mappedRiskLevel = '';
    
    // Handle field mapping based on the field value
    switch (fieldValue) {
      case 'very-high': mappedRiskLevel = 'very-high'; break;
      case 'high': mappedRiskLevel = 'high'; break;
      case 'mid-range': mappedRiskLevel = 'mid-range'; break;
      case 'midrange': mappedRiskLevel = 'mid-range'; break;
      case 'low': mappedRiskLevel = 'low'; break;
      case 'na': mappedRiskLevel = 'very-low'; break;
      case 'no': mappedRiskLevel = 'very-high'; break;
      case 'unclear': mappedRiskLevel = 'very-high'; break;
      // Privacy by Design specific mappings
      case 'yes-low': mappedRiskLevel = 'low'; break;
      case 'partial': mappedRiskLevel = 'high'; break;
      case 'no-or-unclear': mappedRiskLevel = 'very-high'; break;
      default: return { indicator: '', cellClass: '' };
    }

    // Normalize risk level names
    let normalizedRiskLevel = riskLevel;
    if (riskLevel === 'very_high') {
      normalizedRiskLevel = 'very-high';
    } else if (riskLevel === 'mid_range') {
      normalizedRiskLevel = 'mid-range';
    } else if (riskLevel === 'very_low_na') {
      normalizedRiskLevel = 'very-low';
    }

    if (mappedRiskLevel === normalizedRiskLevel || 
        (riskLevel === 'very_low_na' && (mappedRiskLevel === 'very-low' || mappedRiskLevel === 'na'))) {
      return { 
        indicator: <span style={{color: '#007bff', fontSize: '24px'}}>🔵</span>,
        cellClass: `air-risks-cell-${riskLevel}`
      };
    }

    return { indicator: '', cellClass: '' };
  };

  return (    
    <form onSubmit={handleFormSubmit}>
        <details className="air-inputform-details" open={fieldsOpen}>
            <summary className="air-inputform-summary">
            ✏️ AI Risk Input Form
            </summary>

            {/* View Mode Toggle */}
            <div className="air-viewmode-container">
                <label>
                View Mode:
                </label>
                <div className="air-viewmode-options">
                <label className="air-viewmode-label">
                    <input
                    type="radio"
                    value="basic"
                    checked={viewMode === 'basic'}
                    onChange={(e) => setViewMode(e.target.value)}
                    />
                    Basic (Essential fields only)
                </label>
                <label className="air-viewmode-label">
                    <input
                    type="radio"
                    value="extended"
                    checked={viewMode === 'extended'}
                    onChange={(e) => setViewMode(e.target.value)}
                    />
                    Extended (All fields)
                </label>
                <label className="air-viewmode-label">
                    <input
                    type="radio"
                    value="summary"
                    checked={viewMode === 'summary'}
                    onChange={(e) => setViewMode(e.target.value)}
                    />
                    Summary (Risk summaries only)
                </label>
                </div>
            </div>

            {/* Regular View - Full Form Content */}
            <table className="air-inputform-table">
                <tbody>
                    {/* AI Risk Details */}
                    <tr>
                        <td colSpan={2}>
                            <fieldset className="air-inputform-fieldset air-inputform-fieldset-details">
                                <legend className="air-inputform-legend air-inputform-legend-details">AI Risk Details</legend>
                                <table className="air-inputform-field-table">
                                    <tbody>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Project / System Name:<span className="air-inputform-required">*</span></label></td>
                                            <td className="air-inputform-field-cell">
                                                <input type="text" name="projectName" value={form.projectName} onChange={handleChange} className="air-inputform-input" required />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Project / System Description:<span className="air-inputform-required">*</span></label></td>
                                            <td className="air-inputform-field-cell">
                                                <textarea name="projectDescription" value={form.projectDescription} onChange={handleChange} className="air-inputform-textarea" required></textarea>
                                            </td>
                                        </tr>
                                        {viewMode === 'extended' && viewMode !== 'summary' && (
                                            <>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Business Goals:</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <textarea name="businessGoals" value={form.businessGoals} onChange={handleChange} className="air-inputform-textarea"></textarea>
                                                </td>
                                            </tr>
                                            <tr title="What is the problem / challenge / issue being addressed?">
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Problem/Challenge Being Addressed:</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <textarea name="problemChallenge" value={form.problemChallenge} onChange={handleChange} className="air-inputform-textarea"></textarea>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">What is the system trying to achieve?</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <textarea name="systemGoals" value={form.systemGoals} onChange={handleChange} className="air-inputform-textarea"></textarea>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Why is an AI system the better way?</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <textarea name="aiJustification" value={form.aiJustification} onChange={handleChange} className="air-inputform-textarea"></textarea>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Strategic Alignment:</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <textarea name="strategicAlignment" value={form.strategicAlignment} onChange={handleChange} className="air-inputform-textarea" placeholder="List the strategic goals this solution aims to achieve"></textarea>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Project Sponsor:</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <input type="text" name="projectSponsor" value={form.projectSponsor} onChange={handleChange} className="air-inputform-input" placeholder="Name (role)" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Executive Sponsor:</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <input type="text" name="executiveSponsor" value={form.executiveSponsor} onChange={handleChange} className="air-inputform-input" placeholder="Name (role)" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Project Owner:</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <input type="text" name="projectOwner" value={form.projectOwner} onChange={handleChange} className="air-inputform-input" placeholder="Name (role)" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Technical System Owner:</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <input type="text" name="technicalSystemOwner" value={form.technicalSystemOwner} onChange={handleChange} className="air-inputform-input" placeholder="Name (role)" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Data Governance Owner:</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <input type="text" name="dataGovernanceOwner" value={form.dataGovernanceOwner} onChange={handleChange} className="air-inputform-input" placeholder="Name (role)" />
                                                </td>
                                            </tr>
                                            <tr title="Phase of the Project (design and develop; verify and validate through pilot; deploy and evaluate; operate / monitor / maintain; re-evaluate)">
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Phase of the Project:</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <select name="projectPhase" value={form.projectPhase} onChange={handleChange} className="air-inputform-select">
                                                        <option value="">Select...</option>
                                                        <option value="design_and_develop">Design and Develop</option>
                                                        <option value="verify_and_validate">Verify and Validate through Pilot</option>
                                                        <option value="deploy_and_evaluate">Deploy and Evaluate</option>
                                                        <option value="operate_monitor_maintain">Operate / Monitor / Maintain</option>
                                                        <option value="re_evaluate">Re-evaluate</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Assessed By:</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <input type="text" name="assessedBy" value={form.assessedBy} onChange={handleChange} className="air-inputform-input" placeholder="Name (role)" />
                                                </td>                                            
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Assessment Contributors:</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <textarea name="contributors" value={form.contributors} onChange={handleChange} className="air-inputform-textarea" placeholder="Name (role), "></textarea>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Date of Assessment:</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <input type="date" name="assessmentDate" value={form.assessmentDate} onChange={handleChange} className="air-inputform-date" />
                                                </td>
                                            </tr>
                                            <tr title="Next date/milestone that will trigger the next review">
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Next Review Date:</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <input type="date" name="nextReviewDate" value={form.nextReviewDate} onChange={handleChange} className="air-inputform-date" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}><em>An AI Risk Assessment should be undertaken by individuals who are appropriately skilled and qualified for the role. These roles are referred to as responsible officers. 
                                                    A full assessment may require multiple perspectives and areas of expertise from various stakeholders covering different elements of project leadership, technical performance, and data governance. 
                                                    These roles hold independent responsibilities and must not be all held by the same person.</em></td>
                                            </tr>
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </fieldset>
                        </td>
                    </tr>
                    {/* Is the framework assessment required? */}
                    {viewMode !== 'basic' && viewMode !== 'summary' && (
                    <tr>
                        <td colSpan={2}>
                            <fieldset className="air-inputform-fieldset air-inputform-fieldset-required">
                                <legend className="air-inputform-legend air-inputform-legend-required">AI Assessment Required?</legend>
                                <table className="air-inputform-field-table">
                                    <tbody>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-assessment-label"><span className="air-inputform-assessment-strong-label">Buy AI and use - Buying or using an off the shelf system.</span> Used without modifying the algorithm or any risk mitigation tools, nor adding domain-specific content. i.e. ChatGPT, or AI in Salesforce, SAP, etc.</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="buyAI" className="air-inputform-select" value={selectedValues.buyAI || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </td>                                            
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-assessment-label"><span className="air-inputform-assessment-strong-label">Embed AI and/or co-train - Developing a product with embedded AI or purchasing an AI platform</span> and augmented training data with domain-specific content. i.e., integrating AI biometrics or developing a chatbot with augmented training.</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="embedAI" className="air-inputform-select" value={selectedValues.embedAI || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-assessment-label"><span className="air-inputform-assessment-strong-label">Develop AI and/or train - Developing an AI tool in-house.</span> Even if based on a standard platform, I am developing algorithms and supplying the training data. i.e. Developing anomaly detection or training LLM with domain-specific content.</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="developAI" className="air-inputform-select" value={selectedValues.developAI || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-assessment-label"><span className="air-inputform-assessment-strong-label">Automating decisions - Developing a tool in-house that uses AI</span> and that automates at least one critical step in the decision-making process. i.e. AI powered hiring and recruitment.</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="automatingDecisions" className="air-inputform-select" value={selectedValues.automatingDecisions || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </td>
                                        </tr>
                                        {/* Conditional notice based on AI implementation approach selections */}
                                        {(() => {
                                            const aiImplementationFields = [
                                                selectedValues.buyAI,
                                                selectedValues.embedAI,
                                                selectedValues.developAI,
                                                selectedValues.automatingDecisions
                                            ];
                                            
                                            const hasYesSelection = aiImplementationFields.some(value => value === 'yes');
                                            const allNoSelections = aiImplementationFields.every(value => value === 'no');
                                            
                                            if (hasYesSelection) {
                                                return (
                                                    <tr>
                                                        <td colSpan={2} className="air-risk-notice-guidance">
                                                            ℹ️ <strong>Consult the guidance as to whether an assessment is needed</strong>
                                                        </td>
                                                    </tr>
                                                );
                                            } else if (allNoSelections) {
                                                return (
                                                    <tr>
                                                        <td colSpan={2} className="air-risk-notice-low">
                                                            ✅ If you can answer No to all questions, there is no need to use the framework unless you have AI risk concerns.
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                            return null;
                                        })()}
                                        <tr>
                                            <td colSpan={2}><hr /></td>
                                        </tr>
                                                                    
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-assessment-label"><span className="air-inputform-assessment-strong-label">Operational Impact: Does your system produce or directly influence any administrative decisions</span> (operational decision with legal or similar significant effect)? i.e., automating decisions on issuing infringements.</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="impactsAdministrativeDecisions" className="air-inputform-select" value={selectedValues.impactsAdministrativeDecisions || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-assessment-label"><span className="air-inputform-assessment-strong-label">Operational Impact: Does your system trigger a real-world action with more than negligible potential effect</span> (meaningful change to environment or system state)? i.e., an automated alerting system.</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="triggersRealWorldAction" className="air-inputform-select" value={selectedValues.triggersRealWorldAction || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-assessment-label"><span className="air-inputform-assessment-strong-label">Autonomous: Does your system operate autonomously</span> or have potential to produce harmful outputs independently of human action, without requiring manual initiation? i.e., autonomous vehicles.</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="operatesAutonomously" className="air-inputform-select" value={selectedValues.operatesAutonomously || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-assessment-label"><span className="air-inputform-assessment-strong-label">Data Sensitivity: Was any part of your system trained using sensitive information</span> or can it produce outputs which contain sensitive information? i.e. a biometric based face matching system</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="dataSensitivity" className="air-inputform-select" value={selectedValues.dataSensitivity || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-assessment-label"><span className="air-inputform-assessment-strong-label">Unintended harms: Is there a risk of system failure, misuse, or being inappropriately deployed</span> that could cause harm to an individual or group? i.e., systems using unverifiable data inputs</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="unintendedHarms" className="air-inputform-select" value={selectedValues.unintendedHarms || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-assessment-label"><span className="air-inputform-assessment-strong-label">Explainability and Transparency: Does your system fail to provide explainability for generated content and decisions</span>, hindering comprehension by laypeople and assessment by technical experts? i.e., information informing policy development</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="explainability" className="air-inputform-select" value={selectedValues.explainability || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </td>
                                        </tr>
                                        {/* Conditional notice based on elevated risk selections */}
                                        {(() => {
                                            const elevatedRiskFields = [
                                                selectedValues.impactsAdministrativeDecisions,
                                                selectedValues.triggersRealWorldAction,
                                                selectedValues.operatesAutonomously,
                                                selectedValues.dataSensitivity,
                                                selectedValues.unintendedHarms,
                                                selectedValues.explainability
                                            ];
                                            
                                            const hasYesSelection = elevatedRiskFields.some(value => value === 'yes');
                                            const allNoSelections = elevatedRiskFields.every(value => value === 'no');
                                            
                                            if (hasYesSelection) {
                                                return (
                                                    <tr>
                                                        <td colSpan={2} className="air-risk-notice-elevated">
                                                            ⚠️ <strong>Yes:</strong> Your use is potentially at elevated risk. Additional mitigation covered in this framework will apply.
                                                        </td>
                                                    </tr>
                                                );
                                            } else if (allNoSelections) {
                                                return (
                                                    <tr>
                                                        <td colSpan={2} className="air-risk-notice-low">
                                                            ✅ If you can answer No to all questions it means you are not using AI in a manner which is potentially elevated risk.
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                            return null;
                                        })()}                                        
                                    </tbody>
                                </table>
                            </fieldset>
                        </td>
                    </tr>
                    )}
                    {/* Human Rights Impact Assessment Required? */}
                    {viewMode !== 'basic' && viewMode !== 'summary' && (
                    <>
                    <tr><td colSpan={3}><BackToTopButton /></td></tr>                    
                    <tr>
                        <td colSpan={3}>
                            <fieldset className="air-inputform-fieldset air-inputform-fieldset-hria">
                                <legend className="air-inputform-legend air-inputform-legend-hria">Human Rights Impact Assessment Required?</legend>
                                <table className="air-inputform-field-table">
                                    <tbody>
                                        <tr>
                                            <td colSpan={3}><em>Ensure AI use complies with legal protections for human rights. Human rights are legally recognised and protected through:
                                                <ul>
                                                    <li>Laws at the federal and state and territory levels</li>
                                                    <li>The Australian constitution</li>
                                                    <li>The common law</li>
                                                </ul>
                                                Applicable federal laws that protect human rights include:
                                                <ul>
                                                    <li>Australian Human Rights Commission Act 1986 (Cth)</li>
                                                    <li>Age Discrimination Act 2004 (Cth)</li>
                                                    <li>Disability Discrimination Act 1992 (Cth)</li>
                                                    <li>Racial Discrimination Act 1975 (Cth)</li>
                                                    <li>Sex Discrimination Act 1984 (Cth)</li>
                                                </ul>
                                                Also consider international human rights obligations Australia has agreed to, including:
                                                <ul>
                                                    <li>International Covenant on Civil and Political Rights (ICCPR)</li>
                                                    <li>International Covenant on Economic, Social and Cultural Rights (ICESCR)</li>
                                                    <li>Convention on the Rights of the Child (CRC)</li>
                                                    <li>Convention on the Elimination of All Forms of Discrimination Against Women (CEDAW)</li>
                                                </ul>
                                                <p>For more information, see the <a href="https://humanrights.gov.au/our-work/rights-and-freedoms" target="_blank" rel="noreferrer">Australian Human Rights Commission</a> and the <a href="https://www.ohchr.org/en/instruments-mechanisms/instruments/international-covenant-civil-and-political-rights" target="_blank" rel="noreferrer">Office of the United Nations High Commissioner for Human Rights</a>.</p>
                                            </em></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Will the AI system's outputs, content, recommendations, or results that arise from algorithmic decisions impact on individuals or groups and thus they will need to be informed?</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="humanRightsAlgorithmicDecision" className="air-inputform-select" value={selectedValues.humanRightsAlgorithmicDecision || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </td>
                                            <td className="air-inputform-field-cell">
                                                <textarea name="humanRightsAlgorithmicDecisionDetails" value={form.humanRightsAlgorithmicDecisionDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Are there possible trade-offs between the different principles and rights? If so, list the trade-offs and their implications and how they were addressed.</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="humanRightsTradeOffs" className="air-inputform-select" value={selectedValues.humanRightsTradeOffs || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </td>
                                            <td className="air-inputform-field-cell">
                                                <textarea name="humanRightsTradeOffsDetails" value={form.humanRightsTradeOffsDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Is the use of the AI system likely to restrict human rights? If so, is any such restriction publicly justifiable?</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="humanRightsImpact" className="air-inputform-select" value={selectedValues.humanRightsImpact || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </td>
                                            <td className="air-inputform-field-cell">
                                                <textarea name="humanRightsImpactDetails" value={form.humanRightsImpactDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Does the AI system suggest actions or decisions to make, or outline choices to human users?</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="humanRightsSuggestions" className="air-inputform-select" value={selectedValues.humanRightsSuggestions || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </td>
                                            <td className="air-inputform-field-cell">
                                                <textarea name="humanRightsSuggestionsDetails" value={form.humanRightsSuggestionsDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Could the AI system inadvertently impact human users' autonomy by influencing and obstructing their decision-making?</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="humanRightsAutonomy" className="air-inputform-select" value={selectedValues.humanRightsAutonomy || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </td>
                                            <td className="air-inputform-field-cell">
                                                <textarea name="humanRightsAutonomyDetails" value={form.humanRightsAutonomyDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea>
                                            </td>
                                        </tr>
                                        {/* If any of the above questions are true: If human rights risk being at risk, recommend conducting a Human Rights Impact Assessment (HRIA). */}
                                        {isHRIARequired() && (
                                            <tr>
                                                <td colSpan={3}>
                                                    <div className="air-hria-required-notification">
                                                        🚨 <strong>Human Rights Impact Assessment Required</strong><br/>
                                                        Based on your responses above, you should conduct a Human Rights Impact Assessment (HRIA) for this AI system. Human rights are at risk and require formal assessment and mitigation strategies.
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </fieldset>
                        </td>
                    </tr>
                    </>
                    )}
                    {/* Community Benefits - Confidence Level */}
                    {viewMode !== 'basic' && viewMode !== 'summary' && (
                    <tr>
                        <td colSpan={3}>
                            <fieldset className="air-inputform-fieldset air-inputform-fieldset-benefits">
                                <legend className="air-inputform-legend air-inputform-legend-benefits">Community / Organisational Benefits - Confidence Level AI Will Deliver</legend>
                                <table className="air-inputform-field-table">
                                    <tbody>
                                        <tr>
                                            <td colSpan={3}><em>All AI projects should have a benefits register that is kept up to date throughout the project. The benefits register should be maintained by the Responsible Officers.</em></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">A better-quality existing service or outcome (for example, accuracy or client satisfaction)</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="communityBenefitsQuality" className="air-inputform-select" value={selectedValues.communityBenefitsQuality || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low Confidence</option>
                                                    <option value="low">Low Confidence</option>
                                                    <option value="mid_range">Mid-range Confidence</option>
                                                    <option value="high">High Confidence</option>
                                                    <option value="very_high">Very High Confidence</option>
                                                </select>
                                            </td>
                                            <td><textarea name="communityBenefitsQualityDetails" value={form.communityBenefitsQualityDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">A reduction in processing or delivery times</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="communityBenefitsProcessing" className="air-inputform-select" value={selectedValues.communityBenefitsProcessing || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low Confidence</option>
                                                    <option value="low">Low Confidence</option>
                                                    <option value="mid_range">Mid-range Confidence</option>
                                                    <option value="high">High Confidence</option>
                                                    <option value="very_high">Very High Confidence</option>
                                                </select>
                                            </td>
                                            <td><textarea name="communityBenefitsProcessingDetails" value={form.communityBenefitsProcessingDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Financial efficiencies or savings</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="communityBenefitsFinancial" className="air-inputform-select" value={selectedValues.communityBenefitsFinancial || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low Confidence</option>
                                                    <option value="low">Low Confidence</option>
                                                    <option value="mid_range">Mid-range Confidence</option>
                                                    <option value="high">High Confidence</option>
                                                    <option value="very_high">Very High Confidence</option>
                                                </select>
                                            </td>
                                            <td><textarea name="communityBenefitsFinancialDetails" value={form.communityBenefitsFinancialDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">An AI capability that could be used or adapted by other departments or lines of business</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="communityBenefitsAdaptable" className="air-inputform-select" value={selectedValues.communityBenefitsAdaptable || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low Confidence</option>
                                                    <option value="low">Low Confidence</option>
                                                    <option value="mid_range">Mid-range Confidence</option>
                                                    <option value="high">High Confidence</option>
                                                    <option value="very_high">Very High Confidence</option>
                                                </select>
                                            </td>
                                            <td><textarea name="communityBenefitsAdaptableDetails" value={form.communityBenefitsAdaptableDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">A new service or outcome (particularly if it cannot be done without using AI)</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="communityBenefitsNewService" className="air-inputform-select" value={selectedValues.communityBenefitsNewService || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low Confidence</option>
                                                    <option value="low">Low Confidence</option>
                                                    <option value="mid_range">Mid-range Confidence</option>
                                                    <option value="high">High Confidence</option>
                                                    <option value="very_high">Very High Confidence</option>
                                                </select>
                                            </td>
                                            <td><textarea name="communityBenefitsNewServiceDetails" value={form.communityBenefitsNewServiceDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Enabling future innovations to existing services, or new services or outcomes</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="communityBenefitsInnovation" className="air-inputform-select" value={selectedValues.communityBenefitsInnovation || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low Confidence</option>
                                                    <option value="low">Low Confidence</option>
                                                    <option value="mid_range">Mid-range Confidence</option>
                                                    <option value="high">High Confidence</option>
                                                    <option value="very_high">Very High Confidence</option>
                                                </select>
                                            </td>
                                            <td><textarea name="communityBenefitsInnovationDetails" value={form.communityBenefitsInnovationDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={3}><hr /></td>
                                        </tr>
                                        {/* Show highest risk rating summary */}
                                        <tr>
                                            <td colSpan={3}>
                                                {(() => {
                                                    const riskLevel = getCommunityBenefitsHighestRisk();
                                                    return (
                                                        <div className={`air-benefits-risk-summary ${riskLevel.cssClass}`}>
                                                            📈 <strong>Community / Organisatioal Benefits Confidence Level: {riskLevel.text}</strong>
                                                        </div>
                                                    );
                                                })()}
                                            </td>
                                        </tr>
                                        {/* Community Benefits Summary Table */}
                                        {hasBenefitsSelections() && (
                                        <tr>
                                            <td colSpan={3}>
                                                <table className="air-benefits-summary-table">
                                                    <thead>
                                                        <tr>
                                                            <th>Benefits <small>({(() => {
                                                                const fields = ['communityBenefitsQuality', 'communityBenefitsProcessing', 'communityBenefitsFinancial', 'communityBenefitsAdaptable', 'communityBenefitsNewService', 'communityBenefitsInnovation'];
                                                                const selectedCount = fields.filter(field => selectedValues[field]).length;
                                                                return `${selectedCount}/${fields.length}`;
                                                            })()})</small></th>
                                                            <th className="air-benefits-cell-header-very_low_na air-ai-risk-level-table-header">Very Low or N/A</th>
                                                            <th className="air-benefits-cell-header-low air-ai-risk-level-table-header">Low</th>
                                                            <th className="air-benefits-cell-header-mid_range air-ai-risk-level-table-header">Mid-range</th>
                                                            <th className="air-benefits-cell-header-high air-ai-risk-level-table-header">High</th>
                                                            <th className="air-benefits-cell-header-very_high air-ai-risk-level-table-header">Very High</th>
                                                        </tr>
                                                    </thead>
                                                <tbody>
                                                    {[
                                                    { field: 'communityBenefitsQuality', label: 'Better Quality Service' },
                                                    { field: 'communityBenefitsProcessing', label: 'Reduction in time' },
                                                    { field: 'communityBenefitsFinancial', label: 'Financial savings' },
                                                    { field: 'communityBenefitsAdaptable', label: 'Reusability' },
                                                    { field: 'communityBenefitsNewService', label: 'New Service / Capabilities' },
                                                    { field: 'communityBenefitsInnovation', label: 'New Innovations' },
                                                    ].map(({ field, label }) => (
                                                    selectedValues[field] && (
                                                        <tr key={field}>
                                                            <td className="air-ai-risk-level-table-cell"><strong>{label}</strong></td>
                                                            <td className={`air-ai-risk-level-table-cell ${getBenefitsIndicator(field, 'very_low_na').cellClass}`}>
                                                                {getBenefitsIndicator(field, 'very_low_na').indicator}
                                                            </td>
                                                            <td className={`air-ai-risk-level-table-cell ${getBenefitsIndicator(field, 'low').cellClass}`}>
                                                                {getBenefitsIndicator(field, 'low').indicator}
                                                            </td>
                                                            <td className={`air-ai-risk-level-table-cell ${getBenefitsIndicator(field, 'mid_range').cellClass}`}>
                                                                {getBenefitsIndicator(field, 'mid_range').indicator}
                                                            </td>
                                                            <td className={`air-ai-risk-level-table-cell ${getBenefitsIndicator(field, 'high').cellClass}`}>
                                                                {getBenefitsIndicator(field, 'high').indicator}
                                                            </td>
                                                            <td className={`air-ai-risk-level-table-cell ${getBenefitsIndicator(field, 'very_high').cellClass}`}>
                                                                {getBenefitsIndicator(field, 'very_high').indicator}
                                                            </td>
                                                        </tr>
                                                    )
                                                    ))}
                                                </tbody>
                                            </table>
                                            </td>
                                        </tr>
                                        )}
                                    </tbody>
                                </table>
                            </fieldset>
                        </td>
                    </tr>
                    )}
                    {viewMode !== 'basic' && viewMode !== 'summary' && (
                    <>
                    <tr><td colSpan={3}><BackToTopButton /></td></tr>
                    </>
                    )}
                    {/* Community Harms - Risk Level */}
                    <tr>
                        <td colSpan={3}>
                            <fieldset className="air-inputform-fieldset air-inputform-fieldset-harms">
                                <legend className="air-inputform-legend air-inputform-legend-harms">Community / Organisational Harms - Risk That AI Will Cause</legend>
                                <table className="air-inputform-field-table">
                                    <tbody>
                                        {viewMode !== 'summary' && (
                                            <>
                                            <tr>
                                                <td colSpan={3}><strong>Principle Statement - Community:</strong> AI must prioritise community outcomes, ensuring alignment with laws, minimising harm, and maximising benefit</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3}><em>All AI projects should have a harms register that is kept up to date throughout the project. The harms register should be maintained by the Responsible Officers.</em></td>                                            
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Physical harms:</label></td>
                                                <td className="air-inputform-field-cell"><select 
                                                    name="communityHarmsPhysicalConfidenceLevel" 
                                                    className="air-inputform-select"
                                                    value={selectedValues.communityHarmsPhysicalConfidenceLevel || ""}
                                                    onChange={handleSelectChange}
                                                >
                                                        <option value="">Select...</option>
                                                        <option value="na">N/A</option>
                                                        <option value="very_low">Very Low Risk</option>
                                                        <option value="low">Low Risk</option>
                                                        <option value="mid_range">Mid-range Risk</option>
                                                        <option value="high">High Risk</option>
                                                        <option value="very_high">Very High Risk</option>
                                                    </select>
                                                </td>
                                                <td><textarea name="communityHarmsPhysicalConfidenceLevelDetails" value={form.communityHarmsPhysicalConfidenceLevelDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Psychological harms:</label></td>
                                                <td className="air-inputform-field-cell"><select 
                                                    name="communityHarmsPsychologicalConfidenceLevel" 
                                                    className="air-inputform-select"
                                                    value={selectedValues.communityHarmsPsychologicalConfidenceLevel || ""}
                                                    onChange={handleSelectChange}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low Risk</option>
                                                    <option value="low">Low Risk</option>
                                                    <option value="mid_range">Mid-range Risk</option>
                                                    <option value="high">High Risk</option>
                                                    <option value="very_high">Very High Risk</option>
                                                </select>
                                                </td>
                                                <td><textarea name="communityHarmsPsychologicalConfidenceLevelDetails" value={form.communityHarmsPsychologicalConfidenceLevelDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Environmental harms or harms to the broader community:</label></td>
                                                <td className="air-inputform-field-cell"><select 
                                                    name="communityHarmsEnvironmentalConfidenceLevel" 
                                                    className="air-inputform-select"
                                                    value={selectedValues.communityHarmsEnvironmentalConfidenceLevel || ""}
                                                    onChange={handleSelectChange}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low Risk</option>
                                                    <option value="low">Low Risk</option>
                                                    <option value="mid_range">Mid-range Risk</option>
                                                    <option value="high">High Risk</option>
                                                    <option value="very_high">Very High Risk</option>
                                                </select>
                                                </td>
                                                <td><textarea name="communityHarmsEnvironmentalConfidenceLevelDetails" value={form.communityHarmsEnvironmentalConfidenceLevelDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Unauthorised use of health or sensitive personal information (SIP):</label></td>
                                                <td className="air-inputform-field-cell"><select 
                                                    name="communityHarmsUnauthorisedUseConfidenceLevel" 
                                                    className="air-inputform-select"
                                                    value={selectedValues.communityHarmsUnauthorisedUseConfidenceLevel || ""}
                                                    onChange={handleSelectChange}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low Risk</option>
                                                    <option value="low">Low Risk</option>
                                                    <option value="mid_range">Mid-range Risk</option>
                                                    <option value="high">High Risk</option>
                                                    <option value="very_high">Very High Risk</option>
                                                </select>
                                                </td>
                                                <td><textarea name="communityHarmsUnauthorisedUseConfidenceLevelDetails" value={form.communityHarmsUnauthorisedUseConfidenceLevelDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Impact on right, privilege or entitlement:</label></td>
                                                <td className="air-inputform-field-cell"><select 
                                                    name="communityHarmsImpactOnRightsConfidenceLevel" 
                                                    className="air-inputform-select"
                                                    value={selectedValues.communityHarmsImpactOnRightsConfidenceLevel || ""}
                                                    onChange={handleSelectChange}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low Risk</option>
                                                    <option value="low">Low Risk</option>
                                                    <option value="mid_range">Mid-range Risk</option>
                                                    <option value="high">High Risk</option>
                                                    <option value="very_high">Very High Risk</option>
                                                </select>
                                                </td>
                                                <td><textarea name="communityHarmsImpactOnRightsConfidenceLevelDetails" value={form.communityHarmsImpactOnRightsConfidenceLevelDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Unintended identification or misidentification of an individual:</label></td>
                                                <td className="air-inputform-field-cell"><select 
                                                    name="communityHarmsMisidentificationConfidenceLevel" 
                                                    className="air-inputform-select"
                                                    value={selectedValues.communityHarmsMisidentificationConfidenceLevel || ""}
                                                    onChange={handleSelectChange}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low Risk</option>
                                                    <option value="low">Low Risk</option>
                                                    <option value="mid_range">Mid-range Risk</option>
                                                    <option value="high">High Risk</option>
                                                    <option value="very_high">Very High Risk</option>
                                                </select>
                                                </td>
                                                <td><textarea name="communityHarmsMisidentificationConfidenceLevelDetails" value={form.communityHarmsMisidentificationConfidenceLevelDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Misapplication of a fee, fine or penalty:</label></td>
                                                <td className="air-inputform-field-cell"><select 
                                                    name="communityHarmsMisapplicationConfidenceLevel" 
                                                    className="air-inputform-select"
                                                    value={selectedValues.communityHarmsMisapplicationConfidenceLevel || ""}
                                                    onChange={handleSelectChange}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low Risk</option>
                                                    <option value="low">Low Risk</option>
                                                    <option value="mid_range">Mid-range Risk</option>
                                                    <option value="high">High Risk</option>
                                                    <option value="very_high">Very High Risk</option>
                                                </select>
                                                </td>
                                                <td><textarea name="communityHarmsMisapplicationConfidenceLevelDetails" value={form.communityHarmsMisapplicationConfidenceLevelDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Other financial or commercial impact:</label></td>
                                                <td className="air-inputform-field-cell"><select 
                                                    name="communityHarmsOtherFinancialImpactConfidenceLevel" 
                                                    className="air-inputform-select"
                                                    value={selectedValues.communityHarmsOtherFinancialImpactConfidenceLevel || ""}
                                                    onChange={handleSelectChange}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low Risk</option>
                                                    <option value="low">Low Risk</option>
                                                    <option value="mid_range">Mid-range Risk</option>
                                                    <option value="high">High Risk</option>
                                                    <option value="very_high">Very High Risk</option>
                                                </select>
                                                </td>
                                                <td><textarea name="communityHarmsOtherFinancialImpactConfidenceLevelDetails" value={form.communityHarmsOtherFinancialImpactConfidenceLevelDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Incorrect advice or guidance:</label></td>
                                                <td className="air-inputform-field-cell"><select 
                                                    name="communityHarmsIncorrectAdviceConfidenceLevel" 
                                                    className="air-inputform-select"
                                                    value={selectedValues.communityHarmsIncorrectAdviceConfidenceLevel || ""}
                                                    onChange={handleSelectChange}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low Risk</option>
                                                    <option value="low">Low Risk</option>
                                                    <option value="mid_range">Mid-range Risk</option>
                                                    <option value="high">High Risk</option>
                                                    <option value="very_high">Very High Risk</option>
                                                </select>
                                                </td>
                                                <td><textarea name="communityHarmsIncorrectAdviceConfidenceLevelDetails" value={form.communityHarmsIncorrectAdviceConfidenceLevelDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Inconvenience or delay:</label></td>
                                                <td className="air-inputform-field-cell"><select 
                                                    name="communityHarmsInconvenienceDelayConfidenceLevel" 
                                                    className="air-inputform-select"
                                                    value={selectedValues.communityHarmsInconvenienceDelayConfidenceLevel || ""}
                                                    onChange={handleSelectChange}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low Risk</option>
                                                    <option value="low">Low Risk</option>
                                                    <option value="mid_range">Mid-range Risk</option>
                                                    <option value="high">High Risk</option>
                                                    <option value="very_high">Very High Risk</option>
                                                </select>
                                                </td>
                                                <td><textarea name="communityHarmsInconvenienceDelayConfidenceLevelDetails" value={form.communityHarmsInconvenienceDelayConfidenceLevelDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Erosion of trust:</label></td>
                                                <td className="air-inputform-field-cell"><select 
                                                    name="communityHarmsErosionOfTrustConfidenceLevel" 
                                                    className="air-inputform-select"
                                                    value={selectedValues.communityHarmsErosionOfTrustConfidenceLevel || ""}
                                                    onChange={handleSelectChange}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low Risk</option>
                                                    <option value="low">Low Risk</option>
                                                    <option value="mid_range">Mid-range Risk</option>
                                                    <option value="high">High Risk</option>
                                                    <option value="very_high">Very High Risk</option>
                                                </select>
                                                </td>
                                                <td><textarea name="communityHarmsErosionOfTrustConfidenceLevelDetails" value={form.communityHarmsErosionOfTrustConfidenceLevelDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Ethical implications:</label></td>
                                                <td className="air-inputform-field-cell"><select 
                                                    name="communityHarmsEthicalImplicationsConfidenceLevel" 
                                                    className="air-inputform-select"
                                                    value={selectedValues.communityHarmsEthicalImplicationsConfidenceLevel || ""}
                                                    onChange={handleSelectChange}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low Risk</option>
                                                    <option value="low">Low Risk</option>
                                                    <option value="mid_range">Mid-range Risk</option>
                                                    <option value="high">High Risk</option>
                                                    <option value="very_high">Very High Risk</option>
                                                </select>
                                                </td>
                                                <td><textarea name="communityHarmsEthicalImplicationsConfidenceLevelDetails" value={form.communityHarmsEthicalImplicationsConfidenceLevelDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Economic disruption / impact:</label></td>
                                                <td className="air-inputform-field-cell"><select 
                                                    name="communityHarmsEconomicDisruptionConfidenceLevel" 
                                                    className="air-inputform-select"
                                                    value={selectedValues.communityHarmsEconomicDisruptionConfidenceLevel || ""}
                                                    onChange={handleSelectChange}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low Risk</option>
                                                    <option value="low">Low Risk</option>
                                                    <option value="mid_range">Mid-range Risk</option>
                                                    <option value="high">High Risk</option>
                                                    <option value="very_high">Very High Risk</option>
                                                </select>
                                                </td>
                                                <td><textarea name="communityHarmsEconomicDisruptionConfidenceLevelDetails" value={form.communityHarmsEconomicDisruptionConfidenceLevelDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Social inequality:</label></td>
                                                <td className="air-inputform-field-cell"><select 
                                                    name="communityHarmsSocialInequalityConfidenceLevel" 
                                                    className="air-inputform-select"
                                                    value={selectedValues.communityHarmsSocialInequalityConfidenceLevel || ""}
                                                    onChange={handleSelectChange}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low Risk</option>
                                                    <option value="low">Low Risk</option>
                                                    <option value="mid_range">Mid-range Risk</option>
                                                    <option value="high">High Risk</option>
                                                    <option value="very_high">Very High Risk</option>
                                                </select>
                                                </td>
                                                <td><textarea name="communityHarmsSocialInequalityConfidenceLevelDetails" value={form.communityHarmsSocialInequalityConfidenceLevelDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Other harms:</label></td>
                                                <td className="air-inputform-field-cell"><select 
                                                    name="communityHarmsOtherConfidenceLevel" 
                                                    className="air-inputform-select"
                                                    value={selectedValues.communityHarmsOtherConfidenceLevel || ""}
                                                    onChange={handleSelectChange}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low Risk</option>
                                                    <option value="low">Low Risk</option>
                                                    <option value="mid_range">Mid-range Risk</option>
                                                    <option value="high">High Risk</option>
                                                    <option value="very_high">Very High Risk</option>
                                                </select>
                                                </td>
                                                <td><textarea name="communityHarmsOtherConfidenceLevelDetails" value={form.communityHarmsOtherConfidenceLevelDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3}><hr /></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3}><em>Reversible vs Irreversible harms: Irreversible harm refers to a situation where it's impossible to revert to a previous condition before the harm occurred. For example, if an AI system makes an incorrect decision to deny somebody a pension without an option to have that overturned. You should ensure the ability to overturn outcomes if harm is caused or if the AI system makes incorrect decisions</em></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Could the AI system cause harms that are reversible?</label></td>
                                                <td className="air-inputform-field-cell"><select 
                                                    name="communityHarmsReversibleConfidenceLevel" 
                                                    className="air-inputform-select"
                                                    value={selectedValues.communityHarmsReversibleConfidenceLevel || ""}
                                                    onChange={handleSelectChange}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="no">No</option>
                                                    <option value="yes-high">Yes and mid-range or higher risk</option>
                                                    <option value="yes-low">Yes and low to very low risk</option>
                                                    <option value="unclear">Unclear</option>
                                                </select>
                                                </td>
                                                <td><textarea name="communityHarmsReversibleConfidenceLevelDetails" value={form.communityHarmsReversibleConfidenceLevelDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>                                            
                                            </tr>
                                            {selectedValues.communityHarmsReversibleConfidenceLevel && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('communityHarmsReversibleConfidenceLevel', selectedValues.communityHarmsReversibleConfidenceLevel)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('communityHarmsReversibleConfidenceLevel', selectedValues.communityHarmsReversibleConfidenceLevel)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3}><em>Monitoring for possible harms: You must monitor your AI system closely for harms that it may cause. This includes monitoring outputs and testing results to ensure there are no unintended consequences. You should be able to quantify unintended consequences, secondary harms or benefits, and long-term impacts to the community, even during testing and pilot phases. Testing can still lead to harm if the system is making consequential decisions. You must consider and account for this possibility even if human testers are willing volunteers. Changing the context or environment in which the AI system is used can lead to unintended consequences. Planned changes in how the AI is used should be carefully considered and monitoring undertaken</em></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Could the AI system cause harms that are irreversible? Example: Autonomous AI systems on critical infrastructure (i.e. energy)</label></td>
                                                <td className="air-inputform-field-cell"><select 
                                                    name="communityHarmsIrreversibleConfidenceLevel" 
                                                    className="air-inputform-select"
                                                    value={selectedValues.communityHarmsIrreversibleConfidenceLevel || ""}
                                                    onChange={handleSelectChange}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="no">No</option>
                                                    <option value="yes-high">Yes, but it's better than existing systems</option>
                                                    <option value="yes-veryhigh">Yes</option>
                                                    <option value="unclear-veryhigh">Unclear</option>
                                                </select>
                                                </td>
                                                <td><textarea name="communityHarmsIrreversibleConfidenceLevelDetails" value={form.communityHarmsIrreversibleConfidenceLevelDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.communityHarmsIrreversibleConfidenceLevel && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('communityHarmsIrreversibleConfidenceLevel', selectedValues.communityHarmsIrreversibleConfidenceLevel)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('communityHarmsIrreversibleConfidenceLevel', selectedValues.communityHarmsIrreversibleConfidenceLevel)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3}><em>Secondary harms: Sometimes harms are felt by people who are not direct recipients of the product of service. We refer to these as secondary harms. Secondary harms include things like a loss of trust. You need to think deeply about everyone who might be impacted, well beyond the obvious end user.</em></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Could the AI System result in secondary harms, or result in a cumulative harm from repeated application of the AI System? Example of a cumulative harm is a video system initially collecting and analysing data for security purposes, but over time, as more data is gathered and analysed, individual privacy could be at risk.</label></td>
                                                <td className="air-inputform-field-cell"><select 
                                                    name="communityHarmsSecondaryCumulativeConfidenceLevel" 
                                                    className="air-inputform-select"
                                                    value={selectedValues.communityHarmsSecondaryCumulativeConfidenceLevel || ""}
                                                    onChange={handleSelectChange}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="no">No</option>
                                                    <option value="yes-high">Yes and mid-range or higher risk</option>
                                                    <option value="yes-low">Yes and low to very low risk</option>
                                                    <option value="unclear-veryhigh">Unclear</option>
                                                </select>
                                                </td>
                                                <td><textarea name="communityHarmsSecondaryCumulativeConfidenceLevelDetails" value={form.communityHarmsSecondaryCumulativeConfidenceLevelDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.communityHarmsSecondaryCumulativeConfidenceLevel && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('communityHarmsSecondaryCumulativeConfidenceLevel', selectedValues.communityHarmsSecondaryCumulativeConfidenceLevel)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('communityHarmsSecondaryCumulativeConfidenceLevel', selectedValues.communityHarmsSecondaryCumulativeConfidenceLevel)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3}><hr /></td>
                                            </tr>
                                            </>
                                        )}
                                        {/* Show highest risk rating summary */}
                                        <tr>
                                            <td colSpan={3}>
                                                {(() => {
                                                    const riskLevel = getCommunityHarmsHighestRisk();
                                                    return (
                                                        <div className={`air-harms-risk-summary ${riskLevel.cssClass}`}>
                                                            ⚠️ <strong>Community / Organisational Harms Risk Status: {riskLevel.text}</strong>
                                                        </div>
                                                    );
                                                })()}
                                            </td>
                                        </tr>
                                        {/* Community Harms Summary Table */}
                                        {hasHarmsSelections() && (
                                        <tr>
                                            <td colSpan={3}>
                                                <table className="air-harms-summary-table">
                                                    <thead>
                                                        <tr>
                                                            <th>Harms <small>({(() => {
                                                                const fields = ['communityHarmsPhysicalConfidenceLevel', 'communityHarmsPsychologicalConfidenceLevel', 'communityHarmsEnvironmentalConfidenceLevel', 'communityHarmsUnauthorisedUseConfidenceLevel', 'communityHarmsImpactOnRightsConfidenceLevel', 'communityHarmsMisidentificationConfidenceLevel', 'communityHarmsMisapplicationConfidenceLevel', 'communityHarmsOtherFinancialImpactConfidenceLevel', 'communityHarmsIncorrectAdviceConfidenceLevel', 'communityHarmsInconvenienceDelayConfidenceLevel', 'communityHarmsErosionOfTrustConfidenceLevel', 'communityHarmsEthicalImplicationsConfidenceLevel', 'communityHarmsEconomicDisruptionConfidenceLevel', 'communityHarmsSocialInequalityConfidenceLevel', 'communityHarmsOtherConfidenceLevel', 'communityHarmsReversibleConfidenceLevel', 'communityHarmsIrreversibleConfidenceLevel', 'communityHarmsSecondaryCumulativeConfidenceLevel'];
                                                                const selectedCount = fields.filter(field => selectedValues[field]).length;
                                                                return `${selectedCount}/${fields.length}`;
                                                            })()})</small></th>
                                                            <th className="air-harms-cell-header-very_low_na air-ai-risk-level-table-header">Very Low or N/A</th>
                                                            <th className="air-harms-cell-header-low air-ai-risk-level-table-header">Low</th>
                                                            <th className="air-harms-cell-header-mid_range air-ai-risk-level-table-header">Mid-range</th>
                                                            <th className="air-harms-cell-header-high air-ai-risk-level-table-header">High</th>
                                                            <th className="air-harms-cell-header-very_high air-ai-risk-level-table-header">Very High</th>
                                                        </tr>
                                                    </thead>
                                                <tbody>
                                                    {[
                                                    { field: 'communityHarmsPhysicalConfidenceLevel', label: 'Physical harms', indicator: getHarmsIndicator },
                                                    { field: 'communityHarmsPsychologicalConfidenceLevel', label: 'Psychological harms', indicator: getHarmsIndicator },
                                                    { field: 'communityHarmsEnvironmentalConfidenceLevel', label: 'Environmental harms', indicator: getHarmsIndicator },
                                                    { field: 'communityHarmsUnauthorisedUseConfidenceLevel', label: 'Unauthorised use of SIP', indicator: getHarmsIndicator },
                                                    { field: 'communityHarmsImpactOnRightsConfidenceLevel', label: 'Impact on rights', indicator: getHarmsIndicator },
                                                    { field: 'communityHarmsMisidentificationConfidenceLevel', label: 'Misidentification', indicator: getHarmsIndicator },
                                                    { field: 'communityHarmsMisapplicationConfidenceLevel', label: 'Misapplication of penalty', indicator: getHarmsIndicator },
                                                    { field: 'communityHarmsOtherFinancialImpactConfidenceLevel', label: 'Financial/Commercial impact', indicator: getHarmsIndicator },
                                                    { field: 'communityHarmsIncorrectAdviceConfidenceLevel', label: 'Incorrect advice', indicator: getHarmsIndicator },
                                                    { field: 'communityHarmsInconvenienceDelayConfidenceLevel', label: 'Inconvenience/Delay', indicator: getHarmsIndicator },
                                                    { field: 'communityHarmsErosionOfTrustConfidenceLevel', label: 'Erosion of trust', indicator: getHarmsIndicator },
                                                    { field: 'communityHarmsEthicalImplicationsConfidenceLevel', label: 'Ethical implications', indicator: getHarmsIndicator },
                                                    { field: 'communityHarmsEconomicDisruptionConfidenceLevel', label: 'Economic disruption', indicator: getHarmsIndicator },
                                                    { field: 'communityHarmsSocialInequalityConfidenceLevel', label: 'Social inequality', indicator: getHarmsIndicator },
                                                    { field: 'communityHarmsOtherConfidenceLevel', label: 'Other harms', indicator: getHarmsIndicator },
                                                    { field: 'communityHarmsReversibleConfidenceLevel', label: 'Reversible harms', indicator: getHarmsIndicatorSpecial },
                                                    { field: 'communityHarmsIrreversibleConfidenceLevel', label: 'Irreversible harms', indicator: getHarmsIndicatorSpecial },
                                                    { field: 'communityHarmsSecondaryCumulativeConfidenceLevel', label: 'Secondary/Cumulative harms', indicator: getHarmsIndicatorSpecial },
                                                    ].map(({ field, label, indicator }) => (
                                                    selectedValues[field] && (
                                                        <tr key={field}>
                                                            <td className="air-ai-risk-level-table-cell"><strong>{label}</strong></td>
                                                            <td className={`air-ai-risk-level-table-cell ${indicator(field, 'very_low_na').cellClass}`}>
                                                                {indicator(field, 'very_low_na').indicator}
                                                            </td>
                                                            <td className={`air-ai-risk-level-table-cell ${indicator(field, 'low').cellClass}`}>
                                                                {indicator(field, 'low').indicator}
                                                            </td>
                                                            <td className={`air-ai-risk-level-table-cell ${indicator(field, 'mid_range').cellClass}`}>
                                                                {indicator(field, 'mid_range').indicator}
                                                            </td>
                                                            <td className={`air-ai-risk-level-table-cell ${indicator(field, 'high').cellClass}`}>
                                                                {indicator(field, 'high').indicator}
                                                            </td>
                                                            <td className={`air-ai-risk-level-table-cell ${indicator(field, 'very_high').cellClass}`}>
                                                                {indicator(field, 'very_high').indicator}
                                                            </td>
                                                        </tr>
                                                    )
                                                    ))}
                                                </tbody>
                                            </table>
                                            </td>
                                        </tr>
                                        )}
                                    </tbody>
                                </table>
                            </fieldset>
                        </td>
                    </tr>
                    {/* Community Risks */}
                    <tr>
                        <td colSpan={3}>
                            <fieldset className="air-inputform-fieldset air-inputform-fieldset-risks">
                                <legend className="air-inputform-legend air-inputform-legend-risks">Community / Organisational Risks - General Risk Factor Assessment</legend>
                                <table className="air-inputform-field-table">
                                        <tbody>
                                            {viewMode !== 'summary' && (
                                                <>
                                                <tr>
                                                    <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Whether this AI system is delivering a new or existing service.</label></td>
                                                    <td className="air-inputform-field-cell"><select 
                                                        name="communityRisksNewOrExistingService" 
                                                        className="air-inputform-select"
                                                        value={selectedValues.communityRisksNewOrExistingService || ""}
                                                        onChange={handleSelectChange}
                                                    >
                                                        <option value="">Select...</option>
                                                        <option value="new">N/A</option>
                                                        <option value="existing">Low Risk</option>
                                                        <option value="unclear">Mid-range Risk</option>
                                                        <option value="high">High Risk</option>
                                                        <option value="very-high">Very High Risk</option>
                                                    </select></td>
                                                    <td><textarea name="communityRisksNewOrExistingServiceDetails" value={form.communityRisksNewOrExistingServiceDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                                </tr>
                                                <tr>
                                                    <td className="air-inputform-field-cell-label"><label className="air-inputform-label">The potential to cause discrimination from unintended bias.</label></td>
                                                    <td className="air-inputform-field-cell"><select 
                                                        name="communityRisksDiscriminationUnintendedBias" 
                                                        className="air-inputform-select"
                                                        value={selectedValues.communityRisksDiscriminationUnintendedBias || ""}
                                                        onChange={handleSelectChange}
                                                    >
                                                        <option value="">Select...</option>
                                                        <option value="new">N/A</option>
                                                        <option value="existing">Low Risk</option>
                                                        <option value="unclear">Mid-range Risk</option>
                                                        <option value="high">High Risk</option>
                                                        <option value="very-high">Very High Risk</option>
                                                    </select></td>
                                                    <td><textarea name="communityRisksDiscriminationUnintendedBiasDetails" value={form.communityRisksDiscriminationUnintendedBiasDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                                </tr>
                                                <tr>
                                                    <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Whether the AI system is a single point of failure for your service or policy.</label></td>
                                                    <td className="air-inputform-field-cell"><select 
                                                        name="communityRisksSinglePointOfFailure" 
                                                        className="air-inputform-select"
                                                        value={selectedValues.communityRisksSinglePointOfFailure || ""}
                                                        onChange={handleSelectChange}
                                                    >
                                                        <option value="">Select...</option>
                                                        <option value="new">N/A</option>
                                                        <option value="existing">Low Risk</option>
                                                        <option value="unclear">Mid-range Risk</option>
                                                        <option value="high">High Risk</option>
                                                        <option value="very-high">Very High Risk</option>
                                                    </select></td>
                                                    <td><textarea name="communityRisksSinglePointOfFailureDetails" value={form.communityRisksSinglePointOfFailureDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                                </tr>
                                                <tr>
                                                    <td className="air-inputform-field-cell-label"><label className="air-inputform-label">If there is sufficient experienced human oversight of the AI system.</label></td>
                                                    <td className="air-inputform-field-cell"><select 
                                                        name="communityRisksHumanOversight" 
                                                        className="air-inputform-select"
                                                        value={selectedValues.communityRisksHumanOversight || ""}
                                                        onChange={handleSelectChange}
                                                    >
                                                        <option value="">Select...</option>
                                                        <option value="new">N/A</option>
                                                        <option value="existing">Low Risk</option>
                                                        <option value="unclear">Mid-range Risk</option>
                                                        <option value="high">High Risk</option>
                                                        <option value="very-high">Very High Risk</option>
                                                    </select></td>
                                                    <td><textarea name="communityRisksHumanOversightDetails" value={form.communityRisksHumanOversightDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                                </tr>
                                                <tr>
                                                    <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Over-reliance on the AI system or ignoring the system due to high rates of false alert.</label></td>
                                                    <td className="air-inputform-field-cell"><select 
                                                        name="communityRisksOverRelianceFalseAlert" 
                                                        className="air-inputform-select"
                                                        value={selectedValues.communityRisksOverRelianceFalseAlert || ""}
                                                        onChange={handleSelectChange}
                                                    >
                                                        <option value="">Select...</option>
                                                        <option value="new">N/A</option>
                                                        <option value="existing">Low Risk</option>
                                                        <option value="unclear">Mid-range Risk</option>
                                                        <option value="high">High Risk</option>
                                                        <option value="very-high">Very High Risk</option>
                                                    </select></td>
                                                    <td><textarea name="communityRisksOverRelianceFalseAlertDetails" value={form.communityRisksOverRelianceFalseAlertDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                                </tr>
                                                <tr>
                                                    <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Whether the linkage between operating the AI system and the policy outcome is unclear.</label></td>
                                                    <td className="air-inputform-field-cell"><select 
                                                        name="communityRisksLinkageUnclear" 
                                                        className="air-inputform-select"
                                                        value={selectedValues.communityRisksLinkageUnclear || ""}
                                                        onChange={handleSelectChange}
                                                    >
                                                        <option value="">Select...</option>
                                                        <option value="new">N/A</option>
                                                        <option value="existing">Low Risk</option>
                                                        <option value="unclear">Mid-range Risk</option>
                                                        <option value="high">High Risk</option>
                                                        <option value="very-high">Very High Risk</option>
                                                    </select></td>
                                                    <td><textarea name="communityRisksLinkageUnclearDetails" value={form.communityRisksLinkageUnclearDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                                </tr>
                                                <tr>
                                                    <td className="air-inputform-field-cell-label"><label className="air-inputform-label">The system's explainability and transparency regarding generated content and decisions.</label></td>
                                                    <td className="air-inputform-field-cell"><select 
                                                        name="communityRisksExplainability" 
                                                        className="air-inputform-select"
                                                        value={selectedValues.communityRisksExplainability || ""}
                                                        onChange={handleSelectChange}
                                                    >
                                                        <option value="">Select...</option>
                                                        <option value="new">N/A</option>
                                                        <option value="existing">Low Risk</option>
                                                        <option value="unclear">Mid-range Risk</option>
                                                        <option value="high">High Risk</option>
                                                        <option value="very-high">Very High Risk</option>
                                                    </select></td>
                                                    <td><textarea name="communityRisksExplainabilityDetails" value={form.communityRisksExplainabilityDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                                </tr>
                                                <tr>
                                                    <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Risk of cost overruns on budget for the AI system implementation and ongoing operations.</label></td>
                                                    <td className="air-inputform-field-cell"><select 
                                                        name="communityRisksBudgetOverrun" 
                                                        className="air-inputform-select"
                                                        value={selectedValues.communityRisksBudgetOverrun || ""}
                                                        onChange={handleSelectChange}
                                                    >
                                                        <option value="">Select...</option>
                                                        <option value="new">N/A</option>
                                                        <option value="existing">Low Risk</option>
                                                        <option value="unclear">Mid-range Risk</option>
                                                        <option value="high">High Risk</option>
                                                        <option value="very-high">Very High Risk</option>
                                                    </select></td>
                                                    <td><textarea name="communityRisksBudgetOverrunDetails" value={form.communityRisksBudgetOverrunDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={3}><hr /></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={3}><em>Alternatives: For an AI system to be viable, AI must be the most appropriate system for your service delivery or policy problem.  AI systems can come with more risk and cost than traditional tools. You should use an AI system when it the best system to maximise the benefit for the customer and for government.</em></td>
                                                </tr>
                                                <tr>
                                                    <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Were other non-AI systems considered?</label></td>
                                                    <td className="air-inputform-field-cell"><select 
                                                        name="communityRisksNonAISystems" 
                                                        className="air-inputform-select"
                                                        value={selectedValues.communityRisksNonAISystems || ""}
                                                        onChange={handleSelectChange}
                                                    >
                                                        <option value="">Select...</option>
                                                        <option value="yes">Yes</option>
                                                        <option value="informally">Informally</option>
                                                        <option value="no">No</option>
                                                        <option value="na">N/A</option>
                                                    </select></td>
                                                    <td><textarea name="communityRisksNonAISystemsDetails" value={form.communityRisksNonAISystemsDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                                </tr>
                                                {selectedValues.communityRisksNonAISystems && (
                                                    <tr>
                                                        <td colSpan={3} className={getGuidanceRiskClass('communityRisksNonAISystems', selectedValues.communityRisksNonAISystems)}>
                                                            📋 <strong>Guidance:</strong> {getGuidanceText('communityRisksNonAISystems', selectedValues.communityRisksNonAISystems)}
                                                        </td>
                                                    </tr>
                                                )}
                                                <tr>
                                                    <td colSpan={3}><em>More information: You must always comply with privacy and information access laws, including when you are developing and using AI Systems.</em></td>
                                                </tr>
                                                <tr>
                                                    <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Does this system and the use of data align with relevant legislation?</label></td>
                                                    <td className="air-inputform-field-cell"><select 
                                                        name="communityRisksInformationCompliance" 
                                                        className="air-inputform-select"
                                                        value={selectedValues.communityRisksInformationCompliance || ""}
                                                        onChange={handleSelectChange}
                                                    >
                                                        <option value="">Select...</option>
                                                        <option value="yes">Yes</option>
                                                        <option value="unclear">Unclear</option>
                                                        <option value="no">No</option>
                                                    </select></td>
                                                    <td><textarea name="communityRisksInformationComplianceDetails" value={form.communityRisksInformationComplianceDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                                </tr>
                                                {selectedValues.communityRisksInformationCompliance && (
                                                    <tr>
                                                        <td colSpan={3} className={getGuidanceRiskClass('communityRisksInformationCompliance', selectedValues.communityRisksInformationCompliance)}>
                                                            📋 <strong>Guidance:</strong> {getGuidanceText('communityRisksInformationCompliance', selectedValues.communityRisksInformationCompliance)}
                                                        </td>
                                                    </tr>
                                                )}
                                                <tr>
                                                    <td colSpan={3}><hr /></td>
                                                </tr>
                                            </>
                                            )}
                                            <tr>
                                                <td colSpan={3} className="air-inputform-status-row">
                                                    <div className={`air-risks-risk-summary ${getCommunityRisksHighestRisk().cssClass}`}>
                                                        <strong>Community / Organisational Risks Status: {getCommunityRisksHighestRisk().text}</strong>
                                                    </div>
                                                </td>
                                            </tr>
                                            {/* Community Risks Summary Table */}
                                            {hasRisksSelections() && (
                                            <tr>
                                                <td colSpan={3}>
                                                    <table className="air-risks-summary-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Risks <small>({(() => {
                                                                    const fields = ['communityRisksNewOrExistingService', 'communityRisksDiscriminationUnintendedBias', 'communityRisksSinglePointOfFailure', 'communityRisksHumanOversight', 'communityRisksOverRelianceFalseAlert', 'communityRisksLinkageUnclear', 'communityRisksExplainability', 'communityRisksBudgetOverrun', 'communityRisksNonAISystems', 'communityRisksInformationCompliance'];
                                                                    const selectedCount = fields.filter(field => selectedValues[field]).length;
                                                                    return `${selectedCount}/${fields.length}`;
                                                                })()})</small></th>
                                                                <th className="air-risks-cell-header-very_low_na air-ai-risk-level-table-header">Very Low or N/A</th>
                                                                <th className="air-risks-cell-header-low air-ai-risk-level-table-header">Low</th>
                                                                <th className="air-risks-cell-header-mid_range air-ai-risk-level-table-header">Mid-range</th>
                                                                <th className="air-risks-cell-header-high air-ai-risk-level-table-header">High</th>
                                                                <th className="air-risks-cell-header-very_high air-ai-risk-level-table-header">Very High</th>
                                                            </tr>
                                                        </thead>
                                                    <tbody>
                                                        {[
                                                        { field: 'communityRisksNewOrExistingService', label: 'New/Existing Service', indicator: getRisksIndicator },
                                                        { field: 'communityRisksDiscriminationUnintendedBias', label: 'Discrimination/Bias', indicator: getRisksIndicator },
                                                        { field: 'communityRisksSinglePointOfFailure', label: 'Single Point of Failure', indicator: getRisksIndicator },
                                                        { field: 'communityRisksHumanOversight', label: 'Human Oversight', indicator: getRisksIndicator },
                                                        { field: 'communityRisksOverRelianceFalseAlert', label: 'Over-reliance/False Alerts', indicator: getRisksIndicator },
                                                        { field: 'communityRisksLinkageUnclear', label: 'Unclear Linkage', indicator: getRisksIndicator },
                                                        { field: 'communityRisksExplainability', label: 'Explainability/Transparency', indicator: getRisksIndicator },
                                                        { field: 'communityRisksBudgetOverrun', label: 'Budget/Cost Overrun', indicator: getRisksIndicator },
                                                        { field: 'communityRisksNonAISystems', label: 'Non-AI Alternatives', indicator: getRisksIndicatorSpecial },
                                                        { field: 'communityRisksInformationCompliance', label: 'Privacy/Legal Compliance', indicator: getRisksIndicatorSpecial },
                                                        ].map(({ field, label, indicator }) => (
                                                        selectedValues[field] && (
                                                            <tr key={field}>
                                                                <td className="air-ai-risk-level-table-cell"><strong>{label}</strong></td>
                                                                <td className={`air-ai-risk-level-table-cell ${indicator(field, 'very_low_na').cellClass}`}>
                                                                    {indicator(field, 'very_low_na').indicator}
                                                                </td>
                                                                <td className={`air-ai-risk-level-table-cell ${indicator(field, 'low').cellClass}`}>
                                                                    {indicator(field, 'low').indicator}
                                                                </td>
                                                                <td className={`air-ai-risk-level-table-cell ${indicator(field, 'mid_range').cellClass}`}>
                                                                    {indicator(field, 'mid_range').indicator}
                                                                </td>
                                                                <td className={`air-ai-risk-level-table-cell ${indicator(field, 'high').cellClass}`}>
                                                                    {indicator(field, 'high').indicator}
                                                                </td>
                                                                <td className={`air-ai-risk-level-table-cell ${indicator(field, 'very_high').cellClass}`}>
                                                                    {indicator(field, 'very_high').indicator}
                                                                </td>
                                                            </tr>
                                                        )
                                                        ))}
                                                    </tbody>
                                                </table>
                                                </td>
                                            </tr>
                                            )}
                                        </tbody>
                                </table>
                            </fieldset>
                        </td>
                    </tr>
                    {/* Fairness */}
                    <tr>
                        <td colSpan={3}>
                            <fieldset className="air-inputform-fieldset air-inputform-fieldset-fairness">
                                <legend className="air-inputform-legend air-inputform-legend-fairness">Fairness - Risk Factor Assessment</legend>
                                <table className="air-inputform-field-table">
                                    <tbody>
                                        {viewMode !== 'summary' && (
                                            <>
                                            <tr>
                                                <td colSpan={3}><strong>Principle Statement - Fairness:</strong> Use of AI will be fair, ensuring not to perpetuate bias and inequality by leveraging diverse representative datasets, monitoring performance, and using rigorous data governance.</td>
                                            </tr>                                                
                                            <tr>
                                                <td colSpan={3}><em>Consider these as risk events and the consequences being the harms listed under Community / organisational Harms</em></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Using incomplete or inaccurate data</label></td>
                                                <td className="air-inputform-field-cell"><select name="fairnessRisksIncompleteData" className="air-inputform-select"
                                                    value={selectedValues.fairnessRisksIncompleteData || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">Very Low or N/A Risk</option>
                                                    <option value="low">Low Risk</option>
                                                    <option value="mid-range">Mid-Range Risk</option>
                                                    <option value="high">High Risk</option>
                                                    <option value="very-high">Very High Risk</option>
                                                </select></td>
                                                <td><textarea name="fairnessRisksIncompleteDataDetails" value={form.fairnessRisksIncompleteDataDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Having poorly defined descriptions and indicators of “Fairness”</label></td>
                                                <td className="air-inputform-field-cell"><select name="fairnessRisksPoorlyDefined" className="air-inputform-select"
                                                    value={selectedValues.fairnessRisksPoorlyDefined || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">Very Low or N/A Risk</option>
                                                    <option value="low">Low Risk</option>
                                                    <option value="mid-range">Mid-Range Risk</option>
                                                    <option value="high">High Risk</option>
                                                    <option value="very-high">Very High Risk</option>
                                                </select></td>
                                                <td><textarea name="fairnessRisksPoorlyDefinedDetails" value={form.fairnessRisksPoorlyDefinedDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Not ensuring ongoing monitoring of “Fairness indicators”</label></td>
                                                <td className="air-inputform-field-cell"><select name="fairnessRisksNoMonitoring" className="air-inputform-select"
                                                    value={selectedValues.fairnessRisksNoMonitoring || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">Very Low or N/A Risk</option>
                                                    <option value="low">Low Risk</option>
                                                    <option value="mid-range">Mid-Range Risk</option>
                                                    <option value="high">High Risk</option>
                                                    <option value="very-high">Very High Risk</option>
                                                </select></td>
                                                <td><textarea name="fairnessRisksNoMonitoringDetails" value={form.fairnessRisksNoMonitoringDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Decisions to exclude outlier data</label></td>
                                                <td className="air-inputform-field-cell"><select name="fairnessRisksOutlierData" className="air-inputform-select"
                                                    value={selectedValues.fairnessRisksOutlierData || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">Very Low or N/A Risk</option>
                                                    <option value="low">Low Risk</option>
                                                    <option value="mid-range">Mid-Range Risk</option>
                                                    <option value="high">High Risk</option>
                                                    <option value="very-high">Very High Risk</option>
                                                </select></td>
                                                <td><textarea name="fairnessRisksOutlierDataDetails" value={form.fairnessRisksOutlierDataDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Informal or inconsistent data cleansing and repair protocols and processes</label></td>
                                                <td className="air-inputform-field-cell"><select name="fairnessRisksDataCleansing" className="air-inputform-select"
                                                    value={selectedValues.fairnessRisksDataCleansing || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">Very Low or N/A Risk</option>
                                                    <option value="low">Low Risk</option>
                                                    <option value="mid-range">Mid-Range Risk</option>
                                                    <option value="high">High Risk</option>
                                                    <option value="very-high">Very High Risk</option>
                                                </select></td>
                                                <td><textarea name="fairnessRisksDataCleansingDetails" value={form.fairnessRisksDataCleansingDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Using informal bias detection methods (best practice includes automated testing)</label></td>
                                                <td className="air-inputform-field-cell"><select name="fairnessRisksBiasDetection" className="air-inputform-select"
                                                    value={selectedValues.fairnessRisksBiasDetection || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">Very Low or N/A Risk</option>
                                                    <option value="low">Low Risk</option>
                                                    <option value="mid-range">Mid-Range Risk</option>
                                                    <option value="high">High Risk</option>
                                                    <option value="very-high">Very High Risk</option>
                                                </select></td>
                                                <td><textarea name="fairnessRisksBiasDetectionDetails" value={form.fairnessRisksBiasDetectionDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">The likelihood that re-running scenarios could produce different results (reproducibility)</label></td>
                                                <td className="air-inputform-field-cell"><select name="fairnessRisksReproducibility" className="air-inputform-select"
                                                    value={selectedValues.fairnessRisksReproducibility || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">Very Low or N/A Risk</option>
                                                    <option value="low">Low Risk</option>
                                                    <option value="mid-range">Mid-Range Risk</option>
                                                    <option value="high">High Risk</option>
                                                    <option value="very-high">Very High Risk</option>
                                                </select></td>
                                                <td><textarea name="fairnessRisksReproducibilityDetails" value={form.fairnessRisksReproducibilityDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Inadvertently creating new associations when linking data and/or metadata</label></td>
                                                <td className="air-inputform-field-cell"><select name="fairnessRisksDataLinking" className="air-inputform-select"
                                                    value={selectedValues.fairnessRisksDataLinking || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">Very Low or N/A Risk</option>
                                                    <option value="low">Low Risk</option>
                                                    <option value="mid-range">Mid-Range Risk</option>
                                                    <option value="high">High Risk</option>
                                                    <option value="very-high">Very High Risk</option>
                                                </select></td>
                                                <td><textarea name="fairnessRisksDataLinkingDetails" value={form.fairnessRisksDataLinkingDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Differences in the data used for training compared to the data for intended use</label></td>
                                                <td className="air-inputform-field-cell"><select name="fairnessRisksTrainingData" className="air-inputform-select"
                                                    value={selectedValues.fairnessRisksTrainingData || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">Very Low or N/A Risk</option>
                                                    <option value="low">Low Risk</option>
                                                    <option value="mid-range">Mid-Range Risk</option>
                                                    <option value="high">High Risk</option>
                                                    <option value="very-high">Very High Risk</option>
                                                </select></td>
                                                <td><textarea name="fairnessRisksTrainingDataDetails" value={form.fairnessRisksTrainingDataDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3}><hr /></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3}><em>Data relevance and permission: Your AI system may draw on multiple datasets from different sources to find new patterns and insights. You need to determine if you can and should use the data for the AI system. This can be challenging for historical data that may have been collected for a different purpose</em></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Can you explain why you selected the data you're using in your system?</label></td>
                                                <td className="air-inputform-field-cell"><select name="fairnessControlsDataSelection" className="air-inputform-select"
                                                    value={selectedValues.fairnessControlsDataSelection || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option> {/* Low Risk - Explain your answer */}
                                                    <option value="unclear">Unclear</option> {/* Very High Risk - Consult with relevant stakeholders on data options or implement a data improvement strategy or redesign your project/system */}
                                                    <option value="no-but-better">No, but it's better than existing systems</option> {/* High Risk - Document your reasons. Clearly demonstrate that you have consulted with all relevant stakeholders before proceeding. If your solution is operational - consult responsible officers for an appropriate equivalent action. */}
                                                    <option value="no">No</option> {/* Very High Risk - Pause the project and review with the responsible officers on how to resolve. If your solution is operational - consult responsible officers for an appropriate equivalent action. */}
                                                </select></td>
                                                <td><textarea name="fairnessControlsDataSelectionDetails" value={form.fairnessControlsDataSelectionDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.fairnessControlsDataSelection && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('fairnessControlsDataSelection', selectedValues.fairnessControlsDataSelection)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('fairnessControlsDataSelection', selectedValues.fairnessControlsDataSelection)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3}><em>Data quality: Data quality is often described in terms of minimum requirements for accuracy, timeliness, completeness, and consistency. Your AI system may be significantly impacted by poor quality data. It is important to understand how significant the impact is before relying on insights or decisions generated by the AI system. Absence of data may lead to unintended biases impacting insights generated by the AI system. Unbalanced data is a common problem when training AI systems (the situation where the distribution of classes or categories in the training dataset is not representative of the real-world scenario</em></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Is the data that you need for your system available and of appropriate quality given the potential harms identified? If your system is a data creation or data cleansing application, answer according to the availability of any existing data that is needed for the solution to succeed, for example, training datasets.</label></td>
                                                <td className="air-inputform-field-cell"><select name="fairnessControlsDataAvailability" className="air-inputform-select"
                                                    value={selectedValues.fairnessControlsDataAvailability || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option> {/* Low Risk - Explain your answer */}
                                                    <option value="unclear">Unclear</option> {/* Very High Risk - Consult with relevant stakeholders to identify alternative data sources or implement a data improvement strategy or redesign your project/system */}
                                                    <option value="partially-but-better">Partially, it's better than existing systems</option> {/* High Risk - Document your reasons and details to demonstrate that you have consulted with all relevant stakeholders before proceeding. If your solution is operational - consult responsible officers for an appropriate equivalent action. */}
                                                    <option value="no">No</option> {/* Very High Risk - Pause the project and review with the responsible officers on how to resolve. If your solution is operational - consult responsible officers for an appropriate equivalent action. */}
                                                </select></td>
                                                <td><textarea name="fairnessControlsDataAvailabilityDetails" value={form.fairnessControlsDataAvailabilityDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.fairnessControlsDataAvailability && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('fairnessControlsDataAvailability', selectedValues.fairnessControlsDataAvailability)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('fairnessControlsDataAvailability', selectedValues.fairnessControlsDataAvailability)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Does your data reflect the population that will be impacted by your system?</label></td>
                                                <td className="air-inputform-field-cell"><select name="fairnessControlsDataPopulation" className="air-inputform-select"
                                                    value={selectedValues.fairnessControlsDataPopulation || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option> {/* Low Risk - Explain your answer */}
                                                    <option value="partially-but-better">Partially, it's better than existing systems</option> {/* High Risk - Consider seeking advice from an ethics committee. Document how you have consulted with all relevant stakeholders before proceeding. Consider a Human Rights Impact Assessment. If your solution is operational - consult responsible officers for an appropriate equivalent action. */}
                                                    <option value="no-or-unclear">No or unclear</option> {/* Very High Risk - Pause the project and review with the responsible officers on how to resolve. If your solution is operational - consult responsible officers for an appropriate equivalent action. */}
                                                    <option value="na">N/A</option> {/* N/A - Document your reasons as to why this does not apply, then go to the next question. */}
                                                </select></td>
                                                <td><textarea name="fairnessControlsDataPopulationDetails" value={form.fairnessControlsDataPopulationDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.fairnessControlsDataPopulation && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('fairnessControlsDataPopulation', selectedValues.fairnessControlsDataPopulation)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('fairnessControlsDataPopulation', selectedValues.fairnessControlsDataPopulation)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3}><em>Diversity and inclusion, and the impact on minorities: AI often overlooks minority nuances, leading to biased outcomes. Considering cultural sensitivities and underrepresentation, it's vital to test AI outputs for fairness across all demographics, ensuring accurate representation and unbiased decisions. Think deeply about everyone who may be impacted.</em></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Have you considered how your AI system will address issues of diversity and inclusion (including geographic diversity)?</label></td>
                                                <td className="air-inputform-field-cell"><select name="fairnessControlsDiversityInclusion" className="air-inputform-select"
                                                    value={selectedValues.fairnessControlsDiversityInclusion || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option> {/* Low Risk - Explain your answer */}
                                                    <option value="partially-but-better">Partially, it's better than existing systems</option> {/* High Risk - Consider seeking advice from an ethics committee. Document how you have consulted with all relevant stakeholders before proceeding. Consider a Human Rights Impact Assessment. If your solution is operational - consult responsible officers for an appropriate equivalent action. */}
                                                    <option value="no-or-unclear">No or unclear</option> {/* Very High Risk - Pause the project and review with the responsible officers on how to resolve. If your solution is operational - consult responsible officers for an appropriate equivalent action. */}
                                                    <option value="na">N/A</option> {/* N/A - Document your reasons as to why this does not apply, then go to the next question. */}
                                                </select></td>
                                                <td><textarea name="fairnessControlsDiversityInclusionDetails" value={form.fairnessControlsDiversityInclusionDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.fairnessControlsDiversityInclusion && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('fairnessControlsDiversityInclusion', selectedValues.fairnessControlsDiversityInclusion)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('fairnessControlsDiversityInclusion', selectedValues.fairnessControlsDiversityInclusion)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3}><em>Minority groups may include:
                                                    <ul>
                                                        <li>Those with a disability</li>
                                                        <li>LGBTQIA+ and gender fluid communities</li>
                                                        <li>People from culturally and linguistically diverse backgrounds</li>
                                                        <li>Aboriginal and Torres Strait Islanders</li>
                                                        <li>Children and young people</li>
                                                        <li>People from varying socio-economic backgrounds</li>
                                                    </ul></em>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Have you considered the impact with regard to gender and on minority groups including how the system might impact different individuals in minority groups when developing this AI system?</label></td>
                                                <td className="air-inputform-field-cell"><select name="fairnessControlsGenderMinority" className="air-inputform-select"
                                                    value={selectedValues.fairnessControlsGenderMinority || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option> {/* Low Risk - Explain your answer */}
                                                    <option value="partially-but-better">Partially, it's better than existing systems</option> {/* High Risk - Consider seeking advice from an ethics committee. Document how you have consulted with all relevant stakeholders before proceeding. Consider a Human Rights Impact Assessment. If your solution is operational - consult responsible officers for an appropriate equivalent action. */}
                                                    <option value="no-or-unclear">No or unclear</option> {/* Very High Risk - Pause the project and review with the responsible officers on how to resolve. If your solution is operational - consult responsible officers for an appropriate equivalent action. */}
                                                    <option value="na">N/A</option> {/* N/A - Document your reasons as to why this does not apply, then go to the next question. */}
                                                </select></td>
                                                <td><textarea name="fairnessControlsGenderMinorityDetails" value={form.fairnessControlsGenderMinorityDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.fairnessControlsGenderMinority && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('fairnessControlsGenderMinority', selectedValues.fairnessControlsGenderMinority)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('fairnessControlsGenderMinority', selectedValues.fairnessControlsGenderMinority)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3}><em>Measuring AI system performance: At the scoping stage, you will need to make important choices about what you measure. You should measure: <br/>
                                                <ul>
                                                    <li>Accuracy: how close an answer is to the correct value</li>
                                                    <li>Precision: how specific or detailed an answer is</li>
                                                    <li>Sensitivity: the measure of how many actually positive results are correctly identified as such</li>
                                                    <li>Specificity: the measure of how many actually negative results are correctly identified by the AI system</li>
                                                    <li>Fairness objectives: whether the system is meeting the fairness objectives defined for the system (which could include for example that there aren't more prediction errors on some cohorts than others)</li>
                                                </ul>
                                                Aspects of accuracy and precision are readily quantifiable for most systems which predict or classify outcomes. This performance can be absolute, or relative to existing systems.
                                                </em></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Do you have appropriate performance measures and targets (including fairness ones) for your AI system, given the potential harms? How would you characterise “Fairness” such as equity, respect, justice, in outcomes from an AI system? Which of these relate to, or are impacted by the use of AI?</label></td>
                                                <td className="air-inputform-field-cell"><select name="fairnessControlsPerformanceMeasures" className="air-inputform-select"
                                                    value={selectedValues.fairnessControlsPerformanceMeasures || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option> {/* Low Risk - Explain your answer */}s
                                                    <option value="no-elevated">No or unclear and elevated risk use</option> {/* Very High Risk - For elevated risk uses of AI, pause the project until you have established performance measures and targets. If your solution is operational - consult responsible officers for an appropriate equivalent action. */}
                                                    <option value="no-nonelevated">No or unclear and non-elevated risk use</option> {/* Mid-range Risk - For non-elevated risk projects or systems, results should be treated as indicative and not relied on. Document your reasons. If your solution is operational - consult responsible officers for an appropriate equivalent action. */}
                                                    <option value="na">N/A</option> {/* N/A - Document your reasons as to why this does not apply, then go to the next question. */}
                                                </select></td>
                                                <td><textarea name="fairnessControlsPerformanceMeasuresDetails" value={form.fairnessControlsPerformanceMeasuresDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.fairnessControlsPerformanceMeasures && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('fairnessControlsPerformanceMeasures', selectedValues.fairnessControlsPerformanceMeasures)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('fairnessControlsPerformanceMeasures', selectedValues.fairnessControlsPerformanceMeasures)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3}><em>Measuring AI system performance: Elevated risk uses of AI should have clear performance monitoring and calibration schedules. <br/>
                                                    For Elevated risk uses of AI which are continuously training and adapting with moderate residual risks, weekly performance monitoring and calibration is recommended. <br/>
                                                    For low risk, monthly evaluation and calibration is recommended. <br/>
                                                    For operational systems with High risk or Very High risk, a custom evaluation and calibration will be required.</em></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Do you have a way to monitor and calibrate the performance (including fairness) of your AI system? Operational uses of AI which are continuously updated / trained can quickly move outside of performance thresholds. Supervisory systems can monitor system performance and alert when calibration is needed.</label></td>
                                                <td className="air-inputform-field-cell"><select name="fairnessControlsPerformanceCalibration" className="air-inputform-select"
                                                    value={selectedValues.fairnessControlsPerformanceCalibration || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option> {/* Low Risk - Explain your answer */}
                                                    <option value="no-elevated">No or unclear and elevated risk use</option> {/* Very High Risk - For elevated risk uses of AI, pause the project until you have established performance measures and targets. If your solution is operational - consult responsible officers for an appropriate equivalent action. */}
                                                    <option value="no-nonelevated">No or unclear and non-elevated risk use</option> {/* Mid-range Risk - For non-elevated risk projects or systems, results should be treated as indicative and not relied on. Document your reasons. If your solution is operational - consult responsible officers for an appropriate equivalent action. */}
                                                    <option value="na">N/A</option> {/* N/A - Document your reasons as to why this does not apply, then go to the next question. */}
                                                </select></td>
                                                <td><textarea name="fairnessControlsPerformanceCalibrationDetails" value={form.fairnessControlsPerformanceCalibrationDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.fairnessControlsPerformanceCalibration && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('fairnessControlsPerformanceCalibration', selectedValues.fairnessControlsPerformanceCalibration)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('fairnessControlsPerformanceCalibration', selectedValues.fairnessControlsPerformanceCalibration)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3}><hr /></td>
                                            </tr>
                                        </>
                                        )}
                                        <tr>
                                            <td colSpan={3} className="air-inputform-status-row">
                                                <div className={`air-risks-risk-summary ${getFairnessHighestRisk().cssClass}`}>
                                                    <strong>Fairness Risks Status: {getFairnessHighestRisk().text}</strong>
                                                </div>
                                            </td>
                                        </tr>
                                        {/* Fairness Summary Table */}
                                        {hasFairnessSelections() && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-summary-row">
                                                    <table className="air-risks-summary-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Fairness <small>({(() => {
                                                                    const fields = ['fairnessRisksIncompleteData', 'fairnessRisksPoorlyDefined', 'fairnessRisksNoMonitoring', 'fairnessRisksOutlierData', 'fairnessRisksDataCleansing', 'fairnessRisksBiasDetection', 'fairnessRisksReproducibility', 'fairnessRisksDataLinking', 'fairnessRisksTrainingData', 'fairnessControlsDataSelection', 'fairnessControlsDataAvailability', 'fairnessControlsDataPopulation', 'fairnessControlsDiversityInclusion', 'fairnessControlsGenderMinority', 'fairnessControlsPerformanceMeasures', 'fairnessControlsPerformanceCalibration'];
                                                                    const selectedCount = fields.filter(field => selectedValues[field]).length;
                                                                    return `${selectedCount}/${fields.length}`;
                                                                })()})</small></th>
                                                                <th className="air-risks-cell-header-very_low_na air-ai-risk-level-table-header">Very Low or N/A</th>
                                                                <th className="air-risks-cell-header-low air-ai-risk-level-table-header">Low</th>
                                                                <th className="air-risks-cell-header-mid_range air-ai-risk-level-table-header">Mid-range</th>
                                                                <th className="air-risks-cell-header-high air-ai-risk-level-table-header">High</th>
                                                                <th className="air-risks-cell-header-very_high air-ai-risk-level-table-header">Very High</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {[
                                                            // Risk Assessment Fields
                                                            { field: 'fairnessRisksIncompleteData', label: 'Incomplete Data' },
                                                            { field: 'fairnessRisksPoorlyDefined', label: 'Poorly Defined Requirements' },
                                                            { field: 'fairnessRisksNoMonitoring', label: 'No Monitoring' },
                                                            { field: 'fairnessRisksOutlierData', label: 'Outlier Data' },
                                                            { field: 'fairnessRisksDataCleansing', label: 'Data Cleansing Issues' },
                                                            { field: 'fairnessRisksBiasDetection', label: 'Bias Detection' },
                                                            { field: 'fairnessRisksReproducibility', label: 'Reproducibility' },
                                                            { field: 'fairnessRisksDataLinking', label: 'Data Linking' },
                                                            { field: 'fairnessRisksTrainingData', label: 'Training Data' },
                                                            // Control Fields
                                                            { field: 'fairnessControlsDataSelection', label: 'Data Selection' },
                                                            { field: 'fairnessControlsDataAvailability', label: 'Data Availability' },
                                                            { field: 'fairnessControlsDataPopulation', label: 'Data Population' },
                                                            { field: 'fairnessControlsDiversityInclusion', label: 'Diversity & Inclusion' },
                                                            { field: 'fairnessControlsGenderMinority', label: 'Gender & Minority' },
                                                            { field: 'fairnessControlsPerformanceMeasures', label: 'Performance Measures Details' },
                                                            { field: 'fairnessControlsPerformanceCalibration', label: 'Calibration' },
                                                            ].map(({ field, label }) => (
                                                            selectedValues[field] && (
                                                                <tr key={field}>
                                                                    <td className="air-ai-risk-level-table-cell"><strong>{label}</strong></td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getFairnessIndicator(selectedValues[field], 'very_low_na').cellClass}`}>
                                                                        {getFairnessIndicator(selectedValues[field], 'very_low_na').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getFairnessIndicator(selectedValues[field], 'low').cellClass}`}>
                                                                        {getFairnessIndicator(selectedValues[field], 'low').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getFairnessIndicator(selectedValues[field], 'mid_range').cellClass}`}>
                                                                        {getFairnessIndicator(selectedValues[field], 'mid_range').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getFairnessIndicator(selectedValues[field], 'high').cellClass}`}>
                                                                        {getFairnessIndicator(selectedValues[field], 'high').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getFairnessIndicator(selectedValues[field], 'very_high').cellClass}`}>
                                                                        {getFairnessIndicator(selectedValues[field], 'very_high').indicator}
                                                                    </td>
                                                                </tr>
                                                            )
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </fieldset> 
                        </td> 
                    </tr>
                    {/* Privacy and Security */}
                    <tr>
                        <td colSpan={3}>
                            <fieldset className="air-inputform-fieldset air-inputform-fieldset-privacy">
                                <legend className="air-inputform-legend air-inputform-legend-privacy">Privacy and Security</legend>
                                <table className="air-inputform-field-table">
                                    <tbody>{viewMode !== 'summary' && (
                                        <>
                                            <tr>
                                                <td colSpan={3}><strong>Principle Statement - Privacy:</strong> Ensure secure, transparent, and compliant data use to preserve public trust.</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3}><p><em>Consider these as risk events and the consequences being the harms listed under Community / organisational Harms</em></p>
                                                <p><em>It is critical to assess potential use of sensitive data. When the size of an identifiable cohort within the model training dataset is smaller, the likelihood of identification or re-identification increases, hence the higher risk</em></p></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Children:</label></td>
                                                <td className="air-inputform-field-cell"><select name="privacyControlsSensitiveChildren" className="air-inputform-select"
                                                    value={selectedValues.privacyControlsSensitiveChildren || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">&gt; 50 or N/A</option> {/* Very Low Risk or N/A */}
                                                    <option value="low">&gt; 20 and &lt; 50</option> {/* Low Risk */}
                                                    <option value="mid-range">&gt; 10 and &lt; 20</option> {/* Mid-range Risk */}
                                                    <option value="high">&gt; 5 and &lt; 10</option> {/* High Risk */}
                                                    <option value="very-high">&lt; 5</option> {/* Very High Risk */}
                                                </select></td>
                                                <td><textarea name="privacyControlsSensitiveChildrenDetails" value={form.privacyControlsSensitiveChildrenDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.privacyControlsSensitiveChildren && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('privacyControlsSensitiveChildren', selectedValues.privacyControlsSensitiveChildren)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('privacyControlsSensitiveChildren', selectedValues.privacyControlsSensitiveChildren)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Religious individuals:</label></td>
                                                <td className="air-inputform-field-cell"><select name="privacyControlsSensitiveReligious" className="air-inputform-select"
                                                    value={selectedValues.privacyControlsSensitiveReligious || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">&gt; 50 or N/A</option> {/* Very Low Risk or N/A */}
                                                    <option value="low">&gt; 20 and &lt; 50</option> {/* Low Risk */}
                                                    <option value="mid-range">&gt; 10 and &lt; 20</option> {/* Mid-range Risk */}
                                                    <option value="high">&gt; 5 and &lt; 10</option> {/* High Risk */}
                                                    <option value="very-high">&lt; 5</option> {/* Very High Risk */}
                                                </select></td>
                                                <td><textarea name="privacyControlsSensitiveReligiousDetails" value={form.privacyControlsSensitiveReligiousDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.privacyControlsSensitiveReligious && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('privacyControlsSensitiveReligious', selectedValues.privacyControlsSensitiveReligious)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('privacyControlsSensitiveReligious', selectedValues.privacyControlsSensitiveReligious)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Racially or ethnically diverse individuals:</label></td>
                                                <td className="air-inputform-field-cell"><select name="privacyControlsSensitiveRacial" className="air-inputform-select"
                                                    value={selectedValues.privacyControlsSensitiveRacial || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">&gt; 50 or N/A</option> {/* Very Low Risk or N/A */}
                                                    <option value="low">&gt; 20 and &lt; 50</option> {/* Low Risk */}
                                                    <option value="mid-range">&gt; 10 and &lt; 20</option> {/* Mid-range Risk */}
                                                    <option value="high">&gt; 5 and &lt; 10</option> {/* High Risk */}
                                                    <option value="very-high">&lt; 5</option> {/* Very High Risk */}
                                                </select></td>
                                                <td><textarea name="privacyControlsSensitiveRacialDetails" value={form.privacyControlsSensitiveRacialDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.privacyControlsSensitiveRacial && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('privacyControlsSensitiveRacial', selectedValues.privacyControlsSensitiveRacial)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('privacyControlsSensitiveRacial', selectedValues.privacyControlsSensitiveRacial)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Individuals with political opinions or associations:</label></td>
                                                <td className="air-inputform-field-cell"><select name="privacyControlsSensitivePolitical" className="air-inputform-select"
                                                    value={selectedValues.privacyControlsSensitivePolitical || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">&gt; 50 or N/A</option> {/* Very Low Risk or N/A */}
                                                    <option value="low">&gt; 20 and &lt; 50</option> {/* Low Risk */}
                                                    <option value="mid-range">&gt; 10 and &lt; 20</option> {/* Mid-range Risk */}
                                                    <option value="high">&gt; 5 and &lt; 10</option> {/* High Risk */}
                                                    <option value="very-high">&lt; 5</option> {/* Very High Risk */}
                                                </select></td>
                                                <td><textarea name="privacyControlsSensitivePoliticalDetails" value={form.privacyControlsSensitivePoliticalDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.privacyControlsSensitivePolitical && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('privacyControlsSensitivePolitical', selectedValues.privacyControlsSensitivePolitical)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('privacyControlsSensitivePolitical', selectedValues.privacyControlsSensitivePolitical)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Individuals with trade union membership or associations:</label></td>
                                                <td className="air-inputform-field-cell"><select name="privacyControlsSensitiveUnion" className="air-inputform-select"
                                                    value={selectedValues.privacyControlsSensitiveUnion || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">&gt; 50 or N/A</option> {/* Very Low Risk or N/A */}
                                                    <option value="low">&gt; 20 and &lt; 50</option> {/* Low Risk */}
                                                    <option value="mid-range">&gt; 10 and &lt; 20</option> {/* Mid-range Risk */}
                                                    <option value="high">&gt; 5 and &lt; 10</option> {/* High Risk */}
                                                    <option value="very-high">&lt; 5</option> {/* Very High Risk */}
                                                </select></td>
                                                <td><textarea name="privacyControlsSensitiveUnionDetails" value={form.privacyControlsSensitiveUnionDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.privacyControlsSensitiveUnion && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('privacyControlsSensitiveUnion', selectedValues.privacyControlsSensitiveUnion)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('privacyControlsSensitiveUnion', selectedValues.privacyControlsSensitiveUnion)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Individuals with gender and/or sexual diversity:</label></td>
                                                <td className="air-inputform-field-cell"><select name="privacyControlsSensitiveGender" className="air-inputform-select"
                                                    value={selectedValues.privacyControlsSensitiveGender || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">&gt; 50 or N/A</option> {/* Very Low Risk or N/A */}
                                                    <option value="low">&gt; 20 and &lt; 50</option> {/* Low Risk */}
                                                    <option value="mid-range">&gt; 10 and &lt; 20</option> {/* Mid-range Risk */}
                                                    <option value="high">&gt; 5 and &lt; 10</option> {/* High Risk */}
                                                    <option value="very-high">&lt; 5</option> {/* Very High Risk */}
                                                </select></td>
                                                <td><textarea name="privacyControlsSensitiveGenderDetails" value={form.privacyControlsSensitiveGenderDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.privacyControlsSensitiveGender && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('privacyControlsSensitiveGender', selectedValues.privacyControlsSensitiveGender)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('privacyControlsSensitiveGender', selectedValues.privacyControlsSensitiveGender)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Individuals with a criminal record:</label></td>
                                                <td className="air-inputform-field-cell"><select name="privacyControlsSensitiveCriminalRecord" className="air-inputform-select"
                                                    value={selectedValues.privacyControlsSensitiveCriminalRecord || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">&gt; 50 or N/A</option> {/* Very Low Risk or N/A */}
                                                    <option value="low">&gt; 20 and &lt; 50</option> {/* Low Risk */}
                                                    <option value="mid-range">&gt; 10 and &lt; 20</option> {/* Mid-range Risk */}
                                                    <option value="high">&gt; 5 and &lt; 10</option> {/* High Risk */}
                                                    <option value="very-high">&lt; 5</option> {/* Very High Risk */}
                                                </select></td>
                                                <td><textarea name="privacyControlsSensitiveCriminalRecordDetails" value={form.privacyControlsSensitiveCriminalRecordDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.privacyControlsSensitiveCriminalRecord && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('privacyControlsSensitiveCriminalRecord', selectedValues.privacyControlsSensitiveCriminalRecord)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('privacyControlsSensitiveCriminalRecord', selectedValues.privacyControlsSensitiveCriminalRecord)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Specific health or genetic information:</label></td>
                                                <td className="air-inputform-field-cell"><select name="privacyControlsSensitiveHealth" className="air-inputform-select"
                                                    value={selectedValues.privacyControlsSensitiveHealth || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">&gt; 50 or N/A</option> {/* Very Low Risk or N/A */}
                                                    <option value="low">&gt; 20 and &lt; 50</option> {/* Low Risk */}
                                                    <option value="mid-range">&gt; 10 and &lt; 20</option> {/* Mid-range Risk */}
                                                    <option value="high">&gt; 5 and &lt; 10</option> {/* High Risk */}
                                                    <option value="very-high">&lt; 5</option> {/* Very High Risk */}
                                                </select></td>
                                                <td><textarea name="privacyControlsSensitiveHealthDetails" value={form.privacyControlsSensitiveHealthDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.privacyControlsSensitiveHealth && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('privacyControlsSensitiveHealth', selectedValues.privacyControlsSensitiveHealth)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('privacyControlsSensitiveHealth', selectedValues.privacyControlsSensitiveHealth)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Personal biometric information:</label></td>
                                                <td className="air-inputform-field-cell"><select name="privacyControlsSensitiveBiometric" className="air-inputform-select" 
                                                    value={selectedValues.privacyControlsSensitiveBiometric || ""} 
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">&gt; 50 or N/A</option> {/* Very Low Risk or N/A */}
                                                    <option value="low">&gt; 20 and &lt; 50</option> {/* Low Risk */}
                                                    <option value="mid-range">&gt; 10 and &lt; 20</option> {/* Mid-range Risk */}
                                                    <option value="high">&gt; 5 and &lt; 10</option> {/* High Risk */}
                                                    <option value="very-high">&lt; 5</option> {/* Very High Risk */}
                                                </select></td>
                                                <td><textarea name="privacyControlsSensitiveBiometricDetails" value={form.privacyControlsSensitiveBiometricDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.privacyControlsSensitiveBiometric && (
                                                <tr>
                                                    <td colSpan={3}  className={getGuidanceRiskClass('privacyControlsSensitiveBiometric', selectedValues.privacyControlsSensitiveBiometric)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('privacyControlsSensitiveBiometric', selectedValues.privacyControlsSensitiveBiometric)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Other sensitive person-centered data:</label></td>
                                                <td className="air-inputform-field-cell"><select name="privacyControlsSensitiveOtherData" className="air-inputform-select" 
                                                    value={selectedValues.privacyControlsSensitiveOtherData || ""} 
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">&gt; 50 or N/A</option> {/* Very Low Risk or N/A */}
                                                    <option value="low">&gt; 20 and &lt; 50</option> {/* Low Risk */}
                                                    <option value="mid-range">&gt; 10 and &lt; 20</option> {/* Mid-range Risk */}
                                                    <option value="high">&gt; 5 and &lt; 10</option> {/* High Risk */}
                                                    <option value="very-high">&lt; 5</option> {/* Very High Risk */}
                                                </select></td>
                                                <td><textarea name="privacyControlsSensitiveOtherDataDetails" value={form.privacyControlsSensitiveOtherDataDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.privacyControlsSensitiveOtherData && (
                                                <tr>
                                                    <td colSpan={3}  className={getGuidanceRiskClass('privacyControlsSensitiveOtherData', selectedValues.privacyControlsSensitiveOtherData)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('privacyControlsSensitiveOtherData', selectedValues.privacyControlsSensitiveOtherData)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3}><hr /></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3}><em>Privacy by design, security by design: Even small AI projects or systems may have privacy or security vulnerabilities. For example, an analytics system which stores commercially sensitive data in a non-secure environment unbeknown to the user</em></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Have you applied the “Privacy by Design” and “Security by Design” principles in your system?</label></td>
                                                <td className="air-inputform-field-cell"><select name="privacyByDesign" className="air-inputform-select" 
                                                    value={selectedValues.privacyByDesign || ""} 
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes-low">Yes</option> {/* Low Risk - Document any points to resolve, then go to next question. Consider contacting the information and privacy officer or Cyber Team for any points not resolved */}
                                                    <option value="partial">Partially</option> {/* High Risk - Pause the project, apply the principles before proceeding, document any points to resolve below then go to next question. Consider contacting the information and privacy officer or Cyber Team for any points not resolved. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                    <option value="no-or-unclear">No or unclear</option> {/* Very High Risk - Pause the project, apply the principles before proceeding, document any points to resolve below then go to next question. Consider contacting the information and privacy officer or Cyber Team for any points not resolved. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                </select></td>
                                                <td><textarea name="privacyByDesignDetails" value={form.privacyByDesignDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.privacyByDesign && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('privacyByDesign', selectedValues.privacyByDesign)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('privacyByDesign', selectedValues.privacyByDesign)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3}><em>Privacy impact assessment: Even systems not focussed on person-centred data may reveal information about a person, their relationships or preferences. For example, analysis of environmental or spatial data may reveal information about a land-holder's interaction with the local environment.
                                                    A Privacy Impact Assessment (PIA) can help you to identify and minimise privacy risks. A PIA can help you implement 'privacy by design' and demonstrate compliance with privacy laws.</em></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Have you completed a privacy impact assessment (either third party or self-assessed)?</label></td>
                                                <td className="air-inputform-field-cell"><select name="privacyImpactAssessment" className="air-inputform-select" 
                                                    value={selectedValues.privacyImpactAssessment || ""} 
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes-low">Yes</option> {/* Low Risk - Document the result, then go to the next question */}
                                                    <option value="no">No</option> {/* Very High Risk - Pause the project until you have completed a privacy impact assessment. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                    <option value="na">N/A</option> {/* N/A - Your system doesn't use or generate any sensitive information, confirmed with responsible officers, document below this confirmation */}
                                                </select></td>
                                                <td><textarea name="privacyImpactAssessmentDetails" value={form.privacyImpactAssessmentDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.privacyImpactAssessment && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('privacyImpactAssessment', selectedValues.privacyImpactAssessment)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('privacyImpactAssessment', selectedValues.privacyImpactAssessment)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3}><em>Exceptions: You can ask the Privacy Commissioner to make a Public Interest Direction (PID) to waive the requirement to comply with an Information Protection Principle. These are only granted in circumstances where there are compelling public interests. For AI systems intended to operate under legislation which allows use of Personally Identifiable Information, the public benefits must be clear before proceeding to pilot phase.<br />
                                                Governing use of Personally Identifiable Information: You must apply higher governance standards if you are managing Personally Identifiable Information.
                                                </em></td>
                                            </tr>
                                                <tr>
                                                    <td className="air-inputform-field-cell-label"><label className="air-inputform-label">If you are using information about individuals who are reasonably identifiable, have you sought consent from the target demographic about using their data for this particular purpose?</label></td>
                                                    <td className="air-inputform-field-cell"><select name="privacyControlsConsent" className="air-inputform-select"
                                                    value={selectedValues.privacyControlsConsent || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="low">Yes</option> {/* Low Risk - Document the result, then go to the next question */}
                                                    <option value="midrange">Authorised use</option> {/* Mid-range Risk - For AI systems intended to operate under legislation which allows use of identifiable information, do not proceed unless you receive clear legal / independent privacy advice that allows you to proceed. The system should always be monitored for harms. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                    <option value="high">Partially</option> {/* High Risk - Pause the project until you have obtained consent or clear legal advice authorising use of this information. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                    <option value="very-high">No</option> {/*Very High Risk - Pause the project until you have obtained consent or clear legal advice authorising use of this information. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                    <option value="na">N/A</option> {/* N/A - Document your reasons as to why this does not apply */}
                                                </select></td>
                                                <td><textarea name="privacyControlsConsentDetails" value={form.privacyControlsConsentDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Document your reasons here..."></textarea></td>
                                            </tr>
                                            {selectedValues.privacyControlsConsent && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('privacyControlsConsent', selectedValues.privacyControlsConsent)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('privacyControlsConsent', selectedValues.privacyControlsConsent)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3}><em>Cyber security:  AI can pose new cyber security risks, be vigilant.</em></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Does your system adhere to the mandatory requirements in your company's Cyber Security Policy? Have you considered end-to-end Security Principles for your system?</label></td>
                                                <td className="air-inputform-field-cell"><select name="privacyControlsCyberSecurity" className="air-inputform-select"
                                                    value={selectedValues.privacyControlsCyberSecurity || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="low">Yes</option> {/* Low Risk - Provide information above that confirms you have done this and any key information to not for ongoing risk management */}
                                                    <option value="very-high">No or Partially</option> {/* Very High Risk - Pause the project until you meet mandatory requirements. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                </select></td>
                                                <td><textarea name="privacyControlsCyberSecurityDetails" value={form.privacyControlsCyberSecurityDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.privacyControlsCyberSecurity && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('privacyControlsCyberSecurity', selectedValues.privacyControlsCyberSecurity)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('privacyControlsCyberSecurity', selectedValues.privacyControlsCyberSecurity)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3}><em>Sensitive data: Your data classification guidelines should help correctly assess the sensitivity or security of information, so that the information can be labelled, used, handled, stored and disposed of correctly.<br />
                                                Governing Use of Sensitive Information: You must apply higher governance standards if you are managing Sensitive Information.</em></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Does your dataset include using sensitive data subjects? If use of sensitive data is a must, ensure to leverage privacy enhancing technology such as use of synthetic data, data anonymisation and deidentification, encryption, secure aggregation and random noise generation.</label></td>
                                                <td className="air-inputform-field-cell"><select name="privacyControlsSensitiveData" className="air-inputform-select"
                                                    value={selectedValues.privacyControlsSensitiveData || ''}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="low">No</option> {/* Low Risk - Document how you have confirmed this */}
                                                    <option value="very-high">Yes</option> {/* Very High Risk - Seek advice from an appropriate legal source or the Privacy Officer. Consider seeking approval from an ethics committee */}
                                                    <option value="unclear">Unclear</option> {/* Very High Risk - Pause the project and review your data. Consider advice from an appropriate legal source or the Privacy Officer. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                </select></td>
                                                <td><textarea name="privacyControlsSensitiveDataDetails" value={form.privacyControlsSensitiveDataDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.privacyControlsSensitiveData && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('privacyControlsSensitiveData', selectedValues.privacyControlsSensitiveData)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('privacyControlsSensitiveData', selectedValues.privacyControlsSensitiveData)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3}><hr /></td>
                                            </tr>
                                        </>
                                        )}
                                        <tr>
                                            <td colSpan={3} className="air-inputform-status-row">
                                                <div className={`air-risks-risk-summary ${getPrivacyAndSecurityHighestRisk().cssClass}`}>
                                                    <strong>Privacy and Security Status: {getPrivacyAndSecurityHighestRisk().text}</strong>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/* Privacy and Security Summary Table */}
                                {hasPrivacyAndSecuritySelections() && (
                                    <table className="air-risks-summary-table">
                                        <thead>
                                            <tr>
                                                <th>Privacy and Security <small>({(() => {
                                                    const fields = ['privacyControlsSensitiveChildren', 'privacyControlsSensitiveReligious', 'privacyControlsSensitiveRacial', 'privacyControlsSensitivePolitical', 'privacyControlsSensitiveUnion', 'privacyControlsSensitiveGender', 'privacyControlsSensitiveCriminalRecord', 'privacyControlsSensitiveHealth', 'privacyControlsSensitiveBiometric', 'privacyControlsSensitiveOtherData', 'privacyByDesign', 'privacyImpactAssessment', 'privacyControlsConsent', 'privacyControlsCyberSecurity', 'privacyControlsSensitiveData'];
                                                    const selectedCount = fields.filter(field => selectedValues[field]).length;
                                                    return `${selectedCount}/${fields.length}`;
                                                })()})</small></th>
                                                <th className="air-risks-cell-header-very_low_na air-ai-risk-level-table-header">Very Low or N/A</th>
                                                <th className="air-risks-cell-header-low air-ai-risk-level-table-header">Low</th>
                                                <th className="air-risks-cell-header-mid_range air-ai-risk-level-table-header">Mid-range</th>
                                                <th className="air-risks-cell-header-high air-ai-risk-level-table-header">High</th>
                                                <th className="air-risks-cell-header-very_high air-ai-risk-level-table-header">Very High</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                            // Sensitive Data Controls
                                            { field: 'privacyControlsSensitiveChildren', label: 'Children Data' },
                                            { field: 'privacyControlsSensitiveReligious', label: 'Religious Data' },
                                            { field: 'privacyControlsSensitiveRacial', label: 'Racial Data' },
                                            { field: 'privacyControlsSensitivePolitical', label: 'Political Data' },
                                            { field: 'privacyControlsSensitiveUnion', label: 'Union Data' },
                                            { field: 'privacyControlsSensitiveGender', label: 'Gender Data' },
                                            { field: 'privacyControlsSensitiveCriminalRecord', label: 'Criminal Record Data' },
                                            { field: 'privacyControlsSensitiveHealth', label: 'Health Data' },
                                            { field: 'privacyControlsSensitiveBiometric', label: 'Biometric Data' },
                                            { field: 'privacyControlsSensitiveOtherData', label: 'Other Sensitive Data' },
                                            // Privacy Controls
                                            { field: 'privacyByDesign', label: 'Privacy by Design' },
                                            { field: 'privacyImpactAssessment', label: 'Privacy Impact Assessment' },
                                            { field: 'privacyControlsConsent', label: 'Privacy Consent' },
                                            { field: 'privacyControlsCyberSecurity', label: 'Cyber Security' },
                                            { field: 'privacyControlsSensitiveData', label: 'Sensitive Data Privacy' }
                                            ].map(({ field, label }) => (
                                            selectedValues[field] && (
                                                <tr key={field}>
                                                    <td className="air-ai-risk-level-table-cell"><strong>{label}</strong></td>
                                                    <td className={`air-ai-risk-level-table-cell ${getPrivacyAndSecurityIndicator(selectedValues[field], 'very_low_na').cellClass}`}>
                                                        {getPrivacyAndSecurityIndicator(selectedValues[field], 'very_low_na').indicator}
                                                    </td>
                                                    <td className={`air-ai-risk-level-table-cell ${getPrivacyAndSecurityIndicator(selectedValues[field], 'low').cellClass}`}>
                                                        {getPrivacyAndSecurityIndicator(selectedValues[field], 'low').indicator}
                                                    </td>
                                                    <td className={`air-ai-risk-level-table-cell ${getPrivacyAndSecurityIndicator(selectedValues[field], 'mid_range').cellClass}`}>
                                                        {getPrivacyAndSecurityIndicator(selectedValues[field], 'mid_range').indicator}
                                                    </td>
                                                    <td className={`air-ai-risk-level-table-cell ${getPrivacyAndSecurityIndicator(selectedValues[field], 'high').cellClass}`}>
                                                        {getPrivacyAndSecurityIndicator(selectedValues[field], 'high').indicator}
                                                    </td>
                                                    <td className={`air-ai-risk-level-table-cell ${getPrivacyAndSecurityIndicator(selectedValues[field], 'very_high').cellClass}`}>
                                                        {getPrivacyAndSecurityIndicator(selectedValues[field], 'very_high').indicator}
                                                    </td>
                                                </tr>
                                            )
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </fieldset>
                        </td>
                    </tr>
                    {/* Transparency */}
                    <tr>
                        <td colSpan={3}>
                            <fieldset className="air-inputform-fieldset air-inputform-fieldset-transparency">
                                <legend className="air-inputform-legend air-inputform-legend-transparency">Transparency</legend>
                                <table className="air-inputform-field-table">
                                    <tbody>
                                        {viewMode !== 'summary' && (
                                            <>
                                            <tr>
                                                <td colSpan={3}><strong>Principle Statement - Transparency:</strong> The use of AI will be transparent to the people it could impact, providing review mechanisms that allow concerns to be raised and addressed, privacy preserving, cyber secure and ethical.</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3}><em>Consider these as risk events and the consequences being the harms listed under Community / organisational Harms</em></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Incomplete documentation of AI system design, or implementation, or operation</label></td>
                                                <td className="air-inputform-field-cell"><select name="transparencyPurpose" className="air-inputform-select"
                                                    value={selectedValues.transparencyPurpose || ""}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="low">Low</option>
                                                    <option value="mid-range">Mid-range</option>
                                                    <option value="high">High</option>
                                                    <option value="very-high">Very High</option>
                                                </select></td>
                                                <td><textarea name="transparencyPurposeDetails" value={form.transparencyPurposeDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">No or limited access to model's internal workings or source code (“Black Box”)</label></td>
                                                <td className="air-inputform-field-cell"><select name="transparencyDataSources" className="air-inputform-select"
                                                    value={selectedValues.transparencyDataSources || ""}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="low">Low</option>
                                                    <option value="mid-range">Mid-range</option>
                                                    <option value="high">High</option>
                                                    <option value="very-high">Very High</option>
                                                </select></td>
                                                <td><textarea name="transparencyDataSourcesDetails" value={form.transparencyDataSourcesDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Being unable to explain the output of a complex model</label></td>
                                                <td className="air-inputform-field-cell"><select name="transparencyDataUsage" className="air-inputform-select"
                                                    value={selectedValues.transparencyDataUsage || ""}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="low">Low</option>
                                                    <option value="mid-range">Mid-range</option>
                                                    <option value="high">High</option>
                                                    <option value="very-high">Very High</option>
                                                </select></td>
                                                <td><textarea name="transparencyDataUsageDetails" value={form.transparencyDataUsageDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">A member of the public being unaware that they are interacting with an AI system</label></td>
                                                <td className="air-inputform-field-cell"><select name="transparencyPublicAwareness" className="air-inputform-select"
                                                    value={selectedValues.transparencyPublicAwareness || ""}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="low">Low</option>
                                                    <option value="mid-range">Mid-range</option>
                                                    <option value="high">High</option>
                                                    <option value="very-high">Very High</option>
                                                </select></td>
                                                <td><textarea name="transparencyPublicAwarenessDetails" value={form.transparencyPublicAwarenessDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">No or low ability to incorporate user feedback into an AI system or model</label></td>
                                                <td className="air-inputform-field-cell"><select name="transparencyUserFeedback" className="air-inputform-select"
                                                    value={selectedValues.transparencyUserFeedback || ""}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="low">Low</option>
                                                    <option value="mid-range">Mid-range</option>
                                                    <option value="high">High</option>
                                                    <option value="very-high">Very High</option>
                                                </select></td>
                                                <td><textarea name="transparencyUserFeedbackDetails" value={form.transparencyUserFeedbackDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">The inability to audit past decisions, where input from AI systems was used.</label></td>
                                                <td className="air-inputform-field-cell"><select name="transparencyAuditability" className="air-inputform-select"
                                                    value={selectedValues.transparencyAuditability || ""}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="low">Low</option>
                                                    <option value="mid-range">Mid-range</option>
                                                    <option value="high">High</option>
                                                    <option value="very-high">Very High</option>
                                                </select></td>
                                                <td><textarea name="transparencyAuditabilityDetails" value={form.transparencyAuditabilityDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3}><hr /></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3}><em>Consultation: You must consult with the relevant community when you design your system. This is particularly important for Elevated risk uses of AI. Communities have the right to influence government decision-making where those decisions, and the data on which they are based, will have an impact on them. For AI intended to operate under legislation which allows use without community consultation, the public benefits must be clear before proceeding.</em></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Have you consulted with the relevant community that will benefit from (or be impacted by) the system?</label></td>
                                                <td className="air-inputform-field-cell"><select name="transparencyConsultation" className="air-inputform-select" value={selectedValues.transparencyConsultation || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option> {/* Low Risk - Explain your answer, then go to next question */}
                                                    <option value="authorised-use">Authorised Use</option> {/* Mid-range Risk - For AI systems intended to operate under legislation which allows use without community consultation, do not proceed unless you receive clear legal advice that allows you to proceed. The system should be always monitored for harms. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                    <option value="partially">Partially, it's better than existing systems</option> {/* High Risk - Consider seeking advice from an ethics committee. Document here how you have consulted with all relevant stakeholders before proceeding. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                    <option value="no">No</option> {/* Very High Risk - Pause the project, develop a Community Engagement Plan and consult with the relevant community. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                    <option value="na">N/A</option> {/* N/A - Document your reasons as to why this does not apply, then go to next question */}
                                                </select></td>
                                                <td><textarea name="transparencyConsultationDetails" value={form.transparencyConsultationDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.transparencyConsultation && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('transparencyConsultation', selectedValues.transparencyConsultation)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('transparencyConsultation', selectedValues.transparencyConsultation)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3}><em>Sharing project goals: It is important to encourage public trust in AI, by ensuring AI implementation is transparent and accountable, and that AI delivers positive outcomes to citizens.</em></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Are the scope and goals of the project publicly available, and have you communicated how safeguards have been put in place to mitigate any potential harms? Explore diverse approaches to instil confidence within communities regarding your AI utilisation. This may entail targeted communication strategies or maintaining public registers. Offer concise and straightforward explanations of your AI usage to those potentially affected, especially for elevated risk. Ensure these explanations foster trust without generating confusion.</label></td>
                                                <td className="air-inputform-field-cell"><select name="transparencyScopeGoals" className="air-inputform-select" value={selectedValues.transparencyScopeGoals || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option> {/* Low Risk - Explain your answer, then go to next question */}
                                                    <option value="no">No</option> {/* Very High Risk - Make sure you communicate to relevant stakeholders and the community who are impacted before proceeding. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                    <option value="na">N/A</option> {/* N/A - Document your reasons as to why this does not apply, then go to next question */}
                                                </select></td>
                                                <td><textarea name="transparencyScopeGoalsDetails" value={form.transparencyScopeGoalsDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.transparencyScopeGoals && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('transparencyScopeGoals', selectedValues.transparencyScopeGoals)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('transparencyScopeGoals', selectedValues.transparencyScopeGoals)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3}><em>Right to appeal: No person should ever lose a right, privilege or entitlement without right of appeal. A basic requirement of Transparency is for an individual affected by a relevant decision to understand the basis of the decision, and to be able to effectively challenge it on the merits and/or if the decision was unlawful. When planning your project/system, you must make sure no person could lose a right, privilege or entitlement without access to a review process or an effective way to challenge an AI generated or informed decision.</em></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Is there an easy and cost-effective way for people to appeal a decision that has been informed by your system? Individuals have the right to raise concerns or appeal decisions. Ensure the use of simple and easily understandable language to facilitate this process.</label></td>
                                                <td className="air-inputform-field-cell"><select name="transparencyRightToAppeal" className="air-inputform-select" value={selectedValues.transparencyRightToAppeal || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option> {/* Low Risk - Explain your answer, then go to next question */}
                                                    <option value="no">No</option> {/* Very High Risk - Pause your project, consult with relevant stakeholders and establish an appeals process. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                    <option value="na">N/A</option> {/* N/A - Document your reasons as to why this does not apply, then go to next question */}
                                                </select></td>
                                                <td><textarea name="transparencyRightToAppealDetails" value={form.transparencyRightToAppealDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.transparencyRightToAppeal && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('transparencyRightToAppeal', selectedValues.transparencyRightToAppeal)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('transparencyRightToAppeal', selectedValues.transparencyRightToAppeal)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3}><em>Clear explanations: As far as possible, you must have a way to clearly explain how a decision or outcome has been informed by AI. If the system is a “black box” due to lack of access to the inner workings or is too complex to reasonably explain the factors leading to the insight generation, it is essential to consider the role of human judgement in intervening before an AI generated insight is acted on. It is important to formalise and document this human oversight process. In low (or very low) risk environments, it may be sufficient to identify and document mechanisms to readily reverse any action arising from such an insight (for example, a person overriding an automated barrier).</em></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Does the AI system allow for transparent explanation of the factors leading to a decision or insight?</label></td>
                                                <td className="air-inputform-field-cell"><select name="transparencyClearExplanations" className="air-inputform-select" value={selectedValues.transparencyClearExplanations || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option> {/* Low Risk - Explain your answer, then go to next question */}
                                                    <option value="no-but-person-decision">No, but a person makes the final decision</option> {/* High Risk - Consult with relevant stakeholders and establish a process to readily reverse any decision or action made by the AI system. Actively monitor for potential harms. */}
                                                    <option value="no">No</option> {/* Very High Risk - Pause your project, consult with relevant stakeholders and establish an appeals process. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                    <option value="na">N/A</option> {/* N/A - Document your reasons as to why this does not apply, then go to next question */}
                                                </select></td>
                                                <td><textarea name="transparencyClearExplanationsDetails" value={form.transparencyClearExplanationsDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.transparencyClearExplanations && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('transparencyClearExplanations', selectedValues.transparencyClearExplanations)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('transparencyClearExplanations', selectedValues.transparencyClearExplanations)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3}><hr /></td>
                                            </tr>
                                            </>
                                        )}
                                        <tr>
                                            <td colSpan={3} className="air-inputform-status-row">
                                                <div className={`air-risks-risk-summary ${getTransparencyHighestRisk().cssClass}`}>
                                                    <strong>Transparency Status: {getTransparencyHighestRisk().text}</strong>
                                                </div>
                                            </td>
                                        </tr>
                                        {/* Transparency Summary Table */}
                                        {hasTransparencySelections() && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-summary-row">
                                                    <table className="air-risks-summary-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Transparency <small>({(() => {
                                                                    const fields = ['transparencyPurpose', 'transparencyDataSources', 'transparencyDataUsage', 'transparencyPublicAwareness', 'transparencyUserFeedback', 'transparencyAuditability', 'transparencyConsultation', 'transparencyScopeGoals', 'transparencyRightToAppeal', 'transparencyClearExplanations'];
                                                                    const selectedCount = fields.filter(field => selectedValues[field]).length;
                                                                    return `${selectedCount}/${fields.length}`;
                                                                })()})</small></th>
                                                                <th className="air-risks-cell-header-very_low_na air-ai-risk-level-table-header">Very Low or N/A</th>
                                                                <th className="air-risks-cell-header-low air-ai-risk-level-table-header">Low</th>
                                                                <th className="air-risks-cell-header-mid_range air-ai-risk-level-table-header">Mid-range</th>
                                                                <th className="air-risks-cell-header-high air-ai-risk-level-table-header">High</th>
                                                                <th className="air-risks-cell-header-very_high air-ai-risk-level-table-header">Very High</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {[
                                                            // Transparency Risk Fields
                                                            { field: 'transparencyPurpose', label: 'Incomplete Documentation' },
                                                            { field: 'transparencyDataSources', label: 'Black Box Access' },
                                                            { field: 'transparencyDataUsage', label: 'Complex Model Explanation' },
                                                            { field: 'transparencyPublicAwareness', label: 'Public AI Awareness' },
                                                            { field: 'transparencyUserFeedback', label: 'User Feedback Incorporation' },
                                                            { field: 'transparencyAuditability', label: 'Decision Auditability' },
                                                            { field: 'transparencyConsultation', label: 'Community Consultation' },
                                                            { field: 'transparencyScopeGoals', label: 'Public Scope & Goals' },
                                                            { field: 'transparencyRightToAppeal', label: 'Right to Appeal' },
                                                            { field: 'transparencyClearExplanations', label: 'Clear Explanations' }
                                                            ].map(({ field, label }) => (
                                                            selectedValues[field] && (
                                                                <tr key={field}>
                                                                    <td className="air-ai-risk-level-table-cell"><strong>{label}</strong></td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getTransparencyIndicator(selectedValues[field], 'very_low_na').cellClass}`}>
                                                                        {getTransparencyIndicator(selectedValues[field], 'very_low_na').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getTransparencyIndicator(selectedValues[field], 'low').cellClass}`}>
                                                                        {getTransparencyIndicator(selectedValues[field], 'low').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getTransparencyIndicator(selectedValues[field], 'mid_range').cellClass}`}>
                                                                        {getTransparencyIndicator(selectedValues[field], 'mid_range').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getTransparencyIndicator(selectedValues[field], 'high').cellClass}`}>
                                                                        {getTransparencyIndicator(selectedValues[field], 'high').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getTransparencyIndicator(selectedValues[field], 'very_high').cellClass}`}>
                                                                        {getTransparencyIndicator(selectedValues[field], 'very_high').indicator}
                                                                    </td>
                                                                </tr>
                                                            )
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>
                            </fieldset>
                        </td>
                    </tr>
                    {/* Accountability */}
                    <tr>
                        <td colSpan={3}>
                            <fieldset className="air-inputform-fieldset air-inputform-fieldset-accountability">
                                <legend className="air-inputform-legend air-inputform-legend-accountability">Accountability</legend>
                                <table className="air-inputform-field-table">
                                    <tbody>
                                        {viewMode !== 'summary' && (
                                            <>
                                            <tr>
                                                <td colSpan={3}><strong>Principle Statement - Accountability:</strong> Decision-making remains the responsibility of organisations and individuals. <em>Despite AI's autonomy, humans hold ultimate decision responsibility necessitating skilled operators with clear accountabilities.</em></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3}><em><p>The skill and training for AI system operators is crucial. Automated systems pose the risk of over-reliance. Operators, including those exercising judgement over insights or alerts, must be well-trained. This includes the ability to critically evaluate insights and understand system limitations. Users must have confidence in their ability to identify, report, and resolve ethical concerns arising from AI-generated insights or decisions, or empower Responsible Officers to make decisions. Ensure consideration is given to training staff delivering customer-facing services on how respond to inquiries from customers when AI is utilised, including guidance on who to direct such inquiries to.</p>
                                                <p>Consider these as risk events and the consequences being the harms listed under Community / organisational Harms</p></em></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Insufficient training of AI system operators</label></td>
                                                <td className="air-inputform-field-cell"><select name="accountabilityTraining" className="air-inputform-select"
                                                    value={selectedValues.accountabilityTraining || ""}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="low">Low</option>
                                                    <option value="mid-range">Mid-range</option>
                                                    <option value="high">High</option>
                                                    <option value="very-high">Very High</option>
                                                </select></td>
                                                <td><textarea name="accountabilityTrainingDetails" value={form.accountabilityTrainingDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Insufficient awareness of system limitations of Responsible Officers</label></td>
                                                <td className="air-inputform-field-cell"><select name="accountabilityAwareness" className="air-inputform-select"
                                                    value={selectedValues.accountabilityAwareness || ""}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="low">Low</option>
                                                    <option value="mid-range">Mid-range</option>
                                                    <option value="high">High</option>
                                                    <option value="very-high">Very High</option>
                                                </select></td>
                                                <td><textarea name="accountabilityAwarenessDetails" value={form.accountabilityAwarenessDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">No or low documentation of performance targets or “Fairness” principles trade-offs</label></td>
                                                <td className="air-inputform-field-cell"><select name="accountabilityDocumentation" className="air-inputform-select"
                                                    value={selectedValues.accountabilityDocumentation || ""}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="low">Low</option>
                                                    <option value="mid-range">Mid-range</option>
                                                    <option value="high">High</option>
                                                    <option value="very-high">Very High</option>
                                                </select></td>
                                                <td><textarea name="accountabilityDocumentationDetails" value={form.accountabilityDocumentationDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">No or limited mechanisms to record insight / AI System decision history</label></td>
                                                <td className="air-inputform-field-cell"><select name="accountabilityDecisionHistory" className="air-inputform-select"
                                                    value={selectedValues.accountabilityDecisionHistory || ""}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="low">Low</option>
                                                    <option value="mid-range">Mid-range</option>
                                                    <option value="high">High</option>
                                                    <option value="very-high">Very High</option>
                                                </select></td>
                                                <td><textarea name="accountabilityDecisionHistoryDetails" value={form.accountabilityDecisionHistoryDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">The inability of third parties to accurately audit AI system insights / decisions</label></td>
                                                <td className="air-inputform-field-cell"><select name="accountabilityThirdParties" className="air-inputform-select"
                                                    value={selectedValues.accountabilityThirdParties || ""}
                                                    onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="low">Low</option>
                                                    <option value="mid-range">Mid-range</option>
                                                    <option value="high">High</option>
                                                    <option value="very-high">Very High</option>
                                                </select></td>
                                                <td><textarea name="accountabilityThirdPartiesDetails" value={form.accountabilityThirdPartiesDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3}><hr /></td>                                        
                                            </tr>
                                            <tr>
                                                <td colSpan={3}><em>Responsible Officers: This assessment is to be completed by or, the result confirmed with, the Responsible Officers. The Responsible Officer should be appropriately senior, skilled and qualified for the role.</em></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3}>Have you established who is responsible for:</td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Use of the AI outputs, insights and decisions?</label></td>
                                                <td className="air-inputform-field-cell"><select name="accountabilityResponsibleUse" className="air-inputform-select" value={selectedValues.accountabilityResponsibleUse || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="low">Yes</option> {/* Low Risk - Document who is responsible to each point within the question */}
                                                    <option value="very-high">No or unclear</option> {/* Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                </select></td>
                                                <td><textarea name="accountabilityResponsibleUseDetails" value={form.accountabilityResponsibleUseDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.accountabilityResponsibleUse && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('accountabilityResponsibleUse', selectedValues.accountabilityResponsibleUse)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('accountabilityResponsibleUse', selectedValues.accountabilityResponsibleUse)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Policy/outcomes associated with the AI system?</label></td>
                                                <td className="air-inputform-field-cell"><select name="accountabilityResponsiblePolicy" className="air-inputform-select" value={selectedValues.accountabilityResponsiblePolicy || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="low">Yes</option> {/* Low Risk - Document who is responsible to each point within the question */}
                                                    <option value="very-high">No or unclear</option> {/* Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                </select></td>
                                                <td><textarea name="accountabilityResponsiblePolicyDetails" value={form.accountabilityResponsiblePolicyDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.accountabilityResponsiblePolicy && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('accountabilityResponsiblePolicy', selectedValues.accountabilityResponsiblePolicy)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('accountabilityResponsiblePolicy', selectedValues.accountabilityResponsiblePolicy)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Monitoring the performance of the AI system?</label></td>
                                                <td className="air-inputform-field-cell"><select name="accountabilityResponsibleMonitoring" className="air-inputform-select" value={selectedValues.accountabilityResponsibleMonitoring || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="low">Yes</option> {/* Low Risk - Document who is responsible to each point within the question */}
                                                    <option value="very-high">No or unclear</option> {/* Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                </select></td>
                                                <td><textarea name="accountabilityResponsibleMonitoringDetails" value={form.accountabilityResponsibleMonitoringDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.accountabilityResponsibleMonitoring && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('accountabilityResponsibleMonitoring', selectedValues.accountabilityResponsibleMonitoring)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('accountabilityResponsibleMonitoring', selectedValues.accountabilityResponsibleMonitoring)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Data governance?</label></td>
                                                <td className="air-inputform-field-cell"><select name="accountabilityResponsibleDataGovernance" className="air-inputform-select" value={selectedValues.accountabilityResponsibleDataGovernance || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="low">Yes</option> {/* Low Risk - Document who is responsible to each point within the question */}
                                                    <option value="very-high">No or unclear</option> {/* Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                </select></td>
                                                <td><textarea name="accountabilityResponsibleDataGovernanceDetails" value={form.accountabilityResponsibleDataGovernanceDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.accountabilityResponsibleDataGovernance && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('accountabilityResponsibleDataGovernance', selectedValues.accountabilityResponsibleDataGovernance)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('accountabilityResponsibleDataGovernance', selectedValues.accountabilityResponsibleDataGovernance)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Technical solution governance?</label></td>
                                                <td className="air-inputform-field-cell"><select name="accountabilityResponsibleTechnicalGovernance" className="air-inputform-select" value={selectedValues.accountabilityResponsibleTechnicalGovernance || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="low">Yes</option> {/* Low Risk - Document who is responsible to each point within the question */}
                                                    <option value="very-high">No or unclear</option> {/* Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                </select></td>
                                                <td><textarea name="accountabilityResponsibleTechnicalGovernanceDetails" value={form.accountabilityResponsibleTechnicalGovernanceDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.accountabilityResponsibleTechnicalGovernance && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('accountabilityResponsibleTechnicalGovernance', selectedValues.accountabilityResponsibleTechnicalGovernance)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('accountabilityResponsibleTechnicalGovernance', selectedValues.accountabilityResponsibleTechnicalGovernance)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Appeal and redress processes?</label></td>
                                                <td className="air-inputform-field-cell"><select name="accountabilityResponsibleAppealRedress" className="air-inputform-select" value={selectedValues.accountabilityResponsibleAppealRedress || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="low">Yes</option> {/* Low Risk - Document who is responsible to each point within the question */}
                                                    <option value="very-high">No or unclear</option> {/* Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                </select></td>
                                                <td><textarea name="accountabilityResponsibleAppealRedressDetails" value={form.accountabilityResponsibleAppealRedressDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.accountabilityResponsibleAppealRedress && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('accountabilityResponsibleAppealRedress', selectedValues.accountabilityResponsibleAppealRedress)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('accountabilityResponsibleAppealRedress', selectedValues.accountabilityResponsibleAppealRedress)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3}><hr /></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3}><em>Human intervention and accountability: For elevated-risk applications, it's crucial to ensure human accountability and intervention capabilities. Consider updating your business continuity plans accordingly to reflect this. This principle may also be relevant for non-elevated risk uses of AI. Doing so will help build public confidence and control in your AI system.</em></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3}>Have you established a clear process to:</td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Intervene if a relevant stakeholder finds concerns with insights, decisions or content generated (appeal and redress)?</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <select name="accountabilityInterventionProcess" className="air-inputform-select" value={selectedValues.accountabilityInterventionProcess || ""} onChange={handleSelectChange}>
                                                        <option value="">Select...</option>
                                                        <option value="low">Yes</option> {/* Low Risk - Document the details, then go to next question */}
                                                        <option value="very-high">No</option> {/* Very High Risk - Pause your project, consult with relevant stakeholders and establish appropriate processes. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                        <option value="na">N/A</option> {/* N/A - Document your reasons as to why this does not apply, then go to next question */}
                                                    </select>
                                                </td>
                                                <td><textarea name="accountabilityInterventionProcessDetails" value={form.accountabilityInterventionProcessDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.accountabilityInterventionProcess && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('accountabilityInterventionProcess', selectedValues.accountabilityInterventionProcess)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('accountabilityInterventionProcess', selectedValues.accountabilityInterventionProcess)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Ensure you do not get overconfident or over reliant on the AI system?</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <select name="accountabilityOverconfidenceProcess" className="air-inputform-select" value={selectedValues.accountabilityOverconfidenceProcess || ""} onChange={handleSelectChange}>
                                                        <option value="">Select...</option>
                                                        <option value="low">Yes</option> {/* Low Risk - Document the details, then go to next question */}
                                                        <option value="very-high">No</option> {/* Very High Risk - Pause your project, consult with relevant stakeholders and establish appropriate processes. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                        <option value="na">N/A</option> {/* N/A - Document your reasons as to why this does not apply, then go to next question */}
                                                    </select>
                                                </td>
                                                <td><textarea name="accountabilityOverconfidenceProcessDetails" value={form.accountabilityOverconfidenceProcessDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.accountabilityOverconfidenceProcess && (
                                                <tr>
                                                    <td colSpan={3} className={getGuidanceRiskClass('accountabilityOverconfidenceProcess', selectedValues.accountabilityOverconfidenceProcess)}>
                                                        📋 <strong>Guidance:</strong> {getGuidanceText('accountabilityOverconfidenceProcess', selectedValues.accountabilityOverconfidenceProcess)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3}><hr /></td>
                                            </tr>
                                            </>
                                        )}
                                        <tr>
                                            <td colSpan={3} className="air-inputform-status-row">
                                                <div className={`air-risks-risk-summary ${getAccountabilityHighestRisk().cssClass}`}>
                                                    <strong>Accountability Status: {getAccountabilityHighestRisk().text}</strong>
                                                </div>
                                            </td>
                                        </tr>
                                        {/* Accountability Summary Table */}
                                        {(selectedValues.accountabilityTraining || 
                                        selectedValues.accountabilityAwareness || 
                                        selectedValues.accountabilityDocumentation ||
                                        selectedValues.accountabilityDecisionHistory ||
                                        selectedValues.accountabilityThirdParties ||
                                        selectedValues.accountabilityResponsibleUse ||
                                        selectedValues.accountabilityResponsiblePolicy ||
                                        selectedValues.accountabilityResponsibleMonitoring ||
                                        selectedValues.accountabilityResponsibleDataGovernance ||
                                        selectedValues.accountabilityResponsibleTechnicalGovernance ||
                                        selectedValues.accountabilityResponsibleAppealRedress ||
                                        selectedValues.accountabilityInterventionProcess ||
                                        selectedValues.accountabilityOverconfidenceProcess) && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-summary-row">
                                                    <table className="air-risks-summary-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Accountability <small>({(() => {
                                                                    const fields = ['accountabilityTraining', 'accountabilityAwareness', 'accountabilityDocumentation', 'accountabilityDecisionHistory', 'accountabilityThirdParties', 'accountabilityResponsibleUse', 'accountabilityResponsiblePolicy', 'accountabilityResponsibleMonitoring', 'accountabilityResponsibleDataGovernance', 'accountabilityResponsibleTechnicalGovernance', 'accountabilityResponsibleAppealRedress', 'accountabilityInterventionProcess', 'accountabilityOverconfidenceProcess'];
                                                                    const selectedCount = fields.filter(field => selectedValues[field]).length;
                                                                    return `${selectedCount}/${fields.length}`;
                                                                })()})</small></th>
                                                                <th className="air-risks-cell-header-very_low_na air-ai-risk-level-table-header">Very Low or N/A</th>
                                                                <th className="air-risks-cell-header-low air-ai-risk-level-table-header">Low</th>
                                                                <th className="air-risks-cell-header-mid_range air-ai-risk-level-table-header">Mid-range</th>
                                                                <th className="air-risks-cell-header-high air-ai-risk-level-table-header">High</th>
                                                                <th className="air-risks-cell-header-very_high air-ai-risk-level-table-header">Very High</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {selectedValues.accountabilityTraining && (
                                                                <tr>
                                                                    <td className="air-ai-risk-level-table-cell"><strong>Training on responsible AI use</strong></td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityTraining', selectedValues.accountabilityTraining, 'very_low_na').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityTraining', selectedValues.accountabilityTraining, 'very_low_na').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityTraining', selectedValues.accountabilityTraining, 'low').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityTraining', selectedValues.accountabilityTraining, 'low').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityTraining', selectedValues.accountabilityTraining, 'mid_range').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityTraining', selectedValues.accountabilityTraining, 'mid_range').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityTraining', selectedValues.accountabilityTraining, 'high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityTraining', selectedValues.accountabilityTraining, 'high').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityTraining', selectedValues.accountabilityTraining, 'very_high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityTraining', selectedValues.accountabilityTraining, 'very_high').indicator}
                                                                    </td>
                                                                </tr>
                                                            )}
                                                            {selectedValues.accountabilityAwareness && (
                                                                <tr>
                                                                    <td className="air-ai-risk-level-table-cell"><strong>Awareness of AI system capabilities and limitations</strong></td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityAwareness', selectedValues.accountabilityAwareness, 'very_low_na').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityAwareness', selectedValues.accountabilityAwareness, 'very_low_na').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityAwareness', selectedValues.accountabilityAwareness, 'low').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityAwareness', selectedValues.accountabilityAwareness, 'low').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityAwareness', selectedValues.accountabilityAwareness, 'mid_range').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityAwareness', selectedValues.accountabilityAwareness, 'mid_range').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityAwareness', selectedValues.accountabilityAwareness, 'high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityAwareness', selectedValues.accountabilityAwareness, 'high').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityAwareness', selectedValues.accountabilityAwareness, 'very_high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityAwareness', selectedValues.accountabilityAwareness, 'very_high').indicator}
                                                                    </td>
                                                                </tr>
                                                            )}
                                                            {selectedValues.accountabilityDocumentation && (
                                                                <tr>
                                                                    <td className="air-ai-risk-level-table-cell"><strong>Documentation and record-keeping processes</strong></td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityDocumentation', selectedValues.accountabilityDocumentation, 'very_low_na').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityDocumentation', selectedValues.accountabilityDocumentation, 'very_low_na').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityDocumentation', selectedValues.accountabilityDocumentation, 'low').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityDocumentation', selectedValues.accountabilityDocumentation, 'low').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityDocumentation', selectedValues.accountabilityDocumentation, 'mid_range').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityDocumentation', selectedValues.accountabilityDocumentation, 'mid_range').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityDocumentation', selectedValues.accountabilityDocumentation, 'high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityDocumentation', selectedValues.accountabilityDocumentation, 'high').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityDocumentation', selectedValues.accountabilityDocumentation, 'very_high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityDocumentation', selectedValues.accountabilityDocumentation, 'very_high').indicator}
                                                                    </td>
                                                                </tr>
                                                            )}
                                                            {selectedValues.accountabilityDecisionHistory && (
                                                                <tr>
                                                                    <td className="air-ai-risk-level-table-cell"><strong>Decision history and audit trail maintenance</strong></td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityDecisionHistory', selectedValues.accountabilityDecisionHistory, 'very_low_na').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityDecisionHistory', selectedValues.accountabilityDecisionHistory, 'very_low_na').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityDecisionHistory', selectedValues.accountabilityDecisionHistory, 'low').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityDecisionHistory', selectedValues.accountabilityDecisionHistory, 'low').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityDecisionHistory', selectedValues.accountabilityDecisionHistory, 'mid_range').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityDecisionHistory', selectedValues.accountabilityDecisionHistory, 'mid_range').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityDecisionHistory', selectedValues.accountabilityDecisionHistory, 'high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityDecisionHistory', selectedValues.accountabilityDecisionHistory, 'high').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityDecisionHistory', selectedValues.accountabilityDecisionHistory, 'very_high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityDecisionHistory', selectedValues.accountabilityDecisionHistory, 'very_high').indicator}
                                                                    </td>
                                                                </tr>
                                                            )}
                                                            {selectedValues.accountabilityThirdParties && (
                                                                <tr>
                                                                    <td className="air-ai-risk-level-table-cell"><strong>Third-party AI system oversight and accountability</strong></td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityThirdParties', selectedValues.accountabilityThirdParties, 'very_low_na').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityThirdParties', selectedValues.accountabilityThirdParties, 'very_low_na').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityThirdParties', selectedValues.accountabilityThirdParties, 'low').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityThirdParties', selectedValues.accountabilityThirdParties, 'low').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityThirdParties', selectedValues.accountabilityThirdParties, 'mid_range').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityThirdParties', selectedValues.accountabilityThirdParties, 'mid_range').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityThirdParties', selectedValues.accountabilityThirdParties, 'high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityThirdParties', selectedValues.accountabilityThirdParties, 'high').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityThirdParties', selectedValues.accountabilityThirdParties, 'very_high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityThirdParties', selectedValues.accountabilityThirdParties, 'very_high').indicator}
                                                                    </td>
                                                                </tr>
                                                            )}
                                                            {selectedValues.accountabilityResponsibleUse && (
                                                                <tr>
                                                                    <td className="air-ai-risk-level-table-cell"><strong>Responsible AI Use Officer</strong></td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleUse', selectedValues.accountabilityResponsibleUse, 'very_low_na').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleUse', selectedValues.accountabilityResponsibleUse, 'very_low_na').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleUse', selectedValues.accountabilityResponsibleUse, 'low').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleUse', selectedValues.accountabilityResponsibleUse, 'low').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleUse', selectedValues.accountabilityResponsibleUse, 'mid_range').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleUse', selectedValues.accountabilityResponsibleUse, 'mid_range').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleUse', selectedValues.accountabilityResponsibleUse, 'high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleUse', selectedValues.accountabilityResponsibleUse, 'high').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleUse', selectedValues.accountabilityResponsibleUse, 'very_high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleUse', selectedValues.accountabilityResponsibleUse, 'very_high').indicator}
                                                                    </td>
                                                                </tr>
                                                            )}
                                                            {selectedValues.accountabilityResponsiblePolicy && (
                                                                <tr>
                                                                    <td className="air-ai-risk-level-table-cell"><strong>Responsible AI Policy Officer</strong></td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsiblePolicy', selectedValues.accountabilityResponsiblePolicy, 'very_low_na').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsiblePolicy', selectedValues.accountabilityResponsiblePolicy, 'very_low_na').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsiblePolicy', selectedValues.accountabilityResponsiblePolicy, 'low').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsiblePolicy', selectedValues.accountabilityResponsiblePolicy, 'low').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsiblePolicy', selectedValues.accountabilityResponsiblePolicy, 'mid_range').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsiblePolicy', selectedValues.accountabilityResponsiblePolicy, 'mid_range').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsiblePolicy', selectedValues.accountabilityResponsiblePolicy, 'high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsiblePolicy', selectedValues.accountabilityResponsiblePolicy, 'high').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsiblePolicy', selectedValues.accountabilityResponsiblePolicy, 'very_high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsiblePolicy', selectedValues.accountabilityResponsiblePolicy, 'very_high').indicator}
                                                                    </td>
                                                                </tr>
                                                            )}
                                                            {selectedValues.accountabilityResponsibleMonitoring && (
                                                                <tr>
                                                                    <td className="air-ai-risk-level-table-cell"><strong>Responsible AI Monitoring Officer</strong></td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleMonitoring', selectedValues.accountabilityResponsibleMonitoring, 'very_low_na').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleMonitoring', selectedValues.accountabilityResponsibleMonitoring, 'very_low_na').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleMonitoring', selectedValues.accountabilityResponsibleMonitoring, 'low').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleMonitoring', selectedValues.accountabilityResponsibleMonitoring, 'low').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleMonitoring', selectedValues.accountabilityResponsibleMonitoring, 'mid_range').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleMonitoring', selectedValues.accountabilityResponsibleMonitoring, 'mid_range').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleMonitoring', selectedValues.accountabilityResponsibleMonitoring, 'high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleMonitoring', selectedValues.accountabilityResponsibleMonitoring, 'high').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleMonitoring', selectedValues.accountabilityResponsibleMonitoring, 'very_high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleMonitoring', selectedValues.accountabilityResponsibleMonitoring, 'very_high').indicator}
                                                                    </td>
                                                                </tr>
                                                            )}
                                                            {selectedValues.accountabilityResponsibleDataGovernance && (
                                                                <tr>
                                                                    <td className="air-ai-risk-level-table-cell"><strong>Responsible AI Data Governance Officer</strong></td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleDataGovernance', selectedValues.accountabilityResponsibleDataGovernance, 'very_low_na').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleDataGovernance', selectedValues.accountabilityResponsibleDataGovernance, 'very_low_na').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleDataGovernance', selectedValues.accountabilityResponsibleDataGovernance, 'low').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleDataGovernance', selectedValues.accountabilityResponsibleDataGovernance, 'low').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleDataGovernance', selectedValues.accountabilityResponsibleDataGovernance, 'mid_range').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleDataGovernance', selectedValues.accountabilityResponsibleDataGovernance, 'mid_range').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleDataGovernance', selectedValues.accountabilityResponsibleDataGovernance, 'high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleDataGovernance', selectedValues.accountabilityResponsibleDataGovernance, 'high').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleDataGovernance', selectedValues.accountabilityResponsibleDataGovernance, 'very_high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleDataGovernance', selectedValues.accountabilityResponsibleDataGovernance, 'very_high').indicator}
                                                                    </td>
                                                                </tr>
                                                            )}
                                                            {selectedValues.accountabilityResponsibleTechnicalGovernance && (
                                                                <tr>
                                                                    <td className="air-ai-risk-level-table-cell"><strong>Responsible AI Technical Governance Officer</strong></td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleTechnicalGovernance', selectedValues.accountabilityResponsibleTechnicalGovernance, 'very_low_na').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleTechnicalGovernance', selectedValues.accountabilityResponsibleTechnicalGovernance, 'very_low_na').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleTechnicalGovernance', selectedValues.accountabilityResponsibleTechnicalGovernance, 'low').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleTechnicalGovernance', selectedValues.accountabilityResponsibleTechnicalGovernance, 'low').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleTechnicalGovernance', selectedValues.accountabilityResponsibleTechnicalGovernance, 'mid_range').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleTechnicalGovernance', selectedValues.accountabilityResponsibleTechnicalGovernance, 'mid_range').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleTechnicalGovernance', selectedValues.accountabilityResponsibleTechnicalGovernance, 'high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleTechnicalGovernance', selectedValues.accountabilityResponsibleTechnicalGovernance, 'high').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleTechnicalGovernance', selectedValues.accountabilityResponsibleTechnicalGovernance, 'very_high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleTechnicalGovernance', selectedValues.accountabilityResponsibleTechnicalGovernance, 'very_high').indicator}
                                                                    </td>
                                                                </tr>
                                                            )}
                                                            {selectedValues.accountabilityResponsibleAppealRedress && (
                                                                <tr>
                                                                    <td className="air-ai-risk-level-table-cell"><strong>Responsible AI Appeal and Redress Officer</strong></td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleAppealRedress', selectedValues.accountabilityResponsibleAppealRedress, 'very_low_na').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleAppealRedress', selectedValues.accountabilityResponsibleAppealRedress, 'very_low_na').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleAppealRedress', selectedValues.accountabilityResponsibleAppealRedress, 'low').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleAppealRedress', selectedValues.accountabilityResponsibleAppealRedress, 'low').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleAppealRedress', selectedValues.accountabilityResponsibleAppealRedress, 'mid_range').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleAppealRedress', selectedValues.accountabilityResponsibleAppealRedress, 'mid_range').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleAppealRedress', selectedValues.accountabilityResponsibleAppealRedress, 'high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleAppealRedress', selectedValues.accountabilityResponsibleAppealRedress, 'high').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityResponsibleAppealRedress', selectedValues.accountabilityResponsibleAppealRedress, 'very_high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityResponsibleAppealRedress', selectedValues.accountabilityResponsibleAppealRedress, 'very_high').indicator}
                                                                    </td>
                                                                </tr>
                                                            )}
                                                            {selectedValues.accountabilityInterventionProcess && (
                                                                <tr>
                                                                    <td className="air-ai-risk-level-table-cell"><strong>Intervention process for harmful content</strong></td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityInterventionProcess', selectedValues.accountabilityInterventionProcess, 'very_low_na').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityInterventionProcess', selectedValues.accountabilityInterventionProcess, 'very_low_na').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityInterventionProcess', selectedValues.accountabilityInterventionProcess, 'low').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityInterventionProcess', selectedValues.accountabilityInterventionProcess, 'low').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityInterventionProcess', selectedValues.accountabilityInterventionProcess, 'mid_range').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityInterventionProcess', selectedValues.accountabilityInterventionProcess, 'mid_range').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityInterventionProcess', selectedValues.accountabilityInterventionProcess, 'high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityInterventionProcess', selectedValues.accountabilityInterventionProcess, 'high').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityInterventionProcess', selectedValues.accountabilityInterventionProcess, 'very_high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityInterventionProcess', selectedValues.accountabilityInterventionProcess, 'very_high').indicator}
                                                                    </td>
                                                                </tr>
                                                            )}
                                                            {selectedValues.accountabilityOverconfidenceProcess && (
                                                                <tr>
                                                                    <td className="air-ai-risk-level-table-cell"><strong>Process to mitigate over-confidence</strong></td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityOverconfidenceProcess', selectedValues.accountabilityOverconfidenceProcess, 'very_low_na').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityOverconfidenceProcess', selectedValues.accountabilityOverconfidenceProcess, 'very_low_na').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityOverconfidenceProcess', selectedValues.accountabilityOverconfidenceProcess, 'low').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityOverconfidenceProcess', selectedValues.accountabilityOverconfidenceProcess, 'low').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityOverconfidenceProcess', selectedValues.accountabilityOverconfidenceProcess, 'mid_range').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityOverconfidenceProcess', selectedValues.accountabilityOverconfidenceProcess, 'mid_range').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityOverconfidenceProcess', selectedValues.accountabilityOverconfidenceProcess, 'high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityOverconfidenceProcess', selectedValues.accountabilityOverconfidenceProcess, 'high').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getAccountabilityIndicator('accountabilityOverconfidenceProcess', selectedValues.accountabilityOverconfidenceProcess, 'very_high').cellClass}`}>
                                                                        {getAccountabilityIndicator('accountabilityOverconfidenceProcess', selectedValues.accountabilityOverconfidenceProcess, 'very_high').indicator}
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </fieldset>
                        </td>
                    </tr>     
                    {/* Risk Mitigation */}
                    {viewMode === 'extended' && (     
                    <>
                    <tr><td colSpan={3}><BackToTopButton /></td></tr>
                    <tr>
                        <td colSpan={3}>
                            <fieldset className="air-inputform-fieldset air-inputform-fieldset-mitigation">
                                <legend className="air-inputform-legend air-inputform-legend-mitigation">Risk Mitigation</legend>
                                <table className="air-inputform-field-table">
                                    <tbody>
                                        <tr>
                                            <td colSpan={3}>
                                                <em>Monitoring ongoing performance: For elevated-risk applications of AI, continuous performance monitoring is crucial. All AI systems should undergo ongoing evaluation, even those considered low-risk, as they could rapidly deviate from normal parameters of operation. Before scaling beyond the pilot phase, it's essential to identify mechanisms for monitoring and calibrating system performance. These mechanisms may include red teaming, conformity assessments, reinforcement from human feedback, monitoring for model drift, and metrics-based performance testing.<br />
                                                Monitoring ongoing risks: Operational AI systems which progress with High and Very High risks must plan for regular external independent risk audits to cover among other things:
                                                <ul>
                                                    <li>The examination and documentation of the effectiveness of risk responses in dealing with identified risk and their root causes,</li>
                                                    <li>The effectiveness of the risk management process.</li>
                                                </ul>
                                                </em>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={3}><em>Review your self-assessment, list here the mitigations to be applied and the high-level steps you will take in ensuring these are included in your overall risk management plan. Record your decision, the self-assessment and any supporting information in your Records System.</em></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={3}><em>The importance of documenting your assessment: You must make sure your answers, explanations and risk mitigating controls are recorded in your Record Management system. For Elevated risk uses of AI which include Mid-Range risks or higher, the public benefits must be clear and documented before proceeding.</em></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Is your project / system an elevated risk? If, after considering all mitigations provided within the self-assessment, Mid-range or higher residual risk(s) persist, this constitutes an Elevated risk use of AI. Use of a non-transparent, non-auditable algorithms or training data will likely be an elevated risk use of AI. They require protections limiting scope of use, or additional risk mitigations.</label></td>
                                            <td className="air-inputform-field-cell"><select name="elevatedRisk" className="air-inputform-select" value={selectedValues.elevatedRisk || ""} onChange={handleSelectChange}>
                                                <option value="">Select...</option>
                                                <option value="yes-high">Yes, I have a high or very high risk residual risk</option> {/* Very High Risk - Don't proceed without legal advice. If the pilot proceeds, pilot first with ongoing controls and monitoring. A formal review should be conducted after pilot phase. Conduct an independent risk audit, and your self-assessment needs to be reviewed by the company's AI Review Committee. If your solution is operational - consult responsible officers for an appropriate equivalent action. */}
                                                <option value="yes-mid">Yes, I have mid-range residual risks</option> {/* Mid-range Risk - Don't proceed without legal advice. If the project proceeds, pilot first with ongoing controls and monitoring, consider a review by the company's AI Review Committee and conduct an independent risk audit. If your solution is operational - consult responsible officers for an appropriate equivalent action. */}
                                                <option value="no-low">No, I have low residual risks</option> {/* Low Risk - If the project proceeds, pilot first with ongoing controls and monitoring. If your solution is operational - consult responsible officers for an appropriate equivalent action. */}
                                                <option value="no-very-low">No, I have very low or N/A residual risk</option> {/* Very Low Risk - Proceed with appropriate controls and monitoring. */}
                                            </select></td>
                                            <td><textarea name="elevatedRiskDetails" value={form.elevatedRiskDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.elevatedRisk && (
                                            <tr>
                                                <td colSpan={3} className={getGuidanceRiskClass('elevatedRisk', selectedValues.elevatedRisk)}>
                                                    📋 <strong>Guidance:</strong> {getGuidanceText('elevatedRisk', selectedValues.elevatedRisk)}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </fieldset>
                        </td>
                    </tr>
                    </>
                    )}
                    {/* Procurement */}
                    {viewMode === 'extended' && (
                    <tr>
                        <td colSpan={3}>
                            <fieldset className="air-inputform-fieldset air-inputform-fieldset-procurement">
                                <legend className="air-inputform-legend air-inputform-legend-procurement">Procurement</legend>
                                <table className="air-inputform-field-table">
                                    <tbody>
                                        <tr>
                                            <td colSpan={3}><em>Translating requirements into controls: Below are examples of translating the AI risk considerations from this framework into requirements and contractual controls <br />
                                                Data Governance: Procurements involving AI systems should establish explicit expectations and implement controls to assure high-quality data is maintained through security-by-design and privacy-by-design principles. <br />
                                                Monitoring ongoing performance: Regular performance evaluations and risk assessments for AI systems should be structured into the service agreement, ensuring that the supplier consistently maintains performance at various stages and checkpoints. <br />
                                                System updates:  AI systems often receive updates and enhancements from third-party providers, which occur post-initial risk assessment. These updates necessitate robust control measures to manage any new risks that may be introduced. <br />
                                                Transparency, Explainability, and Auditing: Ensure that purchasers have sufficient transparency and explainability, along with access to third-party auditing. These measures are crucial for effective risk management, justifying decisions, and correctly assigning legal responsibilities to suppliers.</em></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">When considering risks, did you identify treatments for these risks that were system requirements or contractual controls? In terms of a relative scope for control of potential risks:
                                                <ul>
                                                    <li>Buy AI and use has high supplier control, low agency control</li>
                                                    <li>Embed AI and/or co-train has shared supplier and agency control</li>
                                                    <li>Develop AI and/or train has no supplier control, full agency control</li>
                                                </ul>
                                                Ensure that supplier services are considered for providing skills development and knowledge transfer to help fulfill your responsibilities.</label>
                                            </td>
                                            <td className="air-inputform-field-cell-value">
                                                <select name="procurementControls" className="air-inputform-select" value={selectedValues.procurementControls || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option> {/* Low Risk - List the types of treatments that will be applied and categorise them against procurement controls mentioned above */}
                                                    <option value="no">No</option> {/* Very High Risk - Proceed to next step */}
                                                    <option value="unclear">Unclear</option> {/* Very High Risk - Pause the project and review with the responsible officers and your risk team */}
                                                </select>
                                            </td>
                                            <td><textarea name="procurementControlsDetails" value={form.procurementControlsDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.procurementControls && (
                                            <tr>
                                                <td colSpan={3} className={getGuidanceRiskClass('procurementControls', selectedValues.procurementControls)}>
                                                    📋 <strong>Guidance:</strong> {getGuidanceText('procurementControls', selectedValues.procurementControls)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Are the contractual clauses in your contract sufficient for the identified contractual controls? Response: Provide details regarding your assessment of the contractual controls that the chosen contract has against the inherent risks identified.</label></td>
                                            <td className="air-inputform-field-cell-value">
                                                <select name="procurementContractualClauses" className="air-inputform-select" value={selectedValues.procurementContractualClauses || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option> {/* Low Risk - Proceed to next step */}
                                                    <option value="no">No</option> {/* Very High Risk - If your assessment is against Core& you must use ICTA, before proceeding to the next step, and you must reassess against ICTA. If using ICTA, draft appropriate additional conditions through the Order Form of the ICTA to satisfy requirements */}
                                                    <option value="unclear">Unclear</option> {/* Very High Risk - Pause the project and consult with either the legal team, responsible officers and risk teams (or both) to determine the status of the clauses and the path forward */}
                                                </select>
                                            </td>
                                            <td><textarea name="procurementContractualClausesDetails" value={form.procurementContractualClausesDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.procurementContractualClauses && (
                                            <tr>
                                                <td colSpan={3} className={getGuidanceRiskClass('procurementContractualClauses', selectedValues.procurementContractualClauses)}>
                                                    📋 <strong>Guidance:</strong> {getGuidanceText('procurementContractualClauses', selectedValues.procurementContractualClauses)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">When considering risks, were there any questions that you could not answer or could only partially answer due to supplier provided products or services?</label></td>
                                            <td className="air-inputform-field-cell-value">
                                                <select name="procurementSupplierQuestions" className="air-inputform-select" value={selectedValues.procurementSupplierQuestions || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option> {/* Very High Risk - Document the questions below that will require input from suppliers when you approach the market */}
                                                    <option value="no">No</option> {/* Low Risk - Proceed to next step */}
                                                    <option value="unclear">Unclear</option> {/* Very High Risk - Pause the project and review with the responsible officers and your risk team */}
                                                </select>
                                            </td>
                                            <td><textarea name="procurementSupplierQuestionsDetails" value={form.procurementSupplierQuestionsDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.procurementSupplierQuestions && (
                                            <tr>
                                                <td colSpan={3} className={getGuidanceRiskClass('procurementSupplierQuestions', selectedValues.procurementSupplierQuestions)}>
                                                    📋 <strong>Guidance:</strong> {getGuidanceText('procurementSupplierQuestions', selectedValues.procurementSupplierQuestions)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Are there any residual risk factors with a level above “Low”?</label></td>
                                            <td className="air-inputform-field-cell-value">
                                                <select name="procurementResidualRiskFactors" className="air-inputform-select" value={selectedValues.procurementResidualRiskFactors || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option> {/* High Risk - You must use a contract if you proceed */}
                                                    <option value="no">No</option> {/* Low Risk - You should be guided by your procurement team */}
                                                    <option value="unclear">Unclear</option> {/* High Risk - Pause the project and consult with either your legal team, responsible officers and risk teams before proceeding */}
                                                </select>
                                            </td>
                                            <td><textarea name="procurementResidualRiskFactorsDetails" value={form.procurementResidualRiskFactorsDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.procurementResidualRiskFactors && (
                                            <tr>
                                                <td colSpan={3} className={getGuidanceRiskClass('procurementResidualRiskFactors', selectedValues.procurementResidualRiskFactors)}>
                                                    📋 <strong>Guidance:</strong> {getGuidanceText('procurementResidualRiskFactors', selectedValues.procurementResidualRiskFactors)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Did you identify any treatments that are system requirements?</label></td>
                                            <td className="air-inputform-field-cell-value">
                                                <select name="procurementSystemRequirements" className="air-inputform-select" value={selectedValues.procurementSystemRequirements || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option> {/* Low Risk - Draft Statement of Requirements and Evaluation Criteria to adequately address the treatments. Document below the system requirements */}
                                                    <option value="no">No</option> {/* Very High Risk - Proceed to next step */}
                                                    <option value="unclear">Unclear</option> {/* Very High Risk - Pause the project and review with the responsible officers and your risk team to determine the status of the treatments and the path forward */}
                                                </select>
                                            </td>
                                            <td><textarea name="procurementSystemRequirementsDetails" value={form.procurementSystemRequirementsDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.procurementSystemRequirements && (
                                            <tr>
                                                <td colSpan={3} className={getGuidanceRiskClass('procurementSystemRequirements', selectedValues.procurementSystemRequirements)}>
                                                    📋 <strong>Guidance:</strong> {getGuidanceText('procurementSystemRequirements', selectedValues.procurementSystemRequirements)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Do all risks have appropriate treatments, including the order in which the treatments are applied?</label></td>
                                            <td className="air-inputform-field-cell-value">
                                                <select name="procurementRiskTreatments" className="air-inputform-select" value={selectedValues.procurementRiskTreatments || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option> {/* Low Risk - Document below the treatments and the order in which they are applied */}
                                                    <option value="no">No</option> {/* Very High Risk - Pause the project and consult with the appropriate subject matter experts to determine the risk treatment status */}
                                                    <option value="unclear">Unclear</option> {/* Very High Risk - Pause the project and consult with the responsible officers and your risk team to determine the risk treatment status */}
                                                </select>
                                            </td>
                                            <td><textarea name="procurementRiskTreatmentsDetails" value={form.procurementRiskTreatmentsDetails} onChange={handleChange} className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.procurementRiskTreatments && (
                                            <tr>
                                                <td colSpan={3} className={getGuidanceRiskClass('procurementRiskTreatments', selectedValues.procurementRiskTreatments)}>
                                                    📋 <strong>Guidance:</strong> {getGuidanceText('procurementRiskTreatments', selectedValues.procurementRiskTreatments)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td colSpan={3}><hr /></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={3} className="air-inputform-status-row">
                                                <div className={`air-risks-risk-summary ${getProcurementHighestRisk().cssClass}`}>
                                                    <strong>Procurement Status: {getProcurementHighestRisk().text}</strong>
                                                </div>
                                            </td>
                                        </tr>
                                        {/* Procurement Summary Table */}
                                        {(selectedValues.procurementControls || 
                                        selectedValues.procurementContractualClauses || 
                                        selectedValues.procurementSupplierQuestions ||
                                        selectedValues.procurementResidualRiskFactors ||
                                        selectedValues.procurementSystemRequirements ||
                                        selectedValues.procurementRiskTreatments) && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-summary-row">
                                                    <table className="air-risks-summary-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Procurement <small>({(() => {
                                                                    const fields = ['procurementControls', 'procurementContractualClauses', 'procurementSupplierQuestions', 'procurementResidualRiskFactors', 'procurementSystemRequirements', 'procurementRiskTreatments'];
                                                                    const selectedCount = fields.filter(field => selectedValues[field]).length;
                                                                    return `${selectedCount}/${fields.length}`;
                                                                })()})</small></th>
                                                                <th className="air-risks-cell-header-very_low_na air-ai-risk-level-table-header">Very Low or N/A</th>
                                                                <th className="air-risks-cell-header-low air-ai-risk-level-table-header">Low</th>
                                                                <th className="air-risks-cell-header-mid_range air-ai-risk-level-table-header">Mid-range</th>
                                                                <th className="air-risks-cell-header-high air-ai-risk-level-table-header">High</th>
                                                                <th className="air-risks-cell-header-very_high air-ai-risk-level-table-header">Very High</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {selectedValues.procurementControls && (
                                                                <tr>
                                                                    <td className="air-ai-risk-level-table-cell"><strong>System Requirements and Contractual Controls</strong></td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementControls', selectedValues.procurementControls, 'very_low_na').cellClass}`}>
                                                                        {getProcurementIndicator('procurementControls', selectedValues.procurementControls, 'very_low_na').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementControls', selectedValues.procurementControls, 'low').cellClass}`}>
                                                                        {getProcurementIndicator('procurementControls', selectedValues.procurementControls, 'low').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementControls', selectedValues.procurementControls, 'mid_range').cellClass}`}>
                                                                        {getProcurementIndicator('procurementControls', selectedValues.procurementControls, 'mid_range').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementControls', selectedValues.procurementControls, 'high').cellClass}`}>
                                                                        {getProcurementIndicator('procurementControls', selectedValues.procurementControls, 'high').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementControls', selectedValues.procurementControls, 'very_high').cellClass}`}>
                                                                        {getProcurementIndicator('procurementControls', selectedValues.procurementControls, 'very_high').indicator}
                                                                    </td>
                                                                </tr>
                                                            )}
                                                            {selectedValues.procurementContractualClauses && (
                                                                <tr>
                                                                    <td className="air-ai-risk-level-table-cell"><strong>Contractual Clauses Assessment</strong></td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementContractualClauses', selectedValues.procurementContractualClauses, 'very_low_na').cellClass}`}>
                                                                        {getProcurementIndicator('procurementContractualClauses', selectedValues.procurementContractualClauses, 'very_low_na').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementContractualClauses', selectedValues.procurementContractualClauses, 'low').cellClass}`}>
                                                                        {getProcurementIndicator('procurementContractualClauses', selectedValues.procurementContractualClauses, 'low').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementContractualClauses', selectedValues.procurementContractualClauses, 'mid_range').cellClass}`}>
                                                                        {getProcurementIndicator('procurementContractualClauses', selectedValues.procurementContractualClauses, 'mid_range').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementContractualClauses', selectedValues.procurementContractualClauses, 'high').cellClass}`}>
                                                                        {getProcurementIndicator('procurementContractualClauses', selectedValues.procurementContractualClauses, 'high').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementContractualClauses', selectedValues.procurementContractualClauses, 'very_high').cellClass}`}>
                                                                        {getProcurementIndicator('procurementContractualClauses', selectedValues.procurementContractualClauses, 'very_high').indicator}
                                                                    </td>
                                                                </tr>
                                                            )}
                                                            {selectedValues.procurementSupplierQuestions && (
                                                                <tr>
                                                                    <td className="air-ai-risk-level-table-cell"><strong>Unanswered Supplier Questions</strong></td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementSupplierQuestions', selectedValues.procurementSupplierQuestions, 'very_low_na').cellClass}`}>
                                                                        {getProcurementIndicator('procurementSupplierQuestions', selectedValues.procurementSupplierQuestions, 'very_low_na').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementSupplierQuestions', selectedValues.procurementSupplierQuestions, 'low').cellClass}`}>
                                                                        {getProcurementIndicator('procurementSupplierQuestions', selectedValues.procurementSupplierQuestions, 'low').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementSupplierQuestions', selectedValues.procurementSupplierQuestions, 'mid_range').cellClass}`}>
                                                                        {getProcurementIndicator('procurementSupplierQuestions', selectedValues.procurementSupplierQuestions, 'mid_range').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementSupplierQuestions', selectedValues.procurementSupplierQuestions, 'high').cellClass}`}>
                                                                        {getProcurementIndicator('procurementSupplierQuestions', selectedValues.procurementSupplierQuestions, 'high').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementSupplierQuestions', selectedValues.procurementSupplierQuestions, 'very_high').cellClass}`}>
                                                                        {getProcurementIndicator('procurementSupplierQuestions', selectedValues.procurementSupplierQuestions, 'very_high').indicator}
                                                                    </td>
                                                                </tr>
                                                            )}
                                                            {selectedValues.procurementResidualRiskFactors && (
                                                                <tr>
                                                                    <td className="air-ai-risk-level-table-cell"><strong>Residual Risk Factors Above Low</strong></td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementResidualRiskFactors', selectedValues.procurementResidualRiskFactors, 'very_low_na').cellClass}`}>
                                                                        {getProcurementIndicator('procurementResidualRiskFactors', selectedValues.procurementResidualRiskFactors, 'very_low_na').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementResidualRiskFactors', selectedValues.procurementResidualRiskFactors, 'low').cellClass}`}>
                                                                        {getProcurementIndicator('procurementResidualRiskFactors', selectedValues.procurementResidualRiskFactors, 'low').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementResidualRiskFactors', selectedValues.procurementResidualRiskFactors, 'mid_range').cellClass}`}>
                                                                        {getProcurementIndicator('procurementResidualRiskFactors', selectedValues.procurementResidualRiskFactors, 'mid_range').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementResidualRiskFactors', selectedValues.procurementResidualRiskFactors, 'high').cellClass}`}>
                                                                        {getProcurementIndicator('procurementResidualRiskFactors', selectedValues.procurementResidualRiskFactors, 'high').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementResidualRiskFactors', selectedValues.procurementResidualRiskFactors, 'very_high').cellClass}`}>
                                                                        {getProcurementIndicator('procurementResidualRiskFactors', selectedValues.procurementResidualRiskFactors, 'very_high').indicator}
                                                                    </td>
                                                                </tr>
                                                            )}
                                                            {selectedValues.procurementSystemRequirements && (
                                                                <tr>
                                                                    <td className="air-ai-risk-level-table-cell"><strong>System Requirements Identification</strong></td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementSystemRequirements', selectedValues.procurementSystemRequirements, 'very_low_na').cellClass}`}>
                                                                        {getProcurementIndicator('procurementSystemRequirements', selectedValues.procurementSystemRequirements, 'very_low_na').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementSystemRequirements', selectedValues.procurementSystemRequirements, 'low').cellClass}`}>
                                                                        {getProcurementIndicator('procurementSystemRequirements', selectedValues.procurementSystemRequirements, 'low').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementSystemRequirements', selectedValues.procurementSystemRequirements, 'mid_range').cellClass}`}>
                                                                        {getProcurementIndicator('procurementSystemRequirements', selectedValues.procurementSystemRequirements, 'mid_range').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementSystemRequirements', selectedValues.procurementSystemRequirements, 'high').cellClass}`}>
                                                                        {getProcurementIndicator('procurementSystemRequirements', selectedValues.procurementSystemRequirements, 'high').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementSystemRequirements', selectedValues.procurementSystemRequirements, 'very_high').cellClass}`}>
                                                                        {getProcurementIndicator('procurementSystemRequirements', selectedValues.procurementSystemRequirements, 'very_high').indicator}
                                                                    </td>
                                                                </tr>
                                                            )}
                                                            {selectedValues.procurementRiskTreatments && (
                                                                <tr>
                                                                    <td className="air-ai-risk-level-table-cell"><strong>Appropriate Risk Treatments</strong></td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementRiskTreatments', selectedValues.procurementRiskTreatments, 'very_low_na').cellClass}`}>
                                                                        {getProcurementIndicator('procurementRiskTreatments', selectedValues.procurementRiskTreatments, 'very_low_na').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementRiskTreatments', selectedValues.procurementRiskTreatments, 'low').cellClass}`}>
                                                                        {getProcurementIndicator('procurementRiskTreatments', selectedValues.procurementRiskTreatments, 'low').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementRiskTreatments', selectedValues.procurementRiskTreatments, 'mid_range').cellClass}`}>
                                                                        {getProcurementIndicator('procurementRiskTreatments', selectedValues.procurementRiskTreatments, 'mid_range').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementRiskTreatments', selectedValues.procurementRiskTreatments, 'high').cellClass}`}>
                                                                        {getProcurementIndicator('procurementRiskTreatments', selectedValues.procurementRiskTreatments, 'high').indicator}
                                                                    </td>
                                                                    <td className={`air-ai-risk-level-table-cell ${getProcurementIndicator('procurementRiskTreatments', selectedValues.procurementRiskTreatments, 'very_high').cellClass}`}>
                                                                        {getProcurementIndicator('procurementRiskTreatments', selectedValues.procurementRiskTreatments, 'very_high').indicator}
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </fieldset>
                        </td>
                    </tr>
                    )}   
                    <>
                    <tr><td colSpan={3}><BackToTopButton /></td></tr>
                    </>
                    {/* Overall Risk Summary Table */}
                    <tr>
                        <td colSpan={3}>
                            <fieldset className="air-inputform-fieldset">
                                <legend className="air-inputform-legend">Overall Risk Summary</legend>
                                <table className="air-risks-summary-table">
                                    <thead>
                                        <tr>
                                            <th>Risk Category <small>({(() => {
                                                // Only fields from fieldsets covered by the Overall Risk Summary table
                                                const allFields = [
                                                    // Community Harms
                                                    'communityHarmsPhysicalConfidenceLevel', 'communityHarmsPsychologicalConfidenceLevel', 'communityHarmsEnvironmentalConfidenceLevel', 'communityHarmsUnauthorisedUseConfidenceLevel', 'communityHarmsImpactOnRightsConfidenceLevel', 'communityHarmsMisidentificationConfidenceLevel', 'communityHarmsMisapplicationConfidenceLevel', 'communityHarmsOtherFinancialImpactConfidenceLevel', 'communityHarmsIncorrectAdviceConfidenceLevel', 'communityHarmsInconvenienceDelayConfidenceLevel', 'communityHarmsErosionOfTrustConfidenceLevel', 'communityHarmsEthicalImplicationsConfidenceLevel', 'communityHarmsEconomicDisruptionConfidenceLevel', 'communityHarmsSocialInequalityConfidenceLevel', 'communityHarmsOtherConfidenceLevel', 'communityHarmsReversibleConfidenceLevel', 'communityHarmsIrreversibleConfidenceLevel', 'communityHarmsSecondaryCumulativeConfidenceLevel',
                                                    // Community Risks
                                                    'communityRisksNewOrExistingService', 'communityRisksDiscriminationUnintendedBias', 'communityRisksSinglePointOfFailure', 'communityRisksHumanOversight', 'communityRisksOverRelianceFalseAlert', 'communityRisksLinkageUnclear', 'communityRisksExplainability', 'communityRisksNonAISystems', 'communityRisksInformationCompliance',
                                                    // Fairness
                                                    'fairnessRisksIncompleteData', 'fairnessRisksPoorlyDefined', 'fairnessRisksNoMonitoring', 'fairnessRisksOutlierData', 'fairnessRisksDataCleansing', 'fairnessRisksBiasDetection', 'fairnessRisksReproducibility', 'fairnessRisksDataLinking', 'fairnessRisksTrainingData', 'fairnessControlsDataSelection', 'fairnessControlsDataAvailability', 'fairnessControlsDataPopulation', 'fairnessControlsDiversityInclusion', 'fairnessControlsGenderMinority', 'fairnessControlsPerformanceMeasures', 'fairnessControlsPerformanceCalibration',
                                                    // Privacy and Security
                                                    'privacyControlsSensitiveChildren', 'privacyControlsSensitiveReligious', 'privacyControlsSensitiveRacial', 'privacyControlsSensitivePolitical', 'privacyControlsSensitiveUnion', 'privacyControlsSensitiveGender', 'privacyControlsSensitiveCriminalRecord', 'privacyControlsSensitiveHealth', 'privacyControlsSensitiveBiometric', 'privacyControlsSensitiveOtherData', 'privacyByDesign', 'privacyImpactAssessment', 'privacyControlsConsent', 'privacyControlsCyberSecurity', 'privacyControlsSensitiveData',
                                                    // Transparency
                                                    'transparencyPurpose', 'transparencyDataSources', 'transparencyDataUsage', 'transparencyPublicAwareness', 'transparencyUserFeedback', 'transparencyAuditability', 'transparencyConsultation', 'transparencyScopeGoals', 'transparencyRightToAppeal', 'transparencyClearExplanations',
                                                    // Accountability
                                                    'accountabilityTraining', 'accountabilityAwareness', 'accountabilityDocumentation', 'accountabilityDecisionHistory', 'accountabilityThirdParties', 'accountabilityResponsibleUse', 'accountabilityResponsiblePolicy', 'accountabilityResponsibleMonitoring', 'accountabilityResponsibleDataGovernance', 'accountabilityResponsibleTechnicalGovernance', 'accountabilityResponsibleAppealRedress', 'interventionProcess', 'overconfidenceProcess'
                                                ];
                                                const selectedCount = allFields.filter(field => selectedValues[field]).length;
                                                return `${selectedCount}/${allFields.length}`;
                                            })()})</small></th>
                                            <th className="air-risks-cell-header-very_low_na air-ai-risk-level-table-header">Very Low or N/A</th>
                                            <th className="air-risks-cell-header-low air-ai-risk-level-table-header">Low</th>
                                            <th className="air-risks-cell-header-mid_range air-ai-risk-level-table-header">Mid-range</th>
                                            <th className="air-risks-cell-header-high air-ai-risk-level-table-header">High</th>
                                            <th className="air-risks-cell-header-very_high air-ai-risk-level-table-header">Very High</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="air-ai-risk-level-table-cell"><strong>Community</strong></td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('community', 'very_low_na').cellClass}`}>
                                                {getOverallRiskIndicator('community', 'very_low_na').indicator}
                                            </td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('community', 'low').cellClass}`}>
                                                {getOverallRiskIndicator('community', 'low').indicator}
                                            </td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('community', 'mid_range').cellClass}`}>
                                                {getOverallRiskIndicator('community', 'mid_range').indicator}
                                            </td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('community', 'high').cellClass}`}>
                                                {getOverallRiskIndicator('community', 'high').indicator}
                                            </td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('community', 'very_high').cellClass}`}>
                                                {getOverallRiskIndicator('community', 'very_high').indicator}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="air-ai-risk-level-table-cell"><strong>Fairness</strong></td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('fairness', 'very_low_na').cellClass}`}>
                                                {getOverallRiskIndicator('fairness', 'very_low_na').indicator}
                                            </td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('fairness', 'low').cellClass}`}>
                                                {getOverallRiskIndicator('fairness', 'low').indicator}
                                            </td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('fairness', 'mid_range').cellClass}`}>
                                                {getOverallRiskIndicator('fairness', 'mid_range').indicator}
                                            </td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('fairness', 'high').cellClass}`}>
                                                {getOverallRiskIndicator('fairness', 'high').indicator}
                                            </td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('fairness', 'very_high').cellClass}`}>
                                                {getOverallRiskIndicator('fairness', 'very_high').indicator}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="air-ai-risk-level-table-cell"><strong>Privacy and Security</strong></td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('privacy', 'very_low_na').cellClass}`}>
                                                {getOverallRiskIndicator('privacy', 'very_low_na').indicator}
                                            </td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('privacy', 'low').cellClass}`}>
                                                {getOverallRiskIndicator('privacy', 'low').indicator}
                                            </td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('privacy', 'mid_range').cellClass}`}>
                                                {getOverallRiskIndicator('privacy', 'mid_range').indicator}
                                            </td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('privacy', 'high').cellClass}`}>
                                                {getOverallRiskIndicator('privacy', 'high').indicator}
                                            </td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('privacy', 'very_high').cellClass}`}>
                                                {getOverallRiskIndicator('privacy', 'very_high').indicator}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="air-ai-risk-level-table-cell"><strong>Transparency</strong></td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('transparency', 'very_low_na').cellClass}`}>
                                                {getOverallRiskIndicator('transparency', 'very_low_na').indicator}
                                            </td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('transparency', 'low').cellClass}`}>
                                                {getOverallRiskIndicator('transparency', 'low').indicator}
                                            </td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('transparency', 'mid_range').cellClass}`}>
                                                {getOverallRiskIndicator('transparency', 'mid_range').indicator}
                                            </td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('transparency', 'high').cellClass}`}>
                                                {getOverallRiskIndicator('transparency', 'high').indicator}
                                            </td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('transparency', 'very_high').cellClass}`}>
                                                {getOverallRiskIndicator('transparency', 'very_high').indicator}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="air-ai-risk-level-table-cell"><strong>Accountability</strong></td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('accountability', 'very_low_na').cellClass}`}>
                                                {getOverallRiskIndicator('accountability', 'very_low_na').indicator}
                                            </td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('accountability', 'low').cellClass}`}>
                                                {getOverallRiskIndicator('accountability', 'low').indicator}
                                            </td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('accountability', 'mid_range').cellClass}`}>
                                                {getOverallRiskIndicator('accountability', 'mid_range').indicator}
                                            </td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('accountability', 'high').cellClass}`}>
                                                {getOverallRiskIndicator('accountability', 'high').indicator}
                                            </td>
                                            <td className={`air-ai-risk-level-table-cell ${getOverallRiskIndicator('accountability', 'very_high').cellClass}`}>
                                                {getOverallRiskIndicator('accountability', 'very_high').indicator}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </fieldset>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="air-button-container">
                <div className="air-button-group">
                    <button
                        type="submit"
                        className="air-btn air-btn-secondary"
                    >
                        {editIndex !== null ? "Update Entry" : "Submit AI Risk Details"}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="air-btn air-btn-outline"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </details>
    </form>
  );
};

export default React.memo(AIRiskInputForm);

