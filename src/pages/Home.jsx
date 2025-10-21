import CalendarView from "../components/CalendarView";
import Events from "../components/Events";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { addEventAPI } from "../services/allAPIcall";
import { getEventAPI } from "../services/allAPIcall";
import swal from "sweetalert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Home() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); //for profile icon
  const [currentUser, setCurrentUser] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventAdded, setEventAdded] = useState(false);
  const [eventDates, setEventDates] = useState([]);
  console.log(eventDates);
  const [event, setEvent] = useState({
    date: "",
    time: "",
    eventTitle: "",
    userId: "",
  });

  useEffect(() => {
    if (selectedDate) {
      setEvent({
        ...event,
        date: selectedDate?.toLocaleDateString("en-US", {
          month: "short", // "Oct"
          day: "numeric", // "20"
          year: "numeric", // "2025"
        }),
      });
      handleOpen();
    }
  }, [selectedDate]);

  //to get loged in user
  useEffect(() => {
    getCurrentUser();
  }, []);
  console.log(event);

  // to control modal
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setSelectedDate(null);
    setModalOpen(false);
    setEvent({
      date: "",
      time: "",
      eventTitle: "",
      userId: currentUser.id,
    });
  };

  const getCurrentUser = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setCurrentUser(user);
    setEvent({ ...event, userId: user.id });
  };

  const logout = () => {
    sessionStorage.clear();
    setTimeout(() => navigate("/login"), 300);
  };

  // add event
  const addEvent = async () => {
    try {
      const result = await getEventAPI(event.userId);
      const eventAvailable = result.data.some(
        (e) =>
          e.date == event.date &&
          e.time.toLowerCase() == event.time.toLowerCase()
      );
      if (eventAvailable) {
        swal(
          "",
          `You already have an event on ${event.date} at ${event.time}. Change the time.`,
          ""
        );
      } else {
        const result = await addEventAPI(event);
        console.log(result);
        setTimeout(() => handleClose(), 300);
        setEventAdded(!eventAdded);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        style={{ backgroundColor: "rgba(26, 24, 24, 1)", minHeight: "100vh" }}
      >
        <div className="container">
          <div className="d-flex align-items-center justify-content-between pt-4">
            <div>
              <h5
                className="text-white m-0"
                style={{ fontFamily: "Caveat, cursive" }}
              >
                Timelyfy
              </h5>
              <hr
                className="m-0"
                style={{
                  width: "100px",
                  border: "3px solid #b92f7bff",
                  borderRadius: "15px",
                }}
              />
            </div>
            <div>
              <div style={{ position: "relative", right: "0" }}>
                <button
                  onClick={() => setOpen(!open)}
                  style={{
                    border: "none",
                    backgroundColor: "rgba(26, 24, 24, 1)",
                  }}
                >
                  <i
                    className="fa-solid fa-circle-user fs-4"
                    style={{ color: "white" }}
                  ></i>
                </button>
              </div>
              {open && (
                <div
                  className="bg-white p-3"
                  style={{ position: "absolute", right: "20px", zIndex: "3" }}
                >
                  <h6>{currentUser.email}</h6>
                  <button
                    onClick={logout}
                    style={{
                      border: "none",
                      backgroundColor: "white",
                      color: "red",
                    }}
                  >
                    LOGOUT
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="row py-5 py-md-0">
            <div className="col-md-6 d-flex align-items-center justify-content-center justify-content-md-start">
              <CalendarView
                setSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
                eventDates={eventDates}
              />
            </div>
            <div className="col-md-6 d-flex justify-content-center">
              {currentUser.id && (
                <Events
                  id={currentUser.id}
                  eventAdded={eventAdded}
                  setEventDates={setEventDates}
                />
              )}
            </div>
          </div>

          {/* modal */}

          <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
              open={modalOpen}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="fw-bold m-0">ADD EVENT</h5>
                  <button onClick={handleClose} className="btn p-0 m-0">
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
                <div className="my-4">
                  <h6>{event.date}</h6>
                  <input
                    onChange={(e) =>
                      setEvent({ ...event, time: e.target.value })
                    }
                    value={event.time}
                    type="text"
                    className="form-control my-3"
                    placeholder="time"
                  />
                  <input
                    onChange={(e) =>
                      setEvent({ ...event, eventTitle: e.target.value })
                    }
                    value={event.eventTitle}
                    type="text"
                    className="form-control"
                    placeholder="your event"
                  />
                </div>
                <button
                  onClick={addEvent}
                  disabled={!event.time || !event.eventTitle}
                  className="btn fw-bold"
                  style={{ color: "#962161ff" }}
                >
                  ADD
                </button>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
