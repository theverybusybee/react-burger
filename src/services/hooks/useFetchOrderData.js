import { useEffect, useReducer } from "react";
import reducer from "../reducers/api-reducer";

const useFetchOrderDetails = (urlLink) => {
  const initialState = {
    isLoading: false,
    hasError: false,
    data: {},
  };

  const [postData, postDataDispatcher] = useReducer(reducer, initialState);

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredients: ["60d3b41abdacab0026a733cc", "60d3b41abdacab0026a733ce"],
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
  }, [urlLink]);

  return postData;
};

export default useFetchOrderDetails;
