import { Redirect, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ApiLoader from "../api-loader/api-loader";

export default function ProtectedRoute({
  anonymous = false,
  isAuth,
  children,
  ...rest
}) {

  const location = useLocation();
  const dispatch = useDispatch();
  const isTokenExist = !!localStorage.getItem("refreshToken");
  const isTokenUpdated = useSelector(
    (state) => state.apiDataReducer.isTokenUpdated
  );


  if (isTokenExist && !isTokenUpdated) {
    return <ApiLoader />;
  }

  // if (anonymous && isAuth) {
  //   return <Redirect to="/" />;
  // }

  if (!anonymous && !isAuth) {
    return <Redirect to={{ pathname: "/login", from: location }} />;
  }

  return <Route {...rest}>{children}</Route>;
}
