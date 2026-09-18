import React, { useEffect } from "react";
import "./AIRisk.css";
import { RiskLevelUtils } from "./AIRiskForm";

// Tooltip functionality
const addTooltipListeners = () => {
  // Remove existing tooltip if any
  const existingTooltip = document.querySelector('.air-report-tooltip');
  if (existingTooltip) {
    existingTooltip.remove();
  }

  // Add event listeners to all donut segments
  const segments = document.querySelectorAll('.air-report-donut-segment');
  
  segments.forEach(segment => {
    segment.addEventListener('mouseenter', (e) => {
      const tooltip = document.createElement('div');
      tooltip.className = 'air-report-tooltip';
      tooltip.textContent = e.target.getAttribute('data-tooltip');
      document.body.appendChild(tooltip);
      
      const moveTooltip = (event) => {
        tooltip.style.left = event.pageX + 10 + 'px';
        tooltip.style.top = event.pageY - 10 + 'px';
      };
      
      moveTooltip(e);
      segment.addEventListener('mousemove', moveTooltip);
      
      segment._moveTooltip = moveTooltip; // Store reference for cleanup
    });
    
    segment.addEventListener('mouseleave', (e) => {
      const tooltip = document.querySelector('.air-report-tooltip');
      if (tooltip) {
        tooltip.remove();
      }
      if (segment._moveTooltip) {
        segment.removeEventListener('mousemove', segment._moveTooltip);
        delete segment._moveTooltip;
      }
    });
  });
};

