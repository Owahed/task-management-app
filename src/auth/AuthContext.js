import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import tasks from "../data/data";
import generateUniqueId from "generate-unique-id";
import member from "../data/mumber";
import teamData from "../data/teamData";

const getLocalTasks = () => {
  const items = localStorage.getItem("tasks");

  if (items) {
    return JSON.parse(items);
  } else {
    return [];
  }
};
const getLocalMember = () => {
  const items = localStorage.getItem("member");

  if (items) {
    return JSON.parse(items);
  } else {
    return [];
  }
};
const getLocalTeam = () => {
  const items = localStorage.getItem("team");

  if (items) {
    return JSON.parse(items);
  } else {
    return [];
  }
};

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [regUsers, setRegUsers] = useState({});

  function logIn(email, password) {
    console.log(email);
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  function regUserAll(props) {
    setRegUsers(props);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const [allTeamMember, setAllMember] = useState(member);
  const [allTasks, setAllTasks] = useState(getLocalTasks() || tasks);
  const [allTeam, setAllTeam] = useState(getLocalTeam() || teamData);

  const handleCreateTask = (newTask) => {
    newTask.id = generateUniqueId();
    setAllTasks([...allTasks, newTask]);
  };
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(allTasks));
  }, [allTasks, allTeamMember, allTeam]);

  //team-------------------------------------

  const handleCreateTeam = (newTeam) => {
    newTeam.id = generateUniqueId();
    setAllTeam([...allTeam, newTeam]);
  };
  useEffect(() => {
    localStorage.setItem("team", JSON.stringify(allTeam));
  }, [allTasks, allTeamMember, allTeam]);

  //member------------------------
  const handleCreateMember = (newMember) => {
    newMember.id = generateUniqueId();
    setAllMember([...allTeamMember, newMember]);
  };
  useEffect(() => {
    localStorage.setItem("member", JSON.stringify(allTeamMember));
  }, [allTasks, allTeamMember, allTeam]);
  return (
    <userAuthContext.Provider
      value={{
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        regUserAll,
        regUsers,
        handleCreateTask,
        allTasks,
        handleCreateTeam,
        allTeam,
        handleCreateMember,
        allTeamMember,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
