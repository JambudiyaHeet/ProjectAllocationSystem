import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Paper,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

const AddProjects = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectType, setProjectType] = useState("");
  const [maxStudents, setMaxStudents] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [lastDate, setLastDate] = useState(""); // State for last date (as string)
  const [projectDescription, setProjectDescription] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [projectImage, setProjectImage] = useState(null); // State for project image
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for success message
  const [successMessage, setSuccessMessage] = useState(""); // Success message content

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProject = {
      title: projectTitle,
      type: projectType,
      maxStudentAllow: maxStudents,
      difficultyLevel: difficultyLevel,
      deadline: lastDate || "Not specified", // Use the selected date or a default value
      description: projectDescription,
      additionalNotes: additionalNotes,
      image: projectImage ? URL.createObjectURL(projectImage) : null, // Store image URL
    };

    try {
      // Send the data to the backend
      const response = await axios.post("http://localhost:8000/project", newProject);
      console.log("Project saved successfully:", response.data);

      // Show success message
      setSuccessMessage(
        `Project "${newProject.title}" added successfully!\nType: ${newProject.type}\nMax Students: ${newProject.MaxStudentAllow}\nDifficulty: ${newProject.difficultyLevel}\nLast Date: ${newProject.deadline}`
      );
      setOpenSnackbar(true);

      // Clear form fields
      setProjectTitle("");
      setProjectType("");
      setMaxStudents("");
      setDifficultyLevel("");
      setLastDate("");
      setProjectDescription("");
      setAdditionalNotes("");
      setProjectImage(null);
    } catch (error) {
      console.error("Error saving project:", error);
      setSuccessMessage("Failed to add project. Please try again.");
      setOpenSnackbar(true);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   const formData = new FormData();
  //   formData.append("title", projectTitle);
  //   formData.append("type", projectType);
  //   formData.append("maxStudentAllow", maxStudents);
  //   formData.append("difficultyLevel", difficultyLevel);
  //   formData.append("deadline", lastDate || "Not specified");
  //   formData.append("description", projectDescription);
  //   formData.append("additionalNotes", additionalNotes);
  //   if (projectImage) {
  //     formData.append("image", projectImage);
  //   }
  
  //   try {
  //     const response = await axios.post("http://localhost:8072/project", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     console.log("Project saved successfully:", response.data);
  
  //     setSuccessMessage(`Project "${projectTitle}" added successfully!`);
  //     setOpenSnackbar(true);
  
  //     // Clear form fields
  //     setProjectTitle("");
  //     setProjectType("");
  //     setMaxStudents("");
  //     setDifficultyLevel("");
  //     setLastDate("");
  //     setProjectDescription("");
  //     setAdditionalNotes("");
  //     setProjectImage(null);
  //   } catch (error) {
  //     console.error("Error saving project:", error);
  //     setSuccessMessage("Failed to add project. Please try again.");
  //     setOpenSnackbar(true);
  //   }
  // };

  // Handle image selection
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProjectImage(file);
    }
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ background: "#121212", width: "100vw", minHeight: "100vh", paddingTop: "90px", display: "flex" }}>
      <Container maxWidth="md" sx={{ flexGrow: 1, padding: "20px" }}>
        {/* Title */}
        <Typography variant="h4" sx={{ color: "#ff9800", marginBottom: 2, textAlign: "center" }}>
          Add New Project
        </Typography>

        {/* Project Form */}
        <Paper elevation={3} sx={{ background: "#1e1e1e", padding: "16px", borderRadius: "8px" }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Project Title */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Project Title"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="Enter project title"
                  sx={{
                    background: "#242424",
                    borderRadius: "4px",
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "#ff9800" },
                      "&:hover fieldset": { borderColor: "#ffb74d" },
                      "&.Mui-focused fieldset": { borderColor: "#ff9800" },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#ff9800",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#bbb",
                      opacity: 1,
                    },
                  }}
                />
              </Grid>

              {/* Project Type */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      color: "#ff9800",
                      "&.Mui-focused": {
                        color: "#ff9800",
                        zIndex: 1, // Ensure label is above the border
                      },
                    }}
                  >
                    Project Type
                  </InputLabel>
                  <Select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    sx={{
                      background: "#242424",
                      color: "#fff",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ff9800",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ffb74d",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ff9800",
                      },
                    }}
                  >
                    <MenuItem value="AI-Based">AI-Based</MenuItem>
                    <MenuItem value="Web">Web</MenuItem>
                    <MenuItem value="Mobile App">Mobile App</MenuItem>
                    <MenuItem value="Blockchain">Blockchain</MenuItem>
                    <MenuItem value="ML-Based">ML-Based</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Maximum Students */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Maximum Students"
                  type="number"
                  value={maxStudents}
                  onChange={(e) => setMaxStudents(e.target.value ? parseInt(e.target.value) : "")}
                  placeholder="Enter maximum number of students"
                  sx={{
                    background: "#242424",
                    borderRadius: "4px",
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "#ff9800" },
                      "&:hover fieldset": { borderColor: "#ffb74d" },
                      "&.Mui-focused fieldset": { borderColor: "#ff9800" },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#ff9800",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#bbb",
                      opacity: 1,
                    },
                  }}
                />
              </Grid>

              {/* Difficulty Level */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      color: "#ff9800",
                      "&.Mui-focused": {
                        color: "#ff9800",
                        zIndex: 1, // Ensure label is above the border
                      },
                    }}
                  >
                    Difficulty Level
                  </InputLabel>
                  <Select
                    value={difficultyLevel}
                    onChange={(e) => setDifficultyLevel(e.target.value)}
                    sx={{
                      background: "#242424",
                      color: "#fff",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ff9800",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ffb74d",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ff9800",
                      },
                    }}
                  >
                    <MenuItem value="Easy">Easy</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Hard">Hard</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Last Date to Submit */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last Date to Submit"
                  type="date"
                  value={lastDate}
                  onChange={(e) => setLastDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    background: "#242424",
                    borderRadius: "4px",
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "#ff9800" },
                      "&:hover fieldset": { borderColor: "#ffb74d" },
                      "&.Mui-focused fieldset": { borderColor: "#ff9800" },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#ff9800",
                    },
                  }}
                />
              </Grid>

              {/* Project Image */}
              <Grid item xs={12} md={6}>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="project-image-upload"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="project-image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    sx={{
                      background: "#242424",
                      color: "#ff9800",
                      borderColor: "#ff9800",
                      width: "100%",
                      padding: "10px",
                      "&:hover": {
                        borderColor: "#ffb74d",
                      },
                    }}
                  >
                    {projectImage ? "Change Image" : "Upload Project Image"}
                  </Button>
                </label>
                {projectImage && (
                  <Typography variant="body2" sx={{ color: "#bbb", marginTop: 1 }}>
                    Selected: {projectImage.name}
                  </Typography>
                )}
              </Grid>

              {/* Project Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Project Description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Enter project description"
                  sx={{
                    background: "#242424",
                    borderRadius: "4px",
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "#ff9800" },
                      "&:hover fieldset": { borderColor: "#ffb74d" },
                      "&.Mui-focused fieldset": { borderColor: "#ff9800" },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#ff9800",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#bbb",
                      opacity: 1,
                    },
                  }}
                />
              </Grid>

              {/* Additional Notes */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Additional Notes"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Enter additional notes"
                  sx={{
                    background: "#242424",
                    borderRadius: "4px",
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "#ff9800" },
                      "&:hover fieldset": { borderColor: "#ffb74d" },
                      "&.Mui-focused fieldset": { borderColor: "#ff9800" },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#ff9800",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#bbb",
                      opacity: 1,
                    },
                  }}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ background: "#ff9800", color: "#000", width: "100%", padding: "8px" }}
                >
                  Add Project
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>

      {/* Success Message Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddProjects;
