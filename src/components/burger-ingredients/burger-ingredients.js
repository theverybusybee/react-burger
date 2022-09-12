import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import BurgerIngredientsStyles from "./burger-ingredients.module.css";
import Tabs from "../tabs/tabs";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import IngredientsFilter from "../ingredients-filter/ingredients-filter";
import { useSelector } from "react-redux";
import { getIngredients,DELETE_MODAL_INGREDIENT, SET_MODAL_INGREDIENT } from "../../services/actions/actions";

export default function BurgerIngredients() {

  const currentModalIngredient = useSelector(state => state.reducer.currentModalIngredient)
  console.log(currentModalIngredient)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const [isVisible, setVisability] = useState(false);

  function handleOpenModal(ingredient) {
    dispatch({ type: SET_MODAL_INGREDIENT, payload: ingredient })
    setVisability(true);
  }

  function handleCloseModal() {
    setVisability(false);
    dispatch({ type: DELETE_MODAL_INGREDIENT });
  }

  const modalIngredientDetails = (
    <Modal onClose={handleCloseModal} isOpened={isVisible}>
      <IngredientDetails ingredient={currentModalIngredient} />
    </Modal>
  );

  return (
    <section className={BurgerIngredientsStyles.main}>
      <h1
        className={`${BurgerIngredientsStyles.title} text text_type_main-large`}
      >
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
          <IngredientsFilter type="bun" openModal={handleOpenModal} qty={1} />
        </ul>

        <h2
          className={`${BurgerIngredientsStyles.ingredientSectionName} text text_type_main-medium`}
          id="sauces"
        >
          Соусы
        </h2>
        <ul className={BurgerIngredientsStyles.cardsContainer}>
          <IngredientsFilter
            type={"sauce"}
            openModal={handleOpenModal}
            qty={1}
          />
        </ul>

        <h2
          className={`${BurgerIngredientsStyles.ingredientSectionName} text text_type_main-medium`}
          id="main"
        >
          Начинки
        </h2>
        <ul className={BurgerIngredientsStyles.cardsContainer}>
          <IngredientsFilter
            type={"main"}
            openModal={handleOpenModal}
            qty={1}
          />
        </ul>
        {isVisible && modalIngredientDetails}
      </div>
    </section>
  );
}
