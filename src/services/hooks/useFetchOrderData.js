import { useEffect, useReducer } from "react";
import reducer from "../reducers/api-reducer";

const useFetchOrderDetails = (urlLink, ingredients) => {
  const initialState = {
    isLoading: false,
    hasError: false,
    data: {},
  };

  const [postData, postDataDispatcher] = useReducer(reducer, initialState);

  const ingridientsId = ingredients.map((ingredient) => {
    return ingredient;
  });

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredients: ingridientsId,
      }),
    };

    const getData = async () => {
      postDataDispatcher({ type: "FETCH_API_REQUEST" });
      try {
        const res = await fetch(urlLink, requestOptions);
        if (res.ok) {
          const data = await res.json();
          postDataDispatcher({
            type: "FETCH_API_SUCCESS",
            payload: data,
          });
        } else return Promise.reject(`Что-то пошло не так: ${res.status}`);
      } catch (error) {
        postDataDispatcher({
          type: "FETCH_API_ERROR",
          payload: error,
        });
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlLink]);

  return postData;
};

export default useFetchOrderDetails;
