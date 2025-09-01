import React from "react";
import "./AIRisk.css";

const AIRiskInputForm = () => {
  return (
    <details className="air-inputform-details">
      <summary className="air-inputform-summary">
        ✏️ AI Risk Input Form
      </summary>
      <ul>
        <li>Project Details</li>
        <ul>
            <li>Project Name:</li>
            <li>Project Description:</li>
            <li>Business Goals</li>
            <li>What is the problem / challenge / issue being addressed?</li>
            <li>What is the system trying to achieve?</li>
            <li>Why is an AI system the better way?</li>
            <li>Project Sponsor:</li>
            <li>Project Owner:</li>
            <li>Technical System Owner:</li>
            <li>Data Governance Owner:</li>
            <li>Contributors</li>
            <li>Phase of the Project (design and develop; verify and validate through pilot; deploy and evaluate; operate / monitor / maintain; re-evaluate)</li>
            <li>Next date/milestone that will trigger the next review</li>
        </ul>
        <li>Scope - Potential Elevated Risk <em>(Yes; No)</em>
            <ul><em>
                    <li>Yes: Your use is potentially at elevated risk. Additional mitigation covered in this framework will apply</li>
                    <li>No: If you can answer No to all questions it means you are not using AI in a manner which is potentially elevated risk.</li>
                </em>
            </ul>
        </li>
        <ul>
            <li>Operational Impact: Does your system produce or directly influence any administrative decisions (government decision with legal or similar significant effect)? i.e., automating decisions on issuing infringements.</li>
            <li>Operational Impact: Does your system trigger a real-world action with more than negligible potential effect (meaningful change to environment or system state)? i.e., an automated alerting system.</li>
            <li>Autonomous: Does your system operate autonomously or have potential to produce harmful outputs independently of human action, without requiring manual initiation? i.e., autonomous vehicles.</li>
            <li>Data Sensitivity: Was any part of your system trained using sensitive information or can it produce outputs which contain sensitive information? i.e. a biometric based face matching system</li>
            <li>Unintended harms: Is there a risk of system failure, misuse, or inappropriately deployed that could cause harm to an individual or group? i.e., systems using unverifiable data inputs</li>
            <li>Explainability and Transparency: Does your system fail to provide explainability for generated content and decisions, hindering comprehension by laypeople and assessment by technical experts? i.e., information informing policy development</li>
        </ul>
        <li>Scope - Do I need to use the framework <em>(Yes; No)</em>
            <ul><em>
                <li>Yes: Consult the guidance as to when the framework may not be needed</li>
                <li>No: If you can answer No to all questions, there is no need to use the framework unless you have AI risk concerns.</li>
                </em>
            </ul>
        </li>
        <ul>
            <li>Buy AI and use - Buying or using an off the shelf system. Used without modifying the algorithm or any risk mitigation tools, nor adding domain-specific content. i.e. ChatGPT, or AI in Salesforce, SAP, etc.</li>
            <li>Embed AI and/or co-train - Developing a product with embedded AI or purchasing an AI platform and augmented training data with domain-specific content. i.e., integrating AI biometrics or developing a chatbot with augmented training.</li>
            <li>Develop AI and/or train - Developing an AI tool in-house. Even if based on a standard platform, I am developing algorithms and supplying the training data. i.e. Developing anomaly detection or training LLM with domain-specific content.</li>
            <li>Automating decisions - Developing a tool in-house that uses AI and that automates at least one critical step in the decision-making process. i.e. AI powered hiring and recruitment.</li>
        </ul>
        <li>Human Rights Impact Assessment <em>(Free text)</em></li>
        <ul>
            <li>Is the use of the AI system likely to restrict human rights? If so, is any such restriction publicly justifiable?</li>
            <li>Were possible trade-offs between the different principles and rights ascertained, documented, and evaluated?</li>
            <li>Does the AI system suggest actions or decisions to make, or outline choices to human users?</li>
            <li>Could the AI system inadvertently impact human users' autonomy by influencing and obstructing their decision-making?</li>
            <li>Did you evaluate whether the AI system should inform users that its outputs, content, recommendations, or results arise from an algorithmic decision?</li>
            <li><em>If human rights risk being at risk, recommend conducting a Human Rights Impact Assessment (HRIA).</em></li>
        </ul>
        <li>Community Benefit - General Benefits <em>(Confidence Levels - N/A; Very Low; Low; Mid-range; High; Very High)</em></li>
        <ul>
            <li>Delivering a better-quality existing service or outcome (for example, accuracy or client satisfaction)</li>
            <li>Reducing processing or delivery times</li>
            <li>Generating financial efficiencies or savings</li>
            <li>Providing an AI capability that could be used or adapted by other agencies</li>
            <li>Delivering a new service or outcome (particularly if it cannot be done without using AI)</li>
            <li>Enabling future innovations to existing services, or new services or outcomes</li>
        </ul>
        <q>Benefits: All AI projects should have a benefits register that is kept up to date throughout the project. The benefits register should be maintained by the Responsible Officers.</q>
        <li>Community Benefit - General Risk Factor Assessment <em>(Risk - N/A; Low; Mid-range; High; Very High)</em></li>
        <ul>
            <li>Whether this AI system is delivering a new or existing service.</li>
            <li>The potential to cause discrimination from unintended bias.</li>
            <li>Whether the AI system is a single point of failure for your service or policy.</li>
            <li>If there is sufficient experienced human oversight of the AI system.</li>
            <li>Over-reliance on the AI system or ignoring the system due to high rates of false alert.</li>
            <li>Whether the linkage between operating the AI system and the policy outcome is unclear.</li>
            <li>The system's explainability and transparency regarding generated content and decisions.</li>
        </ul>
        <li>Community Benefit - General Risk Factor Assessment</li>
        <ul>
            <li>Were other non-AI systems considered? <em>(Yes; Informally; No; N/A)</em></li>
            <ul>
                <em>
                    <li>Yes: Low Risk - Explain your answer</li>
                    <li>Informally: High Risk - After your pilot, you must conduct a formal benefits review before scaling. If your solution is operational - consult responsible officers for an appropriate equivalent action</li>
                    <li>No: Very High Risk - Do not proceed any further. Review with the responsible officers on how to resolve. If your solution is operational - consult responsible officers for an appropriate equivalent action</li>
                    <li>N/A: Explain your answer</li>
                </em>
            </ul>
            <q>Alternatives: For an AI system to be viable, AI must be the most appropriate system for your service delivery or policy problem.  AI systems can come with more risk and cost than traditional tools. You should use an AI system when it the best system to maximise the benefit for the customer and for government.</q>
            <li>Does this system and the use of data align with relevant legislation? <em>(Yes; Unclear; No)</em></li>
            <ul>
                <em>
                    <li>Yes: If you have confirmed any other relevant acts, please list these in your response</li>
                    <li>Unclear: Very High Risk - Pause the project. Seek advice from an appropriate NSW legal source or the NSW Privacy Commissioner. You may need to redesign your project and or system. If your solution is operational - consult responsible officers for an appropriate equivalent action</li>
                    <li>No: Very High Risk - Do not proceed any further unless you receive clear legal advice that allows you to proceed. Consider redesigning your project and or system. If your solution is operational - consult responsible officers for an appropriate equivalent action</li>
                </em>
            </ul>
            <q>More information: You must always comply with privacy and information access laws, including when you are developing and using AI Systems.</q>
        </ul>
        <li>Community Benefit - Potential Harms - negative consequences <em>(Risk - N/A; Low; Mid-range; High; Very High)</em></li>
        <ul>
            <li>Physical harms</li>
            <li>Psychological harms</li>
            <li>Environmental harms or harms to the broader community</li>
            <li>Unauthorised use of health or sensitive personal information (SIP)</li>
            <li>Impact on right, privilege or entitlement</li>
            <li>Unintended identification or misidentification of an individual</li>
            <li>Misapplication of a fine or penalty</li>
            <li>Other financial or commercial impact</li>
            <li>Incorrect advice or guidance</li>
            <li>Inconvenience or delay</li>
            <li>Erosion of trust</li>
            <li>Ethical implications</li>
            <li>Economic disruption / impact</li>
            <li>Social equality</li>
            <li>Other harms</li>
        </ul>
        <li>Community Benefit - Specific Controls - Harms</li>
        <ul>
            <li>Could the AI system cause harms that are reversible? <em>(No; Yes and mid-range or higher risk; Yes and low to very low risk; Unclear)</em></li>
            <ul>
                <em>
                    <li>No: Low Risk - Explain your answer</li>
                    <li>Yes and mid-range or higher risk: High Risk - Do not proceed until you receive legal advice. If you have legal approval: discuss this with all relevant stakeholders, you may need ethics approval, consider a Human Rights Impact Assessment. If your solution is operational - consult responsible officers for an appropriate equivalent action</li>
                    <li>Yes and low to very low risk: Low Risk - Explain your answer</li>
                    <li>Unclear: High Risk - Pause the project and review with the responsible officer how to resolve. If your solution is operational - consult responsible officers for an appropriate equivalent action</li>
                </em>
            </ul>
            <q>Reversible Vs Irreversible harms: Irreversible harm refers to a situation where it's impossible to revert to a previous condition before the harm occurred. For example, if an AI system makes an incorrect decision to deny somebody a pension without an option to have that overturned. You should ensure the ability to overturn outcomes if harm is caused or if the AI system makes incorrect decisions.</q>
            <li>Could the AI system cause harms that are irreversible? Example: Autonomous AI systems on critical infrastructure (i.e. energy) <em>(No; Yes, but it's better than existing systems; Yes; Unclear)</em></li>
            <ul>
                <em>
                    <li>No: Low Risk - Explain your answer</li>
                    <li>Yes, but it's better than existing systems: High Risk - You must seek approval from an ethics committee. You must have clear legal advice that allows you to proceed. Consult with all relevant stakeholders. Consider a Human Rights Impact Assessment.</li>
                    <li>Yes: Very High Risk - Do not proceed until you receive clear legal advice. If you have legal approval: discuss this with all relevant stakeholders, seek approval from an ethics committee, consider a Human Rights Impact Assessment.</li>
                    <li>Unclear: Very High Risk - Pause the project and review with the responsible officer how to resolve.</li>
                </em>
            </ul>
            <q>Monitoring for possible harms: You must monitor your AI system closely for harms that it may cause. This includes monitoring outputs and testing results to ensure there are no unintended consequences. You should be able to quantify unintended consequences, secondary harms or benefits, and long-term impacts to the community, even during testing and pilot phases. Testing can still lead to harm if the system is making consequential decisions. You must consider and account for this possibility even if human testers are willing volunteers. Changing the context or environment in which the AI system is used can lead to unintended consequences. Planned changes in how the AI is used should be carefully considered and monitoring undertaken.</q>
            <li>Could the AI System result in secondary harms, or result in a cumulative harm from repeated application of the AI System? Example of a cumulative harm is a video system initially collecting and analysing data for security purposes, but over time, as more data is gathered and analysed, individual privacy could be at risk. <em>(No; Yes and mid-range or higher risk; Yes and low to very low risk; Unclear)</em></li>
            <ul>
                <em>
                    <li>No: Low Risk - Explain your answer</li>
                    <li>Yes and mid-range or higher risk: Very High Risk - Do not proceed until you receive legal advice. If you have legal approval: discuss this with all relevant stakeholders, you may need ethics approval, consider a Human Rights Impact Assessment. If your solution is operational - consult responsible officers for an appropriate equivalent action</li>
                    <li>Yes and low to very low risk: Low Risk - Explain your answer</li>
                    <li>Unclear: Very High Risk - Pause the project and review with the responsible officer how to resolve.</li>
                </em>
            </ul>            
            <q>Secondary harms: Sometimes harms are felt by people who are not direct recipients of the product of service. We refer to these as secondary harms. Secondary harms include things like a loss of trust. You need to think deeply about everyone who might be impacted, well beyond the obvious end user.</q>
        </ul>
        <li>Fairness - Risk Factors and Ratings <em>(Risk - Very low or N/A; Low; Mid-range; High; Very High)</em></li>
        <ul>
            <li>Using incomplete or inaccurate data</li>
            <li>Having poorly defined descriptions and indicators of “Fairness”</li>
            <li>Not ensuring ongoing monitoring of “Fairness indicators”</li>
            <li>Decisions to exclude outlier data</li>
            <li>Informal or inconsistent data cleansing and repair protocols and processes</li>
            <li>Using informal bias detection methods (best practice includes automated testing)</li>
            <li>The likelihood that re-running scenarios could produce different results (reproducibility)</li>
            <li>Inadvertently creating new associations when linking data and/or metadata</li>
            <li>Differences in the data used for training compared to the data for intended use</li>
        </ul>
        <li>Fairness - Specific Controls</li>
        <ul>
            <li>Can you explain why you selected the data you're using in your system? <em>(Yes; Unclear; No, but it's better than existing systems; No)</em></li>
            <ul>
                <em>
                    <li>Yes: Low Risk - Explain your answer</li>
                    <li>Unclear: Very High Risk - Consult with relevant stakeholders on data options or implement a data improvement strategy or redesign your project/system</li>
                    <li>No, but it's better than existing systems: High Risk - Document your reasons. Clearly demonstrate that you have consulted with all relevant stakeholders before proceeding. If your solution is operational - consult responsible officers for an appropriate equivalent action.</li>
                    <li>No: Very High Risk - Pause the project and review with the responsible officers on how to resolve. If your solution is operational - consult responsible officers for an appropriate equivalent action.</li>
                </em>
            </ul>
            <q>Data relevance and permission: Your AI system may draw on multiple datasets from different sources to find new patterns and insights. You need to determine if you can and should use the data for the AI system. This can be challenging for historical data that may have been collected for a different purpose.</q>
            <li>Is the data that you need for your system available and of appropriate quality given the potential harms identified? If your system is a data creation or data cleansing application, answer according to the availability of any existing data that is needed for the solution to succeed, for example, training datasets. <em>(Yes; Unclear; Partially, it's better than existing systems; No)</em></li>
            <ul>
                <em>
                    <li>Yes: Low Risk - Explain your answer</li>
                    <li>Unclear: Very High Risk - Consult with relevant stakeholders to identify alternative data sources or implement a data improvement strategy or redesign your project/system</li>
                    <li>Partially, it's better than existing systems: High Risk - Document your reasons and details to demonstrate that you have consulted with all relevant stakeholders before proceeding. If your solution is operational - consult responsible officers for an appropriate equivalent action.</li>
                    <li>No: Very High Risk - Pause the project and review with the responsible officers on how to resolve. If your solution is operational - consult responsible officers for an appropriate equivalent action.</li>
                </em>
            </ul>
            <q>Data quality: Data quality is often described in terms of minimum requirements for accuracy, timeliness, completeness, and consistency. There are examples of data quality standards for AI in the appendices. Your AI system may be significantly impacted by poor quality data. It is important to understand how significant the impact is before relying on insights or decisions generated by the AI system. Absence of data may lead to unintended biases impacting insights generated by the AI system. Unbalanced data is a common problem when training AI systems (the situation where the distribution of classes or categories in the training dataset is not representative of the real-world scenario).</q>
            <li>Does your data reflect the population that will be impacted by your system? <em>(Yes; Partially, it's better than existing systems; No or unclear; N/A)</em></li>
            <ul>
                <em>
                    <li>Yes: Low Risk - Explain your answer</li>
                    <li>Partially, it's better than existing systems: High Risk - Consider seeking advice from an ethics committee. Document below how you have consulted with all relevant stakeholders before proceeding. Consider a Human Rights Impact Assessment. If your solution is operational - consult responsible officers for an appropriate equivalent action.</li>
                    <li>No or unclear: Very High Risk - Pause the project and review with the responsible officers on how to resolve. If your solution is operational - consult responsible officers for an appropriate equivalent action.</li>
                    <li>N/A: N/A - Document your reasons as to why this does not apply, then go to the next question</li>
                </em>
            </ul>
            <li>Have you considered how your AI system will address issues of diversity and inclusion (including geographic diversity)? <em>(Yes; Partially, it's better than existing systems; No or unclear; N/A)</em></li>
            <ul>
                <em>
                    <li>Yes: Low Risk - Explain your answer</li>
                    <li>Partially, it's better than existing systems: High Risk - Consider seeking advice from an ethics committee. Document below how you have consulted with all relevant stakeholders before proceeding. Consider a Human Rights Impact Assessment. If your solution is operational - consult responsible officers for an appropriate equivalent action.</li>
                    <li>No or unclear: Very High Risk - Pause the project and review with the responsible officers on how to resolve. If your solution is operational - consult responsible officers for an appropriate equivalent action.</li>
                    <li>N/A: N/A - Document your reasons as to why this does not apply, then go to the next question</li>
                </em>
            </ul>
            <q>Diversity and inclusion, and the impact on minorities: AI often overlooks minority nuances, leading to biased outcomes. Considering cultural sensitivities and underrepresentation, it's vital to test AI outputs for fairness across all demographics, ensuring accurate representation and unbiased decisions. Think deeply about everyone who may be impacted.</q>
            <li>Have you considered the impact with regard to gender and on minority groups including how the system might impact different individuals in minority groups when developing this AI system? <em>(Yes; Partially; It's better than existing systems; No or unclear; N/A)</em></li>
            <ul>
                <em>
                    <li>Yes: Low Risk - Explain your answer</li>
                    <li>Partially, it's better than existing systems: High Risk - Consider seeking advice from an ethics committee. Document below how you have consulted with all relevant stakeholders before proceeding. Consider a Human Rights Impact Assessment. If your solution is operational - consult responsible officers for an appropriate equivalent action.</li>
                    <li>No or unclear: Very High Risk - Pause the project and review with the responsible officers on how to resolve. If your solution is operational - consult responsible officers for an appropriate equivalent action.</li>
                    <li>N/A: N/A - Document your reasons as to why this does not apply, then go to the next question</li>
                </em>
            </ul>
            <li>Do you have appropriate performance measures and targets (including fairness ones) for your AI system, given the potential harms? Aspects of accuracy and precision are readily quantifiable for most systems which predict or classify outcomes. This performance can be absolute, or relative to existing systems. How would you characterise “Fairness” such as equity, respect, justice, in outcomes from an AI system? Which of these relate to, or are impacted by the use of AI? <em>(Yes; No or unclear and elevated risk use; No or unclear and non-elevated risk use; N/A)</em></li>
            <ul>
                <em>
                    <li>Yes: Low Risk - Explain your answer</li>
                    <li>No or unclear and elevated risk use: Very High Risk - For elevated risk uses of AI, pause the project until you have established performance measures and targets. If your solution is operational - consult responsible officers for an appropriate equivalent action.</li>
                    <li>No or unclear and non-elevated risk use: Mid-range Risk - For non-elevated risk projects or systems, results should be treated as indicative and not relied on. Document your reasons. If your solution is operational - consult responsible officers for an appropriate equivalent action.</li>
                    <li>N/A: N/A - Document your reasons as to why this does not apply, then go to the next question</li>
                </em>
            </ul>
            <q>Measuring AI system performance: At the scoping stage, you will need to make important choices about what you measure. You should measure:
            - Accuracy: how close an answer is to the correct value
            - Precision: how specific or detailed an answer is
            - Sensitivity: the measure of how many actually positive results are correctly identified as such
            - Specificity: the measure of how many actually negative results are correctly identified by the AI system 
            - Fairness objectives: whether the system is meeting the fairness objectives defined for the system (which could include for example that there aren't more prediction errors on some cohorts than others)</q>
            <li>Do you have a way to monitor and calibrate the performance (including fairness) of your AI system? Operational uses of AI which are continuously updated / trained can quickly move outside of performance thresholds. Supervisory systems can monitor system performance and alert when calibration is needed. <em>(Yes; No or unclear and elevated risk use; No or unclear and non-elevated risk use; N/A)</em></li>
            <ul>
                <em>
                    <li>Yes: Low Risk - Explain your answer</li>
                    <li>No or unclear and elevated risk use: Very High Risk - For elevated risk uses of AI, pause the project until you have established performance measures and targets. If your solution is operational - consult responsible officers for an appropriate equivalent action.</li>
                    <li>No or unclear and non-elevated risk use: Mid-range Risk - For non-elevated risk projects or systems, results should be treated as indicative and not relied on. Document your reasons. If your solution is operational - consult responsible officers for an appropriate equivalent action.</li>
                    <li>N/A: N/A - Document your reasons as to why this does not apply, then go to the next question</li>
                </em>
            </ul>
            <q>Measuring AI system performance: Elevated risk uses of AI should have clear performance monitoring and calibration schedules. 
            For Elevated risk uses of AI which are continuously training and adapting with moderate residual risks, weekly performance monitoring and calibration is recommended. 
            For low risk, monthly evaluation and calibration is recommended.
            For operational systems with High risk or Very High risk, a custom evaluation and calibration will be required.</q>
        </ul>
        <li>Privacy and Security - Data Cohort Size <em>(cohort &gt; 50 or N/A; cohort &gt; 20 and &lt; 50; cohort &gt; 10 and &lt; 20; cohort &gt; 5 and &lt; 10; cohort &lt; 5)</em></li>
        <ul>
            <em>
                <li>cohort &gt; 50 or N/A: Very Low Risk or N/A</li>
                <li>cohort &gt; 20 and &lt; 50: Low Risk</li>
                <li>cohort &gt; 10 and &lt; 20: Mid-range Risk</li>
                <li>cohort &gt; 5 and &lt; 10: High Risk</li>
                <li>cohort &lt; 5: Very High Risk</li>
            </em>
        </ul>
        <ul>
            <li>Children</li>
            <li>Religious individuals</li>
            <li>Racially or ethnically diverse individuals</li>
            <li>Individuals with political opinions or associations</li>
            <li>Individuals with trade union membership or associations</li>
            <li>Gender and/or sexually diverse individuals</li>
            <li>Individuals with a criminal record</li>
            <li>Specific health or genetic information</li>
            <li>Personal biometric information</li>
            <li>Other sensitive person-centred data</li>
        </ul>
        <li>Privacy and Security - Specific Controls</li>
        <ul>
            <li>Have you applied the “Privacy by Design” and “Security by Design” principles in your system? <em>(Yes; Partially; No or unclear)</em></li>
            <ul>
                <em>
                    <li>Yes: Low Risk - Document any points to resolve, then go to next question. Consider contacting the information and privacy commissioner or Cyber NSW for any points not resolved</li>
                    <li>Partially: High Risk - Pause the project, apply the principles before proceeding, document any points to resolve below then go to next question. Consider contacting the information and privacy commissioner or Cyber NSW for any points not resolved. If your solution is operational - consult responsible officers for an appropriate equivalent action</li>
                    <li>No or unclear: Very High Risk - Pause the project, apply the principles before proceeding, document any points to resolve below then go to next question. Consider contacting the information and privacy commissioner or Cyber NSW for any points not resolved. If your solution is operational - consult responsible officers for an appropriate equivalent action</li>
                </em>
            </ul>
            <q>Privacy by design, security by design: Even small AI projects or systems may have privacy or security vulnerabilities. For example, an analytics system which stores commercially sensitive data in a non-secure environment unbeknown to the user.</q>
            <li>Have you completed a privacy impact assessment (either third party or self-assessed)? <em>(Yes; No; N/A)</em></li>
            <ul>
                <em>
                    <li>Yes: Low Risk - Document the result, then go to the next question</li>
                    <li>No: Very High Risk - Pause the project until you have completed a privacy impact assessment. If your solution is operational - consult responsible officers for an appropriate equivalent action</li>
                    <li>N/A: N/A - Your system doesn't use or generate any sensitive information, confirmed with responsible officers, document below this confirmation</li>
                </em>
            </ul>
            <q>Privacy impact assessment: Even systems not focussed on person-centred data may reveal information about a person, their relationships or preferences. For example, analysis of environmental or spatial data may reveal information about a land-holder's interaction with the local environment.
                A Privacy Impact Assessment (PIA) can help you to identify and minimise privacy risks. A PIA can help you implement 'privacy by design' and demonstrate compliance with privacy laws.
            </q>
            <li>If you are using information about individuals who are reasonably identifiable, have you sought consent from citizens about using their data for this particular purpose? <em>(Yes; Authorised use; Partially; No; N/A)</em></li>
            <ul>
                <em>
                    <li>Yes: Low Risk - Document the result, then go to the next question</li>
                    <li>Authorised use: Mid-range Risk - For AI systems intended to operate under legislation which allows use of identifiable information, do not proceed unless you receive clear legal / independent privacy advice that allows you to proceed. The system should always be monitored for harms. If your solution is operational - consult responsible officers for an appropriate equivalent action</li>
                    <li>Partially: High Risk - Pause the project until you have obtained consent or clear legal advice authorising use of this information. If your solution is operational - consult responsible officers for an appropriate equivalent action</li>
                    <li>No: Very High Risk - Pause the project until you have obtained consent or clear legal advice authorising use of this information. If your solution is operational - consult responsible officers for an appropriate equivalent action</li>
                    <li>N/A: N/A - Document your reasons above as to why this does not apply</li>
                </em>
            </ul>
            <q>Exceptions: You can ask the Privacy Commissioner to make a Public Interest Direction (PID) to waive the requirement to comply with an Information Protection Principle. These are only granted in circumstances where there are compelling public interests. For AI systems intended to operate under legislation which allows use Personally Identifiable Information, the public benefits must be clear before proceeding to pilot phase.</q><br />
            <q>Governing use of Personally Identifiable Information: You must apply higher governance standards if you are managing Personally Identifiable Information.</q>
            <li>Does your system adhere to the mandatory requirements in the NSW Cyber Security Policy? Have you considered end-to-end Security Principles for your system? <em>(Yes; No or Partially)</em></li>
            <ul>
                <em>
                    <li>Yes: Low Risk - Provide information above that confirms you have done this and any key information to not for ongoing risk management</li>
                    <li>No or Partially: Very High Risk - Pause the project until you meet mandatory requirements. If your solution is operational - consult responsible officers for an appropriate equivalent action</li>
                </em>
            </ul>
            <q>Cyber security:  AI can pose new cyber security risks, be vigilant.</q>
            <li>Does your dataset include using sensitive data subjects as described by section 19 of the NSW Privacy and Personal Information Protection Act 1998? If use of sensitive data is a must, ensure to leverage privacy enhancing technology such as use of synthetic data, data anonymisation and deidentification, encryption, secure aggregation and random noise generation. <em>(No; Yes; Unclear)</em></li>
            <ul>
                <em>
                    <li>No: Low Risk - Document how you have confirmed this</li>
                    <li>Yes: Very High Risk - Seek advice from an appropriate NSW legal source or the NSW Privacy Commissioner. Consider seeking approval from an ethics committee</li>
                    <li>Unclear: Very High Risk - Pause the project and review your data. Consider advice from an appropriate NSW legal source or the NSW Privacy Commissioner. If your solution is operational - consult responsible officers for an appropriate equivalent action</li>
                </em>
            </ul>
            <q>Sensitive data: The NSW Government Information Classification, Labelling and Handling Guidelines have been developed to help agencies correctly assess the sensitivity or security of information, so that the information can be labelled, used, handled, stored and disposed of correctly.</q><br />
            <q>Governing Use of Sensitive Information: You must apply higher governance standards if you are managing Sensitive Information.</q>
        </ul>
        <li>Transparency - Risk Factors and Ratings (Risk - N/A; Low; Mid-range; High; Very High)</li>
        <ul>
            <li>Incomplete documentation of AI system design, or implementation, or operation</li>
            <li>No or limited access to model's internal workings or source code (“Black Box”)</li>
            <li>Being unable to explain the output of a complex model</li>
            <li>A member of the public being unaware that they are interacting with an AI system</li>
            <li>No or low ability to incorporate user feedback into an AI system or model</li>
            <li>The inability to audit past decisions, where input from AI systems was used.</li>
        </ul>
        <li>Transparency - Specific Controls</li>
        <ul>
            <li>Have you consulted with the relevant community that will benefit from (or be impacted by) the system? <em>(Yes; Authorised use; Partially, it's better than existing systems; No; N/A)</em></li>
            <ul>
                <em>
                    <li>Yes: Low Risk - Explain your answer, then go to next question</li>
                    <li>Authorised Use: Mid-range Risk - For AI systems intended to operate under legislation which allows use without community consultation, do not proceed unless you receive clear legal advice that allows you to proceed. The system should be always monitored for harms. If your solution is operational - consult responsible officers for an appropriate equivalent action</li>
                    <li>Partially, it's better than existing systems: High Risk - Consider seeking advice from an ethics committee. Document here how you have consulted with all relevant stakeholders before proceeding. If your solution is operational - consult responsible officers for an appropriate equivalent action</li>
                    <li>No: Very High Risk - Pause the project, develop a Community Engagement Plan and consult with the relevant community. If your solution is operational - consult responsible officers for an appropriate equivalent action</li>
                    <li>N/A: N/A - Document your reasons as to why this does not apply, then go to next question</li>
                </em>
            </ul>
            <q>Consultation: You must consult with the relevant community when you design your system. This is particularly important for Elevated risk uses of AI. Communities have the right to influence government decision-making where those decisions, and the data on which they are based, will have an impact on them. For AI intended to operate under legislation which allows use without community consultation, the public benefits must be clear before proceeding.</q>
            <li>Are the scope and goals of the project publicly available, and have you communicated how safeguards have been put in place to mitigate any potential harms? Explore diverse approaches to instil confidence within communities regarding your AI utilisation. This may entail targeted communication strategies or maintaining public registers. Offer concise and straightforward explanations of your AI usage to those potentially affected, especially for elevated risk. Ensure these explanations foster trust without generating confusion. <em>(Yes; No; N/A)</em></li>
            <ul>
                <em>
                    <li>Yes: Low Risk - Explain your answer, then go to next question</li>
                    <li>No: Very High Risk - Make sure you communicate to relevant stakeholders and the community who are impacted before proceeding. If your solution is operational - consult responsible officers for an appropriate equivalent action</li>
                    <li>N/A: N/A - Document your reasons as to why this does not apply, then go to next question</li>
                </em>
            </ul>
            <q>Sharing project goals: The NSW AI Strategy recognises we have important work to do to encourage public trust in AI, by ensuring Government is transparent and accountable, and that AI delivers positive outcomes to citizens.</q>
            <li>Is there an easy and cost-effective way for people to appeal a decision that has been informed by your system? Individuals have the right to raise concerns or appeal decisions. Ensure the use of simple and easily understandable language to facilitate this process. <em>(Yes; No; N/A)</em></li>
            <ul>
                <em>
                    <li>Yes: Low Risk - Explain your answer, then go to next question</li>
                    <li>No: Very High Risk - Pause your project, consult with relevant stakeholders and establish an appeals process. If your solution is operational - consult responsible officers for an appropriate equivalent action</li>
                    <li>N/A: N/A - Document your reasons as to why this does not apply, then go to next question</li>
                </em>
            </ul>
            <q>Right to appeal: No person should ever lose a right, privilege or entitlement without right of appeal.  A basic requirement of Transparency is for an individual affected by a relevant decision to understand the basis of the decision, and to be able to effectively challenge it on the merits and/or if the decision was unlawful.  When planning your project/system, you must make sure no person could lose a right, privilege or entitlement without access to a review process or an effective way to challenge an AI generated or informed decision</q>
            <li>Does the AI system allow for transparent explanation of the factors leading to a decision or insight? <em>(Yes; No, but a person makes the final decision; No; N/A)</em></li>
            <ul>
                <em>
                    <li>Yes: Low Risk - Explain your answer, then go to next question</li>
                    <li>No, but a person makes the final decision: High Risk - Consult with relevant stakeholders and establish a process to readily reverse any decision or action made by the AI system. Actively monitor for potential harms.</li>
                    <li>No: Very High Risk - Pause your project, consult with relevant stakeholders and establish a process to readily reverse any decision or action made by the AI system. If your solution is operational - consult responsible officers for an appropriate equivalent action</li>
                    <li>N/A: N/A - Document your reasons as to why this does not apply, then go to next question</li>
                </em>
            </ul>
            <q>Clear explanations: As far as possible, you must have a way to clearly explain how a decision or outcome has been informed by AI. If the system is a “black box” due to lack of access to the inner workings or is too complex to reasonably explain the factors leading to the insight generation, it is essential to consider the role of human judgement in intervening before an AI generated insight is acted on. It is important to formalise and document this human oversight process. In low (or very low) risk environments, it may be sufficient to identify and document mechanisms to readily reverse any action arising from such an insight (for example, a person overriding an automated barrier).</q>
        </ul>
        <li>Accountability - Risk Factors and Ratings <em>(Risk - N/A, Low, Mid-range, High, Very High)</em></li>
        <ul>
            <li>Insufficient training of AI system operators</li>
            <li>Insufficient awareness of system limitations of Responsible Officers</li>
            <li>No or low documentation of performance targets or “Fairness” principles trade-offs</li>
            <li>No or limited mechanisms to record insight / AI System decision history</li>
            <li>The inability of third parties to accurately audit AI system insights / decisions</li>
        </ul>
        <li>Accountability - Specific Controls</li>
        <q>The skill and training for AI system operators is crucial. Automated systems pose the risk of over-reliance. Operators, including those exercising judgement over insights or alerts, must be well-trained. This includes the ability to critically evaluate insights and understand system limitations. Users must have confidence in their ability to identify, report, and resolve ethical concerns arising from AI-generated insights or decisions, or empower Responsible Officers to make decisions. Ensure consideration is given to training public servants delivering customer-facing services on how respond to inquiries from customers when AI is utilised, including guidance on who to direct such inquiries to.</q>
        <ul>
            <li>Have you established who is responsible for: <em>(Yes; No or unclear)</em></li>
            <ul>
                <em>
                    <li>Yes: Low Risk - Document who is responsible to each point within the question</li>
                    <li>No or unclear: Very High Risk - Pause the project while you identify who is responsible and make sure they are aware and capable of undertaking their responsibilities. If your solution is operational - consult responsible officers for an appropriate equivalent action</li>
                </em>
            </ul>
            <ul>
                <li>use of the AI outputs, insights and decisions?</li>
                <li>policy/outcomes associated with the AI system?</li>
                <li>monitoring the performance of the AI system?</li>
                <li>data governance?</li>
                <li>technical solution governance?</li>
                <li>appeal and redress processes?</li>
            </ul>
            <q> Responsible Officers: This assessment is to be completed by or, the result confirmed with, the Responsible Officers. The Responsible Officer should be appropriately senior, skilled and qualified for the role.</q>
            <li>Have you established a clear process to: <em>(Yes; No; N/A)</em></li>
            <ul>
                <em>
                    <li>Yes: Low Risk - Document the details, then go to next question</li>
                    <li>No: Very High Risk - Pause your project, consult with relevant stakeholders and establish appropriate processes. If your solution is operational - consult responsible officers for an appropriate equivalent action</li>
                    <li>N/A: N/A - Document your reasons as to why this does not apply, then go to next question</li>
                </em>
            </ul>
            <ul>
                <li>intervene if a relevant stakeholder finds concerns with insights, decisions or content generated (appeal and redress)?</li>
                <li>ensure you do not get overconfident or over reliant on the AI system?</li>
            </ul>
            <q>Human intervention and accountability: For elevated-risk applications, it's crucial to ensure human accountability and intervention capabilities. Consider updating your business continuity plans accordingly to reflect this. This principle may also be relevant for non-elevated risk uses of AI. Doing so will help build public confidence and control in your AI system.</q>
        </ul>
        <li>Risk Mitigation</li>
        <ul>
            <li>Review your self-assessment, list here the mitigations to be applied and the high-level steps you will take in ensuring these are included in your overall risk management plan. Record your decision, the self-assessment and any supporting information in your Records System.</li>
            <q>Monitoring ongoing performance: For elevated-risk applications of AI, continuous performance monitoring is crucial. All AI systems should undergo ongoing evaluation, even those considered low-risk, as they could rapidly deviate from normal parameters of operation. Before scaling beyond the pilot phase, it's essential to identify mechanisms for monitoring and calibrating system performance. These mechanisms may include red teaming, conformity assessments, reinforcement from human feedback, monitoring for model drift, and metrics-based performance testing.</q><br />
            <q>Monitoring ongoing risks: Operational AI systems which progress with High and Very High risks must plan for regular external independent risk audits to cover among other things:
                * the examination and documentation of the effectiveness of risk responses in dealing with identified risk and their root causes, 
                * the effectiveness of the risk management process.
            </q>
            <li>Is your project / system an elevated risk? If, after considering all mitigations provided within the self-assessment, Mid-range or higher residual risk(s) persist, this constitutes an Elevated risk use of AI. Use of a non-transparent, non-auditable algorithms or training data will likely be an elevated risk use of AI. They require protections limiting scope of use, or additional risk mitigations. <em>(Yes, I have a high or very high risk residual risk; Yes, I have mid-range residual risks; No, I have low residual risks; No, I have very low or N/A residual risk)</em></li>
            <ul>
                <em>
                    <li>Yes, I have a high or very high risk residual risk: Very High Risk - Don't proceed without legal advice. If the pilot proceeds, pilot first with ongoing controls and monitoring. A formal review should be conducted after pilot phase. Conduct an independent risk audit, and your self-assessment needs to be reviewed by the NSW AI Review Committee. If your solution is operational - consult responsible officers for an appropriate equivalent action.</li>
                    <li>Yes, I have mid-range residual risks: Mid-range Risk - Don't proceed without legal advice. If the project proceeds, pilot first with ongoing controls and monitoring, consider a review by the NSW AI Review Committee and conduct an independent risk audit. If your solution is operational - consult responsible officers for an appropriate equivalent action.</li>
                    <li>No, I have low residual risks: Low Risk - Proceed with appropriate controls and monitoring. Consider doing a pilot if there is any potential for the risk profile to increase</li>
                    <li>No, I have very low or N/A residual risk: Very Low Risk - Proceed with appropriate controls and monitoring.</li>
                </em>
            </ul>
            <q>The importance of documenting your assessment: You must make sure your answers, explanations and risk mitigating controls are recorded in your Record Management system. For Elevated risk uses of AI which include Mid-Range risks or higher, the public benefits must be clear and documented before proceeding.</q>
        </ul>
        <li>Procurement - Specific Controls (yes, no, unclear)</li>
        <ul>
            <li>When considering risks, did you identify treatments for these risks that were system requirements or contractual controls? In terms of a relative scope for control of potential risks:
            <ul>
                <li>Buy AI and use has high supplier control, low agency control</li>
                <li>Embed AI and/or co-train has shared supplier and agency control</li>
                <li>Develop AI and/or train has no supplier control, full agency control</li>
            </ul>
            Ensure that supplier services are considered for providing skills development and knowledge transfer to help fulfill your responsibilities. <em>(Yes; No; Unclear)</em></li>
            <ul>
                <em>
                    <li>Yes: Low Risk - List the types of treatments that will be applied and categorise them against procurement controls mentioned above</li>
                    <li>No: Very High Risk - Proceed to next step</li>
                    <li>Unclear: Very High Risk - Pause the project and review with the responsible officers and your risk team</li>
                </em>
            </ul>
            <q>Translating requirements into controls: Below are examples of translating the AI risk considerations from this framework into requirements and contractual controls
                Data Governance: Procurements involving AI systems should establish explicit expectations and implement controls to assure high-quality data is maintained through security-by-design and privacy-by-design principles.
                Monitoring ongoing performance: Regular performance evaluations and risk assessments for AI systems should be structured into the service agreement, ensuring that the supplier consistently maintains performance at various stages and checkpoints.
                System updates:  AI systems often receive updates and enhancements from third-party providers, which occur post-initial risk assessment. These updates necessitate robust control measures to manage any new risks that may be introduced.
                Transparency, Explainability, and Auditing: Ensure that purchasers have sufficient transparency and explainability, along with access to third-party auditing. These measures are crucial for effective risk management, justifying decisions, and correctly assigning legal responsibilities to suppliers.</q>
            <li>Are the contractual clauses in your contract sufficient for the identified contractual controls? Response: Provide details regarding your assessment of the contractual controls that the chosen contract has against the inherent risks identified. <em>(Yes; No; Unclear)</em></li>
            <ul>
                <em>
                    <li>Yes: Low Risk - Proceed to next step</li>
                    <li>No: Very High Risk - If your assessment is against Core& you must use ICTA, before proceeding to the next step, and you must reassess against ICTA. If using ICTA, draft appropriate additional conditions through the Order Form of the ICTA to satisfy requirements</li>
                    <li>Unclear: Very High Risk - Pause the project and consult with either the legal team, responsible officers and risk teams (or both) to determine the status of the clauses and the path forward</li>
                </em>
            </ul>
            <li>When considering risks, were there any questions that you could not answer or could only partially answer due to supplier provided products or services? <em>(Yes; No; Unclear)</em></li>
            <ul>
                <em>
                    <li>Yes: Very Hight Risk - Document the questions below that will require input from suppliers when you approach the market</li>
                    <li>No: Low Risk - Proceed to next step</li>
                    <li>Unclear: Very High Risk - Pause the project and review with the responsible officers and your risk team</li>
                </em>
            </ul>
            <li>Are there any residual risk factors with a level above “Low”? Response: If your answer is “unclear”, please provide further details. <em>(Yes; No; Unclear)</em></li>
            <ul>
                <em>
                    <li>Yes: High Risk - You must use the ICTA contract if you proceed</li>
                    <li>No: Low Risk - You may use Core& or ICTA</li>
                    <li>Unclear: High Risk - Pause the project and consult with either your legal team, responsible officers and risk teams before proceeding</li>
                </em>
            </ul>
            <li>Did you identify any treatments that are system requirements? <em>(Yes; No; Unclear)</em></li>
            <ul>
                <em>
                    <li>Yes: Low Risk - Draft Statement of Requirements and Evaluation Criteria to adequately address the treatments. Document below the system requirements</li>
                    <li>No: Very High Risk - Proceed to next step</li>
                    <li>Unclear: Very High Risk - Pause the project and review with the responsible officers and your risk team to determine the status of the treatments and the path forward</li>
                </em>
            </ul>
            <li>Do all risks have appropriate treatments, including the order in which the treatments are applied? Review the set of treatments and the accompanying residual risk to confirm that all risks are appropriately mitigated or controlled. <em>(Yes; No; Unclear)</em></li>
            <ul>
                <em>
                    <li>Yes: Low Risk - Document below the treatments and the order in which they are applied</li>
                    <li>No: Very High Risk - Pause the project and consult with the appropriate subject matter experts to determine the risk treatment status</li>
                    <li>Unclear: Very High Risk - Pause the project and consult with the responsible officers and your risk team to determine the risk treatment status</li>
                </em>
            </ul>
        </ul>
    </ul>
    </details>
  );
};

export default AIRiskInputForm;
