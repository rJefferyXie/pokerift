import COUNTER from "../types";

const increment = () => {
  return {
    type: COUNTER.INCREMENT
  }
}

const decrement = () => {
  return {
    type: COUNTER.DECREMENT
  }
}  

export default {increment, decrement}