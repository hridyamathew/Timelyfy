import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import { getUserEmailAPI } from "../services/allAPIcall";
import swal from "sweetalert";
import CircularProgress from "@mui/material/CircularProgress";

function Login() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  console.log(input);

  const handleSubmit = async () => {
    try {
      if (input.email && input.password) {
        setLoading(true);
        const result = await getUserEmailAPI(input.email);
        console.log(result);
        if (result.data.length > 0) {
          let user = result.data[0];
          if (input.password == user.password) {
            setLoading(false);
            sessionStorage.setItem("user", JSON.stringify(user));
            navigate("/home");
          } else {
            swal("Error", "Invalid password", "error");
            setLoading(false);
          }
        } else {
          swal("Error", "Invalid email or password", "error");
          setLoading(false);
        }
      } else {
        swal("Error", "Please enter email and password", "error");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      swal("Error", "Something went wrong. Please try again.", "error");
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(https://sinoelite.com.sg/wp-content/uploads/2024/11/iStock-1821915184-1.jpg)`,
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0, // top:0, right:0, bottom:0, left:0
            backgroundColor: "rgba(0, 0, 0, 0.8)", // black transparent overlay
          }}
        >
          <div className="container">
            <div className="mt-4 px-5">
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
            <div className="row " style={{ height: "90vh" }}>
              <div className="col-md-6 d-flex align-items-center">
                <div className="px-5">
                  {/* <p className="text-white"> EVENT PLANNER</p> */}
                  <h1 className="text-white text-center text-md-start">
                    Plan your days ahead using{" "}
                    <span
                      style={{
                        fontFamily: "Dancing Script, cursive",
                        fontSize: "55px",
                        color: "#991f62ff",
                        fontWeight: "bold",
                      }}
                    >
                      Timelyfy
                    </span>
                  </h1>
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center justify-content-center">
                <div>
                  <h1 className="text-white fw-bold text-center mb-3">
                    Sign in
                  </h1>
                  <div className="my-3">
                    <label className="text-white" htmlFor="">
                      Email
                    </label>
                    <br />
                    <input
                      onChange={(e) =>
                        setInput({ ...input, email: e.target.value })
                      }
                      id="email"
                      className="py-1 px-3"
                      type="text"
                      placeholder="enter email"
                      style={{ width: "350px", color: "#991f62ff" }}
                    />
                  </div>
                  <div className="my-3">
                    <label className="text-white" htmlFor="">
                      Password
                    </label>
                    <br />
                    <input
                      onChange={(e) =>
                        setInput({ ...input, password: e.target.value })
                      }
                      id="password"
                      className="py-1 px-3"
                      type="password"
                      placeholder="enter password"
                      style={{ width: "350px" }}
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="mt-2 mb-4 px-3 py-2 border-0"
                    style={{ color: "white", backgroundColor: "#5d0535ff" }}
                  >
                    Sign in
                  </button>
                  <p className="text-white">
                    Don't have an acocunt? <Link to={"/"}>Sign up</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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

      <Footer />
    </>
  );
}

export default Login;
