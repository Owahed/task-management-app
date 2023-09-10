import React, { useState } from "react";
import { useUserAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const { user, regUserAll, handleCreateMember } = useUserAuth();
  const [img, setImg] = useState(null);
  const navigatePage = useNavigate();

  const changeTheme = async (e) => {
    e.preventDefault();

    await regUserAll({ name, bio, email: user.email, img });
    await handleCreateMember({
      name: user?.displayName || name,
      email: user?.email,
      assignTasks: [],
    });
    navigatePage("/home");
  };

  return (
    <div className="container w-25 text-center card-background">
      <h1 className="pt-3">Registration</h1>
      <form onSubmit={changeTheme}>
        {user.displayName === null && (
          <div className="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <br />

        <div className="form-group">
          <label for="exampleInputPassword1">Bio</label>
          <input
            type="text"
            className="form-control"
            placeholder="Bio"
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <br />
        {user.photoURL === null && (
          <div class="form-group">
            <label for="exampleFormControlFile1">Image</label>
            <br />
            <input
              type="file"
              class="form-control-file"
              id="exampleFormControlFile1"
              accept="image/*"
              onChange={(e) => setImg(URL.createObjectURL(e.target.files[0]))}
            />
          </div>
        )}
        <br />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Registration;
