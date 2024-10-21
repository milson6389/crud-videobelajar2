import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Private = (props) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? <>{props.children}</> : <Navigate to="/" />;
};

export default Private;
