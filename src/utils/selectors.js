export const getWsConnected = state => state.wsReducer.wsConnected;
export const getOrders = store => store.wsReducer.allOrders || [];
