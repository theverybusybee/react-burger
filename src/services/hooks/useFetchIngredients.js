import { useEffect, useReducer } from "react";
import { apiStateReducer } from "../reducers/api-state-reducer";
import {
  FETCH_API_REQUEST,
  FETCH_API_SUCCESS,
  FETCH_API_ERROR,
} from "../constants/api-state";
import { baseUrl } from "../../utils/constants";

const useFetchIngredients = () => {
  const apiInitialState = {
    isLoading: false,
    hasError: false,
    data: [],
  };

  const [apiIngredientsState, apiDispatcher] = useReducer(
    apiStateReducer,
    apiInitialState
  );

  useEffect(() => {
    const getData = async () => {
      apiDispatcher({ type: FETCH_API_REQUEST });
      try {
        const res = await fetch(`${baseUrl}/ingredients`);
        if (res.ok) {
          const resData = await res.json();
          apiDispatcher({
            type: FETCH_API_SUCCESS,
            payload: resData.data,
          });
        } else return Promise.reject(`Что-то пошло не так: ${res.status}`);
      } catch (error) {
        apiDispatcher({
          type: FETCH_API_ERROR,
        });
      }
    };
    getData();
  }, []);

  return apiIngredientsState;
};

export default useFetchIngredients;
