import React, { useContext, useState } from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import axios from "axios";
import ButtonAppBar from "./AppBar";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    department: "",
    fee: "",
  });

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/courses", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setFormData({
          courseName: "",
          department: "",
          fee: "",
        });
        navigate("/courses");
      })
      .catch((err) => {
        console.error(err);
        // Handle error
      });
  };

  return (
    <Box>
      <ButtonAppBar />
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Add Course
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Course Name"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Fee"
            name="fee"
            type="number"
            value={formData.fee}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Course
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddCourse;
