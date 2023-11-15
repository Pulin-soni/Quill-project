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

const LineChartComponent = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="game_name" />
        <YAxis />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <Line type="monotone" dataKey="hours_played" stroke="#8884d8" />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );

const BarChartComponent = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="game_name" />
      <YAxis />
      <Tooltip />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="hours_played" fill="#8884d8" />
      <Bar dataKey="proficiency" fill="#82ca9d" />
      <Legend />
    </BarChart>
  </ResponsiveContainer>
);

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
  
  return (
    <div style={containerStyle} onClick={onClick}>
        {chartType === 'line' ? (
          <LineChartComponent data={chartData} />
        ) : chartType === 'bar' ? (
          <BarChartComponent data={chartData} />
        ) : (
          <div>Unsupported chart type.</div>
        )}
    </div>
  );
};

export default Chart;
