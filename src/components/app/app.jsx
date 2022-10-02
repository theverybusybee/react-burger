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

function App() {
  const { hasError, isLoading, data } = useFetchIngredients();
  return hasError || isLoading || !data.length ? (
    <ApiLoader />
  ) : (
    <div className={AppStyle.main}>
      <AppHeader />

      {isLoading ? (
        <ApiLoader />
      ) : (
        <Router>
          <Switch>
            <Route path="/" exact={true}>
              {/* <DndProvider backend={HTML5Backend}>
                <Home />
              </DndProvider> */}
              <Profile />
            </Route>
            <Route path="/login" exact={true}></Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
