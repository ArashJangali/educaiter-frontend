import React, { useEffect, useState, useContext } from 'react';
import HeatMap from 'react-heatmap-grid';
import axios from "../../Api/axiosInstance"
import UserContext from "../../../contexts/UserContext";
import Chart from 'chart.js/auto'
import './HeatMapChart.css'

const HeatMapChart = () => {
    

    const { user, setUser } = useContext(UserContext);

    const userId = user?._id;
    const [data, setData] = useState([]);
    const [xLabels, setXLabels] = useState([]);
    const [yLabels, setYLabels] = useState([]);
    
  useEffect(() => {

    axios.get(`/assessment/${userId}`, {
        withCredentials: true,
      })
      .then(res => {
        const assessments = res?.data;
     
     
        const mapData = {};
        assessments?.forEach(assessment => {
          const date = new Date(assessment.timestamp).toLocaleDateString();
          if(!mapData[date]) {
            mapData[date] = {};
          }
          if(!mapData[date][assessment.topic]) {
            mapData[date][assessment.topic] = { correct: 0, incorrect: 0 };
          }
          assessment.correct ? mapData[date][assessment.topic].correct++ : mapData[date][assessment.topic].incorrect++;
        });
 
      
        const xLabels = Object?.keys(mapData);
        const yLabels = Object?.keys(mapData[xLabels[0]]);
        const data = yLabels?.map(yLabel => xLabels?.map(xLabel => mapData[xLabel][yLabel]?.correct || 0));
  
        setXLabels(xLabels);
        setYLabels(yLabels);
        setData(data);
      })
      .catch(error => console.error(error));
  }, [userId]);

  return (
    <div className="heatmap-chart">

      <div className="chart-container">
        <HeatMap
          xLabels={xLabels}
          xLabelWidth={170}
          yLabels={yLabels}
          xLabelsLocation={"bottom"}
          height={40}
          yLabelWidth={150}
          yLabelTextAlign="left"
          data={data}
          options={{ responsive: true }}
          className="chart"
          background="#329fff"
        />
      </div>
    </div>
  );
};

export default HeatMapChart;
