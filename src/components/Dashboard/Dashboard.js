import React, { useEffect, useState, useContext } from 'react';
import Analysis from './Analysis/Analysis';
import UserContext from "../../contexts/UserContext";
// import RecentActivity from './RecentActivity';
// import ProgressOverview from './ProgressOverview';
import "./Dashboard.css";

const Dashboard = () => {

    const {user, setUser} = useContext(UserContext)
    const {token, setToken} = useContext(UserContext)
    const userId = user?._id

  return (
    <div className='dashboard'>

      <div className="dashboard-content">
        <div className="dashboard-panel">
          <Analysis userId={userId} />
        </div>
        {/* <div className="dashboard-panel">
          <RecentActivity userId={userId} />
        </div>
        <div className="dashboard-panel">
          <ProgressOverview userId={userId} />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
