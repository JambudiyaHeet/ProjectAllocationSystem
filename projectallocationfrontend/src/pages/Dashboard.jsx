/* eslint-disable no-unused-vars */
// import React from "react";
// import { Button } from "@mui/material";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import "./Dashboard.css";

// const Dashboard = () => {
//   return (
//     <div className="dashboard-container">
//       {/* Hero Section */}
//       <div className="hero-section">
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="hero-content"
//         >
//           <h1 className="hero-title">Welcome to Project Allocation System</h1>
//           {/* <Button variant="contained" color="primary" size="large">
//             Get Started
//           </Button> */}
//            <Button
//             variant="contained"
//             color="primary"
//             size="large"
//             component={Link}
//             to="/login"
//           >
//             Get Started
//           </Button>
//         </motion.div>
//       </div>

//       {/* About Section */}
//       <div className="about-section">
//         <h2>About Our System</h2>
//         <div className="about-cards">
//           <div className="about-card">
//             <h3>Vision</h3>
//             <p>To provide a seamless project allocation experience for students and faculty.</p>
//           </div>
//           <div className="about-card">
//             <h3>Mission</h3>
//             <p>To enhance project management efficiency using advanced technology.</p>
//           </div>
//           <div className="about-card">
//             <h3>Quality Policy</h3>
//             <p>Committed to ensuring fair, automated, and transparent project distribution.</p>
//           </div>
//         </div>
//       </div>

//       {/* Timeline Section */}
//       <div className="timeline-section">
//         <h2>Our Journey</h2>
//         <div className="timeline">
//           <div className="timeline-item">
//             <h3>2021</h3>
//             <p>Initial concept and research phase.</p>
//           </div>
//           <div className="timeline-item">
//             <h3>2022</h3>
//             <p>Prototype development and testing.</p>
//           </div>
//           <div className="timeline-item">
//             <h3>2023</h3>
//             <p>Official launch of the Project Allocation System.</p>
//           </div>
//         </div>
//       </div>

//       {/* Statistics Section */}
//       <div className="stats-section">
//         <h2>Statistics</h2>
//         <div className="stats">
//           <div className="stat-item">
//             <h3>100+</h3>
//             <p>Projects Allocated</p>
//           </div>
//           <div className="vertical-divider"></div> {/* Vertical line */}
//           <div className="stat-item">
//             <h3>500+</h3>
//             <p>Students Benefited</p>
//           </div>
//           <div className="vertical-divider"></div> {/* Vertical line */}
//           <div className="stat-item">
//             <h3>50+</h3>
//             <p>Faculty Members</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import VisionIcon from "@mui/icons-material/Visibility"; // Example icon
import MissionIcon from "@mui/icons-material/Flag"; // Example icon
import QualityIcon from "@mui/icons-material/VerifiedUser"; // Example icon
import WorkIcon from "@mui/icons-material/Work"; // Icon for Why Choose Us
import StarIcon from "@mui/icons-material/Star"; // Icon for Why Choose Us
import PeopleIcon from "@mui/icons-material/People"; // Icon for Why Choose Us

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <div className="hero-section">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <h1 className="hero-title">Welcome to Project Allocation System</h1>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/login"
            sx={{ mt: 3, fontSize: "1.1rem", padding: "10px 30px" }}
          >
            Get Started
          </Button>
        </motion.div>
      </div>

      {/* About Section */}
      <div className="about-section">
        <h2 className="section-title">About Our System</h2>
        <div className="about-cards">
          <motion.div
            className="about-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <VisionIcon sx={{ fontSize: "3rem", color: "#1976d2", mb: 2 }} />
            <h3>Vision</h3>
            <p>To provide a seamless project allocation experience for students and faculty.</p>
          </motion.div>
          <motion.div
            className="about-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MissionIcon sx={{ fontSize: "3rem", color: "#1976d2", mb: 2 }} />
            <h3>Mission</h3>
            <p>To enhance project management efficiency using advanced technology.</p>
          </motion.div>
          <motion.div
            className="about-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <QualityIcon sx={{ fontSize: "3rem", color: "#1976d2", mb: 2 }} />
            <h3>Quality Policy</h3>
            <p>Committed to ensuring fair, automated, and transparent project distribution.</p>
          </motion.div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="timeline-section">
        <h2 className="section-title">Our Journey</h2>
        <div className="timeline">
          <motion.div
            className="timeline-item"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3>2021</h3>
            <p>Initial concept and research phase. In 2021, we conceptualized the idea of a project allocation system to address the
            challenges faced by students and faculty in managing projects efficiently.</p>
          </motion.div>
          <motion.div
            className="timeline-item"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>2022</h3>
            <p>Prototype development and testing.In 2022, we developed a prototype and conducted extensive testing to ensure the system
            meets the needs of our users.</p>
          </motion.div>
          <motion.div
            className="timeline-item"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3>2023</h3>
            <p>Official launch of the Project Allocation System.In 2023, we officially launched the Project Allocation System, empowering students and
            faculty with a robust platform for project management.</p>
          </motion.div>
        </div>
      </div>

            {/* Why Choose Us Section */}
            <div className="why-choose-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="choose-cards">
          <motion.div
            className="choose-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <WorkIcon sx={{ fontSize: "3rem", color: "#ff9800", mb: 2 }} />
            <h3>Automated Allocation</h3>
            <p>
              AI-driven project assignments ensure optimal distribution based on past academic
              performance and preferences.
            </p>
          </motion.div>
          <motion.div
            className="choose-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <StarIcon sx={{ fontSize: "3rem", color: "#ff9800", mb: 2 }} />
            <h3>Faculty Supervision</h3>
            <p>
              Expert faculty members oversee project assignments, ensuring quality guidance and
              mentorship.
            </p>
          </motion.div>
          <motion.div
            className="choose-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <PeopleIcon sx={{ fontSize: "3rem", color: "#ff9800", mb: 2 }} />
            <h3>Collaborative Learning</h3>
            <p>
              Enables students to find partners with complementary skills, fostering teamwork and
              knowledge sharing.
            </p>
          </motion.div>
        </div>
      </div>


      {/* Statistics Section */}
      <div className="stats-section">
        <h2 className="section-title">Statistics</h2>
        <div className="stats">
          <motion.div
            className="stat-item"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3>100+</h3>
            <p>Projects Allocated</p>
          </motion.div>
          <div className="vertical-divider"></div> {/* Vertical line */}
          <motion.div
            className="stat-item"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>500+</h3>
            <p>Students Benefited</p>
          </motion.div>
          <div className="vertical-divider"></div> {/* Vertical line */}
          <motion.div
            className="stat-item"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3>50+</h3>
            <p>Faculty Members</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;