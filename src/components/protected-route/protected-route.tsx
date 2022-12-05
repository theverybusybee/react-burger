import { Redirect, Route, useLocation } from "react-router-dom";

type TProtectedRoute = {
  anonymous: boolean;
  isAuth: boolean;
  children: any;
};

interface stateType {
  from: { pathname: string };
}

export default function ProtectedRoute({
  anonymous = false,
  isAuth,
  children,
  ...rest
}: TProtectedRoute) {
  const location = useLocation<stateType>();

  if (anonymous && isAuth) {
    return <Redirect to="/" />;
  }

  if (!anonymous && !isAuth) {
    return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  }

  return <Route {...rest}>{children}</Route>;
}
