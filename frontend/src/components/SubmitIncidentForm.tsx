import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Snackbar,
  Alert,
} from "@mui/material";

const SubmitIncidentForm = () => {
  const initialForm = {
    title: "",
    description: "",
    severity: "Low",
    classification: "Unclassified",
    submitted_by: 1,
  };

  const [form, setForm] = useState(initialForm);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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
      setForm(initialForm); // ✅ reset form on success
    }

    setSnackbar({
      open: true,
      message: res.ok ? "✅ Incident submitted!" : `❌ ${data.error}`,
      severity: res.ok ? "success" : "error",
    });
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 500,
          mx: "auto",
          mt: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Submit Incident
        </Typography>

        <TextField
          fullWidth
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          multiline
          rows={4}
          margin="normal"
          required
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Severity</InputLabel>
          <Select
            name="severity"
            value={form.severity}
            onChange={handleChange}
            label="Severity"
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Critical">Critical</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Classification</InputLabel>
          <Select
            name="classification"
            value={form.classification}
            onChange={handleChange}
            label="Classification"
          >
            <MenuItem value="Unclassified">Unclassified</MenuItem>
            <MenuItem value="Confidential">Confidential</MenuItem>
            <MenuItem value="Secret">Secret</MenuItem>
            <MenuItem value="Top Secret">Top Secret</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SubmitIncidentForm;
