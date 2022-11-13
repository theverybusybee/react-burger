import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/ws-actions";
import { Route, Switch } from "react-router-dom";
import OrderFeedDetails from "../order-feed-details/order-feed-details";
import profileOrdersStyles from "./profile-orders-page.module.css";
import { getCookie } from "../../utils/cookie";
import ProfileOrders from "../profile-orders/profile-orders";
import Profile from "../profile/profile";

function ProfileOrdersPage() {
  const dispatch = useDispatch();

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
  }, []);

  return (
    <Switch>
      <Route path="/profile/orders" exact={true}>
        <Profile>
          <ProfileOrders />
        </Profile>
      </Route>
      <Route path="/profile/orders/:id" exact={true}>
        <div className={profileOrdersStyles.modalContainer}>
          <OrderFeedDetails />
        </div>
      </Route>
    </Switch>
  );
}

export default ProfileOrdersPage;
