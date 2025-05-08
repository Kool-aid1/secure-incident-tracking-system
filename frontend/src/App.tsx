import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SubmitIncidentForm from "./components/SubmitIncidentForm";
import IncidentTable from "./components/IncidentTable";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/submit" element={<SubmitIncidentForm />} />
        <Route path="/incidents" element={<IncidentTable />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;
