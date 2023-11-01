import React, { useEffect, useState, useContext } from 'react';
import { Bar } from "react-chartjs-2";
import axios from "../../Api/axiosInstance"
import UserContext from "../../../contexts/UserContext";
import "./BarChart.css";



const BarChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });
    const {user, setUser} = useContext(UserContext)
    const userId = user?._id

    const prepareChartData = (data) => {
       const chartData = {
        labels: [],
        datasets: []
       }

       const uniqueTopics = [...new Set(data?.map(data => data.topic))]
       const uniqueLanguages = [...new Set(data?.map(data => data.language))]
       const uniqueLevels = [...new Set(data?.map(data => data.level))]

       console.log('Unique Topics:', uniqueTopics);
console.log('Unique Languages:', uniqueLanguages);
console.log('Unique Levels:', uniqueLevels);


       chartData.labels = uniqueTopics;

       uniqueLanguages?.forEach(language => {
        uniqueLevels?.forEach(level => {
            const dataset = {
                label: `${language} (${level})`,
                data: [],
            }

            uniqueTopics?.forEach(topic => {
                const item = data?.find(r => r.topic === topic && r.language === language && r.level === level)
                dataset.data.push(item ? item.percentageCorrect : 0)
            })
            chartData.datasets.push(dataset);
        })

       })

       return chartData
    }
    console.log('Final Chart Data:', chartData);

    const fetchAggregatedData = async(userId) => {
        try {
            const response = await axios.get(`/assessment/${userId}`, {
                withCredentials: true
              })
              console.log('Fetched Data:', response.data);
              return await response.data
        } catch(error) {
            console.error('Error fetching data:', error);
            return [];
        }
        
    }

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                const data = await fetchAggregatedData(userId)
                console.log('Data to be processed:', data);
            setChartData(prepareChartData(data))
            }
        }
        fetchData()
      
    }, [userId])


    const options = {
        responsive: true,
        scales: {
            x: {
                stacked:true,
                ticks: {
                    display: false
                }
            },
            y: {
                stacked: true,
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: function (value) {
                        return value + "%"
                    },
                    stepSize: 10
                },
                grid: {
                    display: false
                },
            },
        },
        plugins: {
            legend: {
                display: false,
               
               
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.dataset.label + ": " + context.parsed.y + "%"
                    },
                },
            },
        },
        animation: {
            duration: 1000,
            delay: 500,
            easing: "easeOutBounce",
        },
    }


    return (
      <div className="bar-chart">
        <h2 className="chart-title"></h2>
        <div className="chart-container">
          <Bar
            data={chartData}
            className="chart"
            options={options}
          />
        </div>
      </div>
    );
}

export default BarChart