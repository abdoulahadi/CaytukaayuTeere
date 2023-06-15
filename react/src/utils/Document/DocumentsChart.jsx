import axiosClient from '../../../axios-client';
import  { useEffect, useState } from 'react';
import {   XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, ResponsiveContainer } from 'recharts';

const DocumentsChart = () => {
  const [documentsStats, setDocumentsStats] = useState([]);

  useEffect(() => {
    fetchDocumentsStats()
  }, []);
  const fetchDocumentsStats = async () => {
    try {
      const response = await axiosClient.get('/document-stats');
      setDocumentsStats(response.data);
    } catch (error) {
      console.error('Error fetching documents stats:', error);
    }
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
    <AreaChart width={600} height={400} data={documentsStats}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="count" stroke="#0a6b31" fill='#0a6b31' activeDot={{ r: 8 }} />
    </AreaChart>
    </ResponsiveContainer>
  );
};

export default DocumentsChart;
