import React from "react";
import { Link, useParams } from "react-router-dom";
import member from "../data/mumber";
import { useUserAuth } from "../auth/AuthContext";

const AllTeam = ({ team }) => {
  const { allTeam } = useUserAuth();
  const { invitedUser } = allTeam;
  const handleClick = (props) => {
    // event.currentTarget.disabled = true;
    // console.log(props);
  };

  const found = allTeam.find((obj) => {
    return obj.id == team.id;
  });
  const filteredArr = [...new Set(found?.invitedUser)];
  //   console.log("hi", found.invitedUser);
  return (
    <div>
      <h3>Team</h3>
      <div class="card d-flex" style={{ width: "18rem" }}>
        <div class="card-body">
          <h5 class="card-title">{team.teamName}</h5>
          <p class="card-text">{team.description}.</p>
          <p>
            {filteredArr.map((a) => (
              <li>
                invited <span className="text-success">{a}</span>
              </li>
            ))}
          </p>
          <Link to={`/invite/${team.id}/team`} class="btn btn-primary">
            Invite
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllTeam;
