// import React, { useState } from "react";
// import {
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   Container,
//   Box,
//   TextField,
//   Grid,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   CardMedia,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import WorkIcon from "@mui/icons-material/Work"; // Icon for experience
// import StarIcon from "@mui/icons-material/Star"; // Icon for expertise
// import GroupsIcon from "@mui/icons-material/Groups"; // Icon for max groups
// import EmailIcon from "@mui/icons-material/Email"; // Icon for email
// import PhoneIcon from "@mui/icons-material/Phone"; // Icon for phone
// import ScheduleIcon from "@mui/icons-material/Schedule"; // Icon for office hours
// import AwardIcon from "@mui/icons-material/EmojiEvents"; // Icon for awards

// const Faculty = () => {
//   const [facultyMembers, setFacultyMembers] = useState([
//     {
//       id: 1,
//       name: "Dr. John Doe",
//       experience: "10 years",
//       expertise: ["Java", "Python", "Machine Learning"],
//       maxGroups: 5,
//       image: "https://via.placeholder.com/150", // Placeholder image URL
//       bio: "Dr. John Doe is a seasoned professional with over a decade of experience in software development and machine learning. He has published numerous research papers in top-tier conferences.",
//       email: "john.doe@example.com",
//       phone: "+1 123 456 7890",
//       officeHours: "Mon-Wed, 10:00 AM - 12:00 PM",
//       ongoingProjects: ["AI Chatbot", "Predictive Analytics"],
//       awards: ["Best Researcher Award 2022", "Excellence in Teaching 2021"],
//     },
//     {
//       id: 2,
//       name: "Dr. Jane Smith",
//       experience: "8 years",
//       expertise: ["Web Development", "Blockchain", "Cybersecurity"],
//       maxGroups: 4,
//       image: "https://via.placeholder.com/150", // Placeholder image URL
//       bio: "Dr. Jane Smith specializes in blockchain technology and cybersecurity. She has led several industry projects and is a frequent speaker at international conferences.",
//       email: "jane.smith@example.com",
//       phone: "+1 987 654 3210",
//       officeHours: "Tue-Thu, 2:00 PM - 4:00 PM",
//       ongoingProjects: ["Blockchain Voting System", "Secure Messaging App"],
//       awards: ["Innovator of the Year 2023", "Women in Tech Award 2020"],
//     },
//     {
//       id: 3,
//       name: "Dr. Alice Johnson",
//       experience: "12 years",
//       expertise: ["AI", "Data Science", "Cloud Computing"],
//       maxGroups: 6,
//       image: "https://via.placeholder.com/150", // Placeholder image URL
//       bio: "Dr. Alice Johnson is a pioneer in AI and data science. She has worked with leading tech companies and has mentored over 100 students in her career.",
//       email: "alice.johnson@example.com",
//       phone: "+1 555 123 4567",
//       officeHours: "Mon-Fri, 9:00 AM - 11:00 AM",
//       ongoingProjects: ["Autonomous Drones", "AI-Powered Healthcare"],
//       awards: ["Lifetime Achievement Award 2023", "Top AI Researcher 2022"],
//     },
//     {
//       id: 4,
//       name: "Dr. Michael Brown",
//       experience: "7 years",
//       expertise: ["Mobile Development", "UI/UX Design", "React Native"],
//       maxGroups: 3,
//       image: "https://via.placeholder.com/150", // Placeholder image URL
//       bio: "Dr. Michael Brown is an expert in mobile app development and UI/UX design. He has developed several award-winning apps and is passionate about teaching.",
//       email: "michael.brown@example.com",
//       phone: "+1 444 555 6666",
//       officeHours: "Wed-Fri, 1:00 PM - 3:00 PM",
//       ongoingProjects: ["E-Learning Platform", "Fitness Tracker App"],
//       awards: ["Best App Developer 2021", "Excellence in Innovation 2020"],
//     },
//   ]);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedFaculty, setSelectedFaculty] = useState(null);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleOpenDialog = (faculty) => {
//     setSelectedFaculty(faculty);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedFaculty(null);
//   };

//   const filteredFaculty = facultyMembers.filter((faculty) =>
//     faculty.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <Box sx={{ background: "#121212", width: "100vw", minHeight: "100vh", paddingTop: "90px", display: "flex" }}>
//       <Container maxWidth="lg" sx={{ flexGrow: 1, padding: "20px" }}>
//         {/* Search Bar */}
//         <Box sx={{ marginBottom: 4 }}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder="Search faculty by name..."
//             value={searchQuery}
//             onChange={handleSearch}
//             sx={{
//               background: "#1e1e1e",
//               borderRadius: "4px",
//               input: { color: "#fff" },
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": { borderColor: "#ff9800" },
//                 "&:hover fieldset": { borderColor: "#ffb74d" },
//                 "&.Mui-focused fieldset": { borderColor: "#ff9800" },
//               },
//             }}
//           />
//         </Box>

