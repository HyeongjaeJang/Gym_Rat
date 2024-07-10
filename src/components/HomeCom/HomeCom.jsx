import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useSwipeable } from "react-swipeable";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./HomeCom.scss";
import Workouts from "../Workouts/Wrokouts";

const localizer = momentLocalizer(moment);

const HomeCom = ({ collapsed, func }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSwipeLeft = () => {
    handleNextMonth();
  };

  const handleSwipeRight = () => {
    handlePrevMonth();
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
  });

  const handleNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, "month"));
  };

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, "month"));
  };

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    navigate(`/day/${id}`, { state: { selectedDate: start } });
  };

  return (
    <div
      className="home-container  bg-primary-light dark:bg-primary-dark"
      {...(!collapsed ? { onClick: func } : null)}
    >
      <div className="content">
        <section className="main">
          <h2 className="main__title text-primary-dark dark:text-primary-pupple">
            Workout Calendar
          </h2>
          <div {...swipeHandlers}>
            <Calendar
              localizer={localizer}
              events={[]}
              selectable
              startAccessor="start"
              endAccessor="end"
              components={{ toolbar: () => null }}
              style={{ height: 300 }}
              view="month"
              onView={() => {}}
              date={currentDate.toDate()}
              onNavigate={(newDate) => setCurrentDate(moment(newDate))}
              onSelectSlot={(slot) => handleSelectSlot(slot)}
              className="w-full rounded-lg shadow-md p-4 font-sans bg-indigo-300 dark:bg-indigo-900"
            />
          </div>
          <div className="main__workouts">
            <h3 className="main__workouts-title">Upcoming Workouts</h3>
            <Workouts />
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeCom;
