import ProfileStyles from "./profile.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutFromAccount } from "../../services/actions/auth";
import { memo, useCallback, useEffect } from "react";
import { deleteCookie } from "../../utils/cookie";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/ws-actions";
import { getCookie } from "../../utils/cookie";
import ApiLoader from "../../components/api-loader/api-loader";

function Profile({ children }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const isOrderArrayRefreshed = useSelector(
    (state) => state.wsReducer.isRefreshed
  );

  const logout = useCallback((e) => {
    e.preventDefault();
    dispatch(logoutFromAccount());
    deleteCookie("token");
    localStorage.removeItem("refreshToken");
    history.push("/login");
  }, []);

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: {
        add: `?token=${getCookie("token")}`,
      },
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch, children]);

  return isOrderArrayRefreshed ? (
    <div className={ProfileStyles.container}>
      <div className={ProfileStyles.linksContainer}>
        <NavLink
          className={`${ProfileStyles.link} text text_type_main-medium text_color_inactive`}
          type="secondary"
          size="large"
          activeClassName={ProfileStyles.selected}
          to={{ pathname: "/profile" }}
          exact={true}
        >
          Профиль
        </NavLink>
        <NavLink
          className={`${ProfileStyles.link} text text_type_main-medium text_color_inactive`}
          type="secondary"
          size="large"
          activeClassName={ProfileStyles.selected}
          to={{ pathname: "/profile/orders" }}
          exact={true}
        >
          История заказов
        </NavLink>
        <button
          className={`${ProfileStyles.button} text text_type_main-medium text_color_inactive`}
          type="secondary"
          size="large"
          onClick={logout}
        >
          Выход
        </button>
      </div>

      <>{children}</>
    </div>
  ) : (
    <ApiLoader />
  );
}

export default memo(Profile);
