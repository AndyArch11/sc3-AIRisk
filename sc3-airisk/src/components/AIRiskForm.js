import React, { useState, useCallback, useRef, useEffect } from "react";
import "./AIRisk.css"
import AIRiskIntro from "./AIRiskIntro";
import AIRiskInputForm from "./AIRiskInputForm";
import AIRiskTable from "./AIRiskTable";
import AIRiskReport from "./AIRiskReport";

const VERSION = "v0.1.4"; // Update as needed

// ========== CENTRALIZED RISK LEVEL MAPPING UTILITY ==========
export const RiskLevelUtils = {
  // Standard risk levels with both underscore and hyphen variants
  standardRiskLevels: {
    'very_high': 6,
    'very-high': 6,
    'veryhigh': 6,
    'high': 5,
    'mid_range': 4,
    'mid-range': 4,
    'midrange': 4,
    'low': 3,
    'very_low': 2,
    'very-low': 2,
    'verylow': 2,
    'na': 1,
    'n/a': 1,
    '': 0
  },

  // Special field mappings for yes/no/unclear/partial values
  specialFieldMappings: {
    // Community Harms - Reversible
    'communityHarmsReversibleConfidenceLevel': {
      'unclear': 5,           // High risk
      'yes-high': 5,          // High risk
      'yes-low': 3,           // Low risk
      'no': 3                 // Low risk
    },
    
    // Community Harms - Irreversible
    'communityHarmsIrreversibleConfidenceLevel': {
      'yes-veryhigh': 6,      // Very High risk
      'unclear-veryhigh': 6,  // Very High risk
      'yes-high': 5,          // High risk
      'no': 3                 // Low risk
    },
    
    // Community Harms - Secondary/Cumulative
    'communityHarmsSecondaryCumulativeConfidenceLevel': {
      'unclear-veryhigh': 6,  // Very High risk
      'yes-high': 6,          // Very High risk
      'yes-low': 3,           // Low risk
      'no': 3                 // Low risk
    },

    // Fairness Controls - Special mappings
    'fairnessControlsDataSelection': {
      'no': 6,                // Very High Risk
      'no-but-better': 5,     // High Risk
      'unclear': 6,           // Very High Risk
      'yes': 3                // Low Risk
    },
    
    'fairnessControlsDataAvailability': {
      'no': 6,                // Very High Risk
      'unclear': 6,           // Very High Risk
      'partially-but-better': 5, // High Risk
      'yes': 3                // Low Risk
    },
    
    'fairnessControlsDataPopulation': {
      'na': 1,                // N/A
      'no-or-unclear': 6,     // Very High Risk
      'partially-but-better': 5, // High Risk
      'yes': 3                // Low Risk
    },
    
    'fairnessControlsDiversityInclusion': {
      'na': 1,                // N/A
      'no-or-unclear': 6,     // Very High Risk
      'partially-but-better': 5, // High Risk
      'yes': 3                // Low Risk
    },
    
    'fairnessControlsGenderMinority': {
      'na': 1,                // N/A
      'no-or-unclear': 6,     // Very High Risk
      'partially-but-better': 5, // High Risk
      'yes': 3                // Low Risk
    },
    
    'fairnessControlsPerformanceMeasures': {
      'na': 1,                // N/A
      'no-elevated': 6,       // Very High Risk
      'no-nonelevated': 4,    // Mid-range Risk
      'yes': 3                // Low Risk
    },
    
    'fairnessControlsPerformanceCalibration': {
      'na': 1,                // N/A
      'no-elevated': 6,       // Very High Risk
      'no-nonelevated': 4,    // Mid-range Risk
      'yes': 3                // Low Risk
    },

    // Risk Mitigation - Elevated Risk (Residual Risk Assessment)
    'elevatedRisk': {
      'yes-high': 6,          // Very High Risk - High/Very High residual risk
      'yes-mid': 4,           // Mid-range Risk - Mid-range residual risk
      'no-low': 3,            // Low Risk - Low residual risk
      'no-very-low': 2        // Very Low Risk - Very low/N/A residual risk
    },

    // Community Benefits - BENEFIT LEVEL MAPPING (separate from risk assessment)
    // This measures benefit levels, not risk levels - stands apart from risk mappings
    'communityBenefitsQuality': {
      'very-high': 'very-high',   // Very High benefit
      'high': 'high',             // High benefit  
      'mid-range': 'mid-range',   // Mid-range benefit
      'low': 'low',               // Low benefit
      'very-low': 'very-low',     // Very Low benefit
      'na': 'na',                 // N/A
      '': ''                      // Not set
    },
    'communityBenefitsProcessing': {
      'very-high': 'very-high',   // Very High benefit
      'high': 'high',             // High benefit  
      'mid-range': 'mid-range',   // Mid-range benefit
      'low': 'low',               // Low benefit
      'very-low': 'very-low',     // Very Low benefit
      'na': 'na',                 // N/A
      '': ''                      // Not set
    },
    'communityBenefitsFinancial': {
      'very-high': 'very-high',   // Very High benefit
      'high': 'high',             // High benefit  
      'mid-range': 'mid-range',   // Mid-range benefit
      'low': 'low',               // Low benefit
      'very-low': 'very-low',     // Very Low benefit
      'na': 'na',                 // N/A
      '': ''                      // Not set
    },
    'communityBenefitsAdaptable': {
      'very-high': 'very-high',   // Very High benefit
      'high': 'high',             // High benefit  
      'mid-range': 'mid-range',   // Mid-range benefit
      'low': 'low',               // Low benefit
      'very-low': 'very-low',     // Very Low benefit
      'na': 'na',                 // N/A
      '': ''                      // Not set
    },
    'communityBenefitsNewService': {
      'very-high': 'very-high',   // Very High benefit
      'high': 'high',             // High benefit  
      'mid-range': 'mid-range',   // Mid-range benefit
      'low': 'low',               // Low benefit
      'very-low': 'very-low',     // Very Low benefit
      'na': 'na',                 // N/A
      '': ''                      // Not set
    },
    'communityBenefitsInnovation': {
      'very-high': 'very-high',   // Very High benefit
      'high': 'high',             // High benefit  
      'mid-range': 'mid-range',   // Mid-range benefit
      'low': 'low',               // Low benefit
      'very-low': 'very-low',     // Very Low benefit
      'na': 'na',                 // N/A
      '': ''                      // Not set
    },

    // General yes/no/unclear mappings for other fields
    'general': {
      'yes': 5,               // High risk
      'yes-high': 5,          // High risk
      'yes-low': 3,           // Low risk
      'yes-veryhigh': 6,      // Very High risk
      'no': 3,                // Low risk
      'unclear': 5,           // High risk
      'unclear-veryhigh': 6,  // Very High risk
      'partial': 4            // Mid-range risk
    }
  },

  // Reverse mapping for display
  reverseLevels: {
    6: { text: 'Very High', cssClass: 'very-high' },
    5: { text: 'High', cssClass: 'high' },
    4: { text: 'Mid-range', cssClass: 'mid-range' },
    3: { text: 'Low', cssClass: 'low' },
    2: { text: 'Very Low', cssClass: 'very-low' },
    1: { text: 'N/A', cssClass: 'na' },
    0: { text: 'Not Set', cssClass: 'not-set' }
  },

  // Get risk level for any field value
  getRiskLevel: function(fieldName, value) {
    if (!value || value === '') return 0;
    
    // Community Benefits fields don't have risk levels - they have benefit levels
    if (fieldName.startsWith('communityBenefits') && !fieldName.includes('Details')) {
      return 0; // Don't count as risk assessment
    }
    
    // Normalize value
    const normalizedValue = value.toString().toLowerCase().trim();
    
    // Check if this field has special mappings
    if (this.specialFieldMappings[fieldName]) {
      const level = this.specialFieldMappings[fieldName][normalizedValue];
      if (level !== undefined) return level;
    }
    
    // Check general special mappings (yes/no/unclear/partial)
    if (this.specialFieldMappings.general[normalizedValue] !== undefined) {
      return this.specialFieldMappings.general[normalizedValue];
    }
    
    // Check standard risk levels
    if (this.standardRiskLevels[normalizedValue] !== undefined) {
      return this.standardRiskLevels[normalizedValue];
    }
    
    // Default to 0 if no mapping found
    return 0;
  },

  // Get benefit level for Community Benefits fields
  getBenefitLevel: function(fieldName, value) {
    if (!value || value === '') return '';
    
    // Only process Community Benefits fields
    if (!fieldName.startsWith('communityBenefits') || fieldName.includes('Details')) {
      return '';
    }
    
    // Normalize value
    const normalizedValue = value.toString().toLowerCase().trim();
    
    // Check if this field has benefit mappings
    if (this.specialFieldMappings[fieldName]) {
      const level = this.specialFieldMappings[fieldName][normalizedValue];
      if (level !== undefined) return level;
    }
    
    return normalizedValue;
  },

  // Get display text for benefit level
  getBenefitLevelText: function(level) {
    const benefitLevels = {
      'very-high': 'Very High',
      'high': 'High',
      'mid-range': 'Mid-range',
      'low': 'Low',
      'very-low': 'Very Low',
      'na': 'N/A',
      '': 'Not Set'
    };
    return benefitLevels[level] || 'Not Set';
  },

  // Get CSS class for benefit level
  getBenefitLevelClass: function(level) {
    const benefitClasses = {
      'very-high': 'very-high-benefit',
      'high': 'high-benefit',
      'mid-range': 'mid-range-benefit',
      'low': 'low-benefit',
      'very-low': 'very-low-benefit',
      'na': 'na-benefit',
      '': 'not-set-benefit'
    };
    return benefitClasses[level] || 'not-set-benefit';
  },

  // Get display text for risk level
  getRiskLevelText: function(level) {
    return this.reverseLevels[level]?.text || 'Not Set';
  },

  // Get CSS class for risk level
  getRiskLevelClass: function(level) {
    return this.reverseLevels[level]?.cssClass || 'not-set';
  },

  // Calculate highest risk level from an array of fields
  getHighestRiskLevel: function(selectedValues, fieldNames) {
    let maxLevel = 0;
    
    fieldNames.forEach(fieldName => {
      const value = selectedValues[fieldName] || '';
      const level = this.getRiskLevel(fieldName, value);
      if (level > maxLevel) {
        maxLevel = level;
      }
    });
    
    return maxLevel;
  },

  // Get all field sections for systematic analysis (ordered by priority)
  getSectionFields: function() {
    return {
      // HIGH PRIORITY SECTIONS (Core Risk Assessment Areas)
      'Community Harms': [
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
        // Only confidence level fields that contribute to risk scoring
      ],
      'Community Risks': [
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
        // Excluding Details fields
      ],
      'Fairness': [
        'fairnessRisksIncompleteData',
        'fairnessRisksPoorlyDefined',
        'fairnessRisksNoMonitoring',
        'fairnessRisksOutlierData',
        'fairnessRisksDataCleansing',
        'fairnessRisksBiasDetection',
        'fairnessRisksReproducibility',
        'fairnessRisksDataLinking',
        'fairnessRisksTrainingData',
        'fairnessControlsDataSelection',
        'fairnessControlsDataAvailability',
        'fairnessControlsDataPopulation',
        'fairnessControlsDiversityInclusion',
        'fairnessControlsGenderMinority',
        'fairnessControlsPerformanceMeasures',
        'fairnessControlsPerformanceCalibration'
        // Excluding Details fields
      ],
      'Privacy & Security': [
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
        'privacyControlsSensitiveData',
        // Excluding Details fields
      ],
      'Transparency': [
        'transparencyPurpose',
        'transparencyDataSources',
        'transparencyDataUsage',
        'transparencyPublicAwareness',
        'transparencyUserFeedback',
        'transparencyAuditability',
        'transparencyConsultation',
        'transparencyScopeGoals',
        'transparencyRightToAppeals',
        'transparencyClearExplanations',
        // Excluding Details fields
      ],
      'Accountability': [
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
        // Excluding Details fields
      ],
      'Risk Mitigation': [
        'elevatedRisk' // Self-assessed residual risk after controls
        // Excluding elevatedRiskDetails as it's descriptive
      ],
      
      // LOWER PRIORITY SECTIONS (Supporting Assessment Areas)
      'Community Benefits': [
        'communityBenefitsQuality',
        'communityBenefitsProcessing',
        'communityBenefitsFinancial',
        'communityBenefitsAdaptable',
        'communityBenefitsNewService',
        'communityBenefitsInnovation'
        // Excluding Details fields
      ],
      'Human Rights': [
        'humanRightsAlgorithmicDecision', 
        'humanRightsTradeOffs',
        'humanRightsImpact',
        'humanRightsSuggestions',
        'humanRightsAutonomy'
         // Only risk assessment fields
      ],
      'Procurement': [
        'procurementControls',
        'procurementContractualClauses',
        'procurementSupplierQuestions',
        'procurementResidualRisks',
        'procurementSystemRequirements',
        'procurementRiskTreatments'
        // Excluding Details fields
      ]
    };
  },

  // Get all descriptive/text fields that don't contribute to risk scoring (ordered by priority)
  getDescriptiveFields: function() {
    return {
      // HIGH PRIORITY SECTIONS
      'Community Harms': [
        'communityHarmsPhysicalConfidenceLevelDetails',
        'communityHarmsPsychologicalConfidenceLevelDetails',
        'communityHarmsEnvironmentalConfidenceLevelDetails',
        'communityHarmsUnauthorisedUseConfidenceLevelDetails',
        'communityHarmsImpactOnRightsConfidenceLevelDetails',
        'communityHarmsMisidentificationConfidenceLevelDetails',
        'communityHarmsMisapplicationConfidenceLevelDetails',
        'communityHarmsOtherFinancialImpactConfidenceLevelDetails',
        'communityHarmsIncorrectAdviceConfidenceLevelDetails',
        'communityHarmsInconvenienceDelayConfidenceLevelDetails',
        'communityHarmsErosionOfTrustConfidenceLevelDetails',
        'communityHarmsEthicalImplicationsConfidenceLevelDetails',
        'communityHarmsEconomicDisruptionConfidenceLevelDetails',
        'communityHarmsSocialInequalityConfidenceLevelDetails',
        'communityHarmsOtherConfidenceLevelDetails',
        'communityHarmsReversibleConfidenceLevelDetails',
        'communityHarmsIrreversibleConfidenceLevelDetails',
        'communityHarmsSecondaryCumulativeConfidenceLevelDetails'
      ],
      'Community Risks': [
        'communityRisksNewOrExistingServiceDetails',
        'communityRisksDiscriminationUnintendedBiasDetails',
        'communityRisksSinglePointOfFailureDetails',
        'communityRisksHumanOversightDetails',
        'communityRisksOverRelianceFalseAlertDetails',
        'communityRisksLinkageUnclearDetails',
        'communityRisksExplainabilityDetails',
        'communityRisksBudgetOverrunDetails',
        'communityRisksNonAISystemsDetails',
        'communityRisksInformationComplianceDetails'
      ],
      'Fairness': [
        'fairnessRisksIncompleteDataDetails',
        'fairnessRisksPoorlyDefinedDetails',
        'fairnessRisksNoMonitoringDetails',
        'fairnessRisksOutlierDataDetails',
        'fairnessRisksDataCleansingDetails',
        'fairnessRisksBiasDetectionDetails',
        'fairnessRisksReproducibilityDetails',
        'fairnessRisksDataLinkingDetails',
        'fairnessRisksTrainingDataDetails',
        'fairnessControlsDataSelectionDetails',
        'fairnessControlsDataAvailabilityDetails',
        'fairnessControlsDataPopulationDetails',
        'fairnessControlsDiversityInclusionDetails',
        'fairnessControlsGenderMinorityDetails',
        'fairnessControlsPerformanceMeasuresDetails',
        'fairnessControlsPerformanceCalibrationDetails'
      ],
      'Privacy & Security': [
        'privacyControlsSensitiveChildrenDetails',
        'privacyControlsSensitiveReligiousDetails',
        'privacyControlsSensitiveRacialDetails',
        'privacyControlsSensitivePoliticalDetails',
        'privacyControlsSensitiveUnionDetails',
        'privacyControlsSensitiveGenderDetails',
        'privacyControlsSensitiveCriminalRecordDetails',
        'privacyControlsSensitiveHealthDetails',
        'privacyControlsSensitiveBiometricDetails',
        'privacyControlsSensitiveOtherDataDetails',
        'privacyByDesignDetails',
        'privacyImpactAssessmentDetails',
        'privacyControlsConsentDetails',
        'privacyControlsCyberSecurityDetails',
        'privacyControlsSensitiveDataDetails'
      ],
      'Transparency': [
        'transparencyPurposeDetails',
        'transparencyDataSourcesDetails',
        'transparencyDataUsageDetails',
        'transparencyPublicAwarenessDetails',
        'transparencyUserFeedbackDetails',
        'transparencyAuditabilityDetails',
        'transparencyConsultationDetails',
        'transparencyScopeGoalsDetails',
        'transparencyRightToAppealDetails',
        'transparencyClearExplanationsDetails'
      ],
      'Accountability': [
        'accountabilityTrainingDetails',
        'accountabilityAwarenessDetails',
        'accountabilityDocumentationDetails',
        'accountabilityDecisionHistoryDetails',
        'accountabilityThirdPartiesDetails',
        'accountabilityResponsibleUseDetails',
        'accountabilityResponsiblePolicyDetails',
        'accountabilityResponsibleMonitoringDetails',
        'accountabilityResponsibleDataGovernanceDetails',
        'accountabilityResponsibleTechnicalGovernanceDetails',
        'accountabilityResponsibleAppealRedressDetails',
        'accountabilityInterventionProcessDetails',
        'accountabilityOverconfidenceProcessDetails'
      ],
      'Risk Mitigation': [
        'elevatedRiskDetails' // Self-assessment documentation
      ],
      
      // LOWER PRIORITY SECTIONS
      'Community Benefits': [
        'communityBenefitsQualityDetails',
        'communityBenefitsProcessingDetails',
        'communityBenefitsFinancialDetails',
        'communityBenefitsAdaptableDetails',
        'communityBenefitsNewServiceDetails',
        'communityBenefitsInnovationDetails'
      ],
      'AI Assessment': [
        'buyAI',
        'embedAI',
        'developAI',
        'automatingDecisions',
        'impactsAdministrativeDecisions',
        'triggersRealWorldAction',
        'operatesAutonomously',
        'dataSensitivity',
        'unintendedHarms',
        'explainability'
      ],
      'Human Rights': [
        'humanRightsAlgorithmicDecisionDetails',
        'humanRightsTradeOffsDetails',
        'humanRightsImpactDetails',
        'humanRightsSuggestionsDetails',
        'humanRightsAutonomyDetails'
      ],
      'Procurement': [
        'procurementControlsDetails',
        'procurementContractualClausesDetails',
        'procurementSupplierQuestionsDetails',
        'procurementResidualRiskFactorsDetails',
        'procurementSystemRequirementsDetails',
        'procurementRiskTreatmentsDetails'
      ]
    };
  },

  // Get combined fields for total completion analysis
  getAllFields: function() {
    const riskFields = this.getSectionFields();
    const descriptiveFields = this.getDescriptiveFields();
    const combined = {};
    
    Object.keys(riskFields).forEach(section => {
      combined[section] = [
        ...riskFields[section],
        ...(descriptiveFields[section] || [])
      ];
    });
    
    return combined;
  }
};

