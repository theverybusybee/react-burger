import { useEffect, useReducer } from "react";
import reducer from "../reducers/api-reducer";

const useFetchIngredients = (urlLink) => {
  const initialState = {
    isLoading: false,
    hasError: false,
    data: [],
  };

  const [apiIngredientsState, apiDispatcher] = useReducer(reducer, initialState);

  useEffect(() => {
    const getData = async () => {
      apiDispatcher({ type: "FETCH_API_REQUEST" });
      try {
        const res = await fetch(urlLink);
        if (res.ok) {
          const resData = await res.json();
          apiDispatcher({
            type: "FETCH_API_SUCCESS",
            payload: resData.data,
          });
        } else return Promise.reject(`Что-то пошло не так: ${res.status}`);
      } catch (error) {
        apiDispatcher({
          type: "FETCH_API_ERROR",
          payload: error,
        });
      }
    };
    getData();
  }, [urlLink]);

  return apiIngredientsState;
};

export default useFetchIngredients;
