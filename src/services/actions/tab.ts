import { TAB_SWITCH } from "../constants/tab";

export interface ISwitchTab {
  value: string;
  readonly type: typeof TAB_SWITCH;
  currentTab: string;
}

export type TModalsActions =
  | ISwitchTab;