import AppStyle from "./app.module.css";
import AppHeader from "../app-header/app-header";
import useFetchIngredients from "../../services/hooks/useFetchIngredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ApiLoader from "../api-loader/api-loader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Home,
  RegisterPage,
  ResetPasswordPage,
  ForgotPasswordPage,
  LoginPage,
  Profile,
} from "../../pages/index";

console.log(LoginPage)

function App() {
  const { hasError, isLoading, data } = useFetchIngredients();
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
              <Route path="/" exact={true}>
                <DndProvider backend={HTML5Backend}>
                  <Home />
                </DndProvider>
              </Route>
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
              <Route path="/profile" exact={true}>
                <Profile />
              </Route>
            </Switch>
          )}
        </div>
      </Router>
  );
}

export default App;
