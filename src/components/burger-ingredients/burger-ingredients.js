import BurgerIngredientsStyles from "./burger-ingredients.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import PropTypes from 'prop-types';
import Tabs from "../tabs/tabs";

export default function BurgerIngredients({ingredients}) {
  const buns = ingredients.filter((bun) => bun.type === "bun");
  const sauces = ingredients.filter((sauce) => sauce.type === "sauce");
  const main = ingredients.filter((main) => main.type === "main");

  return (
    <section className={BurgerIngredientsStyles.main}>
      <h1 className={`${BurgerIngredientsStyles.title} text text_type_main-large`}>
        Соберите бургер
      </h1>
      <Tabs />
      <div className={BurgerIngredientsStyles.ingredientsContainer}>
        <h2
          className={`${BurgerIngredientsStyles.ingredientSectionName} text text_type_main-medium`}
          id="buns"
        >
          Булки
        </h2>
        <ul className={BurgerIngredientsStyles.cardsContainer}>
          {buns.map((ingredient) => {
            return <IngredientCard ingredient={ingredient} key={ingredient._id} />;
          })}
        </ul>

        <h2
          className={`${BurgerIngredientsStyles.ingredientSectionName} text text_type_main-medium`}
          id="sauces"
        >
          Соусы
        </h2>
        <ul className={BurgerIngredientsStyles.cardsContainer}>
          {sauces.map((ingredient) => {
            return <IngredientCard ingredient={ingredient} key={ingredient._id} />;
          })}
        </ul>

        <h2
          className={`${BurgerIngredientsStyles.ingredientSectionName} text text_type_main-medium`}
          id="main"
        >
          Начинки
        </h2>
        <ul className={BurgerIngredientsStyles.cardsContainer}>
          {main.map((ingredient) => {
            return <IngredientCard ingredient={ingredient} key={ingredient._id} />;
          })}
        </ul>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients:  PropTypes.arrayOf(PropTypes.object).isRequired,
}; 