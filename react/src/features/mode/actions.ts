import { Mode, setMode } from "./modeModel";

export function setModeLiveLocation() {
  return setMode(Mode.LiveLocation);
}

export function setModeAllocation() {
  return setMode(Mode.Allocation);
}

export function setModeTrip() {
  return setMode(Mode.Trip);
}

export function setModeHistory() {
  return setMode(Mode.History);
}
