// Types
import { ALERT } from "../types";

const setShowing = (showing: boolean) => {
  return {
    type: ALERT.SET_SHOWING,
    payload: showing
  }
}

const setContent = (content: string) => {
  return {
    type: ALERT.SET_CONTENT,
    payload: content
  }
}

const setSeverity = (severity: string) => {
  return {
    type: ALERT.SET_SEVERITY,
    payload: severity
  }
}

export default { 
  setShowing,
  setContent,
  setSeverity
};