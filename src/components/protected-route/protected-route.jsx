import { Redirect, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshAccessToken } from "../../services/actions/auth";
import ApiLoader from "../api-loader/api-loader";
import { getData } from "../../services/actions/auth";
import { SET_LOGIN_STATUS } from "../../services/actions/auth";

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

  useEffect(() => {
    if (!isAuth && isTokenExist) {
      dispatch(refreshAccessToken());
    }
    if(isTokenExist) {
      dispatch(getData())
      dispatch({type: SET_LOGIN_STATUS})
    }
  }, [dispatch, isTokenExist, isTokenUpdated]);

  if (isTokenExist && !isTokenUpdated) {
    return <ApiLoader />;
  }

  if (anonymous && isAuth) {
    return <Redirect to="/" />;
  }

  if (!anonymous && !isAuth) {
    return <Redirect to={{ pathname: "/login", from: location }} />;
  }

  return <Route {...rest}>{children}</Route>;
}
