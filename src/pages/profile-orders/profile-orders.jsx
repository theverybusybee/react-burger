import ProfileOrdersStyles from "./profile-orders.module.css";
import OrderFeedCard from "../../components/order-feed-card/order-feed-card";

function ProfileOrders({ data }) {
  return (
    <section className={ProfileOrdersStyles.main}>
      <div
        className={` ${ProfileOrdersStyles.ordersContainer} custom-scroll`}
        id="scroll"
      >
        {data.orders.map((el) => {
          return <OrderFeedCard data={el} />;
        })}
      </div>
    </section>
  );
}

export default ProfileOrders;
