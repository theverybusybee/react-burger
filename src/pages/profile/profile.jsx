import ProfileStyles from "./profile.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutFromAccount } from "../../services/actions/auth";
import { memo, useCallback } from "react";
import { deleteCookie } from "../../utils/cookie";

function Profile({ children }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = useCallback((e) => {
    e.preventDefault();
    dispatch(logoutFromAccount());
    deleteCookie("token");
    localStorage.removeItem("refreshToken");
    history.push("/login");
  }, []);

  return (
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
  );
}

export default memo(Profile);
