import api from "../api/api.js";
import { useState, useEffect } from "react";

function useWeekWorkouts(id) {
  const [workouts, setWorkouts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkouts(id);
  }, [id]);

  const fetchWorkouts = async (id) => {
    try {
      const data = await api.getWorkouts(id);
      setWorkouts(data);
    } catch (error) {
      setError(error);
    }
  };

  return { workouts, error };
}

export default useWeekWorkouts;
