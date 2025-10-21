import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../assets/CalendarView.css";

function CalendarView({ setSelectedDate, selectedDate, eventDates }) {
  return (
    <>
      <div>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={({ date, view }) => {
            if (
              view === "month" &&
              eventDates.some(
                (eventDate) =>
                  new Date(eventDate).toDateString() === date.toDateString()
              )
            ) {
              return "highlight";
            }
          }}
        />
      </div>
    </>
  );
}

export default CalendarView;
