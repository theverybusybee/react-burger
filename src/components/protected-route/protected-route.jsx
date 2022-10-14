import { Redirect, Route, useLocation } from "react-router-dom";

function ProtectedRoute({ onlyUnAuth = false, user, children, ...rest }) {

  if (onlyUnAuth && user) {
    return <Redirect to="/" />;
  }

  if (!onlyUnAuth && !user) {
    return <Redirect to={{ pathname: "/login" }} />;
  }

  return <Route {...rest}>{children}</Route>;
}

export default ProtectedRoute;
