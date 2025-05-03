// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import { createTheme } from '@mui/material/styles';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import SchoolIcon from '@mui/icons-material/School';
// import PeopleIcon from '@mui/icons-material/People';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import LayersIcon from '@mui/icons-material/Layers';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// import { useDemoRouter } from '@toolpad/core/internal';

// const NAVIGATION = [
//   {
//     kind: 'header',
//     title: 'Project Allocation',
//   },
//   {
//     segment: 'dashboard',
//     title: 'Dashboard',
//     icon: <DashboardIcon />,
//   },
//   {
//     segment: 'projects',
//     title: 'Projects',
//     icon: <AssignmentIcon />,
//   },
//   {
//     segment: 'students',
//     title: 'Students',
//     icon: <SchoolIcon />,
//   },
//   {
//     segment: 'faculty',
//     title: 'Faculty',
//     icon: <PeopleIcon />,
//   },
//   {
//     kind: 'divider',
//   },
//   {
//     kind: 'header',
//     title: 'Reports & Analysis',
//   },
//   {
//     segment: 'reports',
//     title: 'Reports',
//     icon: <BarChartIcon />,
//   },
//   {
//     segment: 'integrations',
//     title: 'Integrations',
//     icon: <LayersIcon />,
//   },
// ];

// const demoTheme = createTheme({
//   cssVariables: {
//     colorSchemeSelector: 'data-toolpad-color-scheme',
//   },
//   colorSchemes: { light: true, dark: true },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// function DemoPageContent({ pathname }) {
//   return (
//     <Box
//       sx={{
//         py: 4,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         textAlign: 'center',
//       }}
//     >
//       <Typography variant="h5">
//         {pathname === '/dashboard' && 'Welcome to the Project Allocation System'}
//         {pathname === '/projects' && 'Manage and View All Projects'}
//         {pathname === '/students' && 'View and Assign Students to Projects'}
//         {pathname === '/faculty' && 'Faculty Members Managing Projects'}
//         {pathname === '/reports' && 'Project Allocation Reports'}
//         {pathname === '/integrations' && 'System Integrations & Extensions'}
//       </Typography>
//     </Box>
//   );
// }

// DemoPageContent.propTypes = {
//   pathname: PropTypes.string.isRequired,
// };

// function App(props) {
//   const { window } = props;
//   const router = useDemoRouter('/dashboard');

//   const demoWindow = window !== undefined ? window() : undefined;

//   return (
//     <AppProvider
//       navigation={NAVIGATION}
//       router={router}
//       theme={demoTheme}
//       window={demoWindow}
//     >
//       <DashboardLayout>
//         <DemoPageContent pathname={router.pathname} />
//       </DashboardLayout>
//     </AppProvider>
//   );
// }

// App.propTypes = {
//   window: PropTypes.func,
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import your Navbar component
import Dashboard from "./pages/Dashboard"; // Import the new Dashboard component
import Projects from "./pages/Projects";
import Students from "./pages/Students";
import Faculty from "./pages/Faculty";
import Reports from "./pages/Reports";
import Integrations from "./pages/Integrations";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import AddProjects from "./pages/AddProjects";


const App = () => {
  return (
    <Router>
      <div>
      <Navbar />
      </div>
      <div style={{ width: "100vw", overflowX: "hidden" }}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/students" element={<Students />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/addprojects/" element={<AddProjects />} />
        <Route path="/integrations" element={<Integrations />} />
      </Routes>
    </div>
    </Router>
  );
};

export default App;

