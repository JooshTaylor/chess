import { TimeControlType } from "./TimeControlType";

export interface TimeControl {
  type: TimeControlType;
  time: number;
  increment: number;
}