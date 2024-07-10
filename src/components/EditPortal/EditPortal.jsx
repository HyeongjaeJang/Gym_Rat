import React, { useState } from "react";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import "./EditPortal.scss";

const EditPortal = ({ open, onClose, height, setHeight }) => {
  const handleChange = (e) => {
    setHeight(Number(e.target.value));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onClose();
    }
  };

  if (!open) return null;
  return (
    <div
      className="overlay bg-gray-50 bg-opacity-50 dark:bg-opacity-10"
      data-aos="fade-down"
      onClick={onClose}
    >
      <Card
        className="card"
        sx={{
          borderRadius: "10px",
          background: "#dbeafe",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent>
          <input
            type="number"
            value={height}
            onChange={handleChange}
            className="height-input"
            onKeyDown={handleKeyPress}
          />
          cm
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPortal;
