import React, { useState } from "react";
import {
  makeStyles,
  Typography,
  TextField,
  Button,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@ellucian/react-design-system/core";
import { spacing40, spacing20 } from "@ellucian/react-design-system/core/styles/tokens";

const useStyles = makeStyles()({
  container: {
    margin: spacing20,
  },
  formRow: {
    display: "flex",
    margin: "10px",
    gap: "10px",
  },
  form: {
    // display: "grid",
    // gridTemplateColumns: "repeat(3, 1fr)",
    // gap: spacing40,
    // marginBottom: spacing40,
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "10px",
  },
  table: {
    marginTop: spacing40,
  },
});

// Mock student data
const mockStudents = [
  {
    firstName: "John",
    lastName: "Doe",
    nationality: "USA",
    gpa: 3.5,
    course: "Computer Science",
    status: "Active",
    hold: "No",
    cohort: "2023",
  },
  {
    firstName: "Amit",
    lastName: "Sharma",
    nationality: "India",
    gpa: 3.8,
    course: "Engineering",
    status: "Active",
    hold: "Yes",
    cohort: "2022",
  },
];

const StudentSearchCard = () => {
  const { classes } = useStyles();

  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    nationality: "",
    gpa: "",
    course: "",
    status: "",
    hold: "",
    cohort: "",
  });

  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleChange = (field) => (event) => {
    setFilters({
      ...filters,
      [field]: event.target.value,
    });
  };

  const handleSearch = () => {
    const filtered = mockStudents.filter((student) => {
      return Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        return String(student[key])
          .toLowerCase()
          .includes(filters[key].toLowerCase());
      });
    });

    setResults(filtered);
    setSearched(true); // ✅ Fix 2: mark that a search has been performed
  };

  return (
    <div className={classes.container}>
      {/* Search Form */}
      <div className={classes.form}>
        <div className={classes.formRow}>
          <TextField
            label="First Name"
            value={filters.firstName}
            onChange={handleChange("firstName")}
          />
          <TextField
            label="Last Name"
            value={filters.lastName}
            onChange={handleChange("lastName")}
          />
        </div>
        <div className={classes.formRow}>
          <TextField
            label="Nationality"
            value={filters.nationality}
            onChange={handleChange("nationality")}
          />
          <TextField
            label="GPA"
            value={filters.gpa}
            onChange={handleChange("gpa")}
          />
        </div>

        <div className={classes.actions}>
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </div>

      {/* ✅ Fix 2: Show no results message */}
      {searched && results.length === 0 && (
        <Typography>No students found matching your criteria.</Typography>
      )}

      {/* Results Table */}
      {results.length > 0 && (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Nationality</TableCell>
              <TableCell>GPA</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Hold</TableCell>
              <TableCell>Cohort</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{student.nationality}</TableCell>
                <TableCell>{student.gpa}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell>{student.status}</TableCell>
                <TableCell>{student.hold}</TableCell>
                <TableCell>{student.cohort}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default StudentSearchCard;
