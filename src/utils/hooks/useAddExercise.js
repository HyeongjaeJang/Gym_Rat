import { useState } from "react";
import api from "../api/api.js";

function useAddExercise() {
  const [dayExercise, setDayExercise] = useState(null);
  const [addError, setAddError] = useState(null);

  const addExercise = async (id, data) => {
    try {
      const response = await api.addWorkout(id, data);
      setDayExercise(response);
    } catch (error) {
      setAddError(error);
    }
  };

  return { addExercise, dayExercise, addError };
}

export default useAddExercise;
