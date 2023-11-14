import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [dashboards, setDashboards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of dashboards from the server
    const fetchDashboards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/dashboard_list');
        setDashboards(response.data);
      } catch (error) {
        console.error("Error fetching dashboards:", error);
      }
    };

    fetchDashboards();
  }, []);

  const navigateToDashboard = (dashboardName) => {
    // Navigate to the dashboard
    navigate(`/dashboard/${dashboardName}`);
  };

  return (
    <div className="landing-page">
      <Container>
        <Row className="justify-content-md-center text-center">
          <Col md={12}>
            <h1 className="landing-title">Quill E-sports</h1>
          </Col>
        </Row>
        <Row className="mt-4 justify-content-md-center">
          {dashboards.map((dashboard) => (
            <Col key={dashboard.id} md={4} className="mb-3">
              <Card onClick={() => navigateToDashboard(dashboard.name)} className="bg-transparent">
                <Card.Body>
                  <Card.Title>{dashboard.name}</Card.Title>
                  <Card.Text>
                    {dashboard.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
