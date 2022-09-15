import {
  SET_CONSTRUCTOR_ELEMENT,
  REMOVE_CONSTRUCTOR_ELEMENT,
  INCREASE_ITEM,
  ADD_BOARD,
  FILTER_INGREDIENTS,
  FILTER_BUNS,
  SET_TOTAL_PRICE,
  RESET_TOTAL_PRICE
} from "../actions/draggable-ingredient";

const initialState = {
  constructorElements: [],
  qty: [],
  constructorIngredients: [],
  constructorBuns: [],
  totalPrice: 0,
};

const dropContainerReducer = (state = initialState, { type, payload, id }) => {
  switch (type) {
    case SET_CONSTRUCTOR_ELEMENT:
      return {
        ...state,
        constructorElements: [...state.constructorElements, payload],
      };
    case INCREASE_ITEM:
      return {
        ...state,
        qty: [...state.constructorElements].filter((item) => item._id !== id)
          .length,
      };
    // case ADD_BOARD:
    //   return {
    //     ...state,
    //     constructorElementsFilter: [...state.constructorElements].map(
    //       (el) => (el.board = "default")
    //     ),
    //   };
    case FILTER_INGREDIENTS:
      return {
        ...state,
        constructorIngredients: [...state.constructorElements].filter(
          (el) => el.type === "main" || el.type === "sauce"
        ),
      };
    // case FILTER_BUNS:
    //   return {
    //     ...state,
    //     constructorBuns: [...state.constructorElements].filter(
    //       (el) => el.type === "bun"
    //     ),
    //   };
    case REMOVE_CONSTRUCTOR_ELEMENT:
      return {
        ...state,
        constructorElements: [...state.constructorElements].filter(
          (item) => item._id !== id
        ),
      };
    case SET_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: [...state.constructorElements].map(el => el.price).reduce((a, b) => a + b)
      };
      case RESET_TOTAL_PRICE: {
        return {
          ...state,
          totalPrice: initialState.totalPrice
        }
      }
    default:
      return state;
  }
};

export default dropContainerReducer;
