import React, { useEffect, useState } from "react";
import userName from "../data/user";
import member from "../data/mumber";
import { useParams } from "react-router-dom";
import { useUserAuth } from "../auth/AuthContext";

const Invite = () => {
  const [name, setNam] = useState(member);
  const { allTeam, user, allTeamMember, allTasks } = useUserAuth();
  //   const { invitedUser } = allTeam;

  const { pass, foo } = useParams();

  //   console.log("invitedUser", invitedUser);
  const handleClick = (event, props) => {
    // console.log("props", props);
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
      //   const { assignTasks } = found;
      //   assignTasks.push(props);
    }
    // invitedUser.push(user.email);
    // setInvitedUser([...invitedUser, { props, pass }]);
  };
  //   console.log("invitedUser", user);
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
