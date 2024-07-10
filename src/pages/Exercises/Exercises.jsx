import React, { useState } from "react";
import Header from "../../components/Header/Header";
import "./Exercises.scss";
import ExercisesList from "../../components/ExercisesList/ExercisesList";

const Exercises = () => {
  const [collapsed, setCollapsed] = useState(true);
  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Header collapsed={collapsed} func={handleCollapsedChange} />
      <ExercisesList collapsed={collapsed} func={handleCollapsedChange} />
    </>
  );
};

export default Exercises;
