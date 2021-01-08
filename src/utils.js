export const imgOptimizer = (img, size) => {
  if (img) {
    const newURL = img.match(/media\/screenshots/)
      ? img.replace("screenshots", `resize/${size}/-/screenshots`)
      : img.replace("games", `resize/${size}/-/games`)

    return newURL
  }
}
