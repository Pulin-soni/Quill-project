import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from './Chart';
import './Dashboard.css';
import { Modal } from 'react-bootstrap';

const Dashboard = ({ name, onClickDashboardItem, containerStyle }) => {
  const [charts, setCharts] = useState([]);
  const [selectedChart, setSelectedChart] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/dashboard/${name}`);
        setCharts(response.data.charts || []);
        console.log(response)
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    if (name) {
      fetchCharts();
    }
  }, [name]);

  const handleChartClick = (chart) => {
    setSelectedChart(chart);
    setShowModal(true);
    onClickDashboardItem();
  };

  const handleCloseModal = () => setShowModal(false);


  return (
    <div className="container mt-4">
      <header className="mb-4">
        <h1 className="chart-title">{name}</h1>
      </header>
      <section className="row">
        {charts.map((chartItem) => (
          <div className="col-lg-6 col-md-6 mb-4" onClick={() => handleChartClick(chartItem)}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <Chart
                  chartId={chartItem.id}
                  containerStyle={containerStyle}
                />
              </div>
            </div>
          </div>
        ))}
      </section>
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedChart?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedChart && <Chart chartId={selectedChart.id} />}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Dashboard;