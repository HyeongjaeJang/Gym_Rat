import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { CardContent } from "@mui/material";
import next from "/assets/Icon-Next.svg";
import plus from "/assets/plus.svg";
import "./DayExercises.scss";
import ExerciseAddForm from "../ExerciseAddForm/ExerciseAddForm";
const DayExercises = ({ dayExercise, collapsed, func, day, refresh }) => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleToUpdate = (exercise) => {
    navigate(`/update/${id}`, { state: { exercise: exercise, day: day } });
  };
  return (
    <>
      {dayExercise ? (
        <div
          className="day-container bg-primary-light dark:bg-primary-dark"
          {...(!collapsed ? { onClick: func } : null)}
        >
          {createPortal(
            <ExerciseAddForm
              open={open}
              onClose={() => setOpen(false)}
              day={day}
              refresh={refresh}
            />,
            document.body,
          )}
          <h2 className="day-container__title text-primary-dark dark:text-primary-pupple">
            Selected Workouts
          </h2>
          {dayExercise && (
            <div className="day-container__exercises">
              {dayExercise.length > 0 ? (
                dayExercise.map((exercise) => (
                  <Card
                    key={exercise.name}
                    className="exercises__card border-b-2 border-b-blue-500"
                    sx={{
                      background: "transparent",
                      borderRadius: "0px",
                      margin: "10px",
                      boxShadow: "none",
                    }}
                    onClick={() => handleToUpdate(exercise)}
                  >
                    <CardContent>
                      <img
                        src={exercise.image}
                        className="exercises__img"
                        alt={exercise.name}
                      />
                    </CardContent>
                    <CardActions className="exercise__desc">
                      <Button size="small" className="exercise__title">
                        {exercise.name}
                      </Button>
                      <p className="exercise__amount text-primary-dark dark:text-primary-light">
                        {exercise.sets} Sets {exercise.reps} Reps{" "}
                        {exercise.weight}kg
                      </p>
                    </CardActions>
                    <CardActions>
                      <Button size="small" className="exercise__next">
                        <img src={next} alt="next" />
                      </Button>
                    </CardActions>
                  </Card>
                ))
              ) : (
                <p>No exercises found for this date.</p>
              )}
            </div>
          )}
          <Button
            size="large"
            variant="outlined"
            className="exercise-plus"
            onClick={() => setOpen(true)}
          >
            <img src={plus} alt="plus-img" />
          </Button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default DayExercises;
