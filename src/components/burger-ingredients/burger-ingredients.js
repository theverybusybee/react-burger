import { useState } from "react";
import BurgerIngredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "../ingredient-card/ingredient-card";

export default function BurgerIngredients({ingredients}) {
  const buns = ingredients.filter((bun) => bun.type === "bun");
  const sauces = ingredients.filter((sauce) => sauce.type === "sauce");
  const main = ingredients.filter((main) => main.type === "main");

  return (
    <section className={BurgerIngredientsStyles.main}>
      <h1 className={`${BurgerIngredientsStyles.title} text text_type_main-large`}>
        Соберите бургер
      </h1>
      <SetTab />
      <div className={BurgerIngredientsStyles.ingredientsContainer}>
        <h2
          className={`${BurgerIngredientsStyles.ingredientSectionName} text text_type_main-medium`}
          id="buns"
        >
          Булки
        </h2>
        <ul className={BurgerIngredientsStyles.cardsContainer}>
          {buns.map((ingredient) => {
            return <IngredientCard ingredients={ingredient} key={ingredient._id} />;
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
            return <IngredientCard ingredients={ingredient} key={ingredient._id} />;
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
            return <IngredientCard ingredients={ingredient} key={ingredient._id} />;
          })}
        </ul>
      </div>
    </section>
  );
}

function SetTab() {
  const [current, setCurrent] = useState("bun");
  return (
    <div style={{ display: "flex" }}>
      <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sause" active={current === "sause"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="main" active={current === "main"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}
