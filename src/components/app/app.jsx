import AppStyle from "./app.module.css";
import AppHeader from "../app-header/app-header";
import useFetchIngredients from "../../services/hooks/useFetchIngredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ApiLoader from "../api-loader/api-loader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Home,
  RegisterPage,
  ResetPasswordPage,
  ForgotPasswordPage,
  LoginPage,
  Profile,
} from "../../pages/index";
import ProtectedRoute from "../protected-route/protected-route";
import { useSelector } from "react-redux";
console.log(LoginPage);

function App() {
  const { hasError, isLoading, data } = useFetchIngredients();
  const isLogin = useSelector(state => state.authUserReducer.isLogin)

  return hasError || isLoading || !data.length ? (
    <Router>
      <ApiLoader />
    </Router>
  ) : (
    <Router>
      <div className={AppStyle.main}>
        <AppHeader />
        {isLoading ? (
          <ApiLoader />
        ) : (
          <Switch>
            <ProtectedRoute path="/" anonymous={true} exact={true} onlyUnAuth={isLogin}>
                <DndProvider backend={HTML5Backend}>
                  <Home />
                </DndProvider>
            </ProtectedRoute>
            <ProtectedRoute path="/profile" anonymous={true} exact={true} onlyUnAuth={isLogin}>
                <Profile />
            </ProtectedRoute>

            <Route path="/login" exact={true}>
              <LoginPage />
            </Route>
            <Route path="/register" exact={true}>
              <RegisterPage />
            </Route>
            <Route path="/forgot-password" exact={true}>
              <ForgotPasswordPage />
            </Route>
            <Route path="/reset-password" exact={true}>
              <ResetPasswordPage />
            </Route>
          </Switch>
        )}
      </div>
    </Router>
  );
}

export default App;
