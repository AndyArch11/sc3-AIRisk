import React from "react";
import "./AIRisk.css";

const AIRiskTable = () => {
  return (
    <details className="air-table-section">
      <summary className="air-table-summary">
        🗃️ AI Risk Table
      </summary>
      <table className="air-risk-table">
        <thead>
          <tr>
            <th>Risk Description</th>
          <th>Risk Level</th>
        </tr>
      </thead>
      <tbody>
        {/* Render risk data rows here */}
        <tr>
          <td>Example Risk Description</td>
          <td>High</td>
        </tr>
      </tbody>
    </table>
    </details>
  );
};

export default AIRiskTable;
