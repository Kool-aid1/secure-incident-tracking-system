import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";

type Incident = {
  id: number;
  title: string;
  description: string;
  severity: string;
  classification: string;
  status: string;
  submitted_by: string;
  timestamp: string;
};

const IncidentTable = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      const res = await fetch("http://localhost:5000/incidents");
      const data = await res.json();
      setIncidents(data);
    };

    fetchIncidents();
  }, []);

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Incident Table
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="incident table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>Classification</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Submitted By</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell>{incident.title}</TableCell>
                <TableCell>{incident.severity}</TableCell>
                <TableCell>{incident.classification}</TableCell>
                <TableCell>{incident.status}</TableCell>
                <TableCell>{incident.submitted_by}</TableCell>
                <TableCell>
                  {new Date(incident.timestamp).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default IncidentTable;
