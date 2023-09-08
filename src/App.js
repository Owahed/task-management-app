import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { UserAuthContextProvider, useUserAuth } from "./auth/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Registration from "./components/Registration";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Invite from "./components/Invite";

function App() {
  // const { user } = useUserAuth();
  // console.log(user);
  return (
    <div className="App">
      <UserAuthContextProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/task" element={<Registration />} />
          <Route path="/invite/:pass/:foo" element={<Invite />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
