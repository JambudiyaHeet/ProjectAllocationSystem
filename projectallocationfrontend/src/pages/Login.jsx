import React, { useState, useRef, useEffect } from "react";
import { Button, TextField, Box, Typography, Container, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student"); // Add role state
  const loginRef = useRef(null); // Ref to track clicks outside the form
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8072/login", {
        email,
        password,
        role,
      });

      // Check if the response contains a Student or Faculty object
      if (response.data && (response.data.id || response.data.email)) {
        console.log("Login successful:", response.data);
        dispatch(setUser(response.data));
        // Store the user data in localStorage or state management (e.g., Redux, Context)
        localStorage.setItem("user", JSON.stringify(response.data));

        // Redirect to dashboard with user data
        navigate("/dashboard", { state: { user: response.data } });
      } else {
        console.error("Login failed: Invalid credentials or role");
        alert("Invalid credentials or role");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login");
    }
  };

  // Close the login form when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        navigate("/"); // Navigate back to the dashboard
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="login-overlay"
    >
      <Container maxWidth="xs">
        <Box
          ref={loginRef}
          sx={{
            marginTop: 8,
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
            Login
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
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
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
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
            <FormControl fullWidth margin="normal">
              <InputLabel sx={{ color: "#bbb" }}>Role</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
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
              Login
            </Button>
          </form>
          <Typography sx={{ marginTop: 2, color: "#bbb" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#1976d2", textDecoration: "none" }}>
              Sign up
            </Link>
          </Typography>
        </Box>
      </Container>
    </motion.div>
  );
};

export default Login;
// import React, { useState, useRef, useEffect } from "react";
// import { Button, TextField, Box, Typography, Container } from "@mui/material";
// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import "./Login.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const loginRef = useRef(null); // Ref to track clicks outside the form
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Email:", email);
//     console.log("Password:", password);
//     // Add your login logic here
//   };

//   // Close the login form when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (loginRef.current && !loginRef.current.contains(event.target)) {
//         navigate("/"); // Navigate back to the dashboard
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [navigate]);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="login-overlay"
//     >
//       <Container maxWidth="xs">
//         <Box
//           ref={loginRef}
//           sx={{
//             marginTop: 8,
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
//             Login
//           </Typography>
//           <form onSubmit={handleSubmit} style={{ width: "100%" }}>
//             <TextField
//               fullWidth
//               label="Email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               margin="normal"
//               required
//               sx={{
//                 "& .MuiInputLabel-root": { color: "#bbb" },
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": { borderColor: "#444" },
//                   "&:hover fieldset": { borderColor: "#666" },
//                   "&.Mui-focused fieldset": { borderColor: "#1976d2" },
//                 },
//                 "& .MuiInputBase-input": { color: "#fff" },
//               }}
//             />
//             <TextField
//               fullWidth
//               label="Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               margin="normal"
//               required
//               sx={{
//                 "& .MuiInputLabel-root": { color: "#bbb" },
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": { borderColor: "#444" },
//                   "&:hover fieldset": { borderColor: "#666" },
//                   "&.Mui-focused fieldset": { borderColor: "#1976d2" },
//                 },
//                 "& .MuiInputBase-input": { color: "#fff" },
//               }}
//             />
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
//               Login
//             </Button>
//           </form>
//           <Typography sx={{ marginTop: 2, color: "#bbb" }}>
//             Don't have an account?{" "}
//             <Link to="/register" style={{ color: "#1976d2", textDecoration: "none" }}>
//               Sign up
//             </Link>
//           </Typography>
//         </Box>
//       </Container>
//     </motion.div>
//   );
// };

// export default Login;



// import React, { useState, useRef, useEffect } from "react";
// import { Button, TextField, Box, Typography, Container, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
// import { motion } from "framer-motion";
// import { useDispatch } from "react-redux";
// import { setUser } from "../redux/userSlice";
// import { Link, useNavigate } from "react-router-dom";
// import "./Login.css";
// import axios from "axios";

// const Login = () => {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("Student"); // Add role state
//   const loginRef = useRef(null); // Ref to track clicks outside the form
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8072/login", {
//         email,
//         password,
//         role,
//       });

//       // Check if the response contains a Student or Faculty object
//       if (response.data && (response.data.id || response.data.email)) {
//         console.log("Login successful:", response.data);
//         dispatch(setUser(response.data));
//         // Store the user data in localStorage or state management (e.g., Redux, Context)
//         localStorage.setItem("user", JSON.stringify(response.data));

//         // Redirect to dashboard with user data
//         navigate("/dashboard", { state: { user: response.data } });
//       } else {
//         console.error("Login failed: Invalid credentials or role");
//         alert("Invalid credentials or role");
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       alert("An error occurred during login");
//     }
//   };

//   // Close the login form when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (loginRef.current && !loginRef.current.contains(event.target)) {
//         navigate("/"); // Navigate back to the dashboard
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [navigate]);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="login-overlay"
//     >
//       <Container maxWidth="xs">
//         <Box
//           ref={loginRef}
//           sx={{
//             marginTop: 8,
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
//             Login
//           </Typography>
//           <form onSubmit={handleSubmit} style={{ width: "100%" }}>
//             <TextField
//               fullWidth
//               label="Email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               margin="normal"
//               required
//               sx={{
//                 "& .MuiInputLabel-root": { color: "#bbb" },
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": { borderColor: "#444" },
//                   "&:hover fieldset": { borderColor: "#666" },
//                   "&.Mui-focused fieldset": { borderColor: "#1976d2" },
//                 },
//                 "& .MuiInputBase-input": { color: "#fff" },
//               }}
//             />
//             <TextField
//               fullWidth
//               label="Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               margin="normal"
//               required
//               sx={{
//                 "& .MuiInputLabel-root": { color: "#bbb" },
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": { borderColor: "#444" },
//                   "&:hover fieldset": { borderColor: "#666" },
//                   "&.Mui-focused fieldset": { borderColor: "#1976d2" },
//                 },
//                 "& .MuiInputBase-input": { color: "#fff" },
//               }}
//             />
//             <FormControl fullWidth margin="normal">
//               <InputLabel sx={{ color: "#bbb" }}>Role</InputLabel>
//               <Select
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     "& fieldset": { borderColor: "#444" },
//                     "&:hover fieldset": { borderColor: "#666" },
//                     "&.Mui-focused fieldset": { borderColor: "#1976d2" },
//                   },
//                   "& .MuiInputBase-input": { color: "#fff" },
//                 }}
//               >
//                 <MenuItem value="Student">Student</MenuItem>
//                 <MenuItem value="Faculty">Faculty</MenuItem>
//               </Select>
//             </FormControl>
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
//               Login
//             </Button>
//           </form>
//           <Typography sx={{ marginTop: 2, color: "#bbb" }}>
//             Don't have an account?{" "}
//             <Link to="/register" style={{ color: "#1976d2", textDecoration: "none" }}>
//               Sign up
//             </Link>
//           </Typography>
//         </Box>
//       </Container>
//     </motion.div>
//   );
// };

// export default Login;

