import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import SetPassword from "./components/SetPassword";
import { AuthProvider, useAuth } from "./context/AuthContext";
import InviteUser from "./components/InviteUser";
import Account from "./components/Account";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/set-password" element={<SetPassword />} />
          <Route
            path="/invite"
            element={
              <ProtectedRoute roles={["admin"]}>
                <InviteUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute roles={["user", "admin"]}>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const ProtectedRoute = ({ roles, children }) => {
  const { isAuthenticated, user, loading, logout } = useAuth();

  console.log("user", user);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && roles.indexOf(user.role) === -1) {
    return <Navigate to="/account" />;
  }

  return (
    <>
      <ul>
        <li>
          <button onClick={logout}>logout</button>
        </li>
        {user.role === "admin" && (
          <li>
            <a href="/invite">invite new user</a>
          </li>
        )}
      </ul>
      {children}
    </>
  );
};

export default App;
