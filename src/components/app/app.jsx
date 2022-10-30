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
import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ProfileForm from "../profile-forms/profile-forms";
import ProfileOrders from "../../pages/profile-orders/profile-orders";
import { getIngredients } from "../../services/actions/api-data";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
    const location = useLocation();
  console.log(history)
  console.log(location)
  const { hasError, isLoading, data } = useFetchIngredients();
  const isLogin = useSelector((state) => state.authUserReducer.isLogin);
  function closePopup() {
    history.goBack();
  }
  const background = location.state?.background;

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
            path="/profile"
            exact={true}
            isAuth={isLogin}
            anonymous={false}
          >
            <Profile>
              <ProfileForm />
            </Profile>
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
            <div className={AppStyle.modal}>
              <IngredientDetails />
            </div>
          </Route>

          <Route path="/feed" exact={true}>
            <OrderFeedPage />
          </Route>
          <Route path="/feed/:id" exact={true}>
            <div className={AppStyle.modal}>
              <OrderFeedDetails />
            </div>
          </Route>
          <ProtectedRoute
            path="/profile/orders"
            exact={true}
            isAuth={isLogin}
            anonymous={false}
          >
            <Profile>
              <ProfileOrders />
            </Profile>
          </ProtectedRoute>
          <ProtectedRoute
            path="/profile/orders/:id"
            exact={true}
            isAuth={isLogin}
            anonymous={false}
          >
            <div className={AppStyle.modal}>
              <OrderFeedDetails />
            </div>
          </ProtectedRoute>
        </Switch>
      )}
  
      {background && (
        <Switch>
          <Route
            exact={true}
            path="/ingredients/:id"
            children={
              <Modal onClose={closePopup}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            exact={true}
            path="/feed/:id"
            children={
              <Modal onClose={closePopup}>
                <OrderFeedDetails />
              </Modal>
            }
          />
          <Route
            exact={true}
            path="/profile/orders/:id"
            children={
              <Modal onClose={closePopup}>
                <OrderFeedDetails />
              </Modal>
            }
          />
        </Switch>
      )}
    </div>
  );
}

export default App;
