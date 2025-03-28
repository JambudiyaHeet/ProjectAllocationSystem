// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Card,
//   CardContent,
//   Grid,
//   Container,
//   IconButton,
//   Paper,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import UploadFileIcon from "@mui/icons-material/UploadFile"; // Icon for file upload
// import CloseIcon from "@mui/icons-material/Close"; // Icon to remove file

// function Reports() {
//   const [currentReport, setCurrentReport] = useState(""); // State for the current week's report
//   const [selectedFile, setSelectedFile] = useState(null); // State for file attachment
//   const [submissions, setSubmissions] = useState([]); // State to store all submissions

//   // Handle file selection
//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]); // Store selected file
//   };

//   // Handle file removal
//   const handleRemoveFile = () => {
//     setSelectedFile(null);
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (currentReport.trim() === "" && !selectedFile) return; // Prevent empty submissions

//     const newSubmission = {
//       id: new Date().getTime(),
//       week: submissions.length + 1,
//       report: currentReport,
//       date: new Date().toLocaleDateString(),
//       file: selectedFile ? URL.createObjectURL(selectedFile) : null, // Store file URL
//       fileName: selectedFile ? selectedFile.name : null, // Store file name
//     };

//     setSubmissions([newSubmission, ...submissions]); // Add new submission
//     setCurrentReport(""); // Clear input
//     setSelectedFile(null); // Clear file
//   };

//   return (
//     <Box sx={{ background: "#121212", width: "100vw", minHeight: "100vh", paddingTop: "90px", display: "flex" }}>
//       <Container maxWidth="lg" sx={{ flexGrow: 1, padding: "20px" }}>
//         {/* Title */}
//         <Typography variant="h4" sx={{ color: "#ff9800", marginBottom: 4, textAlign: "center" }}>
//           Weekly Reports
//         </Typography>

//         {/* Report Submission Form */}
//         <Paper
//           elevation={3}
//           sx={{ background: "#1e1e1e", padding: "20px", borderRadius: "8px", marginBottom: 4 }}
//         >
//           <Typography variant="h6" sx={{ color: "#ff9800", marginBottom: 2 }}>
//             Submit Your Weekly Report
//           </Typography>
//           <TextField
//             fullWidth
//             multiline
//             rows={3}
//             placeholder="Write your report for this week..."
//             value={currentReport}
//             onChange={(e) => setCurrentReport(e.target.value)}
//             sx={{
//               background: "#242424",
//               borderRadius: "4px",
//               marginBottom: 2,
//               "& .MuiOutlinedInput-root": {
//                 color: "#fff",
//                 "& fieldset": { borderColor: "#ff9800" },
//                 "&:hover fieldset": { borderColor: "#ffb74d" },
//                 "&.Mui-focused fieldset": { borderColor: "#ff9800" },
//               },
//             }}
//           />

//           {/* File Upload Section */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}>
//             <input
//               type="file"
//               onChange={handleFileChange}
//               style={{ display: "none" }}
//               id="file-upload"
//             />
//             <label htmlFor="file-upload">
//               <Button
//                 variant="outlined"
//                 component="span"
//                 startIcon={<UploadFileIcon />}
//                 sx={{ background: "#242424", color: "#ff9800", borderColor: "#ff9800" }}
//               >
//                 Attach File
//               </Button>
//             </label>
//             {selectedFile && (
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <Typography variant="body2" sx={{ color: "#bbb" }}>
//                   {selectedFile.name}
//                 </Typography>
//                 <IconButton onClick={handleRemoveFile} sx={{ color: "#ff9800" }}>
//                   <CloseIcon />
//                 </IconButton>
//               </Box>
//             )}
//           </Box>

//           <Button
//             type="submit"
//             variant="contained"
//             onClick={handleSubmit}
//             sx={{ background: "#ff9800", color: "#000", width: "100%" }}
//           >
//             Submit Report
//           </Button>
//         </Paper>

//         {/* Previous Submissions */}
//         <Paper elevation={3} sx={{ background: "#1e1e1e", padding: "20px", borderRadius: "8px" }}>
//           <Typography variant="h6" sx={{ color: "#ff9800", marginBottom: 2 }}>
//             Previous Submissions
//           </Typography>
//           {submissions.length === 0 ? (
//             <Typography sx={{ color: "#bbb", textAlign: "center" }}>
//               No submissions yet. Submit your first report!
//             </Typography>
//           ) : (
//             <Grid container spacing={4}>
//               {submissions.map((submission) => (
//                 <Grid item key={submission.id} xs={12} sm={6} md={4}>
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     <Card sx={{ background: "#242424", color: "#fff", height: "100%", padding: "10px" }}>
//                       <CardContent>
//                         <Typography variant="body1" sx={{ color: "#fff", marginBottom: 1 }}>
//                           <strong>Week {submission.week}</strong> - {submission.date}
//                         </Typography>
//                         <Typography variant="body2" sx={{ color: "#bbb", marginBottom: 1 }}>
//                           {submission.report}
//                         </Typography>

