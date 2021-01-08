import axios from "axios"
import { popularGamesURL, upcomingGamesURL, searchedGamesURL } from "../api"

export const loadPopularGames = (page = 1) => async (dispatch) => {
  dispatch({ type: "FETCHING_GAMES" })
  const popularGamesData = await axios.get(popularGamesURL(page))

  dispatch({
    type: "FETCH_POPULAR_GAMES",
    payload: {
      popular: popularGamesData.data.results,
    },
  })
}
export const loadUpcomingGames = (page = 1) => async (dispatch) => {
  dispatch({ type: "FETCHING_GAMES" })
  const upcomingGamesData = await axios.get(upcomingGamesURL(page))
  dispatch({
    type: "FETCH_UPCOMING_GAMES",
    payload: {
      upcoming: upcomingGamesData.data.results,
    },
  })
}
export const loadSearchedGames = (game_name, page = 1) => async (dispatch) => {
  dispatch({ type: "FETCHING_GAMES" })
  const searchedGamesData = await axios.get(searchedGamesURL(game_name, page))
  dispatch({
    type: "FETCH_SEARCHED",
    searched: searchedGamesData.data.results,
  })
}
