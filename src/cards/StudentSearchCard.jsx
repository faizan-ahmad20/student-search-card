import React, { useEffect, useState } from "react";
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
  CircularProgress,
  SelectionMenu,
} from "@ellucian/react-design-system/core";
import {
  spacing40,
  spacing20,
} from "@ellucian/react-design-system/core/styles/tokens";
import useStudentInformation from "../hooks/useGetStudentsInformation.js";
import { useData, useCardInfo } from "@ellucian/experience-extension-utils";

const useStyles = makeStyles()({
  container: {
    margin: spacing20,
  },
  formRow: {
    display: "flex",
    margin: "10px",
    gap: "10px",
  },
  form: {},
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "10px",
  },
  table: {
    marginTop: spacing40,
  },
});

const StudentSearchCard = () => {
  const { cardId } = useCardInfo();
  const { authenticatedEthosFetch } = useData();
  const { classes } = useStyles();

  const {
    getStudentInformation,
    loadingStudentInfo,
    errorStudentInfo,
    studentInfoResult,
  } = useStudentInformation(authenticatedEthosFetch, cardId);

  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    gpa: "",
  });
  const [searched, setSearched] = useState(false);

  const handleChange = (field) => (event) => {
    // Check if the input is a standard event or a direct value
    const value = event?.target ? event.target.value : event;
    console.log(value);

    setFilters({ ...filters, [field]: value });
  };

  const handleSearch = async () => {
    setSearched(true);
    try {
      await getStudentInformation({
        firstName: filters.firstName,
        lastName: filters.lastName,
        gender: filters.gender,
        gpa: filters.gpa,
      });
    } catch {
      // error is already captured in errorStudentInfo
    }
  };

  useEffect(() => {
    getStudentInformation({
      firstName: filters.firstName,
      lastName: filters.lastName,
      gender: filters.gender,
      gpa: filters.gpa,
    });
  }, []);

  const results = studentInfoResult ?? [];

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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography>Gender: </Typography>
            <SelectionMenu
              label="Gender"
              value={filters.gender}
              onChange={handleChange("gender")}
              native
              style={{
                minWidth: "80px",
              }}
            >
              <option value="">All</option>
              <option value="M">M</option>
              <option value="F">F</option>
            </SelectionMenu>
          </div>
          <TextField
            label="GPA"
            value={filters.gpa}
            onChange={handleChange("gpa")}
          />
        </div>
        <div className={classes.actions}>
          <Button onClick={handleSearch} disabled={loadingStudentInfo}>
            {loadingStudentInfo ? <CircularProgress size={20} /> : "Search"}
          </Button>
        </div>
      </div>

      {/* Error state */}
      {errorStudentInfo && (
        <Typography color="error">{errorStudentInfo}</Typography>
      )}

      {/* Empty state */}
      {searched &&
        !loadingStudentInfo &&
        !errorStudentInfo &&
        results.length === 0 && (
          <Typography>No students found matching your criteria.</Typography>
        )}

      {/* Results Table */}
      {results.length > 0 && (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Spriden ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>GPA</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((student, index) => (
              <TableRow key={`${student.spridenId}-${index}`}>
                <TableCell>{student.spridenId}</TableCell>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{student.sex}</TableCell>
                <TableCell>{student.gpa}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default StudentSearchCard;
