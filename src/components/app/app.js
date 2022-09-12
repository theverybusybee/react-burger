import AppStyle from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import useFetchIngredients from "../../services/hooks/useFetchIngredients";

function App() {
  const { hasError, isLoading, data } = useFetchIngredients();

  if (hasError || isLoading || !data.length) {
    return (
      <div className={AppStyle.main}>
        <AppHeader />
        <div className={AppStyle.loading}>
          <p className="text text_type_main-large text_color_inactive">
            Загрузка<span className={AppStyle.dotFlashing}></span>
          </p>
        </div>
      </div>
    );
  } else
    return (
      <div className={AppStyle.main}>
          <AppHeader />
          <BurgerIngredients />
          <BurgerConstructor />
      </div>
    );
}

export default App;
