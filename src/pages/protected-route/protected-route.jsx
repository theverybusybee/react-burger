import { Redirect, Route, useLocation } from "react-router-dom";

function ProtectedRoute({ onlyUnAuth = false, user, children, ...rest }) {
  const location = useLocation();

  if (onlyUnAuth && user) {
    return <Redirect to="/" />;
  }

  if (!onlyUnAuth && !user) {
    return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  }

  return <Route {...rest}>children={}</Route>;
}

export default ProtectedRoute;
