import { combineReducers } from "redux"
import gamesReducers from "./gamesReducer"
import { gameDetailReducer } from "./gameDetailReducer"

const allReducers = combineReducers({
  games: gamesReducers,
  details: gameDetailReducer,
})
export default allReducers
