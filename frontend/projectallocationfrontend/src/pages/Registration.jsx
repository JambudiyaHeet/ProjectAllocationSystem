// import React, { useState } from "react";
// import {
//   Button,
//   TextField,
//   Box,
//   Typography,
//   Container,
//   Grid,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormControl,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";

// const Registration = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "Student", // Default role is "Student"
//     cpi: "",
//     project1: "",
//     project2: "",
//     project3: "",
//     expertise: [],
//     maxGroups: 0,
//     bio: "",
//     phone: "",
//     officeHours: "",
//     ongoingProjects: [],
//     awards: [],
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Registration Data:", formData);
//     navigate("/dashboard");
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <Container maxWidth="md">
//         <Box
//           sx={{
//             marginTop: 16, // Increased margin to clear navbar
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             background: "#1e1e1e",
//             padding: "30px",
//             borderRadius: "10px",
//             boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
//             color: "#fff",
//           }}
//         >
//           <Typography variant="h5" component="h1" sx={{ marginBottom: 2 }}>
//             {formData.role === "Faculty" ? "Faculty Registration" : "Student Registration"}
//           </Typography>

//           <form onSubmit={handleSubmit} style={{ width: "100%" }}>
//             <Grid container spacing={3}>
//               {/* Personal Information Section */}
//               <Grid item xs={12}>
//                 <Typography variant="subtitle1" sx={{ mb: 1, color: "#888" }}>
//                   Personal Information
//                 </Typography>

//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       fullWidth
//                       label="Full Name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       sx={{
//                         "& .MuiInputLabel-root": { color: "#bbb" },
//                         "& .MuiOutlinedInput-root": {
//                           "& fieldset": { borderColor: "#444" },
//                           "&:hover fieldset": { borderColor: "#666" },
//                           "&.Mui-focused fieldset": { borderColor: "#1976d2" },
//                         },
//                         "& .MuiInputBase-input": { color: "#fff" },
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       fullWidth
//                       label="Email"
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       sx={{
//                         "& .MuiInputLabel-root": { color: "#bbb" },
//                         "& .MuiOutlinedInput-root": {
//                           "& fieldset": { borderColor: "#444" },
//                           "&:hover fieldset": { borderColor: "#666" },
//                           "&.Mui-focused fieldset": { borderColor: "#1976d2" },
//                         },
//                         "& .MuiInputBase-input": { color: "#fff" },
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Password"
//                       type="password"
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       required
//                       sx={{
//                         "& .MuiInputLabel-root": { color: "#bbb" },
//                         "& .MuiOutlinedInput-root": {
//                           "& fieldset": { borderColor: "#444" },
//                           "&:hover fieldset": { borderColor: "#666" },
//                           "&.Mui-focused fieldset": { borderColor: "#1976d2" },
//                         },
//                         "& .MuiInputBase-input": { color: "#fff" },
//                       }}
//                     />
//                   </Grid>

//                   {/* Role Selection */}
//                   <Grid item xs={12}>
//                     <FormControl fullWidth>
//                       <InputLabel
//                         sx={{
//                           color: "#bbb",
//                           "&.Mui-focused": {
//                             color: "#1976d2",
//                           },
//                         }}
//                       >
//                         Role
//                       </InputLabel>
//                       <Select
//                         name="role"
//                         value={formData.role}
//                         onChange={handleChange}
//                         sx={{
//                           "& .MuiOutlinedInput-root": {
//                             "& fieldset": { borderColor: "#444" },
//                             "&:hover fieldset": { borderColor: "#666" },
//                             "&.Mui-focused fieldset": { borderColor: "#1976d2" },
//                           },
//                           "& .MuiInputBase-input": { color: "#fff" },
//                         }}
//                       >
//                         <MenuItem value="Student">Student</MenuItem>
//                         <MenuItem value="Faculty">Faculty</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                 </Grid>
//               </Grid>

//               {/* Academic Information Section (Only for Students) */}
//               {formData.role === "Student" && (
//                 <Grid item xs={12}>
//                   <Typography variant="subtitle1" sx={{ mb: 1, mt: 2, color: "#888" }}>
//                     Academic Information
//                   </Typography>

//                   <Grid container spacing={2}>
//                     <Grid item xs={12} sm={6}>
//                       <TextField
//                         fullWidth
//                         label="CPI (Cumulative Performance Index)"
//                         type="number"
//                         name="cpi"
//                         value={formData.cpi}
//                         onChange={handleChange}
//                         inputProps={{ min: 0, max: 10, step: 0.1 }}
//                         required
//                         sx={{
//                           "& .MuiInputLabel-root": { color: "#bbb" },
//                           "& .MuiOutlinedInput-root": {
//                             "& fieldset": { borderColor: "#444" },
//                             "&:hover fieldset": { borderColor: "#666" },
//                             "&.Mui-focused fieldset": { borderColor: "#1976d2" },
//                           },
//                           "& .MuiInputBase-input": { color: "#fff" },
//                         }}
//                       />
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               )}

