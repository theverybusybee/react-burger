import { Redirect, Route, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  anonymous = false,
  isAuth,
  children,
  ...rest
}) {
  const location = useLocation();

  if (anonymous && isAuth) {
    return <Redirect to="/" />;
  }

  if (!anonymous && !isAuth) {
    return <Redirect to={{ pathname: "/login", from: location }} />;
  }

  return <Route {...rest}>{children}</Route>;
}
