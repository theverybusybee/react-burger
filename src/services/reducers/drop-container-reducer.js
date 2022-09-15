import { SET_CONSTRUCTOR_ELEMENT, REMOVE_CONSTRUCTOR_ELEMENT, INCREASE_ITEM } from "../actions/drop-container";

const initialState = {
  constructorElements: [],
  qty: [],
}

 const dropContainerReducer = (state = initialState, { type, payload, id }) => {
  switch(type) {
    case SET_CONSTRUCTOR_ELEMENT: return {
        ...state,
        constructorElements: [...state.constructorElements, payload]
      }
    case INCREASE_ITEM: 
      return {
        ...state,
        qty: [...state.constructorElements].filter(item => item._id !== id).length
      }
      case REMOVE_CONSTRUCTOR_ELEMENT: 
      return {
        ...state,
        constructorElements: [...state.constructorElements].filter(item => item._id !== id )
      }
      default: return state
    }

  }

  export default dropContainerReducer