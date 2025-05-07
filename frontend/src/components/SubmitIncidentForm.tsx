import React, { useState } from "react";

const SubmitIncidentForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    severity: "Low",
    classification: "Unclassified",
    submitted_by: 1, // hardcoded for now; replace with actual user later
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/incidents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Incident submitted!");
    } else {
      alert(`❌ Error: ${data.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "1rem", maxWidth: 500 }}>
      <h2>Submit Incident</h2>

      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <br />

      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
      <br />

      <label>Severity:</label>
      <select name="severity" value={form.severity} onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Critical</option>
      </select>
      <br />

      <label>Classification:</label>
      <select name="classification" value={form.classification} onChange={handleChange}>
        <option>Unclassified</option>
        <option>Confidential</option>
        <option>Secret</option>
        <option>Top Secret</option>
      </select>
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default SubmitIncidentForm;
