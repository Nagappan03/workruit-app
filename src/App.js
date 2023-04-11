import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import CreateJobForm from './components/CreateJobForm';
import JobList from './components/JobList';
import EditJob from './components/EditJob';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="app">
          <div className="main-content">
            <Routes>
              <Route path="/" element={<JobList />} />
              <Route path="/create" element={<CreateJobForm />} />
              <Route path="/edit-job/:id" element={<EditJob />} />
            </Routes>
          </div>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;