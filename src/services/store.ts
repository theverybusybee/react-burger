import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "./socket-middleware/socket-middleware";
import tabReducer from "./reducers/tab";
import dropContainerReducer from "./reducers/drop-container-reducer";
import apiDataReducer from "./reducers/api-data";
import modalReducer from "./reducers/modal";
import authUserReducer from "./reducers/auth-reducer";
import feedDataReducer from "./reducers/feed-data-reducer";
import wsReducer from "./reducers/ws-reducer";
import { wsActions, wsUrl } from "./constants/ws-actions";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  tabReducer: tabReducer,
  dropContainerReducer: dropContainerReducer,
  apiDataReducer: apiDataReducer,
  modalReducer: modalReducer,
  authUserReducer: authUserReducer,
  feedDataReducer: feedDataReducer,
  wsReducer: wsReducer,
});

const preloadedState = {};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (thunkMiddleware) =>
    thunkMiddleware({
      serializableCheck: false,
    }).concat(socketMiddleware(wsUrl, wsActions)),
  preloadedState,
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = typeof store.dispatch;