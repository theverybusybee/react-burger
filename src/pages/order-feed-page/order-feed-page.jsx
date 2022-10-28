import feedPageStyles from "./order-feed-page.module.css";
import OrderFeedStats from "../../components/order-feed-stats/order-feed-stats";
import OrderFeedOrders from "../../components/order-feed-orders/order-feed-orders";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { WS_CONNECTION_START } from "../../services/actions/ws-actions";

function OrderFeedPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: {
        add: "/all",
      },
    })
  });

  const allOrders = useSelector((state) => state.wsReducer.allOrders);
  return (
    !!allOrders && (
      <div className={feedPageStyles.main}>
        <OrderFeedOrders data={allOrders}></OrderFeedOrders>
        <OrderFeedStats data={allOrders}></OrderFeedStats>
      </div>
    )
  );
}

export default OrderFeedPage;
