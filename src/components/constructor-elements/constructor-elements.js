import React, { useEffect } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorElementsStyles from "./constructor-elements.module.css";
import { useDispatch } from "react-redux";
import { ADD_TO_PRICE } from "../../services/actions/actions";

const ConstructorElements = React.memo(({ ingredient, type, isLocked }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: ADD_TO_PRICE,
      payload: ingredient.price,
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
