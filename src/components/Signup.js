import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../auth/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { signUp, googleSignIn } = useUserAuth();
  const [error, setError] = useState("");
  const navigatePage = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();

    setError("");
    try {
      await signUp(email, pass);
      navigatePage("/");
    } catch (err) {
      setError(err.message);
    }
  };
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigatePage("/registration");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      {" "}
      <div className="container w-25 text-center card-background">
        <div className=" text-center">
          <h1>Sing Up</h1>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handelSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => setPass(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <hr />
          <div className="d-flex justify-content-center">
            <GoogleButton
              className="g-btn "
              type="dark"
              onClick={handleGoogleSignIn}
            />
          </div>
        </div>
        <div className="p-4 mt-3 text-center">
          Don't have an account? <Link to="/">log in</Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