//               {/* Projects Section (Only for Students) */}
//               {formData.role === "Student" && (
//                 <Grid item xs={12}>
//                   <Typography variant="subtitle1" sx={{ mb: 1, mt: 2, color: "#888" }}>
//                     Projects
//                   </Typography>

//                   <Grid container spacing={2}>
//                     <Grid item xs={12} sm={6}>
//                       <TextField
//                         fullWidth
//                         label="Project 1 Name"
//                         name="project1"
//                         value={formData.project1}
//                         onChange={handleChange}
//                         required
//                         sx={{
//                           "& .MuiInputLabel-root": { color: "#bbb" },
//                           "& .MuiOutlinedInput-root": {
//                             "& fieldset": { borderColor: "#444" },
//                             "&:hover fieldset": { borderColor: "#666" },
//                             "&.Mui-focused fieldset": { borderColor: "#1976d2" },
//                           },
//                           "& .MuiInputBase-input": { color: "#fff" },
//                         }}
//                       />
//                     </Grid>

//                     <Grid item xs={12} sm={6}>
//                       <TextField
//                         fullWidth
//                         label="Project 2 Name"
//                         name="project2"
//                         value={formData.project2}
//                         onChange={handleChange}
//                         sx={{
//                           "& .MuiInputLabel-root": { color: "#bbb" },
//                           "& .MuiOutlinedInput-root": {
//                             "& fieldset": { borderColor: "#444" },
//                             "&:hover fieldset": { borderColor: "#666" },
//                             "&.Mui-focused fieldset": { borderColor: "#1976d2" },
//                           },
//                           "& .MuiInputBase-input": { color: "#fff" },
//                         }}
//                       />
//                     </Grid>

//                     <Grid item xs={12} sm={6}>
//                       <TextField
//                         fullWidth
//                         label="Project 3 Name"
//                         name="project3"
//                         value={formData.project3}
//                         onChange={handleChange}
//                         sx={{
//                           "& .MuiInputLabel-root": { color: "#bbb" },
//                           "& .MuiOutlinedInput-root": {
//                             "& fieldset": { borderColor: "#444" },
//                             "&:hover fieldset": { borderColor: "#666" },
//                             "&.Mui-focused fieldset": { borderColor: "#1976d2" },
//                           },
//                           "& .MuiInputBase-input": { color: "#fff" },
//                         }}
//                       />
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               )}

//               {/* Faculty Specific Fields */}
//               {formData.role === "Faculty" && (
//                 <>
//                   <Grid item xs={12}>
//                     <Typography variant="subtitle1" sx={{ mb: 1, mt: 2, color: "#888" }}>
//                       Faculty Information
//                     </Typography>

//                     <Grid container spacing={2}>
//                       <Grid item xs={12} sm={6}>
//                         <TextField
//                           fullWidth
//                           label="Expertise (comma separated)"
//                           name="expertise"
//                           value={formData.expertise.join(", ")}
//                           onChange={(e) => setFormData({ ...formData, expertise: e.target.value.split(", ") })}
//                           required
//                           sx={{
//                             "& .MuiInputLabel-root": { color: "#bbb" },
//                             "& .MuiOutlinedInput-root": {
//                               "& fieldset": { borderColor: "#444" },
//                               "&:hover fieldset": { borderColor: "#666" },
//                               "&.Mui-focused fieldset": { borderColor: "#1976d2" },
//                             },
//                             "& .MuiInputBase-input": { color: "#fff" },
//                           }}
//                         />
//                       </Grid>

