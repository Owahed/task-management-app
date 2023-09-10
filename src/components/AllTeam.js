import React from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../auth/AuthContext";

const AllTeam = ({ team }) => {
  const { allTeam } = useUserAuth();

  const found = allTeam.find((obj) => {
    return obj.id == team.id;
  });
  const filteredArr = [...new Set(found?.invitedUser)];
  return (
    <div className="card-background">
      <h3>Team</h3>
      <div className="card d-flex card-background" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{team.teamName}</h5>
          <p className="card-text">{team.description}.</p>
          <p>
            {filteredArr.map((a) => (
              <li key={a.id}>
                invited <span className="text-success">{a}</span>
              </li>
            ))}
          </p>
          <Link to={`/invite/${team.id}/team`} className="btn btn-primary">
            Invite
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllTeam;
