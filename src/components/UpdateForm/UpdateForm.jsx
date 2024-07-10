import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import useUpdateExercise from "../../utils/hooks/useUpdateExercise";
import useDeleteExercise from "../../utils/hooks/useDeleteExercise";

const UpdateForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const selectedEx = location.state || {};
  const navigate = useNavigate();
  const { updateExercise, updatedExercise, error } = useUpdateExercise();
  const { deleteExercise, deletedExercise } = useDeleteExercise();

  const [exercise, setExercise] = useState({
    name: selectedEx.exercise.name,
    sets: selectedEx.exercise.sets,
    reps: selectedEx.exercise.reps,
    weight: selectedEx.exercise.weight,
    image: selectedEx.exercise.image,
    user_id: id,
    date: selectedEx.day,
    exercise_id: selectedEx.exercise.id,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedExercise = {
      day: exercise.date,
      exercises: [
        {
          id: exercise.exercise_id,
          name: exercise.name,
          sets: exercise.sets,
          reps: exercise.reps,
          weight: exercise.weight,
          image: exercise.image,
        },
      ],
    };
    try {
      await updateExercise(id, formattedExercise);
      navigate(`/home/${id}`);
    } catch (error) {
      console.error("Update exercise failed", error);
    }
  };
  const handleDelete = async () => {
    try {
      await deleteExercise(id, { id: selectedEx.exercise.id });
      navigate(`/home/${id}`);
    } catch (error) {
      console.error("Delete exercise failed", error);
    }
  };

  return (
    <div className="bg-primary-light dark:bg-primary-dark mt-2.5 h-screen">
      <form className="exercise__form" onSubmit={handleSubmit}>
        <img
          src={selectedEx.exercise.image}
          alt="exercise-img"
          className="w-4/5"
        />
        <div>
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            id="name"
            name="name"
            value={exercise.name}
            onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="sets">Sets :</label>
          <input
            type="number"
            id="sets"
            name="sets"
            value={exercise.sets}
            onChange={(e) => setExercise({ ...exercise, sets: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="reps">Reps :</label>
          <input
            type="number"
            id="reps"
            name="reps"
            value={exercise.reps}
            onChange={(e) => setExercise({ ...exercise, reps: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="weight">Weight :</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={exercise.weight}
            onChange={(e) =>
              setExercise({ ...exercise, weight: e.target.value })
            }
          />
        </div>
        <div className="btn-con">
          <button
            type="submit"
            className="bg-primary-blue text-sm text-primary-light dark:text-primary-dark p-3 rounded-md w-100 font-semibold"
          >
            Update
          </button>
          <button
            type="button"
            className="bg-primary-blue text-sm text-primary-light dark:text-primary-dark p-3 rounded-md w-100 font-semibold"
            onClick={() => handleDelete()}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
