import { useEffect, useState } from "react";
import api from "../api/api.js";

function useEveryExercises(diff, part) {
  const [exercises, setExercises] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExercises(diff, part);
  }, [diff, part]);

  const fetchExercises = async (diff, part) => {
    try {
      const response = await api.getEveryWorkouts(diff, part);
      setExercises(response);
    } catch (error) {
      setError(error);
    }
  };

  return { exercises, error };
}

export default useEveryExercises;
