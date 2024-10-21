import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Public = (props) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? <Navigate to="/" /> : <>{props.children}</>;
};

export default Public;
