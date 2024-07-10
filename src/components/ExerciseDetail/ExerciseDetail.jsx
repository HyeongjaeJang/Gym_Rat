import { useState, useEffect } from "react";
import "./ExerciseDetail.scss";
const ExerciseDetail = ({ exercise, open, onClose }) => {
  const [detail, setDetail] = useState(exercise);

  useEffect(() => {
    setDetail(exercise);
  }, [exercise]);
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="overlay bg-gray-50 bg-opacity-50 dark:bg-opacity-10"
      data-aos="fade-down"
    >
      <div className="detail-container bg-primary-light dark:bg-primary-dark">
        {detail && (
          <>
            <img src={detail.images} alt="detail-img" className="detail-img" />
            <h2 className="text-primary-pupple">{detail.name}</h2>
            <h3 className="text-primary-dark dark:text-primary-blue">
              {detail.muscle}
            </h3>
            <h3 className="text-primary-dark dark:text-primary-blue">
              {detail.difficulty}
            </h3>
            <p className="text-primary-dark dark:text-primary-blue">
              {detail.type}
            </p>
            <p className="text-primary-dark dark:text-primary-blue">
              {detail.instructions}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ExerciseDetail;
