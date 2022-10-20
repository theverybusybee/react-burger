import feedOrdersStyles from "./order-feed-orders.module.css";
import OrderFeedOrderCard from "../order-feed-order-card/order-feed-order-card";

const data = [
  {
    orderNumber: "#034535",
    orderTime: "Сегодня, 16:20 i-GMT+3",
    orderName: "Death Star Starship Main бургер",
    orderPrice: 480,
    orderIngredients: [
      {
        orderImage: "https://code.s3.yandex.net/react/code/bun-02.png",
      },
      {
        orderImage: "https://code.s3.yandex.net/react/code/meat-04.png",
      },
      {
        orderImage: "https://code.s3.yandex.net/react/code/meat-01.png",
      },
      {
        orderImage: "https://code.s3.yandex.net/react/code/sauce-02.png",
      },
      {
        orderImage: "https://code.s3.yandex.net/react/code/meat-02.png",
      },
    ],
  },
  {
    orderNumber: "#034534",
    orderTime: "Сегодня, 13:20 i-GMT+3",
    orderName: "Interstellar бургер",
    orderPrice: 560,
    orderIngredients: [
      {
        orderImage: "https://code.s3.yandex.net/react/code/core.png",
      },
      {
        orderImage: "https://code.s3.yandex.net/react/code/bun-01.png",
      },
      {
        orderImage: "https://code.s3.yandex.net/react/code/meat-01.png",
      },
      {
        orderImage: "https://code.s3.yandex.net/react/code/cheese.png",
      },
      {
        orderImage: "https://code.s3.yandex.net/react/code/meat-02.png",
      },
    ],
  },
  {
    orderNumber: "#034535",
    orderTime: "Сегодня, 16:20 i-GMT+3",
    orderName: "Death Star Starship Main бургер",
    orderPrice: 480,
    orderIngredients: [
      {
        orderImage: "https://code.s3.yandex.net/react/code/bun-02.png",
      },
      {
        orderImage: "https://code.s3.yandex.net/react/code/meat-04.png",
      },
      {
        orderImage: "https://code.s3.yandex.net/react/code/meat-01.png",
      },
      {
        orderImage: "https://code.s3.yandex.net/react/code/sauce-02.png",
      },
      {
        orderImage: "https://code.s3.yandex.net/react/code/meat-02.png",
      },
    ],
  },
  {
    orderNumber: "#034534",
    orderTime: "Сегодня, 13:20 i-GMT+3",
    orderName: "Interstellar бургер",
    orderPrice: 560,
    orderIngredients: [
      {
        orderImage: "https://code.s3.yandex.net/react/code/core.png",
      },
      {
        orderImage: "https://code.s3.yandex.net/react/code/bun-01.png",
      },
      {
        orderImage: "https://code.s3.yandex.net/react/code/meat-01.png",
      },
      {
        orderImage: "https://code.s3.yandex.net/react/code/cheese.png",
      },
      {
        orderImage: "https://code.s3.yandex.net/react/code/meat-02.png",
      },
    ],
  },
  {
    orderNumber: "#034535",
    orderTime: "Сегодня, 16:20 i-GMT+3",
    orderName: "Death Star Starship Main бургер",
    orderPrice: 480,
    orderIngredients: [
      {
        orderImage: "https://code.s3.yandex.net/react/code/bun-02.png",
      },
      {
        orderImage: "https://code.s3.yandex.net/react/code/meat-04.png",
      },
      {
        orderImage: "https://code.s3.yandex.net/react/code/meat-01.png",
      },
      {
        orderImage: "https://code.s3.yandex.net/react/code/sauce-02.png",
      },
      {
        orderImage: "https://code.s3.yandex.net/react/code/meat-02.png",
      },
    ],
  },
  {
    orderNumber: "#034534",
    orderTime: "Сегодня, 13:20 i-GMT+3",
    orderName: "Interstellar бургер",
    orderPrice: 560,
    orderIngredients: [
      {
        orderImage: "https://code.s3.yandex.net/react/code/core.png",
      },
      {
        orderImage: "https://code.s3.yandex.net/react/code/bun-01.png",
      },
      {
        orderImage: "https://code.s3.yandex.net/react/code/meat-01.png",
      },
      {
        orderImage: "https://code.s3.yandex.net/react/code/cheese.png",
      },
      {
        orderImage: "https://code.s3.yandex.net/react/code/meat-02.png",
      },
    ],
  },
];

function OrderFeedOrders() {
  return (
    <section className={feedOrdersStyles.main}>
      <h1 className={`${feedOrdersStyles.title} text text_type_main-large`}>
        Лента заказов
      </h1>
      <div
        className={` ${feedOrdersStyles.ordersContainer} custom-scroll`}
        id="scroll"
      >
        {data.map((el) => {
          return <OrderFeedOrderCard data={el} />;
        })}
      </div>
    </section>
  );
}

export default OrderFeedOrders;
