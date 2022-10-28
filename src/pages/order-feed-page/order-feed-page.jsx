import feedPageStyles from "./order-feed-page.module.css";
import OrderFeedStats from "../../components/order-feed-stats/order-feed-stats";
import OrderFeedOrders from "../../components/order-feed-orders/order-feed-orders";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from "../../services/actions/ws-actions";
import ApiLoader from "../../components/api-loader/api-loader";

function OrderFeedPage() {
  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state.wsReducer.allOrders);
  const isOrderArrayRefreshed = useSelector(
    (state) => state.wsReducer.isRefreshed
  );

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: {
        add: "/all",
      },
    })
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);

  return (
    (!!allOrders && isOrderArrayRefreshed) ? (
      <div className={feedPageStyles.main}>
        <OrderFeedOrders data={allOrders}></OrderFeedOrders>
        <OrderFeedStats data={allOrders}></OrderFeedStats>
      </div>
    ) : <ApiLoader />
  );
}

export default OrderFeedPage;
