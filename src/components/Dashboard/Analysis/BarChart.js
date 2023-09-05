import React, { useEffect, useState, useContext } from 'react';
import { Bar } from "react-chartjs-2";
import axios from "../../Api/axiosInstance"
import UserContext from "../../../contexts/UserContext";
import Chart from 'chart.js/auto'
import "./BarChart.css";



const BarChart = () => {
    const [data, setData] = useState({ labels: [], datasets: [] });
    const {user, setUser} = useContext(UserContext)
    const userId = user?._id


    useEffect(() => {
        axios.get(`/assessment/${userId}`, {
            withCredentials: true
          })
        .then(res => {
            const assessments = res?.data;
           
            const grouped = assessments?.reduce((acc, assessment) => {
                const key = assessment?.topic;
                if (!acc[key]) {
                    acc[key] = { correct: 0, incorrect: 0 }
                }
                if (assessment?.correct) {
                    acc[key].correct++
                } else {
                    acc[key].incorrect++
                }
                return acc
            }, {})
          if (grouped) {
            const labels = Object?.keys(grouped);
            const correctData = labels?.map(label => grouped[label]?.correct || 0);
            const incorrectData = labels?.map(label => grouped[label]?.incorrect || 0);
      
            setData({
                labels,
                datasets: [
                    {
                        label: 'Correct',
                        data: correctData,
                        backgroundColor: 'rgba(0, 255, 0, 1)',
                        borderColor: 'rgba(0, 255, 0, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Incorrect',
                        data: incorrectData,
                        backgroundColor: 'rgba(255, 0, 0, 1)',
                        borderColor: 'rgba(255, 0, 0, 1)',
                        borderWidth: 1
                    }
                ]
            })
            
        }

        })
        
        .catch(error => console.error('error', error))
    }, [userId])



    return (
        <div className="bar-chart">
          <h2 className="chart-title">Progress</h2>
          <div className="chart-container">
            <Bar data={data} className="chart" options={{ responsive: true, borderRadius: 5, animation: {
                duration: 1000,
                delay:500,
                easing: 'easeOutBounce',
            } }} />
          </div>
        </div>
      );
}

export default BarChart