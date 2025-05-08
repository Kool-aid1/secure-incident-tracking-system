import React from "react";
import SubmitIncidentForm from "./components/SubmitIncidentForm";
import IncidentTable from "./components/IncidentTable";

function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Secure Incident Tracking System</h1>
      <SubmitIncidentForm />
      <IncidentTable />
    </div>
  );
}

export default App;
