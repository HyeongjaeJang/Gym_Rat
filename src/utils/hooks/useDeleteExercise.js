import { useState } from "react";
import api from "../api/api.js";

function useDeleteExercise() {
  const [deletedExercise, setDeletedExercise] = useState(null);
  const [error, setError] = useState(null);
  const deleteExercise = async (id, data) => {
    try {
      const response = await api.deleteWorkout(id, data);
      setDeletedExercise(response);
    } catch (error) {
      setError(error);
    }
  };
  return { deleteExercise, deletedExercise, error };
}

export default useDeleteExercise;
