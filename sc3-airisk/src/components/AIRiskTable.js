import React from "react";
import "./AIRisk.css";

const AIRiskTable = () => {
  return (
    <>
      <h3>Risk Table:</h3>
      <table className="air-risk-table">
        <thead>
          <tr>
            <th>Risk Description</th>
          <th>Risk Level</th>
        </tr>
      </thead>
      <tbody>
        {/* Render risk data rows here */}
      </tbody>
    </table>
    </>
  );
};

export default AIRiskTable;
