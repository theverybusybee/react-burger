import { useState, useEffect } from "react";
import AppStyle from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { ApiContext } from "../../services/api-context";

function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
    urlLink: "https://norma.nomoreparties.space/api/ingredients",
  });

  useEffect(() => {
    const getData = async () => {
      setState({ ...state, isLoading: true, hasError: false });
      try {
        const res = await fetch(state.urlLink);
        if (res.ok) {
          const resData = await res.json();
          setState({ ...state, data: resData.data, isLoading: false });
        } else return Promise.reject(`Что-то пошло не так: ${res.status}`);
      } catch {
        setState({ ...state, hasError: true });
      }
    };
    getData();
  }, []);

  const { data } = state;

  return (
    <div className={AppStyle.main}>
      <ApiContext.Provider value={data}>
        <AppHeader />
        {state.isLoading || state.hasError ? (
          <div className={AppStyle.loading}>
            <p className="text text_type_main-large text_color_inactive">
              Загрузка<span className={AppStyle.dotFlashing}></span>
            </p>
          </div>
        ) : (
          <>
            <BurgerIngredients />
            <BurgerConstructor />
          </>
        )}
      </ApiContext.Provider>
    </div>
  );
}

export default App;
