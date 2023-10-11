import React, { useEffect, useState, useContext } from "react";
import Analysis from "./Analysis/Analysis";
import Sidebar from "../Sidebar/Sidebar";
import UserContext from "../../contexts/UserContext";
// import RecentActivity from './RecentActivity';
// import ProgressOverview from './ProgressOverview';
import "./Dashboard.css";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(UserContext);
  const userId = user?._id;

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Analysis userId={userId} />
      </div>
    </div>
  );
};

export default Dashboard;
