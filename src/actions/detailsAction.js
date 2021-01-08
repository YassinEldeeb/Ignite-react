import axios from "axios"
import { gameDetails, gameScreenshots } from "../api"

export const detailsAction = (id) => async (dispatch) => {
  dispatch({ type: "LOADING_DETAIL" })
  const detailsData = await axios.get(gameDetails(id))
  const screenshotsData = await axios.get(gameScreenshots(id))
  dispatch({
    type: "GET_DETAIL",
    details: detailsData.data,
    screenshots: screenshotsData.data.results,
    isLoading: false,
  })
}
