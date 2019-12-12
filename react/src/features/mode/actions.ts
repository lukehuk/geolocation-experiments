import { Mode, setMode } from "./modeModel";

export function setModeAllocation() {
  return setMode(Mode.Allocation);
}

export function setModeTrip() {
  return setMode(Mode.Trip);
}

export function setModeHistory() {
  return setMode(Mode.History);
}
