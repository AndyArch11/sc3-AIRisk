import React, { useState } from "react";
import "./AIRisk.css";

const AIRiskIntro = () => {
    
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

    return (
        <details className="air-intro-details">
          <summary className="air-intro-summary">
            📚 AI Risk Assessment Guidance and Preparation
          </summary>

          <p><i>AI Risk Management</i> is a structured approach to controlling potential threats that emerge with the use of AI technologies. It involves identifying, assessing, and mitigating risks throughout the AI system lifecycle. Current risk frameworks and approaches do not adequately address the set of risks that AI systems bring.</p>
          <p>Generative AI in particular poses unique challenges and risks, including the potential for misuse, bias, misinformation, data exfiltration, and unintended consequences. Organisations must be proactive in addressing these risks through comprehensive risk management strategies.</p>
          <p><cite>Responsible AI helps align AI design, development, and uses with intended aim and values. It emphasises human centricity, social responsibility, and sustainability</cite> (NIST - paraphrased).</p>
          <p>Due to the potential impact on an organisation's reputation and operations that AI can have, AI governance is now an executive level leadership issue, not simply an operational one.</p>
          <div>
            <p>Also see:</p>
            <ul>
                <li><em><a href="https://www.iso.org/standard/77304.html" target="_blank" rel="noopener noreferrer" className="air-link">ISO/IEC 23894:2023</a></em>{" "} Information technology — Artificial intelligence — Guidance on risk management</li>
                <li><em><a href="https://www.iso.org/standard/65694.html" target="_blank" rel="noopener noreferrer" className="air-link">ISO/IEC 31000:2018</a></em>{" "} Risk management — Guidelines</li>
                <li><em><a href="https://www.iso.org/standard/56641.html" target="_blank" rel="noopener noreferrer" className="air-link">ISO/IEC 38507:2022</a></em>{" "} Information technology — Governance of IT — Governance implications of the use of artificial intelligence by organizations</li>
                <li><em><a href="https://www.iso.org/standard/42001" target="_blank" rel="noopener noreferrer" className="air-link">ISO/IEC 42001:2023</a></em>{" "} Information technology — Artificial intelligence — Management system</li>
                <li><em><a href="https://www.iso.org/standard/42005" target="_blank" rel="noopener noreferrer" className="air-link">ISO/IEC 42005:2025</a></em>{" "} Information technology — Artificial intelligence (AI) — AI system impact assessment</li>
                <li><em><a href="https://www.iso.org/standard/81118.html" target="_blank" rel="noopener noreferrer" className="air-link">ISO/IEC 5338:2023</a></em>{" "} Information technology — Artificial intelligence — AI system life cycle processes</li>
                <li><em><a href="https://www.iso.org/standard/81120.html" target="_blank" rel="noopener noreferrer" className="air-link">ISO/IEC 5339:2024</a></em>{" "} Information technology — Artificial intelligence — Guidance for AI applications</li>
                <li><em><a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noopener noreferrer" className="air-link">NIST AI RMF</a></em>{" "} AI Risk Management Framework</li>
                <li><em><a href="https://www.europarl.europa.eu/thinktank/en/document/EPRS_BRI(2021)698792" target="_blank" rel="noopener noreferrer" className="air-link">EU AI Act</a></em>{" "} European Union regulation on AI</li>
                <li><em><a href="https://www.digital.nsw.gov.au/policy/artificial-intelligence/nsw-artificial-intelligence-assessment-framework" target="_blank" rel="noopener noreferrer" className="air-link">NSW AIAF</a></em>{" "} Artificial Intelligence Assessment Framework</li>
                <li><em><a href="https://www.forgov.qld.gov.au/information-technology/queensland-government-enterprise-architecture-qgea/qgea-directions-and-guidance/qgea-policies-standards-and-guidelines/faira-framework" target="_blank" rel="noopener noreferrer" className="air-link">FAIRA</a></em>{" "} Queensland Govt Enterprise Architecture (QGEA) Foundational artificial intelligence risk assessment framework based on Australia's AI Ethics Principles</li>
            </ul>
            <p>Additional resources can be found at:</p>
            <ul>
                <li><em><a href="https://www.iso.org/standard/74296.html" target="_blank" rel="noopener noreferrer" className="air-link">ISO/IEC 22989:2022</a></em>{" "} Information technology — Artificial intelligence — Artificial intelligence concepts and terminology</li>s
                <li><em><a href="https://www.iso.org/standard/77608.html" target="_blank" rel="noopener noreferrer" className="air-link">ISO/IEC TR 24028:2020</a></em>{" "} Information technology — Artificial intelligence — Overview of trustworthiness in artificial intelligence</li>
                <li><em><a href="https://oecd.ai/en/ai-principles" target="_blank" rel="noopener noreferrer" className="air-link">OECD AI Principles</a></em>{" "} </li>
                <li><em><a href="https://standards.ieee.org/wp-content/uploads/import/documents/other/ead_v2.pdf" target="_blank" rel="noopener noreferrer" className="air-link">IEEE Ethically Aligned Design</a></em>{" "} </li>
                <li><em><a href="https://www.industry.gov.au/publications/australias-artificial-intelligence-ethics-principles/australias-ai-ethics-principles" target="_blank" rel="noopener noreferrer" className="air-link">Australia's AI Ethics Principles</a></em>{" "} </li>
                <li><em><a href="https://www.finance.gov.au/government/public-data/data-and-digital-ministers-meeting/national-framework-assurance-artificial-intelligence-government" target="_blank" rel="noopener noreferrer" className="air-link">National framework for the assurance of artificial intelligence in government</a></em>{" "} Australian Government national framework for AI</li>
                <li><em><a href="https://ovic.vic.gov.au/privacy/resources-for-organisations/artificial-intelligence-understanding-privacy-obligations/" target="_blank" rel="noopener noreferrer" className="air-link">AI - Understanding Privacy Obligations</a></em>{" "} Victorian Government Information Commissioner AI privacy guidance</li>
                <li><em><a href="https://www.treasury.sa.gov.au/Our-services/ict-digital-cyber-security/policies-and-guidelines/artificial-intelligence" target="_blank" rel="noopener noreferrer" className="air-link">Guideline for the use of Large Language Model AI Tools and Utilities</a></em>{" "} South Australian Government AI guidelines for LLMs</li>
                <li><em><a href="https://research.csiro.au/ss/science/projects/responsible-ai-pattern-catalogue/" target="_blank" rel="noopener noreferrer" className="air-link">CSIRO Responsible AI Pattern Catalogue</a></em>{" "} </li>
                <li><em><a href="https://www.digital.gov.au/policy/ai/risk-assessment" target="_blank" rel="noopener noreferrer" className="air-link">Risk assessment for use of AI</a></em>{" "} Australian Government AI Risk Matrix</li>
                <li><em><a href="https://www.microsoft.com/en-us/ai/tools-practices" target="_blank" rel="noopener noreferrer" className="air-link">Responsible AI Tools and Practices</a></em>{" "} Microsoft's Responsible AI Impact Assessment Template and tools</li>
                <li><em><a href="https://www.saif.google/secure-ai-framework" target="_blank" rel="noopener noreferrer" className="air-link">Google SAIF</a></em>{" "} Secure AI Framework</li>
                <li><em><a href="https://www.mitre.org/news-insights/publication/sensible-regulatory-framework-ai-security" target="_blank" rel="noopener noreferrer" className="air-link">MITRE - A Sensible Regulatory Framework for AI Security</a></em>{" "} </li>
                <li><em><a href="https://atlas.mitre.org/" target="_blank" rel="noopener noreferrer" className="air-link">MITRE Atlas</a></em>{" "} Adversarial Threat Landscape for Artificial Intelligence Systems</li>
            </ul>
            
            <h4>🧭 NIST AI RMF: Four Core Functions</h4>
            <ul>
                <li><strong>Govern:</strong> A culture of risk management is cultivated and present</li>
                <li><strong>Map:</strong> Context is recognised and risks related to context are identified</li>
                <li><strong>Measure:</strong> Identified risks are assessed, analysed, or tracked</li>
                <li><strong>Manage:</strong> Risks are prioritised and acted upon based on a projected impact</li>
            </ul>
            <p>NIST AI RMF characteristics of a trustworthy AI system:</p>
            <ul>
                <li><strong>Valid and Reliable:</strong> The system should perform as intended across a range of conditions, with minimal failure or inconsistency. This includes rigorous testing and validation during development and ongoing monitoring post-deployment.</li>
                <ul>
                    <li><strong>Safe:</strong> AI systems must operate without causing unintentional harm. This involves anticipating and preventing behaviours that could lead to accidents or system failures.</li>
                    <li><strong>Secure and Resilient:</strong> Systems should be robust against adversarial threats, tampering, and cyberattacks. This includes protections against data poisoning, model inversion, or unauthorized model manipulation.</li>
                    <li><strong>Explainable and Interpretable:</strong> Users and decision-makers must be able to interpret AI outputs and the rationale behind them. This is especially important in regulated industries or high-risk decision contexts.</li>
                    <li><strong>Privacy Enhanced:</strong> AI must respect data privacy throughout its lifecycle, incorporating methods like differential privacy, data minimisation, and secure data handling practices.</li>
                    <li><strong>Fair with Harmful Bias Managed:</strong> The system should avoid discriminatory outcomes by being tested and tuned to reduce bias across data, algorithms, and outputs.</li>
                </ul>
                <li><strong>Accountable and Transparent:</strong> Stakeholders should understand how decisions are made and be able to audit the system's design and outcomes. Transparency fosters accountability across the AI supply chain.</li>
            </ul>
            <p><em>Note:</em> Risk management should be continuous, timely, and performed throughout the AI system lifecycle dimensions. AI RMF Core functions should be carried out in a way that reflects diverse and multidisciplinary perspectives, potentially including the views of AI actors outside the organization.</p>

            <h4>🇦🇺 Australia's AI Ethics Principles</h4>
            <ul>
                <li><strong>Human, social and environmental wellbeing:</strong> AI systems should benefit individuals, society and the environment.</li>
                <li><strong>Human-centred values:</strong> AI systems should respect human rights, diversity, and the autonomy of individuals.</li>
                <li><strong>Fairness:</strong> AI systems should be inclusive and accessible, and should not involve or result in unfair discrimination against individuals, communities or groups.</li>
                <li><strong>Privacy protection and security:</strong> AI systems should respect and uphold privacy rights and data protection, and ensure the security of data.</li>
                <li><strong>Reliability and safety:</strong> AI systems should reliably operate in accordance with their intended purpose.</li>
                <li><strong>Transparency and explainability:</strong> There should be transparency and responsible disclosure so people can understand when they are being significantly impacted by AI, and can find out when an AI system is engaging with them.</li>
                <li><strong>Contestability:</strong> When an AI system significantly impacts a person, community, group or environment, there should be a timely process to allow people to challenge the use or outcomes of the AI system.</li>
                <li><strong>Accountability:</strong> People responsible for the different phases of the AI system lifecycle should be identifiable and accountable for the outcomes of the AI systems, and human oversight of AI systems should be enabled.</li>
            </ul>
            <p>Some of these characteristics may require trade-offs (e.g., between privacy and explainability), and organisations must carefully consider these trade-offs when designing and deploying AI systems.</p>

            <p>The NSW Ethical Principles for the use of AI is similar to the national one:</p>
            <ul>
                <li><strong>Community Benefit:</strong> AI must prioritise community outcomes, ensuring alignment with laws, minimising harm, and maximising benefit</li>
                <li><strong>Fairness:</strong> Use of AI will be fair, ensuring not to perpetuate bias and inequality by leveraging diverse representative datasets, monitoring performance, and using rigorous data governance</li>
                <li><strong>Privacy and Security:</strong> Ensure secure, transparent, compliant data use, and adhere to the NSW PPIP ACT preserving public trust</li>
                <li><strong>Transparency:</strong> The use of AI will be transparent, allowing concerns to be raised and addressed. NSW GIPA Act compliant, cyber secure and ethical</li>
                <li><strong>Accountability:</strong> Decision-making remains the responsibility of organisations and Responsible Offices</li>
            </ul>
            <p>The questions in the AI Risk Input form are based on the NSW AIAF with minor modifications to make it less government orientated</p>
            
            <p>Multiple Australian jurisdictions advise undertaking a Privacy Impact Assessment (PIA) when developing or deploying AI systems to identify and mitigate potential privacy risks.</p>

            <h4>🇪🇺 EU AI Act</h4>
            <p>Key features:</p>
            <ul>
                <li>Risk based classification of AI systems:</li>
                <ul>
                    <li><strong>Unacceptable Risk:</strong> Prohibited (e.g., cognitive behavioural manipulation, social scoring, real-time biometric surveillance)</li>
                    <li><strong>High Risk:</strong> Extensive compliance requirements such as risk controls, technical documentation, audits, registration (e.g., recruitment AI, credit scoring, medical, law, education, critical infrastructure)</li>
                    <li><strong>Limited Risk:</strong> Minimal compliance requirements such as transparency obligations (e.g., chatbots, content generators, basic deepfakes)</li>
                    <li><strong>Minimal Risk:</strong> Unregulated (e.g., AI-enabled video games, spam filters, basic analytics)</li>
                </ul>
                <li>People interacting with AI systems and AI generated content should be informed about the use of AI and its implications.</li>
                <li>Prohibition of certain AI practices deemed to pose unacceptable risks - e.g., social scoring by governments, real-time biometric identification in public spaces.</li>
                <li>Strict requirements for high-risk AI systems, including risk assessments, data governance, transparency, and human oversight.</li>
                <li>Creation of a European AI Board to facilitate implementation and enforcement of the regulation and to drive standards.</li>
            </ul>

            <h4>🔄 Framework Comparison and Alignment</h4>
            <div className="air-framework-comparison-table-wrapper">
                <div className="air-framework-comparison-table-scroll">
                    <table className="air-framework-comparison-table">
                        <thead>
                            <tr>
                                <th className="air-ai-risk-level-table-header">NIST AI RMF Characteristics</th>
                                <th className="air-ai-risk-level-table-header">EU AI Act Categories</th>
                                <th className="air-ai-risk-level-table-header">Australia's AI Ethics Principles</th>
                                <th className="air-ai-risk-level-table-header">NSW Ethical Principles</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="air-ai-risk-level-table-cell"><strong>Valid and Reliable</strong><br/>Performance as intended with minimal failure</td>
                                <td className="air-ai-risk-level-table-cell"><strong>High Risk Requirements</strong><br/>Technical documentation, audits, registration</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Reliability and Safety</strong><br/>Operate in accordance with intended purpose</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Community Benefit</strong><br/>Prioritise community outcomes, minimise harm</td>
                            </tr>
                            <tr>
                                <td className="air-ai-risk-level-table-cell"><strong>Safe</strong><br/>Operate without causing unintentional harm</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Prohibited Practices</strong><br/>Unacceptable risk AI systems banned</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Human, Social and Environmental Wellbeing</strong><br/>Benefit individuals, society and environment</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Community Benefit</strong><br/>Ensure alignment with laws, maximise benefit</td>
                            </tr>
                            <tr>
                                <td className="air-ai-risk-level-table-cell"><strong>Secure and Resilient</strong><br/>Robust against adversarial threats</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Risk Management</strong><br/>Security measures for high-risk systems</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Privacy Protection and Security</strong><br/>Uphold privacy rights and data protection</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Privacy and Security</strong><br/>Secure, transparent, compliant data use</td>
                            </tr>
                            <tr>
                                <td className="air-ai-risk-level-table-cell"><strong>Explainable and Interpretable</strong><br/>Users can interpret AI outputs and rationale</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Transparency Obligations</strong><br/>Disclosure requirements for AI interaction</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Transparency and Explainability</strong><br/>Understand when significantly impacted by AI</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Transparency</strong><br/>Allow concerns to be raised and addressed</td>
                            </tr>
                            <tr>
                                <td className="air-ai-risk-level-table-cell"><strong>Privacy Enhanced</strong><br/>Respect data privacy throughout lifecycle</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Data Governance</strong><br/>Requirements for data quality and management</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Privacy Protection and Security</strong><br/>Ensure security of data</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Privacy and Security</strong><br/>Adhere to the NSW PPIP Act, preserve public trust</td>
                            </tr>
                            <tr>
                                <td className="air-ai-risk-level-table-cell"><strong>Fair with Harmful Bias Managed</strong><br/>Avoid discriminatory outcomes</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Non-discrimination</strong><br/>Prevent biased outcomes in high-risk systems</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Fairness</strong><br/>Inclusive, accessible, no unfair discrimination</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Fairness</strong><br/>Prevent bias and inequality through diverse datasets</td>
                            </tr>
                            <tr>
                                <td className="air-ai-risk-level-table-cell"><strong>Accountable and Transparent</strong><br/>Understand decision-making, audit design</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Human Oversight</strong><br/>Required for high-risk AI systems</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Accountability</strong><br/>Identifiable responsibility for AI outcomes</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Accountability</strong><br/>Decision-making remains organisational responsibility</td>
                            </tr>
                            <tr>
                                <td className="air-ai-risk-level-table-cell"><strong>Govern Function</strong><br/>Culture of risk management</td>
                                <td className="air-ai-risk-level-table-cell"><strong>European AI Board</strong><br/>Governance and enforcement structure</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Human-centred Values</strong><br/>Respect human rights and autonomy</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Transparency</strong><br/>NSW GIPA Act compliant, cyber secure and ethical</td>
                            </tr>
                            <tr>
                                <td className="air-ai-risk-level-table-cell"><strong>Map, Measure, Manage</strong><br/>Identify, assess, and act on risks</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Risk Assessment</strong><br/>Mandatory for high-risk systems</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Contestability</strong><br/>Process to challenge AI use or outcomes</td>
                                <td className="air-ai-risk-level-table-cell"><strong>Community Benefit</strong><br/>Monitor performance and governance</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <p><em>Note:</em> While these frameworks use different terminology and approaches, they share common objectives around ensuring AI systems are safe, fair, transparent, accountable, and beneficial to society. Organizations should consider how these frameworks complement each other when developing AI governance strategies.</p>

            <BackToTopButton />
            <details>
                <summary className="air-intro-summary">
                ⚠️ AI Risk Considerations
                </summary>
                <div className="air-intro-card-container">
                    <h4>⚠️ Core Risks Associated with AI</h4>
                    <ul>
                        <li><strong>Bias and Discrimination:</strong> AI systems can inadvertently perpetuate or amplify biases present in training data, leading to unfair treatment of individuals or groups.
                            <ul>
                                <li><strong>Mitigation:</strong> Bias detection/correction, diverse datasets, inclusive design, monitor metrics and feedback for drift/bias.</li>
                            </ul>
                        </li>
                        <li><strong>Lack of Transparency:</strong> Many AI models operate as "black boxes," making it difficult to understand their decision-making processes and increasing the risk of unintended consequences.
                            <ul>
                                <li><strong>Mitigation:</strong> Explainable AI, interpretable models, visualization tools, clear documentation, stakeholder communication.</li>
                            </ul>
                        </li>
                        <li><strong>Data Privacy:</strong> AI systems often require large amounts of data, raising concerns about the privacy and security of sensitive information.
                            <ul>
                                <li><strong>Mitigation:</strong> Data minimisation, encryption, access controls, monitoring/logging, privacy audits, differential privacy, federated learning, filtering/obfuscation of PII, data masking, access controls, clear data rules, retention/deletion policies.</li>
                                <li><strong>Accountability:</strong> Clear frameworks, defined roles, staff training on ethics/risk/compliance.</li>
                            </ul>
                        </li>
                        <li><strong>Accountability:</strong> Determining who is responsible for the actions and decisions made by AI systems can be challenging, particularly in cases of harm or legal disputes.
                            <ul>
                                <li><strong>Mitigation:</strong> Clear lines of accountability, defined roles for developers/operators/users, tracking/reporting performance, remediation processes, user feedback/grievance mechanisms.</li>
                            </ul>
                        </li>
                        <li><strong>Regulatory Compliance:</strong> Ensuring AI systems comply with relevant laws, regulations, and industry standards is essential for mitigating legal and reputational risks.
                            <ul>
                                <li><strong>Mitigation:</strong> Stay informed on legal/regulatory developments, regular audits/assessments, reporting/handling violations, note EU AI Act fines.</li>
                            </ul>
                        </li>
                        <li><strong>Security Threats:</strong> AI systems can be vulnerable to various security threats, including adversarial attacks, data poisoning, and model inversion.
                            <ul>
                                <li><strong>Mitigation:</strong> Treat as critical systems, robust security (encryption, access controls, assessments), monitor access/logs, stay informed on threats, incident response plans.</li>
                            </ul>
                        </li>
                        <li><strong>Ethical Use:</strong> Ensuring AI systems are used ethically and responsibly is critical for maintaining trust and accountability.
                            <ul>
                                <li><strong>Mitigation:</strong> Clear ethical guidelines/principles, monitor/evaluate ethical implications, stakeholder engagement, human-in-the-loop accountability.</li>
                            </ul>
                        </li>
                    </ul>

                    <h4>💡Additional AI Risk Assessment Considerations</h4>
                    <ul>
                        <li><strong>Environmental Impact:</strong> Assess energy consumption and carbon footprint of AI systems, especially large models.</li>
                        <li><strong>Supply Chain Risks:</strong> Consider risks from third-party vendors, open-source components, and dependencies in the AI supply chain.</li>
                        <li><strong>Resilience & Business Continuity:</strong> Plan for AI system failures, disaster recovery, and maintaining operations during outages.</li>
                        <li><strong>Human Factors & Change Management:</strong> Address user adoption, training, resistance to change, and workforce impact.</li>
                        <li><strong>Explainability for Non-Technical Stakeholders:</strong> Ensure AI decisions can be explained to business users, regulators, and the public.</li>
                        <li><strong>Adversarial Robustness:</strong> Evaluate how AI systems handle adversarial inputs and attacks.</li>
                        <li><strong>Monitoring for Unintended Consequences:</strong> Track for emergent behaviours, misuse, or negative societal impacts over time.</li>
                        <li><strong>Interoperability & Integration:</strong> Consider how AI systems interact with existing IT infrastructure and other AI systems.</li>
                        <li><strong>End-of-Life Planning:</strong> Define processes for decommissioning AI systems, data retention, and knowledge transfer.</li>
                        <li><strong>User Consent & Awareness:</strong> Ensure users are informed when interacting with AI and consent to data usage.</li>
                        <li><strong>Localization & Cultural Sensitivity:</strong> Adapt AI systems for different languages, regions, and cultural contexts.</li>
                        <li><strong>Accessibility:</strong> Ensure AI systems are usable by people with disabilities.</li>
                        <li><strong>Reproducibility:</strong> Ensure AI models and results can be consistently reproduced.</li>
                        <li><strong>Stochasticity:</strong> Address the inherent randomness in AI model outputs and its implications for reliability and trust.</li>
                        <li><strong>Litigation Risks:</strong> Consider potential legal challenges and liabilities arising from AI system decisions and actions.</li>
                        <li><strong>Intellectual Property Risks:</strong> Assess risks related to copyright, patent infringement, and trade secrets in AI development and deployment.</li>
                        <li><strong>Vendor Risks:</strong> Evaluate risks associated with third-party vendors providing AI tools, data, or services.</li>
                        <li><strong>Embedded Risks:</strong> Consider risks related to using AI embedded within other applications or services.</li>
                        <li><strong>Trust Risks:</strong> Assess risks related to user trust in AI systems, including transparency, reliability, and ethical considerations.</li>
                        <li><strong>Capability Risks:</strong> Evaluate risks related to the expectations vs the limitations and capabilities of AI systems, including performance, scalability, and adaptability.</li>
                    </ul>

                    <h4>🕵️‍♂️ Most Common AI Risk Management Challenges</h4>
                    <ul>
                        <li><strong>Shadow AI:</strong> Unmanaged and uncontrolled AI systems operating outside official channels, bypassing corporate security and monitoring tools.</li>
                        <li><strong>Model Sprawl:</strong> Proliferation of multiple AI models without proper governance, leading to inconsistencies and increased risk. Each update may change behaviour or introduce new biases.</li>
                        <li><strong>Observability Gaps:</strong> Lack of visibility into AI decision-making and outcomes, plus the challenge of managing massive data volumes, making it hard to identify and address issues.</li>
                        <li><strong>Compliance Tracking Across Jurisdictions:</strong> Difficulty ensuring AI systems comply with varying regulations and standards across global markets and regions.</li>
                        <li><strong>Rate of Change:</strong> The rapid pace of AI development and deployment can outstrip an organization's ability to manage risks effectively.</li>
                    </ul>
                    <BackToTopButton />
                </div>
            </details>

            <h4>🛠️ Steps to Operationalise an AI Risk Framework</h4>
            <ol>
                <li><strong>🏛️ Establish Governance</strong>
                    <ul>
                        <li>Create a cross-functional AI governance group (executive sponsorship, IT, security, legal, compliance, ethics, privacy, business units)</li>
                        <li>Define roles and responsibilities for AI risk management</li>
                        <li>Develop and document AI risk management policies and procedures</li>
                        <li>Define AI risk tolerance levels and acceptance criteria</li>
                        <li>Define what AI tools employees can and can't use</li>
                        <li>Specify data allowed for training and inference</li>
                        <li>Define acceptable and prohibited AI use cases</li>
                        <li>Set approval requirements for deployment</li>
                        <li>Determine when human oversight is required</li>
                        <li>Set budget caps for AI usage</li>
                        <li>Schedule AI impact assessments</li>
                        <li>Establish citation rules for AI-generated content</li>
                    </ul>
                </li>
                <li><strong>📦 Inventory AI Systems and Assets</strong>
                    <ul>
                        <li>Create an AI model registry or Bill of Materials (BOM)</li>
                        <li>Track version, change history, approvals</li>
                        <li>Document purpose, ownership, stakeholders, training data, inputs/outputs, deployment status</li>
                        <li>Record cost, resource requirements, business benefits, validation, value proposition</li>
                        <li>Note vulnerabilities, limitations, security concerns, regulatory/compliance requirements</li>
                    </ul>
                </li>
                <li><strong>🗺️ Map and Prioritise Risks</strong>
                    <ul>
                        <li>Select AI risk framework (e.g., NIST AI RMF, ISO/IEC 31000/23894)</li>
                        <li>Build standardised AI risk assessment template</li>
                        <li>Conduct risk assessments for each AI system in BOM</li>
                        <li>Identify impacts to individuals, groups, systems, organisation, environment</li>
                        <li>Assess impact and likelihood of each risk</li>
                        <li>Classify and tier (low, medium, high) by risk, considering:</li>
                        <ul>
                            <li><strong>Data privacy and sensitivity:</strong> data classification, including in aggregate and inferred</li>
                            <li><strong>Decision consequences:</strong> on individuals, groups, systems, environment, or company</li>
                            <li><strong>Regulatory and stakeholder impacts:</strong> legal, regulatory, and stakeholder requirements or concerns</li>
                            <li><strong>Model complexity:</strong> complexity of the AI model and its interpretability and susceptibility to drift</li>
                            <li><strong>Maintenance and remediation costs:</strong> resources required for ongoing support, updates, and issue resolution</li>
                            <li><strong>Safety and security vulnerabilities:</strong> potential for harm, security breaches, or system failures</li>
                            <li><strong>Objective and value alignment:</strong> alignment of AI system objectives with organizational values and goals</li>
                            <li><strong>Explainability and transparency:</strong> ability to explain AI decisions and maintain transparency for stakeholders</li>
                        </ul>
                        <li>Adversarial testing and threat modelling</li>
                        <li>Fairness and bias audits</li>
                        <li>Rank priorities using qualitative/quantitative analysis</li>
                        <li>Document results and update BOM</li>
                        <li>Mitigate risks with controls and safeguards</li>
                    </ul>
                </li>
                <li><strong>📈 Determine Maturity Level</strong>
                    <ul>
                        <li>Assess current state of AI risk management practices</li>
                        <li>Define target maturity levels</li>
                        <ul>
                            <li><a href="https://www.gartner.com/smarterwithgartner/the-cios-guide-to-artificial-intelligence">Gartner</a></li>
                            <ul>
                                <li><strong>Level 1 Awareness:</strong> Early AI interest with risk of overhyping. Conversations about AI are happening, but not in a strategic way, and no pilot projects or experiments are taking place.</li>
                                <li><strong>Level 2 Active:</strong> AI experimentation, mostly in a data science context. AI is appearing in proofs of concept and possibly pilot projects. Meetings about AI focus on knowledge sharing and the beginnings of standardization conversations.</li>
                                <li><strong>Level 3 Operational:</strong> AI in production, creating value by e.g., process optimisation or product/service innovations. At least one AI project has moved to production and best practices, and experts and technology are accessible to the enterprise. AI has an executive sponsor and a dedicated budget.</li>
                                <li><strong>Level 4 Systematic:</strong> AI is pervasively used for digital process and chain transformation, and disruptive new digital business models. All new digital projects at least consider AI, and new products and services have embedded AI. Employees in process and application design understand the technology. AI-powered applications interact productively within the organization and across the business ecosystem.</li>
                                <li><strong>Level 5 Transformational:</strong> AI is part of the business DNA</li>
                            </ul>
                            <li><a href="https://www.microsoft.com/en-us/research/publication/responsible-ai-maturity-model/">Microsoft</a></li>
                            <ul>
                                <li><strong>Level 1 Latent:</strong> Responsible AI (RAI) is not used in decision making, and there is little awareness of its importance.</li>
                                <li><strong>Level 2 Emerging:</strong> RAI is not used in decision making, what RAI work there is, is driven by a few passionate individuals</li>
                                <li><strong>Level 3 Developing:</strong> RAI is encouraged but not incentivised, RAI is driven by a few passionate teams in the organisation</li>
                                <li><strong>Level 4 Realising:</strong> RAI is valued, prioritised, and resourced. Some teams have RAI in their KPIs and management recognition</li>
                                <li><strong>Level 5 Leading:</strong> RAI is business as usual and required across all AI systems, with AI teams incentivised to prioritise RAI</li>
                            </ul>
                            <li><a href="https://www.ibm.com/downloads/documents/us-en/107a02e948c8f48d">IBM</a></li>
                            <ul>
                                <li><strong>Silver:</strong> discovery of what AI is, how it impacts business and enhances user experience, but is not mission critical</li>
                                <li><strong>Gold:</strong> AI delivers a meaningful business outcome to users without having to involve data scientists</li>
                                <li><strong>Platinum:</strong> AI is a market differentiator and is part of mission-critical workflows with strong and automated data management and data governance measures in place</li>
                            </ul>
                            <li><a href="https://s3.amazonaws.com/external_clips/3430107/AI-Maturity-Framework_White-Paper_EN.pdf">Element<sup>AI</sup></a></li>
                            <ul>
                                <li><strong>Stage 1 Exploring:</strong> Exploring what AI is and what it can bring to your organization. The organization does not yet have an AI model or solution in production.</li>
                                <li><strong>Stage 2 Experimenting:</strong> Experimenting with Proofs of Concept (POCs) and pilots. The organization is trying to put AI into production and can do so in limited ways.</li>
                                <li><strong>Stage 3 Formalising:</strong> Moving from POC/pilot to an AI solution in production. Putting AI solutions into production still requires significant organizational work at this stage.</li>
                                <li><strong>Stage 4 Optimising:</strong> Scaling AI solution deployments efficiently as the number of deployed AI models increases. The organization is approaching a factory of model production.</li>
                                <li><strong>Stage 5 Transforming:</strong> Transforming the organization itself through the use of AI. The organization uses AI in how it operates across many critical areas of the business.</li>
                            </ul>
                            <li><a href="https://www.bcg.com/publications/2021/the-four-stages-of-responsible-ai-maturity">Boston Consulting Group</a></li>
                            <ul>
                                <li><strong>Stage 1 Lagging:</strong> Starting to implement a RAI program, with a focus on data and privacy</li>
                                <li><strong>Stage 2 Developing:</strong> Expanding across the remaining RAI dimensions and initiating RAI policies</li>
                                <li><strong>Stage 3 Advanced:</strong> Improving data and privacy, but lagging behind on human-related advances</li>
                                <li><strong>Stage 4 Leading:</strong> Performing at a high level across all RAI dimensions</li>
                            </ul>
                            <li><a href="https://www.salesforceairesearch.com/static/ethics/EthicalAIMaturityModel.pdf">Salesforce</a></li>
                            <ul>
                                <li><strong>Ad hoc:</strong> No formal AI ethics practices in place, but individuals are exploring ethical considerations</li>
                                <li><strong>Organised and Repeatable:</strong> Executive buy-in and developing culture where Responsible AI practices are rewarded</li>
                                <li><strong>Managed and Sustainable:</strong> Widespread training on AI ethics and responsible AI practices, with ethics checkpoints throughout the product lifecycle</li>
                                <li><strong>Optimised and Innovative:</strong> End to end ethics by design</li>
                            </ul>
                        </ul>
                        <li>Identify gaps and improvement areas</li>
                        <li>Develop roadmap for maturity enhancement</li>
                        <li>Establish training for stakeholders (engineers: risk modelling, business: AI literacy, executives: strategic oversight)</li>
                        <ul>
                            <li>See NIST AI RMF for a comprehensive list of actors and their roles in AI.</li>
                        </ul>
                    </ul>
                </li>
                <li><strong>🔄 Align Framework Across AI Lifecycle</strong>
                    <ul>
                        <li>Integrate risk management into AI development/deployment</li>
                        <li>Ensure stakeholder role clarity</li>
                        <li>Embed governance checkpoints in development lifecycle</li>
                        <li>Establish communication channels for reporting/escalation</li>
                        <li>Align risk management with business, cybersecurity, privacy processes</li>
                        <li>Continuously monitor/review framework effectiveness</li>
                        <li>Match approval workflow to risk tolerance</li>
                        <li>Keep interventions lightweight to avoid circumvention</li>
                    </ul>
                </li>
                <li><strong>🔍 Monitor, Update, and Improve</strong>
                    <ul>
                        <li>Objective, repeatable, scalable test, evaluation, verification, and validation (TEVV) processes are established</li>
                        <li>Metrics and measurement methodologies should adhere to scientific, legal, and ethical norms and be carried out in an open and transparent process</li>
                        <li>Track performance drift, adversarial threats, user abuse, embedded biases, emerging risks</li>
                        <li>Regularly review/update framework for AI landscape changes</li>
                        <li>Track KPIs: risk incidents, compliance scores, user feedback</li>
                        <li>Incorporate stakeholder feedback, lessons learned</li>
                        <li>Continuously assess and adjust controls</li>
                        <li>Leverage automation/AI tools for risk management</li>
                        <li>Build centralised dashboards for oversight</li>
                    </ul>
                </li>
            </ol>

            <BackToTopButton />

            <details>
                <summary className="air-intro-summary">
                📚 Cautionary tales - some real-world AI use-cases:
                </summary>                
                <div className="air-intro-card-container">
                    <p>Also see: <a href="https://incidentdatabase.ai/" target="_blank" rel="noopener noreferrer" className="air-link">AI Incident Database, with over 3,000 reports of harmful AI incidents</a></p>
                    <ul>
                        <li><strong>Data Privacy & Security</strong>
                            <ul>
                                <li>Samsung ChatGPT data leak: Engineers used ChatGPT to debug code, pasting sensitive data including proprietary semiconductor designs, into the chat, not realising that their inputs could be used to train future models</li>
                                <li>Amazon's Ring: The home security company's partnerships with law enforcement raised concerns about surveillance and privacy, as well as the potential for abuse of the technology</li>
                                <li>Clearview AI: The facial recognition company faced backlash for its controversial practices, including scraping images from social media without consent, raising ethical concerns about privacy and surveillance</li>
                            </ul>
                        </li>
                        <li><strong>Legal & Liability</strong>
                            <ul>
                                <li>Air Canada Chatbot liability: A chatbot promised a discount to a customer that the airline refused to honour. Courts found the airline liable for the chatbot's actions</li>
                                <li>Australia's Robo-debt scheme: The automated system used by the government to identify welfare fraud was found to be deeply flawed, leading to wrongful debt notices being sent to thousands of citizens</li>
                            </ul>
                        </li>
                        <li><strong>Security & Safety</strong>
                            <ul>
                                <li>OpenAI's Codex: The AI model was found to generate code with security vulnerabilities, prompting discussions about the need for better safety measures in AI-assisted development</li>
                                <li>Various chatbots have suggested harmful or inappropriate content, including recommending self-harm and violence, raising concerns about the potential for AI to perpetuate biases and misinformation</li>
                                <li>IBM Watson for Oncology: The AI system was found to recommend unsafe and incorrect treatment options for cancer patients, highlighting the risks of relying on AI in high-stakes medical decisions</li>
                            </ul>
                        </li>
                        <li><strong>Bias, Fairness & Ethics</strong>
                            <ul>
                                <li>AI systems have been found to exhibit biased behaviour, reflecting and amplifying societal biases present in their training data</li>
                                <li>AI models have been shown to produce harmful content, including hate speech and misinformation, raising ethical concerns about their deployment</li>
                                <li>Google DeepMind's Gemini AI: Concerns were raised about the potential for the AI to generate biased or harmful content after Gemini created historically inaccurate images, leading to calls for stricter oversight and governance</li>
                                <li>OpenAI's DALL-E: The image generation model was found to produce biased or inappropriate content, leading to discussions about the need for better content moderation and ethical guidelines</li>
                                <li>Amazon's AI recruiting tool: The system was found to be biased against women, leading to its discontinuation</li>
                                <li>Face recognition technology has been criticised for only being accurate for certain demographics, leading to concerns about bias and fairness in AI systems</li>
                                <li>Microsoft's facial recognition technology: The company faced criticism for the accuracy and bias of its facial recognition systems, particularly in identifying people of colour</li>
                                <li>Concerns of use of AI in education by students and faculty regarding academic integrity and the potential for bias in AI-driven tools</li>
                            </ul>
                        </li>
                        <li><strong>Content Moderation & Misinformation</strong>
                            <ul>
                                <li>AI-generated deepfakes have been used to create realistic but fake videos and images, leading to concerns about the potential for AI to be used for malicious purposes such as misinformation and fraud and posing risks to democracy</li>
                                <li>Facebook's AI-driven content moderation: The system was criticized for its inability to effectively identify and remove hate speech and misinformation, leading to calls for greater transparency and accountability</li>
                                <li>X (formerly Twitter): The platform has faced criticism for its moderating of AI-generated content, raising concerns about the spread of misinformation and the potential for harmful content to go unchecked or being amplified</li>
                                <li>Grok: The AI chatbot faced backlash for generating misleading information and conspiracy theories, prompting discussions about the need for better content moderation and fact-checking</li>
                                <li>Microsoft's Tay: The AI chatbot was quickly shut down after it began generating offensive tweets, highlighting the risks of unmonitored AI systems</li>
                                <li>Robert F Kennedy Jr's MAHA report seemingly generated by AI with hallucinated fake citations</li>
                                <li>Deloitte Report for the Australian Government purportedly found to have contained AI generated citations and fabricated legal quotes</li>
                            </ul>
                        </li>
                        <li><strong>Inclusivity & Accessibility</strong>
                            <ul>
                                <li>Apple's Siri: The virtual assistant was found to have difficulty recognizing and responding to diverse accents and dialects, raising concerns about inclusivity in AI systems</li>
                                <li>Amazon's Alexa: Similar to Siri, Alexa has faced criticism for its performance with various accents and dialects, highlighting the need for more inclusive AI training data</li>
                                <li>AI-powered hiring tools have been criticized for perpetuating biases and discrimination, leading to concerns about fairness and inclusivity in the hiring process</li>
                                <li>AI systems have been found to be less accessible to people with disabilities, raising concerns about inclusivity and equal access to technology</li>
                                <li>Economic disparities in access to AI technology and resources have raised concerns about widening inequality and the digital divide</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </details>
            <h4>❓Questions to consider in selecting and deploying AI systems:</h4>
            <ul>
                <li><strong>Strategy & Objectives</strong>
                    <ul>
                        <li>What are the specific use cases and objectives for the AI system?</li>
                        <li>Developing your own model, using a pre-trained model, leveraging a third-party offering, or using an embedded solution?</li>
                        <li>What is the cost of running the model? What is the ROI?</li>
                        <li>What are the long-term maintenance and support requirements for the AI system?</li>
                        <li>What are the potential exit strategies for the AI system?</li>
                    </ul>
                </li>
                <li><strong>Data & Quality</strong>
                    <ul>
                        <li>How to ensure the quality and reliability of training data?</li>
                        <li>How to handle user privacy and data security?</li>
                        <li>How to protect intellectual property and proprietary information?</li>
                    </ul>
                </li>
                <li><strong>Risk, Ethics & Compliance</strong>
                    <ul>
                        <li>What are the potential risks and ethical considerations?</li>
                        <li>How to ensure compliance with regulations and standards in AI development and deployment?</li>
                        <li>How to ensure the ethical use of AI and prevent misuse?</li>
                        <li>What are the implications of AI system decisions on individuals and society?</li>
                        <li>What is the tolerance for error in AI systems?</li>
                    </ul>
                </li>
                <li><strong>Fairness & Bias</strong>
                    <ul>
                        <li>What measures are in place to identify and mitigate bias and ensure fairness?</li>
                        <li>Types of bias to consider (systemic, computational and statistical, human-cognitive)</li>
                    </ul>
                </li>
                <li><strong>Transparency & Accountability</strong>
                    <ul>
                        <li>How to ensure transparency and accountability in AI systems?</li>
                        <li>What is the role of human oversight in AI decision-making?</li>
                        <li>What are the best practices for documenting AI systems and their decision-making processes?</li>
                    </ul>
                </li>
                <li><strong>Performance & Improvement</strong>
                    <ul>
                        <li>How to evaluate the performance and impact of AI systems and identify drift over time?</li>
                        <li>What are the mechanisms for feedback and continuous improvement in AI systems?</li>
                    </ul>
                </li>
                <li><strong>Stakeholders & Collaboration</strong>
                    <ul>
                        <li>What role do stakeholders play in the AI development and deployment process?</li>
                        <li>How to foster collaboration and communication among stakeholders?</li>
                        <li>How to increase staff AI literacy and awareness?</li>
                    </ul>
                </li>
            </ul>
            <h4>🏷️NSW AIAF Risk Levels</h4>
            <div className="air-ai-risk-level-table-wrapper">
                <div className="air-ai-risk-level-table-scroll">
                    <table className="air-ai-risk-level-table">
                        <thead>
                            <tr>
                                <th className="air-ai-risk-level-table-header" rowSpan="2"></th>
                                <th style={{backgroundColor: '#747474', color: 'white'}} className="air-ai-risk-level-table-header">None</th>
                                <th style={{backgroundColor: '#00B050', color: 'white'}} className="air-ai-risk-level-table-header">Low Risk</th>
                                <th style={{backgroundColor: '#C88B04', color: 'white'}} className="air-ai-risk-level-table-header">Mid-range Risk</th>
                                <th style={{backgroundColor: '#E97132', color: 'white'}} className="air-ai-risk-level-table-header">High Risk</th>
                                <th style={{backgroundColor: '#D7153A', color: 'white'}} className="air-ai-risk-level-table-header">Very High Risk</th>
                            </tr>
                            <tr>
                                <th style={{backgroundColor: '#B2B2B2', color: 'black'}} className="air-ai-risk-level-table-header">Negligible, or N/A Risk</th>
                                <th style={{backgroundColor: '#A8E6A3', color: 'black'}} className="air-ai-risk-level-table-header">Reversible with negligible consequences</th>
                                <th style={{backgroundColor: '#F6D7A7', color: 'black'}} className="air-ai-risk-level-table-header">Reversible with moderate consequences</th>
                                <th style={{backgroundColor: '#FFD2B8', color: 'black'}} className="air-ai-risk-level-table-header">Reversible with significant consequences</th>
                                <th style={{backgroundColor: '#F7A6B3', color: 'black'}} className="air-ai-risk-level-table-header">Significant or irreversible consequences</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="air-ai-risk-level-table-cell"><strong>Definition</strong></td>
                                <td className="air-ai-risk-level-table-cell">AI systems or applications that have no, or extremely minimal risk associated with their use, or where the concept of risk is not applicable due to the nature of the AI system or its intended purpose. </td>
                                <td className="air-ai-risk-level-table-cell">AI systems or applications that, if they malfunction or produce unintended outcomes, can be easily reversed or corrected without causing any harm or damage. </td>
                                <td className="air-ai-risk-level-table-cell">AI systems or applications that, if they malfunction or produce unintended outcomes, can be reversed or corrected, but may cause moderate inconvenience, disruption, or harm. </td>
                                <td className="air-ai-risk-level-table-cell">AI systems or applications that, if they malfunction or produce unintended outcomes, can be reversed or corrected, but may cause significant financial losses, reputational damage, harm to the environment, individuals, or society.</td>
                                <td className="air-ai-risk-level-table-cell">AI systems or applications that, if they malfunction or produce unintended outcomes, may cause catastrophic, irreversible consequences for individuals, societies, or the environment.</td>
                            </tr>
                            <tr>
                                <td className="air-ai-risk-level-table-cell"><strong>Consequences</strong></td>
                                <td className="air-ai-risk-level-table-cell">The potential consequences of an AI system in this category are either non-existent or so insignificant that they can be safely disregarded.</td>
                                <td className="air-ai-risk-level-table-cell">The potential consequences of a low-risk AI system are minimal and do not cause any harm on individuals, organisations, or society.</td>
                                <td className="air-ai-risk-level-table-cell">The potential consequences of a mid-range risk AI system are more noticeable and may have a temporary impact on individuals, organisations, or specific domains.</td>
                                <td className="air-ai-risk-level-table-cell">The potential consequences of a high-risk AI system are substantial and may have a lasting impact on individuals, organisations, or entire industries.</td>
                                <td className="air-ai-risk-level-table-cell">The potential consequences of a very high-risk AI system are severe and may have permanent and irreversible implications.</td>
                            </tr>
                            <tr>
                                <td className="air-ai-risk-level-table-cell"><strong>Examples</strong></td>
                                <td className="air-ai-risk-level-table-cell">
                                    <ul>
                                        <li>Noise suppression on audio calls</li>
                                        <li>Image resolution enhancements</li>
                                        <li>Grammer and spell checking</li>
                                        <li>Text summarisation of non-sensitive content</li>
                                        <li>Search functions in browsers</li>
                                        <li>Analytics report</li>
                                    </ul>
                                </td>
                                <td className="air-ai-risk-level-table-cell">
                                    <ul>
                                        <li>Anomaly detection software</li>
                                        <li>Email spam filters</li>
                                        <li>Document classification and tagging</li>
                                        <li>Photo organising</li>
                                        <li>Non-critical content translation</li>
                                        <li>Voice assistance for basic tasks, i.e. Automated phone menu</li>
                                    </ul>
                                </td>
                                <td className="air-ai-risk-level-table-cell">
                                    <ul>
                                        <li>Customer service chatbots</li>
                                        <li>Recommendation systems</li>
                                        <li>Language translation tools</li>
                                        <li>Content curation</li>
                                        <li>Predictive maintenance</li>
                                        <li>Natural language processing of gov documents.</li>
                                    </ul>
                                </td>
                                <td className="air-ai-risk-level-table-cell">
                                    <ul>
                                        <li>Facial recognition systems</li>
                                        <li>AI powered hiring and recruitment</li>
                                        <li>Autonomous emergency response system</li>
                                        <li>Autonomous tram with human oversight</li>
                                        <li>Healthcare decision support systems</li>
                                        <li>Adaptive learning system</li>
                                    </ul>
                                </td>
                                <td className="air-ai-risk-level-table-cell">
                                    <ul>
                                        <li>Autonomous benefits eligibility  without human oversight</li>
                                        <li>Self-driving cars</li>
                                        <li>Predictive reoffending</li>
                                        <li>Medical diagnosis without oversight</li>
                                        <li>Autonomous AI systems on critical infrastructure (i.e. energy)</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p></p>
                </div>
            </div>
          </div>
          <BackToTopButton />
        <p><b>Disclaimer:</b> The information provided here is for general informational purposes only and will require adaptation for specific businesses and maturity capabilities and is not intended as legal advice. 
        Please consult with a qualified legal professional for specific legal advice tailored to your situation.</p>
        <hr />
        </details>
    );
};

export default AIRiskIntro;