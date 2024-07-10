import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useEveryExercises from "../../utils/hooks/useEveryExercises.js";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { CardContent, Button } from "@mui/material";
import "./ExerciseAddForm.scss";
import useAddExercise from "../../utils/hooks/useAddExercise";

const ExerciseAddForm = ({ open, onClose, day, refresh }) => {
  const { id } = useParams();
  const parts = [
    "Abdominals",
    "Chest",
    "Biceps",
    "Triceps",
    "Lats",
    "Quadriceps",
    "Hamstrings",
  ];
  const getWeekStartEnd = (date) => {
    const current = new Date(date);
    const dayOfWeek = current.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const weekStart = new Date(current);
    weekStart.setDate(current.getDate() + diffToMonday);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 5);
    weekEnd.setHours(23, 59, 59, 999);

    const formatDate = (date) => date.toISOString().split("T")[0];

    return {
      week_start: formatDate(weekStart),
      week_end: formatDate(weekEnd),
    };
  };
  const [part, setPart] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [exercise, setExercise] = useState({
    name: "",
    sets: "",
    reps: "",
    weight: "",
    image: "",
    week_start: "",
    week_end: "",
    user_id: id,
    date: day,
  });
  const { exercises, error } = useEveryExercises("", part);
  const { addExercise, dayExercise, addError } = useAddExercise();

  const handlePartChange = (value) => {
    setPart("");
    setFormOpen(true);
    const { week_start, week_end } = getWeekStartEnd(day);
    setExercise({
      ...exercise,
      name: value.name,
      image: value.images,
      week_start: week_start,
      week_end: week_end,
    });
  };
  const handleResetForm = () => {
    setExercise({
      name: "",
      sets: "",
      reps: "",
      weight: "",
      image: "",
      user_id: id,
      date: day,
    });
    setFormOpen(false);
    onClose();
  };
  const handleAddExercise = async (e) => {
    e.preventDefault();
    if (
      !exercise.name ||
      !exercise.sets ||
      !exercise.reps ||
      !exercise.weight
    ) {
      return;
    }
    const formattedExercise = {
      week_start: exercise.week_start,
      week_end: exercise.week_end,
      user_id: exercise.user_id,
      date: {
        day: exercise.date,
      },
      exercises: [
        {
          name: exercise.name,
          sets: parseInt(exercise.sets),
          reps: parseInt(exercise.reps),
          weight: parseInt(exercise.weight),
          image: exercise.image,
        },
      ],
    };
    try {
      await addExercise(id, formattedExercise);
      refresh();
      setFormOpen(false);
      onClose();
    } catch (error) {
      console.error("Add exercise failed", error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!open) return null;
  return (
    <div
      className="overlay bg-gray-50 bg-opacity-50 dark:bg-opacity-10"
      data-aos="fade-down"
    >
      <div className="add-form bg-primary-light dark:bg-primary-dark">
        <div className="dropdown dropdown-hover w-full">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 bg-primary-blue text-primary-light dark:text-primary-dark rounded-md w-100"
          >
            Part
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-primary-light rounded-box z-[1] w-100 p-2 shadow"
            onClick={() => setFormOpen(false)}
          >
            {parts.map((partName) => (
              <li
                key={partName}
                onClick={() => {
                  setPart(partName);
                }}
                className="menu-item my-2"
              >
                {partName}
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleResetForm()}
            className="ml-5 bg-primary-blue text-sm text-primary-light dark:text-primary-dark p-3 rounded-md w-100 font-semibold"
          >
            Close
          </button>

          {!exercises
            ? null
            : exercises.exercise
              ? null
              : exercises.map((exercise) => (
                  <Card
                    key={exercise.name}
                    className="exercises__card border-b-2 border-b-blue-500"
                    sx={{
                      background: "transparent",
                      borderRadius: "0px",
                      margin: "10px",
                      boxShadow: "none",
                    }}
                  >
                    <CardContent>
                      <img
                        src={exercise.images}
                        className="exercises__img"
                        alt={exercise.name}
                      />
                    </CardContent>
                    <CardActions className="exercise__desc">
                      <Button
                        size="small"
                        className="exercise__title"
                        onClick={() => handlePartChange(exercise)}
                      >
                        {exercise.name}
                      </Button>
                    </CardActions>
                  </Card>
                ))}
        </div>
        {formOpen && (
          <form className="exercise__form" type="submit">
            <img src={exercise.image} alt="exercise-img" className="w-full" />
            <div>
              <label htmlFor="name">Name :</label>
              <input
                type="text"
                id="name"
                name="name"
                value={exercise.name}
                onChange={(e) =>
                  setExercise({ ...exercise, name: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="sets">Sets :</label>
              <input
                type="number"
                id="sets"
                name="sets"
                value={exercise.sets}
                onChange={(e) =>
                  setExercise({ ...exercise, sets: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="reps">Reps :</label>
              <input
                type="number"
                id="reps"
                name="reps"
                value={exercise.reps}
                onChange={(e) =>
                  setExercise({ ...exercise, reps: e.target.value })
                }
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
            <div>
              <button
                onClick={handleAddExercise}
                className="bg-primary-blue text-sm text-primary-light dark:text-primary-dark p-3 rounded-md w-100 font-semibold"
              >
                Add
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ExerciseAddForm;