// Helper to get today's date in YYYY-MM-DD format
const getToday = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

const initialForm = {
  projectName: "",
  projectDescription: "",
  
  // AI Risk Details (Extended fields)
  businessGoals: "",
  problemChallenge: "",
  systemGoals: "",
  aiJustification: "",
  strategicAlignment: "",
  projectSponsor: "",
  executiveSponsor: "",
  projectOwner: "",
  technicalSystemOwner: "",
  dataGovernanceOwner: "",
  projectPhase: "",
  assessedBy: "",
  contributors: "",
  assessmentDate: getToday(),
  nextReviewDate: "",
  
  // AI Assessment Required
  buyAI: "",
  embedAI: "",
  developAI: "",
  automatingDecisions: "",
  impactsAdministrativeDecisions: "",
  triggersRealWorldAction: "",
  operatesAutonomously: "",
  dataSensitivity: "",
  unintendedHarms: "",
  explainability: "",
  
  // Human Rights Assessment Required
  humanRightsAlgorithmicDecision: "",
  humanRightsAlgorithmicDecisionDetails: "",
  humanRightsTradeOffs: "",
  humanRightsTradeOffsDetails: "",
  humanRightsImpact: "",
  humanRightsImpactDetails: "",
  humanRightsSuggestions: "",
  humanRightsSuggestionsDetails: "",
  humanRightsAutonomy: "",
  humanRightsAutonomyDetails: "",
  
  // Community Benefits
  communityBenefitsQuality: "",
  communityBenefitsQualityDetails: "",
  communityBenefitsProcessing: "",
  communityBenefitsProcessingDetails: "",
  communityBenefitsFinancial: "",
  communityBenefitsFinancialDetails: "",
  communityBenefitsAdaptable: "",
  communityBenefitsAdaptableDetails: "",
  communityBenefitsNewService: "",
  communityBenefitsNewServiceDetails: "",
  communityBenefitsInnovation: "",
  communityBenefitsInnovationDetails: "",
  
  // Community Harms
  communityHarmsPhysicalConfidenceLevel: "",
  communityHarmsPhysicalConfidenceLevelDetails: "",
  communityHarmsPsychologicalConfidenceLevel: "",
  communityHarmsPsychologicalConfidenceLevelDetails: "",
  communityHarmsEnvironmentalConfidenceLevel: "",
  communityHarmsEnvironmentalConfidenceLevelDetails: "",
  communityHarmsUnauthorisedUseConfidenceLevel: "",
  communityHarmsUnauthorisedUseConfidenceLevelDetails: "",
  communityHarmsImpactOnRightsConfidenceLevel: "",
  communityHarmsImpactOnRightsConfidenceLevelDetails: "",
  communityHarmsMisidentificationConfidenceLevel: "",
  communityHarmsMisidentificationConfidenceLevelDetails: "",
  communityHarmsMisapplicationConfidenceLevel: "",
  communityHarmsMisapplicationConfidenceLevelDetails: "",
  communityHarmsOtherFinancialImpactConfidenceLevel: "",
  communityHarmsOtherFinancialImpactConfidenceLevelDetails: "",
  communityHarmsIncorrectAdviceConfidenceLevel: "",
  communityHarmsIncorrectAdviceConfidenceLevelDetails: "",
  communityHarmsInconvenienceDelayConfidenceLevel: "",
  communityHarmsInconvenienceDelayConfidenceLevelDetails: "",
  communityHarmsErosionOfTrustConfidenceLevel: "",
  communityHarmsErosionOfTrustConfidenceLevelDetails: "",
  communityHarmsEthicalImplicationsConfidenceLevel: "",
  communityHarmsEthicalImplicationsConfidenceLevelDetails: "",
  communityHarmsEconomicDisruptionConfidenceLevel: "",
  communityHarmsEconomicDisruptionConfidenceLevelDetails: "",
  communityHarmsSocialInequalityConfidenceLevel: "",
  communityHarmsSocialInequalityConfidenceLevelDetails: "",
  communityHarmsOtherConfidenceLevel: "",
  communityHarmsOtherConfidenceLevelDetails: "",
  communityHarmsReversibleConfidenceLevel: "",
  communityHarmsReversibleConfidenceLevelDetails: "",
  communityHarmsIrreversibleConfidenceLevel: "",
  communityHarmsIrreversibleConfidenceLevelDetails: "",
  communityHarmsSecondaryCumulativeConfidenceLevel: "",
  communityHarmsSecondaryCumulativeConfidenceLevelDetails: "",
  
  // Community Risks
  communityRisksNewOrExistingService: "",
  communityRisksNewOrExistingServiceDetails: "",
  communityRisksDiscriminationUnintendedBias: "",
  communityRisksDiscriminationUnintendedBiasDetails: "",
  communityRisksSinglePointOfFailure: "",
  communityRisksSinglePointOfFailureDetails: "",
  communityRisksHumanOversight: "",
  communityRisksHumanOversightDetails: "",
  communityRisksOverRelianceFalseAlert: "",
  communityRisksOverRelianceFalseAlertDetails: "",
  communityRisksLinkageUnclear: "",
  communityRisksLinkageUnclearDetails: "",
  communityRisksExplainability: "",
  communityRisksExplainabilityDetails: "",
  communityRisksBudgetOverrun: "",
  communityRisksBudgetOverrunDetails: "",
  communityRisksNonAISystems: "",
  communityRisksNonAISystemsDetails: "",
  communityRisksInformationCompliance: "",
  communityRisksInformationComplianceDetails: "",
    
  // Fairness
  fairnessRisksIncompleteData: "",
  fairnessRisksIncompleteDataDetails: "",
  fairnessRisksPoorlyDefined: "",
  fairnessRisksPoorlyDefinedDetails: "",
  fairnessRisksNoMonitoring: "",
  fairnessRisksNoMonitoringDetails: "",
  fairnessRisksOutlierData: "",
  fairnessRisksOutlierDataDetails: "",
  fairnessRisksDataCleansing: "",
  fairnessRisksDataCleansingDetails: "",
  fairnessRisksBiasDetection: "",
  fairnessRisksBiasDetectionDetails: "",
  fairnessRisksReproducibility: "",
  fairnessRisksReproducibilityDetails: "",
  fairnessRisksDataLinking: "",
  fairnessRisksDataLinkingDetails: "",
  fairnessRisksTrainingData: "",
  fairnessRisksTrainingDataDetails: "",
  fairnessControlsDataSelection: "",
  fairnessControlsDataSelectionDetails: "",
  fairnessControlsDataAvailability: "",
  fairnessControlsDataAvailabilityDetails: "",
  fairnessControlsDataPopulation: "",
  fairnessControlsDataPopulationDetails: "",
  fairnessControlsDiversityInclusion: "",
  fairnessControlsDiversityInclusionDetails: "",
  fairnessControlsGenderMinority: "",
  fairnessControlsGenderMinorityDetails: "",
  fairnessControlsPerformanceMeasures: "",
  fairnessControlsPerformanceMeasuresDetails: "",
  fairnessControlsPerformanceCalibration: "",
  fairnessControlsPerformanceCalibrationDetails: "",
    
  // Privacy and Security
  privacyControlsSensitiveChildren: "",
  privacyControlsSensitiveChildrenDetails: "",
  privacyControlsSensitiveReligious: "",
  privacyControlsSensitiveReligiousDetails: "",
  privacyControlsSensitiveRacial: "",
  privacyControlsSensitiveRacialDetails: "",
  privacyControlsSensitivePolitical: "",
  privacyControlsSensitivePoliticalDetails: "",
  privacyControlsSensitiveUnion: "",
  privacyControlsSensitiveUnionDetails: "",
  privacyControlsSensitiveGender: "",
  privacyControlsSensitiveGenderDetails: "",
  privacyControlsSensitiveCriminalRecord: "",
  privacyControlsSensitiveCriminalRecordDetails: "",
  privacyControlsSensitiveHealth: "",
  privacyControlsSensitiveHealthDetails: "",
  privacyControlsSensitiveBiometric: "",
  privacyControlsSensitiveBiometricDetails: "",
  privacyControlsSensitiveOtherData: "",
  privacyControlsSensitiveOtherDataDetails: "",
  privacyByDesign: "",
  privacyByDesignDetails: "",
  privacyImpactAssessment: "",
  privacyImpactAssessmentDetails: "",
  privacyControlsConsent: "",
  privacyControlsConsentDetails: "",
  privacyControlsCyberSecurity: "",
  privacyControlsCyberSecurityDetails: "",
  privacyControlsSensitiveData: "",
  privacyControlsSensitiveDataDetails: "",
  
  // Transparency
  transparencyPurpose: "",
  transparencyPurposeDetails: "",
  transparencyDataSources: "",
  transparencyDataSourcesDetails: "",
  transparencyDataUsage: "",
  transparencyDataUsageDetails: "",
  transparencyPublicAwareness: "",
  transparencyPublicAwarenessDetails: "",
  transparencyUserFeedback: "",
  transparencyUserFeedbackDetails: "",
  transparencyAuditability: "",
  transparencyAuditabilityDetails: "",
  transparencyConsultation: "",
  transparencyConsultationDetails: "",
  transparencyScopeGoals: "",
  transparencyScopeGoalsDetails: "",
  transparencyRightToAppeal: "",
  transparencyRightToAppealDetails: "",
  transparencyClearExplanations: "",
  transparencyClearExplanationsDetails: "",
  
  // Accountability
  accountabilityTraining: "",
  accountabilityTrainingDetails: "",
  accountabilityAwareness: "",
  accountabilityAwarenessDetails: "",
  accountabilityDocumentation: "",
  accountabilityDocumentationDetails: "",
  accountabilityDecisionHistory: "",
  accountabilityDecisionHistoryDetails: "",
  accountabilityThirdParties: "",
  accountabilityThirdPartiesDetails: "",
  accountabilityResponsibleUse: "",
  accountabilityResponsibleUseDetails: "",
  accountabilityResponsiblePolicy: "",
  accountabilityResponsiblePolicyDetails: "",
  accountabilityResponsibleMonitoring: "",
  accountabilityResponsibleMonitoringDetails: "",
  accountabilityResponsibleDataGovernance: "",
  accountabilityResponsibleDataGovernanceDetails: "",
  accountabilityResponsibleTechnicalGovernance: "",
  accountabilityResponsibleTechnicalGovernanceDetails: "",
  accountabilityResponsibleAppealRedress: "",
  accountabilityResponsibleAppealRedressDetails: "",
  accountabilityInterventionProcess: "",
  accountabilityInterventionProcessDetails: "",
  accountabilityOverconfidenceProcess: "",
  accountabilityOverconfidenceProcessDetails: "",

  // Risk Mitigation
  elevatedRisk: "",
  elevatedRiskDetails: "",
  
  // Procurement
  procurementControls: "",
  procurementControlsDetails: "",
  procurementContractualClauses: "",
  procurementContractualClausesDetails: "",
  procurementSupplierQuestions: "",
  procurementSupplierQuestionsDetails: "",
  procurementResidualRiskFactors: "",
  procurementResidualRiskFactorsDetails: "",
  procurementSystemRequirements: "",
  procurementSystemRequirementsDetails: "",
  procurementRiskTreatments: "",
  procurementRiskTreatmentsDetails: ""
};

