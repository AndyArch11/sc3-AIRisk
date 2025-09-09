import * as XLSX from 'xlsx';

// Function to create a timestamped Excel file with AI Risk Assessment data
export const exportAIRisksToExcel = (entries) => {
    try {
        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Create the AI Risk Assessment Guidance worksheet
        const guidanceData = createGuidanceWorksheet();
        const guidanceWS = XLSX.utils.aoa_to_sheet(guidanceData);
        
        // Add some styling to the guidance worksheet
        const guidanceRange = XLSX.utils.decode_range(guidanceWS['!ref']);
        for (let R = guidanceRange.s.r; R <= guidanceRange.e.r; ++R) {
            for (let C = guidanceRange.s.c; C <= guidanceRange.e.c; ++C) {
                const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
                if (!guidanceWS[cellAddress]) continue;
                
                // Style headers (first row and section headers)
                if (R === 0 || (guidanceWS[cellAddress].v && typeof guidanceWS[cellAddress].v === 'string' && 
                    (guidanceWS[cellAddress].v.includes('===') || guidanceWS[cellAddress].v.includes('Framework') || 
                    guidanceWS[cellAddress].v.includes('NIST') || guidanceWS[cellAddress].v.includes('Australia') || 
                    guidanceWS[cellAddress].v.includes('EU AI Act')))) {
                    guidanceWS[cellAddress].s = {
                        font: { bold: true, color: { rgb: "000000" } },
                        fill: { fgColor: { rgb: "E6F3FF" } }
                    };
                }
            }
        }

        // Set column widths for guidance worksheet
        guidanceWS['!cols'] = [
            { width: 46 }, // Topic
            { width: 200 }  // Content
        ];

        XLSX.utils.book_append_sheet(workbook, guidanceWS, "AI Risk Assessment Guidance");

        // Create the AI Risk Assessment Entries worksheet
        const entriesData = createEntriesWorksheet(entries);
        const entriesWS = XLSX.utils.aoa_to_sheet(entriesData);
        
        // Set column widths for entries worksheet - make them wider for better readability
        const entriesColWidths = Array(entriesData[0]?.length || 0).fill({ width: 30 });
        entriesWS['!cols'] = entriesColWidths;

        XLSX.utils.book_append_sheet(workbook, entriesWS, "AI Risk Assessment Entries");

        // Generate timestamp for filename
        const now = new Date();
        const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5); // Format: YYYY-MM-DDTHH-MM-SS
        const filename = `AI_Risk_Assessment_Export_${timestamp}.xlsx`;

        // Write and download the file
        XLSX.writeFile(workbook, filename);
        
        console.log(`Excel file "${filename}" has been generated and downloaded successfully.`);
        
    } catch (error) {
        console.error('Error creating Excel export:', error);
        alert('An error occurred while creating the Excel file. Please try again.');
    }
};

