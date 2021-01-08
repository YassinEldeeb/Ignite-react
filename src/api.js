const baseUrl = "https://api.rawg.io/api/"
const currentYear = new Date().getFullYear()
const dayAndMonth = (type) => {
  let value
  if (type === "month") {
    value = new Date().getMonth() + 1
  } else if (type === "day") {
    value = new Date().getDate()
  }
  if (value < 10) {
    return `0${value}`
  } else {
    return value
  }
}
const currentMonth = dayAndMonth("month")
const currentDay = dayAndMonth("day")
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`

const popularGames = (page) =>
  `games?dates=${lastYear},${currentDate}&ordering=rating_count&page_size=10&page=${page}`
const upcomingGames = (page) =>
  `games?dates=${currentDate},${nextYear}&ordering=-added&page_size=10&page=${page}`
const searchedGames = (game_name, page) =>
  `games?search=${game_name}&ordering=rating_count&page_size=5&page=${page}`

export const popularGamesURL = (page) => baseUrl + popularGames(page)
export const upcomingGamesURL = (page) => baseUrl + upcomingGames(page)
export const searchedGamesURL = (game_name, page) =>
  baseUrl + searchedGames(game_name, page)
//Game Details
export const gameDetails = (id) => baseUrl + `games/${id}`
export const gameScreenshots = (id) => baseUrl + `games/${id}/screenshots`