const AIRiskForm = () => {
  const [form, setForm] = useState(initialForm);
  const [entries, setEntries] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [fieldsOpen, setFieldsOpen] = useState(entries.length === 0);
  const [riskData, setRiskData] = useState(null);
  const [resetTrigger, setResetTrigger] = useState(0); // Add reset trigger
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  
  // Performance optimization: use useCallback to prevent unnecessary re-renders
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    
    // Use functional update for better performance
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  }, []);

  // Edge browser detection for performance warning
  const isEdge = navigator.userAgent.includes('Edge') || navigator.userAgent.includes('Edg/');

  const handleSubmit = (selectedValues) => {
    // Merge selectedValues into the form
    const completeFormData = {
      ...form,
      ...selectedValues,
      assessedDate: getToday()
    };
    
    // Store the complete form data
    setRiskData(completeFormData);
    
    if (editIndex !== null) {
      // Editing existing entry
      const updatedEntries = entries.map((entry, idx) =>
        idx === editIndex ? completeFormData : entry
      );
      setEntries(updatedEntries);
      setEditIndex(null);
      setSubmitted(true);
      setFieldsOpen(false);
      setResetTrigger(prev => prev + 1); // Trigger reset of selectedValues after editing
    } else {
      // Adding new entry
      setEntries([...entries, completeFormData]);
      setForm({
        ...initialForm,
        assessedDate: getToday()
      });
      setFieldsOpen(false);
      setSubmitted(true);
      setResetTrigger(prev => prev + 1); // Trigger reset of selectedValues after submission
    }
    
    // Scroll to the table section after form submission
    setTimeout(() => {
      const tableElement = document.querySelector('.air-table-outer-container');
      if (tableElement) {
        tableElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100); // Small delay to ensure DOM updates are complete
  };

  const handleBack = () => {
    setSubmitted(false);
    setForm(initialForm);
    setEditIndex(null);
    setFieldsOpen(false); // Close form fields when canceling
    setResetTrigger(prev => prev + 1); // Trigger reset of selectedValues
  };

  // Handler for Add New Process button - resets form and selectedValues
  const handleAddNewProcess = () => {
    setForm({
      ...initialForm,
      assessedDate: getToday()
    });
    setEditIndex(null);
    setSubmitted(false);
    setFieldsOpen(true);
    setResetTrigger(prev => prev + 1); // Trigger reset of selectedValues
    
    // Scroll to the AIRiskInputForm section
    setTimeout(() => {
      const formElement = document.querySelector('.air-inputform-details');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100); // Small delay to ensure form is open
  };

  // Handler for Start New button - resets everything including entries
  const handleStartNew = () => {
    if (
      window.confirm(
        "Are you sure you want to start a new AI Risk assessment? This will clear all current entries."
      )
    ) {
      setEntries([]);
      setForm({
        ...initialForm,
        assessedDate: getToday()
      });
      setEditIndex(null);
      setSubmitted(false);
      setFieldsOpen(true);
      setResetTrigger(prev => prev + 1); // Trigger reset of selectedValues
      
      // Scroll to the AIRiskInputForm section
      setTimeout(() => {
        const formElement = document.querySelector('.air-inputform-details');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100); // Small delay to ensure form is open
    }
  };

  // Move row up handler
  const moveRowUp = (idx) => {
    if (idx === 0) return;
    setEntries((prev) => {
      const newEntries = [...prev];
      [newEntries[idx - 1], newEntries[idx]] = [newEntries[idx], newEntries[idx - 1]];
      return newEntries;
    });
    if (editIndex === idx) setEditIndex(idx - 1);
    else if (editIndex === idx - 1) setEditIndex(idx);
  };

  // Move row down handler
  const moveRowDown = (idx) => {
    if (idx === entries.length - 1) return;
    setEntries((prev) => {
      const newEntries = [...prev];
      [newEntries[idx], newEntries[idx + 1]] = [newEntries[idx + 1], newEntries[idx]];
      return newEntries;
    });
    if (editIndex === idx) setEditIndex(idx + 1);
    else if (editIndex === idx + 1) setEditIndex(idx);
  };

  // Remove entry handler
  const handleRemove = (idx) => {
    setEntries(entries.filter((_, i) => i !== idx));
    
    // Always reset the form to initial state when any record is deleted
    // to prevent stale data from remaining in the form
    setEditIndex(null);
    setForm(initialForm);
    setSubmitted(false);
    setFieldsOpen(false); // Also collapse the form fields
    setResetTrigger(prev => prev + 1); // Trigger reset of selectedValues
  };

  const handleRowClick = (idx) => {
    // If clicking on the row that's already being edited, save the changes
    if (editIndex === idx) {
      const updatedEntries = entries.map((entry, entryIdx) =>
        entryIdx === editIndex ? form : entry
      );
      setEntries(updatedEntries);
      setEditIndex(null);
      setSubmitted(true);
      setFieldsOpen(false); // Collapse form fields after save
    } else {
      // If clicking on a different row, load it for editing
      setForm(entries[idx]);
      setEditIndex(idx);
      setSubmitted(false);
      setFieldsOpen(true); // Expand the BIA Form Fields when a row is clicked
    }
  };

    // Drag and drop state for reordering risks
  const [draggedEntryIndex, setDraggedEntryIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [dropTargetIndex, setDropTargetIndex] = useState(null);

  const [selectedEntryIndex, setSelectedEntryIndex] = useState(null);

  const updatedEntries = [...entries];
  const draggedEntry= updatedEntries[draggedEntryIndex];

  // Drag and drop handlers for reordering processes
  const handleMoveProcess = (fromIndex, toIndex) => {
    if (fromIndex === toIndex || toIndex < 0 || toIndex >= entries.length) {
      return;
    }

    const updatedEntries = [...entries];
    const entryToMove = updatedEntries[fromIndex];
    updatedEntries.splice(fromIndex, 1);
    updatedEntries.splice(toIndex, 0, entryToMove);

    setEntries(updatedEntries);

    // Update selected process index if needed
    if (selectedEntryIndex === fromIndex) {
      setSelectedEntryIndex(toIndex);
    } else if (selectedEntryIndex !== null) {
      if (fromIndex < selectedEntryIndex && toIndex >= selectedEntryIndex) {
        setSelectedEntryIndex(selectedEntryIndex - 1);
      } else if (fromIndex > selectedEntryIndex && toIndex <= selectedEntryIndex) {
        setSelectedEntryIndex(selectedEntryIndex + 1);
      }
    }
  };
    
  const handleDragStart = (e, index) => {
    setDraggedEntryIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.outerHTML);
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
    setDraggedEntryIndex(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    if (draggedEntryIndex === null || draggedEntryIndex === dropIndex) {
      return;
    }

    // Remove the dragged item
    updatedEntries.splice(draggedEntryIndex, 1);

    // Insert it at the new position
    const insertIndex =
      draggedEntryIndex < dropIndex ? dropIndex - 1 : dropIndex;
    updatedEntries.splice(insertIndex, 0, draggedEntry);

    setEntries(updatedEntries);

    // Update selected entry index if needed
    if (selectedEntryIndex === draggedEntryIndex) {
      setSelectedEntryIndex(insertIndex);
    } else if (selectedEntryIndex !== null) {
      if (
        draggedEntryIndex < selectedEntryIndex &&
        insertIndex >= selectedEntryIndex
      ) {
        setSelectedEntryIndex(selectedEntryIndex - 1);
      } else if (
        draggedEntryIndex > selectedEntryIndex &&
        insertIndex <= selectedEntryIndex
      ) {
        setSelectedEntryIndex(selectedEntryIndex + 1);
      }
    }

    setDraggedEntryIndex(null);
    setDragOverIndex(null);
  };  

  return (
    <div className="air-main-container">
      <h2 className="air-main-heading">
        AI Risk Assessment Form
      </h2>
      {isEdge && (
        <div className="edge-performance-warning" style={{
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '4px',
          padding: '10px',
          margin: '10px 0',
          color: '#856404',
          fontSize: '14px'
        }}>
          <strong>⚠️ Performance Notice:</strong> Microsoft Edge detected. You may experience slower input response times with this form. Consider using Firefox or Chrome for optimal performance.
        </div>
      )}
      <AIRiskIntro />
      <AIRiskInputForm 
        entries={entries}
        form={form}
        setForm={setForm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleBack}
        editIndex={editIndex}
        fieldsOpen={fieldsOpen}
        setFieldsOpen={setFieldsOpen}
        resetTrigger={resetTrigger}
      />
      <AIRiskTable 
        entries={entries}
        setEntries={setEntries}
        initialForm={initialForm}
        setForm={setForm}
        setEditIndex={setEditIndex}
        setSubmitted={setSubmitted}
        setFieldsOpen={setFieldsOpen}
        handleAddNewProcess={handleAddNewProcess}
        handleStartNew={handleStartNew}
        moveRowUp={moveRowUp}
        moveRowDown={moveRowDown}
        handleRemove={handleRemove}        
        setDraggedProcessIndex={setDraggedEntryIndex}
        draggedProcessIndex={draggedEntryIndex}
        setDropTargetIndex={setDropTargetIndex}
        dropTargetIndex={dropTargetIndex}        
        editIndex={editIndex}
        handleMoveProcess={handleMoveProcess}
        hoveredRowIndex={hoveredRowIndex}
        setHoveredRowIndex={setHoveredRowIndex}
        handleRowClick={handleRowClick}
      />

      <AIRiskReport entries={entries} />
    </div>
  );
};

function WrappedAIRiskForm() {
  return (
    <>
      <AIRiskForm />
      <div className="air-version-footer">
        SC3 AI Risk Form {VERSION}
      </div>
    </>
  );
}

export default WrappedAIRiskForm;