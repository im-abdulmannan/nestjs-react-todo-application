/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom";

type Props = {
  children: any;
};

const ProtectedRoute = (props: Props) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return props.children;
};

export default ProtectedRoute;
