import React from "react";

import { useParams } from "react-router-dom";
import { useUserAuth } from "../auth/AuthContext";

const Invite = () => {
  const { allTeam, allTeamMember, allTasks } = useUserAuth();

  const { pass, foo } = useParams();

  const handleClick = (event, props) => {
    event.currentTarget.disabled = true;
    if (foo === "team") {
      const found = allTeam.find((obj) => {
        return obj.id == pass;
      });

      const { invitedUser } = found;
      invitedUser.push(props);
    } else if (foo === "task") {
      const mem = allTasks.find((obj) => {
        console.log("object", obj);
        return obj.id == pass;
      });
      const { howShow } = mem;

      howShow.push(props);
    }
  };
  return (
    <div>
      {allTeamMember.map(
        (nam, index) =>
          nam.name && (
            <li key={index}>
              {nam.name}{" "}
              <button
                onClick={(event) => handleClick(event, nam.email)}
                className="btn  btn-success"
              >
                invite
              </button>
            </li>
          )
      )}
    </div>
  );
};

export default Invite;
