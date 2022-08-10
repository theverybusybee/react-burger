import BurgerConstructorStyles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function SetConstructorElements(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "end",
      }}
    >
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${props.ingredients.name} (верх)`}
        price={props.ingredients.price}
        thumbnail={props.ingredients.image}
      />
      {props.children}
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${props.ingredients.name} (низ)`}
        price={props.ingredients.price}
        thumbnail={props.ingredients.image}
      />
    </div>
  );
}

function SetConstructorElementsStuff({ ingredients }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        paddingLeft: "0px",
        alignItems: "center",
      }}
    >
      <DragIcon />
      <ConstructorElement
        text={ingredients.name}
        price={ingredients.price}
        thumbnail={ingredients.image}
      />
    </div>
  );
}

export default function BurgerConstructor({ ingredients }) {
  const stuffing = ingredients.filter((ingredient) => ingredient.type != "bun");
  return (
    <section className={BurgerConstructorStyles.main}>
      <SetConstructorElements ingredients={ingredients[0]}>
        <div className={BurgerConstructorStyles.stuff}>
          {stuffing.map((stuff) => {
            return (
              <SetConstructorElementsStuff
                ingredients={stuff}
                key={stuff._id}
              />
            );
          })}
        </div>
      </SetConstructorElements>
      <div className={BurgerConstructorStyles.orderContainer}>
        <div className={BurgerConstructorStyles.priceContainer}>
          <p className="text text_type_digits-medium">620</p>
          <CurrencyIcon />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}
