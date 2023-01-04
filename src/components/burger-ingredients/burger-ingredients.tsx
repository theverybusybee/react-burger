import { useEffect, useRef } from "react";
import BurgerIngredientsStyles from "./burger-ingredients.module.css";
import Tabs from "../tabs/tabs";
import IngredientsFilter from "../ingredients-filter/ingredients-filter";
import { TAB_NAME, TAB_SWITCH } from "../../services/constants/tab";
import { useAppDispatch, useAppSelector } from "../../services/redux-hooks";

export default function BurgerIngredients() {
  const dispatch = useAppDispatch();

  function getDistanceBetweenPoints(
    element: HTMLElement,
    viewportCoords: DOMRect
  ) {
    const coordsChild = element.getBoundingClientRect();
    return Math.abs(viewportCoords.top - coordsChild.top);
  }

  const currentTab = useAppSelector((state) => state.tabReducer.currentTab);
  const bunRef = useRef<HTMLInputElement>(null);
  const sauceRef = useRef<HTMLInputElement>(null);
  const stuffingRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function changeTab() {
      const viewportCoords = document
        .getElementById("scroll")
        ?.getBoundingClientRect();
      getDistanceBetweenPoints(bunRef.current!, viewportCoords!) <
      getDistanceBetweenPoints(sauceRef.current!, viewportCoords!)
        ? dispatch({
            type: TAB_SWITCH,
            value: TAB_NAME.BUN,
          })
        : getDistanceBetweenPoints(sauceRef.current!, viewportCoords!) <
          getDistanceBetweenPoints(stuffingRef.current!, viewportCoords!)
        ? dispatch({
            type: TAB_SWITCH,
            value: TAB_NAME.SAUCE,
          })
        : dispatch({
            type: TAB_SWITCH,
            value: TAB_NAME.STUFFING,
          });
    }

    const scrollSection = document.getElementById("scroll");
    scrollSection?.addEventListener("scroll", changeTab);
    return () => scrollSection?.removeEventListener("scroll", changeTab);
  }, [dispatch]);

  const onTabClick = (e: string) => {
    dispatch({
      type: TAB_SWITCH,
      value: e,
    });
    const paragraph = document.getElementById(e);
    paragraph?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={BurgerIngredientsStyles.main}>
      <h1
        className={`${BurgerIngredientsStyles.title} text text_type_main-large`}
      >
        Соберите бургер
      </h1>
      <Tabs currentTab={currentTab} onTabClick={onTabClick} />
      <div
        className={` ${BurgerIngredientsStyles.ingredientsContainer} custom-scroll`}
        id="scroll"
      >
        <h2
          className={`${BurgerIngredientsStyles.ingredientSectionName} text text_type_main-medium`}
          id={TAB_NAME.BUN}
          ref={bunRef}
        >
          Булки
        </h2>
        <ul className={BurgerIngredientsStyles.cardsContainer}>
          <IngredientsFilter type="bun" />
        </ul>

        <h2
          className={`${BurgerIngredientsStyles.ingredientSectionName} text text_type_main-medium`}
          id={TAB_NAME.SAUCE}
          ref={sauceRef}
        >
          Соусы
        </h2>
        <ul className={BurgerIngredientsStyles.cardsContainer}>
          <IngredientsFilter type={"sauce"} />
        </ul>

        <h2
          ref={stuffingRef}
          className={`${BurgerIngredientsStyles.ingredientSectionName} text text_type_main-medium`}
          id={TAB_NAME.STUFFING}
        >
          Начинки
        </h2>
        <ul className={BurgerIngredientsStyles.cardsContainer}>
          <IngredientsFilter type={"main"} />
        </ul>
      </div>
    </section>
  );
}
