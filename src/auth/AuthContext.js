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

const getLocalItem = () => {
  const items = localStorage.getItem("tasks");
  console.log("1", items);
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
  //   console.log(auth);

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
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  // const items = JSON.parse(localStorage.getItem("items"));

  const [allTasks, setAllTasks] = useState(getLocalItem());
  const [allTeam, setAllTeam] = useState(member);

  // useEffect(() => {
  //   // Retrieve data from local storage when the component mounts
  //   const items = localStorage.getItem("tasks");
  //   console.log("1", items);
  //   if (items) {
  //     setAllTasks(JSON.parse(items));
  //   }
  // }, []);

  const handleCreateTask = (newTask) => {
    newTask.id = generateUniqueId();
    setAllTasks([...allTasks, newTask]);
    // setAllTasks([newTask]);
  };
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(allTasks));
  }, [allTasks]);

  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem("items"));
  //   if (items) {
  //     setAllTasks(items);
  //   }
  //   return items;
  // }, []);

  // console.log("allTasks", allTasks);
  //team

  const handleCreateTeam = (newTeam) => {
    newTeam.id = generateUniqueId();
    setAllTeam([...allTeam, newTeam]);
    // setAllTasks([newTask]);
  };
  console.log("object", allTeam);
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
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