//                       <Grid item xs={12} sm={6}>
//                         <TextField
//                           fullWidth
//                           label="Max Groups"
//                           type="number"
//                           name="maxGroups"
//                           value={formData.maxGroups}
//                           onChange={handleChange}
//                           required
//                           sx={{
//                             "& .MuiInputLabel-root": { color: "#bbb" },
//                             "& .MuiOutlinedInput-root": {
//                               "& fieldset": { borderColor: "#444" },
//                               "&:hover fieldset": { borderColor: "#666" },
//                               "&.Mui-focused fieldset": { borderColor: "#1976d2" },
//                             },
//                             "& .MuiInputBase-input": { color: "#fff" },
//                           }}
//                         />
//                       </Grid>

//                       <Grid item xs={12}>
//                         <TextField
//                           fullWidth
//                           label="Bio"
//                           name="bio"
//                           value={formData.bio}
//                           onChange={handleChange}
//                           required
//                           sx={{
//                             "& .MuiInputLabel-root": { color: "#bbb" },
//                             "& .MuiOutlinedInput-root": {
//                               "& fieldset": { borderColor: "#444" },
//                               "&:hover fieldset": { borderColor: "#666" },
//                               "&.Mui-focused fieldset": { borderColor: "#1976d2" },
//                             },
//                             "& .MuiInputBase-input": { color: "#fff" },
//                           }}
//                         />
//                       </Grid>

//                       <Grid item xs={12} sm={6}>
//                         <TextField
//                           fullWidth
//                           label="Phone"
//                           name="phone"
//                           value={formData.phone}
//                           onChange={handleChange}
//                           required
//                           sx={{
//                             "& .MuiInputLabel-root": { color: "#bbb" },
//                             "& .MuiOutlinedInput-root": {
//                               "& fieldset": { borderColor: "#444" },
//                               "&:hover fieldset": { borderColor: "#666" },
//                               "&.Mui-focused fieldset": { borderColor: "#1976d2" },
//                             },
//                             "& .MuiInputBase-input": { color: "#fff" },
//                           }}
//                         />
//                       </Grid>

//                       <Grid item xs={12} sm={6}>
//                         <TextField
//                           fullWidth
//                           label="Office Hours"
//                           name="officeHours"
//                           value={formData.officeHours}
//                           onChange={handleChange}
//                           required
//                           sx={{
//                             "& .MuiInputLabel-root": { color: "#bbb" },
//                             "& .MuiOutlinedInput-root": {
//                               "& fieldset": { borderColor: "#444" },
//                               "&:hover fieldset": { borderColor: "#666" },
//                               "&.Mui-focused fieldset": { borderColor: "#1976d2" },
//                             },
//                             "& .MuiInputBase-input": { color: "#fff" },
//                           }}
//                         />
//                       </Grid>

//                       <Grid item xs={12}>
//                         <TextField
//                           fullWidth
//                           label="Ongoing Projects (comma separated)"
//                           name="ongoingProjects"
//                           value={formData.ongoingProjects.join(", ")}
//                           onChange={(e) => setFormData({ ...formData, ongoingProjects: e.target.value.split(", ") })}
//                           sx={{
//                             "& .MuiInputLabel-root": { color: "#bbb" },
//                             "& .MuiOutlinedInput-root": {
//                               "& fieldset": { borderColor: "#444" },
//                               "&:hover fieldset": { borderColor: "#666" },
//                               "&.Mui-focused fieldset": { borderColor: "#1976d2" },
//                             },
//                             "& .MuiInputBase-input": { color: "#fff" },
//                           }}
//                         />
//                       </Grid>

