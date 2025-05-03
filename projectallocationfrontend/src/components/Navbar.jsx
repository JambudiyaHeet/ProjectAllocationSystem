// import React, { useState } from "react";
// import { AppBar, Toolbar, IconButton, Typography, Box, Menu, MenuItem, Button, Container } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import SchoolIcon from "@mui/icons-material/School";
// import PeopleIcon from "@mui/icons-material/People";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import LayersIcon from "@mui/icons-material/Layers";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import nextLogo from "../assets/next-logo.png"; // Ensure correct path

// const NAV_ITEMS = [
//   { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
//   { segment: "projects", title: "Projects", icon: <AssignmentIcon />, path: "/projects" },
//   { segment: "students", title: "Students", icon: <SchoolIcon />, path: "/students" },
//   { segment: "faculty", title: "Faculty", icon: <PeopleIcon />, path: "/faculty" },
//   { segment: "reports", title: "Reports", icon: <BarChartIcon />, path: "/reports" },
//   { segment: "integrations", title: "Integrations", icon: <LayersIcon />, path: "/integrations" },
// ];

// const Navbar = () => {
//   const [active, setActive] = useState("dashboard");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const navigate = useNavigate();

//   const handleNavClick = (segment, path) => {
//     setActive(segment);
//     navigate(path);
//   };

//   const handleProfileClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseProfileMenu = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <AppBar position="fixed" sx={{ backgroundColor: "#1976d2", boxShadow: "none" }}>
//       <Container sx={{ width: "100%" }}>
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           {/* Logo & Project Name */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
//             <img src={nextLogo} alt="Next Logo" style={{ height: "40px" }} />
//             <Typography variant="h6" sx={{ fontWeight: "bold", letterSpacing: 1, color: "white" }}>
//               Project
//             </Typography>
//           </Box>

//           {/* Navigation Items */}
//           <Box sx={{ display: "flex", gap: "20px" }}>
//             {NAV_ITEMS.map((item) => (
//               <Button
//                 key={item.segment}
//                 startIcon={item.icon}
//                 onClick={() => handleNavClick(item.segment, item.path)}
//                 disableRipple
//                 sx={{
//                   color: active === item.segment ? "#ffdf00" : "white",
//                   fontWeight: active === item.segment ? "bold" : "normal",
//                   textTransform: "none",
//                   position: "relative",
//                   paddingBottom: "5px",
//                   fontSize: active === item.segment ? "1.1rem" : "1rem",
//                   "&:focus": { outline: "none" },
//                   "&::after": {
//                     content: '""',
//                     position: "absolute",
//                     left: "50%",
//                     bottom: 0,
//                     width: active === item.segment ? "80%" : "0",
//                     height: "3px",
//                     backgroundColor: active === item.segment ? "#FFD700" : "rgba(255, 255, 255, 0.9)",
//                     transform: "translateX(-50%)",
//                     transition: "width 0.2s ease-in-out",
//                   },
//                   "&:hover::after": { width: "80%" },
//                   "&:hover": { backgroundColor: "transparent" },
//                 }}
//               >
//                 {item.title}
//               </Button>
//             ))}
//           </Box>

//           {/* Profile Menu */}
//           <Box>
//             <IconButton onClick={handleProfileClick} sx={{ color: "white" }}>
//               <AccountCircleIcon fontSize="large" />
//             </IconButton>
//             <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseProfileMenu}>
//               <MenuItem onClick={handleCloseProfileMenu}>Profile</MenuItem>
//               <MenuItem onClick={handleCloseProfileMenu}>Settings</MenuItem>
//               <MenuItem onClick={handleCloseProfileMenu}>Logout</MenuItem>
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Button,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import nextLogo from "../assets/next-logo.png"; // Import the logo image
import { useSelector } from "react-redux";

const BASE_NAV_ITEMS = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    segment: "projects",
    title: "Projects",
    icon: <AssignmentIcon />,
    path: "/projects",
  },
  {
    segment: "students",
    title: "Students",
    icon: <SchoolIcon />,
    path: "/students",
  },
  {
    segment: "faculty",
    title: "Faculty",
    icon: <PeopleIcon />,
    path: "/faculty",
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    path: "/reports",
  },
  // { segment: "integrations", title: "Integrations", icon: <LayersIcon />, path: "/integrations" },
  // { segment: "addprojects", title: "AddProject", icon: <AddIcon/>, path: "/addprojects" },
];

const Navbar = () => {
  const [active, setActive] = useState("dashboard");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const isFaculty = user && user.officeHours;
  console.log(isFaculty);

  const NAV_ITEMS = isFaculty
    ? [
        ...BASE_NAV_ITEMS,
        {
          segment: "addprojects",
          title: "AddProject",
          icon: <AddIcon />,
          path: "/addprojects",
        },
      ]
    : BASE_NAV_ITEMS;

  const handleNavClick = (segment, path) => {
    setActive(segment);
    navigate(path);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "#1976d2", boxShadow: "none" }}
    >
      <Container sx={{ width: "100%" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo and Text */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              src={nextLogo} // Use the imported logo
              alt="Next Logo"
              style={{ height: "40px" }} // Adjust size as needed
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                letterSpacing: 1,
                fontSize: "1.2rem", // Adjust font size as needed
                color: "white",
              }}
            >
              project
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: "flex", gap: "20px" }}>
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.segment}
                startIcon={item.icon}
                onClick={() => handleNavClick(item.segment, item.path)}
                disableRipple
                sx={{
                  color: active === item.segment ? "#ffdf00" : "white",
                  fontWeight: active === item.segment ? "bold" : "normal",
                  textTransform: "none",
                  position: "relative",
                  paddingBottom: "5px",
                  fontSize: active === item.segment ? "1.1rem" : "1rem",
                  "&:focus": { outline: "none" },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: "50%",
                    bottom: 0,
                    width: active === item.segment ? "80%" : "0",
                    height: "3px",
                    backgroundColor:
                      active === item.segment
                        ? "#FFD700"
                        : "rgba(255, 255, 255, 0.9)",
                    transform: "translateX(-50%)",
                    transition: "width 0.2s ease-in-out",
                  },
                  "&:hover::after": { width: "80%" },
                  "&:hover": { backgroundColor: "transparent" },
                }}
              >
                {item.title}
              </Button>
            ))}
          </Box>

          {/* Profile Menu */}
          <Box>
            <IconButton onClick={handleProfileClick} sx={{ color: "white" }}>
              <AccountCircleIcon fontSize="large" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseProfileMenu}
            >
              <MenuItem onClick={handleCloseProfileMenu}>Profile</MenuItem>
              <MenuItem onClick={handleCloseProfileMenu}>Settings</MenuItem>
              <MenuItem onClick={handleCloseProfileMenu}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
