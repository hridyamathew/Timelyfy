import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import swal from "sweetalert";
import { addUserAPI } from "../services/allAPIcall";
import { getUserEmailAPI } from "../services/allAPIcall";

function Signup() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  console.log(input);

  //api call
  const addUser = async () => {
    try {
      const result = await addUserAPI(input);
      console.log(result);
      swal("Success", "Registration successful!", "success");
      navigate("/login");
    } catch (error) {
      console.log(error);
      swal("Error", "Something went wrong. Please try again.", "error");
    }
  };

  // check if email exists
  const emailExists = async (email) => {
    try {
      const result = await getUserEmailAPI(email);

      if (result.data.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle errors
  const [errors, setErrors] = useState({});

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = async (e) => {
    const { id, value } = e.target;

    let newErrors = { ...errors };

    switch (id) {
      case "email":
        if (!emailRegex.test(value)) {
          newErrors.email = "Enter a valid email address";
        } else {
          if (await emailExists(value)) {
            newErrors.email = "Email already exists";
          } else {
            setInput({ ...input, email: value });
            delete newErrors.email;
          }
        }
        break;

      case "password":
        if (!passwordRegex.test(value)) {
          newErrors.password = "must have 8+ chars,[a-zA-Z],[0-9],[@#$%&]";
        } else {
          setInput({ ...input, password: value });
          delete newErrors.password;
        }
        break;

      case "confirmPassword":
        if (value !== input.password) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          setConfirmPassword(value);
          delete newErrors.confirmPassword;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = () => {
    if (!input.email || !input.password || !confirmPassword) {
      swal("Error", "Please fill all the fields", "error");
      return;
    }

    // Check if any errors exist
    if (Object.keys(errors).length > 0) {
      swal("Error", "Please fix the highlighted errors", "error");
      return;
    }

    // All validations passed
    addUser();
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(https://sinoelite.com.sg/wp-content/uploads/2024/11/iStock-1821915184-1.jpg)`,
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
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
                    Sign up
                  </h1>
                  <div className="my-3">
                    <label className="text-white" htmlFor="">
                      Email
                    </label>
                    <br />
                    <input
                      id="email"
                      onChange={handleChange}
                      className="py-1 px-3"
                      type="text"
                      placeholder="enter email"
                      style={{ width: "350px", color: "#991f62ff" }}
                    />{" "}
                    <br />
                    {errors.email && (
                      <small className="text-danger">{errors.email}</small>
                    )}
                  </div>
                  <div className="my-3">
                    <label className="text-white" htmlFor="">
                      Password
                    </label>
                    <br />
                    <input
                      id="password"
                      onChange={handleChange}
                      className="py-1 px-3"
                      type="password"
                      placeholder="enter password"
                      style={{ width: "350px" }}
                    />{" "}
                    <br />
                    {errors.password && (
                      <small className="text-danger">{errors.password}</small>
                    )}
                  </div>
                  <div className="my-3">
                    <label className="text-white" htmlFor="">
                      Confirm Password
                    </label>
                    <br />
                    <input
                      id="confirmPassword"
                      onChange={handleChange}
                      className="py-1 px-3"
                      type="password"
                      placeholder="enter password again"
                      style={{ width: "350px" }}
                    />{" "}
                    <br />
                    {errors.confirmPassword && (
                      <small className="text-danger">
                        {errors.confirmPassword}
                      </small>
                    )}
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="mt-2 mb-4 px-3 py-2 border-0"
                    style={{ color: "white", backgroundColor: "#5d0535ff" }}
                  >
                    Sign up
                  </button>
                  <p className="text-white">
                    Already have an acocunt? <Link to={"/login"}>Sign in</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