// Project Phase Donut Chart Component
const ProjectPhaseDonut = ({ entries }) => {
  // Calculate project phase distribution
  const phaseDistribution = {};
  entries.forEach(entry => {
    const phase = entry.projectPhase || 'Not Specified';
    phaseDistribution[phase] = (phaseDistribution[phase] || 0) + 1;
  });

  const total = entries.length;
  const phases = Object.entries(phaseDistribution);
  
  // Generate donut segments
  let cumulativePercentage = 0;
  const segments = phases.map(([phase, count], index) => {
    const percentage = (count / total) * 100;
    const startAngle = cumulativePercentage * 3.6; // Convert percentage to degrees
    const endAngle = (cumulativePercentage + percentage) * 3.6;
    
    // Create SVG path for the arc
    const centerX = 100;
    const centerY = 100;
    const radius = 80;
    const innerRadius = 50;
    
    const startAngleRad = (startAngle - 90) * (Math.PI / 180);
    const endAngleRad = (endAngle - 90) * (Math.PI / 180);
    
    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);
    
    const x3 = centerX + innerRadius * Math.cos(endAngleRad);
    const y3 = centerY + innerRadius * Math.sin(endAngleRad);
    const x4 = centerX + innerRadius * Math.cos(startAngleRad);
    const y4 = centerY + innerRadius * Math.sin(startAngleRad);
    
    const largeArcFlag = percentage > 50 ? 1 : 0;
    
    let pathData;
    if (phases.length === 1) {
      // Single segment - create full donut using proper donut path
      pathData = `M ${centerX - radius} ${centerY}
                  A ${radius} ${radius} 0 1 1 ${centerX + radius} ${centerY}
                  A ${radius} ${radius} 0 1 1 ${centerX - radius} ${centerY}
                  M ${centerX - innerRadius} ${centerY}
                  A ${innerRadius} ${innerRadius} 0 1 0 ${centerX + innerRadius} ${centerY}
                  A ${innerRadius} ${innerRadius} 0 1 0 ${centerX - innerRadius} ${centerY}
                  Z`;
    } else {
      // Multiple segments - create arc path
      pathData = [
        `M ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `L ${x3} ${y3}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
        'Z'
      ].join(' ');
    }
    
    cumulativePercentage += percentage;
    
    const colors = [
      '#003366', '#0099cc', '#388e3c', '#fbc02d', '#ff6f00', 
      '#7b1fa2', '#00695c', '#303f9f', '#c62828', '#455a64'
    ];
    
    return {
      path: pathData,
      color: colors[index % colors.length],
      phase,
      count,
      percentage: Math.round(percentage * 10) / 10
    };
  });

  return (
    <div className="air-report-donut-wrapper">
      <svg width="200" height="200" viewBox="0 0 200 200">
        {segments.map((segment, index) => (
          <g key={index}>
            <path
              d={segment.path}
              fill={segment.color}
              className="air-report-donut-segment"
              data-tooltip={`${segment.phase}: ${segment.count} (${segment.percentage}%)`}
            />
          </g>
        ))}
        <text x="100" y="100" textAnchor="middle" dy="0.3em" className="air-report-donut-center-text">
          {total} Total
        </text>
      </svg>
      <div className="air-report-donut-legend">
        {segments.map((segment, index) => (
          <div key={index} className="air-report-legend-item">
            <div 
              className="air-report-legend-color" 
              style={{ backgroundColor: segment.color }}
            ></div>
            <span className="air-report-legend-text">
              {segment.phase} ({segment.count})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Risk Level Donut Chart Component
const RiskLevelDonut = ({ riskDistribution, getRiskLevelText, getRiskLevelClass }) => {
  // Filter out zero counts and calculate distribution
  const filteredDistribution = Object.entries(riskDistribution)
    .filter(([_, count]) => count > 0)
    .map(([level, count]) => ({ level: parseInt(level), count }))
    .sort((a, b) => b.level - a.level); // Sort by risk level descending

  const total = filteredDistribution.reduce((sum, item) => sum + item.count, 0);
  
  // Generate donut segments
  let cumulativePercentage = 0;
  const segments = filteredDistribution.map((item, index) => {
    const percentage = (item.count / total) * 100;
    const startAngle = cumulativePercentage * 3.6;
    const endAngle = (cumulativePercentage + percentage) * 3.6;
    
    // Create SVG path for the arc
    const centerX = 100;
    const centerY = 100;
    const radius = 80;
    const innerRadius = 50;
    
    const startAngleRad = (startAngle - 90) * (Math.PI / 180);
    const endAngleRad = (endAngle - 90) * (Math.PI / 180);
    
    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);
    
    const x3 = centerX + innerRadius * Math.cos(endAngleRad);
    const y3 = centerY + innerRadius * Math.sin(endAngleRad);
    const x4 = centerX + innerRadius * Math.cos(startAngleRad);
    const y4 = centerY + innerRadius * Math.sin(startAngleRad);
    
    const largeArcFlag = percentage > 50 ? 1 : 0;
    
    let pathData;
    if (filteredDistribution.length === 1) {
      // Single segment - create full donut using proper donut path
      pathData = [
        `M ${centerX - radius} ${centerY}`,
        `A ${radius} ${radius} 0 1 1 ${centerX + radius} ${centerY}`,
        `A ${radius} ${radius} 0 1 1 ${centerX - radius} ${centerY}`,
        `M ${centerX - innerRadius} ${centerY}`,
        `A ${innerRadius} ${innerRadius} 0 1 0 ${centerX + innerRadius} ${centerY}`,
        `A ${innerRadius} ${innerRadius} 0 1 0 ${centerX - innerRadius} ${centerY}`,
        'Z'
      ].join(' ');
    } else {
      // Multiple segments - create arc path
      pathData = [
        `M ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `L ${x3} ${y3}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
        'Z'
      ].join(' ');
    }
    
    cumulativePercentage += percentage;
    
    // Risk level colors
    const riskColors = {
      6: '#c62828', // Very High - Red
      5: '#ff6f00', // High - Orange  
      4: '#fbc02d', // Mid-range - Yellow
      3: '#388e3c', // Low - Green
      2: '#00695c', // Very Low - Teal
      1: '#757575'  // N/A - Gray
    };
    
    return {
      path: pathData,
      color: riskColors[item.level] || '#757575',
      level: item.level,
      count: item.count,
      percentage: Math.round(percentage * 10) / 10,
      text: getRiskLevelText(item.level)
    };
  });

  return (
    <div className="air-report-donut-wrapper">
      <svg width="200" height="200" viewBox="0 0 200 200">
        {segments.map((segment, index) => (
          <g key={index}>
            <path
              d={segment.path}
              fill={segment.color}
              className="air-report-donut-segment"
              data-tooltip={`${segment.text}: ${segment.count} (${segment.percentage}%)`}
            />
          </g>
        ))}
        <text x="100" y="100" textAnchor="middle" dy="0.3em" className="air-report-donut-center-text">
          {total} Risks
        </text>
      </svg>
      <div className="air-report-donut-legend">
        {segments.map((segment, index) => (
          <div key={index} className="air-report-legend-item">
            <div 
              className="air-report-legend-color" 
              style={{ backgroundColor: segment.color }}
            ></div>
            <span className="air-report-legend-text">
              {segment.text} ({segment.count})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AIRiskReport = ({ entries = [] }) => {
  // Add tooltip functionality when component mounts or updates
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      addTooltipListeners();
    }, 100);
    
    return () => {
      clearTimeout(timer);
      // Clean up any existing tooltips
      const tooltip = document.querySelector('.air-report-tooltip');
      if (tooltip) {
        tooltip.remove();
      }
    };
  }, [entries]); // Re-run when entries change

  if (entries.length === 0) {
    return null;
  }

  // Calculate aggregate statistics
  const getAggregateStats = () => {
    if (entries.length === 0) {
      return {
        totalEntries: 0,
        riskAssessmentCompletion: 0,
        overallCompletion: 0,
        highestRiskLevel: 0,
        sectionStats: {},
        riskDistribution: {},
        highPrioritySections: [],
        lowPrioritySections: []
      };
    }

    let totalRiskFields = 0;
    let completedRiskFields = 0;
    let totalAllFields = 0;
    let completedAllFields = 0;
    let maxRiskLevel = 0;
    const riskDistribution = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    
    // Get field groups by section from centralised utility (now ordered by priority)
    const riskAssessmentFields = RiskLevelUtils.getSectionFields(); // Only risk scoring fields
    const allFields = RiskLevelUtils.getAllFields(); // Risk + descriptive fields
    const sectionStats = {};

    // Define high-priority sections (core risk assessment)
    const highPrioritySections = [
      'Community Harms', 'Community Benefits', 'Community Risks', 
      'Fairness', 'Privacy & Security', 'Transparency', 'Accountability', 'Risk Mitigation'
    ];
    
    // Define qualification sections (separate from risk assessment)
    const qualificationSections = ['AI Assessment', 'Human Rights'];
    
    // Define benefit sections (separate from risk assessment)
    const benefitSections = ['Community Benefits'];

    // Initialise section stats (exclude qualification and benefit sections from main risk assessment)
    Object.keys(riskAssessmentFields).forEach(section => {
      sectionStats[section] = {
        totalRiskFields: riskAssessmentFields[section].length,
        totalAllFields: allFields[section].length,
        completedRiskFields: 0,
        completedAllFields: 0,
        riskAssessmentCompletion: 0,
        overallCompletion: 0,
        highestRisk: 0,
        isHighPriority: highPrioritySections.includes(section),
        isQualification: qualificationSections.includes(section),
        isBenefit: benefitSections.includes(section),
        entries: []
      };
    });

    // Process each entry
    entries.forEach((entry, entryIndex) => {
      Object.keys(riskAssessmentFields).forEach(section => {
        let sectionCompletedRisk = 0;
        let sectionCompletedAll = 0;
        let sectionMaxRisk = 0;
        
        const isQualificationSection = qualificationSections.includes(section);
        const isBenefitSection = benefitSections.includes(section);

        // Count risk assessment field completion and calculate risk levels
        riskAssessmentFields[section].forEach(field => {
          // Only include true risk assessment sections in main totals (exclude qualification and benefit sections)
          if (!isQualificationSection && !isBenefitSection) {
            totalRiskFields++;
          }
          const value = entry[field];
          
          if (value && value.toString().trim() !== '') {
            if (!isQualificationSection && !isBenefitSection) {
              completedRiskFields++;
            }
            sectionCompletedRisk++;
          }

          // Calculate risk level using centralised utility (benefits don't contribute to risk)
          let riskLevel = 0;
          if (!isBenefitSection) {
            riskLevel = RiskLevelUtils.getRiskLevel(field, value);
          }
          if (riskLevel > sectionMaxRisk) {
            sectionMaxRisk = riskLevel;
          }
          if (riskLevel > maxRiskLevel) {
            maxRiskLevel = riskLevel;
          }
          // Only include true risk assessment sections in risk distribution
          if (riskLevel > 0 && !isQualificationSection && !isBenefitSection) { 
            riskDistribution[riskLevel] = (riskDistribution[riskLevel] || 0) + 1;
          }
        });

        // Count overall field completion (risk + descriptive)
        allFields[section].forEach(field => {
          // Only include true risk assessment sections in main totals (exclude qualification and benefit sections)
          if (!isQualificationSection && !isBenefitSection) {
            totalAllFields++;
          }
          const value = entry[field];
          
          if (value && value.toString().trim() !== '') {
            if (!isQualificationSection && !isBenefitSection) {
              completedAllFields++;
            }
            sectionCompletedAll++;
          }
        });

        sectionStats[section].completedRiskFields += sectionCompletedRisk;
        sectionStats[section].completedAllFields += sectionCompletedAll;
        sectionStats[section].riskAssessmentCompletion = Math.round(
          (sectionStats[section].completedRiskFields / (sectionStats[section].totalRiskFields * entries.length)) * 100
        );
        sectionStats[section].overallCompletion = Math.round(
          (sectionStats[section].completedAllFields / (sectionStats[section].totalAllFields * entries.length)) * 100
        );
        if (sectionMaxRisk > sectionStats[section].highestRisk) {
          sectionStats[section].highestRisk = sectionMaxRisk;
        }
        sectionStats[section].entries.push({
          entryIndex,
          riskAssessmentCompletion: Math.round((sectionCompletedRisk / riskAssessmentFields[section].length) * 100),
          overallCompletion: Math.round((sectionCompletedAll / allFields[section].length) * 100),
          riskLevel: sectionMaxRisk
        });
      });
    });

    return {
      totalEntries: entries.length,
      riskAssessmentCompletion: Math.round((completedRiskFields / totalRiskFields) * 100),
      overallCompletion: Math.round((completedAllFields / totalAllFields) * 100),
      highestRiskLevel: maxRiskLevel,
      sectionStats,
      riskDistribution,
      totalRiskFields,
      completedRiskFields,
      totalAllFields,
      completedAllFields,
      highPrioritySections: Object.entries(sectionStats).filter(([_, data]) => data.isHighPriority && !data.isQualification && !data.isBenefit),
      lowPrioritySections: Object.entries(sectionStats).filter(([_, data]) => !data.isHighPriority && !data.isQualification && !data.isBenefit),
      qualificationSections: Object.entries(sectionStats).filter(([_, data]) => data.isQualification),
      benefitSections: Object.entries(sectionStats).filter(([_, data]) => data.isBenefit)
    };
  };

  const stats = getAggregateStats();

  const getRiskLevelClass = (level) => {
    return RiskLevelUtils.getRiskLevelClass(level);
  };

  const getRiskLevelText = (level) => {
    return RiskLevelUtils.getRiskLevelText(level);
  };

  if (entries.length === 0) {
    return (
      <div className="air-report-container">
        <details className="air-report-details">
          <summary className="air-report-summary">
            📊 AI Risk Assessment Report
          </summary>
          <div className="air-report-content">
            <p>No assessment entries available for reporting. Complete some assessments to see aggregate data.</p>
          </div>
        </details>
      </div>
    );
  }

  return (
    <div className="air-report-container">
      <details className="air-report-details">
        <summary className="air-report-summary">
          📊 AIR Report ({stats.totalEntries} {stats.totalEntries === 1 ? 'Entry' : 'Entries'})
        </summary>
        
        <div className="air-report-content">
          {/* Overall Statistics */}
          <div className="air-report-section">
            <h3 className="air-report-title">📈 AI Risk Assessment Report</h3>
            <div className="air-report-stats-grid">
              <div className="air-report-stat">
                <div className="air-report-stat-value">{stats.totalEntries}</div>
                <div className="air-report-stat-label">Total Assessments</div>
              </div>
              <div className="air-report-stat">
                <div className="air-report-stat-value">{stats.riskAssessmentCompletion}%</div>
                <div className="air-report-stat-label">Risk Assessment Completion</div>
              </div>
              <div className="air-report-stat">
                <div className="air-report-stat-value">{stats.overallCompletion}%</div>
                <div className="air-report-stat-label">Overall Form Completion</div>
              </div>
              <div className="air-report-stat">
                <div className={`air-report-stat-value ${getRiskLevelClass(stats.highestRiskLevel)}`}>
                  {getRiskLevelText(stats.highestRiskLevel)}
                </div>
                <div className="air-report-stat-label">Highest Risk Level</div>
              </div>
              <div className="air-report-stat">
                <div className="air-report-stat-value">{stats.completedRiskFields}/{stats.totalRiskFields}</div>
                <div className="air-report-stat-label">Risk Fields Completed</div>
              </div>
              <div className="air-report-stat">
                <div className="air-report-stat-value">{stats.completedAllFields}/{stats.totalAllFields}</div>
                <div className="air-report-stat-label">All Fields Completed</div>
              </div>
            </div>
          </div>

          {/* Donut Charts Section */}
          <div className="air-report-section">
            <h3>📊 Distribution Charts</h3>
            <div className="air-report-charts-container">
              
              {/* Project Phase Distribution */}
              <div className="air-report-chart-wrapper">
                <h4>Project Phase Distribution</h4>
                <div className="air-report-donut-container">
                  {entries.length === 0 ? (
                    <div className="air-report-no-data">No data available</div>
                  ) : (
                    <ProjectPhaseDonut entries={entries} />
                  )}
                </div>
              </div>

              {/* Risk Level Distribution */}
              <div className="air-report-chart-wrapper">
                <h4>Risk Level Distribution</h4>
                <div className="air-report-donut-container">
                  {Object.values(stats.riskDistribution).reduce((a, b) => a + b, 0) === 0 ? (
                    <div className="air-report-no-data">No risk data available</div>
                  ) : (
                    <RiskLevelDonut riskDistribution={stats.riskDistribution} getRiskLevelText={getRiskLevelText} getRiskLevelClass={getRiskLevelClass} />
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Section-by-Section Analysis */}
          <div className="air-report-section">
            <h3>📋 Section Analysis</h3>
            
            {/* High Priority Sections */}
            <div className="air-report-priority-group">
              <h4 className="air-report-priority-title">🎯 High Priority Risk Assessment Areas</h4>
              <div className="air-report-sections">
                {stats.highPrioritySections.map(([sectionName, sectionData]) => (
                  <div key={sectionName} className="air-report-section-item air-report-section-high-priority">
                    <div className="air-report-section-header">
                      <h4>
                        <span className="air-report-priority-indicator">🔥</span>
                        {sectionName}
                        {sectionName === 'Risk Mitigation' && (
                          <span className="air-report-residual-risk-label"> (Residual Risk)</span>
                        )}
                      </h4>
                      <div className="air-report-section-badges">
                        <span className="air-report-completion-badge">
                          Risk: {sectionData.riskAssessmentCompletion}%
                        </span>
                        <span className="air-report-completion-badge air-report-completion-badge-secondary">
                          Overall: {sectionData.overallCompletion}%
                        </span>
                        <span className={`air-report-risk-badge ${getRiskLevelClass(sectionData.highestRisk)}`}>
                          {getRiskLevelText(sectionData.highestRisk)} Risk
                        </span>
                      </div>
                    </div>
                    <div className="air-report-section-details">
                      <div className="air-report-progress-container">
                        <div className="air-report-progress-label">Risk Assessment Completion:</div>
                        <div className="air-report-progress-bar">
                          <div 
                            className="air-report-progress-fill" 
                            style={{ width: `${sectionData.riskAssessmentCompletion}%` }}
                          ></div>
                        </div>
                        <div className="air-report-progress-label">Overall Form Completion:</div>
                        <div className="air-report-progress-bar">
                          <div 
                            className="air-report-progress-fill air-report-progress-fill-secondary" 
                            style={{ width: `${sectionData.overallCompletion}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="air-report-section-summary">
                        Risk Assessment: {sectionData.completedRiskFields} of {sectionData.totalRiskFields * stats.totalEntries} fields completed<br/>
                        Overall: {sectionData.completedAllFields} of {sectionData.totalAllFields * stats.totalEntries} fields completed
                        {sectionName === 'Risk Mitigation' && (
                          <div className="air-report-mitigation-note">
                            <strong>Note:</strong> Risk Mitigation assesses residual risk after all controls and mitigations are applied.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Low Priority Sections */}
            <div className="air-report-priority-group">
              <h4 className="air-report-priority-title">📋 Supporting Assessment Areas</h4>
              <div className="air-report-sections">
                {stats.lowPrioritySections.map(([sectionName, sectionData]) => {
                  // Calculate procurement risk for Procurement section
                  let procurementStats = null;
                  if (sectionName === 'Procurement') {
                    const procurementFields = RiskLevelUtils.getSectionFields()['Procurement'] || [];
                    let entriesWithProcurementRisk = 0;
                    let entriesWithoutProcurementRisk = 0;
                    let entriesIncomplete = 0;

                    entries.forEach(entry => {
                      let hasProcurementRisk = false;
                      let hasAnyAnswers = false;
                      let allFieldsAnswered = true;
                      
                      procurementFields.forEach(field => {
                        const value = entry[field];
                        if (!value || value.toString().trim() === '') {
                          allFieldsAnswered = false;
                        } else {
                          hasAnyAnswers = true;
                          // Get risk level for procurement fields
                          const riskLevel = RiskLevelUtils.getRiskLevel(field, value);
                          if (riskLevel >= 4) { // Medium-High or above indicates procurement risk
                            hasProcurementRisk = true;
                          }
                        }
                      });

                      if (!hasAnyAnswers || !allFieldsAnswered) {
                        entriesIncomplete++;
                      } else if (hasProcurementRisk) {
                        entriesWithProcurementRisk++;
                      } else {
                        entriesWithoutProcurementRisk++;
                      }
                    });

                    procurementStats = {
                      entriesWithProcurementRisk,
                      entriesWithoutProcurementRisk,
                      entriesIncomplete,
                      totalAssessed: entriesWithProcurementRisk + entriesWithoutProcurementRisk
                    };
                  }

                  return (
                    <div key={sectionName} className="air-report-section-item air-report-section-low-priority">
                      <div className="air-report-section-header">
                        <h4>
                          <span className="air-report-priority-indicator">📝</span>
                          {sectionName}
                          {sectionName === 'Procurement' && (
                            <span className="air-report-procurement-label"> (Procurement Risk)</span>
                          )}
                        </h4>
                        <div className="air-report-section-badges">
                          <span className="air-report-completion-badge">
                            Risk: {sectionData.riskAssessmentCompletion}%
                          </span>
                          <span className="air-report-completion-badge air-report-completion-badge-secondary">
                            Overall: {sectionData.overallCompletion}%
                          </span>
                          <span className={`air-report-risk-badge ${getRiskLevelClass(sectionData.highestRisk)}`}>
                            {getRiskLevelText(sectionData.highestRisk)} Risk
                          </span>
                          {procurementStats && procurementStats.totalAssessed > 0 && (
                            <span className="air-report-completion-badge air-report-procurement-risk">
                              At Risk: {procurementStats.entriesWithProcurementRisk}/{procurementStats.totalAssessed}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="air-report-section-details">
                        <div className="air-report-progress-container">
                          <div className="air-report-progress-label">Risk Assessment Completion:</div>
                          <div className="air-report-progress-bar">
                            <div 
                              className="air-report-progress-fill" 
                              style={{ width: `${sectionData.riskAssessmentCompletion}%` }}
                            ></div>
                          </div>
                          <div className="air-report-progress-label">Overall Form Completion:</div>
                          <div className="air-report-progress-bar">
                            <div 
                              className="air-report-progress-fill air-report-progress-fill-secondary" 
                              style={{ width: `${sectionData.overallCompletion}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="air-report-section-summary">
                          Risk Assessment: {sectionData.completedRiskFields} of {sectionData.totalRiskFields * stats.totalEntries} fields completed<br/>
                          Overall: {sectionData.completedAllFields} of {sectionData.totalAllFields * stats.totalEntries} fields completed
                          
                          {procurementStats && (
                            <div className="air-report-procurement-breakdown">
                              <strong>Procurement Risk Analysis:</strong>
                              <ul className="air-report-procurement-list">
                                <li className="air-report-procurement-risk-high">
                                  <span className="air-report-procurement-icon">🔴</span>
                                  <span><strong>{procurementStats.entriesWithProcurementRisk}</strong> {procurementStats.entriesWithProcurementRisk === 1 ? 'project at' : 'projects at'} procurement risk (medium-high risk or above)</span>
                                </li>
                                <li className="air-report-procurement-risk-low">
                                  <span className="air-report-procurement-icon">🟢</span>
                                  <span><strong>{procurementStats.entriesWithoutProcurementRisk}</strong> {procurementStats.entriesWithoutProcurementRisk === 1 ? 'project expected' : 'projects expected'} to be procurement compliant (low risk)</span>
                                </li>
                                {procurementStats.entriesIncomplete > 0 && (
                                  <li className="air-report-procurement-incomplete">
                                    <span className="air-report-procurement-icon">⚪</span>
                                    <span><strong>{procurementStats.entriesIncomplete}</strong> {procurementStats.entriesIncomplete === 1 ? 'assessment incomplete' : 'assessments incomplete'} (cannot determine procurement risk)</span>
                                  </li>
                                )}
                              </ul>
                              {procurementStats.totalAssessed > 0 && (
                                <div className="air-report-procurement-percentage">
                                  <strong>{Math.round((procurementStats.entriesWithProcurementRisk / procurementStats.totalAssessed) * 100)}%</strong> of assessed {procurementStats.totalAssessed === 1 ? 'project has' : 'projects have'} procurement risk concerns
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Qualification/Eligibility Sections */}
            <div className="air-report-priority-group">
              <h4 className="air-report-priority-title">✅ Qualification & Eligibility Checks</h4>
              <div className="air-report-sections">
                {stats.qualificationSections && stats.qualificationSections.map(([sectionName, sectionData]) => {
                  // Calculate HRIA requirements for Human Rights section
                  let hriaStats = null;
                  if (sectionName === 'Human Rights') {
                    const humanRightsFields = RiskLevelUtils.getAllFields()['Human Rights'] || [];
                    let entriesRequiringHRIA = 0;
                    let entriesNotRequiringHRIA = 0;
                    let entriesIncomplete = 0;

                    entries.forEach(entry => {
                      let hasAnyYes = false;
                      let hasAllAnswers = true;
                      
                      humanRightsFields.forEach(field => {
                        const value = entry[field];
                        if (!value || value.toString().trim() === '') {
                          hasAllAnswers = false;
                        } else if (value.toLowerCase() === 'yes') {
                          hasAnyYes = true;
                        }
                      });

                      if (!hasAllAnswers) {
                        entriesIncomplete++;
                      } else if (hasAnyYes) {
                        entriesRequiringHRIA++;
                      } else {
                        entriesNotRequiringHRIA++;
                      }
                    });

                    hriaStats = {
                      entriesRequiringHRIA,
                      entriesNotRequiringHRIA,
                      entriesIncomplete,
                      totalAssessed: entriesRequiringHRIA + entriesNotRequiringHRIA
                    };
                  }

                  return (
                    <div key={sectionName} className="air-report-section-item air-report-section-qualification">
                      <div className="air-report-section-header">
                        <h4>
                          <span className="air-report-priority-indicator">
                            {sectionName === 'AI Assessment' ? '🤖' : '⚖️'}
                          </span>
                          {sectionName}
                          <span className="air-report-qualification-label">
                            {sectionName === 'AI Assessment' ? ' (AI Usage Check)' : ' (HRIA Required?)'}
                          </span>
                        </h4>
                        <div className="air-report-section-badges">
                          <span className="air-report-completion-badge air-report-completion-badge-qualification">
                            Completed: {sectionData.overallCompletion}%
                          </span>
                          {hriaStats && hriaStats.totalAssessed > 0 && (
                            <span className="air-report-completion-badge air-report-hria-required">
                              HRIA Required: {hriaStats.entriesRequiringHRIA}/{hriaStats.totalAssessed}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="air-report-section-details">
                        <div className="air-report-progress-container">
                          <div className="air-report-progress-label">Section Completion:</div>
                          <div className="air-report-progress-bar">
                            <div 
                              className="air-report-progress-fill air-report-progress-fill-qualification" 
                              style={{ width: `${sectionData.overallCompletion}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="air-report-section-summary">
                          Qualification Check: {sectionData.completedAllFields} of {sectionData.totalAllFields * stats.totalEntries} questions answered
                          
                          {hriaStats && (
                            <div className="air-report-hria-breakdown">
                              <strong>HRIA Requirements Analysis:</strong>
                              <ul className="air-report-hria-list">
                                <li className="air-report-hria-required">
                                  <span className="air-report-hria-icon">🔴</span>
                                  <span><strong>{hriaStats.entriesRequiringHRIA}</strong> {hriaStats.entriesRequiringHRIA === 1 ? 'assessment requires' : 'assessments require'} HRIA (any "Yes" answers)</span>
                                </li>
                                <li className="air-report-hria-not-required">
                                  <span className="air-report-hria-icon">🟢</span>
                                  <span><strong>{hriaStats.entriesNotRequiringHRIA}</strong> {hriaStats.entriesNotRequiringHRIA === 1 ? 'assessment does' : 'assessments do'} not require HRIA (all "No" answers)</span>
                                </li>
                                {hriaStats.entriesIncomplete > 0 && (
                                  <li className="air-report-hria-incomplete">
                                    <span className="air-report-hria-icon">⚪</span>
                                    <span><strong>{hriaStats.entriesIncomplete}</strong> {hriaStats.entriesIncomplete === 1 ? 'assessment incomplete' : 'assessments incomplete'} (cannot determine HRIA requirement)</span>
                                  </li>
                                )}
                              </ul>
                              {hriaStats.totalAssessed > 0 && (
                                <div className="air-report-hria-percentage">
                                  <strong>{Math.round((hriaStats.entriesRequiringHRIA / hriaStats.totalAssessed) * 100)}%</strong> of completed {hriaStats.totalAssessed === 1 ? 'assessment requires' : 'assessments require'} HRIA
                                </div>
                              )}
                            </div>
                          )}
                          
                          <div className="air-report-qualification-note">
                            <strong>Note:</strong> {sectionName === 'AI Assessment' ? 
                              'This section determines if the AI risk assessment form should be completed.' :
                              'This section helps determine if a Human Rights Impact Assessment (HRIA) is required. Any "Yes" answer indicates HRIA may be needed.'
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Community Benefits Section */}
            <div className="air-report-priority-group">
              <h4 className="air-report-priority-title">🌟 Community Benefits Assessment</h4>
              <div className="air-report-sections">
                {stats.benefitSections && stats.benefitSections.map(([sectionName, sectionData]) => {
                  // Calculate benefit level distribution for Community Benefits section
                  let benefitStats = null;
                  if (sectionName === 'Community Benefits') {
                    const communityBenefitsFields = RiskLevelUtils.getAllFields()['Community Benefits'] || [];
                    const benefitDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
                    let entriesWithBenefits = 0;
                    let entriesIncomplete = 0;

                    entries.forEach(entry => {
                      let maxBenefitLevel = 0;
                      let hasAnyAnswers = false;
                      
                      communityBenefitsFields.forEach(field => {
                        const value = entry[field];
                        if (value && value.toString().trim() !== '') {
                          hasAnyAnswers = true;
                          // Get benefit level using centralised utility
                          const benefitLevel = RiskLevelUtils.getBenefitLevel ? RiskLevelUtils.getBenefitLevel(field, value) : 0;
                          if (benefitLevel > maxBenefitLevel) {
                            maxBenefitLevel = benefitLevel;
                          }
                        }
                      });

                      if (!hasAnyAnswers) {
                        entriesIncomplete++;
                      } else {
                        entriesWithBenefits++;
                        if (maxBenefitLevel > 0) {
                          benefitDistribution[maxBenefitLevel] = (benefitDistribution[maxBenefitLevel] || 0) + 1;
                        }
                      }
                    });

                    benefitStats = {
                      benefitDistribution,
                      entriesWithBenefits,
                      entriesIncomplete,
                      totalAssessed: entriesWithBenefits + entriesIncomplete
                    };
                  }

                  return (
                    <div key={sectionName} className="air-report-section-item air-report-section-benefit">
                      <div className="air-report-section-header">
                        <h4>
                          <span className="air-report-priority-indicator">🌟</span>
                          {sectionName}
                          <span className="air-report-benefit-label"> (Benefit Levels)</span>
                        </h4>
                        <div className="air-report-section-badges">
                          <span className="air-report-completion-badge air-report-completion-badge-benefit">
                            Completed: {sectionData.overallCompletion}%
                          </span>
                          {benefitStats && benefitStats.entriesWithBenefits > 0 && (
                            <span className="air-report-completion-badge air-report-benefit-assessed">
                              Assessed: {benefitStats.entriesWithBenefits}/{benefitStats.totalAssessed}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="air-report-section-details">
                        <div className="air-report-progress-container">
                          <div className="air-report-progress-label">Benefit Assessment Completion:</div>
                          <div className="air-report-progress-bar">
                            <div 
                              className="air-report-progress-fill air-report-progress-fill-benefit" 
                              style={{ width: `${sectionData.overallCompletion}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="air-report-section-summary">
                          Benefit Assessment: {sectionData.completedAllFields} of {sectionData.totalAllFields * stats.totalEntries} fields completed
                          
                          {benefitStats && benefitStats.entriesWithBenefits > 0 && (
                            <div className="air-report-benefit-breakdown">
                              <strong>Benefit Level Distribution:</strong>
                              <ul className="air-report-benefit-list">
                                {Object.entries(benefitStats.benefitDistribution)
                                  .filter(([_, count]) => count > 0)
                                  .sort(([a], [b]) => parseInt(b) - parseInt(a)) // Sort by benefit level descending
                                  .map(([level, count]) => {
                                    const benefitText = RiskLevelUtils.getBenefitLevelText ? RiskLevelUtils.getBenefitLevelText(parseInt(level)) : `Level ${level}`;
                                    const benefitClass = RiskLevelUtils.getBenefitLevelClass ? RiskLevelUtils.getBenefitLevelClass(parseInt(level)) : '';
                                    return (
                                      <li key={level} className={`air-report-benefit-level ${benefitClass}`}>
                                        <span className="air-report-benefit-icon">🌟</span>
                                        <span><strong>{count}</strong> {count === 1 ? 'assessment' : 'assessments'}: {benefitText}</span>
                                      </li>
                                    );
                                  })}
                                {benefitStats.entriesIncomplete > 0 && (
                                  <li className="air-report-benefit-incomplete">
                                    <span className="air-report-benefit-icon">⚪</span>
                                    <span><strong>{benefitStats.entriesIncomplete}</strong> {benefitStats.entriesIncomplete === 1 ? 'assessment incomplete' : 'assessments incomplete'} (no benefit rating available)</span>
                                  </li>
                                )}
                              </ul>
                              {benefitStats.entriesWithBenefits > 0 && (
                                <div className="air-report-benefit-summary">
                                  <strong>{benefitStats.entriesWithBenefits}</strong> out of {benefitStats.totalAssessed} {benefitStats.totalAssessed === 1 ? 'assessment has' : 'assessments have'} measurable community benefits
                                </div>
                              )}
                            </div>
                          )}
                          
                          <div className="air-report-benefit-note">
                            <strong>Note:</strong> This section measures community benefit levels (from very low to very high benefit), which is separate from risk assessment.
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Individual Entry Summary */}
          <div className="air-report-section">
            <h3>📄 Top Risk Entries Summary</h3>
            <div className="air-report-entries">
              {(() => {
                // Calculate risk levels and completion for each entry
                const entriesWithMetrics = entries.map((entry, index) => {
                  const allFieldsInEntry = RiskLevelUtils.getAllFields();
                  const riskFieldsInEntry = RiskLevelUtils.getSectionFields();
                  
                  let totalRiskFields = 0;
                  let completedRiskFields = 0;
                  let totalAllFields = 0;
                  let completedAllFields = 0;
                  let maxRiskLevel = 0;
                  
                  // Calculate risk fields and find highest risk
                  Object.values(riskFieldsInEntry).forEach(fields => {
                    totalRiskFields += fields.length;
                    fields.forEach(field => {
                      if (entry[field] && entry[field].toString().trim() !== '') {
                        completedRiskFields++;
                      }
                      // Get risk level for this field
                      const riskLevel = RiskLevelUtils.getRiskLevel(field, entry[field]);
                      if (riskLevel > maxRiskLevel) {
                        maxRiskLevel = riskLevel;
                      }
                    });
                  });
                  
                  // Calculate all fields
                  Object.values(allFieldsInEntry).forEach(fields => {
                    totalAllFields += fields.length;
                    fields.forEach(field => {
                      if (entry[field] && entry[field].toString().trim() !== '') {
                        completedAllFields++;
                      }
                    });
                  });
                  
                  const riskCompletion = Math.round((completedRiskFields / totalRiskFields) * 100) || 0;
                  const overallCompletion = Math.round((completedAllFields / totalAllFields) * 100) || 0;
                  
                  return {
                    entry,
                    index,
                    maxRiskLevel,
                    riskCompletion,
                    overallCompletion,
                    totalRiskFields,
                    completedRiskFields,
                    totalAllFields,
                    completedAllFields
                  };
                });

                // Sort by highest risk level first, then by risk completion percentage
                const sortedEntries = entriesWithMetrics.sort((a, b) => {
                  if (b.maxRiskLevel !== a.maxRiskLevel) {
                    return b.maxRiskLevel - a.maxRiskLevel; // Highest risk first
                  }
                  return b.riskCompletion - a.riskCompletion; // Then by completion
                });

                // Limit to top 10 entries (configurable)
                const maxEntriesToShow = 10;
                const limitedEntries = sortedEntries.slice(0, maxEntriesToShow);
                const hasMoreEntries = entries.length > maxEntriesToShow;

                return (
                  <>
                    {hasMoreEntries && (
                      <div className="air-report-entries-info">
                        Showing top {maxEntriesToShow} entries (out of {entries.length} total) ordered by highest risk level
                      </div>
                    )}
                    {limitedEntries.map((entryData) => {
                      const { entry, index, maxRiskLevel, riskCompletion, overallCompletion } = entryData;
                      
                      return (
                        <div key={index} className="air-report-entry-item">
                          <div className="air-report-entry-header">
                            <h5>
                              Assessment #{index + 1}
                              {maxRiskLevel > 0 && (
                                <span className={`air-report-entry-risk-badge ${getRiskLevelClass(maxRiskLevel)}`}>
                                  {getRiskLevelText(maxRiskLevel)} Risk
                                </span>
                              )}
                            </h5>
                            <div className="air-report-entry-meta">
                              <span className="air-report-entry-completion">Risk: {riskCompletion}%</span>
                              <span className="air-report-entry-completion air-report-entry-completion-secondary">
                                Overall: {overallCompletion}%
                              </span>
                              {entry.projectName && (
                                <span className="air-report-entry-name">"{entry.projectName}"</span>
                              )}
                              {entry.projectPhase && (
                                <span className="air-report-entry-phase">Phase: {entry.projectPhase}</span>
                              )}
                            </div>
                          </div>
                          <div className="air-report-entry-sections">
                            {Object.entries(stats.sectionStats).map(([sectionName, sectionData]) => {
                              const entryStatsData = sectionData.entries[index];
                              return (
                                <div key={sectionName} className="air-report-entry-section">
                                  <span className="air-report-entry-section-name">{sectionName}:</span>
                                  <div className="air-report-entry-section-completions">
                                    <span className="air-report-entry-section-completion">
                                      Risk: {entryStatsData.riskAssessmentCompletion}%
                                    </span>
                                    <span className="air-report-entry-section-completion">
                                      Overall: {entryStatsData.overallCompletion}%
                                    </span>
                                  </div>
                                  {entryStatsData.riskLevel > 0 && (
                                    <span className={`air-report-entry-risk ${getRiskLevelClass(entryStatsData.riskLevel)}`}>
                                      {getRiskLevelText(entryStatsData.riskLevel)}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                    {hasMoreEntries && (
                      <div className="air-report-more-entries">
                        <em>... and {entries.length - maxEntriesToShow} more entries with lower risk levels</em>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>

          {/* Recommendations */}
          <div className="air-report-section">
            <h3>💡 Recommendations</h3>
            <div className="air-report-recommendations">
              {stats.riskAssessmentCompletion < 80 && (
                <div className="air-report-recommendation warning">
                  <strong>⚠️ Low Risk Assessment Completion:</strong> Only {stats.riskAssessmentCompletion}% of risk assessment fields are completed. 
                  These fields are critical for accurate risk evaluation and should be prioritised.
                </div>
              )}
              {stats.overallCompletion < 60 && (
                <div className="air-report-recommendation info">
                  <strong>📝 Incomplete Documentation:</strong> Overall form completion is {stats.overallCompletion}%. 
                  Consider completing more descriptive fields for better documentation and audit trails.
                </div>
              )}
              {stats.highestRiskLevel >= 5 && (
                <div className="air-report-recommendation danger">
                  <strong>🚨 High Risk Detected:</strong> {getRiskLevelText(stats.highestRiskLevel)} risk level found. 
                  Review high-risk areas and implement appropriate mitigation strategies before proceeding.
                </div>
              )}
              {stats.highestRiskLevel <= 2 && stats.riskAssessmentCompletion >= 90 && (
                <div className="air-report-recommendation success">
                  <strong>✅ Good Risk Assessment Coverage:</strong> High completion rate with low risk levels. 
                  Continue monitoring and regular review processes.
                </div>
              )}
              {Object.entries(stats.sectionStats).filter(([_, data]) => data.riskAssessmentCompletion < 50).length > 0 && (
                <div className="air-report-recommendation warning">
                  <strong>🎯 Incomplete Risk Assessments:</strong> The following sections have low risk assessment completion: {
                    Object.entries(stats.sectionStats)
                      .filter(([_, data]) => data.riskAssessmentCompletion < 50)
                      .map(([name]) => name)
                      .join(', ')
                  }
                </div>
              )}
              {Object.entries(stats.sectionStats).filter(([_, data]) => data.overallCompletion < 30).length > 0 && (
                <div className="air-report-recommendation info">
                  <strong>📄 Poor Documentation:</strong> The following sections need better documentation: {
                    Object.entries(stats.sectionStats)
                      .filter(([_, data]) => data.overallCompletion < 30)
                      .map(([name]) => name)
                      .join(', ')
                  }
                </div>
              )}
              {(() => {
                // Calculate HRIA requirements for recommendations
                const humanRightsFields = RiskLevelUtils.getAllFields()['Human Rights'] || [];
                let entriesRequiringHRIA = 0;
                let totalCompleteHREntries = 0;

                entries.forEach(entry => {
                  let hasAnyYes = false;
                  let hasAllAnswers = true;
                  
                  humanRightsFields.forEach(field => {
                    const value = entry[field];
                    if (!value || value.toString().trim() === '') {
                      hasAllAnswers = false;
                    } else if (value.toLowerCase() === 'yes') {
                      hasAnyYes = true;
                    }
                  });

                  if (hasAllAnswers) {
                    totalCompleteHREntries++;
                    if (hasAnyYes) {
                      entriesRequiringHRIA++;
                    }
                  }
                });

                if (entriesRequiringHRIA > 0) {
                  return (
                    <div className="air-report-recommendation warning">
                      <strong>⚖️ HRIA Required:</strong> {entriesRequiringHRIA} out of {totalCompleteHREntries} assessed {entriesRequiringHRIA === 1 ? 'project requires' : 'projects require'} Human Rights Impact Assessment (HRIA). 
                      Ensure HRIA {entriesRequiringHRIA === 1 ? 'process is' : 'processes are'} initiated for {entriesRequiringHRIA === 1 ? 'this project' : 'these projects'} before proceeding.
                    </div>
                  );
                }
                
                if (totalCompleteHREntries > 0 && entriesRequiringHRIA === 0) {
                  return (
                    <div className="air-report-recommendation success">
                      <strong>✅ No HRIA Required:</strong> Based on completed Human Rights {totalCompleteHREntries === 1 ? 'assessment' : 'assessments'}, no {totalCompleteHREntries === 1 ? 'project currently requires' : 'projects currently require'} HRIA. 
                      Continue monitoring for changes that might trigger HRIA requirements.
                    </div>
                  );
                }
                
                return null;
              })()}
              {(() => {
                // Calculate procurement risk for recommendations
                const procurementFields = RiskLevelUtils.getSectionFields()['Procurement'] || [];
                let entriesWithProcurementRisk = 0;
                let totalCompleteProcurementEntries = 0;

                entries.forEach(entry => {
                  let hasProcurementRisk = false;
                  let hasAnyAnswers = false;
                  let allFieldsAnswered = true;
                  
                  procurementFields.forEach(field => {
                    const value = entry[field];
                    if (!value || value.toString().trim() === '') {
                      allFieldsAnswered = false;
                    } else {
                      hasAnyAnswers = true;
                      const riskLevel = RiskLevelUtils.getRiskLevel(field, value);
                      if (riskLevel >= 4) { // Medium-High or above indicates procurement risk
                        hasProcurementRisk = true;
                      }
                    }
                  });

                  if (hasAnyAnswers && allFieldsAnswered) {
                    totalCompleteProcurementEntries++;
                    if (hasProcurementRisk) {
                      entriesWithProcurementRisk++;
                    }
                  }
                });

                if (entriesWithProcurementRisk > 0) {
                  return (
                    <div className="air-report-recommendation warning">
                      <strong>🛒 Procurement Risk:</strong> {entriesWithProcurementRisk} out of {totalCompleteProcurementEntries} assessed {entriesWithProcurementRisk === 1 ? 'project has' : 'projects have'} procurement risk concerns. 
                      Review procurement {entriesWithProcurementRisk === 1 ? 'requirement' : 'requirements'} and consider additional compliance measures for {entriesWithProcurementRisk === 1 ? 'this project' : 'these projects'}.
                    </div>
                  );
                }
                
                if (totalCompleteProcurementEntries > 0 && entriesWithProcurementRisk === 0) {
                  return (
                    <div className="air-report-recommendation success">
                      <strong>✅ Procurement Compliant:</strong> Based on completed procurement {totalCompleteProcurementEntries === 1 ? 'assessment' : 'assessments'}, {totalCompleteProcurementEntries === 1 ? 'project appears' : 'projects appear'} to meet procurement requirements. 
                      Continue standard procurement processes with regular compliance monitoring.
                    </div>
                  );
                }
                
                return null;
              })()}
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};

export default AIRiskReport;