// Function to create the guidance worksheet data
const createGuidanceWorksheet = () => {
    return [
        // Header
        ['Topic', 'Content'],
        
        // Introduction
        ['=== AI Risk Management Overview ===', ''],
        ['What is AI Risk Management?', 'AI Risk Management is a structured approach to controlling potential threats that emerge with the use of AI technologies. It involves identifying, assessing, and mitigating risks throughout the AI system lifecycle. Current risk frameworks and approaches do not adequately address the set of risks that AI systems bring.'],
        ['Generative AI Challenges', 'Generative AI in particular poses unique challenges and risks, including the potential for misuse, bias, misinformation, data exfiltration, and unintended consequences. Organisations must be proactive in addressing these risks through comprehensive risk management strategies.'],
        ['Responsible AI', 'Responsible AI helps align AI design, development, and uses with intended aim and values. It emphasises human centricity, social responsibility, and sustainability (NIST - paraphrased).'],
        ['Executive Leadership', 'Due to the potential impact on an organisation\'s reputation and operations that AI can have, AI governance is now an executive level leadership issue, not simply an operational one.'],
        
        // NIST AI RMF
        ['', ''],
        ['=== NIST AI RMF: Four Core Functions ===', ''],
        ['Govern', 'A culture of risk management is cultivated and present'],
        ['Map', 'Context is recognised and risks related to context are identified'],
        ['Measure', 'Identified risks are assessed, analysed, or tracked'],
        ['Manage', 'Risks are prioritised and acted upon based on a projected impact'],
        
        // NIST Characteristics
        ['', ''],
        ['=== NIST AI RMF Characteristics of Trustworthy AI ===', ''],
        ['Valid and Reliable', 'The system should perform as intended across a range of conditions, with minimal failure or inconsistency. This includes rigorous testing and validation during development and ongoing monitoring post-deployment.'],
        ['Safe', 'AI systems must operate without causing unintentional harm. This involves anticipating and preventing behaviours that could lead to accidents or system failures.'],
        ['Secure and Resilient', 'Systems should be robust against adversarial threats, tampering, and cyberattacks. This includes protections against data poisoning, model inversion, or unauthorised model manipulation.'],
        ['Explainable and Interpretable', 'Users and decision-makers must be able to interpret AI outputs and the rationale behind them. This is especially important in regulated industries or high-risk decision contexts.'],
        ['Privacy Enhanced', 'AI must respect data privacy throughout its lifecycle, incorporating methods like differential privacy, data minimisation, and secure data handling practices.'],
        ['Fair with Harmful Bias Managed', 'The system should avoid discriminatory outcomes by being tested and tuned to reduce bias across data, algorithms, and outputs.'],
        ['Accountable and Transparent', 'Stakeholders should understand how decisions are made and be able to audit the system\'s design and outcomes. Transparency fosters accountability across the AI supply chain.'],
        
        // Australia's AI Ethics Principles
        ['', ''],
        ['=== Australia\'s AI Ethics Principles ===', ''],
        ['Human, Social and Environmental Wellbeing', 'AI systems should benefit individuals, society and the environment.'],
        ['Human-centred Values', 'AI systems should respect human rights, diversity, and the autonomy of individuals.'],
        ['Fairness', 'AI systems should be inclusive and accessible, and should not involve or result in unfair discrimination against individuals, communities or groups.'],
        ['Privacy Protection and Security', 'AI systems should respect and uphold privacy rights and data protection, and ensure the security of data.'],
        ['Reliability and Safety', 'AI systems should reliably operate in accordance with their intended purpose.'],
        ['Transparency and Explainability', 'There should be transparency and responsible disclosure so people can understand when they are being significantly impacted by AI, and can find out when an AI system is engaging with them.'],
        ['Contestability', 'When an AI system significantly impacts a person, community, group or environment, there should be a timely process to allow people to challenge the use or outcomes of the AI system.'],
        ['Accountability', 'People responsible for the different phases of the AI system lifecycle should be identifiable and accountable for the outcomes of the AI systems, and human oversight of AI systems should be enabled.'],
        
        // Core Risks
        ['', ''],
        ['=== Core Risks Associated with AI ===', ''],
        ['Bias and Discrimination', 'AI systems can inadvertently perpetuate or amplify biases present in training data, leading to unfair treatment of individuals or groups. Mitigation: Bias detection/correction, diverse datasets, inclusive design, monitor metrics and feedback for drift/bias.'],
        ['Lack of Transparency', 'Many AI models operate as "black boxes," making it difficult to understand their decision-making processes and increasing the risk of unintended consequences. Mitigation: Explainable AI, interpretable models, visualisation tools, clear documentation, stakeholder communication.'],
        ['Data Privacy', 'AI systems often require large amounts of data, raising concerns about the privacy and security of sensitive information. Mitigation: Data minimisation, encryption, access controls, monitoring/logging, privacy audits, differential privacy, federated learning.'],
        ['Accountability Issues', 'Determining who is responsible for the actions and decisions made by AI systems can be challenging, particularly in cases of harm or legal disputes. Mitigation: Clear lines of accountability, defined roles, tracking/reporting performance, remediation processes.'],
        ['Regulatory Compliance', 'Ensuring AI systems comply with relevant laws, regulations, and industry standards is essential for mitigating legal and reputational risks. Mitigation: Stay informed on developments, regular audits/assessments, reporting/handling violations.'],
        ['Security Threats', 'AI systems can be vulnerable to various security threats, including adversarial attacks, data poisoning, and model inversion. Mitigation: Treat as critical systems, robust security, monitor access/logs, incident response plans.'],
        ['Ethical Use', 'Ensuring AI systems are used ethically and responsibly is critical for maintaining trust and accountability. Mitigation: Clear ethical guidelines/principles, monitor ethical implications, stakeholder engagement, human-in-the-loop accountability.'],
        
        // Risk Levels
        ['', ''],
        ['=== NSW AIAF Risk Levels ===', ''],
        ['None/Negligible Risk', 'AI systems with no or extremely minimal risk. Examples: Noise suppression, image resolution enhancement, grammar checking, text summarisation of non-sensitive content.'],
        ['Low Risk', 'Systems that can be easily reversed without harm. Examples: Email spam filters, document classification, photo organising, basic voice assistance.'],
        ['Mid-range Risk', 'Systems that can be reversed but may cause moderate disruption. Examples: Customer service chatbots, recommendation systems, language translation, content curation.'],
        ['High Risk', 'Systems that can be reversed but may cause significant consequences. Examples: Facial recognition, AI-powered hiring, healthcare decision support, autonomous systems with human oversight.'],
        ['Very High Risk', 'Systems that may cause catastrophic, irreversible consequences. Examples: Autonomous benefits eligibility without oversight, self-driving cars, medical diagnosis without oversight, critical infrastructure AI.'],
        
        // Additional Information
        ['', ''],
        ['=== Key Standards and Frameworks ===', ''],
        ['ISO/IEC 23894:2023', 'Information technology — Artificial intelligence — Guidance on risk management'],
        ['ISO/IEC 31000:2018', 'Risk management — Guidelines'],
        ['ISO/IEC 42001:2023', 'Information technology — Artificial intelligence — Management system'],
        ['NIST AI RMF', 'AI Risk Management Framework - https://www.nist.gov/itl/ai-risk-management-framework'],
        ['EU AI Act', 'European Union regulation on AI - https://www.europarl.europa.eu/thinktank/en/document/EPRS_BRI(2021)698792'],
        ['NSW AIAF', 'NSW Artificial Intelligence Assessment Framework'],
        
        ['', ''],
        ['=== This Assessment Tool ===', ''],
        ['Purpose', 'This AI Risk Assessment tool helps organisations systematically evaluate AI systems across multiple dimensions including technical risks, human rights impacts, community benefits, fairness, privacy, transparency, accountability, and procurement considerations.'],
        ['Methodology', 'The questions are based on the NSW AIAF with modifications to make it less government-oriented and more applicable to general organisational use.'],
        ['Export Date', new Date().toLocaleDateString()],
        ['Export Time', new Date().toLocaleTimeString()],
        
        ['', ''],
        ['Disclaimer', 'The information provided is for general informational purposes only and will require adaptation for specific businesses and maturity capabilities. It is not intended as legal advice. Please consult with a qualified legal professional for specific legal advice tailored to your situation.']
    ];
};

