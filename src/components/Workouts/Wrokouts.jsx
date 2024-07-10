import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import arrow from "/assets/Vector.svg";
import calendar from "/assets/calendar.svg";

import useWeekWorkouts from "../../utils/hooks/useWeekWorkingouts";

const Workouts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workouts, error } = useWeekWorkouts(id);
  const handleToExercise = (exercise, day) => {
    navigate(
      `/update/${id}`,
      { state: { exercise: exercise, day: day } },
      { replace: true },
    );
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {workouts &&
        workouts.currentWeekData.map((week) => (
          <div key={week.week_id} className="main__workouts">
            <h3 className="main__workouts-title">
              Workouts for Week {week.week_id}
            </h3>
            {week.days.map((day) => (
              <div key={day.date_id} className="main__workouts-day">
                <h4 className="main__workouts-day-title">
                  Workout for {day.day}
                </h4>
                {day.exercises.map((exercise) => (
                  <div
                    key={exercise.exercise_id}
                    className="card bg-secondary-blue dark:bg-indigo-300"
                    onClick={() => handleToExercise(exercise, day.day)}
                  >
                    <div className="card-body">
                      <div className="card-body__con">
                        <img
                          src={calendar}
                          alt="calendar-logo"
                          className="work-logo"
                        />
                        <p className="work-name font-sans">{exercise.name}</p>
                      </div>
                      <div className="card-body__con">
                        <p className="work-info font-sans">
                          {exercise.sets} sets x {exercise.reps} reps
                        </p>
                        <p className="work-info font-sans">
                          {exercise.weight} kg
                        </p>
                        <img src={arrow} alt="arrow" className="work-arrow" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
    </>
  );
};

export default Workouts;
