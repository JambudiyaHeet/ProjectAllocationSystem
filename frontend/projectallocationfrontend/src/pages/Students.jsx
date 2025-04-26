/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import the checkmark icon
import { useSelector } from "react-redux"; // Import useSelector
import axios from "axios";

const Students = () => {
  const user = useSelector((state) => state.user.user); // Get user from Redux store
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Check authentication status

  const [requests, setRequests] = useState([]);
  const [students, setStudents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility
  const [selectedStudent, setSelectedStudent] = useState(null); // State to store the selected student
  const [projectDefinition, setProjectDefinition] = useState(""); // State to store project definition
  const [requestedStudents, setRequestedStudents] = useState([]); // State to store requested students

  // Fetch students and requests data
  useEffect(() => {
    if (isAuthenticated) {
      // Fetch students
      axios
        .get("http://localhost:8072/student")
        .then((response) => {
          setStudents(response.data.filter((student) => student.id !== user.id));
        })
        .catch((error) => {
          console.error("Error fetching students:", error);
        });

      // Fetch requests for the logged-in student
      axios
        .get(`http://localhost:8072/requests/receiver/${user.id}`)
        .then((response) => {
          setRequests(response.data);
        })
        .catch((error) => {
          console.error("Error fetching requests:", error);
        });
    }
  }, [isAuthenticated, user]);

  // const handleAccept = (requestId) => {
  //   // Update request status to "ACCEPTED"
  //   axios
  //     .put(`http://localhost:8072/requests/${requestId}`,null, { params: { status: "ACCEPTED" }, })
  //     .then((response) => {
  //       setRequests(requests.filter((req) => req.id !== requestId));
  //     })
  //     .catch((error) => {
  //       console.error("Error accepting request:", error);
  //     });
  // };

const handleAccept = (requestId) => {
  // Update request status to "ACCEPTED"
  axios
    .put(`http://localhost:8072/requests/${requestId}`, null, {
      params: { status: "ACCEPTED" }, // Send status as a query parameter
    })
    .then((response) => {
      console.log("Request accepted successfully:", response.data);

      // Get the accepted request
      const acceptedRequest = requests.find((req) => req.id === requestId);

      // Delete all other requests for the logged-in student (receiver)
      axios
        .delete(`http://localhost:8072/requests/deleteByReceiver/${user.id}`)
        .then(() => {
          console.log("All other requests deleted for the receiver");
        })
        .catch((error) => {
          console.error("Error deleting other requests:", error);
        });

      // Update isgroupjoin for both sender and receiver
      axios
        .put(`http://localhost:8072/student/${acceptedRequest.senderId}/isgroupjoin`, null, {
          params: { isgroupjoin: true },
        })
        .then(() => {
          console.log("Sender's isgroupjoin updated to true");
        })
        .catch((error) => {
          console.error("Error updating sender's isgroupjoin:", error);
        });

      axios
        .put(`http://localhost:8072/student/${user.id}/isgroupjoin`, null, {
          params: { isgroupjoin: true },
        })
        .then(() => {
          console.log("Receiver's isgroupjoin updated to true");
        })
        .catch((error) => {
          console.error("Error updating receiver's isgroupjoin:", error);
        });

      // Remove the accepted request from the list
      setRequests(requests.filter((req) => req.id === requestId));
    })
    .catch((error) => {
      console.error("Error accepting request:", error);
    });
};

  

  const handleDecline = (requestId) => {
    // Update request status to "DECLINED"
    axios
      .put(`http://localhost:8072/requests/${requestId}`,null, { params: {status: "DECLINED"}, })
      .then((response) => {
        setRequests(requests.filter((req) => req.id !== requestId));
      })
      .catch((error) => {
        console.error("Error declining request:", error);
      });
  };

  // Open dialog and set selected student
  const handleRequestClick = (student) => {
    setSelectedStudent(student);
    setOpenDialog(true);
  };

  // Close dialog and reset states
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStudent(null);
    setProjectDefinition("");
  };

  // Handle sending the request
  const handleSendRequest = () => {
    if (selectedStudent) {
      const newRequest = {
        senderId: user.id, // Logged-in student's ID
        receiverId: selectedStudent.id, // Selected student's ID
        projectDefinition: projectDefinition,
        status: "PENDING", // Default status
      };

      // Send the request
      axios
        .post("http://localhost:8072/requests", newRequest)
        .then((response) => {
          console.log("Request sent successfully:", response.data);
          setRequestedStudents([...requestedStudents, selectedStudent.id]); // Add student ID to requestedStudents
          handleCloseDialog();
        })
        .catch((error) => {
          console.error("Error sending request:", error);
        });
    }
  };

  const getSenderName = (senderId) => {
    const sender = students.find((student) => student.id === senderId);
    return sender ? sender.name : "Unknown";
  };

  return (
    <Box sx={{ background: "#121212", width: "100vw", minHeight: "100vh", paddingTop: "90px", display: "flex" }}>
      <Container maxWidth="lg" sx={{ flexGrow: 1, padding: "20px" }}>
        {/* Check if user is authenticated */}
        {isAuthenticated ? (
          <>
            {/* Parent Flex Container */}
            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
              {/* Left Section - Student List (Wider) */}
              <Box sx={{ flex: 3 }}>
                <Box sx={{ background: "#1e1e1e", padding: "15px", borderRadius: "8px", height: "100%" }}>
                  <Typography variant="h5" gutterBottom sx={{ color: "#ff9800", marginBottom: "10px", textAlign: "center" }}>
                    Student List
                  </Typography>
                  {students.length === 0 ? (
                    <Typography sx={{ color: "#bbb" }}>No students found</Typography>
                  ) : (
                    students.map((student) => (
                      <Card key={student.id} sx={{ background: "#242424", color: "#fff", marginBottom: "10px" }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ color: "#ff9800" }}>
                            {student.name}
                          </Typography>
                          <Typography sx={{ color: "#bbb" }}>CPI: {student.cpi}</Typography>
                          {requestedStudents.includes(student.id) ? (
                            <Button
                              variant="contained"
                              sx={{ background: "#4CAF50", color: "white", gap: "5px" }}
                              disabled
                            >
                              Requested <CheckCircleIcon />
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              sx={{ background: "#ff9800", color: "#000" }}
                              onClick={() => handleRequestClick(student)}
                            >
                              Request
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </Box>
              </Box>

              {/* Right Section - Requests (Fixed Size) */}
              <Box sx={{ flex: 1 }}>
                <Box sx={{ background: "#1e1e1e", padding: "15px", borderRadius: "8px", alignSelf: "flex-start" }}>
                  <Typography variant="h5" gutterBottom sx={{ color: "#ff9800" }}>
                    Project Requests
                  </Typography>
                  {requests.length === 0 ? (
                    <Typography sx={{ color: "#bbb" }}>No requests available</Typography>
                  ) : (
                    requests.map((req) => (
                      <Card key={req.id} sx={{ background: "#242424", color: "#fff", marginBottom: "10px" }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ color: "#ff9800" }}>
                            {getSenderName(req.senderId)} {/* Replace with sender's name if available */}
                          </Typography>
                          <Typography sx={{ color: "#bbb" }}>{req.projectDefinition}</Typography>
                          <Box sx={{ marginTop: "10px", display: "flex", gap: 2 }}>
                            <Button onClick={() => handleAccept(req.id)} sx={{ background: "#4CAF50", color: "white" }}>
                              Accept
                            </Button>
                            <Button onClick={() => handleDecline(req.id)} sx={{ background: "#FF5733", color: "white" }}>
                              Decline
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </Box>
              </Box>
            </Box>

            {/* Dialog for sending request */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle sx={{ color: "#ff9800" }}>Send Project Request</DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  label="Student Name"
                  value={selectedStudent ? selectedStudent.name : ""}
                  disabled
                  sx={{ marginBottom: "20px", marginTop: "10px" }}
                />
                <TextField
                  fullWidth
                  label="Project Definition"
                  value={projectDefinition}
                  onChange={(e) => setProjectDefinition(e.target.value)}
                  multiline
                  rows={4}
                  sx={{ marginBottom: "20px" }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} sx={{ color: "#ff9800" }}>
                  Cancel
                </Button>
                <Button onClick={handleSendRequest} sx={{ background: "#ff9800", color: "#000" }}>
                  Send
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          // Show message if user is not logged in
          <Typography variant="h5" sx={{ textAlign: "center", color: "red", marginBottom: 2 }}>
            You are not logged in. Please log in to view students.
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Students;
// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   Container,
//   Box,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
// } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import the checkmark icon
// import { useSelector } from "react-redux"; // Import useSelector
// import axios from "axios";

// const Students = () => {
//   const user = useSelector((state) => state.user.user); // Get user from Redux store
//   const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Check authentication status

//   const [requests, setRequests] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility
//   const [selectedStudent, setSelectedStudent] = useState(null); // State to store the selected student
//   const [projectDefinition, setProjectDefinition] = useState(""); // State to store project definition
//   const [requestedStudents, setRequestedStudents] = useState([]); // State to store requested students
//   const [currentStudent, setCurrentStudent] = useState(null);
//   const [groupMembers, setGroupMembers] = useState([]);

//   // Fetch students and requests data
//   // useEffect(() => {
//   //   if (isAuthenticated) {
//   //     // Fetch students
//   //     axios
//   //       .get("http://localhost:8072/student")
//   //       .then((response) => {
//   //         setStudents(response.data.filter((student) => student.id !== user.id && -0.5<=(student.cpi-user.cpi) && (student.cpi-user.cpi)<=0.5 && student.isgroupjoin!=1));
//   //       })
//   //       .catch((error) => {
//   //         console.error("Error fetching students:", error);
//   //       });

//   //     // Fetch requests for the logged-in student
//   //     axios
//   //       .get(`http://localhost:8072/requests/receiver/${user.id}`)
//   //       .then((response) => {
//   //         setRequests(response.data);
//   //       })
//   //       .catch((error) => {
//   //         console.error("Error fetching requests:", error);
//   //       });
//   //   }
//   // }, [isAuthenticated, user]);

//   useEffect(() => {
//     if (isAuthenticated) {
//       // Fetch logged-in student info
//       axios
//         .get(`http://localhost:8072/student/${user.id}`)
//         .then(() => {
//           // const current = res.data;
//           const current=user;
//           setCurrentStudent(current);

//           if (!current.isgroupjoin) {
//             // Fetch students for sending requests
//             axios
//               .get("http://localhost:8072/student")
//               .then((response) => {
//                 setStudents(
//                   response.data.filter(
//                     (student) =>
//                       student.id !== user.id &&
//                       -0.5 <= student.cpi - current.cpi &&
//                       student.cpi - current.cpi <= 0.5 &&
//                       !student.isgroupjoin
//                   )
//                 );
//               })
//               .catch((error) => {
//                 console.error("Error fetching students:", error);
//               });

//             // Fetch requests if not in group
//             axios
//               .get(`http://localhost:8072/requests/receiver/${user.id}`)
//               .then((response) => {
//                 setRequests(
//                   response.data.filter((req) => req.status === "PENDING")
//                 );
//               })
//               .catch((error) => {
//                 console.error("Error fetching requests:", error);
//               });
//           } else {
//             // Fetch group members if already in group
//             axios
//               .get(`http://localhost:8072/groups/${user.id}`)
//               .then((response) => {
//                 setGroupMembers(response.data);
//               })
//               .catch((error) => {
//                 console.error("Error fetching group members:", error);
//               });
//           }
//         })
//         .catch((err) => {
//           console.error("Error fetching current student:", err);
//         });
//     }
//   }, [isAuthenticated, user]);

//   // const handleAccept = (requestId) => {
//   //   // Update request status to "ACCEPTED"
//   //   axios
//   //     .put(`http://localhost:8072/requests/${requestId}`,null, { params: { status: "ACCEPTED" }, })
//   //     .then((response) => {
//   //       setRequests(requests.filter((req) => req.id !== requestId));
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error accepting request:", error);
//   //     });
//   // };

//   const handleAccept = (requestId) => {
//     // Update request status to "ACCEPTED"
//     axios
//       .put(`http://localhost:8072/requests/${requestId}`, null, {
//         params: { status: "ACCEPTED" }, // Send status as a query parameter
//       })
//       .then((response) => {
//         console.log("Request accepted successfully:", response.data);

//         // Get the accepted request
//         const acceptedRequest = requests.find((req) => req.id === requestId);

//         // Delete all other requests for the logged-in student (receiver)
//         axios
//           .delete(`http://localhost:8072/requests/deleteByReceiver/${user.id}`)
//           .then(() => {
//             console.log("All other requests deleted for the receiver");
//           })
//           .catch((error) => {
//             console.error("Error deleting other requests:", error);
//           });

//         // Update isgroupjoin for both sender and receiver
//         axios
//           .put(
//             `http://localhost:8072/student/${acceptedRequest.senderId}/isgroupjoin`,
//             null,
//             {
//               params: { isgroupjoin: true },
//             }
//           )
//           .then(() => {
//             console.log("Sender's isgroupjoin updated to true");
//           })
//           .catch((error) => {
//             console.error("Error updating sender's isgroupjoin:", error);
//           });

//         axios
//           .put(`http://localhost:8072/student/${user.id}/isgroupjoin`, null, {
//             params: { isgroupjoin: true },
//           })
//           .then(() => {
//             console.log("Receiver's isgroupjoin updated to true");
//           })
//           .catch((error) => {
//             console.error("Error updating receiver's isgroupjoin:", error);
//           });

//         // Remove the accepted request from the list
//         setRequests(requests.filter((req) => req.id === requestId));
//       })
//       .catch((error) => {
//         console.error("Error accepting request:", error);
//       });
//   };

//   const handleDecline = (requestId) => {
//     // Update request status to "DECLINED"
//     axios
//       .put(`http://localhost:8072/requests/${requestId}`, null, {
//         params: { status: "DECLINED" },
//       })
//       .then((response) => {
//         setRequests(requests.filter((req) => req.id !== requestId));
//       })
//       .catch((error) => {
//         console.error("Error declining request:", error);
//       });
//   };

//   // Open dialog and set selected student
//   const handleRequestClick = (student) => {
//     setSelectedStudent(student);
//     setOpenDialog(true);
//   };

//   // Close dialog and reset states
//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedStudent(null);
//     setProjectDefinition("");
//   };

//   // Handle sending the request
//   const handleSendRequest = () => {
//     if (selectedStudent) {
//       const newRequest = {
//         senderId: user.id, // Logged-in student's ID
//         receiverId: selectedStudent.id, // Selected student's ID
//         projectDefinition: projectDefinition,
//         status: "PENDING", // Default status
//       };

//       // Send the request
//       axios
//         .post("http://localhost:8072/requests", newRequest)
//         .then((response) => {
//           console.log("Request sent successfully:", response.data);
//           setRequestedStudents([...requestedStudents, selectedStudent.id]); // Add student ID to requestedStudents
//           handleCloseDialog();
//         })
//         .catch((error) => {
//           console.error("Error sending request:", error);
//         });
//     }
//   };

//   const getSenderName = (senderId) => {
//     const sender = students.find((student) => student.id === senderId);
//     return sender ? sender.name : "Unknown";
//   };

//   return (
//     <Box
//       sx={{
//         background: "#121212",
//         width: "100vw",
//         minHeight: "100vh",
//         paddingTop: "90px",
//         display: "flex",
//       }}
//     >
//       <Container maxWidth="lg" sx={{ flexGrow: 1, padding: "20px" }}>
//         {/* Check if user is authenticated */}
//         {isAuthenticated ? (
//           <>
//             {/* Parent Flex Container */}
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", md: "row" },
//                 gap: 4,
//               }}
//             >
//               {/* Left Section - Student List (Wider) */}
//               <Box sx={{ flex: 3 }}>
//                 <Box
//                   sx={{
//                     background: "#1e1e1e",
//                     padding: "15px",
//                     borderRadius: "8px",
//                     height: "100%",
//                   }}
//                 >
//                   <Typography
//                     variant="h5"
//                     gutterBottom
//                     sx={{
//                       color: "#ff9800",
//                       marginBottom: "10px",
//                       textAlign: "center",
//                     }}
//                   >
//                     Student List
//                   </Typography>
//                   {students.length === 0 ? (
//                     <Typography sx={{ color: "#bbb" }}>
//                       No students found
//                     </Typography>
//                   ) : (
//                     students.map((student) => (
//                       <Card
//                         key={student.id}
//                         sx={{
//                           background: "#242424",
//                           color: "#fff",
//                           marginBottom: "10px",
//                         }}
//                       >
//                         <CardContent>
//                           <Typography variant="h6" sx={{ color: "#ff9800" }}>
//                             {student.name}
//                           </Typography>
//                           <Typography sx={{ color: "#bbb" }}>
//                             CPI: {student.cpi}
//                           </Typography>
//                           {requestedStudents.includes(student.id) ? (
//                             <Button
//                               variant="contained"
//                               sx={{
//                                 background: "#4CAF50",
//                                 color: "white",
//                                 gap: "5px",
//                               }}
//                               disabled
//                             >
//                               Requested <CheckCircleIcon />
//                             </Button>
//                           ) : (
//                             <Button
//                               variant="contained"
//                               sx={{ background: "#ff9800", color: "#000" }}
//                               onClick={() => handleRequestClick(student)}
//                             >
//                               Request
//                             </Button>
//                           )}
//                         </CardContent>
//                       </Card>
//                     ))
//                   )}
//                 </Box>
//               </Box>

//               {/* Right Section - Requests (Fixed Size) */}
//               {/* <Box sx={{ flex: 1 }}>
//                 <Box sx={{ background: "#1e1e1e", padding: "15px", borderRadius: "8px", alignSelf: "flex-start" }}>
//                   <Typography variant="h5" gutterBottom sx={{ color: "#ff9800" }}>
//                     Project Requests
//                   </Typography>
//                   {requests.length === 0 ? (
//                     <Typography sx={{ color: "#bbb" }}>No requests available</Typography>
//                   ) : (
//                     requests.map((req) => (
//                       <Card key={req.id} sx={{ background: "#242424", color: "#fff", marginBottom: "10px" }}>
//                         <CardContent>
//                           <Typography variant="h6" sx={{ color: "#ff9800" }}>
//                             {getSenderName(req.senderId)} {/* Replace with sender's name if available }
//                           </Typography>
//                           <Typography sx={{ color: "#bbb" }}>{req.projectDefinition}</Typography>
//                           <Box sx={{ marginTop: "10px", display: "flex", gap: 2 }}>
//                             <Button onClick={() => handleAccept(req.id)} sx={{ background: "#4CAF50", color: "white" }}>
//                               Accept
//                             </Button>
//                             <Button onClick={() => handleDecline(req.id)} sx={{ background: "#FF5733", color: "white" }}>
//                               Decline
//                             </Button>
//                           </Box>
//                         </CardContent>
//                       </Card>
//                     ))
//                   )}
//                 </Box>
//               </Box> */}
//               <Box sx={{ flex: 1 }}>
//                 <Box
//                   sx={{
//                     background: "#1e1e1e",
//                     padding: "15px",
//                     borderRadius: "8px",
//                     alignSelf: "flex-start",
//                   }}
//                 >
//                   <Typography
//                     variant="h5"
//                     gutterBottom
//                     sx={{ color: "#ff9800" }}
//                   >
//                     {currentStudent?.isgroupjoin
//                       ? "Your Group"
//                       : "Project Requests"}
//                   </Typography>

//                   {currentStudent?.isgroupjoin ? (
//                     <>
//                       <Card
//                         sx={{
//                           background: "#242424",
//                           color: "#fff",
//                           marginBottom: "10px",
//                         }}
//                       >
//                         <CardContent>
//                           <Typography variant="h6" sx={{ color: "#4CAF50" }}>
//                             You: {currentStudent?.name}
//                           </Typography>
//                         </CardContent>
//                       </Card>
//                       {groupMembers
//                         .filter((member) => member.id !== user.id)
//                         .map((member) => (
//                           <Card
//                             key={member.id}
//                             sx={{
//                               background: "#242424",
//                               color: "#fff",
//                               marginBottom: "10px",
//                             }}
//                           >
//                             <CardContent>
//                               <Typography
//                                 variant="h6"
//                                 sx={{ color: "#ff9800" }}
//                               >
//                                 {member.name}
//                               </Typography>
//                             </CardContent>
//                           </Card>
//                         ))}
//                     </>
//                   ) : requests.length === 0 ? (
//                     <Typography sx={{ color: "#bbb" }}>
//                       No requests available
//                     </Typography>
//                   ) : (
//                     requests.map((req) => (
//                       <Card
//                         key={req.id}
//                         sx={{
//                           background: "#242424",
//                           color: "#fff",
//                           marginBottom: "10px",
//                         }}
//                       >
//                         <CardContent>
//                           <Typography variant="h6" sx={{ color: "#ff9800" }}>
//                             {getSenderName(req.senderId)}
//                           </Typography>
//                           <Typography sx={{ color: "#bbb" }}>
//                             {req.projectDefinition}
//                           </Typography>
//                           <Box
//                             sx={{ marginTop: "10px", display: "flex", gap: 2 }}
//                           >
//                             <Button
//                               onClick={() => handleAccept(req.id)}
//                               sx={{ background: "#4CAF50", color: "white" }}
//                             >
//                               Accept
//                             </Button>
//                             <Button
//                               onClick={() => handleDecline(req.id)}
//                               sx={{ background: "#FF5733", color: "white" }}
//                             >
//                               Decline
//                             </Button>
//                           </Box>
//                         </CardContent>
//                       </Card>
//                     ))
//                   )}
//                 </Box>
//               </Box>
//             </Box>

//             {/* Dialog for sending request */}
//             <Dialog open={openDialog} onClose={handleCloseDialog}>
//               <DialogTitle sx={{ color: "#ff9800" }}>
//                 Send Project Request
//               </DialogTitle>
//               <DialogContent>
//                 <TextField
//                   fullWidth
//                   label="Student Name"
//                   value={selectedStudent ? selectedStudent.name : ""}
//                   disabled
//                   sx={{ marginBottom: "20px", marginTop: "10px" }}
//                 />
//                 <TextField
//                   fullWidth
//                   label="Project Definition"
//                   value={projectDefinition}
//                   onChange={(e) => setProjectDefinition(e.target.value)}
//                   multiline
//                   rows={4}
//                   sx={{ marginBottom: "20px" }}
//                 />
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={handleCloseDialog} sx={{ color: "#ff9800" }}>
//                   Cancel
//                 </Button>
//                 <Button
//                   onClick={handleSendRequest}
//                   sx={{ background: "#ff9800", color: "#000" }}
//                 >
//                   Send
//                 </Button>
//               </DialogActions>
//             </Dialog>
//           </>
//         ) : (
//           // Show message if user is not logged in
//           <Typography
//             variant="h5"
//             sx={{ textAlign: "center", color: "red", marginBottom: 2 }}
//           >
//             You are not logged in. Please log in to view students.
//           </Typography>
//         )}
//       </Container>
//     </Box>
//   );
// };

// export default Students;
