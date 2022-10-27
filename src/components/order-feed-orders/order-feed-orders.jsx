import feedOrdersStyles from "./order-feed-orders.module.css";
import OrderFeedCard from "../order-feed-card/order-feed-card";

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
          return <OrderFeedCard data={el} key={el._id} />;
        })}
      </div>
    </section>
  );
}

export default OrderFeedOrders;
