import { TAB_SWITCH } from "../constants/tab";

export interface ISwitchTab {
  readonly type: typeof TAB_SWITCH;
  currentTab: string;
}

export type TModalsActions =
  | ISwitchTab;