//                       <Grid item xs={12}>
//                         <TextField
//                           fullWidth
//                           label="Awards (comma separated)"
//                           name="awards"
//                           value={formData.awards.join(", ")}
//                           onChange={(e) => setFormData({ ...formData, awards: e.target.value.split(", ") })}
//                           sx={{
//                             "& .MuiInputLabel-root": { color: "#bbb" },
//                             "& .MuiOutlinedInput-root": {
//                               "& fieldset": { borderColor: "#444" },
//                               "&:hover fieldset": { borderColor: "#666" },
//                               "&.Mui-focused fieldset": { borderColor: "#1976d2" },
//                             },
//                             "& .MuiInputBase-input": { color: "#fff" },
//                           }}
//                         />
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                 </>
//               )}
//             </Grid>

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{
//                 marginTop: 2,
//                 background: "#1976d2",
//                 color: "#fff",
//                 "&:hover": { background: "#1565c0" },
//               }}
//             >
//               Register
//             </Button>
//           </form>

//           <Typography sx={{ marginTop: 2, color: "#bbb" }}>
//             Already have an account?{" "}
//             <Link to="/login" style={{ color: "#1976d2", textDecoration: "none" }}>
//               Login
//             </Link>
//           </Typography>
//         </Box>
//       </Container>
//     </motion.div>
//   );
// };

// export default Registration;

import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student", // Default role is "Student"
    cpi: "",
    project1: "",
    project2: "",
    project3: "",
    expertise: "",
    maxGroups: 0,
    bio: "",
    phone: "",
    officeHours: "",
    ongoingProjects: "",
    awards: "",
    rollno:"",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.role === "Faculty") {
        // Prepare faculty data for submission
        const facultyData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          expertise: formData.expertise,
          maxGroups: formData.maxGroups,
          bio: formData.bio,
          phone: formData.phone,
          officeHours: formData.officeHours,
          ongoingProjects: formData.ongoingProjects,
          awards: formData.awards,
        };

        // Make a POST request to the backend
        const response = await axios.post("http://localhost:8072/faculty", facultyData);

        // Log the response and navigate to the dashboard
        console.log("Faculty added successfully:", response.data);
        dispatch(setUser(response.data));
        navigate("/dashboard");
      } else {
          // Prepare student data for submission
          const studentData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            cpi: parseFloat(formData.cpi), // Convert to float
            project1: formData.project1,
            project2: formData.project2,
            project3: formData.project3,
            rollno:formData.rollno,
          };

          const response = await axios.post("http://localhost:8072/student", studentData);
        // Handle student registration logic here
          console.log("Student registration data:", response.data);
          dispatch(setUser(response.data));
          navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            marginTop: 16, // Increased margin to clear navbar
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#1e1e1e",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
            color: "#fff",
          }}
        >
          <Typography variant="h5" component="h1" sx={{ marginBottom: 2 }}>
            {formData.role === "Faculty" ? "Faculty Registration" : "Student Registration"}
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Grid container spacing={3}>
              {/* Personal Information Section */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 1, color: "#888" }}>
                  Personal Information
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      sx={{
                        "& .MuiInputLabel-root": { color: "#bbb" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#444" },
                          "&:hover fieldset": { borderColor: "#666" },
                          "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                        },
                        "& .MuiInputBase-input": { color: "#fff" },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      sx={{
                        "& .MuiInputLabel-root": { color: "#bbb" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#444" },
                          "&:hover fieldset": { borderColor: "#666" },
                          "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                        },
                        "& .MuiInputBase-input": { color: "#fff" },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      sx={{
                        "& .MuiInputLabel-root": { color: "#bbb" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#444" },
                          "&:hover fieldset": { borderColor: "#666" },
                          "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                        },
                        "& .MuiInputBase-input": { color: "#fff" },
                      }}
                    />
                  </Grid>

                  {/* Role Selection */}
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel
                        sx={{
                          color: "#bbb",
                          "&.Mui-focused": {
                            color: "#1976d2",
                          },
                        }}
                      >
                        Role
                      </InputLabel>
                      <Select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#444" },
                            "&:hover fieldset": { borderColor: "#666" },
                            "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                          },
                          "& .MuiInputBase-input": { color: "#fff" },
                        }}
                      >
                        <MenuItem value="Student">Student</MenuItem>
                        <MenuItem value="Faculty">Faculty</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* Academic Information Section (Only for Students) */}
              {formData.role === "Student" && (
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ mb: 1, mt: 2, color: "#888" }}>
                    Academic Information
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="CPI (Cumulative Performance Index)"
                        type="number"
                        name="cpi"
                        value={formData.cpi}
                        onChange={handleChange}
                        inputProps={{ min: 0, max: 10, step: 0.1 }}
                        required
                        sx={{
                          "& .MuiInputLabel-root": { color: "#bbb" },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#444" },
                            "&:hover fieldset": { borderColor: "#666" },
                            "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                          },
                          "& .MuiInputBase-input": { color: "#fff" },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {/* Projects Section (Only for Students) */}
              {formData.role === "Student" && (
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="rollno"
                          name="rollno"
                          value={formData.rollno}
                          onChange={handleChange}
                          required
                          sx={{
                            "& .MuiInputLabel-root": { color: "#bbb" },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: "#444" },
                              "&:hover fieldset": { borderColor: "#666" },
                              "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                            },
                            "& .MuiInputBase-input": { color: "#fff" },
                          }}
                        />
                      </Grid>
                  </Grid>
                  <Typography variant="subtitle1" sx={{ mb: 1, mt: 2, color: "#888" }}>
                    Projects
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Project 1 Name"
                        name="project1"
                        value={formData.project1}
                        onChange={handleChange}
                        required
                        sx={{
                          "& .MuiInputLabel-root": { color: "#bbb" },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#444" },
                            "&:hover fieldset": { borderColor: "#666" },
                            "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                          },
                          "& .MuiInputBase-input": { color: "#fff" },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Project 2 Name"
                        name="project2"
                        value={formData.project2}
                        onChange={handleChange}
                        sx={{
                          "& .MuiInputLabel-root": { color: "#bbb" },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#444" },
                            "&:hover fieldset": { borderColor: "#666" },
                            "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                          },
                          "& .MuiInputBase-input": { color: "#fff" },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Project 3 Name"
                        name="project3"
                        value={formData.project3}
                        onChange={handleChange}
                        sx={{
                          "& .MuiInputLabel-root": { color: "#bbb" },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#444" },
                            "&:hover fieldset": { borderColor: "#666" },
                            "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                          },
                          "& .MuiInputBase-input": { color: "#fff" },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {/* Faculty Specific Fields */}
              {formData.role === "Faculty" && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ mb: 1, mt: 2, color: "#888" }}>
                      Faculty Information
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Expertise (comma separated)"
                          name="expertise"
                          value={formData.expertise}
                          onChange={(e) => setFormData({ ...formData, expertise: e.target.value.split(", ") })}
                          required
                          sx={{
                            "& .MuiInputLabel-root": { color: "#bbb" },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: "#444" },
                              "&:hover fieldset": { borderColor: "#666" },
                              "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                            },
                            "& .MuiInputBase-input": { color: "#fff" },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Max Groups"
                          type="number"
                          name="maxGroups"
                          value={formData.maxGroups}
                          onChange={handleChange}
                          required
                          sx={{
                            "& .MuiInputLabel-root": { color: "#bbb" },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: "#444" },
                              "&:hover fieldset": { borderColor: "#666" },
                              "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                            },
                            "& .MuiInputBase-input": { color: "#fff" },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          required
                          sx={{
                            "& .MuiInputLabel-root": { color: "#bbb" },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: "#444" },
                              "&:hover fieldset": { borderColor: "#666" },
                              "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                            },
                            "& .MuiInputBase-input": { color: "#fff" },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          sx={{
                            "& .MuiInputLabel-root": { color: "#bbb" },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: "#444" },
                              "&:hover fieldset": { borderColor: "#666" },
                              "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                            },
                            "& .MuiInputBase-input": { color: "#fff" },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Office Hours"
                          name="officeHours"
                          value={formData.officeHours}
                          onChange={handleChange}
                          required
                          sx={{
                            "& .MuiInputLabel-root": { color: "#bbb" },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: "#444" },
                              "&:hover fieldset": { borderColor: "#666" },
                              "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                            },
                            "& .MuiInputBase-input": { color: "#fff" },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Ongoing Projects (comma separated)"
                          name="ongoingProjects"
                          value={formData.ongoingProjects}
                          onChange={(e) => setFormData({ ...formData, ongoingProjects: e.target.value.split(", ") })}
                          sx={{
                            "& .MuiInputLabel-root": { color: "#bbb" },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: "#444" },
                              "&:hover fieldset": { borderColor: "#666" },
                              "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                            },
                            "& .MuiInputBase-input": { color: "#fff" },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Awards (comma separated)"
                          name="awards"
                          value={formData.awards}
                          onChange={(e) => setFormData({ ...formData, awards: e.target.value.split(", ") })}
                          sx={{
                            "& .MuiInputLabel-root": { color: "#bbb" },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: "#444" },
                              "&:hover fieldset": { borderColor: "#666" },
                              "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                            },
                            "& .MuiInputBase-input": { color: "#fff" },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                marginTop: 2,
                background: "#1976d2",
                color: "#fff",
                "&:hover": { background: "#1565c0" },
              }}
            >
              Register
            </Button>
          </form>

          <Typography sx={{ marginTop: 2, color: "#bbb" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#1976d2", textDecoration: "none" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Container>
    </motion.div>
  );
};

export default Registration;