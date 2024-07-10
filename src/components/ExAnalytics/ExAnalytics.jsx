import React, { useState, useEffect } from "react";
import avatar from "/assets/boy_shape-removebg-preview 1.svg";
import "./ExAnalytics.scss";
import { LineChart } from "@mui/x-charts/LineChart";
import useWeekWorkouts from "../../utils/hooks/useWeekWorkingouts";

const ExAnalytics = ({ id, collapsed, func }) => {
  const { workouts, error } = useWeekWorkouts(id);
  const [prevWeek, setPrevWeek] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [currentWeek, setCurrentWeek] = useState([0, 0, 0, 0, 0, 0, 0]);
  const daysMap = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    if (workouts) {
      const newPrevWeek = [0, 0, 0, 0, 0, 0, 0];
      const newCurrentWeek = [0, 0, 0, 0, 0, 0, 0];

      workouts.previousWeekData.forEach((week) => {
        week.days.forEach((day) => {
          const date = new Date(day.day);
          const dayIndex = date.getDay();

          day.exercises.forEach((exercise) => {
            const total = exercise.sets * exercise.reps * exercise.weight;
            if (!isNaN(total)) {
              newPrevWeek[dayIndex] += total;
            }
          });
        });
      });

      workouts.currentWeekData.forEach((week) => {
        week.days.forEach((day) => {
          const date = new Date(day.day);
          const dayIndex = date.getDay();

          day.exercises.forEach((exercise) => {
            const total = exercise.sets * exercise.reps * exercise.weight;
            if (!isNaN(total)) {
              newCurrentWeek[dayIndex] += total;
            }
          });
        });
      });

      setPrevWeek(newPrevWeek);
      setCurrentWeek(newCurrentWeek);
    }
  }, [workouts]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!workouts) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="analytics-con bg-primary-light dark:bg-purple-500"
      {...(!collapsed ? { onClick: func } : null)}
    >
      <div className="analytics-con__flex">
        <img src={avatar} alt="avatar" className="analytics-con__avatar" />
        <LineChart
          width={350}
          height={200}
          series={[
            {
              type: "line",
              data: currentWeek,
              label: "Current Week",
            },
            {
              type: "line",
              data: prevWeek,
              label: "Previous Week",
            },
          ]}
          xAxis={[{ scaleType: "point", data: daysMap }]}
        />
      </div>
    </div>
  );
};

export default ExAnalytics;
