export type TIngredient = {
  readonly _id?: string;
  readonly name?: string;
  readonly type?: string;
  readonly proteins?: number;
  readonly fat?: number;
  readonly carbohydrates?: number;
  readonly calories?: number;
  readonly price?: number;
  readonly image?: string;
  readonly image_mobile?: string;
  readonly image_large?: string;
  readonly __v?: number;
  readonly uuid?: string;
};

export type TOrders = {
  readonly _id: string;
  readonly ingredients: Array<string>;
  readonly status: string;
  readonly name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type TFetchRegister = {
  readonly name: string;
  readonly email: string;
  readonly password: string;
};

export type TFetchLogin = {
  readonly email: string;
  readonly password: string;
};

export type TApiUserData = {
  user: {
    readonly name: string;
    readonly email: string;
  };
};

export type TUserDataParams = {
  readonly name: string;
  readonly email: string;
};

export type TForgotPassword = {
  readonly email: string;
};

export type TResetPassword = {
  readonly password: string;
  readonly token: string;
};

export type useAppParams = {
  id: string;
};

export type TFeedOrders = {
  orders: [] | readonly TOrders[];
  total: number;
  totalToday: number;
};
