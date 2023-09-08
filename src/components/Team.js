import React, { useState } from "react";
import { useUserAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";
import AllTeam from "./AllTeam";

const Team = () => {
  const [show, setShow] = useState(false);
  const { user, handleCreateTeam, allTeam } = useUserAuth();
  const [teamData, setTeamData] = useState({
    description: "",
    email: user.email,
    teamName: "",
    invitedUser: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamData({
      ...teamData,
      [name]: value,
    });
  };

  const handleSubmitTeam = (e) => {
    e.preventDefault();
    handleCreateTeam(teamData);
    setTeamData({
      description: "",
      teamName: "",
      invitedUser: [],
    });
  };

  return (
    <div className="d-flex">
      <div>
        <div class="card" style={{ width: "18rem" }}>
          <div class="card-body">
            <h5 class="card-title">Create Team</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              You can create your own team
            </h6>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a onClick={() => setShow(!show)} class="card-link btn btn-info">
              Create team
            </a>
          </div>
        </div>

        <div>
          {show && (
            <form onSubmit={handleSubmitTeam}>
              {/* <input
                type="text"
                name="title"
                className="m-2"
                placeholder="Title"
                value={teamData.title}
                onChange={handleChange}
              />
              <br /> */}
              <input
                type="text"
                name="teamName"
                className="m-2"
                placeholder="Team Name"
                value={teamData.teamName}
                onChange={handleChange}
              />
              <br />
              <textarea
                name="description"
                className="m-2"
                placeholder="Description"
                value={teamData.description}
                onChange={handleChange}
              ></textarea>
              <br />

              <button className="m-2 btn btn-primary" type="submit">
                Create
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="task-components p-5 m-5">
        {allTeam?.map((team) => (
          <AllTeam key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
};

export default Team;
