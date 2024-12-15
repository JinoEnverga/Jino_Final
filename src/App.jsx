import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register'; // Ensure this matches the actual file name
import Shopping from './Shopping';

function App() {
  return (
    <>
      <Router>
        <Row>
          <Col md={12}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} /> {/* Add this route */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/shopping" element={<Shopping />} />
            </Routes>
          </Col>
        </Row>
      </Router>
    </>
  );
}

export default App;