//                         {/* File Download Link */}
//                         {submission.file && (
//                           <a
//                             href={submission.file}
//                             download={submission.fileName}
//                             style={{ color: "#ff9800", textDecoration: "none", fontWeight: "bold" }}
//                           >
//                             📎 {submission.fileName}
//                           </a>
//                         )}
//                       </CardContent>
//                     </Card>
//                   </motion.div>
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//         </Paper>
//       </Container>
//     </Box>
//   );
// }

// export default Reports;

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  IconButton,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import UploadFileIcon from "@mui/icons-material/UploadFile"; // Icon for file upload
import CloseIcon from "@mui/icons-material/Close"; // Icon to remove file
import { useSelector } from "react-redux"; // Import useSelector

function Reports() {
  const user = useSelector((state) => state.user.user); // Get user from Redux store
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Check authentication status

  const [currentReport, setCurrentReport] = useState(""); // State for the current week's report
  const [selectedFile, setSelectedFile] = useState(null); // State for file attachment
  const [submissions, setSubmissions] = useState([]); // State to store all submissions

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Store selected file
  };

  // Handle file removal
  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentReport.trim() === "" && !selectedFile) return; // Prevent empty submissions

    const newSubmission = {
      id: new Date().getTime(),
      week: submissions.length + 1,
      report: currentReport,
      date: new Date().toLocaleDateString(),
      file: selectedFile ? URL.createObjectURL(selectedFile) : null, // Store file URL
      fileName: selectedFile ? selectedFile.name : null, // Store file name
    };

    setSubmissions([newSubmission, ...submissions]); // Add new submission
    setCurrentReport(""); // Clear input
    setSelectedFile(null); // Clear file
  };

  return (
    <Box sx={{ background: "#121212", width: "100vw", minHeight: "100vh", paddingTop: "90px", display: "flex" }}>
      <Container maxWidth="lg" sx={{ flexGrow: 1, padding: "20px" }}>
        {/* Check if user is authenticated */}
        {isAuthenticated ? (
          <>
            {/* Title */}
            <Typography variant="h4" sx={{ color: "#ff9800", marginBottom: 4, textAlign: "center" }}>
              Weekly Reports
            </Typography>

            {/* Report Submission Form */}
            <Paper
              elevation={3}
              sx={{ background: "#1e1e1e", padding: "20px", borderRadius: "8px", marginBottom: 4 }}
            >
              <Typography variant="h6" sx={{ color: "#ff9800", marginBottom: 2 }}>
                Submit Your Weekly Report
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Write your report for this week..."
                value={currentReport}
                onChange={(e) => setCurrentReport(e.target.value)}
                sx={{
                  background: "#242424",
                  borderRadius: "4px",
                  marginBottom: 2,
                  "& .MuiOutlinedInput-root": {
                    color: "#fff",
                    "& fieldset": { borderColor: "#ff9800" },
                    "&:hover fieldset": { borderColor: "#ffb74d" },
                    "&.Mui-focused fieldset": { borderColor: "#ff9800" },
                  },
                }}
              />

              {/* File Upload Section */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}>
                <input
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<UploadFileIcon />}
                    sx={{ background: "#242424", color: "#ff9800", borderColor: "#ff9800" }}
                  >
                    Attach File
                  </Button>
                </label>
                {selectedFile && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2" sx={{ color: "#bbb" }}>
                      {selectedFile.name}
                    </Typography>
                    <IconButton onClick={handleRemoveFile} sx={{ color: "#ff9800" }}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>

              <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit}
                sx={{ background: "#ff9800", color: "#000", width: "100%" }}
              >
                Submit Report
              </Button>
            </Paper>

            {/* Previous Submissions */}
            <Paper elevation={3} sx={{ background: "#1e1e1e", padding: "20px", borderRadius: "8px" }}>
              <Typography variant="h6" sx={{ color: "#ff9800", marginBottom: 2 }}>
                Previous Submissions
              </Typography>
              {submissions.length === 0 ? (
                <Typography sx={{ color: "#bbb", textAlign: "center" }}>
                  No submissions yet. Submit your first report!
                </Typography>
              ) : (
                <Grid container spacing={4}>
                  {submissions.map((submission) => (
                    <Grid item key={submission.id} xs={12} sm={6} md={4}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Card sx={{ background: "#242424", color: "#fff", height: "100%", padding: "10px" }}>
                          <CardContent>
                            <Typography variant="body1" sx={{ color: "#fff", marginBottom: 1 }}>
                              <strong>Week {submission.week}</strong> - {submission.date}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#bbb", marginBottom: 1 }}>
                              {submission.report}
                            </Typography>

                            {/* File Download Link */}
                            {submission.file && (
                              <a
                                href={submission.file}
                                download={submission.fileName}
                                style={{ color: "#ff9800", textDecoration: "none", fontWeight: "bold" }}
                              >
                                📎 {submission.fileName}
                              </a>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Paper>
          </>
        ) : (
          // Show message if user is not logged in
          <Typography variant="h5" sx={{ textAlign: "center", color: "red", marginBottom: 2 }}>
            You are not logged in. Please log in to view reports.
          </Typography>
        )}
      </Container>
    </Box>
  );
}

export default Reports;