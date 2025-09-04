import React, {useState} from "react";
import "./AIRisk.css";

const AIRiskInputForm = () => {
    
  const [viewMode, setViewMode] = useState('basic');
  const [selectedValues, setSelectedValues] = useState({});

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setSelectedValues(prev => ({...prev, [name]: value}));
  };

  const getGuidanceText = (fieldName, value) => {
    const guidanceMap = {
      communityHarmsReversibleConfidenceLevel: {
        'no': 'Low Risk - Explain your answer',
        'yes-high': 'High Risk - Do not proceed until you receive legal advice. If you have legal approval: discuss this with all relevant stakeholders, you may need ethics approval, consider a Human Rights Impact Assessment. If your solution is operational - consult responsible officers for an appropriate equivalent action',
        'yes-low': 'Low Risk - Explain your answer',
        'unclear': 'Unclear - Explain your answer'
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
        'na': 'Explain your answer'
      },
      privacyInformationCompliance: {
        'yes': 'If you have confirmed any other relevant acts, please list these in your response',
        'unclear': 'Very High Risk - Pause the project. Seek advice from an appropriate NSW legal source or the NSW Privacy Commissioner. You may need to redesign your project and or system. If your solution is operational - consult responsible officers for an appropriate equivalent action',
        'no': 'Very High Risk - Do not proceed any further unless you receive clear legal advice that allows you to proceed. Consider redesigning your project and or system. If your solution is operational - consult responsible officers for an appropriate equivalent action'
      },
      fairnessDataRepresentative: {
        'yes': 'Low Risk - Explain your answer',
        'unclear': 'Very High Risk - Consult with relevant stakeholders on data options or implement a data improvement strategy or redesign your project/system',
        'no-but-better': 'High Risk - Document your reasons. Clearly demonstrate that you have consulted with all relevant stakeholders before proceeding. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'no': 'Very High Risk - Pause the project and review with the responsible officers on how to resolve. If your solution is operational - consult responsible officers for an appropriate equivalent action.'
      },
      fairnessDataQuality: {
        'yes': 'Low Risk - Explain your answer',
        'unclear': 'Very High Risk - Consult with relevant stakeholders to identify alternative data sources or implement a data improvement strategy or redesign your project/system',
        'partially-but-better': 'High Risk - Document your reasons and details to demonstrate that you have consulted with all relevant stakeholders before proceeding. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'no': 'Very High Risk - Pause the project and review with the responsible officers on how to resolve. If your solution is operational - consult responsible officers for an appropriate equivalent action.'
      },
      fairnessDiscriminationAge: {
        'yes': 'Low Risk - Explain your answer',
        'partially-but-better': 'High Risk - Consider seeking advice from an ethics committee. Document how you have consulted with all relevant stakeholders before proceeding. Consider a Human Rights Impact Assessment. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'no-or-unclear': 'Very High Risk - Pause the project and review with the responsible officers on how to resolve. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'na': 'N/A - Document your reasons as to why this does not apply, then go to the next question.'
      },
      fairnessDiscriminationSex: {
        'yes': 'Low Risk - Explain your answer',
        'partially-but-better': 'High Risk - Consider seeking advice from an ethics committee. Document how you have consulted with all relevant stakeholders before proceeding. Consider a Human Rights Impact Assessment. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'no-or-unclear': 'Very High Risk - Pause the project and review with the responsible officers on how to resolve. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'na': 'N/A - Document your reasons as to why this does not apply, then go to the next question.'
      },
      fairnessDiscriminationRace: {
        'yes': 'Low Risk - Explain your answer',
        'partially-but-better': 'High Risk - Consider seeking advice from an ethics committee. Document how you have consulted with all relevant stakeholders before proceeding. Consider a Human Rights Impact Assessment. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'no-or-unclear': 'Very High Risk - Pause the project and review with the responsible officers on how to resolve. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'na': 'N/A - Document your reasons as to why this does not apply, then go to the next question.'
      },
      fairnessPerformanceTargets: {
        'yes': 'Low Risk - Explain your answer',
        'no-elevated': 'Very High Risk - For elevated risk uses of AI, pause the project until you have established performance measures and targets. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'no-nonelevated': 'Mid-range Risk - For non-elevated risk projects or systems, results should be treated as indicative and not relied on. Document your reasons. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'na': 'N/A - Document your reasons as to why this does not apply, then go to the next question.'
      },
      fairnessPerformanceMeasures: {
        'yes': 'Low Risk - Explain your answer',
        'no-elevated': 'Very High Risk - For elevated risk uses of AI, pause the project until you have established performance measures and targets. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'no-nonelevated': 'Mid-range Risk - For non-elevated risk projects or systems, results should be treated as indicative and not relied on. Document your reasons. If your solution is operational - consult responsible officers for an appropriate equivalent action.'
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
      fairnessControlsSensitiveChildren: {
        'na': 'Very Low Risk or N/A',
        'low': 'Low Risk',
        'mid-range': 'Mid-range Risk',
        'high': 'High Risk',
        'very-high': 'Very High Risk'
      },
      fairnessControlsSensitiveReligious: {
        'na': 'Very Low Risk or N/A',
        'low': 'Low Risk',
        'mid-range': 'Mid-range Risk',
        'high': 'High Risk',
        'very-high': 'Very High Risk'
      },
      fairnessControlsSensitiveRacial: {
        'na': 'Very Low Risk or N/A',
        'low': 'Low Risk',
        'mid-range': 'Mid-range Risk',
        'high': 'High Risk',
        'very-high': 'Very High Risk'
      },
      fairnessControlsSensitivePolitical: {
        'na': 'Very Low Risk or N/A',
        'low': 'Low Risk',
        'mid-range': 'Mid-range Risk',
        'high': 'High Risk',
        'very-high': 'Very High Risk'
      },
      fairnessControlsSensitiveUnion: {
        'na': 'Very Low Risk or N/A',
        'low': 'Low Risk',
        'mid-range': 'Mid-range Risk',
        'high': 'High Risk',
        'very-high': 'Very High Risk'
      },
      fairnessControlsSensitiveGender: {
        'na': 'Very Low Risk or N/A',
        'low': 'Low Risk',
        'mid-range': 'Mid-range Risk',
        'high': 'High Risk',
        'very-high': 'Very High Risk'
      },
      fairnessControlsSensitiveCriminalRecord: {
        'na': 'Very Low Risk or N/A',
        'low': 'Low Risk',
        'mid-range': 'Mid-range Risk',
        'high': 'High Risk',
        'very-high': 'Very High Risk'
      },
      fairnessControlsSensitiveHealth: {
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
        'low': 'Low Risk - Provide information above that confirms you have done this and any key information to not for ongoing risk management',
        'very-high': 'Very High Risk - Pause the project until you meet mandatory requirements. If your solution is operational - consult responsible officers for an appropriate equivalent action'
      },
      privacyControlsSensitiveData: {
        'low': 'Low Risk - Document how you have confirmed this',
        'very-high': 'Very High Risk - Seek advice from an appropriate legal source or the Privacy Officer. Consider seeking approval from an ethics committee',
        'unclear': 'Very High Risk - Pause the project and review your data. Consider advice from an appropriate legal source or the Privacy Officer. If your solution is operational - consult responsible officers for an appropriate equivalent action'
      },
      
      // Fairness Controls - Other Sensitive Data (Privacy by Design)
      fairnessControlsSensitiveOther: {
        'na': 'Low Risk - Document any points to resolve, then go to next question. Consider contacting the information and privacy commissioner or Cyber NSW for any points not resolved',
        'low': 'High Risk - Pause the project, apply the principles before proceeding, document any points to resolve below then go to next question. Consider contacting the information and privacy commissioner or Cyber NSW for any points not resolved. If your solution is operational - consult responsible officers for an appropriate equivalent action',
        'high': 'Very High Risk - Pause the project, apply the principles before proceeding, document any points to resolve below then go to next question. Consider contacting the information and privacy commissioner or Cyber NSW for any points not resolved. If your solution is operational - consult responsible officers for an appropriate equivalent action'
      },

      // Privacy Impact Assessment
      privacyImpactAssessment: {
        'low': 'Low Risk - Document the result, then go to the next question',
        'very-high': 'Very High Risk - Pause the project until you have completed a privacy impact assessment. If your solution is operational - consult responsible officers for an appropriate equivalent action',
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
        'na': 'Low Risk - Document who is responsible to each point within the question',
        'low': 'Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action'
      },

      // Accountability - Responsible Policy
      accountabilityResponsiblePolicy: {
        'na': 'Low Risk - Document who is responsible to each point within the question',
        'low': 'Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action'
      },

      // Accountability - Responsible Monitoring
      accountabilityResponsibleMonitoring: {
        'na': 'Low Risk - Document who is responsible to each point within the question',
        'low': 'Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action'
      },

      // Accountability - Responsible Data Governance
      accountabilityResponsibleDataGovernance: {
        'na': 'Low Risk - Document who is responsible to each point within the question',
        'low': 'Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action'
      },

      // Accountability - Responsible Technical Governance
      accountabilityResponsibleTechnicalGovernance: {
        'na': 'Low Risk - Document who is responsible to each point within the question',
        'low': 'Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action'
      },

      // Accountability - Responsible Appeal & Redress
      accountabilityResponsibleAppealRedress: {
        'na': 'Low Risk - Document who is responsible to each point within the question',
        'low': 'Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action'
      },

      // Fairness Controls - Sensitive Biometric Data
      fairnessControlsSensitiveBiometric: {
        'na': 'Very Low Risk or N/A',
        'low': 'Low Risk',
        'mid-range': 'Mid-range Risk',
        'high': 'High Risk',
        'very-high': 'Very High Risk'
      },

      // Fairness Controls - Other Sensitive Data (first instance)
      fairnessControlsSensitiveOtherData: {
        'na': 'Very Low Risk or N/A',
        'low': 'Low Risk',
        'mid-range': 'Mid-range Risk',
        'high': 'High Risk',
        'very-high': 'Very High Risk'
      },

      // Privacy by Design & Security by Design
      privacyByDesign: {
        'na': 'Low Risk - Document any points to resolve, then go to next question. Consider contacting the information and privacy commissioner or Cyber NSW for any points not resolved',
        'low': 'High Risk - Pause the project, apply the principles before proceeding, document any points to resolve below then go to next question. Consider contacting the information and privacy commissioner or Cyber NSW for any points not resolved. If your solution is operational - consult responsible officers for an appropriate equivalent action',
        'high': 'Very High Risk - Pause the project, apply the principles before proceeding, document any points to resolve below then go to next question. Consider contacting the information and privacy commissioner or Cyber NSW for any points not resolved. If your solution is operational - consult responsible officers for an appropriate equivalent action'
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
      interventionProcess: {
        'yes': 'Low Risk - Document the details, then go to next question',
        'no': 'Very High Risk - Pause your project, consult with relevant stakeholders and establish appropriate processes. If your solution is operational - consult responsible officers for an appropriate equivalent action',
        'na': 'N/A - Document your reasons as to why this does not apply, then go to next question'
      },

      // Human Intervention - Overconfidence Process
      overconfidenceProcess: {
        'yes': 'Low Risk - Document the details, then go to next question',
        'no': 'Very High Risk - Pause your project, consult with relevant stakeholders and establish appropriate processes. If your solution is operational - consult responsible officers for an appropriate equivalent action',
        'na': 'N/A - Document your reasons as to why this does not apply, then go to next question'
      },

      // Risk Mitigation - Elevated Risk
      elevatedRisk: {
        'yes-high': 'Very High Risk - Don\'t proceed without legal advice. If the pilot proceeds, pilot first with ongoing controls and monitoring. A formal review should be conducted after pilot phase. Conduct an independent risk audit, and your self-assessment needs to be reviewed by the NSW AI Review Committee. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
        'yes-mid': 'Mid-range Risk - Don\'t proceed without legal advice. If the project proceeds, pilot first with ongoing controls and monitoring, consider a review by the NSW AI Review Committee and conduct an independent risk audit. If your solution is operational - consult responsible officers for an appropriate equivalent action.',
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
        'unclear': 'High Risk - Pause the project and consult with either your legal team, responsible officers and risk teams before proceeding'
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
      }
    };
    
    return guidanceMap[fieldName]?.[value] || '';
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
    
    const riskLevels = {
      'very_high': 6,
      'high': 5,
      'mid_range': 4,
      'low': 3,
      'very_low': 2,
      'na': 1,
      '': 0
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
    benefitsFields.forEach(field => {
      const value = selectedValues[field] || '';
      const level = riskLevels[value] || 0;
      if (level > maxLevel) {
        maxLevel = level;
      }
    });
    
    return reverseLevels[maxLevel];
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
    
    const riskLevels = {
      'very_high': 6,
      'high': 5,
      'mid_range': 4,
      'low': 3,
      'very_low': 2,
      'na': 1,
      '': 0
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
    
    // Process standard fields
    harmsFields.forEach(field => {
      const value = selectedValues[field] || '';
      const level = riskLevels[value] || 0;
      if (level > maxLevel) {
        maxLevel = level;
      }
    });
    
    // Process special fields with different option mappings
    const getSpecialFieldLevel = (field, value) => {
      if (!value) return 0;
      
      if (field === 'communityHarmsReversibleConfidenceLevel') {
        switch (value) {
          case 'unclear': return 6; // Very High risk
          case 'yes-high': return 5; // High risk
          case 'yes-low': return 3; // Low risk
          case 'no': return 3; // Low risk
          default: return 0;
        }
      }
      
      if (field === 'communityHarmsIrreversibleConfidenceLevel') {
        switch (value) {
          case 'yes-veryhigh': return 6; // Very High risk
          case 'unclear-veryhigh': return 6; // Very High risk
          case 'yes-high': return 5; // High risk (better than existing)
          case 'no': return 3; // Low risk
          default: return 0;
        }
      }
      
      if (field === 'communityHarmsSecondaryCumulativeConfidenceLevel') {
        switch (value) {
          case 'unclear-veryhigh': return 6; // Very High risk
          case 'yes-high': return 5; // High risk
          case 'yes-low': return 3; // Low risk
          case 'no': return 3; // Low risk
          default: return 0;
        }
      }
      
      return 0;
    };
    
    // Check special fields
    const specialFields = [
      'communityHarmsReversibleConfidenceLevel',
      'communityHarmsIrreversibleConfidenceLevel',
      'communityHarmsSecondaryCumulativeConfidenceLevel'
    ];
    
    specialFields.forEach(field => {
      const value = selectedValues[field] || '';
      const level = getSpecialFieldLevel(field, value);
      if (level > maxLevel) {
        maxLevel = level;
      }
    });
    
    return reverseLevels[maxLevel];
  };

  // Get highest risk rating in Community Risks fieldset
  const getCommunityRisksHighestRisk = () => {
    // First 7 fields use the same risk mapping as Community Harms standard fields
    const standardRisksFields = [
      'communityRisksNewOrExistingService',
      'communityRisksDiscriminationUnintendedBias',
      'communityRisksSinglePointOfFailure',
      'communityRisksHumanOversight',
      'communityRisksOverRelianceFalseAlert',
      'communityRisksLinkageUnclear',
      'communityRisksExplainability'
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
      
      if (field === 'privacyInformationCompliance') {
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
    const specialFields = ['communityRisksNonAISystems', 'privacyInformationCompliance'];
    specialFields.forEach(field => {
      const value = selectedValues[field] || '';
      const level = getSpecialRisksFieldLevel(field, value);
      if (level > maxLevel) {
        maxLevel = level;
      }
    });
    
    return reverseLevels[maxLevel];
  };

  return (
    <details className="air-inputform-details">
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
            </div>
        </div>

        <div>
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
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Project Name:<span className="air-inputform-required">*</span></label></td>
                                            <td className="air-inputform-field-cell">
                                                <input type="text" name="projectName" className="air-inputform-input" required />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Project Description:<span className="air-inputform-required">*</span></label></td>
                                            <td className="air-inputform-field-cell">
                                                <textarea name="projectDescription" className="air-inputform-textarea" required></textarea>
                                            </td>
                                        </tr>
                                        {viewMode === 'extended' && (
                                            <>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Business Goals:</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <textarea name="businessGoals" className="air-inputform-textarea"></textarea>
                                                </td>
                                            </tr>
                                            <tr title="What is the problem / challenge / issue being addressed?">
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Problem/Challenge Being Addressed:</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <textarea name="problemChallenge" className="air-inputform-textarea"></textarea>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">What is the system trying to achieve?</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <textarea name="systemGoals" className="air-inputform-textarea"></textarea>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Why is an AI system the better way?</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <textarea name="aiJustification" className="air-inputform-textarea"></textarea>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Project Sponsor:</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <input type="text" name="projectSponsor" className="air-inputform-input" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Project Owner</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <input type="text" name="projectOwner" className="air-inputform-input" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Technical System Owner</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <input type="text" name="technicalSystemOwner" className="air-inputform-input" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Data Governance Owner</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <input type="text" name="dataGovernanceOwner" className="air-inputform-input" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Contributors</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <textarea name="contributors" className="air-inputform-textarea"></textarea>
                                                </td>
                                            </tr>
                                            <tr title="Phase of the Project (design and develop; verify and validate through pilot; deploy and evaluate; operate / monitor / maintain; re-evaluate)">
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Phase of the Project</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <input type="text" name="projectPhase" className="air-inputform-input" />
                                                </td>
                                            </tr>
                                            <tr title="Next date/milestone that will trigger the next review">
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Next Review Date</label></td>
                                                <td className="air-inputform-field-cell">
                                                    <input type="date" name="nextReviewDate" className="air-inputform-date" />
                                                </td>
                                            </tr>
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </fieldset>
                        </td>
                    </tr>
                    {/* Is the framework assessment required? */}
                    <tr>
                        <td colSpan={2}>
                            <fieldset className="air-inputform-fieldset air-inputform-fieldset-required">
                                <legend className="air-inputform-legend air-inputform-legend-required">AI Assessment Required?</legend>
                                <table className="air-inputform-field-table">
                                    <tbody>                                        
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Operational Impact: Does your system produce or directly influence any administrative decisions (government decision with legal or similar significant effect)? i.e., automating decisions on issuing infringements.</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="impactsAdministrativeDecisions" className="air-inputform-select" value={selectedValues.impactsAdministrativeDecisions || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Operational Impact: Does your system trigger a real-world action with more than negligible potential effect (meaningful change to environment or system state)? i.e., an automated alerting system.</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="triggersRealWorldAction" className="air-inputform-select" value={selectedValues.triggersRealWorldAction || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Autonomous: Does your system operate autonomously or have potential to produce harmful outputs independently of human action, without requiring manual initiation? i.e., autonomous vehicles.</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="operatesAutonomously" className="air-inputform-select" value={selectedValues.operatesAutonomously || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Data Sensitivity: Was any part of your system trained using sensitive information or can it produce outputs which contain sensitive information? i.e. a biometric based face matching system</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="dataSensitivity" className="air-inputform-select" value={selectedValues.dataSensitivity || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Unintended harms: Is there a risk of system failure, misuse, or inappropriately deployed that could cause harm to an individual or group? i.e., systems using unverifiable data inputs</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="unintendedHarms" className="air-inputform-select" value={selectedValues.unintendedHarms || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Explainability and Transparency: Does your system fail to provide explainability for generated content and decisions, hindering comprehension by laypeople and assessment by technical experts? i.e., information informing policy development</label></td>
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
                                        <tr>
                                            <td colSpan={2}><hr /></td>
                                        </tr>
                                        {/* If any of the following are Yes, show banner: Yes: Consult the guidance as to when the framework may not be needed / No: If you can answer No to all questions it means you are not using AI in a manner which is potentially elevated risk. */}
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Buy AI and use - Buying or using an off the shelf system. Used without modifying the algorithm or any risk mitigation tools, nor adding domain-specific content. i.e. ChatGPT, or AI in Salesforce, SAP, etc.</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="buyAI" className="air-inputform-select" value={selectedValues.buyAI || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </td>                                            
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Embed AI and/or co-train - Developing a product with embedded AI or purchasing an AI platform and augmented training data with domain-specific content. i.e., integrating AI biometrics or developing a chatbot with augmented training.</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="embedAI" className="air-inputform-select" value={selectedValues.embedAI || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Develop AI and/or train - Developing an AI tool in-house. Even if based on a standard platform, I am developing algorithms and supplying the training data. i.e. Developing anomaly detection or training LLM with domain-specific content.</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="developAI" className="air-inputform-select" value={selectedValues.developAI || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Automating decisions - Developing a tool in-house that uses AI and that automates at least one critical step in the decision-making process. i.e. AI powered hiring and recruitment.</label></td>
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
                                                            ✅ If you can answer No to all questions it means you are not using AI in a manner which is potentially elevated risk.
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                            return null;
                                        })()}
                                        {/** If any of the above questions are true: Show the following inputs, otherwise keep them hidden */}
                                    </tbody>
                                </table>
                            </fieldset>
                        </td>
                    </tr>
                    {/* Human Rights Impact Assessment Required? */}
                    <tr>
                        <td colSpan={3}>
                            <fieldset className="air-inputform-fieldset air-inputform-fieldset-hria">
                                <legend className="air-inputform-legend air-inputform-legend-hria">Human Rights Impact Assessment Required?</legend>
                                <table className="air-inputform-field-table">
                                    <tbody>
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
                                                <textarea name="humanRightsAlgorithmicDecisionDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea>
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
                                                <textarea name="humanRightsTradeOffsDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea>
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
                                                <textarea name="humanRightsImpactDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea>
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
                                                <textarea name="humanRightsSuggestionsDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea>
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
                                                <textarea name="humanRightsAutonomyDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea>
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
                    {/* Community Benefits - Confidence Level */}
                    <tr>
                        <td colSpan={3}>
                            <fieldset className="air-inputform-fieldset air-inputform-fieldset-benefits">
                                <legend className="air-inputform-legend air-inputform-legend-benefits">Community Benefits - Confidence Level AI Will Deliver</legend>
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
                                                    <option value="very_low">Very Low</option>
                                                    <option value="low">Low</option>
                                                    <option value="mid_range">Mid-range</option>
                                                    <option value="high">High</option>
                                                    <option value="very_high">Very High</option>
                                                </select>
                                            </td>
                                            <td><textarea name="communityBenefitsQualityDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">A reduction in processing or delivery times</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="communityBenefitsProcessing" className="air-inputform-select" value={selectedValues.communityBenefitsProcessing || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low</option>
                                                    <option value="low">Low</option>
                                                    <option value="mid_range">Mid-range</option>
                                                    <option value="high">High</option>
                                                    <option value="very_high">Very High</option>
                                                </select>
                                            </td>
                                            <td><textarea name="communityBenefitsProcessingDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Financial efficiencies or savings</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="communityBenefitsFinancial" className="air-inputform-select" value={selectedValues.communityBenefitsFinancial || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low</option>
                                                    <option value="low">Low</option>
                                                    <option value="mid_range">Mid-range</option>
                                                    <option value="high">High</option>
                                                    <option value="very_high">Very High</option>
                                                </select>
                                            </td>
                                            <td><textarea name="communityBenefitsFinancialDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">An AI capability that could be used or adapted by other departments or lines of business</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="communityBenefitsAdaptable" className="air-inputform-select" value={selectedValues.communityBenefitsAdaptable || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low</option>
                                                    <option value="low">Low</option>
                                                    <option value="mid_range">Mid-range</option>
                                                    <option value="high">High</option>
                                                    <option value="very_high">Very High</option>
                                                </select>
                                            </td>
                                            <td><textarea name="communityBenefitsAdaptableDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">A new service or outcome (particularly if it cannot be done without using AI)</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="communityBenefitsNewService" className="air-inputform-select" value={selectedValues.communityBenefitsNewService || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low</option>
                                                    <option value="low">Low</option>
                                                    <option value="mid_range">Mid-range</option>
                                                    <option value="high">High</option>
                                                    <option value="very_high">Very High</option>
                                                </select>
                                            </td>
                                            <td><textarea name="communityBenefitsNewServiceDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Enabling future innovations to existing services, or new services or outcomes</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="communityBenefitsInnovation" className="air-inputform-select" value={selectedValues.communityBenefitsInnovation || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low</option>
                                                    <option value="low">Low</option>
                                                    <option value="mid_range">Mid-range</option>
                                                    <option value="high">High</option>
                                                    <option value="very_high">Very High</option>
                                                </select>
                                            </td>
                                            <td><textarea name="communityBenefitsInnovationDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {/* Show highest risk rating summary */}
                                        <tr>
                                            <td colSpan={3}>
                                                {(() => {
                                                    const riskLevel = getCommunityBenefitsHighestRisk();
                                                    return (
                                                        <div className={`air-benefits-risk-summary ${riskLevel.cssClass}`}>
                                                            📈 <strong>Highest Community Benefits Confidence Level: {riskLevel.text}</strong>
                                                            {riskLevel.text !== 'Not Set' && riskLevel.text !== 'N/A' && (
                                                                <span> - This represents the highest confidence level selected across all community benefits categories.</span>
                                                            )}
                                                        </div>
                                                    );
                                                })()}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </fieldset>
                        </td>
                    </tr>                    
                    {/* Community Harms - Confidence Level */}
                    <tr>
                        <td colSpan={3}>
                            <fieldset className="air-inputform-fieldset air-inputform-fieldset-harms">
                                <legend className="air-inputform-legend air-inputform-legend-harms">Community Harms - Confidence Level AI Will Cause</legend>
                                <table className="air-inputform-field-table">
                                    <tbody>
                                        <tr>
                                            <td colSpan={3}><em>All AI projects should have a harms register that is kept up to date throughout the project. The harms register should be maintained by the Responsible Officers.</em></td>                                            
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Physical harms</label></td>
                                            <td className="air-inputform-field-cell"><select 
                                                name="communityHarmsPhysicalConfidenceLevel" 
                                                className="air-inputform-select"
                                                value={selectedValues.communityHarmsPhysicalConfidenceLevel || ""}
                                                onChange={handleSelectChange}
                                            >
                                                    <option value="">Select...</option>
                                                    <option value="na">N/A</option>
                                                    <option value="very_low">Very Low</option>
                                                    <option value="low">Low</option>
                                                    <option value="mid_range">Mid-range</option>
                                                    <option value="high">High</option>
                                                    <option value="very_high">Very High</option>
                                                </select>
                                            </td>
                                            <td><textarea name="communityHarmsPhysicalConfidenceLevelDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Psychological harms</label></td>
                                            <td className="air-inputform-field-cell"><select 
                                                name="communityHarmsPsychologicalConfidenceLevel" 
                                                className="air-inputform-select"
                                                value={selectedValues.communityHarmsPsychologicalConfidenceLevel || ""}
                                                onChange={handleSelectChange}
                                            >
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="very_low">Very Low</option>
                                                <option value="low">Low</option>
                                                <option value="mid_range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very_high">Very High</option>
                                            </select>
                                            </td>
                                            <td><textarea name="communityHarmsPsychologicalConfidenceLevelDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Environmental harms or harms to the broader community</label></td>
                                            <td className="air-inputform-field-cell"><select 
                                                name="communityHarmsEnvironmentalConfidenceLevel" 
                                                className="air-inputform-select"
                                                value={selectedValues.communityHarmsEnvironmentalConfidenceLevel || ""}
                                                onChange={handleSelectChange}
                                            >
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="very_low">Very Low</option>
                                                <option value="low">Low</option>
                                                <option value="mid_range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very_high">Very High</option>
                                            </select>
                                            </td>
                                            <td><textarea name="communityHarmsEnvironmentalConfidenceLevelDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Unauthorised use of health or sensitive personal information (SIP)</label></td>
                                            <td className="air-inputform-field-cell"><select 
                                                name="communityHarmsUnauthorisedUseConfidenceLevel" 
                                                className="air-inputform-select"
                                                value={selectedValues.communityHarmsUnauthorisedUseConfidenceLevel || ""}
                                                onChange={handleSelectChange}
                                            >
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="very_low">Very Low</option>
                                                <option value="low">Low</option>
                                                <option value="mid_range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very_high">Very High</option>
                                            </select>
                                            </td>
                                            <td><textarea name="communityHarmsUnauthorisedUseConfidenceLevelDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Impact on right, privilege or entitlement</label></td>
                                            <td className="air-inputform-field-cell"><select 
                                                name="communityHarmsImpactOnRightsConfidenceLevel" 
                                                className="air-inputform-select"
                                                value={selectedValues.communityHarmsImpactOnRightsConfidenceLevel || ""}
                                                onChange={handleSelectChange}
                                            >
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="very_low">Very Low</option>
                                                <option value="low">Low</option>
                                                <option value="mid_range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very_high">Very High</option>
                                            </select>
                                            </td>
                                            <td><textarea name="communityHarmsImpactOnRightsConfidenceLevelDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Unintended identification or misidentification of an individual</label></td>
                                            <td className="air-inputform-field-cell"><select 
                                                name="communityHarmsMisidentificationConfidenceLevel" 
                                                className="air-inputform-select"
                                                value={selectedValues.communityHarmsMisidentificationConfidenceLevel || ""}
                                                onChange={handleSelectChange}
                                            >
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="very_low">Very Low</option>
                                                <option value="low">Low</option>
                                                <option value="mid_range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very_high">Very High</option>
                                            </select>
                                            </td>
                                            <td><textarea name="communityHarmsMisidentificationConfidenceLevelDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Misapplication of a fine or penalty</label></td>
                                            <td className="air-inputform-field-cell"><select 
                                                name="communityHarmsMisapplicationConfidenceLevel" 
                                                className="air-inputform-select"
                                                value={selectedValues.communityHarmsMisapplicationConfidenceLevel || ""}
                                                onChange={handleSelectChange}
                                            >
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="very_low">Very Low</option>
                                                <option value="low">Low</option>
                                                <option value="mid_range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very_high">Very High</option>
                                            </select>
                                            </td>
                                            <td><textarea name="communityHarmsMisapplicationConfidenceLevelDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Other financial or commercial impact</label></td>
                                            <td className="air-inputform-field-cell"><select 
                                                name="communityHarmsOtherFinancialImpactConfidenceLevel" 
                                                className="air-inputform-select"
                                                value={selectedValues.communityHarmsOtherFinancialImpactConfidenceLevel || ""}
                                                onChange={handleSelectChange}
                                            >
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="very_low">Very Low</option>
                                                <option value="low">Low</option>
                                                <option value="mid_range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very_high">Very High</option>
                                            </select>
                                            </td>
                                            <td><textarea name="communityHarmsOtherFinancialImpactConfidenceLevelDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Incorrect advice or guidance</label></td>
                                            <td className="air-inputform-field-cell"><select 
                                                name="communityHarmsIncorrectAdviceConfidenceLevel" 
                                                className="air-inputform-select"
                                                value={selectedValues.communityHarmsIncorrectAdviceConfidenceLevel || ""}
                                                onChange={handleSelectChange}
                                            >
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="very_low">Very Low</option>
                                                <option value="low">Low</option>
                                                <option value="mid_range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very_high">Very High</option>
                                            </select>
                                            </td>
                                            <td><textarea name="communityHarmsIncorrectAdviceConfidenceLevelDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Inconvenience or delay</label></td>
                                            <td className="air-inputform-field-cell"><select 
                                                name="communityHarmsInconvenienceDelayConfidenceLevel" 
                                                className="air-inputform-select"
                                                value={selectedValues.communityHarmsInconvenienceDelayConfidenceLevel || ""}
                                                onChange={handleSelectChange}
                                            >
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="very_low">Very Low</option>
                                                <option value="low">Low</option>
                                                <option value="mid_range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very_high">Very High</option>
                                            </select>
                                            </td>
                                            <td><textarea name="communityHarmsInconvenienceDelayConfidenceLevelDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Erosion of trust</label></td>
                                            <td className="air-inputform-field-cell"><select 
                                                name="communityHarmsErosionOfTrustConfidenceLevel" 
                                                className="air-inputform-select"
                                                value={selectedValues.communityHarmsErosionOfTrustConfidenceLevel || ""}
                                                onChange={handleSelectChange}
                                            >
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="very_low">Very Low</option>
                                                <option value="low">Low</option>
                                                <option value="mid_range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very_high">Very High</option>
                                            </select>
                                            </td>
                                            <td><textarea name="communityHarmsErosionOfTrustConfidenceLevelDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Ethical implications</label></td>
                                            <td className="air-inputform-field-cell"><select 
                                                name="communityHarmsEthicalImplicationsConfidenceLevel" 
                                                className="air-inputform-select"
                                                value={selectedValues.communityHarmsEthicalImplicationsConfidenceLevel || ""}
                                                onChange={handleSelectChange}
                                            >
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="very_low">Very Low</option>
                                                <option value="low">Low</option>
                                                <option value="mid_range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very_high">Very High</option>
                                            </select>
                                            </td>
                                            <td><textarea name="communityHarmsEthicalImplicationsConfidenceLevelDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Economic disruption / impact</label></td>
                                            <td className="air-inputform-field-cell"><select 
                                                name="communityHarmsEconomicDisruptionConfidenceLevel" 
                                                className="air-inputform-select"
                                                value={selectedValues.communityHarmsEconomicDisruptionConfidenceLevel || ""}
                                                onChange={handleSelectChange}
                                            >
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="very_low">Very Low</option>
                                                <option value="low">Low</option>
                                                <option value="mid_range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very_high">Very High</option>
                                            </select>
                                            </td>
                                            <td><textarea name="communityHarmsEconomicDisruptionConfidenceLevelDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Social inequality</label></td>
                                            <td className="air-inputform-field-cell"><select 
                                                name="communityHarmsSocialInequalityConfidenceLevel" 
                                                className="air-inputform-select"
                                                value={selectedValues.communityHarmsSocialInequalityConfidenceLevel || ""}
                                                onChange={handleSelectChange}
                                            >
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="very_low">Very Low</option>
                                                <option value="low">Low</option>
                                                <option value="mid_range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very_high">Very High</option>
                                            </select>
                                            </td>
                                            <td><textarea name="communityHarmsSocialInequalityConfidenceLevelDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Other harms</label></td>
                                            <td className="air-inputform-field-cell"><select 
                                                name="communityHarmsOtherConfidenceLevel" 
                                                className="air-inputform-select"
                                                value={selectedValues.communityHarmsOtherConfidenceLevel || ""}
                                                onChange={handleSelectChange}
                                            >
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="very_low">Very Low</option>
                                                <option value="low">Low</option>
                                                <option value="mid_range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very_high">Very High</option>
                                            </select>
                                            </td>
                                            <td><textarea name="communityHarmsOtherConfidenceLevelDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
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
                                            <td><textarea name="communityHarmsReversibleConfidenceLevelDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>                                            
                                        </tr>
                                        {selectedValues.communityHarmsReversibleConfidenceLevel && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    <strong>Guidance:</strong> {getGuidanceText('communityHarmsReversibleConfidenceLevel', selectedValues.communityHarmsReversibleConfidenceLevel)}
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
                                            <td><textarea name="communityHarmsIrreversibleConfidenceLevelDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.communityHarmsIrreversibleConfidenceLevel && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    <strong>Guidance:</strong> {getGuidanceText('communityHarmsIrreversibleConfidenceLevel', selectedValues.communityHarmsIrreversibleConfidenceLevel)}
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
                                            <td><textarea name="communityHarmsSecondaryCumulativeConfidenceLevelDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.communityHarmsSecondaryCumulativeConfidenceLevel && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    <strong>Guidance:</strong> {getGuidanceText('communityHarmsSecondaryCumulativeConfidenceLevel', selectedValues.communityHarmsSecondaryCumulativeConfidenceLevel)}
                                                </td>
                                            </tr>
                                        )}
                                        {/* Show highest risk rating summary */}
                                        <tr>
                                            <td colSpan={3}>
                                                {(() => {
                                                    const riskLevel = getCommunityHarmsHighestRisk();
                                                    return (
                                                        <div className={`air-harms-risk-summary ${riskLevel.cssClass}`}>
                                                            ⚠️ <strong>Highest Community Harms Risk Level: {riskLevel.text}</strong>
                                                            {riskLevel.text !== 'Not Set' && riskLevel.text !== 'N/A' && (
                                                                <span> - This represents the highest risk level selected across all community harms categories.</span>
                                                            )}
                                                        </div>
                                                    );
                                                })()}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </fieldset>
                        </td>
                    </tr>
                    {/* Community Risks */}
                    <tr>
                        <td colSpan={3}>
                            <fieldset className="air-inputform-fieldset air-inputform-fieldset-risks">
                                <legend className="air-inputform-legend air-inputform-legend-risks">Community Risks - General Risk Factor Assessment</legend>
                                <table className="air-inputform-field-table">
                                        <tbody>
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
                                                <td><textarea name="communityRisksNewOrExistingServiceDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
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
                                                <td><textarea name="communityRisksDiscriminationUnintendedBiasDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
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
                                                <td><textarea name="communityRisksSinglePointOfFailureDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
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
                                                <td><textarea name="communityRisksHumanOversightDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
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
                                                <td><textarea name="communityRisksOverRelianceFalseAlertDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
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
                                                <td><textarea name="communityRisksLinkageUnclearDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
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
                                                <td><textarea name="communityRisksExplainabilityDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
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
                                                <td><textarea name="communityRisksNonAISystemsDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.communityRisksNonAISystems && (
                                                <tr>
                                                    <td colSpan={3} className="air-inputform-guidance-row">
                                                        <strong>Guidance:</strong> {getGuidanceText('communityRisksNonAISystems', selectedValues.communityRisksNonAISystems)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3}><em>More information: You must always comply with privacy and information access laws, including when you are developing and using AI Systems.</em></td>
                                            </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Does this system and the use of data align with relevant legislation?</label></td>
                                                <td className="air-inputform-field-cell"><select 
                                                    name="privacyInformationCompliance" 
                                                    className="air-inputform-select"
                                                    value={selectedValues.privacyInformationCompliance || ""}
                                                    onChange={handleSelectChange}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="unclear">Unclear</option>
                                                    <option value="no">No</option>
                                                </select></td>
                                                <td><textarea name="privacyInformationComplianceDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                            </tr>
                                            {selectedValues.privacyInformationCompliance && (
                                                <tr>
                                                    <td colSpan={3} className="air-inputform-guidance-row">
                                                        <strong>Guidance:</strong> {getGuidanceText('privacyInformationCompliance', selectedValues.privacyInformationCompliance)}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={3} className="air-inputform-status-row">
                                                    <div className={`air-risks-risk-summary ${getCommunityRisksHighestRisk().cssClass}`}>
                                                        <strong>Community Risks Status: {getCommunityRisksHighestRisk().text}</strong>
                                                    </div>
                                                </td>
                                            </tr>
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
                                <table className="air-inputform-table">
                                    <tbody>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Using incomplete or inaccurate data</label></td>
                                            <td className="air-inputform-field-cell"><select name="fairnessRisksGeneral" className="air-inputform-select">
                                                <option value="">Select...</option>
                                                <option value="na">Very Low or N/A Risk</option>
                                                <option value="low">Low Risk</option>
                                                <option value="mid-range">Mid-Range Risk</option>
                                                <option value="high">High Risk</option>
                                                <option value="very-high">Very High Risk</option>
                                            </select></td>
                                            <td><textarea name="fairnessRisksGeneralDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Having poorly defined descriptions and indicators of “Fairness”</label></td>
                                            <td className="air-inputform-field-cell"><select name="fairnessRisksGeneral" className="air-inputform-select">
                                                <option value="">Select...</option>
                                                <option value="na">Very Low or N/A Risk</option>
                                                <option value="low">Low Risk</option>
                                                <option value="mid-range">Mid-Range Risk</option>
                                                <option value="high">High Risk</option>
                                                <option value="very-high">Very High Risk</option>
                                            </select></td>
                                            <td><textarea name="fairnessRisksGeneralDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Not ensuring ongoing monitoring of “Fairness indicators”</label></td>
                                            <td className="air-inputform-field-cell"><select name="fairnessRisksGeneral" className="air-inputform-select">
                                                <option value="">Select...</option>
                                                <option value="na">Very Low or N/A Risk</option>
                                                <option value="low">Low Risk</option>
                                                <option value="mid-range">Mid-Range Risk</option>
                                                <option value="high">High Risk</option>
                                                <option value="very-high">Very High Risk</option>
                                            </select></td>
                                            <td><textarea name="fairnessRisksGeneralDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Decisions to exclude outlier data</label></td>
                                            <td className="air-inputform-field-cell"><select name="fairnessRisksGeneral" className="air-inputform-select">
                                                <option value="">Select...</option>
                                                <option value="na">Very Low or N/A Risk</option>
                                                <option value="low">Low Risk</option>
                                                <option value="mid-range">Mid-Range Risk</option>
                                                <option value="high">High Risk</option>
                                                <option value="very-high">Very High Risk</option>
                                            </select></td>
                                            <td><textarea name="fairnessRisksGeneralDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Informal or inconsistent data cleansing and repair protocols and processes</label></td>
                                            <td className="air-inputform-field-cell"><select name="fairnessRisksGeneral" className="air-inputform-select">
                                                <option value="">Select...</option>
                                                <option value="na">Very Low or N/A Risk</option>
                                                <option value="low">Low Risk</option>
                                                <option value="mid-range">Mid-Range Risk</option>
                                                <option value="high">High Risk</option>
                                                <option value="very-high">Very High Risk</option>
                                            </select></td>
                                            <td><textarea name="fairnessRisksGeneralDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Using informal bias detection methods (best practice includes automated testing)</label></td>
                                            <td className="air-inputform-field-cell"><select name="fairnessRisksGeneral" className="air-inputform-select">
                                                <option value="">Select...</option>
                                                <option value="na">Very Low or N/A Risk</option>
                                                <option value="low">Low Risk</option>
                                                <option value="mid-range">Mid-Range Risk</option>
                                                <option value="high">High Risk</option>
                                                <option value="very-high">Very High Risk</option>
                                            </select></td>
                                            <td><textarea name="fairnessRisksGeneralDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">The likelihood that re-running scenarios could produce different results (reproducibility)</label></td>
                                            <td className="air-inputform-field-cell"><select name="fairnessRisksGeneral" className="air-inputform-select">
                                                <option value="">Select...</option>
                                                <option value="na">Very Low or N/A Risk</option>
                                                <option value="low">Low Risk</option>
                                                <option value="mid-range">Mid-Range Risk</option>
                                                <option value="high">High Risk</option>
                                                <option value="very-high">Very High Risk</option>
                                            </select></td>
                                            <td><textarea name="fairnessRisksGeneralDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Inadvertently creating new associations when linking data and/or metadata</label></td>
                                            <td className="air-inputform-field-cell"><select name="fairnessRisksGeneral" className="air-inputform-select">
                                                <option value="">Select...</option>
                                                <option value="na">Very Low or N/A Risk</option>
                                                <option value="low">Low Risk</option>
                                                <option value="mid-range">Mid-Range Risk</option>
                                                <option value="high">High Risk</option>
                                                <option value="very-high">Very High Risk</option>
                                            </select></td>
                                            <td><textarea name="fairnessRisksGeneralDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Differences in the data used for training compared to the data for intended use</label></td>
                                            <td className="air-inputform-field-cell"><select name="fairnessRisksGeneral" className="air-inputform-select">
                                                <option value="">Select...</option>
                                                <option value="na">Very Low or N/A Risk</option>
                                                <option value="low">Low Risk</option>
                                                <option value="mid-range">Mid-Range Risk</option>
                                                <option value="high">High Risk</option>
                                                <option value="very-high">Very High Risk</option>
                                            </select></td>
                                            <td><textarea name="fairnessRisksGeneralDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
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
                                            <td><textarea name="fairnessControlsDataSelectionDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.fairnessControlsDataSelection && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    <strong>Guidance:</strong> {getGuidanceText('fairnessControlsDataSelection', selectedValues.fairnessControlsDataSelection)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td colSpan={3}><em>Data quality: Data quality is often described in terms of minimum requirements for accuracy, timeliness, completeness, and consistency. Your AI system may be significantly impacted by poor quality data. It is important to understand how significant the impact is before relying on insights or decisions generated by the AI system. Absence of data may lead to unintended biases impacting insights generated by the AI system. Unbalanced data is a common problem when training AI systems (the situation where the distribution of classes or categories in the training dataset is not representative of the real-world scenario)</em></td>
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
                                            <td><textarea name="fairnessControlsDataAvailabilityDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.fairnessControlsDataAvailability && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    <strong>Guidance:</strong> {getGuidanceText('fairnessControlsDataAvailability', selectedValues.fairnessControlsDataAvailability)}
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
                                            <td><textarea name="fairnessControlsDataPopulationDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.fairnessControlsDataPopulation && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    <strong>Guidance:</strong> {getGuidanceText('fairnessControlsDataPopulation', selectedValues.fairnessControlsDataPopulation)}
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
                                            <td><textarea name="fairnessControlsDiversityInclusionDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.fairnessControlsDiversityInclusion && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    <strong>Guidance:</strong> {getGuidanceText('fairnessControlsDiversityInclusion', selectedValues.fairnessControlsDiversityInclusion)}
                                                </td>
                                            </tr>
                                        )}
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
                                            <td><textarea name="fairnessControlsGenderMinorityDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.fairnessControlsGenderMinority && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    <strong>Guidance:</strong> {getGuidanceText('fairnessControlsGenderMinority', selectedValues.fairnessControlsGenderMinority)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td colSpan={3}><em>Measuring AI system performance: At the scoping stage, you will need to make important choices about what you measure. You should measure: <br/>
                                                - Accuracy: how close an answer is to the correct value <br/>
                                                - Precision: how specific or detailed an answer is <br/>
                                                - Sensitivity: the measure of how many actually positive results are correctly identified as such <br/>
                                                - Specificity: the measure of how many actually negative results are correctly identified by the AI system  <br/>
                                                - Fairness objectives: whether the system is meeting the fairness objectives defined for the system (which could include for example that there aren't more prediction errors on some cohorts than others)</em></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Do you have appropriate performance measures and targets (including fairness ones) for your AI system, given the potential harms? Aspects of accuracy and precision are readily quantifiable for most systems which predict or classify outcomes. This performance can be absolute, or relative to existing systems. How would you characterise “Fairness” such as equity, respect, justice, in outcomes from an AI system? Which of these relate to, or are impacted by the use of AI?</label></td>
                                            <td className="air-inputform-field-cell"><select name="fairnessControlsPerformanceMeasures" className="air-inputform-select"
                                                value={selectedValues.fairnessControlsPerformanceMeasures || ''}
                                                onChange={handleSelectChange}>
                                                <option value="">Select...</option>
                                                <option value="yes">Yes</option> {/* Low Risk - Explain your answer */}
                                                <option value="no-elevated">No or unclear and elevated risk use</option> {/* Very High Risk - For elevated risk uses of AI, pause the project until you have established performance measures and targets. If your solution is operational - consult responsible officers for an appropriate equivalent action. */}
                                                <option value="no-nonelevated">No or unclear and non-elevated risk use</option> {/* Mid-range Risk - For non-elevated risk projects or systems, results should be treated as indicative and not relied on. Document your reasons. If your solution is operational - consult responsible officers for an appropriate equivalent action. */}
                                                <option value="na">N/A</option> {/* N/A - Document your reasons as to why this does not apply, then go to the next question. */}
                                            </select></td>
                                            <td><textarea name="fairnessControlsPerformanceMeasuresDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.fairnessControlsPerformanceMeasures && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    <strong>Guidance:</strong> {getGuidanceText('fairnessControlsPerformanceMeasures', selectedValues.fairnessControlsPerformanceMeasures)}
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
                                            <td><textarea name="fairnessControlsPerformanceCalibrationDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.fairnessControlsPerformanceCalibration && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    <strong>Guidance:</strong> {getGuidanceText('fairnessControlsPerformanceCalibration', selectedValues.fairnessControlsPerformanceCalibration)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td colSpan={3}><hr /></td>                                            
                                        </tr>
                                        <tr>
                                            <td colSpan={3}><em>Privacy and Security - Data Cohort Size</em></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Children</label></td>
                                            <td className="air-inputform-field-cell"><select name="fairnessControlsSensitiveChildren" className="air-inputform-select"
                                                value={selectedValues.fairnessControlsSensitiveChildren || ''}
                                                onChange={handleSelectChange}>
                                                <option value="">Select...</option>
                                                <option value="na">&gt; 50 or N/A</option> {/* Very Low Risk or N/A */}
                                                <option value="low">&gt; 20 and &lt; 50</option> {/* Low Risk */}
                                                <option value="mid-range">&gt; 10 and &lt; 20</option> {/* Mid-range Risk */}
                                                <option value="high">&gt; 5 and &lt; 10</option> {/* High Risk */}
                                                <option value="very-high">&lt; 5</option> {/* Very High Risk */}
                                            </select></td>
                                            <td><textarea name="fairnessControlsSensitiveChildrenDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.fairnessControlsSensitiveChildren && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    <strong>Guidance:</strong> {getGuidanceText('fairnessControlsSensitiveChildren', selectedValues.fairnessControlsSensitiveChildren)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Religious individuals</label></td>
                                            <td className="air-inputform-field-cell"><select name="fairnessControlsSensitiveReligious" className="air-inputform-select"
                                                value={selectedValues.fairnessControlsSensitiveReligious || ''}
                                                onChange={handleSelectChange}>
                                                <option value="">Select...</option>
                                                <option value="na">&gt; 50 or N/A</option> {/* Very Low Risk or N/A */}
                                                <option value="low">&gt; 20 and &lt; 50</option> {/* Low Risk */}
                                                <option value="mid-range">&gt; 10 and &lt; 20</option> {/* Mid-range Risk */}
                                                <option value="high">&gt; 5 and &lt; 10</option> {/* High Risk */}
                                                <option value="very-high">&lt; 5</option> {/* Very High Risk */}
                                            </select></td>
                                            <td><textarea name="fairnessControlsSensitiveReligiousDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.fairnessControlsSensitiveReligious && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    <strong>Guidance:</strong> {getGuidanceText('fairnessControlsSensitiveReligious', selectedValues.fairnessControlsSensitiveReligious)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Racially or ethnically diverse individuals</label></td>
                                            <td className="air-inputform-field-cell"><select name="fairnessControlsSensitiveRacial" className="air-inputform-select"
                                                value={selectedValues.fairnessControlsSensitiveRacial || ''}
                                                onChange={handleSelectChange}>
                                                <option value="">Select...</option>
                                                <option value="na">&gt; 50 or N/A</option> {/* Very Low Risk or N/A */}
                                                <option value="low">&gt; 20 and &lt; 50</option> {/* Low Risk */}
                                                <option value="mid-range">&gt; 10 and &lt; 20</option> {/* Mid-range Risk */}
                                                <option value="high">&gt; 5 and &lt; 10</option> {/* High Risk */}
                                                <option value="very-high">&lt; 5</option> {/* Very High Risk */}
                                            </select></td>
                                            <td><textarea name="fairnessControlsSensitiveRacialDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.fairnessControlsSensitiveRacial && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    <strong>Guidance:</strong> {getGuidanceText('fairnessControlsSensitiveRacial', selectedValues.fairnessControlsSensitiveRacial)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Individuals with political opinions or associations</label></td>
                                            <td className="air-inputform-field-cell"><select name="fairnessControlsSensitivePolitical" className="air-inputform-select"
                                                value={selectedValues.fairnessControlsSensitivePolitical || ''}
                                                onChange={handleSelectChange}>
                                                <option value="">Select...</option>
                                                <option value="na">&gt; 50 or N/A</option> {/* Very Low Risk or N/A */}
                                                <option value="low">&gt; 20 and &lt; 50</option> {/* Low Risk */}
                                                <option value="mid-range">&gt; 10 and &lt; 20</option> {/* Mid-range Risk */}
                                                <option value="high">&gt; 5 and &lt; 10</option> {/* High Risk */}
                                                <option value="very-high">&lt; 5</option> {/* Very High Risk */}
                                            </select></td>
                                            <td><textarea name="fairnessControlsSensitivePoliticalDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.fairnessControlsSensitivePolitical && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    <strong>Guidance:</strong> {getGuidanceText('fairnessControlsSensitivePolitical', selectedValues.fairnessControlsSensitivePolitical)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Individuals with trade union membership or associations</label></td>
                                            <td className="air-inputform-field-cell"><select name="fairnessControlsSensitiveUnion" className="air-inputform-select"
                                                value={selectedValues.fairnessControlsSensitiveUnion || ''}
                                                onChange={handleSelectChange}>
                                                <option value="">Select...</option>
                                                <option value="na">&gt; 50 or N/A</option> {/* Very Low Risk or N/A */}
                                                <option value="low">&gt; 20 and &lt; 50</option> {/* Low Risk */}
                                                <option value="mid-range">&gt; 10 and &lt; 20</option> {/* Mid-range Risk */}
                                                <option value="high">&gt; 5 and &lt; 10</option> {/* High Risk */}
                                                <option value="very-high">&lt; 5</option> {/* Very High Risk */}
                                            </select></td>
                                            <td><textarea name="fairnessControlsSensitiveUnionDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.fairnessControlsSensitiveUnion && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    <strong>Guidance:</strong> {getGuidanceText('fairnessControlsSensitiveUnion', selectedValues.fairnessControlsSensitiveUnion)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Individuals with gender and/or sexual diversity</label></td>
                                            <td className="air-inputform-field-cell"><select name="fairnessControlsSensitiveGender" className="air-inputform-select"
                                                value={selectedValues.fairnessControlsSensitiveGender || ''}
                                                onChange={handleSelectChange}>
                                                <option value="">Select...</option>
                                                <option value="na">&gt; 50 or N/A</option> {/* Very Low Risk or N/A */}
                                                <option value="low">&gt; 20 and &lt; 50</option> {/* Low Risk */}
                                                <option value="mid-range">&gt; 10 and &lt; 20</option> {/* Mid-range Risk */}
                                                <option value="high">&gt; 5 and &lt; 10</option> {/* High Risk */}
                                                <option value="very-high">&lt; 5</option> {/* Very High Risk */}
                                            </select></td>
                                            <td><textarea name="fairnessControlsSensitiveGenderDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.fairnessControlsSensitiveGender && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    <strong>Guidance:</strong> {getGuidanceText('fairnessControlsSensitiveGender', selectedValues.fairnessControlsSensitiveGender)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Individuals with a criminal record</label></td>
                                            <td className="air-inputform-field-cell"><select name="fairnessControlsSensitiveCriminalRecord" className="air-inputform-select"
                                                value={selectedValues.fairnessControlsSensitiveCriminalRecord || ''}
                                                onChange={handleSelectChange}>
                                                <option value="">Select...</option>
                                                <option value="na">&gt; 50 or N/A</option> {/* Very Low Risk or N/A */}
                                                <option value="low">&gt; 20 and &lt; 50</option> {/* Low Risk */}
                                                <option value="mid-range">&gt; 10 and &lt; 20</option> {/* Mid-range Risk */}
                                                <option value="high">&gt; 5 and &lt; 10</option> {/* High Risk */}
                                                <option value="very-high">&lt; 5</option> {/* Very High Risk */}
                                            </select></td>
                                            <td><textarea name="fairnessControlsSensitiveCriminalRecordDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.fairnessControlsSensitiveCriminalRecord && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    <strong>Guidance:</strong> {getGuidanceText('fairnessControlsSensitiveCriminalRecord', selectedValues.fairnessControlsSensitiveCriminalRecord)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Specific health or genetic information</label></td>
                                            <td className="air-inputform-field-cell"><select name="fairnessControlsSensitiveHealth" className="air-inputform-select"
                                                value={selectedValues.fairnessControlsSensitiveHealth || ''}
                                                onChange={handleSelectChange}>
                                                <option value="">Select...</option>
                                                <option value="na">&gt; 50 or N/A</option> {/* Very Low Risk or N/A */}
                                                <option value="low">&gt; 20 and &lt; 50</option> {/* Low Risk */}
                                                <option value="mid-range">&gt; 10 and &lt; 20</option> {/* Mid-range Risk */}
                                                <option value="high">&gt; 5 and &lt; 10</option> {/* High Risk */}
                                                <option value="very-high">&lt; 5</option> {/* Very High Risk */}
                                            </select></td>
                                            <td><textarea name="fairnessControlsSensitiveHealthDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.fairnessControlsSensitiveHealth && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    <strong>Guidance:</strong> {getGuidanceText('fairnessControlsSensitiveHealth', selectedValues.fairnessControlsSensitiveHealth)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Personal biometric information</label></td>
                                            <td className="air-inputform-field-cell"><select name="fairnessControlsSensitiveBiometric" className="air-inputform-select" value={selectedValues.fairnessControlsSensitiveBiometric || ""} onChange={handleSelectChange}>
                                                <option value="">Select...</option>
                                                <option value="na">&gt; 50 or N/A</option> {/* Very Low Risk or N/A */}
                                                <option value="low">&gt; 20 and &lt; 50</option> {/* Low Risk */}
                                                <option value="mid-range">&gt; 10 and &lt; 20</option> {/* Mid-range Risk */}
                                                <option value="high">&gt; 5 and &lt; 10</option> {/* High Risk */}
                                                <option value="very-high">&lt; 5</option> {/* Very High Risk */}
                                            </select></td>
                                            <td><textarea name="fairnessControlsSensitiveBiometricDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.fairnessControlsSensitiveBiometric && (
                                            <tr>
                                                <td className="air-inputform-guidance-row">
                                                    📋 <strong>Guidance:</strong> {getGuidanceText('fairnessControlsSensitiveBiometric', selectedValues.fairnessControlsSensitiveBiometric)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Other sensitive person-centred data</label></td>
                                            <td className="air-inputform-field-cell"><select name="fairnessControlsSensitiveOtherData" className="air-inputform-select" value={selectedValues.fairnessControlsSensitiveOtherData || ""} onChange={handleSelectChange}>
                                                <option value="">Select...</option>
                                                <option value="na">&gt; 50 or N/A</option> {/* Very Low Risk or N/A */}
                                                <option value="low">&gt; 20 and &lt; 50</option> {/* Low Risk */}
                                                <option value="mid-range">&gt; 10 and &lt; 20</option> {/* Mid-range Risk */}
                                                <option value="high">&gt; 5 and &lt; 10</option> {/* High Risk */}
                                                <option value="very-high">&lt; 5</option> {/* Very High Risk */}
                                            </select></td>
                                            <td><textarea name="fairnessControlsSensitiveOtherDataDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.fairnessControlsSensitiveOtherData && (
                                            <tr>
                                                <td className="air-inputform-guidance-row">
                                                    📋 <strong>Guidance:</strong> {getGuidanceText('fairnessControlsSensitiveOtherData', selectedValues.fairnessControlsSensitiveOtherData)}
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
                                            <td className="air-inputform-field-cell"><select name="privacyByDesign" className="air-inputform-select" value={selectedValues.privacyByDesign || ""} onChange={handleSelectChange}>
                                                <option value="">Select...</option>
                                                <option value="na">Yes</option> {/* Low Risk - Document any points to resolve, then go to next question. Consider contacting the information and privacy commissioner or Cyber NSW for any points not resolved */}
                                                <option value="low">Partially</option> {/* High Risk - Pause the project, apply the principles before proceeding, document any points to resolve below then go to next question. Consider contacting the information and privacy commissioner or Cyber NSW for any points not resolved. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                <option value="high">No or unclear</option> {/* Very High Risk - Pause the project, apply the principles before proceeding, document any points to resolve below then go to next question. Consider contacting the information and privacy commissioner or Cyber NSW for any points not resolved. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                            </select></td>
                                            <td><textarea name="privacyByDesignDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.privacyByDesign && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
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
                                                <option value="low">Yes</option> {/* Low Risk - Document the result, then go to the next question */}
                                                <option value="very-high">No</option> {/* Very High Risk - Pause the project until you have completed a privacy impact assessment. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                <option value="na">N/A</option> {/* N/A - Your system doesn't use or generate any sensitive information, confirmed with responsible officers, document below this confirmation */}
                                            </select></td>
                                            <td><textarea name="privacyImpactAssessmentDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.privacyImpactAssessment && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    <strong>Guidance:</strong> {getGuidanceText('privacyImpactAssessment', selectedValues.privacyImpactAssessment)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td colSpan={3}><em>Exceptions: You can ask the Privacy Commissioner to make a Public Interest Direction (PID) to waive the requirement to comply with an Information Protection Principle. These are only granted in circumstances where there are compelling public interests. For AI systems intended to operate under legislation which allows use of Personally Identifiable Information, the public benefits must be clear before proceeding to pilot phase.<br />
                                            Governing use of Personally Identifiable Information: You must apply higher governance standards if you are managing Personally Identifiable Information.
                                            </em></td>
                                        </tr>
                                            <tr>
                                                <td className="air-inputform-field-cell-label"><label className="air-inputform-label">If you are using information about individuals who are reasonably identifiable, have you sought consent from citizens about using their data for this particular purpose?</label></td>
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
                                            <td><textarea name="privacyControlsConsentNotes" className="air-inputform-textarea" placeholder="Document your reasons here..."></textarea></td>
                                        </tr>
                                        {selectedValues.privacyControlsConsent && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    <strong>Guidance:</strong> {getGuidanceText('privacyControlsConsent', selectedValues.privacyControlsConsent)}
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
                                            <td><textarea name="privacyControlsCyberSecurityDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.privacyControlsCyberSecurity && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    <strong>Guidance:</strong> {getGuidanceText('privacyControlsCyberSecurity', selectedValues.privacyControlsCyberSecurity)}
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
                                            <td><textarea name="privacyControlsSensitiveDataDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.privacyControlsSensitiveData && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    <strong>Guidance:</strong> {getGuidanceText('privacyControlsSensitiveData', selectedValues.privacyControlsSensitiveData)}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </fieldset>
                        </td>
                    </tr>
                    {/* Transparency */}
                    <tr>
                        <td colSpan={3}>
                            <fieldset className="air-inputform-fieldset air-inputform-fieldset-transparency">
                                <legend className="air-inputform-legend air-inputform-legend-transparency">Transparency</legend>
                                <table className="air-inputform-table">
                                    <tbody>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Incomplete documentation of AI system design, or implementation, or operation</label></td>
                                            <td className="air-inputform-field-cell"><select name="transparencyPurpose" className="air-inputform-select">
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="low">Low</option>
                                                <option value="mid-range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very-high">Very High</option>
                                            </select></td>
                                            <td><textarea name="transparencyPurposeDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">No or limited access to model's internal workings or source code (“Black Box”)</label></td>
                                            <td className="air-inputform-field-cell"><select name="transparencyDataSources" className="air-inputform-select">
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="low">Low</option>
                                                <option value="mid-range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very-high">Very High</option>
                                            </select></td>
                                            <td><textarea name="transparencyDataSourcesDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Being unable to explain the output of a complex model</label></td>
                                            <td className="air-inputform-field-cell"><select name="transparencyDataUsage" className="air-inputform-select">
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="low">Low</option>
                                                <option value="mid-range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very-high">Very High</option>
                                            </select></td>
                                            <td><textarea name="transparencyDataUsageDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">A member of the public being unaware that they are interacting with an AI system</label></td>
                                            <td className="air-inputform-field-cell"><select name="transparencyPublicAwareness" className="air-inputform-select">
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="low">Low</option>
                                                <option value="mid-range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very-high">Very High</option>
                                            </select></td>
                                            <td><textarea name="transparencyPublicAwarenessDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">No or low ability to incorporate user feedback into an AI system or model</label></td>
                                            <td className="air-inputform-field-cell"><select name="transparencyUserFeedback" className="air-inputform-select">
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="low">Low</option>
                                                <option value="mid-range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very-high">Very High</option>
                                            </select></td>
                                            <td><textarea name="transparencyUserFeedbackDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">The inability to audit past decisions, where input from AI systems was used.</label></td>
                                            <td className="air-inputform-field-cell"><select name="transparencyAuditability" className="air-inputform-select">
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="low">Low</option>
                                                <option value="mid-range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very-high">Very High</option>
                                            </select></td>
                                            <td><textarea name="transparencyAuditabilityDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
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
                                            <td><textarea name="transparencyConsultationDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.transparencyConsultation && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
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
                                            <td><textarea name="transparencyScopeGoalsDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.transparencyScopeGoals && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
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
                                            <td><textarea name="transparencyRightToAppealDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.transparencyRightToAppeal && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
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
                                            <td><textarea name="transparencyClearExplanationsDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.transparencyClearExplanations && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    📋 <strong>Guidance:</strong> {getGuidanceText('transparencyClearExplanations', selectedValues.transparencyClearExplanations)}
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
                                <table>
                                    <tbody>
                                        <tr>
                                            <td colSpan={3}><em>The skill and training for AI system operators is crucial. Automated systems pose the risk of over-reliance. Operators, including those exercising judgement over insights or alerts, must be well-trained. This includes the ability to critically evaluate insights and understand system limitations. Users must have confidence in their ability to identify, report, and resolve ethical concerns arising from AI-generated insights or decisions, or empower Responsible Officers to make decisions. Ensure consideration is given to training staff delivering customer-facing services on how respond to inquiries from customers when AI is utilised, including guidance on who to direct such inquiries to.</em></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Insufficient training of AI system operators</label></td>
                                            <td className="air-inputform-field-cell"><select name="accountabilityFramework" className="air-inputform-select">
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="low">Low</option>
                                                <option value="mid-range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very-high">Very High</option>
                                            </select></td>
                                            <td><textarea name="accountabilityFrameworkDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Insufficient awareness of system limitations of Responsible Officers</label></td>
                                            <td className="air-inputform-field-cell"><select name="accountabilityFramework" className="air-inputform-select">
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="low">Low</option>
                                                <option value="mid-range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very-high">Very High</option>
                                            </select></td>
                                            <td><textarea name="accountabilityFrameworkDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">No or low documentation of performance targets or “Fairness” principles trade-offs</label></td>
                                            <td className="air-inputform-field-cell"><select name="accountabilityFramework" className="air-inputform-select">
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="low">Low</option>
                                                <option value="mid-range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very-high">Very High</option>
                                            </select></td>
                                            <td><textarea name="accountabilityFrameworkDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">No or limited mechanisms to record insight / AI System decision history</label></td>
                                            <td className="air-inputform-field-cell"><select name="accountabilityFramework" className="air-inputform-select">
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="low">Low</option>
                                                <option value="mid-range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very-high">Very High</option>
                                            </select></td>
                                            <td><textarea name="accountabilityFrameworkDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">The inability of third parties to accurately audit AI system insights / decisions</label></td>
                                            <td className="air-inputform-field-cell"><select name="accountabilityFramework" className="air-inputform-select">
                                                <option value="">Select...</option>
                                                <option value="na">N/A</option>
                                                <option value="low">Low</option>
                                                <option value="mid-range">Mid-range</option>
                                                <option value="high">High</option>
                                                <option value="very-high">Very High</option>
                                            </select></td>
                                            <td><textarea name="accountabilityFrameworkDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={3}><hr /></td>                                        
                                        </tr>
                                        <tr>
                                            <td colSpan={3}><em>Responsible Officers: This assessment is to be completed by or, the result confirmed with, the Responsible Officers. The Responsible Officer should be appropriately senior, skilled and qualified for the role.</em></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={3}><em>Have you established who is responsible for:</em></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Use of the AI outputs, insights and decisions?</label></td>
                                            <td className="air-inputform-field-cell"><select name="accountabilityResponsibleUse" className="air-inputform-select" value={selectedValues.accountabilityResponsibleUse || ""} onChange={handleSelectChange}>
                                                <option value="">Select...</option>
                                                <option value="na">Yes</option> {/* Low Risk - Document who is responsible to each point within the question */}
                                                <option value="low">No or unclear</option> {/* Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                            </select></td>
                                            <td><textarea name="accountabilityFrameworkDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.accountabilityResponsibleUse && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    📋 <strong>Guidance:</strong> {getGuidanceText('accountabilityResponsibleUse', selectedValues.accountabilityResponsibleUse)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Policy/outcomes associated with the AI system?</label></td>
                                            <td className="air-inputform-field-cell"><select name="accountabilityResponsiblePolicy" className="air-inputform-select" value={selectedValues.accountabilityResponsiblePolicy || ""} onChange={handleSelectChange}>
                                                <option value="">Select...</option>
                                                <option value="na">Yes</option> {/* Low Risk - Document who is responsible to each point within the question */}
                                                <option value="low">No or unclear</option> {/* Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                            </select></td>
                                            <td><textarea name="accountabilityFrameworkDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.accountabilityResponsiblePolicy && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    📋 <strong>Guidance:</strong> {getGuidanceText('accountabilityResponsiblePolicy', selectedValues.accountabilityResponsiblePolicy)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Monitoring the performance of the AI system?</label></td>
                                            <td className="air-inputform-field-cell"><select name="accountabilityResponsibleMonitoring" className="air-inputform-select" value={selectedValues.accountabilityResponsibleMonitoring || ""} onChange={handleSelectChange}>
                                                <option value="">Select...</option>
                                                <option value="na">Yes</option> {/* Low Risk - Document who is responsible to each point within the question */}
                                                <option value="low">No or unclear</option> {/* Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                            </select></td>
                                            <td><textarea name="accountabilityFrameworkDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.accountabilityResponsibleMonitoring && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    📋 <strong>Guidance:</strong> {getGuidanceText('accountabilityResponsibleMonitoring', selectedValues.accountabilityResponsibleMonitoring)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Data governance?</label></td>
                                            <td className="air-inputform-field-cell"><select name="accountabilityResponsibleDataGovernance" className="air-inputform-select" value={selectedValues.accountabilityResponsibleDataGovernance || ""} onChange={handleSelectChange}>
                                                <option value="">Select...</option>
                                                <option value="na">Yes</option> {/* Low Risk - Document who is responsible to each point within the question */}
                                                <option value="low">No or unclear</option> {/* Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                            </select></td>
                                            <td><textarea name="accountabilityFrameworkDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.accountabilityResponsibleDataGovernance && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    📋 <strong>Guidance:</strong> {getGuidanceText('accountabilityResponsibleDataGovernance', selectedValues.accountabilityResponsibleDataGovernance)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Technical solution governance?</label></td>
                                            <td className="air-inputform-field-cell"><select name="accountabilityResponsibleTechnicalGovernance" className="air-inputform-select" value={selectedValues.accountabilityResponsibleTechnicalGovernance || ""} onChange={handleSelectChange}>
                                                <option value="">Select...</option>
                                                <option value="na">Yes</option> {/* Low Risk - Document who is responsible to each point within the question */}
                                                <option value="low">No or unclear</option> {/* Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                            </select></td>
                                            <td><textarea name="accountabilityFrameworkDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.accountabilityResponsibleTechnicalGovernance && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    📋 <strong>Guidance:</strong> {getGuidanceText('accountabilityResponsibleTechnicalGovernance', selectedValues.accountabilityResponsibleTechnicalGovernance)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Appeal and redress processes?</label></td>
                                            <td className="air-inputform-field-cell"><select name="accountabilityResponsibleAppealRedress" className="air-inputform-select" value={selectedValues.accountabilityResponsibleAppealRedress || ""} onChange={handleSelectChange}>
                                                <option value="">Select...</option>
                                                <option value="na">Yes</option> {/* Low Risk - Document who is responsible to each point within the question */}
                                                <option value="low">No or unclear</option> {/* Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                            </select></td>
                                            <td><textarea name="accountabilityFrameworkDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.accountabilityResponsibleAppealRedress && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
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
                                            <td colSpan={3}><em>Have you established a clear process to:</em></td>
                                        </tr>
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Intervene if a relevant stakeholder finds concerns with insights, decisions or content generated (appeal and redress)?</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="interventionProcess" className="air-inputform-select" value={selectedValues.interventionProcess || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option> {/* Low Risk - Document the details, then go to next question */}
                                                    <option value="no">No</option> {/* Very High Risk - Pause your project, consult with relevant stakeholders and establish appropriate processes. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                    <option value="na">N/A</option> {/* N/A - Document your reasons as to why this does not apply, then go to next question */}
                                                </select>
                                            </td>
                                            <td><textarea name="interventionProcessDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.interventionProcess && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    📋 <strong>Guidance:</strong> {getGuidanceText('interventionProcess', selectedValues.interventionProcess)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Ensure you do not get overconfident or over reliant on the AI system?</label></td>
                                            <td className="air-inputform-field-cell">
                                                <select name="overconfidenceProcess" className="air-inputform-select" value={selectedValues.overconfidenceProcess || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option> {/* Low Risk - Document the details, then go to next question */}
                                                    <option value="no">No</option> {/* Very High Risk - Pause your project, consult with relevant stakeholders and establish appropriate processes. If your solution is operational - consult responsible officers for an appropriate equivalent action */}
                                                    <option value="na">N/A</option> {/* N/A - Document your reasons as to why this does not apply, then go to next question */}
                                                </select>
                                            </td>
                                            <td><textarea name="overconfidenceProcessDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.overconfidenceProcess && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    📋 <strong>Guidance:</strong> {getGuidanceText('overconfidenceProcess', selectedValues.overconfidenceProcess)}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </fieldset>
                        </td>
                    </tr>
                    {/* Risk Mitigation */}
                    <tr>
                        <td colSpan={3}>
                            <fieldset className="air-inputform-fieldset air-inputform-fieldset-mitigation">
                                <legend className="air-inputform-legend air-inputform-legend-mitigation">Risk Mitigation</legend>
                                <table className="air-inputform-table">
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
                                                <option value="yes-high">Yes, I have a high or very high risk residual risk</option> {/* Very High Risk - Don't proceed without legal advice. If the pilot proceeds, pilot first with ongoing controls and monitoring. A formal review should be conducted after pilot phase. Conduct an independent risk audit, and your self-assessment needs to be reviewed by the NSW AI Review Committee. If your solution is operational - consult responsible officers for an appropriate equivalent action. */}
                                                <option value="yes-mid">Yes, I have mid-range residual risks</option> {/* Mid-range Risk - Don't proceed without legal advice. If the project proceeds, pilot first with ongoing controls and monitoring, consider a review by the NSW AI Review Committee and conduct an independent risk audit. If your solution is operational - consult responsible officers for an appropriate equivalent action. */}
                                                <option value="no-low">No, I have low residual risks</option> {/* Low Risk - If the project proceeds, pilot first with ongoing controls and monitoring. If your solution is operational - consult responsible officers for an appropriate equivalent action. */}
                                                <option value="no-very-low">No, I have very low or N/A residual risk</option> {/* Very Low Risk - Proceed with appropriate controls and monitoring. */}
                                            </select></td>
                                            <td><textarea name="elevatedRiskDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.elevatedRisk && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    📋 <strong>Guidance:</strong> {getGuidanceText('elevatedRisk', selectedValues.elevatedRisk)}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </fieldset>
                        </td>
                    </tr>
                    {/* Procurement */}
                    <tr>
                        <td colSpan={3}>
                            <fieldset className="air-inputform-fieldset air-inputform-fieldset-procurement">
                                <legend className="air-inputform-legend air-inputform-legend-procurement">Procurement</legend>
                                <table className="air-inputform-table">
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
                                            <td><textarea name="procurementControlsDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.procurementControls && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
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
                                            <td><textarea name="procurementContractualClausesDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.procurementContractualClauses && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
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
                                            <td><textarea name="procurementSupplierQuestionsDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.procurementSupplierQuestions && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    📋 <strong>Guidance:</strong> {getGuidanceText('procurementSupplierQuestions', selectedValues.procurementSupplierQuestions)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Are there any residual risk factors with a level above “Low”? Response: If your answer is “unclear”, please provide further details.</label></td>
                                            <td className="air-inputform-field-cell-value">
                                                <select name="procurementResidualRiskFactors" className="air-inputform-select" value={selectedValues.procurementResidualRiskFactors || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option> {/* High Risk - You must use the ICTA contract if you proceed */}
                                                    <option value="no">No</option> {/* Low Risk - You may use Core& or ICTA */}
                                                    <option value="unclear">Unclear</option> {/* High Risk - Pause the project and consult with either your legal team, responsible officers and risk teams before proceeding */}
                                                </select>
                                            </td>
                                            <td><textarea name="procurementResidualRiskFactorsDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.procurementResidualRiskFactors && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
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
                                            <td><textarea name="procurementSystemRequirementsDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.procurementSystemRequirements && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    📋 <strong>Guidance:</strong> {getGuidanceText('procurementSystemRequirements', selectedValues.procurementSystemRequirements)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="air-inputform-field-cell-label"><label className="air-inputform-label">Do all risks have appropriate treatments, including the order in which the treatments are applied? Review the set of treatments and the accompanying residual risk to confirm that all risks are appropriately mitigated or controlled.</label></td>
                                            <td className="air-inputform-field-cell-value">
                                                <select name="procurementRiskTreatments" className="air-inputform-select" value={selectedValues.procurementRiskTreatments || ""} onChange={handleSelectChange}>
                                                    <option value="">Select...</option>
                                                    <option value="yes">Yes</option> {/* Low Risk - Document below the treatments and the order in which they are applied */}
                                                    <option value="no">No</option> {/* Very High Risk - Pause the project and consult with the appropriate subject matter experts to determine the risk treatment status */}
                                                    <option value="unclear">Unclear</option> {/* Very High Risk - Pause the project and consult with the responsible officers and your risk team to determine the risk treatment status */}
                                                </select>
                                            </td>
                                            <td><textarea name="procurementRiskTreatmentsDetails" className="air-inputform-textarea" placeholder="Provide details..."></textarea></td>
                                        </tr>
                                        {selectedValues.procurementRiskTreatments && (
                                            <tr>
                                                <td colSpan={3} className="air-inputform-guidance-row">
                                                    📋 <strong>Guidance:</strong> {getGuidanceText('procurementRiskTreatments', selectedValues.procurementRiskTreatments)}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </fieldset>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </details>
  );
};

export default AIRiskInputForm;