// Function to create the entries worksheet data
const createEntriesWorksheet = (entries) => {
    if (!entries || entries.length === 0) {
        return [
            ['No AI Risk Assessment entries found'],
            ['Please create some risk assessments first before exporting.']
        ];
    }

    const sectionHeaders = [
        'AI Risk Details', 
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', //{17} 
        'AI Assessment Required?', 
        '', '', '', '', '', '', '', '', '', //{10} 
        'Human Rights Impact Assessment Required?', 
        '', '', '', '', '', '', '', '', '', //{10} 
        'Community / Organisational Benefits', 
        '', '', '', '', '', '', '', '', '', '', '', //{12} 
        'Community / Organisational Harms', 
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', //{36} 
        'Community / Organisational Risks', 
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', //{20} 
        'Fairness', 
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', //{32} 
        'Privacy and Security', 
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', //{30} 
        'Transparency', 
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', //{20} 
        'Accountability', 
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', //{26} 
        'Risk Mitigation', 
        '', //{2} 
        'Procurement', 
        '', '', '', '', '', '', '', '', '', '', '' //{12}
    ];

    const columns = [
        
        { key: 'projectName', label: 'Project / System Name' },
        { key: 'projectDescription', label: 'Project / System Description' },
        
        // AI Risk Details (Extended fields)
        { key: 'businessGoals', label: 'Business Goals' },
        { key: 'problemChallenge', label: 'Problem / Challenge' },
        { key: 'systemGoals', label: 'System Goals' },
        { key: 'aiJustification', label: 'AI Justification' },
        { key: 'strategicAlignment', label: 'Strategic Alignment' },
        { key: 'projectSponsor', label: 'Project Sponsor' },
        { key: 'executiveSponsor', label: 'Executive Sponsor' },
        { key: 'projectOwner', label: 'Project Owner' },
        { key: 'technicalSystemOwner', label: 'Technical System Owner' },
        { key: 'dataGovernanceOwner', label: 'Data Governance Owner' },
        { key: 'projectPhase', label: 'Project Phase' },
        { key: 'assessedBy', label: 'Assessed By' },
        { key: 'contributors', label: 'Contributors' },
        { key: 'assessmentDate', label: 'Assessment Date' },
        { key: 'nextReviewDate', label: 'Next Review Date' },

        // AI Assessment Required
        { key: 'buyAI', label: 'Buy AI' },
        { key: 'embedAI', label: 'Embed AI' },
        { key: 'developAI', label: 'Develop AI' },
        { key: 'automatingDecisions', label: 'Automating Decisions' },
        { key: 'impactsAdministrativeDecisions', label: 'Impacts Administrative Decisions' },
        { key: 'triggersRealWorldAction', label: 'Triggers Real World Action' },
        { key: 'operatesAutonomously', label: 'Operates Autonomously' },
        { key: 'dataSensitivity', label: 'Data Sensitivity' },
        { key: 'unintendedHarms', label: 'Unintended Harms' },
        { key: 'explainability', label: 'Explainability' },

        // Human Rights Assessment Required
        { key: 'humanRightsAlgorithmicDecision', label: 'Algorithmic Decision' },
        { key: 'humanRightsAlgorithmicDecisionDetails', label: 'Algorithmic Decision Details' },
        { key: 'humanRightsTradeOffs', label: 'Trade Offs' },
        { key: 'humanRightsTradeOffsDetails', label: 'Trade Offs Details' },
        { key: 'humanRightsImpact', label: 'Restrict Human Rights' },
        { key: 'humanRightsImpactDetails', label: 'Restrict Human Rights Details' },
        { key: 'humanRightsSuggestions', label: 'Suggestions' },
        { key: 'humanRightsSuggestionsDetails', label: 'Suggestions Details' },
        { key: 'humanRightsAutonomy', label: 'Autonomy' },
        { key: 'humanRightsAutonomyDetails', label: 'Autonomy Details' },

        // Community Benefits
        { key: 'communityBenefitsQuality', label: 'Improved Quality' },
        { key: 'communityBenefitsQualityDetails', label: 'Improved Quality Details' },
        { key: 'communityBenefitsProcessing', label: 'Reduced Time' },
        { key: 'communityBenefitsProcessingDetails', label: 'Reduced Time Details' },
        { key: 'communityBenefitsFinancial', label: 'Improved Financial Efficiency' },
        { key: 'communityBenefitsFinancialDetails', label: 'Improved Financial Efficiency Details' },
        { key: 'communityBenefitsAdaptable', label: 'Reusability' },
        { key: 'communityBenefitsAdaptableDetails', label: 'Reusability Details' },
        { key: 'communityBenefitsNewService', label: 'New Service' },
        { key: 'communityBenefitsNewServiceDetails', label: 'New Service Details' },
        { key: 'communityBenefitsInnovation', label: 'Future Innovations' },
        { key: 'communityBenefitsInnovationDetails', label: 'Future Innovations Details' },
        
        // Community Harms
        { key: 'communityHarmsPhysicalConfidenceLevel', label: 'Physical Harm' },
        { key: 'communityHarmsPhysicalConfidenceLevelDetails', label: 'Physical Harm Details' },
        { key: 'communityHarmsPsychologicalConfidenceLevel', label: 'Psychological Harm' },
        { key: 'communityHarmsPsychologicalConfidenceLevelDetails', label: 'Psychological Harm Details' },
        { key: 'communityHarmsEnvironmentalConfidenceLevel', label: 'Environmental Harm' },
        { key: 'communityHarmsEnvironmentalConfidenceLevelDetails', label: 'Environmental Harm Details' },
        { key: 'communityHarmsUnauthorisedUseConfidenceLevel', label: 'Unauthorised SIP' },
        { key: 'communityHarmsUnauthorisedUseConfidenceLevelDetails', label: 'Unauthorised SIP Details' },
        { key: 'communityHarmsImpactOnRightsConfidenceLevel', label: 'Rights' },
        { key: 'communityHarmsImpactOnRightsConfidenceLevelDetails', label: 'Rights Details' },
        { key: 'communityHarmsMisidentificationConfidenceLevel', label: 'Misidentification' },
        { key: 'communityHarmsMisidentificationConfidenceLevelDetails', label: 'Misidentification Details' },
        { key: 'communityHarmsMisapplicationConfidenceLevel', label: 'Fees, Fines, Penalties' },
        { key: 'communityHarmsMisapplicationConfidenceLevelDetails', label: 'Fees, Fines, Penalties Details' },
        { key: 'communityHarmsOtherFinancialImpactConfidenceLevel', label: 'Financial Harm' },
        { key: 'communityHarmsOtherFinancialImpactConfidenceLevelDetails', label: 'Financial Harm Details' },
        { key: 'communityHarmsIncorrectAdviceConfidenceLevel', label: 'Incorrect Advice' },
        { key: 'communityHarmsIncorrectAdviceConfidenceLevelDetails', label: 'Incorrect Advice Details' },
        { key: 'communityHarmsInconvenienceDelayConfidenceLevel', label: 'Inconvenience / Delay' },
        { key: 'communityHarmsInconvenienceDelayConfidenceLevelDetails', label: 'Inconvenience / Delay Details' },
        { key: 'communityHarmsErosionOfTrustConfidenceLevel', label: 'Erosion of Trust' },
        { key: 'communityHarmsErosionOfTrustConfidenceLevelDetails', label: 'Erosion of Trust Details' },
        { key: 'communityHarmsEthicalImplicationsConfidenceLevel', label: 'Ethical' },
        { key: 'communityHarmsEthicalImplicationsConfidenceLevelDetails', label: 'Ethical Details' },
        { key: 'communityHarmsEconomicDisruptionConfidenceLevel', label: 'Economic' },
        { key: 'communityHarmsEconomicDisruptionConfidenceLevelDetails', label: 'Economic Details' },
        { key: 'communityHarmsSocialInequalityConfidenceLevel', label: 'Social Inequality' },
        { key: 'communityHarmsSocialInequalityConfidenceLevelDetails', label: 'Social Inequality Details' },
        { key: 'communityHarmsOtherConfidenceLevel', label: 'Other Harms' },
        { key: 'communityHarmsOtherConfidenceLevelDetails', label: 'Other Harms Details' },
        { key: 'communityHarmsReversibleConfidenceLevel', label: 'Reversible Harms' },
        { key: 'communityHarmsReversibleConfidenceLevelDetails', label: 'Reversible Harms Details' },
        { key: 'communityHarmsIrreversibleConfidenceLevel', label: 'Irreversible Harms' },
        { key: 'communityHarmsIrreversibleConfidenceLevelDetails', label: 'Irreversible Harms Details' },
        { key: 'communityHarmsSecondaryCumulativeConfidenceLevel', label: 'Secondary / Cumulative Harms' },
        { key: 'communityHarmsSecondaryCumulativeConfidenceLevelDetails', label: 'Secondary / Cumulative Harms Details' },

        // Community Risks
        { key: 'communityRisksNewOrExistingService', label: 'New or Existing Service' },
        { key: 'communityRisksNewOrExistingServiceDetails', label: 'New or Existing Service Details' },
        { key: 'communityRisksDiscriminationUnintendedBias', label: 'Discrimination / Unintended Bias' },
        { key: 'communityRisksDiscriminationUnintendedBiasDetails', label: 'Discrimination / Unintended Bias Details' },
        { key: 'communityRisksSinglePointOfFailure', label: 'Single Point of Failure' },
        { key: 'communityRisksSinglePointOfFailureDetails', label: 'Single Point of Failure Details' },
        { key: 'communityRisksHumanOversight', label: 'Human Oversight' },
        { key: 'communityRisksHumanOversightDetails', label: 'Human Oversight Details' },
        { key: 'communityRisksOverRelianceFalseAlert', label: 'Over Reliance / False Alert' },
        { key: 'communityRisksOverRelianceFalseAlertDetails', label: 'Over Reliance / False Alert Details' },
        { key: 'communityRisksLinkageUnclear', label: 'Linkage Unclear' },
        { key: 'communityRisksLinkageUnclearDetails', label: 'Linkage Unclear Details' },
        { key: 'communityRisksExplainability', label: 'Explainability' },
        { key: 'communityRisksExplainabilityDetails', label: 'Explainability Details' },
        { key: 'communityRisksBudgetOverrun', label: 'Budget Overrun' },
        { key: 'communityRisksBudgetOverrunDetails', label: 'Budget Overrun Details' },
        { key: 'communityRisksNonAISystems', label: 'Non-AI Systems' },
        { key: 'communityRisksNonAISystemsDetails', label: 'Non-AI Systems Details' },
        { key: 'communityRisksInformationCompliance', label: 'Legislation Alignment' },
        { key: 'communityRisksInformationComplianceDetails', label: 'Legislation Alignment Details' },

        // Fairness
        { key: 'fairnessRisksIncompleteData', label: 'Inaccurate Data' },
        { key: 'fairnessRisksIncompleteDataDetails', label: 'Inaccurate Data Details' },
        { key: 'fairnessRisksPoorlyDefined', label: 'Undefined "Fairness"' },
        { key: 'fairnessRisksPoorlyDefinedDetails', label: 'Undefined "Fairness" Details' },
        { key: 'fairnessRisksNoMonitoring', label: 'Unmonitored "Fairness"' },
        { key: 'fairnessRisksNoMonitoringDetails', label: 'Unmonitored "Fairness" Details' },
        { key: 'fairnessRisksOutlierData', label: 'Excluding Outlier Data' },
        { key: 'fairnessRisksOutlierDataDetails', label: 'Excluding Outlier Data Details' },
        { key: 'fairnessRisksDataCleansing', label: 'Inconsistent Data Cleansing' },
        { key: 'fairnessRisksDataCleansingDetails', label: 'Inconsistent Data Cleansing Details' },
        { key: 'fairnessRisksBiasDetection', label: 'Informal Bias Detection' },
        { key: 'fairnessRisksBiasDetectionDetails', label: 'Informal Bias Detection Details' },
        { key: 'fairnessRisksReproducibility', label: 'Reproducibility' },
        { key: 'fairnessRisksReproducibilityDetails', label: 'Reproducibility Details' },
        { key: 'fairnessRisksDataLinking', label: 'Inadvertant Links' },
        { key: 'fairnessRisksDataLinkingDetails', label: 'Inadvertant Links Details' },
        { key: 'fairnessRisksTrainingData', label: 'Training Data Differences' },
        { key: 'fairnessRisksTrainingDataDetails', label: 'Training Data Differences Details' },
        { key: 'fairnessControlsDataSelection', label: 'Data Justification' },
        { key: 'fairnessControlsDataSelectionDetails', label: 'Data Justification Details' },
        { key: 'fairnessControlsDataAvailability', label: 'Data Quality' },
        { key: 'fairnessControlsDataAvailabilityDetails', label: 'Data Quality Details' },
        { key: 'fairnessControlsDataPopulation', label: 'Representative Data' },
        { key: 'fairnessControlsDataPopulationDetails', label: 'Representative Data Details' },
        { key: 'fairnessControlsDiversityInclusion', label: 'Diversity and Inclusion' },
        { key: 'fairnessControlsDiversityInclusionDetails', label: 'Diversity and Inclusion Details' },
        { key: 'fairnessControlsGenderMinority', label: 'Minority Impact' },
        { key: 'fairnessControlsGenderMinorityDetails', label: 'Minority Impact Details' },
        { key: 'fairnessControlsPerformanceMeasures', label: 'Performance Measures' },
        { key: 'fairnessControlsPerformanceMeasuresDetails', label: 'Performance Measures Details' },
        { key: 'fairnessControlsPerformanceCalibration', label: 'Monitoring Performance' },
        { key: 'fairnessControlsPerformanceCalibrationDetails', label: 'Monitoring Performance Details' },

        // Privacy and Security
        { key: 'privacyControlsSensitiveChildren', label: 'Children' },
        { key: 'privacyControlsSensitiveChildrenDetails', label: 'Children Details' },
        { key: 'privacyControlsSensitiveReligious', label: 'Religious Individuals' },
        { key: 'privacyControlsSensitiveReligiousDetails', label: 'Religious Individuals Details' },
        { key: 'privacyControlsSensitiveRacial', label: 'Ethnically Diverse' },
        { key: 'privacyControlsSensitiveRacialDetails', label: 'Ethnically Diverse Details' },
        { key: 'privacyControlsSensitivePolitical', label: 'Political' },
        { key: 'privacyControlsSensitivePoliticalDetails', label: 'Political Details' },
        { key: 'privacyControlsSensitiveUnion', label: 'Trade Unions' },
        { key: 'privacyControlsSensitiveUnionDetails', label: 'Trade Unions Details' },
        { key: 'privacyControlsSensitiveGender', label: 'Gender / Sexual Diversity' },
        { key: 'privacyControlsSensitiveGenderDetails', label: 'Gender / Sexual Diversity Details' },
        { key: 'privacyControlsSensitiveCriminalRecord', label: 'Criminal Record' },
        { key: 'privacyControlsSensitiveCriminalRecordDetails', label: 'Criminal Record Details' },
        { key: 'privacyControlsSensitiveHealth', label: 'Health Data' },
        { key: 'privacyControlsSensitiveHealthDetails', label: 'Health Data Details' },
        { key: 'privacyControlsSensitiveBiometric', label: 'Biometric Data' },
        { key: 'privacyControlsSensitiveBiometricDetails', label: 'Biometric Data Details' },
        { key: 'privacyControlsSensitiveOtherData', label: 'Other Data' },
        { key: 'privacyControlsSensitiveOtherDataDetails', label: 'Other Data Details' },
        { key: 'privacyByDesign', label: 'Privacy by Design' },
        { key: 'privacyByDesignDetails', label: 'Privacy by Design Details' },
        { key: 'privacyImpactAssessment', label: 'Privacy Impact Assessment' },
        { key: 'privacyImpactAssessmentDetails', label: 'Privacy Impact Assessment Details' },
        { key: 'privacyControlsConsent', label: 'Consent' },
        { key: 'privacyControlsConsentDetails', label: 'Consent Details' },
        { key: 'privacyControlsCyberSecurity', label: 'Security' },
        { key: 'privacyControlsCyberSecurityDetails', label: 'Security Details' },
        { key: 'privacyControlsSensitiveData', label: 'Sensitive Data' },
        { key: 'privacyControlsSensitiveDataDetails', label: 'Sensitive Data Details' },

        // Transparency
        { key: 'transparencyPurpose', label: 'Documentation' },
        { key: 'transparencyPurposeDetails', label: 'Documentation Details' },
        { key: 'transparencyDataSources', label: 'Black Box' },
        { key: 'transparencyDataSourcesDetails', label: 'Black Box Details' },
        { key: 'transparencyDataUsage', label: 'Output Explanation' },
        { key: 'transparencyDataUsageDetails', label: 'Output Explanation Details' },
        { key: 'transparencyPublicAwareness', label: 'User AI Interaction Awareness' },
        { key: 'transparencyPublicAwarenessDetails', label: 'User AI Interaction Awareness Details' },
        { key: 'transparencyUserFeedback', label: 'User Feedback' },
        { key: 'transparencyUserFeedbackDetails', label: 'User Feedback Details' },
        { key: 'transparencyAuditability', label: 'Decision Audit' },
        { key: 'transparencyAuditabilityDetails', label: 'Decision Audit Details' },
        { key: 'transparencyConsultation', label: 'Community Consultation' },
        { key: 'transparencyConsultationDetails', label: 'Community Consultation Details' },
        { key: 'transparencyScopeGoals', label: 'Scope and Goals Published' },
        { key: 'transparencyScopeGoalsDetails', label: 'Scope and Goals Published Details' },
        { key: 'transparencyRightToAppeal', label: 'Appealing Decisions' },
        { key: 'transparencyRightToAppealDetails', label: 'Appealing Decisions Details' },
        { key: 'transparencyClearExplanations', label: 'Explaining Decisions' },
        { key: 'transparencyClearExplanationsDetails', label: 'Explaining Decisions Details' },

        // Accountability
        { key: 'accountabilityTraining', label: 'Training' },
        { key: 'accountabilityTrainingDetails', label: 'Training Details' },
        { key: 'accountabilityAwareness', label: 'Limitation Awareness' },
        { key: 'accountabilityAwarenessDetails', label: 'Limitation Awareness Details' },
        { key: 'accountabilityDocumentation', label: '"Fairness" Documentation' },
        { key: 'accountabilityDocumentationDetails', label: '"Fairness" Documentation Details' },
        { key: 'accountabilityDecisionHistory', label: 'AI Decision History' },
        { key: 'accountabilityDecisionHistoryDetails', label: 'AI Decision History Details' },
        { key: 'accountabilityThirdParties', label: 'Audit AI Decisions' },
        { key: 'accountabilityThirdPartiesDetails', label: 'Audit AI Decisions Details' },
        { key: 'accountabilityResponsibleUse', label: 'AI Use Accountability' },
        { key: 'accountabilityResponsibleUseDetails', label: 'AI Use Accountability Details' },
        { key: 'accountabilityResponsiblePolicy', label: 'AI Policy Accountability' },
        { key: 'accountabilityResponsiblePolicyDetails', label: 'AI Policy Accountability Details' },
        { key: 'accountabilityResponsibleMonitoring', label: 'AI Monitoring Accountability' },
        { key: 'accountabilityResponsibleMonitoringDetails', label: 'AI Monitoring Accountability Details' },
        { key: 'accountabilityResponsibleDataGovernance', label: 'Data Governance Accountability' },
        { key: 'accountabilityResponsibleDataGovernanceDetails', label: 'Data Governance Accountability Details' },
        { key: 'accountabilityResponsibleTechnicalGovernance', label: 'Technical Solution Accountability' },
        { key: 'accountabilityResponsibleTechnicalGovernanceDetails', label: 'Technical Solution Accountability Details' },
        { key: 'accountabilityResponsibleAppealRedress', label: 'Appeal and Redress Accountability' },
        { key: 'accountabilityResponsibleAppealRedressDetails', label: 'Appeal and Redress Accountability Details' },
        { key: 'accountabilityInterventionProcess', label: 'Appeal and Redress Process' },
        { key: 'accountabilityInterventionProcessDetails', label: 'Appeal and Redress Process Details' },
        { key: 'accountabilityOverconfidenceProcess', label: 'Process Guarding Over-Reliance' },
        { key: 'accountabilityOverconfidenceProcessDetails', label: 'Process Guarding Over-Reliance Details' },

        // Risk Mitigation
        { key: 'elevatedRisk', label: 'Residual Risk Level' },
        { key: 'elevatedRiskDetails', label: 'Risk Mitigation Details' },
        
        // Procurement
        { key: 'procurementControls', label: 'Third Party Risk' },
        { key: 'procurementControlsDetails', label: 'Third Party Risk Details' },
        { key: 'procurementContractualClauses', label: 'Contractual Controls' },
        { key: 'procurementContractualClausesDetails', label: 'Contractual Controls Details' },
        { key: 'procurementSupplierQuestions', label: 'Supplier AI Transparency' },
        { key: 'procurementSupplierQuestionsDetails', label: 'Supplier AI Transparency Details' },
        { key: 'procurementResidualRiskFactors', label: 'Residual Risk Factors' },
        { key: 'procurementResidualRiskFactorsDetails', label: 'Residual Risk Factors Details' },
        { key: 'procurementSystemRequirements', label: 'System Requirements' },
        { key: 'procurementSystemRequirementsDetails', label: 'System Requirements Details' },
        { key: 'procurementRiskTreatments', label: 'Risk Control Coverage' },
        { key: 'procurementRiskTreatmentsDetails', label: 'Risk Control Coverage Details' }
    ]
    

    // Create header row
    const headerRow = columns.map(col => col.label);
    
    // Create data rows
    const dataRows = entries.map(entry => {
        return columns.map(col => {
            const value = entry[col.key];
            return value || '';
        });
    });

    return [sectionHeaders, headerRow, ...dataRows];
};
