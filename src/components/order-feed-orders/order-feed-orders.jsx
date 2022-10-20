import feedOrdersStyles from "./order-feed-orders.module.css";
import OrderFeedOrderCard from "../order-feed-order-card/order-feed-order-card";

function OrderFeedOrders({data}) {
  return (
    <section className={feedOrdersStyles.main}>
      <h1 className={`${feedOrdersStyles.title} text text_type_main-large`}>
        Лента заказов
      </h1>
      <div
        className={` ${feedOrdersStyles.ordersContainer} custom-scroll`}
        id="scroll"
      >
        {data.orders.map((el) => {
          return <OrderFeedOrderCard data={el} />;
        })}
      </div>
    </section>
  );
}

export default OrderFeedOrders;
