import feedPageStyles from "./order-feed-page.module.css";
import OrderFeedStats from "../../components/order-feed-stats/order-feed-stats";
import OrderFeedOrders from "../../components/order-feed-orders/order-feed-orders";
import { useSelector } from "react-redux";

function OrderFeedPage() {
  const allOrders = useSelector((state) => state.feedDataReducer.allOrders);
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
