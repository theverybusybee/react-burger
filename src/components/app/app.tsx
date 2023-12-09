import AppStyle from "./app.module.css";
import AppHeader from "../app-header/app-header";
import useFetchIngredients from "../../services/hooks/useFetchIngredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ApiLoader from "../api-loader/api-loader";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { useEffect } from "react";
import {
  Home,
  RegisterPage,
  ResetPasswordPage,
  ForgotPasswordPage,
  LoginPage,
  Profile,
  OrderFeedPage,
  OrderFeedDetails,
} from "../../pages/index";
import ProtectedRoute from "../protected-route/protected-route";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ProfileForm from "../profile-forms/profile-forms";
import { getIngredients } from "../../services/actions/api-data";
import ProfileOrdersPage from "../../pages/profile-orders-page/profile-orders-page";
import NotFound from "../../pages/not-found-page/not-found-page";
import { getData } from "../../services/actions/auth";
import { SET_LOGIN_STATUS } from "../../services/constants/auth";
import { getCookie } from "../../utils/cookie";
import { useAppDispatch, useAppSelector } from "../../services/redux-hooks";
import { TUseLocation } from "../../services/types/data";

function App() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation<TUseLocation>();
  const { hasError, isLoading, data } = useFetchIngredients();
  const isLogin = useAppSelector((state) => state.authUserReducer.isLogin);
  function closePopup() {
    history.goBack();
  }
  const background = location?.state?.background;
  const token = getCookie("token");
  const isTokenExist = !!localStorage.getItem("refreshToken");
  const isTokenUpdated = useAppSelector(
    (state) => state.apiDataReducer.isTokenUpdated
  );

  useEffect(() => {
    if (isTokenExist) {
      dispatch(getData());
      dispatch({ type: SET_LOGIN_STATUS });
    }
  }, [dispatch, isTokenExist, isTokenUpdated, token]);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return hasError || isLoading || !data.length ? (
    <ApiLoader />
  ) : (
    <div className={AppStyle.main}>
      <AppHeader />
      {isLoading ? (
        <ApiLoader />
      ) : (
        <Switch location={background || location}>
          <Route path="/" exact={true}>
            <DndProvider backend={HTML5Backend}>
              <Home />
            </DndProvider>
          </Route>

          <ProtectedRoute
            path="/profile/orders"
            isAuth={isLogin}
            anonymous={false}
          >
            <ProfileOrdersPage />
          </ProtectedRoute>

          <ProtectedRoute path="/profile" isAuth={isLogin} anonymous={false}>
            <Profile>
              <ProfileForm />
            </Profile>
          </ProtectedRoute>

          <ProtectedRoute path="/login" anonymous={true} isAuth={isLogin}>
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute path="/register" anonymous={true} isAuth={isLogin}>
            <RegisterPage />
          </ProtectedRoute>
          <ProtectedRoute
            path="/forgot-password"
            anonymous={true}
            isAuth={isLogin}
          >
            <ForgotPasswordPage />
          </ProtectedRoute>
          <ProtectedRoute
            path="/reset-password"
            anonymous={true}
            isAuth={isLogin}
          >
            <ResetPasswordPage />
          </ProtectedRoute>
          <Route path="/ingredients/:id" exact={true}>
            <div className={AppStyle.modal}>
              <IngredientDetails />
            </div>
          </Route>

          <Route path="/feed">
            <OrderFeedPage />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      )}

      {background && (
        <Route
          exact={true}
          path="/ingredients/:id"
          children={
            <Modal onClose={closePopup}>
              <IngredientDetails />
            </Modal>
          }
        />
      )}

      {background && (
        <Route
          exact={true}
          path="/feed/:id"
          children={
            <Modal onClose={closePopup}>
              <OrderFeedDetails />
            </Modal>
          }
        />
      )}

      {background && (
        <Route
          exact={true}
          path="/profile/orders/:id"
          children={
            <Modal onClose={closePopup}>
              <OrderFeedDetails />
            </Modal>
          }
        />
      )}
    </div>
  );
}

export default App;
