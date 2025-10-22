import "../assets/Events.css";
import { addEventAPI, getEventAPI } from "../services/allAPIcall";
import { useEffect } from "react";
import { useState } from "react";
import { deleteEventAPI } from "../services/allAPIcall";
import { useRef } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { editEventAPI } from "../services/allAPIcall";
import noevent from "../assets/images/noevent.png";
import CircularProgress from "@mui/material/CircularProgress";

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

function Events({ id, eventAdded, setEventDates }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [editInput, setEditInput] = useState({});
  const [loading, setLoading] = useState(false);
  console.log(editInput);
  console.log(events);

  const getEvents = async () => {
    try {
      setLoading(true);
      const result = await getEventAPI(id);
      console.log(result);
      const sortedEvents = result.data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setEvents(sortedEvents);
      const dates = result.data.map((event) => event.date);
      setEventDates(dates);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(id);
    getEvents();
  }, []);

  useEffect(() => {
    getEvents();
  }, [eventAdded]);

  const deleteEvent = async (id) => {
    try {
      setLoading(true)
      const result = await deleteEventAPI(id);
      setLoading(false)
      getEvents();
      console.log(result);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  //control scrolling
  const [isOverflowing, setIsOverflowing] = useState(false);
  const listRef = useRef(null);
  useEffect(() => {
    const el = listRef.current;
    if (el) {
      setIsOverflowing(el.scrollHeight > el.clientHeight);
    }
  }, [events]);

  //control modal
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setEditInput({});
    setModalOpen(false);
  };

  // handle edit input
  const handleEdit = (event) => {
    setEditInput(event);
    handleOpen();
  };

  // edit event
  const editEvent = async () => {
    try {
      const event = {
        date: editInput.date,
        time: editInput.time,
        eventTitle: editInput.eventTitle,
        userId: editInput.userId,
      };
      setLoading(true)
      const result = await editEventAPI(editInput.id, event);
      setLoading(false)
      console.log(result);
      getEvents();
      handleClose();
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };
  return (
    <>
      <div
        ref={listRef}
        className={`events-list text-light my-3 pe-3 d-flex flex-column ${
          isOverflowing ? "justify-content-start" : "justify-content-md-center"
        }`}
      >
        {events.length > 0 ? (
          events.map((event) => (
            <div
              className="row d-flex align-items-center my-2"
              style={{ backgroundColor: "#b92f7bff" }}
            >
              <div
                className="col-4 text-center px-3"
                style={{ borderRight: "3px solid black" }}
              >
                <p className="m-0">{event.date}</p>
                <p className="m-0">{event.time}</p>
              </div>
              <div className="col-8 d-flex align-items-center justify-content-between">
                <div className=" d-flex align-items-center mx-3 my-2">
                  <p className="m-0">{event.eventTitle} </p>
                </div>
                <div className="d-flex flex-column">
                  <button
                    onClick={() => handleEdit(event)}
                    className="btn text-light"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="btn text-light"
                  >
                    <i className="fa-solid fa-delete-left"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="d-flex flex-column align-items-center">
            <img src={noevent} alt="" width={"70%"} />
            <h4 className="mt-4">NO EVENTS</h4>
            <h6>You have no upcoming events. Why not add one?</h6>
            <h6>Select date and add event.</h6>
          </div>
        )}
      </div>

      {/* Modal */}

      <div>
        <Modal
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="fw-bold m-0">UPDATE EVENT</h5>
              <button onClick={handleClose} className="btn p-0 m-0">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="my-4">
              <h6>{editInput.date}</h6>
              <input
                onChange={(e) =>
                  setEditInput({ ...editInput, time: e.target.value })
                }
                value={editInput.time}
                type="text"
                className="form-control my-3"
                placeholder="time"
              />
              <input
                onChange={(e) =>
                  setEditInput({ ...editInput, eventTitle: e.target.value })
                }
                value={editInput.eventTitle}
                type="text"
                className="form-control"
                placeholder="your event"
              />
            </div>
            <button
              onClick={editEvent}
              disabled={!editInput.time || !editInput.eventTitle}
              className="btn fw-bold"
              style={{ color: "#962161ff" }}
            >
              UPDATE
            </button>
          </Box>
        </Modal>
      </div>
      {loading && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9999,
                }}
              >
                <CircularProgress
                  style={{ color: "#b92f7bff" }}
                  size={60}
                  thickness={3}
                />
              </div>
            )}
    </>
  );
}

export default Events;