//         {/* Faculty Cards */}
//         <Grid container spacing={4}>
//           {filteredFaculty.map((faculty) => (
//             <Grid item key={faculty.id} xs={12} sm={6} md={3}>
//               <motion.div
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//               >
//                 <Card sx={{ background: "#1e1e1e", color: "#fff", height: "100%" }}>
//                   <CardMedia
//                     component="img"
//                     height="200"
//                     image={faculty.image}
//                     alt={faculty.name}
//                   />
//                   <CardContent>
//                     <Typography variant="h6" sx={{ color: "#ff9800", marginBottom: 2 }}>
//                       {faculty.name}
//                     </Typography>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 1 }}>
//                       <WorkIcon sx={{ color: "#ff9800" }} />
//                       <Typography variant="body2" sx={{ color: "#bbb" }}>
//                         <strong>Experience:</strong> {faculty.experience}
//                       </Typography>
//                     </Box>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 1 }}>
//                       <StarIcon sx={{ color: "#ff9800" }} />
//                       <Typography variant="body2" sx={{ color: "#bbb" }}>
//                         <strong>Expertise:</strong> {faculty.expertise.join(", ")}
//                       </Typography>
//                     </Box>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 2 }}>
//                       <GroupsIcon sx={{ color: "#ff9800" }} />
//                       <Typography variant="body2" sx={{ color: "#bbb" }}>
//                         <strong>Max Groups:</strong> {faculty.maxGroups}
//                       </Typography>
//                     </Box>
//                     <Button
//                       variant="contained"
//                       sx={{ background: "#ff9800", color: "#000", width: "100%" }}
//                       onClick={() => handleOpenDialog(faculty)}
//                     >
//                       View Details
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       {/* Faculty Details Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog} PaperProps={{ sx: { background: "#1e1e1e", color: "#fff" } }}>
//         <DialogTitle sx={{ color: "#ff9800" }}>{selectedFaculty?.name}</DialogTitle>
//         <DialogContent>
//           {selectedFaculty && (
//             <Box>
//               <CardMedia
//                 component="img"
//                 height="250"
//                 image={selectedFaculty.image}
//                 alt={selectedFaculty.name}
//                 sx={{ borderRadius: "8px", marginBottom: 2 }}
//               />
//               <Typography variant="body1" sx={{ color: "#fff", marginBottom: 2 }}>
//                 <strong>Bio:</strong> {selectedFaculty.bio}
//               </Typography>
//               <List>
//                 <ListItem>
//                   <ListItemIcon>
//                     <EmailIcon sx={{ color: "#ff9800" }} />
//                   </ListItemIcon>
//                   <ListItemText primary={selectedFaculty.email} />
//                 </ListItem>
//                 <ListItem>
//                   <ListItemIcon>
//                     <PhoneIcon sx={{ color: "#ff9800" }} />
//                   </ListItemIcon>
//                   <ListItemText primary={selectedFaculty.phone} />
//                 </ListItem>
//                 <ListItem>
//                   <ListItemIcon>
//                     <ScheduleIcon sx={{ color: "#ff9800" }} />
//                   </ListItemIcon>
//                   <ListItemText primary={`Office Hours: ${selectedFaculty.officeHours}`} />
//                 </ListItem>
//               </List>
//               <Typography variant="body1" sx={{ color: "#fff", marginBottom: 2 }}>
//                 <strong>Ongoing Projects:</strong>
//               </Typography>
//               <List>
//                 {selectedFaculty.ongoingProjects.map((project, index) => (
//                   <ListItem key={index}>
//                     <ListItemText primary={`• ${project}`} />
//                   </ListItem>
//                 ))}
//               </List>
//               <Typography variant="body1" sx={{ color: "#fff", marginBottom: 2 }}>
//                 <strong>Awards:</strong>
//               </Typography>
//               <List>
//                 {selectedFaculty.awards.map((award, index) => (
//                   <ListItem key={index}>
//                     <ListItemIcon>
//                       <AwardIcon sx={{ color: "#ff9800" }} />
//                     </ListItemIcon>
//                     <ListItemText primary={award} />
//                   </ListItem>
//                 ))}
//               </List>
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} sx={{ color: "#ff9800" }}>
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Faculty;

import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { motion } from "framer-motion";
import WorkIcon from "@mui/icons-material/Work"; // Icon for experience
import StarIcon from "@mui/icons-material/Star"; // Icon for expertise
import GroupsIcon from "@mui/icons-material/Groups"; // Icon for max groups
import EmailIcon from "@mui/icons-material/Email"; // Icon for email
import PhoneIcon from "@mui/icons-material/Phone"; // Icon for phone
import ScheduleIcon from "@mui/icons-material/Schedule"; // Icon for office hours
import AwardIcon from "@mui/icons-material/EmojiEvents"; // Icon for awards
import { useSelector } from "react-redux"; // Import useSelector
import axios from "axios";

const Faculty = () => {
  const user = useSelector((state) => state.user.user); // Get user from Redux store
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Check authentication status
  // const [facultyMembers, setFacultyMembers] = useState();

  const [facultyMembers, setFacultyMembers] = useState([
    {
      id: 1,
      name: "Dr. John Doe",
      experience: "10 years",
      expertise: ["Java", "Python", "Machine Learning"],
      maxGroups: 5,
      image:
        "https://th.bing.com/th/id/OIP.T1pPhvZD6gun7uIW0vEA5QHaE4?cb=iwc1&rs=1&pid=ImgDetMain",
      bio: "Dr. John Doe is a seasoned professional with over a decade of experience in software development and machine learning. He has published numerous research papers in top-tier conferences.",
      email: "john.doe@example.com",
      phone: "+1 123 456 7890",
      officeHours: "Mon-Wed, 10:00 AM - 12:00 PM",
      ongoingProjects: ["AI Chatbot", "Predictive Analytics"],
      awards: ["Best Researcher Award 2022", "Excellence in Teaching 2021"],
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      experience: "8 years",
      expertise: ["Web Development", "Blockchain", "Cybersecurity"],
      maxGroups: 4,
      image:
        "https://th.bing.com/th/id/OIP.T1pPhvZD6gun7uIW0vEA5QHaE4?cb=iwc1&rs=1&pid=ImgDetMain",
      bio: "Dr. Jane Smith specializes in blockchain technology and cybersecurity. She has led several industry projects and is a frequent speaker at international conferences.",
      email: "jane.smith@example.com",
      phone: "+1 987 654 3210",
      officeHours: "Tue-Thu, 2:00 PM - 4:00 PM",
      ongoingProjects: ["Blockchain Voting System", "Secure Messaging App"],
      awards: ["Innovator of the Year 2023", "Women in Tech Award 2020"],
    },
    {
      id: 3,
      name: "Dr. Alice Johnson",
      experience: "12 years",
      expertise: ["AI", "Data Science", "Cloud Computing"],
      maxGroups: 6,
      image:
        "https://th.bing.com/th/id/OIP.T1pPhvZD6gun7uIW0vEA5QHaE4?cb=iwc1&rs=1&pid=ImgDetMain",
      bio: "Dr. Alice Johnson is a pioneer in AI and data science. She has worked with leading tech companies and has mentored over 100 students in her career.",
      email: "alice.johnson@example.com",
      phone: "+1 555 123 4567",
      officeHours: "Mon-Fri, 9:00 AM - 11:00 AM",
      ongoingProjects: ["Autonomous Drones", "AI-Powered Healthcare"],
      awards: ["Lifetime Achievement Award 2023", "Top AI Researcher 2022"],
    },
    {
      id: 4,
      name: "Dr. Michael Brown",
      experience: "7 years",
      expertise: ["Mobile Development", "UI/UX Design", "React Native"],
      maxGroups: 3,
      image:
        "https://th.bing.com/th/id/OIP.T1pPhvZD6gun7uIW0vEA5QHaE4?cb=iwc1&rs=1&pid=ImgDetMain",
      bio: "Dr. Michael Brown is an expert in mobile app development and UI/UX design. He has developed several award-winning apps and is passionate about teaching.",
      email: "michael.brown@example.com",
      phone: "+1 444 555 6666",
      officeHours: "Wed-Fri, 1:00 PM - 3:00 PM",
      ongoingProjects: ["E-Learning Platform", "Fitness Tracker App"],
      awards: ["Best App Developer 2021", "Excellence in Innovation 2020"],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  // useEffect(() => {
  //   if (!isAuthenticated) return;

  //   console.log("hello");
  //   // setLoading((prev) => ({ ...prev, faculties: true }));

  //   axios
  //     .get("http://localhost:8072/faculty")
  //     .then((response) => {
  //       console.log(response.data);
  //       setFacultyMembers(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching faculties:", error);
  //     });
  // }, [isAuthenticated]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOpenDialog = (faculty) => {
    setSelectedFaculty(faculty);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFaculty(null);
  };

  const filteredFaculty = facultyMembers.filter((faculty) =>
    faculty.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        {/* Check if user is authenticated */}
        {isAuthenticated ? (
          <>
            {/* Search Bar */}
            <Box sx={{ marginBottom: 4 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search faculty by name..."
                value={searchQuery}
                onChange={handleSearch}
                sx={{
                  background: "#1e1e1e",
                  borderRadius: "4px",
                  input: { color: "#fff" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#ff9800" },
                    "&:hover fieldset": { borderColor: "#ffb74d" },
                    "&.Mui-focused fieldset": { borderColor: "#ff9800" },
                  },
                }}
              />
            </Box>

            {/* Faculty Cards */}
            <Grid container spacing={4}>
              {filteredFaculty.map((faculty) => (
                <Grid item key={faculty.id} xs={12} sm={6} md={3}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Card
                      sx={{
                        background: "#1e1e1e",
                        color: "#fff",
                        height: "100%",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={faculty.image}
                        alt={faculty.name}
                      />
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{ color: "#ff9800", marginBottom: 2 }}
                        >
                          {faculty.name}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            marginBottom: 1,
                          }}
                        >
                          <WorkIcon sx={{ color: "#ff9800" }} />
                          <Typography variant="body2" sx={{ color: "#bbb" }}>
                            <strong>Experience:</strong> {faculty.experience}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            marginBottom: 1,
                          }}
                        >
                          <StarIcon sx={{ color: "#ff9800" }} />
                          <Typography variant="body2" sx={{ color: "#bbb" }}>
                            <strong>Expertise:</strong>{" "}
                            {faculty.expertise.join(", ")}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            marginBottom: 2,
                          }}
                        >
                          <GroupsIcon sx={{ color: "#ff9800" }} />
                          <Typography variant="body2" sx={{ color: "#bbb" }}>
                            <strong>Max Groups:</strong> {faculty.maxGroups}
                          </Typography>
                        </Box>
                        <Button
                          variant="contained"
                          sx={{
                            background: "#ff9800",
                            color: "#000",
                            width: "100%",
                          }}
                          onClick={() => handleOpenDialog(faculty)}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            {/* Faculty Details Dialog */}
            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              PaperProps={{ sx: { background: "#1e1e1e", color: "#fff" } }}
            >
              <DialogTitle sx={{ color: "#ff9800" }}>
                {selectedFaculty?.name}
              </DialogTitle>
              <DialogContent>
                {selectedFaculty && (
                  <Box>
                    <CardMedia
                      component="img"
                      height="250"
                      image={selectedFaculty.image}
                      alt={selectedFaculty.name}
                      sx={{ borderRadius: "8px", marginBottom: 2 }}
                    />
                    <Typography
                      variant="body1"
                      sx={{ color: "#fff", marginBottom: 2 }}
                    >
                      <strong>Bio:</strong> {selectedFaculty.bio}
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <EmailIcon sx={{ color: "#ff9800" }} />
                        </ListItemIcon>
                        <ListItemText primary={selectedFaculty.email} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <PhoneIcon sx={{ color: "#ff9800" }} />
                        </ListItemIcon>
                        <ListItemText primary={selectedFaculty.phone} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <ScheduleIcon sx={{ color: "#ff9800" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Office Hours: ${selectedFaculty.officeHours}`}
                        />
                      </ListItem>
                    </List>
                    <Typography
                      variant="body1"
                      sx={{ color: "#fff", marginBottom: 2 }}
                    >
                      <strong>Ongoing Projects:</strong>
                    </Typography>
                    <List>
                      {selectedFaculty.ongoingProjects.map((project, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={`• ${project}`} />
                        </ListItem>
                      ))}
                    </List>
                    <Typography
                      variant="body1"
                      sx={{ color: "#fff", marginBottom: 2 }}
                    >
                      <strong>Awards:</strong>
                    </Typography>
                    <List>
                      {selectedFaculty.awards.map((award, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <AwardIcon sx={{ color: "#ff9800" }} />
                          </ListItemIcon>
                          <ListItemText primary={award} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} sx={{ color: "#ff9800" }}>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          // Show message if user is not logged in
          <Typography
            variant="h5"
            sx={{ textAlign: "center", color: "red", marginBottom: 2 }}
          >
            You are not logged in. Please log in to view faculty details.
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Faculty;
