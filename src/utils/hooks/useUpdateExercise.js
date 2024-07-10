import { useState } from "react";
import api from "../api/api.js";

function useUpdateExercise() {
  const [updatedExercise, setUpdatedExercise] = useState(null);
  const [error, setError] = useState(null);
  const updateExercise = async (id, data) => {
    try {
      const response = await api.updateWorkout(id, data);
      setUpdatedExercise(response);
    } catch (error) {
      setError(error);
    }
  };
  return { updateExercise, updatedExercise, error };
}

export default useUpdateExercise;
