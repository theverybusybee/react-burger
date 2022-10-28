import ProfileOrdersStyles from "./profile-orders.module.css";
import OrderFeedCard from "../../components/order-feed-card/order-feed-card";
import { useSelector } from "react-redux";

function ProfileOrders() {
  const orders = useSelector((state) => state.wsReducer.allOrders.orders);

  return (
    orders && (
      <section className={ProfileOrdersStyles.main}>
        <div
          className={` ${ProfileOrdersStyles.ordersContainer} custom-scroll`}
          id="scroll"
        >
          {orders.map((el) => {
            return <OrderFeedCard data={el} key={el._id} />;
          })}
        </div>
      </section>
    )
  );
}

export default ProfileOrders;
