import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import "./SidebarCom.scss";
import logo from "/assets/logo.svg";
import home from "/assets/home.svg";
import exercise from "/assets/exercise.svg";
import analytics from "/assets/u_analysis.svg";
import profile from "/assets/profile.svg";

const SidebarCom = ({ collapsed, func }) => {
  const navigate = useNavigate();
  const id = sessionStorage.getItem("user");
  const handleToExercise = () => {
    navigate(`/exercise`, { replace: true });
  };

  return (
    <div className={`sidebar-container ${collapsed ? "collapsed" : ""}`}>
      <Sidebar
        collapsed={collapsed}
        width="180px"
        className="custom-sidebar bg-primary-light dark:bg-indigo-600"
      >
        <div className="sidebar__header">
          <img src={logo} alt="logo" className="sidebar-logo" onClick={func} />
          <p className="sidebar-title">Gym Rat</p>
        </div>
        <Menu iconShape="square">
          <MenuItem
            icon={<img src={home} alt="home" className="icon" />}
            className="text-sm font-sans dark:text-black"
            onClick={() => navigate(`/home/${id}`)}
          >
            Home
          </MenuItem>
          <MenuItem
            icon={<img src={exercise} alt="exercise" className="icon" />}
            className="text-sm font-sans dark:text-black"
            onClick={handleToExercise}
          >
            Workout
          </MenuItem>
          <MenuItem
            icon={<img src={analytics} alt="analytics" className="icon" />}
            className="text-sm font-sans dark:text-black"
            onClick={() => navigate(`/analytics/${id}`)}
          >
            Analytics
          </MenuItem>
          <MenuItem
            icon={<img src={profile} alt="profile" className="icon" />}
            className="text-sm font-sans dark:text-black"
            onClick={() => navigate(`/profile/${id}`)}
          >
            Profile
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarCom;
