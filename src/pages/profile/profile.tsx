import ProfileStyles from "./profile.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { logoutFromAccount, getData } from "../../services/actions/auth";
import { memo, useCallback, useEffect } from "react";
import { deleteCookie } from "../../utils/cookie";
import { useAppDispatch } from "../../services/redux-hooks";

interface IProfile {
  children: any,
}

function Profile({ children }: IProfile) {
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getData());
  }, []);

  const logout = useCallback((e: React.SyntheticEvent) => {
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
          activeClassName={ProfileStyles.selected}
          to={{ pathname: "/profile" }}
          exact={true}
        >
          Профиль
        </NavLink>
        <NavLink
          className={`${ProfileStyles.link} text text_type_main-medium text_color_inactive`}
          type="secondary"
          activeClassName={ProfileStyles.selected}
          to={{ pathname: "/profile/orders" }}
          exact={true}
        >
          История заказов
        </NavLink>
        <button
          className={`${ProfileStyles.button} text text_type_main-medium text_color_inactive`}
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
