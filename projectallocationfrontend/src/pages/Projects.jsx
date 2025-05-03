/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // For registered projects
import { HfInference } from "@huggingface/inference";
import { useSelector } from "react-redux"; // Import useSelector
import axios from "axios";

const Projects = () => {
  const user = useSelector((state) => state.user.user); // Get user from Redux store
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Check authentication status
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "AI-Based Chatbot",
      image: "https://via.placeholder.com/150",
      maxStudents: 3,
      type: "AI-Based",
      level: "Hard",
    },
    {
      id: 2,
      title: "E-Commerce Website",
      image: "https://via.placeholder.com/150",
      maxStudents: 4,
      type: "Web",
      level: "Medium",
    },
    {
      id: 3,
      title: "Mobile Expense Tracker",
      image: "https://via.placeholder.com/150",
      maxStudents: 2,
      type: "Mobile App",
      level: "Easy",
    },
    {
      id: 4,
      title: "Blockchain Voting System",
      image: "https://via.placeholder.com/150",
      maxStudents: 5,
      type: "Blockchain",
      level: "Hard",
    },
    {
      id: 5,
      title: "ML-Based Recommendation System",
      image: "https://via.placeholder.com/150",
      maxStudents: 3,
      type: "ML-Based",
      level: "Hard",
    },
  ]);
  const [registeredProjects, setRegisteredProjects] = useState([]); // Track registered projects
  const [aiMessage, setAiMessage] = useState(""); // User's message to AI
  const [aiResponse, setAiResponse] = useState(""); // AI's response
  const [openModal, setOpenModal] = useState(false); // State to manage modal open/close
  const [selectedProject, setSelectedProject] = useState(null); // State to store the selected project for registration
  const [groupMemberOne, setGroupMemberOne] = useState(""); // State for group member 1
  const [groupMemberTwo, setGroupMemberTwo] = useState(""); // State for group member 2
  const [recommendedProjects, setRecommendedProjects] = useState([]);
  // const [selectedProject, setSelectedProject] = useState(null);
  const [groupMembers, setGroupMembers] = useState({
    member1: { id: "", name: "" },
    member2: { id: "", name: "" },
  });
  const [faculties, setFaculties] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState("");
  const [loading, setLoading] = useState({
    projects: false,
    faculties: false,
    registration: false,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // useEffect(() => {
  //   // Example: Suppose we want to find similar to IDs 1, 3, 5
  //   axios
  //     .post("http://localhost:5000/api/similar-projects", {
  //       project_ids: [1, 3, 5],
  //     })
  //     .then((response) => {
  //       setRecommendedProjects(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching similar projects:", error);
  //     });
  // }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    setLoading((prev) => ({ ...prev, faculties: true }));

    axios
      .get("http://localhost:8072/faculty")
      .then((response) => {
        setFaculties(response.data);
      })
      .catch((error) => {
        console.error("Error fetching faculties:", error);
      })
      .finally(() => {
        setLoading((prev) => ({ ...prev, faculties: false }));
      });
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Fetch projects
    axios
      .get("http://localhost:8072/project")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });

    // Fetch requests
    axios
      .get(`http://localhost:8072/requests/receiver/${user.id}`)
      .then((response) => {
        if (response.data.length === 1) {
          const { senderId, receiverId } = response.data[0];
          console.log(senderId);
          console.log(receiverId);

          axios
            .get(`http://localhost:8072/student/${senderId}`)
            .then((response) => {
              setGroupMemberOne(response.data.name);
            });

          axios
            .get(`http://localhost:8072/student/${receiverId}`)
            .then((response) => {
              setGroupMemberOne(response.data.name);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  }, [isAuthenticated]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRegisterClick = (project) => {
    setSelectedProject(project); // Set the selected project
    setOpenModal(true); // Open the modal
  };

  const handleModalClose = () => {
    setOpenModal(false); // Close the modal
    setSelectedProject(null); // Reset the selected project
    setGroupMemberOne(""); // Reset group member 1
    setGroupMemberTwo(""); // Reset group member 2
  };

  const handleConfirmRegistration = async () => {
    if (!selectedProject || !selectedMentor) {
      setError("Please select a mentor");
      return;
    }

    try {
      setLoading((prev) => ({ ...prev, registration: true }));

      const registrationData = {
        projectId: selectedProject.id,
        studentIds: [
          groupMembers.member1.id || groupMembers.member1.name,
          groupMembers.member2.id || groupMembers.member2.name,
        ],
        mentorId: selectedMentor,
        registererId: user.id,
      };

      await axios.post(
        "http://localhost:8072/project/register",
        registrationData
      );

      setRegisteredProjects([...registeredProjects, selectedProject.id]);
      setSuccess("Project registered successfully!");
      setTimeout(() => {
        handleModalClose();
        setSuccess(null);
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      console.error("Registration error:", err);
    } finally {
      setLoading((prev) => ({ ...prev, registration: false }));
    }
  };

  const handleGetRecommendation = () => {
    // console.log("Fetching project recommendations...");
    // // Add your ML model integration here
    console.log("Fetching project recommendations...");

    // Map project titles to their IDs
    const projectIds = [
      projects.find((p) => p.title === user.project1)?.id,
      projects.find((p) => p.title === user.project2)?.id,
      projects.find((p) => p.title === user.project3)?.id,
    ].filter(Boolean); // remove undefined if any

    console.log("Mapped Project IDs:", projectIds);
    console.log(projects.find((p) => p.title === user.project1)?.title);

    if (projectIds.length !== 3) {
      console.error("Error: Could not find all project IDs.");
      return;
    }

    // Now send the request to Flask API
    axios
      .post("http://localhost:5000/api/similar-projects", {
        project_ids: projectIds,
      })
      .then((response) => {
        console.log("Recommended Projects:", response.data);

        const recommendedProjects = response.data
          .map((returnedId) =>
            projects.find(
              (project) =>
                project.id === returnedId &&
                project.id != user.project1 &&
                project.id != user.project2 &&
                project.id != user.project3
            )
          )
          .filter(Boolean); // if any id doesn't match, safely ignore

        console.log("Full Recommended Projects:", recommendedProjects);

        // 4️⃣ Now you can set them into state and display
        setRecommendedProjects(recommendedProjects);

        // maybe setFilteredProjects(response.data) to update your UI?
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
      });
  };

  // const handleAskAI = async () => {
  //   if (!aiMessage.trim()) return;

  //   try {
  //     setAiResponse("Loading response...");
  //     const client = new HfInference("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");

  //     const chatCompletion = await client.chatCompletion({
  //       model: "meta-llama/Llama-3.3-70B-Instruct",
  //       messages: [{ role: "user", content: aiMessage }],
  //       provider: "together",
  //       max_tokens: 500,
  //     });

  //     setAiResponse(chatCompletion.choices[0].message.content);
  //   } catch (err) {
  //     setAiResponse(`Error: ${err.message}`);
  //     console.error("AI Error:", err);
  //   }
  // };

  // const handleAskAI = async () => {
  //   if (!aiMessage.trim()) return;

  //   try {
  //     setAiResponse("Loading response...");
  //     console.log("using env...");
  //     const key = process.env.REACT_APP_HF_ACCESS_TOKEN;
  //     console.log("API Key:", key); // Add this for debugging
  //     const client = new HfInference(key);

  //     const chatCompletion = await client.chatCompletion({
  //       model: "meta-llama/Llama-3.3-70B-Instruct",
  //       messages: [{ role: "user", content: aiMessage }],
  //       provider: "together",
  //       max_tokens: 500,
  //     });

  //     setAiResponse(chatCompletion.choices[0].message.content);
  //   } catch (err) {
  //     setAiResponse(`Error: ${err.message}`);
  //     console.error("AI Error:", err);
  //   }
  // };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.difficultyLevel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        background: "#121212",
        width: "100vw",
        minHeight: "100vh",
        paddingTop: "90px",
        display: "flex",
      }}
    >
      <Container maxWidth="lg" sx={{ flexGrow: 1, padding: "20px" }}>
        {/* Parent Flex Container */}
        {isAuthenticated ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
            }}
          >
            {/* Left Panel - Project List */}
            <Box sx={{ flex: 3 }}>
              {/* Search Bar and Recommendation Button */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search projects by title, type, or level..."
                  value={searchQuery}
                  onChange={handleSearch}
                  sx={{
                    background: "#1e1e1e",
                    borderRadius: "4px",
                    input: { color: "#fff" },
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGetRecommendation}
                  sx={{ marginLeft: 2, background: "#ff9800", color: "#000" }}
                >
                  Get Recommendation
                </Button>
              </Box>

              {/* Recommended Projects */}
              {recommendedProjects.length > 0 && (
                <>
                  <Typography
                    variant="h5"
                    sx={{ color: "#ff9800", marginBottom: 2 }}
                  >
                    Recommended Projects
                  </Typography>
                  <Grid container spacing={4} sx={{ marginBottom: 4 }}>
                    {recommendedProjects.map((project) => (
                      <Grid item key={project.id} xs={12} sm={6} md={4}>
                        <Card
                          sx={{
                            background: "#1e1e1e",
                            color: "#fff",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="140"
                            image={"project.image"}
                            alt={project.title}
                          />

                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                              sx={{ color: "#ff9800" }}
                            >
                              {project.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#bbb" }}>
                              <strong>Type:</strong> {project.type}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#bbb" }}>
                              <strong>Max Students:</strong>{" "}
                              {project.max_student_allow || project.maxStudents}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#bbb" }}>
                              <strong>Level:</strong> {project.level}
                            </Typography>
                          </CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              padding: 2,
                            }}
                          >
                            {registeredProjects.includes(project.id) ? (
                              <Button
                                variant="contained"
                                sx={{
                                  background: "#4CAF50",
                                  color: "white",
                                  gap: "5px",
                                }}
                                disabled
                              >
                                Registered <CheckCircleIcon />
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                sx={{ background: "#ff9800", color: "#000" }}
                                onClick={() => handleRegisterClick(project)}
                              >
                                Register
                              </Button>
                            )}
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}

              {/* All Projects */}
              <Typography
                variant="h5"
                sx={{ color: "#ff9800", marginBottom: 2 }}
              >
                All Projects
              </Typography>
              <Grid container spacing={4}>
                {filteredProjects.map((project) => (
                  <Grid item key={project.id} xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        background: "#1e1e1e",
                        color: "#fff",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={project.image}
                        alt={project.title}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ color: "#ff9800" }}
                        >
                          {project.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#bbb" }}>
                          <strong>Type:</strong> {project.type}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#bbb" }}>
                          <strong>Max Students:</strong>{" "}
                          {project.max_student_allow || project.maxStudents}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#bbb" }}>
                          <strong>Level:</strong> {project.level}
                        </Typography>
                      </CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          padding: 2,
                        }}
                      >
                        {registeredProjects.includes(project.id) ? (
                          <Button
                            variant="contained"
                            sx={{
                              background: "#4CAF50",
                              color: "white",
                              gap: "5px",
                            }}
                            disabled
                          >
                            Registered <CheckCircleIcon />
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            sx={{ background: "#ff9800", color: "#000" }}
                            onClick={() => handleRegisterClick(project)}
                          >
                            Register
                          </Button>
                        )}
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Right Panel - Ask AI */}
            <Box sx={{ flex: 1 }}>
              <Paper
                sx={{
                  background: "#1e1e1e",
                  padding: "20px",
                  borderRadius: "8px",
                  position: "sticky",
                  top: "100px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#ff9800", marginBottom: 2 }}
                >
                  Ask AI for Help
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type your question..."
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  multiline
                  rows={4}
                  sx={{
                    background: "#242424",
                    marginBottom: 2,
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "#ff9800" },
                      "&:hover fieldset": { borderColor: "#ffb74d" },
                      "&.Mui-focused fieldset": { borderColor: "#ff9800" },
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#ffcc80",
                      opacity: 1,
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleAskAI}
                  disabled={!aiMessage.trim()}
                  sx={{
                    background: "#ff9800",
                    color: "#000",
                    width: "100%",
                    "&:hover": { background: "#e68a00" },
                    "&:disabled": { background: "#ffcc80" },
                  }}
                >
                  Ask AI
                </Button>
                {aiResponse && (
                  <Box
                    sx={{
                      marginTop: 2,
                      padding: "10px",
                      background: "#242424",
                      borderRadius: "4px",
                      maxHeight: "300px",
                      overflowY: "auto",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ color: "#fff", whiteSpace: "pre-wrap" }}
                    >
                      {aiResponse}
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Box>
          </Box>
        ) : (
          <Typography
            variant="h5"
            sx={{ textAlign: "center", color: "red", marginBottom: 2 }}
          >
            You are not logged in. Please log in to view projects
          </Typography>
        )}
      </Container>

      {/* Registration Modal */}
      <Dialog
        open={openModal}
        onClose={handleModalClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            color: "#ff9800",
            background: "#1e1e1e",
            borderBottom: "1px solid #ff9800",
          }}
        >
          Register for {selectedProject?.title}
        </DialogTitle>
        <DialogContent
          sx={{ background: "#1e1e1e", paddingTop: "20px !important" }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Group Member 1"
            value={groupMembers.member1.name}
            onChange={(e) =>
              setGroupMembers((prev) => ({
                ...prev,
                member1: { ...prev.member1, name: e.target.value },
              }))
            }
            disabled={!!groupMembers.member1.id}
            sx={{
              marginBottom: 2,
              "& .MuiInputBase-input": { color: "#fff" },
              "& .MuiInputLabel-root": { color: "#bbb" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ff9800" },
                "&.Mui-disabled fieldset": { borderColor: "#666" },
              },
            }}
          />

          <TextField
            fullWidth
            label="Group Member 2"
            value={groupMembers.member2.name}
            onChange={(e) =>
              setGroupMembers((prev) => ({
                ...prev,
                member2: { ...prev.member2, name: e.target.value },
              }))
            }
            disabled={!!groupMembers.member2.id}
            sx={{
              marginBottom: 2,
              "& .MuiInputBase-input": { color: "#fff" },
              "& .MuiInputLabel-root": { color: "#bbb" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ff9800" },
                "&.Mui-disabled fieldset": { borderColor: "#666" },
              },
            }}
          />

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel
              id="mentor-select-label"
              sx={{ color: "#bbb", "&.Mui-focused": { color: "#ff9800" } }}
            >
              Select Mentor
            </InputLabel>
            <Select
              labelId="mentor-select-label"
              value={selectedMentor}
              label="Select Mentor"
              onChange={(e) => setSelectedMentor(e.target.value)}
              sx={{
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
                "& .MuiSvgIcon-root": { color: "#ff9800" },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "#1e1e1e",
                    "& .MuiMenuItem-root": {
                      color: "#fff",
                      "&:hover": { bgcolor: "#333" },
                    },
                  },
                },
              }}
            >
              {loading.faculties ? (
                <MenuItem disabled>
                  <CircularProgress size={24} color="secondary" />
                </MenuItem>
              ) : faculties.length > 0 ? (
                faculties.map((faculty) => (
                  <MenuItem key={faculty.id} value={faculty.id}>
                    {faculty.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No faculty available</MenuItem>
              )}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ background: "#1e1e1e", padding: "16px 24px" }}>
          <Button
            onClick={handleModalClose}
            sx={{
              color: "#ff9800",
              "&:hover": { backgroundColor: "rgba(255, 152, 0, 0.1)" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmRegistration}
            disabled={!selectedMentor || loading.registration}
            sx={{
              color: "#ff9800",
              "&:hover": { backgroundColor: "rgba(255, 152, 0, 0.1)" },
              "&:disabled": { color: "#666" },
            }}
          >
            {loading.registration ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Projects;

// {isAuthenticated ? (
//   <Box
//     sx={{
//       display: "flex",
//       flexDirection: { xs: "column", md: "row" },
//       gap: 4,
//     }}
//   >
//     {/* Left Panel - Project List */}
//     <Box sx={{ flex: 3 }}>
//       {/* Search Bar and Recommendation Button */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           marginBottom: 4,
//         }}
//       >
//         <TextField
//           fullWidth
//           variant="outlined"
//           placeholder="Search projects by title, type, or level..."
//           value={searchQuery}
//           onChange={handleSearch}
//           sx={{
//             background: "#1e1e1e",
//             borderRadius: "4px",
//             input: { color: "#fff" },
//           }}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleGetRecommendation}
//           sx={{ marginLeft: 2, background: "#ff9800", color: "#000" }}
//         >
//           Get Recommendation
//         </Button>
//       </Box>
//       {/* Project Cards */}
//       {recommendedProjects && recommendedProjects.length > 0 && (
//         <Grid container spacing={4}>
//           {recommendedProjects.map((project) => (
//             <Grid item key={project.id} xs={12} sm={6} md={4}>
//               <Card
//                 sx={{
//                   background: "#1e1e1e",
//                   color: "#fff",
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={project.image}
//                   alt={project.title}
//                 />
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Typography
//                     gutterBottom
//                     variant="h6"
//                     component="div"
//                     sx={{ color: "#ff9800" }}
//                   >
//                     {project.title}
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: "#bbb" }}>
//                     <strong>Type:</strong> {project.type}
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: "#bbb" }}>
//                     <strong>Max Students:</strong>{" "}
//                     {project.max_student_allow}
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: "#bbb" }}>
//                     <strong>Level:</strong> {project.level}
//                   </Typography>
//                 </CardContent>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     padding: 2,
//                   }}
//                 >
//                   {registeredProjects.includes(project.id) ? (
//                     <Button
//                       variant="contained"
//                       sx={{
//                         background: "#4CAF50",
//                         color: "white",
//                         gap: "5px",
//                       }}
//                       disabled
//                     >
//                       Registered <CheckCircleIcon />
//                     </Button>
//                   ) : (
//                     <Button
//                       variant="contained"
//                       sx={{ background: "#ff9800", color: "#000" }}
//                       onClick={() => handleRegisterClick(project)}
//                     >
//                       Register
//                     </Button>
//                   )}
//                 </Box>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       {/* <Grid container spacing={4}>
//         {filteredProjects.map((project) => (
//           <Grid item key={project.id} xs={12} sm={6} md={4}>
//             <Card sx={{ background: "#1e1e1e", color: "#fff", height: "100%", display: "flex", flexDirection: "column" }}>
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image={project.image}
//                 alt={project.title}
//               />
//               <CardContent sx={{ flexGrow: 1 }}>
//                 <Typography gutterBottom variant="h6" component="div" sx={{ color: "#ff9800" }}>
//                   {project.title}
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: "#bbb" }}>
//                   <strong>Type:</strong> {project.type}
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: "#bbb" }}>
//                   <strong>Max Students:</strong> {project.maxStudents}
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: "#bbb" }}>
//                   <strong>Level:</strong> {project.level}
//                 </Typography>
//               </CardContent>
//               <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
//                 {registeredProjects.includes(project.id) ? (
//                   <Button
//                     variant="contained"
//                     sx={{ background: "#4CAF50", color: "white", gap: "5px" }}
//                     disabled
//                   >
//                     Registered <CheckCircleIcon />
//                   </Button>
//                 ) : (
//                   <Button
//                     variant="contained"
//                     sx={{ background: "#ff9800", color: "#000" }}
//                     onClick={() => handleRegisterClick(project)}
//                   >
//                     Register
//                   </Button>
//                 )}
//               </Box>
//             </Card>
//           </Grid>
//         ))}
//       </Grid> */}
//     </Box>
//     {/* Right Panel - Ask AI */}
//     <Box sx={{ flex: 1 }}>
//       <Paper
//         sx={{
//           background: "#1e1e1e",
//           padding: "20px",
//           borderRadius: "8px",
//         }}
//       >
//         <Typography
//           variant="h6"
//           sx={{ color: "#ff9800", marginBottom: 2 }}
//         >
//           Ask AI for Help
//         </Typography>
//         <TextField
//           fullWidth
//           variant="outlined"
//           placeholder="Type your question..."
//           value={aiMessage}
//           onChange={(e) => setAiMessage(e.target.value)}
//           multiline
//           rows={4}
//           sx={{
//             background: "#242424",
//             marginBottom: 2,
//             "& .MuiOutlinedInput-root": {
//               color: "#fff", // Text color
//               "& fieldset": {
//                 borderColor: "#ff9800", // Border color
//               },
//               "&:hover fieldset": {
//                 borderColor: "#ffb74d", // Hover border color
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: "#ff9800", // Focus border color
//               },
//             },
//             "& .MuiInputBase-input::placeholder": {
//               color: "#ffcc80", // Placeholder color
//               opacity: 1, // Ensure it's fully visible
//             },
//           }}
//         />
//         <Button
//           variant="contained"
//           onClick={handleAskAI}
//           sx={{ background: "#ff9800", color: "#000", width: "100%" }}
//         >
//           Ask AI
//         </Button>
//         {aiResponse && (
//           <Box
//             sx={{
//               marginTop: 2,
//               padding: "10px",
//               background: "#242424",
//               borderRadius: "4px",
//             }}
//           >
//             <Typography variant="body1" sx={{ color: "#fff" }}>
//               {aiResponse}
//             </Typography>
//           </Box>
//         )}
//       </Paper>
//     </Box>
//   </Box>
// ) : (
//   <Typography
//     variant="h5"
//     sx={{ textAlign: "center", color: "red", marginBottom: 2 }}
//   >
//     You are not logged in. Please log in to view projects
//   </Typography>
// )}

// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   Button,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Grid,
//   Container,
//   Box,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   CircularProgress,
//   Alert
// } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import { HfInference } from "@huggingface/inference";
// import { useSelector } from "react-redux";
// import axios from "axios";

// const Projects = () => {
//   const user = useSelector((state) => state.user.user);
//   const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

//   // State variables
//   const [searchQuery, setSearchQuery] = useState("");
//   const [projects, setProjects] = useState([]);
//   const [registeredProjects, setRegisteredProjects] = useState([]);
//   const [aiMessage, setAiMessage] = useState("");
//   const [aiResponse, setAiResponse] = useState("");
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [groupMembers, setGroupMembers] = useState({
//     member1: { id: "", name: "" },
//     member2: { id: "", name: "" }
//   });
//   const [faculties, setFaculties] = useState([]);
//   const [selectedMentor, setSelectedMentor] = useState("");
//   const [loading, setLoading] = useState({
//     projects: false,
//     faculties: false,
//     registration: false
//   });
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   // Fetch data on component mount
//   useEffect(() => {
//     if (!isAuthenticated) return;

//     const fetchData = async () => {
//       try {
//         setLoading(prev => ({ ...prev, projects: true, faculties: true }));

//         // Fetch projects
//         const projectsResponse = await axios.get("http://localhost:8072/project");
//         console.log("project fetched...");
//         setProjects(projectsResponse.data);

//         // Fetch faculties
//         const facultiesResponse = await axios.get("http://localhost:8072/faculty");
//         console.log("faculty fetched...");
//         setFaculties(facultiesResponse.data);

//         // Check for accepted requests
//         const requestsResponse = await axios.get(`http://localhost:8072/requests/receiver/${user.id}`);
//         console.log(requestsResponse.data.length);
//         if (requestsResponse.data.length > 0) {
//           const acceptedRequest = requestsResponse.data.find(req => req.status == "ACCEPTED");
//           if (acceptedRequest) {
//             const [senderRes, receiverRes] = await Promise.all([
//               axios.get(`http://localhost:8072/student/${acceptedRequest.senderId}`),
//               axios.get(`http://localhost:8072/student/${acceptedRequest.receiverId}`)
//             ]);
//             setGroupMembers({
//               member1: { id: acceptedRequest.senderId, name: senderRes.data.name },
//               member2: { id: acceptedRequest.receiverId, name: receiverRes.data.name }
//             });
//           }
//         }
//       } catch (err) {
//         setError("Failed to load data. Please try again later.");
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(prev => ({ ...prev, projects: false, faculties: false }));
//       }
//     };

//     fetchData();
//   }, [isAuthenticated, user.id]);

//   // Handlers
//   const handleSearch = (e) => setSearchQuery(e.target.value);

//   const handleRegisterClick = (project) => {
//     setSelectedProject(project);
//     setOpenModal(true);
//     setError(null);
//     setSuccess(null);
//   };

//   const handleModalClose = () => {
//     setOpenModal(false);
//     setSelectedProject(null);
//     setSelectedMentor("");
//   };

//   const handleConfirmRegistration = async () => {
//     if (!selectedProject || !selectedMentor) {
//       setError("Please select a mentor");
//       return;
//     }

//     try {
//       setLoading(prev => ({ ...prev, registration: true }));

//       const registrationData = {
//         projectId: selectedProject.id,
//         studentIds: [groupMembers.member1.id || groupMembers.member1.name,
//                    groupMembers.member2.id || groupMembers.member2.name],
//         mentorId: selectedMentor,
//         registererId: user.id
//       };

//       await axios.post("http://localhost:8072/project/register", registrationData);

//       setRegisteredProjects([...registeredProjects, selectedProject.id]);
//       setSuccess("Project registered successfully!");
//       setTimeout(() => {
//         handleModalClose();
//         setSuccess(null);
//       }, 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed. Please try again.");
//       console.error("Registration error:", err);
//     } finally {
//       setLoading(prev => ({ ...prev, registration: false }));
//     }
//   };

// const handleAskAI = async () => {
//   if (!aiMessage.trim()) return;

//   try {
//     setAiResponse("Loading response...");
//     const client = new HfInference("");

//     const chatCompletion = await client.chatCompletion({
//       model: "meta-llama/Llama-3.3-70B-Instruct",
//       messages: [{ role: "user", content: aiMessage }],
//       provider: "together",
//       max_tokens: 500,
//     });

//     setAiResponse(chatCompletion.choices[0].message.content);
//   } catch (err) {
//     setAiResponse(`Error: ${err.message}`);
//     console.error("AI Error:", err);
//   }
// };

//   // Filter projects based on search query
//   const filteredProjects = projects.filter( (project) =>
//     project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     project.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     project.difficultyLevel.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <Box sx={{ background: "#121212", width: "100vw", minHeight: "100vh", paddingTop: "90px", display: "flex" }}>
//       <Container maxWidth="lg" sx={{ flexGrow: 1, padding: "20px" }}>
//         {isAuthenticated ? (
//           <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
//             {/* Left Panel - Project List */}
//             <Box sx={{ flex: 3 }}>
//               <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
//                 <TextField
//                   fullWidth
//                   variant="outlined"
//                   placeholder="Search projects by title, type, or level..."
//                   value={searchQuery}
//                   onChange={handleSearch}
//                   sx={{ background: "#1e1e1e", borderRadius: "4px", input: { color: "#fff" } }}
//                 />
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => console.log("Get Recommendation clicked")}
//                   sx={{ marginLeft: 2, background: "#ff9800", color: "#000" }}
//                 >
//                   Get Recommendation
//                 </Button>
//               </Box>

//               {loading.projects ? (
//                 <Box display="flex" justifyContent="center" mt={4}>
//                   <CircularProgress color="secondary" />
//                 </Box>
//               ) : (
//                 <Grid container spacing={4}>
//                   {filteredProjects.map((project) => (
//                     <Grid item key={project.id} xs={12} sm={6} md={4}>
//                       <Card sx={{
//                         background: "#1e1e1e",
//                         color: "#fff",
//                         height: "100%",
//                         display: "flex",
//                         flexDirection: "column",
//                         transition: "transform 0.3s",
//                         "&:hover": { transform: "scale(1.02)" }
//                       }}>
//                         <CardMedia
//                           component="img"
//                           height="140"
//                           image={project.image || "https://via.placeholder.com/150"}
//                           alt={project.title}
//                         />
//                         <CardContent sx={{ flexGrow: 1 }}>
//                           <Typography gutterBottom variant="h6" component="div" sx={{ color: "#ff9800" }}>
//                             {project.title}
//                           </Typography>
//                           <Typography variant="body2" sx={{ color: "#bbb", mt: 1 }}>
//                             <strong>Type:</strong> {project.type}
//                           </Typography>
//                           <Typography variant="body2" sx={{ color: "#bbb", mt: 1 }}>
//                             <strong>Max Students:</strong> {project.maxStudentAllow}
//                           </Typography>
//                           <Typography variant="body2" sx={{ color: "#bbb", mt: 1 }}>
//                             <strong>Level:</strong> {project.difficultyLevel}
//                           </Typography>
//                         </CardContent>
//                         <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
//                           {registeredProjects.includes(project.id) ? (
//                             <Button
//                               variant="contained"
//                               sx={{
//                                 background: "#4CAF50",
//                                 color: "white",
//                                 gap: "5px",
//                                 "&:hover": { background: "#3e8e41" }
//                               }}
//                               disabled
//                             >
//                               Registered <CheckCircleIcon />
//                             </Button>
//                           ) : (
//                             <Button
//                               variant="contained"
//                               sx={{
//                                 background: "#ff9800",
//                                 color: "#000",
//                                 "&:hover": { background: "#e68a00" }
//                               }}
//                               onClick={() => handleRegisterClick(project)}
//                             >
//                               Register
//                             </Button>
//                           )}
//                         </Box>
//                       </Card>
//                     </Grid>
//                   ))}
//                 </Grid>
//               )}
//             </Box>

//             {/* Right Panel - Ask AI */}
//             <Box sx={{ flex: 1 }}>
//               <Paper sx={{
//                 background: "#1e1e1e",
//                 padding: "20px",
//                 borderRadius: "8px",
//                 position: "sticky",
//                 top: "100px"
//               }}>
//                 <Typography variant="h6" sx={{ color: "#ff9800", marginBottom: 2 }}>
//                   Ask AI for Help
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   variant="outlined"
//                   placeholder="Type your question..."
//                   value={aiMessage}
//                   onChange={(e) => setAiMessage(e.target.value)}
//                   multiline
//                   rows={4}
//                   sx={{
//                     background: "#242424",
//                     marginBottom: 2,
//                     "& .MuiOutlinedInput-root": {
//                       color: "#fff",
//                       "& fieldset": { borderColor: "#ff9800" },
//                       "&:hover fieldset": { borderColor: "#ffb74d" },
//                       "&.Mui-focused fieldset": { borderColor: "#ff9800" },
//                     },
//                     "& .MuiInputBase-input::placeholder": {
//                       color: "#ffcc80",
//                       opacity: 1,
//                     },
//                   }}
//                 />
//                 <Button
//                   variant="contained"
//                   onClick={handleAskAI}
//                   disabled={!aiMessage.trim()}
//                   sx={{
//                     background: "#ff9800",
//                     color: "#000",
//                     width: "100%",
//                     "&:hover": { background: "#e68a00" },
//                     "&:disabled": { background: "#ffcc80" }
//                   }}
//                 >
//                   Ask AI
//                 </Button>
//                 {aiResponse && (
//                   <Box sx={{
//                     marginTop: 2,
//                     padding: "10px",
//                     background: "#242424",
//                     borderRadius: "4px",
//                     maxHeight: "300px",
//                     overflowY: "auto"
//                   }}>
//                     <Typography variant="body1" sx={{ color: "#fff", whiteSpace: "pre-wrap" }}>
//                       {aiResponse}
//                     </Typography>
//                   </Box>
//                 )}
//               </Paper>
//             </Box>
//           </Box>
//         ) : (
//           <Typography variant="h5" sx={{ textAlign: "center", color: "red", marginBottom: 2 }}>
//             You are not logged in. Please log in to view projects
//           </Typography>
//         )}
//       </Container>

//       {/* Registration Modal */}
//       <Dialog open={openModal} onClose={handleModalClose} fullWidth maxWidth="sm">
//         <DialogTitle sx={{
//           color: "#ff9800",
//           background: "#1e1e1e",
//           borderBottom: "1px solid #ff9800"
//         }}>
//           Register for {selectedProject?.title}
//         </DialogTitle>
//         <DialogContent sx={{ background: "#1e1e1e", paddingTop: "20px !important" }}>
//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {error}
//             </Alert>
//           )}
//           {success && (
//             <Alert severity="success" sx={{ mb: 2 }}>
//               {success}
//             </Alert>
//           )}

//           <TextField
//             fullWidth
//             label="Group Member 1"
//             value={groupMembers.member1.name}
//             onChange={(e) => setGroupMembers(prev => ({
//               ...prev,
//               member1: { ...prev.member1, name: e.target.value }
//             }))}
//             disabled={!!groupMembers.member1.id}
//             sx={{
//               marginBottom: 2,
//               "& .MuiInputBase-input": { color: "#fff" },
//               "& .MuiInputLabel-root": { color: "#bbb" },
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": { borderColor: "#ff9800" },
//                 "&.Mui-disabled fieldset": { borderColor: "#666" }
//               }
//             }}
//           />

//           <TextField
//             fullWidth
//             label="Group Member 2"
//             value={groupMembers.member2.name}
//             onChange={(e) => setGroupMembers(prev => ({
//               ...prev,
//               member2: { ...prev.member2, name: e.target.value }
//             }))}
//             disabled={!!groupMembers.member2.id}
//             sx={{
//               marginBottom: 2,
//               "& .MuiInputBase-input": { color: "#fff" },
//               "& .MuiInputLabel-root": { color: "#bbb" },
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": { borderColor: "#ff9800" },
//                 "&.Mui-disabled fieldset": { borderColor: "#666" }
//               }
//             }}
//           />

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel
//               id="mentor-select-label"
//               sx={{ color: "#bbb", "&.Mui-focused": { color: "#ff9800" } }}
//             >
//               Select Mentor
//             </InputLabel>
//             <Select
//               labelId="mentor-select-label"
//               value={selectedMentor}
//               label="Select Mentor"
//               onChange={(e) => setSelectedMentor(e.target.value)}
//               sx={{
//                 color: "#fff",
//                 "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ff9800" },
//                 "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ffb74d" },
//                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#ff9800" },
//                 "& .MuiSvgIcon-root": { color: "#ff9800" }
//               }}
//               MenuProps={{
//                 PaperProps: {
//                   sx: {
//                     bgcolor: "#1e1e1e",
//                     "& .MuiMenuItem-root": {
//                       color: "#fff",
//                       "&:hover": { bgcolor: "#333" }
//                     }
//                   }
//                 }
//               }}
//             >
//               {loading.faculties ? (
//                 <MenuItem disabled>
//                   <CircularProgress size={24} color="secondary" />
//                 </MenuItem>
//               ) : faculties.length > 0 ? (
//                 faculties.map((faculty) => (
//                   <MenuItem key={faculty.id} value={faculty.id}>
//                     {faculty.name} ({faculty.department || "N/A"})
//                   </MenuItem>
//                 ))
//               ) : (
//                 <MenuItem disabled>No faculty available</MenuItem>
//               )}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions sx={{ background: "#1e1e1e", padding: "16px 24px" }}>
//           <Button
//             onClick={handleModalClose}
//             sx={{
//               color: "#ff9800",
//               "&:hover": { backgroundColor: "rgba(255, 152, 0, 0.1)" }
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleConfirmRegistration}
//             disabled={!selectedMentor || loading.registration}
//             sx={{
//               color: "#ff9800",
//               "&:hover": { backgroundColor: "rgba(255, 152, 0, 0.1)" },
//               "&:disabled": { color: "#666" }
//             }}
//           >
//             {loading.registration ? (
//               <CircularProgress size={24} color="inherit" />
//             ) : "Confirm"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Projects;
