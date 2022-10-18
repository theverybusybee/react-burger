import AppStyle from "./app.module.css";
import AppHeader from "../app-header/app-header";
import useFetchIngredients from "../../services/hooks/useFetchIngredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ApiLoader from "../api-loader/api-loader";
import { Route, Switch, useLocation } from "react-router-dom";

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
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {
  const { hasError, isLoading, data } = useFetchIngredients();
  const isLogin = useSelector((state) => state.authUserReducer.isLogin);
  const { isVisible, currentModalIngredient } = useSelector(
    (state) => state.modalReducer
  );
  const location = useLocation();
  const background = location.state?.background;

  return hasError || isLoading || !data.length ? (
    <ApiLoader />
  ) : (
    <div className={AppStyle.main}>
      <AppHeader />
      {isLoading ? (
        <ApiLoader />
      ) : (
        <Switch location={background || location}>
          <ProtectedRoute
            path="/"
            exact={true}
            isAuth={isLogin}
            anonymous={false}
          >
            <DndProvider backend={HTML5Backend}>
              <Home />
            </DndProvider>
          </ProtectedRoute>

          <ProtectedRoute path="/profile" exact={true} isAuth={isLogin}>
            <Profile />
          </ProtectedRoute>

          <ProtectedRoute
            path="/login"
            exact={true}
            anonymous={true}
            isAuth={isLogin}
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            path="/register"
            exact={true}
            anonymous={true}
            isAuth={isLogin}
          >
            <RegisterPage />
          </ProtectedRoute>
          <ProtectedRoute
            path="/forgot-password"
            exact={true}
            anonymous={true}
            isAuth={isLogin}
          >
            <ForgotPasswordPage />
          </ProtectedRoute>
          <ProtectedRoute
            path="/reset-password"
            exact={true}
            anonymous={true}
            isAuth={isLogin}
          >
            <ResetPasswordPage />
          </ProtectedRoute>
          <Route path="/ingredients/:id" exact={true}>
            <IngredientDetails  />
          </Route>
        </Switch>
      )}
      {isVisible ? (
        <Modal isOpened={isVisible}>
          <IngredientDetails  />
        </Modal>
      ) : null}
      {background && (
        <Route
          exact={true}
          path="/ingredients/:id"
          children={
            <Modal isOpened={isVisible}>
              <IngredientDetails  />
            </Modal>
          }
        />
      )}
    </div>
  );
}

export default App;
