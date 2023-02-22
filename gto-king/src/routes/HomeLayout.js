import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const HomeLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>{outlet}</>
  )
};