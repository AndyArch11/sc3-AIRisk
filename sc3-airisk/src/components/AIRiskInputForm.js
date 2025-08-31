import React from "react";
import "./AIRisk.css";

const AIRiskInputForm = () => {
  return (
    <>
      <h3>Risk Input Form:</h3>
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
        <li>Scope - Potential Elevated Risk (Yes/No)</li>
        <ul>
            <li>Operational Impact: Does your system produce or directly influence any administrative decisions (government decision with legal or similar significant effect)? i.e., automating decisions on issuing infringements.</li>
            <li>Operational Impact: Does your system trigger a real-world action with more than negligible potential effect (meaningful change to environment or system state)? i.e., an automated alerting system.</li>
            <li>Autonomous: Does your system operate autonomously or have potential to produce harmful outputs independently of human action, without requiring manual initiation? i.e., autonomous vehicles.</li>
            <li>Data Sensitivity: Was any part of your system trained using sensitive information or can it produce outputs which contain sensitive information? i.e. a biometric based face matching system</li>
            <li>Unintended harms: Is there a risk of system failure, misuse, or inappropriately deployed that could cause harm to an individual or group? i.e., systems using unverifiable data inputs</li>
            <li>Explainability and Transparency: Does your system fail to provide explainability for generated content and decisions, hindering comprehension by laypeople and assessment by technical experts? i.e., information informing policy development</li>
        </ul>
        <li>Scope - Do I need to use the framework (Yes/No)</li>
        <ul>
            <li>Buy AI and use - Buying or using an off the shelf system. Used without modifying the algorithm or any risk mitigation tools, nor adding domain-specific content. i.e. ChatGPT, or AI in Salesforce, SAP, etc.</li>
            <li>Embed AI and/or co-train - Developing a product with embedded AI or purchasing an AI platform and augmented training data with domain-specific content. i.e., integrating AI biometrics or developing a chatbot with augmented training.</li>
            <li>Develop AI and/or train - Developing an AI tool in-house. Even if based on a standard platform, I am developing algorithms and supplying the training data. i.e. Developing anomaly detection or training LLM with domain-specific content.</li>
            <li>Automating decisions - Developing a tool in-house that uses AI and that automates at least one critical step in the decision-making process. i.e. AI powered hiring and recruitment.</li>
        </ul>
        <li>Human Rights Impact Assessment (Free text)</li>
        <ul>
            <li>Is the use of the AI system likely to restrict human rights? If so, is any such restriction publicly justifiable?</li>
            <li>Were possible trade-offs between the different principles and rights ascertained, documented, and evaluated?</li>
            <li>Does the AI system suggest actions or decisions to make, or outline choices to human users?</li>
            <li>Could the AI system inadvertently impact human users' autonomy by influencing and obstructing their decision-making?</li>
            <li>Did you evaluate whether the AI system should inform users that its outputs, content, recommendations, or results arise from an algorithmic decision?</li>
        </ul>
        <li>Community Benefit - General Benefits (Confidence Levels - N/A, Very Low, Low, Mid-range, High, Very High)</li>
        <ul>
            <li>Delivering a better-quality existing service or outcome (for example, accuracy or client satisfaction)</li>
            <li>Reducing processing or delivery times</li>
            <li>Generating financial efficiencies or savings</li>
            <li>Providing an AI capability that could be used or adapted by other agencies</li>
            <li>Delivering a new service or outcome (particularly if it cannot be done without using AI)</li>
            <li>Enabling future innovations to existing services, or new services or outcomes</li>
        </ul>
        <li>Community Benefit - General Risk Factor Assessment (Risk - N/A, Low, Mid-range, High, Very High)</li>
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
            <li>Were other non-AI systems considered? (yes, informally, no, N/A)</li>
            <li>Does this system and the use of data align with relevant legislation? (yes, unclear, no)</li>
        </ul>
        <li>Community Benefit - Potential Harms - negative consequences (Risk - N/A, Low, Mid-range, High, Very High)</li>
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
            <li>Could the AI system cause harms that are reversible? (no, yes and mid-range or higher risk, yes and low to very low risk, unclear)</li>
            <li>Could the AI system cause harms that are irreversible? Example: Autonomous AI systems on critical infrastructure (i.e. energy) (no, yes but it's better than existing system, yes, unclear)</li>
            <li>Could the AI System result in secondary harms, or result in a cumulative harm from repeated application of the AI System? Example of a cumulative harm is a video system initially collecting and analysing data for security purposes, but over time, as more data is gathered and analysed, individual privacy could be at risk. (no, yes and mid-range or higher risk, yes and low to very low risk, unclear)</li>
        </ul>
        <li>Fairness - Risk Factors and Ratings (Risk - N/A, Low, Mid-range, High, Very High)</li>
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
        <li>Privacy and Security - Specific Controls</li>
        <li>Transparency - Risk Factors and Ratings (Risk - N/A, Low, Mid-range, High, Very High)</li>
        <ul>
            <li>Incomplete documentation of AI system design, or implementation, or operation</li>
            <li>No or limited access to model's internal workings or source code (“Black Box”)</li>
            <li>Being unable to explain the output of a complex model</li>
            <li>A member of the public being unaware that they are interacting with an AI system</li>
            <li>No or low ability to incorporate user feedback into an AI system or model</li>
            <li>The inability to audit past decisions, where input from AI systems was used.</li>
        </ul>
        <li>Transparency - Specific Controls</li>
        <li>Accountability - Risk Factors and Ratings (Risk - N/A, Low, Mid-range, High, Very High)</li>
        <ul>
            <li>Insufficient training of AI system operators</li>
            <li>Insufficient awareness of system limitations of Responsible Officers</li>
            <li>No or low documentation of performance targets or “Fairness” principles trade-offs</li>
            <li>No or limited mechanisms to record insight / AI System decision history</li>
            <li>The inability of third parties to accurately audit AI system insights / decisions</li>
        </ul>
        <li>Accountability - Specific Controls</li>
        <li>Risk Mitigation</li>
        <li>Procurement - Specific Controls</li>
    </ul>
    </>
  );
};

export default AIRiskInputForm;
