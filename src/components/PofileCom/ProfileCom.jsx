import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./ProfileCom.scss";
import logo from "/assets/logo.svg";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { CardContent } from "@mui/material";
import Button from "@mui/material/Button";
import EditPortal from "../EditPortal/EditPortal";
import EditWeight from "../EditWeight/EditWeight";
import bmi from "bmi-generator";

const ProfileCom = ({ user }) => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [open, setOpen] = useState(false);
  const [editWeight, setEditWeight] = useState(false);

  const calculateBMI = (weight, height) => {
    if (height > 0 && weight > 0) {
      return bmi.getBMI(weight, height / 100).toFixed(2);
    }
    return null;
  };

  const calculateBMIState = (weight, height) => {
    const bmiValue = calculateBMI(weight, height);
    if (bmiValue) {
      if (bmiValue >= 25) {
        return "Over Weight";
      } else {
        return "Normal";
      }
    }
    return null;
  };

  const getClassForBMIState = (bmiState) => {
    if (bmiState === "Over Weight") {
      return "text-red";
    } else {
      return "text-primary-blue";
    }
  };

  return (
    user && (
      <div className="profile-con bg-primary-light dark:bg-primary-dark">
        {createPortal(
          <EditPortal
            open={open}
            onClose={() => setOpen(false)}
            height={height}
            setHeight={setHeight}
          />,
          document.body,
        )}
        {createPortal(
          <EditWeight
            open={editWeight}
            onClose={() => setEditWeight(false)}
            weight={weight}
            setWeight={setWeight}
          />,
          document.body,
        )}
        <img
          src={logo}
          alt="user-img"
          className="profile-con__img bg-primary-dark dark:bg-primary-light"
        />
        <h3 className="profile-con__name text-primary-dark dark:text-primary-light">
          {user.name}
        </h3>
        <div className="profile-con__wrap">
          <Card
            className="card"
            sx={{
              borderRadius: "10px",
              background: "#dbeafe",
            }}
            onClick={() => setOpen(true)}
          >
            <CardActions>
              <Button size="small" style={{ padding: "0px" }}>
                {height}cm
              </Button>
            </CardActions>
          </Card>
          <Card
            className="card"
            sx={{
              borderRadius: "10px",
              background: "#dbeafe",
            }}
            onClick={() => setEditWeight(true)}
          >
            <CardActions>
              <Button size="small" style={{ padding: "0px" }}>
                {weight}kg
              </Button>
            </CardActions>
          </Card>
        </div>
        <Card
          className="card "
          sx={{
            borderRadius: "10px",
            background: "#dbeafe",
          }}
        >
          <CardContent>
            <p className="text-primary-pupple">BMI Score</p>
            {height > 0 && weight > 0 && (
              <p
                className={getClassForBMIState(
                  calculateBMIState(weight, height),
                )}
              >
                {calculateBMI(weight, height)} -{" "}
                {calculateBMIState(weight, height)}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    )
  );
};

export default ProfileCom;
