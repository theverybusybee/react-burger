import ProfileOrdersStyles from "./profile-orders.module.css";
import OrderFeedCard from "../../components/order-feed-card/order-feed-card";
import { useAppSelector } from "../../services/redux-hooks";

function ProfileOrders() {
  const orders = useAppSelector((state) => state.wsReducer.allOrders.orders);
  const upToDateOrders = [...orders].reverse();

  return upToDateOrders ? (
    <section className={ProfileOrdersStyles.main}>
      <div
        className={` ${ProfileOrdersStyles.ordersContainer} custom-scroll`}
        id="scroll"
      >
        {upToDateOrders.map((el) => {
          return <OrderFeedCard data={el} key={el._id} />;
        })}
      </div>
    </section>
  ) : null;
}

export default ProfileOrders;
