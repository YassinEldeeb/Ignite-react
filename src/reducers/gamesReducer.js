const initialState = {
  popular: [],
  upcoming: [],
  searched: [],
  fetched: true,
}
const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_POPULAR_GAMES":
      action.payload.popular.forEach((e) => {
        state.popular.push(e)
      })
      state.upcoming = []
      state.searched = []
      state.fetched = true
      return {
        ...state,
      }
    case "FETCH_UPCOMING_GAMES":
      state.popular = []
      state.searched = []
      action.payload.upcoming.forEach((e) => {
        state.upcoming.push(e)
      })
      state.fetched = true
      return {
        ...state,
      }
    case "FETCH_SEARCHED":
      state.popular = []
      state.upcoming = []
      state.fetched = true
      action.searched.forEach((e) => {
        state.searched.push(e)
      })
      return state
    case "CLEAR_SEARCHED":
      state.popular = []
      state.upcoming = []
      state.searched = []
      state.fetched = true
      return state
    case "CLEAR_FETCHING":
      return {
        ...state,
        fetched: [],
      }
    case "FETCHING_GAMES":
      return {
        ...state,
        fetched: false,
      }
    default:
      return { ...state }
  }
}
export default gamesReducer
