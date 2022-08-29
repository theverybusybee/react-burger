import AppStyle from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { ApiContext } from "../../services/api-context";
import useFetchIngredients from "../../services/hooks/useFetchIngredients";

function App() {
  const { hasError, isLoading, data } = useFetchIngredients(
    "https://norma.nomoreparties.space/api/ingredients"
  );

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
        <ApiContext.Provider value={data}>
          <AppHeader />
          <BurgerIngredients />
          <BurgerConstructor />
        </ApiContext.Provider>
      </div>
    );
}

export default App;
