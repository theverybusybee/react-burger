import ProfileOrdersStyles from "./profile-orders.module.css";
import OrderFeedOrderCard from "../../components/order-feed-order-card/order-feed-order-card";

function ProfileOrders({data}) {
  return <section className={ProfileOrdersStyles.main}>
      
      <div
        className={` ${ProfileOrdersStyles.ordersContainer} custom-scroll`}
        id="scroll"
      >
        {data.orders.map((el) => {
          return <OrderFeedOrderCard data={el} />;
        })}
      </div>
    </section>;
}

export default ProfileOrders;
