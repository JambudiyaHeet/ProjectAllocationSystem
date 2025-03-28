// import React, { useState,useEffect } from "react";
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
// } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // For registered projects
// import { HfInference } from "@huggingface/inference";
// import { useSelector } from "react-redux"; // Import useSelector
// import axios from "axios";

// const Projects = () => {
  
//   const user = useSelector((state) => state.user.user); // Get user from Redux store
//   const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Check authentication status
 
//  const [searchQuery, setSearchQuery] = useState("");
//   const [projects, setProjects] = useState([
//     {
//       id: 1,
//       title: "AI-Based Chatbot",
//       image: "https://via.placeholder.com/150",
//       maxStudents: 3,
//       type: "AI-Based",
//       level: "Hard",
//     },
//     {
//       id: 2,
//       title: "E-Commerce Website",
//       image: "https://via.placeholder.com/150",
//       maxStudents: 4,
//       type: "Web",
//       level: "Medium",
//     },
//     {
//       id: 3,
//       title: "Mobile Expense Tracker",
//       image: "https://via.placeholder.com/150",
//       maxStudents: 2,
//       type: "Mobile App",
//       level: "Easy",
//     },
//     {
//       id: 4,
//       title: "Blockchain Voting System",
//       image: "https://via.placeholder.com/150",
//       maxStudents: 5,
//       type: "Blockchain",
//       level: "Hard",
//     },
//     {
//       id: 5,
//       title: "ML-Based Recommendation System",
//       image: "https://via.placeholder.com/150",
//       maxStudents: 3,
//       type: "ML-Based",
//       level: "Hard",
//     },
//   ]);

//   const [registeredProjects, setRegisteredProjects] = useState([]); // Track registered projects
//   const [aiMessage, setAiMessage] = useState(""); // User's message to AI
//   const [aiResponse, setAiResponse] = useState(""); // AI's response

//   useEffect(() => {
//     if (isAuthenticated) {
//       axios
//         .get("http://localhost:8072/project") // Replace with your backend endpoint
//         .then((response) => {
//           setProjects(response.data); // Set the fetched projects
//         })
//         .catch((error) => {
//           console.error("Error fetching projects:", error);
//         });
//       }
//     }, [isAuthenticated]);
    
//     console.log(projects);
//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleRegister = (projectId) => {
//     setRegisteredProjects([...registeredProjects, projectId]);
//     console.log(`Registered for project with ID: ${projectId}`);
//   };

//   const handleGetRecommendation = () => {
//     console.log("Fetching project recommendations...");
//     // Add your ML model integration here
//   };



//   const client = new HfInference(process.env.REACT_APP_HF_ACCESS_TOKEN); // Replace with your API key

//   const handleAskAI = async () => {
//     try {
//       // Set loading state
//       setAiResponse("Loading response...");

//       // Make the API call
//       const chatCompletion = await client.chatCompletion({
//         model: "meta-llama/Llama-3.3-70B-Instruct",
//         messages: [
//           {
//             role: "user",
//             content: aiMessage,
//           },
//         ],
//         provider: "together",  // Required for this model
//         max_tokens: 500,  // Adjust as needed
//       });

//       // Extract and display response
//       const aiResponseText = chatCompletion.choices[0].message.content;
//       setAiResponse(aiResponseText);
//     } catch (error) {
//       console.error("Error:", error);
//       setAiResponse(`Error: ${error.message}`);
//     }
//   };

//   const filteredProjects = projects.filter(
//     (project) =>
//       project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       project.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       project.difficultyLevel.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <Box sx={{ background: "#121212", width: "100vw", minHeight: "100vh", paddingTop: "90px", display: "flex" }}>
//       <Container maxWidth="lg" sx={{ flexGrow: 1, padding: "20px" }}>
//         {/* Parent Flex Container */}
//         {isAuthenticated ? (
//         <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
//           {/* Left Panel - Project List */}
//           <Box sx={{ flex: 3 }}>
//             {/* Search Bar and Recommendation Button */}
//             <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 placeholder="Search projects by title, type, or level..."
//                 value={searchQuery}
//                 onChange={handleSearch}
//                 sx={{ background: "#1e1e1e", borderRadius: "4px", input: { color: "#fff" } }}
//               />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleGetRecommendation}
//                 sx={{ marginLeft: 2, background: "#ff9800", color: "#000" }}
//               >
//                 Get Recommendation
//               </Button>
//             </Box>

