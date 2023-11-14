import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

const Chart = ({ chartId, containerStyle, onClick }) => {
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('line');

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/chart/${chartId}`);
        setChartData(response.data.analytics);
        setChartType(response.data.chartType);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, [chartId]);

  if (!chartData || chartData.length === 0) {
    return <div>Loading...</div>;
  }

  let ChartComponent;
  switch (chartType) {
    case 'line':
      ChartComponent = (
        <LineChart data={chartData}>
          <XAxis dataKey="game_name" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="hours_played" stroke="#8884d8" />
          <Legend />
        </LineChart>
      );
      break;
    case 'bar':
      ChartComponent = (
        <BarChart data={chartData}>
          <XAxis dataKey="game_name" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="hours_played" fill="#8884d8" />
          <Bar dataKey="proficiency" fill="#82ca9d" />
          <Legend />
        </BarChart>
      );
      break;
    default:
      ChartComponent = <div>Unsupported chart type.</div>;
  }

  return (
    <div style={containerStyle} onClick={onClick}>
      <ResponsiveContainer width="100%" height={300}>
        {ChartComponent}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
