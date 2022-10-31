import feedMainStyles from "./feed-main-page.module.css";
import OrderFeedStats from "../../components/order-feed-stats/order-feed-stats";
import OrderFeedOrders from "../../components/order-feed-orders/order-feed-orders";
import ApiLoader from "../../components/api-loader/api-loader";
import { useSelector } from "react-redux";

function FeedMainPage() {
  const allOrders = useSelector((state) => state.wsReducer.allOrders);
  const isOrderArrayRefreshed = useSelector(
    (state) => state.wsReducer.isRefreshed
  );
  return !!allOrders && isOrderArrayRefreshed ? (
    <div className={feedMainStyles.main}>
      <OrderFeedOrders data={allOrders}></OrderFeedOrders>
      <OrderFeedStats data={allOrders}></OrderFeedStats>
    </div>
  ) : (
    <ApiLoader />
  );
}

export default FeedMainPage;