//             {/* Project Cards */}
//             <Grid container spacing={4}>
//               {filteredProjects.map((project) => (
//                 <Grid item key={project.id} xs={12} sm={6} md={4}>
//                   <Card sx={{ background: "#1e1e1e", color: "#fff", height: "100%", display: "flex", flexDirection: "column" }}>
//                     <CardMedia
//                       component="img"
//                       height="140"
//                       image={project.image}
//                       //image={project.image ? `http://localhost:8000/${project.image}` : "https://via.placeholder.com/140x140?text=No+Image+Available"} //
//                       alt={project.title}
//                     />
//                     <CardContent sx={{ flexGrow: 1 }}>
//                       <Typography gutterBottom variant="h6" component="div" sx={{ color: "#ff9800" }}>
//                         {project.title}
//                       </Typography>
//                       <Typography variant="body2" sx={{ color: "#bbb" }}>
//                         <strong>Type:</strong> {project.type}
//                       </Typography>
//                       <Typography variant="body2" sx={{ color: "#bbb" }}>
//                         <strong>Max Students:</strong> {project.maxStudentAllow}
//                       </Typography>
//                       <Typography variant="body2" sx={{ color: "#bbb" }}>
//                         <strong>Level:</strong> {project.difficultyLevel}
//                       </Typography>
//                     </CardContent>
//                     <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
//                       {registeredProjects.includes(project.id) ? (
//                         <Button
//                           variant="contained"
//                           sx={{ background: "#4CAF50", color: "white", gap: "5px" }}
//                           disabled
//                         >
//                           Registered <CheckCircleIcon />
//                         </Button>
//                       ) : (
//                         <Button
//                           variant="contained"
//                           sx={{ background: "#ff9800", color: "#000" }}
//                           onClick={() => handleRegister(project.id)}
//                         >
//                           Register
//                         </Button>
//                       )}
//                     </Box>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>

//           {/* Right Panel - Ask AI */}
//           <Box sx={{ flex: 1 }}>
//             <Paper sx={{ background: "#1e1e1e", padding: "20px", borderRadius: "8px" }}>
//               <Typography variant="h6" sx={{ color: "#ff9800", marginBottom: 2 }}>
//                 Ask AI for Help
//               </Typography>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 placeholder="Type your question..."
//                 value={aiMessage}
//                 onChange={(e) => setAiMessage(e.target.value)}
//                 multiline
//                 rows={4}
//                 sx={{
//                   background: "#242424",
//                   marginBottom: 2,
//                   "& .MuiOutlinedInput-root": {
//                     color: "#fff", // Text color
//                     "& fieldset": {
//                       borderColor: "#ff9800", // Border color
//                     },
//                     "&:hover fieldset": {
//                       borderColor: "#ffb74d", // Hover border color
//                     },
//                     "&.Mui-focused fieldset": {
//                       borderColor: "#ff9800", // Focus border color
//                     },
//                   },
//                   "& .MuiInputBase-input::placeholder": {
//                     color: "#ffcc80", // Placeholder color
//                     opacity: 1, // Ensure it's fully visible
//                   },
//                 }}
//               />

//               <Button
//                 variant="contained"
//                 onClick={handleAskAI}
//                 sx={{ background: "#ff9800", color: "#000", width: "100%" }}
//               >
//                 Ask AI
//               </Button>
//               {aiResponse && (
//                 <Box sx={{ marginTop: 2, padding: "10px", background: "#242424", borderRadius: "4px" }}>
//                   <Typography variant="body1" sx={{ color: "#fff" }}>
//                     {aiResponse}
//                   </Typography>
//                 </Box>
//               )}
//             </Paper>
//           </Box>
//         </Box>):(
//           <Typography variant="h5" sx={{ textAlign: "center", color: "red", marginBottom: 2 }}>
//             You are not logged in. Please log in to view projects
//           </Typography>
//         )}
//       </Container>
//     </Box>
//   );
// };

