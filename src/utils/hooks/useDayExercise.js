import { useEffect, useState } from "react";
import api from "../api/api.js";

function useDayExercise(id, day) {
  const [dayExercise, setDayExercise] = useState(null);
  const [error, setError] = useState(null);

  const fetchDayExercise = async (id, day) => {
    try {
      const response = await api.getDayWorkouts(id, day);
      setDayExercise(response);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchDayExercise(id, day);
  }, [id, day]);

  const refreshDayExercise = () => {
    fetchDayExercise(id, day);
  };

  return { dayExercise, error, refreshDayExercise };
}

export default useDayExercise;
