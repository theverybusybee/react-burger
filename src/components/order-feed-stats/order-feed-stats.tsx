import { memo } from "react";
import { TFeedOrders } from "../../services/types/data";
import feedStatsStyles from "./order-feed-stats.module.css";

interface IOrderFeedStats {
  data: TFeedOrders,
} 

function OrderFeedStats({ data }: IOrderFeedStats) {

  const isReady = data.orders.filter((el) => el.status === "done");
  const inProcess = data.orders.filter((el) => el.status === "inProcess");
  return (
    <div className={feedStatsStyles.container}>
      <div className={feedStatsStyles.orderIsReady}>
        <h2 className={`${feedStatsStyles.title} "text text_type_main-medium"`}>
          Готовы:
        </h2>
        <div
          className={`${feedStatsStyles.readyOrders} text text_type_digits-default`}
        >
          {isReady.slice(0, 10).map((el) => {
            return <p key={el.number}>{el.number}</p>;
          })}
        </div>
      </div>
      <div className={feedStatsStyles.orderInProcess}>
        <h2 className={`${feedStatsStyles.title} "text text_type_main-medium"`}>
          В работе:
        </h2>
        <div
          className={`${feedStatsStyles.inProcessOrders} text text_type_digits-default`}
        >
          {inProcess.map((el) => {
            return <p key={el.number}>{el.number}</p>;
          })}
        </div>
      </div>
      <div className={feedStatsStyles.executedOrdersContainer}>
        <h2 className={`${feedStatsStyles.title} "text text_type_main-medium"`}>
          Выполнено за все время:
        </h2>
        <p
          className={`${feedStatsStyles.executedOrders} text text_type_digits-large`}
        >
          {data.total}
        </p>
      </div>
      <div className={feedStatsStyles.executedTodayContainer}>
        <h2 className={`${feedStatsStyles.title} "text text_type_main-medium"`}>
          Выполнено за сегодня:
        </h2>
        <p
          className={`${feedStatsStyles.executedOrders} text text_type_digits-large`}
        >
          {data.totalToday}
        </p>
      </div>
    </div>
  );
}

export default memo(OrderFeedStats);
