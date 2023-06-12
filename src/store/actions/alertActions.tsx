// Types
import { ALERT } from "../types";

const setShowing = () => {
  return {
    type: ALERT.SET_SHOWING
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