// export default Projects;


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

          axios.get(`http://localhost:8072/student/${senderId}`)
          .then((response)=>{
            setGroupMemberOne(response.data.name);
          })

          axios.get(`http://localhost:8072/student/${receiverId}`)
          .then((response)=>{
            setGroupMemberOne(response.data.name);
          })
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

  const handleConfirmRegistration = () => {
    if (selectedProject) {
      // Perform registration logic here (e.g., API call to register the project)
      console.log("Registering for project:", selectedProject.title);
      console.log("Group Member 1:", groupMemberOne);
      console.log("Group Member 2:", groupMemberTwo);

      // Add the project to the registered projects list
      setRegisteredProjects([...registeredProjects, selectedProject.id]);

      // Close the modal
      handleModalClose();
    }
  };

  const handleGetRecommendation = () => {
    console.log("Fetching project recommendations...");
    // Add your ML model integration here
  };

  const client = new HfInference(process.env.REACT_APP_HF_ACCESS_TOKEN); // Replace with your API key
  const handleAskAI = async () => {
    try {
      // Set loading state
      setAiResponse("Loading response...");

      // Make the API call
      const chatCompletion = await client.chatCompletion({
        model: "meta-llama/Llama-3.3-70B-Instruct",
        messages: [
          {
            role: "user",
            content: aiMessage,
          },
        ],
        provider: "together", // Required for this model
        max_tokens: 500, // Adjust as needed
      });

      // Extract and display response
      const aiResponseText = chatCompletion.choices[0].message.content;
      setAiResponse(aiResponseText);
    } catch (error) {
      console.error("Error:", error);
      setAiResponse(`Error: ${error.message}`);
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.difficultyLevel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ background: "#121212", width: "100vw", minHeight: "100vh", paddingTop: "90px", display: "flex" }}>
      <Container maxWidth="lg" sx={{ flexGrow: 1, padding: "20px" }}>
        {/* Parent Flex Container */}
        {isAuthenticated ? (
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
            {/* Left Panel - Project List */}
            <Box sx={{ flex: 3 }}>
              {/* Search Bar and Recommendation Button */}
              <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search projects by title, type, or level..."
                  value={searchQuery}
                  onChange={handleSearch}
                  sx={{ background: "#1e1e1e", borderRadius: "4px", input: { color: "#fff" } }}
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
              {/* Project Cards */}
              <Grid container spacing={4}>
                {filteredProjects.map((project) => (
                  <Grid item key={project.id} xs={12} sm={6} md={4}>
                    <Card sx={{ background: "#1e1e1e", color: "#fff", height: "100%", display: "flex", flexDirection: "column" }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={project.image}
                        alt={project.title}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h6" component="div" sx={{ color: "#ff9800" }}>
                          {project.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#bbb" }}>
                          <strong>Type:</strong> {project.type}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#bbb" }}>
                          <strong>Max Students:</strong> {project.maxStudents}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#bbb" }}>
                          <strong>Level:</strong> {project.level}
                        </Typography>
                      </CardContent>
                      <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
                        {registeredProjects.includes(project.id) ? (
                          <Button
                            variant="contained"
                            sx={{ background: "#4CAF50", color: "white", gap: "5px" }}
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
              <Paper sx={{ background: "#1e1e1e", padding: "20px", borderRadius: "8px" }}>
                <Typography variant="h6" sx={{ color: "#ff9800", marginBottom: 2 }}>
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
                      color: "#fff", // Text color
                      "& fieldset": {
                        borderColor: "#ff9800", // Border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#ffb74d", // Hover border color
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#ff9800", // Focus border color
                      },
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#ffcc80", // Placeholder color
                      opacity: 1, // Ensure it's fully visible
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleAskAI}
                  sx={{ background: "#ff9800", color: "#000", width: "100%" }}
                >
                  Ask AI
                </Button>
                {aiResponse && (
                  <Box sx={{ marginTop: 2, padding: "10px", background: "#242424", borderRadius: "4px" }}>
                    <Typography variant="body1" sx={{ color: "#fff" }}>
                      {aiResponse}
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Box>
          </Box>
        ) : (
          <Typography variant="h5" sx={{ textAlign: "center", color: "red", marginBottom: 2 }}>
            You are not logged in. Please log in to view projects
          </Typography>
        )}
      </Container>

      {/* Registration Modal */}
      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle sx={{ color: "#ff9800" }}>Register for {selectedProject?.title}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Group Member 1"
            value={groupMemberOne}
            onChange={(e) => setGroupMemberOne(e.target.value)}
            sx={{ marginBottom: 2, marginTop: 2 }}
          />
          <TextField
            fullWidth
            label="Group Member 2"
            value={groupMemberTwo}
            onChange={(e) => setGroupMemberTwo(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} sx={{ color: "#ff9800" }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmRegistration} sx={{ color: "#ff9800" }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Projects;