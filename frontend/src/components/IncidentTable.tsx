import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Typography,
  Box,
  TextField,
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

type Order = "asc" | "desc";

const IncidentTable = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [orderBy, setOrderBy] = useState<keyof Incident>("timestamp");
  const [order, setOrder] = useState<Order>("desc");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchIncidents = async () => {
      const res = await fetch("http://localhost:5000/incidents");
      const data = await res.json();
      setIncidents(data);
    };
    fetchIncidents();
  }, []);

  const handleSort = (property: keyof Incident) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filtered = incidents.filter(
    (incident) =>
      incident.title.toLowerCase().includes(search.toLowerCase()) ||
      incident.severity.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const valA = a[orderBy];
    const valB = b[orderBy];
    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Incident Table
      </Typography>

      <TextField
        label="Search by title or severity"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "title",
                "severity",
                "classification",
                "status",
                "submitted_by",
                "timestamp",
              ].map((key) => (
                <TableCell key={key}>
                  <TableSortLabel
                    active={orderBy === key}
                    direction={orderBy === key ? order : "asc"}
                    onClick={() => handleSort(key as keyof Incident)}
                  >
                    {key.replace("_", " ").toUpperCase()}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map((incident) => (
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
