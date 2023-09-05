import React from 'react';
import BarChart from './BarChart';
import HeatMapChart from './HeatMapChart';
import TimelineChart from './TimelineChart';
import './analysis.css'

const Analysis = ({ userId }) => {
  return (
    <div className='analysis'>

      <BarChart userId={userId} />
      {/* <h2>Progress</h2>*/}
      <TimelineChart userId={userId} />
      
      <HeatMapChart userId={userId} />
    </div>
  );
};

export default Analysis;
