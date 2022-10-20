import feedPageStyles from "./order-feed-page.module.css";
import OrderFeedStats from "../../components/order-feed-stats/order-feed-stats";
import OrderFeedOrders from "../../components/order-feed-orders/order-feed-orders";
import { data2 } from "../../utils/constants";

function OrderFeedPage() {
  return (
    <div className={feedPageStyles.main}>
      <OrderFeedOrders data={data2}></OrderFeedOrders>
      <OrderFeedStats data={data2}></OrderFeedStats>
    </div>
  );
}

export default OrderFeedPage;
