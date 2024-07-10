import React, { useState } from "react";
import Header from "../../components/Header/Header";
import DayExercises from "../../components/DayExercises/DayExercises";
import "./Day.scss";
import { useParams, useLocation } from "react-router-dom";
import useDayExercise from "../../utils/hooks/useDayExercise";
import moment from "moment";

const Day = () => {
  const [collapsed, setCollapsed] = useState(true);
  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };
  const location = useLocation();
  const { id } = useParams();
  const { selectedDate } = location.state || {};
  const formattedDate = selectedDate
    ? moment(selectedDate).format("YYYY-MM-DD")
    : "No date selected";

  const { dayExercise, error, refreshDayExercise } = useDayExercise(
    id,
    formattedDate,
  );

  const handleRefresh = () => {
    refreshDayExercise();
  };
  if (error) return <div>{error}</div>;

  return (
    <>
      <Header
        collapsed={collapsed}
        func={handleCollapsedChange}
        day={formattedDate}
      />
      <DayExercises
        dayExercise={dayExercise}
        collapsed={collapsed}
        func={handleCollapsedChange}
        day={formattedDate}
        refresh={handleRefresh}
      />
    </>
  );
};

export default Day;
