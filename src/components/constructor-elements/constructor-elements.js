import React, { useContext, useEffect } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorElementsStyles from "./constructor-elements.module.css";
import { OrderContext } from "../../services/api-context";

const ConstructorElements = React.memo(({ ingredient, type, isLocked }) => {
  const { orderDispatcher } = useContext(OrderContext);

  useEffect(() => {
    orderDispatcher({
      type: "ADD",
      payload: ingredient.price,
    });

    orderDispatcher({
      type: "SET_INGREDIENTS",
      payload: ingredient._id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (type === "top") {
    return (
      <div className={ConstructorElementsStyles.elementWrapper}>
        <ConstructorElement
          type={type}
          isLocked={isLocked}
          text={`${ingredient.name} (верх)`}
          price={ingredient.price}
          thumbnail={ingredient.image}
        />
      </div>
    );
  } else if (type === "bottom") {
    return (
      <div className={ConstructorElementsStyles.elementWrapper}>
        <ConstructorElement
          type={type}
          isLocked={isLocked}
          text={`${ingredient.name} (низ)`}
          price={ingredient.price}
          thumbnail={ingredient.image}
        />
      </div>
    );
  } else if (type === "stuffing") {
    return (
      <div className={ConstructorElementsStyles.container}>
        <DragIcon />
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          isLocked={isLocked}
        />
      </div>
    );
  }
});

export default ConstructorElements;

/* 
ConstructorElements.propTypes = {
  ingredient: PropTypes.shape(ingredientType).isRequired,
};
*/
