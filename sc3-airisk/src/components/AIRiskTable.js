import React from "react";
import { exportAIRisksToExcel } from './ExcelExport';
import "./AIRisk.css";

const AIRiskTable = ({
  entries,
  setEntries,
  initialForm,
  setForm,
  setEditIndex,
  setSubmitted,
  setFieldsOpen,
  handleAddNewProcess,
  handleStartNew,
  moveRowUp,
  moveRowDown,
  handleRemove,
  setDraggedProcessIndex,
  draggedProcessIndex,
  setDropTargetIndex,
  dropTargetIndex,
  editIndex,
  handleMoveProcess,
  hoveredRowIndex,
  setHoveredRowIndex,
  handleRowClick
}) => {

  const handleExport = () => {
    exportAIRisksToExcel(entries);
  };

  const handleDragStart = (e, index) => {
    setDraggedProcessIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDropTargetIndex(index);
  };

  const handleDragLeave = () => {
    setDropTargetIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedProcessIndex !== null && draggedProcessIndex !== dropIndex) {
      handleMoveProcess(draggedProcessIndex, dropIndex);
    }
    setDraggedProcessIndex(null);
    setDropTargetIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedProcessIndex(null);
    setDropTargetIndex(null);
  };
  

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="air-table-outer-container">
      <div className="air-table-inner">
        <details className="air-table-section">
          <summary className="air-table-summary">
            🗃️ AI Risk Table           
            <span className="air-table-count">{entries.length} AI Risk Assessment{entries.length !== 1 ? 's' : ''}</span>
          </summary>
        </details>
        <div className="air-table-container">
          <div className="air-table-scroll">
            <table className="air-risk-table">
              <thead>
                <tr>
                  <th colSpan={17} className="air-th-group-risk-details">AI Risk Details</th>
                  <th colSpan={10} className="air-th-group-ai-assessment">AI Assessment Required?</th>
                  <th colSpan={10} className="air-th-group-human-rights">Human Rights Impact Assessment Required?</th>
                  <th colSpan={12} className="air-th-group-community-benefits">Community / Organisational Benefits</th>
                  <th colSpan={36} className="air-th-group-community-harms">Community / Organisational Harms</th>
                  <th colSpan={20} className="air-th-group-community-risks">Community / Organisational Risks</th>
                  <th colSpan={32} className="air-th-group-fairness">Fairness</th>
                  <th colSpan={30} className="air-th-group-privacy">Privacy and Security</th>
                  <th colSpan={20} className="air-th-group-transparency">Transparency</th>
                  <th colSpan={26} className="air-th-group-accountability">Accountability</th>
                  <th colSpan={2} className="air-th-group-risk-mitigation">Risk Mitigation</th>
                  <th colSpan={12} className="air-th-group-procurement">Procurement</th>
                </tr>
                <tr>
                  <th className="air-th-risk-details">Project / System Name</th>
                  <th className="air-th-risk-details">Project / System Description</th>
                  <th className="air-th-risk-details">Business Goals</th>
                  <th className="air-th-risk-details">Problem / Challenge</th>
                  <th className="air-th-risk-details">System Goals</th>
                  <th className="air-th-risk-details">AI Justification</th>
                  <th className="air-th-risk-details">Strategic Alignment</th>
                  <th className="air-th-risk-details">Project Sponsor</th>
                  <th className="air-th-risk-details">Executive Sponsor</th>
                  <th className="air-th-risk-details">Project Owner</th>
                  <th className="air-th-risk-details">Technical System Owner</th>
                  <th className="air-th-risk-details">Data Governance Owner</th>
                  <th className="air-th-risk-details">Project Phase</th>
                  <th className="air-th-risk-details">Assessed By</th>
                  <th className="air-th-risk-details">Contributors</th>
                  <th className="air-th-risk-details">Assessment Date</th>
                  <th className="air-th-risk-details">Next Review Date</th>
                  <th className="air-th-ai-assessment">Buying AI</th>
                  <th className="air-th-ai-assessment">Embedding AI</th>
                  <th className="air-th-ai-assessment">Developing AI</th>
                  <th className="air-th-ai-assessment">Automating Decisions</th>
                  <th className="air-th-ai-assessment">Impacts Administrative Decisions</th>
                  <th className="air-th-ai-assessment">Triggers Real World Action</th>
                  <th className="air-th-ai-assessment">Operates Autonomously</th>
                  <th className="air-th-ai-assessment">Data Sensitivity</th>
                  <th className="air-th-ai-assessment">Unintended Harms</th>
                  <th className="air-th-ai-assessment">Explainability</th>
                  <th className="air-th-human-rights">Algorithmic Decision</th>
                  <th className="air-th-human-rights">Algorithmic Decision Details</th>
                  <th className="air-th-human-rights">Trade Offs</th>
                  <th className="air-th-human-rights">Trade Offs Details</th>
                  <th className="air-th-human-rights">Restrict Human Rights</th>
                  <th className="air-th-human-rights">Restrict Human Rights Details</th>
                  <th className="air-th-human-rights">Suggestions</th>
                  <th className="air-th-human-rights">Suggestions Details</th>
                  <th className="air-th-human-rights">Autonomy</th>
                  <th className="air-th-human-rights">Autonomy Details</th>
                  <th className="air-th-community-benefits">Improved Quality</th>
                  <th className="air-th-community-benefits">Improved Quality Details</th>
                  <th className="air-th-community-benefits">Reduced Times</th>
                  <th className="air-th-community-benefits">Reduced Times Details</th>
                  <th className="air-th-community-benefits">Improved Financial Efficiency</th>
                  <th className="air-th-community-benefits">Improved Financial Efficiency Details</th>
                  <th className="air-th-community-benefits">Reusability</th>
                  <th className="air-th-community-benefits">Reusability Details</th>
                  <th className="air-th-community-benefits">New Service</th>
                  <th className="air-th-community-benefits">New Service Details</th>
                  <th className="air-th-community-benefits">Future Innovations</th>
                  <th className="air-th-community-benefits">Future Innovations Details</th>
                  <th className="air-th-community-harms">Physical Harm</th>
                  <th className="air-th-community-harms">Physical Harm Details</th>
                  <th className="air-th-community-harms">Psychological Harm</th>
                  <th className="air-th-community-harms">Psychological Harm Details</th>
                  <th className="air-th-community-harms">Environmental Harm</th>
                  <th className="air-th-community-harms">Environmental Harm Details</th>
                  <th className="air-th-community-harms">Unauthorised SIP</th>
                  <th className="air-th-community-harms">Unauthorised SIP Details</th>
                  <th className="air-th-community-harms">Rights</th>
                  <th className="air-th-community-harms">Rights Details</th>
                  <th className="air-th-community-harms">Misidentification</th>
                  <th className="air-th-community-harms">Misidentification Details</th>
                  <th className="air-th-community-harms">Fees, Fines, Penalties</th>
                  <th className="air-th-community-harms">Fees, Fines, Penalties Details</th>
                  <th className="air-th-community-harms">Financial Harm</th>
                  <th className="air-th-community-harms">Financial Harm Details</th>
                  <th className="air-th-community-harms">Incorrect Advice</th>
                  <th className="air-th-community-harms">Incorrect Advice Details</th>
                  <th className="air-th-community-harms">Inconvenience / Delay</th>
                  <th className="air-th-community-harms">Inconvenience / Delay Details</th>
                  <th className="air-th-community-harms">Erosion of Trust</th>
                  <th className="air-th-community-harms">Erosion of Trust Details</th>
                  <th className="air-th-community-harms">Ethical</th>
                  <th className="air-th-community-harms">Ethical Details</th>
                  <th className="air-th-community-harms">Economic</th>
                  <th className="air-th-community-harms">Economic Details</th>
                  <th className="air-th-community-harms">Social Inequality</th>
                  <th className="air-th-community-harms">Social Inequality Details</th>
                  <th className="air-th-community-harms">Other Harms</th>
                  <th className="air-th-community-harms">Other Harms Details</th>
                  <th className="air-th-community-harms">Reversible Harms</th>
                  <th className="air-th-community-harms">Reversible Harms Details</th>
                  <th className="air-th-community-harms">Irreversible Harms</th>
                  <th className="air-th-community-harms">Irreversible Harms Details</th>
                  <th className="air-th-community-harms">Secondary / Cumulative</th>
                  <th className="air-th-community-harms">Secondary / Cumulative Details</th>
                  <th className="air-th-community-risks">New or Existing Service</th>
                  <th className="air-th-community-risks">New or Existing Service Details</th>
                  <th className="air-th-community-risks">Discrimination / Unintended Bias</th>  
                  <th className="air-th-community-risks">Discrimination / Unintended Bias Details</th>
                  <th className="air-th-community-risks">Single Point of Failure</th>
                  <th className="air-th-community-risks">Single Point of Failure Details</th>
                  <th className="air-th-community-risks">Human Oversight</th>
                  <th className="air-th-community-risks">Human Oversight Details</th>
                  <th className="air-th-community-risks">Over Reliance / False Alert</th>
                  <th className="air-th-community-risks">Over Reliance / False Alert Details</th>
                  <th className="air-th-community-risks">Linkage Unclear</th>
                  <th className="air-th-community-risks">Linkage Unclear Details</th>
                  <th className="air-th-community-risks">Explainability</th>
                  <th className="air-th-community-risks">Explainability Details</th>
                  <th className="air-th-community-risks">Budget Overrun</th>
                  <th className="air-th-community-risks">Budget Overrun Details</th>
                  <th className="air-th-community-risks">Non-AI Systems</th>
                  <th className="air-th-community-risks">Non-AI Systems Details</th>
                  <th className="air-th-community-risks">Legislation Alignment</th>
                  <th className="air-th-community-risks">Legislation Alignment Details</th>
                  <th className="air-th-fairness">Inaccurate Data</th>
                  <th className="air-th-fairness">Inaccurate Data Details</th>
                  <th className="air-th-fairness">Undefined "Fairness"</th>
                  <th className="air-th-fairness">Undefined "Fairness" Details</th>
                  <th className="air-th-fairness">Unmonitored "Fairness"</th>
                  <th className="air-th-fairness">Unmonitored "Fairness" Details</th>
                  <th className="air-th-fairness">Excluding Outlier Data</th>
                  <th className="air-th-fairness">Excluding Outlier Data Details</th>
                  <th className="air-th-fairness">Inconsistent Data Cleansing</th>
                  <th className="air-th-fairness">Inconsistent Data Cleansing Details</th>
                  <th className="air-th-fairness">Informal Bias Detection</th>
                  <th className="air-th-fairness">Informal Bias Detection Details</th>
                  <th className="air-th-fairness">Reproducibility</th>
                  <th className="air-th-fairness">Reproducibility Details</th>
                  <th className="air-th-fairness">Inadvertant Linkages</th>
                  <th className="air-th-fairness">Inadvertant Linkages Details</th>
                  <th className="air-th-fairness">Training Data Differences</th>
                  <th className="air-th-fairness">Training Data Differences Details</th>
                  <th className="air-th-fairness">Data Justification</th>
                  <th className="air-th-fairness">Data Justification Details</th>
                  <th className="air-th-fairness">Data Quality</th>
                  <th className="air-th-fairness">Data Quality Details</th>
                  <th className="air-th-fairness">Representative Data</th>
                  <th className="air-th-fairness">Representative Data Details</th>
                  <th className="air-th-fairness">Diversity and Inclusion</th>
                  <th className="air-th-fairness">Diversity and Inclusion Details</th>
                  <th className="air-th-fairness">Minority Impact</th>
                  <th className="air-th-fairness">Minority Impact Details</th>
                  <th className="air-th-fairness">Performance Measures</th>
                  <th className="air-th-fairness">Performance Measures Details</th>
                  <th className="air-th-fairness">Monitoring Performance</th>
                  <th className="air-th-fairness">Monitoring Performance Details</th>
                  <th className="air-th-privacy">Children</th>
                  <th className="air-th-privacy">Children Details</th>
                  <th className="air-th-privacy">Religious Individuals</th>
                  <th className="air-th-privacy">Religious Individuals Details</th>
                  <th className="air-th-privacy">Ethnically Diverse</th>
                  <th className="air-th-privacy">Ethnically Diverse Details</th>
                  <th className="air-th-privacy">Political</th>
                  <th className="air-th-privacy">Political Details</th>
                  <th className="air-th-privacy">Trade Unions</th>
                  <th className="air-th-privacy">Trade Unions Details</th>
                  <th className="air-th-privacy">Gender / Sexual Diversity</th>
                  <th className="air-th-privacy">Gender / Sexual Diversity Details</th>
                  <th className="air-th-privacy">Criminal Record</th>
                  <th className="air-th-privacy">Criminal Record Details</th>
                  <th className="air-th-privacy">Health Data</th>
                  <th className="air-th-privacy">Health Data Details</th>
                  <th className="air-th-privacy">Biometric Data</th>
                  <th className="air-th-privacy">Biometric Data Details</th>
                  <th className="air-th-privacy">Other Sensitive Personal Data</th>
                  <th className="air-th-privacy">Other Sensitive Personal Data Details</th>
                  <th className="air-th-privacy">Privacy By Design</th>
                  <th className="air-th-privacy">Privacy By Design Details</th>
                  <th className="air-th-privacy">Privacy Impact Assessment</th>
                  <th className="air-th-privacy">Privacy Impact Assessment Details</th>
                  <th className="air-th-privacy">Consent</th>
                  <th className="air-th-privacy">Consent Details</th>
                  <th className="air-th-privacy">Security</th>
                  <th className="air-th-privacy">Security Details</th>
                  <th className="air-th-privacy">Sensitive Data</th>
                  <th className="air-th-privacy">Sensitive Data Details</th>
                  <th className="air-th-transparency">Documentation</th>
                  <th className="air-th-transparency">Documentation Details</th>
                  <th className="air-th-transparency">Black Box</th>
                  <th className="air-th-transparency">Black Box Details</th>
                  <th className="air-th-transparency">Output Explanation</th>
                  <th className="air-th-transparency">Output Explanation Details</th>
                  <th className="air-th-transparency">User AI Interaction Awareness</th>
                  <th className="air-th-transparency">User AI Interaction Awareness Details</th>
                  <th className="air-th-transparency">User Feedback</th>
                  <th className="air-th-transparency">User Feedback Details</th>
                  <th className="air-th-transparency">Decision Audit</th>
                  <th className="air-th-transparency">Decision Audit Details</th>
                  <th className="air-th-transparency">Community Consultation</th>
                  <th className="air-th-transparency">Community Consultation Details</th>
                  <th className="air-th-transparency">Scope and Goals Published</th>
                  <th className="air-th-transparency">Scope and Goals Published Details</th>
                  <th className="air-th-transparency">Appealing Decisions</th>
                  <th className="air-th-transparency">Appealing Decisions Details</th>
                  <th className="air-th-transparency">Explaining Decisions</th>
                  <th className="air-th-transparency">Explaining Decisions Details</th>
                  <th className="air-th-accountability">Training</th>
                  <th className="air-th-accountability">Training Details</th>
                  <th className="air-th-accountability">Limitation Awareness</th>
                  <th className="air-th-accountability">Limitation Awareness Details</th>
                  <th className="air-th-accountability">"Fairness" Documentation</th>
                  <th className="air-th-accountability">"Fairness" Documentation Details</th>
                  <th className="air-th-accountability">AI Decision History</th>
                  <th className="air-th-accountability">AI Decision History Details</th>
                  <th className="air-th-accountability">Audit AI Decisions</th>
                  <th className="air-th-accountability">Audit AI Decisions Details</th>
                  <th className="air-th-accountability">AI Use Accountability</th>
                  <th className="air-th-accountability">AI Use Accountability Details</th>
                  <th className="air-th-accountability">AI Policy Accountability</th>
                  <th className="air-th-accountability">AI Policy Accountability Details</th>
                  <th className="air-th-accountability">AI Monitoring Accountability</th>
                  <th className="air-th-accountability">AI Monitoring Accountability Details</th>
                  <th className="air-th-accountability">Data Governance Accountability</th>
                  <th className="air-th-accountability">Data Governance Accountability Details</th>
                  <th className="air-th-accountability">Technical Solution Accountability</th>
                  <th className="air-th-accountability">Technical Solution Accountability Details</th>
                  <th className="air-th-accountability">Appeal and Redress Accountability</th>
                  <th className="air-th-accountability">Appeal and Redress Accountability Details</th>
                  <th className="air-th-accountability">Appeal and Redress Process</th>
                  <th className="air-th-accountability">Appeal and Redress Process Details</th>
                  <th className="air-th-accountability">Process Guarding Over-Reliance</th>
                  <th className="air-th-accountability">Process Guarding Over-Reliance Details</th>
                  <th className="air-th-risk-mitigation">Residual Risk Level</th>
                  <th className="air-th-risk-mitigation">Risk Mitigation Details</th>
                  <th className="air-th-procurement">Third Party Risk</th>
                  <th className="air-th-procurement">Third Party Risk Details</th>
                  <th className="air-th-procurement">Contractual Controls</th>
                  <th className="air-th-procurement">Contractual Controls Details</th>
                  <th className="air-th-procurement">Supplier AI Transparency</th>
                  <th className="air-th-procurement">Supplier AI Transparency Details</th>
                  <th className="air-th-procurement">Residual Risks</th>
                  <th className="air-th-procurement">Residual Risks Details</th>
                  <th className="air-th-procurement">System Requirements</th>
                  <th className="air-th-procurement">System Requirements Details</th>
                  <th className="air-th-procurement">Risk Control Coverage</th>
                  <th className="air-th-procurement">Risk Control Coverage Details</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`air-table-row 
                      ${dropTargetIndex === index ? 'air-table-row-drop-target' : ''} 
                      ${editIndex === index ? 'air-table-row-editing' : ''} 
                      ${hoveredRowIndex === index ? 'air-table-row-hover' : ''}`}
                    onClick={() => handleRowClick(index)}
                    onMouseEnter={() => setHoveredRowIndex(index)}
                    onMouseLeave={() => setHoveredRowIndex(null)}
                    title={editIndex === index ? 
                      `Currently editing: ${entry.processId} - ${entry.processName} (click to save changes)` : 
                      `${entry.processId} - ${entry.processName} (click to edit this entry)`
                    }
                  >
                    {/* AI Risk Details */}
                    <td className="air-td-risk-details">{entry.projectName || ''}</td>
                    <td className="air-td-risk-details">{entry.projectDescription || ''}</td>
                    <td className="air-td-risk-details">{entry.businessGoals || ''}</td>
                    <td className="air-td-risk-details">{entry.problemChallenge || ''}</td>
                    <td className="air-td-risk-details">{entry.systemGoals || ''}</td>
                    <td className="air-td-risk-details">{entry.aiJustification || ''}</td>
                    <td className="air-td-risk-details">{entry.strategicAlignment || ''}</td>
                    <td className="air-td-risk-details">{entry.projectSponsor || ''}</td>
                    <td className="air-td-risk-details">{entry.executiveSponsor || ''}</td>
                    <td className="air-td-risk-details">{entry.projectOwner || ''}</td>
                    <td className="air-td-risk-details">{entry.technicalSystemOwner || ''}</td>
                    <td className="air-td-risk-details">{entry.dataGovernanceOwner || ''}</td>
                    <td className="air-td-risk-details">{entry.projectPhase || ''}</td>
                    <td className="air-td-risk-details">{entry.assessedBy || ''}</td>
                    <td className="air-td-risk-details">{entry.contributors || ''}</td>
                    <td className="air-td-risk-details">{entry.assessmentDate || ''}</td>
                    <td className="air-td-risk-details">{entry.nextReviewDate || ''}</td>
                    {/* AI Assessment Required */}
                    <td className="air-td-ai-assessment">{entry.buyAI || ''}</td>
                    <td className="air-td-ai-assessment">{entry.embedAI || ''}</td>
                    <td className="air-td-ai-assessment">{entry.developAI || ''}</td>
                    <td className="air-td-ai-assessment">{entry.automatingDecisions || ''}</td>
                    <td className="air-td-ai-assessment">{entry.impactsAdministrativeDecisions || ''}</td>
                    <td className="air-td-ai-assessment">{entry.triggersRealWorldAction || ''}</td>
                    <td className="air-td-ai-assessment">{entry.operatesAutonomously || ''}</td>
                    <td className="air-td-ai-assessment">{entry.dataSensitivity || ''}</td>
                    <td className="air-td-ai-assessment">{entry.unintendedHarms || ''}</td>
                    <td className="air-td-ai-assessment">{entry.explainability || ''}</td>
                    {/* Human Rights Assessment */}
                    <td className="air-td-human-rights">{entry.humanRightsAlgorithmicDecision || ''}</td>
                    <td className="air-td-human-rights">{entry.humanRightsAlgorithmicDecisionDetails || ''}</td>
                    <td className="air-td-human-rights">{entry.humanRightsTradeOffs || ''}</td>
                    <td className="air-td-human-rights">{entry.humanRightsTradeOffsDetails || ''}</td>
                    <td className="air-td-human-rights">{entry.humanRightsImpact || ''}</td>
                    <td className="air-td-human-rights">{entry.humanRightsImpactDetails || ''}</td>
                    <td className="air-td-human-rights">{entry.humanRightsSuggestions || ''}</td>
                    <td className="air-td-human-rights">{entry.humanRightsSuggestionsDetails || ''}</td>
                    <td className="air-td-human-rights">{entry.humanRightsAutonomy || ''}</td>
                    <td className="air-td-human-rights">{entry.humanRightsAutonomyDetails || ''}</td>
                    {/* Community Benefits */}
                    <td className="air-td-community-benefits">{entry.communityBenefitsQuality || ''}</td>
                    <td className="air-td-community-benefits">{entry.communityBenefitsQualityDetails || ''}</td>
                    <td className="air-td-community-benefits">{entry.communityBenefitsProcessing || ''}</td>
                    <td className="air-td-community-benefits">{entry.communityBenefitsProcessingDetails || ''}</td>
                    <td className="air-td-community-benefits">{entry.communityBenefitsFinancial || ''}</td>
                    <td className="air-td-community-benefits">{entry.communityBenefitsFinancialDetails || ''}</td>
                    <td className="air-td-community-benefits">{entry.communityBenefitsAdaptable || ''}</td>
                    <td className="air-td-community-benefits">{entry.communityBenefitsAdaptableDetails || ''}</td>
                    <td className="air-td-community-benefits">{entry.communityBenefitsNewService || ''}</td>
                    <td className="air-td-community-benefits">{entry.communityBenefitsNewServiceDetails || ''}</td>
                    <td className="air-td-community-benefits">{entry.communityBenefitsInnovation || ''}</td>
                    <td className="air-td-community-benefits">{entry.communityBenefitsInnovationDetails || ''}</td>
                    {/* Community Harms */}
                    <td className="air-td-community-harms">{entry.communityHarmsPhysicalConfidenceLevel || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsPhysicalConfidenceLevelDetails || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsPsychologicalConfidenceLevel || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsPsychologicalConfidenceLevelDetails || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsEnvironmentalConfidenceLevel || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsEnvironmentalConfidenceLevelDetails || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsUnauthorisedUseConfidenceLevel || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsUnauthorisedUseConfidenceLevelDetails || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsImpactOnRightsConfidenceLevel || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsImpactOnRightsConfidenceLevelDetails || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsMisidentificationConfidenceLevel || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsMisidentificationConfidenceLevelDetails || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsMisapplicationConfidenceLevel || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsMisapplicationConfidenceLevelDetails || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsOtherFinancialImpactConfidenceLevel || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsOtherFinancialImpactConfidenceLevelDetails || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsIncorrectAdviceConfidenceLevel || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsIncorrectAdviceConfidenceLevelDetails || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsInconvenienceDelayConfidenceLevel || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsInconvenienceDelayConfidenceLevelDetails || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsErosionOfTrustConfidenceLevel || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsErosionOfTrustConfidenceLevelDetails || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsEthicalImplicationsConfidenceLevel || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsEthicalImplicationsConfidenceLevelDetails || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsEconomicDisruptionConfidenceLevel || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsEconomicDisruptionConfidenceLevelDetails || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsSocialInequalityConfidenceLevel || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsSocialInequalityConfidenceLevelDetails || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsOtherConfidenceLevel || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsOtherConfidenceLevelDetails || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsReversibleConfidenceLevel || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsReversibleConfidenceLevelDetails || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsIrreversibleConfidenceLevel || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsIrreversibleConfidenceLevelDetails || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsSecondaryCumulativeConfidenceLevel || ''}</td>
                    <td className="air-td-community-harms">{entry.communityHarmsSecondaryCumulativeConfidenceLevelDetails || ''}</td>
                    {/* Community Risks */}
                    <td className="air-td-community-risks">{entry.communityRisksNewOrExistingService || ''}</td>
                    <td className="air-td-community-risks">{entry.communityRisksNewOrExistingServiceDetails || ''}</td>
                    <td className="air-td-community-risks">{entry.communityRisksDiscriminationUnintendedBias || ''}</td>
                    <td className="air-td-community-risks">{entry.communityRisksDiscriminationUnintendedBiasDetails || ''}</td>
                    <td className="air-td-community-risks">{entry.communityRisksSinglePointOfFailure || ''}</td>
                    <td className="air-td-community-risks">{entry.communityRisksSinglePointOfFailureDetails || ''}</td>
                    <td className="air-td-community-risks">{entry.communityRisksHumanOversight || ''}</td>
                    <td className="air-td-community-risks">{entry.communityRisksHumanOversightDetails || ''}</td>
                    <td className="air-td-community-risks">{entry.communityRisksOverRelianceFalseAlert || ''}</td>
                    <td className="air-td-community-risks">{entry.communityRisksOverRelianceFalseAlertDetails || ''}</td>
                    <td className="air-td-community-risks">{entry.communityRisksLinkageUnclear || ''}</td>
                    <td className="air-td-community-risks">{entry.communityRisksLinkageUnclearDetails || ''}</td>
                    <td className="air-td-community-risks">{entry.communityRisksExplainability || ''}</td>
                    <td className="air-td-community-risks">{entry.communityRisksExplainabilityDetails || ''}</td>
                    <td className="air-td-community-risks">{entry.communityRisksBudgetOverrun || ''}</td>
                    <td className="air-td-community-risks">{entry.communityRisksBudgetOverrunDetails || ''}</td>
                    <td className="air-td-community-risks">{entry.communityRisksNonAISystems || ''}</td>
                    <td className="air-td-community-risks">{entry.communityRisksNonAISystemsDetails || ''}</td>
                    <td className="air-td-community-risks">{entry.communityRisksInformationCompliance || ''}</td>
                    <td className="air-td-community-risks">{entry.communityRisksInformationComplianceDetails || ''}</td>
                    {/* Fairness */}
                    <td className="air-td-fairness">{entry.fairnessRisksIncompleteData || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessRisksIncompleteDataDetails || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessRisksPoorlyDefined || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessRisksPoorlyDefinedDetails || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessRisksNoMonitoring || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessRisksNoMonitoringDetails || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessRisksOutlierData || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessRisksOutlierDataDetails || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessRisksDataCleansing || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessRisksDataCleansingDetails || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessRisksBiasDetection || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessRisksBiasDetectionDetails || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessRisksReproducibility || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessRisksReproducibilityDetails || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessRisksDataLinking || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessRisksDataLinkingDetails || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessRisksTrainingData || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessRisksTrainingDataDetails || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessControlsDataSelection || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessControlsDataSelectionDetails || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessControlsDataAvailability || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessControlsDataAvailabilityDetails || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessControlsDataPopulation || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessControlsDataPopulationDetails || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessControlsDiversityInclusion || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessControlsDiversityInclusionDetails || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessControlsGenderMinority || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessControlsGenderMinorityDetails || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessControlsPerformanceMeasures || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessControlsPerformanceMeasuresDetails || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessControlsPerformanceCalibration || ''}</td>
                    <td className="air-td-fairness">{entry.fairnessControlsPerformanceCalibrationDetails || ''}</td>
                    {/* Privacy and Security */}
                    <td className="air-td-privacy">{entry.privacyControlsSensitiveChildren || ''}</td>
                    <td className="air-td-privacy">{entry.privacyControlsSensitiveChildrenDetails || ''}</td>
                    <td className="air-td-privacy">{entry.privacyControlsSensitiveReligious || ''}</td>
                    <td className="air-td-privacy">{entry.privacyControlsSensitiveReligiousDetails || ''}</td>
                    <td className="air-td-privacy">{entry.privacyControlsSensitiveRacial || ''}</td>
                    <td className="air-td-privacy">{entry.privacyControlsSensitiveRacialDetails || ''}</td>
                    <td className="air-td-privacy">{entry.privacyControlsSensitivePolitical || ''}</td>
                    <td className="air-td-privacy">{entry.privacyControlsSensitivePoliticalDetails || ''}</td>
                    <td className="air-td-privacy">{entry.privacyControlsSensitiveUnion || ''}</td>
                    <td className="air-td-privacy">{entry.privacyControlsSensitiveUnionDetails || ''}</td>
                    <td className="air-td-privacy">{entry.privacyControlsSensitiveGender || ''}</td>
                    <td className="air-td-privacy">{entry.privacyControlsSensitiveGenderDetails || ''}</td>   
                    <td className="air-td-privacy">{entry.privacyControlsSensitiveCriminalRecord || ''}</td>
                    <td className="air-td-privacy">{entry.privacyControlsSensitiveCriminalRecordDetails || ''}</td>
                    <td className="air-td-privacy">{entry.privacyControlsSensitiveHealth || ''}</td>
                    <td className="air-td-privacy">{entry.privacyControlsSensitiveHealthDetails || ''}</td>
                    <td className="air-td-privacy">{entry.privacyControlsSensitiveBiometric || ''}</td>
                    <td className="air-td-privacy">{entry.privacyControlsSensitiveBiometricDetails || ''}</td>
                    <td className="air-td-privacy">{entry.privacyControlsSensitiveOtherData || ''}</td>
                    <td className="air-td-privacy">{entry.privacyControlsSensitiveOtherDataDetails || ''}</td>
                    <td className="air-td-privacy">{entry.privacyByDesign || ''}</td>
                    <td className="air-td-privacy">{entry.privacyByDesignDetails || ''}</td>
                    <td className="air-td-privacy">{entry.privacyImpactAssessment || ''}</td>
                    <td className="air-td-privacy">{entry.privacyImpactAssessmentDetails || ''}</td>
                    <td className="air-td-privacy">{entry.privacyControlsConsent || ''}</td>
                    <td className="air-td-privacy">{entry.privacyControlsConsentDetails || ''}</td>
                    <td className="air-td-privacy">{entry.privacyControlsCyberSecurity || ''}</td>
                    <td className="air-td-privacy">{entry.privacyControlsCyberSecurityDetails || ''}</td>
                    <td className="air-td-privacy">{entry.privacyControlsSensitiveData || ''}</td>
                    <td className="air-td-privacy">{entry.privacyControlsSensitiveDataDetails || ''}</td>
                    {/* Transparency */}
                    <td className="air-td-transparency">{entry.transparencyPurpose || ''}</td>
                    <td className="air-td-transparency">{entry.transparencyPurposeDetails || ''}</td>
                    <td className="air-td-transparency">{entry.transparencyDataSources || ''}</td>
                    <td className="air-td-transparency">{entry.transparencyDataSourcesDetails || ''}</td>
                    <td className="air-td-transparency">{entry.transparencyDataUsage || ''}</td>
                    <td className="air-td-transparency">{entry.transparencyDataUsageDetails || ''}</td>
                    <td className="air-td-transparency">{entry.transparencyPublicAwareness || ''}</td>
                    <td className="air-td-transparency">{entry.transparencyPublicAwarenessDetails || ''}</td>
                    <td className="air-td-transparency">{entry.transparencyUserFeedback || ''}</td>
                    <td className="air-td-transparency">{entry.transparencyUserFeedbackDetails || ''}</td>
                    <td className="air-td-transparency">{entry.transparencyAuditability || ''}</td>
                    <td className="air-td-transparency">{entry.transparencyAuditabilityDetails || ''}</td>
                    <td className="air-td-transparency">{entry.transparencyConsultation || ''}</td>
                    <td className="air-td-transparency">{entry.transparencyConsultationDetails || ''}</td>
                    <td className="air-td-transparency">{entry.transparencyScopeGoals || ''}</td>
                    <td className="air-td-transparency">{entry.transparencyScopeGoalsDetails || ''}</td>
                    <td className="air-td-transparency">{entry.transparencyRightToAppeal || ''}</td>
                    <td className="air-td-transparency">{entry.transparencyRightToAppealDetails || ''}</td>
                    <td className="air-td-transparency">{entry.transparencyClearExplanations || ''}</td>
                    <td className="air-td-transparency">{entry.transparencyClearExplanationsDetails || ''}</td>
                    {/* Accountability */}
                    <td className="air-td-accountability">{entry.accountabilityTraining || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityTrainingDetails || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityAwareness || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityAwarenessDetails || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityDocumentation || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityDocumentationDetails || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityDecisionHistory || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityDecisionHistoryDetails || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityThirdParties || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityThirdPartiesDetails || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityResponsibleUse || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityResponsibleUseDetails || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityResponsiblePolicy || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityResponsiblePolicyDetails || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityResponsibleMonitoring || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityResponsibleMonitoringDetails || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityResponsibleDataGovernance || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityResponsibleDataGovernanceDetails || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityResponsibleTechnicalGovernance || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityResponsibleTechnicalGovernanceDetails || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityResponsibleAppealRedress || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityResponsibleAppealRedressDetails || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityInterventionProcess || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityInterventionProcessDetails || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityOverconfidenceProcess || ''}</td>
                    <td className="air-td-accountability">{entry.accountabilityOverconfidenceProcessDetails || ''}</td>
                    {/* Risk Mitigation */}
                    <td className="air-td-risk-mitigation">{entry.elevatedRisk || ''}</td>
                    <td className="air-td-risk-mitigation">{entry.elevatedRiskDetails || ''}</td>
                    {/* Procurement */}
                    <td className="air-td-procurement">{entry.procurementControls || ''}</td>
                    <td className="air-td-procurement">{entry.procurementControlsDetails || ''}</td>
                    <td className="air-td-procurement">{entry.procurementContractualClauses || ''}</td>
                    <td className="air-td-procurement">{entry.procurementContractualClausesDetails || ''}</td>
                    <td className="air-td-procurement">{entry.procurementSupplierQuestions || ''}</td>
                    <td className="air-td-procurement">{entry.procurementSupplierQuestionsDetails || ''}</td>
                    <td className="air-td-procurement">{entry.procurementResidualRiskFactors || ''}</td>
                    <td className="air-td-procurement">{entry.procurementResidualRiskFactorsDetails || ''}</td>
                    <td className="air-td-procurement">{entry.procurementSystemRequirements || ''}</td>
                    <td className="air-td-procurement">{entry.procurementSystemRequirementsDetails || ''}</td>
                    <td className="air-td-procurement">{entry.procurementRiskTreatments || ''}</td>
                    <td className="air-td-procurement">{entry.procurementRiskTreatmentsDetails || ''}</td>                   
                      
                    {/* Action buttons */}
                    <td className="air-action-cell">
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); moveRowUp(index); }}
                        disabled={index === 0}
                        className="air-action-button"
                        title="Move Up"
                      >▲</button>
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); moveRowDown(index); }}
                        disabled={index === entries.length - 1}
                        className="air-action-button"
                        title="Move Down"
                      >▼</button>
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); handleRemove(index); }}
                        className="air-action-button air-action-button-remove"
                        title="Remove Entry"
                      >🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p></p>
          </div>
        </div>       
        {/* Button row: Create New Entry and Export to Excel */}
        <div className="air-table-button-container">
          <button
            type="button"
            onClick={handleAddNewProcess}
            className="air-btn air-btn-outline-secondary"
          >
            + Add New Process
          </button>
          <button
            type="button"
            onClick={handleStartNew}
            className="air-btn air-btn-outline-primary"
          >
            🗑️ Start New
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="air-btn air-btn-accent"
          >
            📊 Export to Excel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIRiskTable;
