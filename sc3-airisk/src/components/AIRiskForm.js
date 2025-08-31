import React, { useState } from "react";
import "./AIRisk.css"
import AIRiskIntro from "./AIRiskIntro";
import AIRiskInputForm from "./AIRiskInputForm";
import AIRiskTable from "./AIRiskTable";
import AIRiskReport from "./AIRiskReport";

const VERSION = "v0.1.0"; // Update as needed

// Helper to get today's date in YYYY-MM-DD format
const getToday = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

const initialForm = {
  date: getToday(),
  // Add other form fields as needed
};

const AIRiskForm = () => {
  const [form, setForm] = useState(initialForm);

  return (
    <div className="air-main-container">
      <h2 className="air-main-heading">
        AI Risk Assessment Form
      </h2>
      <AIRiskIntro />
      <AIRiskInputForm />
      <AIRiskTable />
      <AIRiskReport />
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