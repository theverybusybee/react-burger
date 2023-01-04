import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorElementsStyles from "./constructor-elements.module.css";
import { REMOVE_CONSTRUCTOR_ELEMENT } from "../../services/constants/drop-container";
import { useMotionValue, Reorder } from "framer-motion";
import { TIngredient } from "../../services/types/data";
import { useAppDispatch } from "../../services/redux-hooks";

interface IConstructorElements {
  ingredient: TIngredient;
  type: string;
  isLocked: boolean;
}

const ConstructorElements = ({
  ingredient,
  type,
  isLocked,
}: IConstructorElements) => {
  const dispatch = useAppDispatch();
  const y = useMotionValue(0);

  const handleClose = () => {
    dispatch({ type: REMOVE_CONSTRUCTOR_ELEMENT, uuid: ingredient.uuid });
  };

  return (
    <>
      {type === "top" ? (
        <div className={ConstructorElementsStyles.elementWrapper}>
          <ConstructorElement
            type={type}
            isLocked={isLocked}
            text={`${ingredient.name} (верх)`}
            price={ingredient.price!}
            thumbnail={ingredient.image!}
          />
        </div>
      ) : type === "bottom" ? (
        <div className={ConstructorElementsStyles.elementWrapper}>
          <ConstructorElement
            type={type}
            isLocked={isLocked}
            text={`${ingredient.name} (низ)`}
            price={ingredient.price!}
            thumbnail={ingredient.image!}
          />
        </div>
      ) : type === "stuffing" ? (
        <Reorder.Item value={ingredient} id={ingredient.uuid} style={{ y }}>
          <div className={ConstructorElementsStyles.container}>
            <DragIcon type={"secondary"} />
            <ConstructorElement
              text={ingredient.name!}
              price={ingredient.price!}
              thumbnail={ingredient.image!}
              isLocked={isLocked}
              handleClose={handleClose}
            />
          </div>
        </Reorder.Item>
      ) : null}
    </>
  );
};

export default ConstructorElements;
