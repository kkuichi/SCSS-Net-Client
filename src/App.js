import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AboutComponent from './components/AboutComponent';
import APIDocumentation from './components/ApiDocumentation';
import UserManualComponent from './components/UserManualComponent';
import DemonstratorComponent from './components/DemonstratorComponent';


function App() {
  return (
    <Router>
      <div style={styles.container}>
        <nav style={styles.nav}>
          <ul style={styles.navList}>
            <li style={styles.navItem}>
              <Link to="/" style={styles.navLink}>SCSS-Net Demonstrator</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/about" style={styles.navLink}>About</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/api" style={styles.navLink}>API</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/manual" style={styles.navLink}>User Manual</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<DemonstratorComponent />} />
          <Route path="/about" element={<AboutComponent />} />
          <Route path="/api" element={<APIDocumentation />} />
          <Route path="/manual" element={<UserManualComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  nav: {
    backgroundColor: '#1B3A6F',
    padding: '1rem 0',
    marginBottom: '20px',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 15px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
};

export default App;