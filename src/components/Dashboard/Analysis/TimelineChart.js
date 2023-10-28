import React, { useEffect, useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import axios from "../../Api/axiosInstance"
import UserContext from "../../../contexts/UserContext";
import Chart from 'chart.js/auto'
import 'chartjs-adapter-moment';
import moment from 'moment'
import './TimelineChart.css'

Chart.register({
    id: 'moment',
    _date: moment
});

const TimelineChart = () => {
  const [data, setData] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const [viewOption, setViewOption] = useState('percentage');
  const userId = user?._id

  useEffect(() => {
    // Fetch data from the server
    axios.get(`/assessment/linechart/${userId}`, {
        withCredentials: true,
      })
      .then(response => {
   
        const fetchedData = response?.data;

         // Group data by topic and then by timestamp
        const groupedData = fetchedData.reduce((acc, item) => {
            if (!acc[item.topic]) acc[item.topic] = [];
            acc[item.topic].push(item);
            return acc;
          }, {});



           // Sort data by timestamp within each topic
      Object?.keys(groupedData).forEach(topic => {
        groupedData[topic].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      });


        let chartData;
        if (viewOption === 'percentage') {
            chartData = transformToPercentage(groupedData); // Transform data to percentage view
          } else {
            chartData = transformToCumulative(groupedData); // Transform data to cumulative view
          }
          
    
        setData(chartData);
      })
      .catch(error => console.error(error));
  }, [userId, viewOption]);


//   percentage score

function transformToPercentage(groupedData) {
    const topics = Object.keys(groupedData);

    // Generate the labels (unique sorted dates)
    let allDates = [];
    for (let topic of topics) {
        for (let assessment of groupedData[topic]) {
            allDates.push(new Date(assessment.timestamp).toDateString());
        }
    }
    const uniqueSortedDates = Array.from(new Set(allDates)).sort((a, b) => new Date(a) - new Date(b));

    const datasets = topics.map(topic => {
        // Calculate assessmentsByDate for the current topic
        const assessmentsByDate = groupedData[topic].reduce((acc, assessment) => {
            const date = new Date(assessment.timestamp).toDateString(); 
            if (!acc[date]) acc[date] = [];
            acc[date].push(assessment);
            return acc;
        }, {});

        return {
            label: topic,
            data: uniqueSortedDates.map(date => {
                const assessmentsForDate = assessmentsByDate[date] || [];
                const correctCount = assessmentsForDate.filter(assessment => assessment.correct).length;
                const totalCount = assessmentsForDate.length;
                return totalCount === 0 ? 0 : (correctCount / totalCount) * 100;
            })
        };
    });

    return { labels: uniqueSortedDates, datasets: datasets };
}




// transform data to cumulative score

function transformToCumulative(groupedData) {
    const topics = Object.keys(groupedData);

    // Generate the labels (unique sorted dates)
    let allDates = [];
    for (let topic of topics) {
        for (let assessment of groupedData[topic]) {
            allDates.push(new Date(assessment.timestamp).toDateString());
        }
    }
    const uniqueSortedDates = Array.from(new Set(allDates)).sort((a, b) => new Date(a) - new Date(b));

    const datasets = topics.map(topic => {
        let cumulativeCorrect = 0;

        return {
            label: topic,
            data: uniqueSortedDates.map(date => {
                // Get the assessments for this date, or use an empty array if none exist
                const assessmentsForDate = groupedData[topic].filter(assessment => new Date(assessment.timestamp).toDateString() === date);
                
                for (let assessment of assessmentsForDate) {
                    if (assessment.correct) {
                        cumulativeCorrect += 1;
                    }
                }
                return cumulativeCorrect;
            })
        };
    });

    return { labels: uniqueSortedDates, datasets: datasets };
}


    const animation = {
        duration: 2000, // duration of animation in milliseconds
        easing: 'easeInOutQuart', // easing function to use
        onProgress: function(animation) {
            // Logic that runs during animation
        },
        onComplete: function(animation) {
            // Logic that runs after animation completes
        }
    };

  const handleOptionChange = (event) => {
    setViewOption(event.target.value);
  };

const options = {
    responsive: true,
    animation: animation,
    intersection: {
        intersect: false
    },
    scales: {
        x: {
            type: 'time', 
            time: {
                unit: 'day',
            }
        },
        y: {
            beginAtZero: true,
            max: viewOption === 'percentage' ? 100 : undefined
            // ticks: {
            //   // You can customize the ticks, e.g., steps, min, max, etc.
            // }
    }
    
}
}

return data ? (
    <div className="linechart">
     
      <select className="select" value={viewOption} onChange={handleOptionChange}>
        <option value='percentage'>Percentage Correct</option>
        <option value='cumulative'>Cumulative Score</option>
      </select>
      <div className="chart-container">
        <div className="chart">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
) : null;
};

export default TimelineChart;
