// Types
import { CARD } from "../types";

// Interfaces
import Pokemon from "../../interfaces/Pokemon";

const viewCard = (card: Pokemon | undefined) => {
  return {
    type: CARD.VIEW_CARD,
    payload: card
  }
}

export default { viewCard };