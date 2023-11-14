import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';
import './App.css';

const DashboardWrapper = () => {
  const { name } = useParams();
  const handleDashboardItemClick = (dashboardItem) => {
    console.log('Dashboard item clicked:', dashboardItem);
  };
  return <Dashboard name={name} onClickDashboardItem={handleDashboardItemClick} />;
};


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard/:name" element={<DashboardWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
