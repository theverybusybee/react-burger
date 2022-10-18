import AppStyle from "./app.module.css";
import AppHeader from "../app-header/app-header";
import useFetchIngredients from "../../services/hooks/useFetchIngredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ApiLoader from "../api-loader/api-loader";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { REMOVE_VISIBILITY } from "../../services/actions/modal";

import {
  Home,
  RegisterPage,
  ResetPasswordPage,
  ForgotPasswordPage,
  LoginPage,
  Profile,
} from "../../pages/index";
import ProtectedRoute from "../protected-route/protected-route";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { hasError, isLoading, data } = useFetchIngredients();
  const isLogin = useSelector((state) => state.authUserReducer.isLogin);
  const isVisible = useSelector((state) => state.modalReducer.isVisible);
  const location = useLocation();
  const background = location.state?.background;

  const onClose = () => {
    history.goBack();
    dispatch({ type: REMOVE_VISIBILITY });
  };

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
            anonymous={true}
            isAuth={isLogin}
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
            <div className={AppStyle.ingredient}>
              <IngredientDetails />
            </div>
          </Route>
        </Switch>
      )}
      {isVisible ? (
        <Modal isOpened={isVisible}>
          <IngredientDetails />
        </Modal>
      ) : null}
      {background && (
        <Route
          exact={true}
          path="/ingredients/:id"
          children={
            <Modal isOpened={isVisible} onClose={onClose}>
              <IngredientDetails />
            </Modal>
          }
        />
      )}
    </div>
  );
}

export default App;
