import React from "react";
import { useUserAuth } from "../auth/AuthContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Home = () => {
  const { user, logOut, regUsers } = useUserAuth();
  const handelClick = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      {/* <div className="p-4 text-center">Hello welcome</div>
      <br />
      {user ? user.displayName || regUsers.name : "no name"}

      {user && (
        <img
          src={user.photoURL || regUsers.img}
          alt=""
          style={{ width: "50px" }}
        />
      )}
      <div>
        <button onClick={handelClick} type="button" class="btn btn-primary">
          Log Out
        </button>
      </div> */}

      <div>
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
