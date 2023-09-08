import React from "react";
import { useUserAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logOut, regUsers } = useUserAuth();
  const navigatePage = useNavigate();
  const handelClick = async () => {
    try {
      await logOut();
      navigatePage("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      {user && (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand">
              {user ? user.displayName || regUsers.name : "Log in"}
            </a>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown ">
                  <img
                    src={user.photoURL || regUsers.img}
                    alt=""
                    className="m-2"
                    style={{
                      width: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </li>
                <li class="nav-item">
                  <button
                    onClick={handelClick}
                    type="button"
                    class="btn btn-danger m-3"
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
