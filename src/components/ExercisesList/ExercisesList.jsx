import React, { useState } from "react";
import { createPortal } from "react-dom";
import useEveryExercises from "../../utils/hooks/useEveryExercises.js";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { CardContent } from "@mui/material";
import next from "/assets/Icon-Next.svg";
import ExerciseDetail from "../ExerciseDetail/ExerciseDetail.jsx";

const ExercisesList = ({ collapsed, func }) => {
  const [open, setOpen] = useState(false);
  const difficulty = ["beginner", "intermediate", "expert"];
  const parts1 = ["Abdominals", "Chest", "Biceps", "Triceps"];
  const parts2 = ["Lats", "Quadriceps", "Hamstrings"];
  const [diff, setDiff] = useState("");
  const [part, setPart] = useState("");
  const { exercises, error } = useEveryExercises(diff, part);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const handleDiffChange = (value) => {
    setDiff((prev) => (prev === value ? "" : value));
  };

  const handlePartChange = (value) => {
    setPart((prev) => (prev === value ? "" : value));
  };

  const selectExercise = (exercise) => {
    setSelectedExercise(exercise);
    setOpen(true);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!exercises || exercises.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="work-container bg-primary-light dark:bg-primary-dark"
      {...(!collapsed ? { onClick: func } : null)}
    >
      {createPortal(
        <ExerciseDetail
          exercise={selectedExercise}
          open={open}
          onClose={() => setOpen(false)}
        />,
        document.body,
      )}
      <div className="content">
        <section className="work-main">
          <h2 className="work-main__title text-primary-dark dark:text-primary-pupple">
            Workout based on Level
          </h2>
          <div className="work-main__cards">
            {difficulty.map((diffLevel) => (
              <Card
                key={diffLevel}
                className="card"
                sx={{
                  borderRadius: "10px",
                  background: "#dbeafe",
                }}
              >
                <CardActions>
                  <Button
                    size="small"
                    value={diffLevel}
                    onClick={() => handleDiffChange(diffLevel)}
                    style={{
                      fontWeight: diff === diffLevel ? "bold" : "normal",
                    }}
                  >
                    {diffLevel}
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
          <h3 className="work-main__sub-title">Exercises</h3>
          <div className="work-main__parts-btn">
            <ButtonGroup
              variant="outlined"
              size="small"
              aria-label="neutral button group"
              sx={{ marginY: "5px" }}
            >
              {parts1.map((partName) => (
                <Button
                  key={partName}
                  value={partName}
                  onClick={() => handlePartChange(partName)}
                  style={{
                    fontWeight: part === partName ? "bold" : "normal",
                  }}
                >
                  {partName}
                </Button>
              ))}
              ,
            </ButtonGroup>
            <ButtonGroup
              variant="outlined"
              size="small"
              aria-label="neutral button group"
            >
              {parts2.map((partName) => (
                <Button
                  key={partName}
                  value={partName}
                  onClick={() => handlePartChange(partName)}
                  style={{
                    fontWeight: part === partName ? "bold" : "normal",
                  }}
                >
                  {partName}
                </Button>
              ))}
              ,
            </ButtonGroup>
          </div>
        </section>

        <section className="work-main__exercises">
          {Array.isArray(exercises.exercise) && exercises.exercise ? (
            exercises.exercise.map((exercise) => (
              <div
                key={exercise.part || exercise.name}
                className="exercises__part"
              >
                {exercise.part && (
                  <p className="exercises__part-title">{exercise.part}</p>
                )}
                {Array.isArray(exercise.children) &&
                exercise.children.length > 0 ? (
                  exercise.children.map((child) => (
                    <Card
                      key={child.name}
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
                          src={child.images}
                          className="exercises__img"
                          alt={child.name}
                        />
                      </CardContent>
                      <CardActions>
                        <Button size="small" className="exercise__title">
                          {child.name}
                        </Button>
                      </CardActions>
                      <CardActions>
                        <Button size="small" className="exercise__desc">
                          <img
                            src={next}
                            alt="next"
                            onClick={() => selectExercise(child)}
                          />
                        </Button>
                      </CardActions>
                    </Card>
                  ))
                ) : (
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
                    <CardActions>
                      <Button size="small" className="exercise__title">
                        {exercise.name}
                      </Button>
                    </CardActions>
                    <CardActions>
                      <Button size="small" className="exercise__desc">
                        <img
                          src={next}
                          alt="next"
                          onClick={() => selectExercise(exercise)}
                        />
                      </Button>
                    </CardActions>
                  </Card>
                )}
              </div>
            ))
          ) : Array.isArray(exercises) && exercises.length > 0 ? (
            exercises.map((exercise) => (
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
                <CardActions>
                  <Button size="small" className="exercise__title">
                    {exercise.name}
                  </Button>
                </CardActions>
                <CardActions>
                  <Button size="small" className="exercise__desc">
                    <img
                      src={next}
                      alt="next"
                      onClick={() => selectExercise(exercise)}
                    />
                  </Button>
                </CardActions>
              </Card>
            ))
          ) : (
            <p>No exercises available.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ExercisesList;
