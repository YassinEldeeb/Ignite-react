const initialState = {
  game: [],
  screenshots: [],
  isLoading: true,
  loading: false,
}
export const gameDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DETAIL":
      return {
        ...state,
        game: action.details,
        screenshots: action.screenshots,
        isLoading: action.isLoading,
        loading: false,
      }
    case "CLEAN_DETAIL":
      return {
        ...state,
        game: [],
        screenshots: [],
        isLoading: [],
      }
    case "LOADING_DETAIL":
      return {
        ...state,
        isLoading: true,
        loading: true,
      }
    default:
      return { ...state }
  }
}
