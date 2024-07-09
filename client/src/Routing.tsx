import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActiveTodos from "./pages/ActiveTodos";
import CompletedTodos from "./pages/CompletedTodos";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UsersPage from "./pages/UsersPage";
import ProtectedRoute from "./ProtectedRoute";

const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer position={"bottom-left"} autoClose={3000} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/active"
            element={
              <ProtectedRoute>
                <ActiveTodos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/completed"
            element={
              <ProtectedRoute>
                <CompletedTodos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            }
          />

          {/* Default Page */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ActiveTodos />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routing;
