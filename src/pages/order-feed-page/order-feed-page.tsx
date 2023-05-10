import { useEffect } from "react";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/constants/ws-actions";
import { Route, Switch } from "react-router-dom";
import FeedMainPage from "../feed-main-page/feed-main-page";
import OrderFeedDetails from "../order-feed-details/order-feed-details";
import feedStyles from './order-feed-page.module.css'
import { useAppDispatch } from "../../services/redux-hooks";

function OrderFeedPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: {
        add: "/all",
      },
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);

  return (
    <Switch>
      <Route path="/feed" exact={true}>
        <FeedMainPage />
      </Route>
      <Route path="/feed/:id" exact={true}>
        <div className={feedStyles.modalContainer}>
        <OrderFeedDetails />
        </div>
        
      </Route>
    </Switch>
  );
}

export default OrderFeedPage;
