import BurgerConstructorStyles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import BunElements from "../bun-elements/bun-elements";
import StuffElements from "../stuff-elements/stuff-elements";

export default function BurgerConstructor({ ingredients }) {
  const stuffing = ingredients.filter((ingredient) => ingredient.type !== "bun");
  return (
    <section className={BurgerConstructorStyles.main}>
      <BunElements ingredients={ingredients[0]} >
        <div className={BurgerConstructorStyles.stuff}>
          {stuffing.map((stuff) => {
            return (
              <StuffElements
                ingredients={stuff}
                key={stuff._id}
              />
            );
          })}
        </div>
      </BunElements>
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

BurgerConstructor.propTypes = {
  ingredients:  PropTypes.arrayOf(PropTypes.object).isRequired,
}; 