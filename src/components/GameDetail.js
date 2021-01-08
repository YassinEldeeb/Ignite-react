//Fix duplicate platform icons and add links to download games
import React, { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { motion } from "framer-motion"
import playIcon from "../img/playButton.svg"
import { useHistory, useLocation } from "react-router-dom"
import { imgOptimizer } from "../utils"
//Import Images
import playstation from "../img/playstation.svg"
import xbox from "../img/xBox.svg"
import Nintendo from "../img/switch.svg"
import steam from "../img/steam.svg"
import gamepad from "../img/gamePad.svg"
import apple from "../img/apple.svg"
import playstore from "../img/playstore.svg"
import epicGames from "../img/epic-games.svg"
//Stars Images
import fullStar from "../img/yellowStar.svg"
import halfStar from "../img/halfStar.svg"
import emptyStar from "../img/greyStar.svg"

const GameDetail = ({ lastSearch }) => {
  const { game, screenshots, isLoading } = useSelector((state) => state.details)
  screenshots.length = 5
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [videoAvailable, setVideoAvailable] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const videoRef = useRef(null)
  const galleryImgRef = useRef(null)
  const dispatch = useDispatch()
  const thumbnailVideoHandler = () => {
    if (game.clip) {
      setVideoPlaying(!videoPlaying)
    }
  }
  const [currentScreen, setCurrentScreen] = useState({
    id: game.id,
    image: imgOptimizer(game.background_image, 1280),
  })
  useEffect(() => {
    if (game.tags) {
      game.tags.length = 4
    }
  }, [game.tags])
  useEffect(() => {
    setCurrentScreen({
      id: game.id,
      image: imgOptimizer(game.background_image, 1280),
    })
  }, [game.background_image, game.id])

  const changeScreenHandler = (key) => {
    const image = screenshots.find((e) => e.id === key)
    setCurrentScreen({ image: imgOptimizer(image.image, 1280), id: image.id })
    setVideoPlaying(false)
  }
  const playVideoHandler = () => {
    videoRef.current.play().catch((e) => {
      console.log("Can't Play right now")
    })
  }
  const history = useHistory()
  const location = useLocation()
  const pathId = parseInt(location.pathname.split("/")[2])
  const secondPath = location.pathname.split("/")[1]

  const closeDetailCard = () => {
    if (secondPath === "searched_game") {
      dispatch({
        type: "CLEAN_DETAIL",
      })
    }
    if (secondPath === "games") history.push("/")
    else if (secondPath === "searched_game")
      history.push(`${lastSearch !== "" ? `/searched/${lastSearch}` : "/"}`)
  }

  const getBackHandler = (e) => {
    if (e.target.classList.contains("shadow-div")) {
      closeDetailCard()
    }
  }

  useEffect(() => {
    if (game.id === parseInt(pathId) && game.clip) {
      setVideoAvailable(true)
    }
  }, [game.clip])
  const setImageLoader = () => {
    setImageLoading(true)
  }
  const removeImageLoader = () => {
    setImageLoading(false)
  }

  const platformsIcons = () => {
    let icons = []
    game.stores.map((each) => {
      if (each.url.includes("playstation")) {
        icons = [...icons, { icon: playstation, url: each.url }]
        return ""
      } else if (each.url.includes("microsoft")) {
        icons = [...icons, { icon: xbox, url: each.url }]
        return ""
      } else if (each.url.includes("nintendo")) {
        icons = [...icons, { icon: Nintendo, url: each.url }]
        return ""
      } else if (each.url.includes("epicgames")) {
        icons = [...icons, { icon: epicGames, url: each.url }]
        return ""
      } else if (each.url.includes("steampowered")) {
        icons = [...icons, { icon: steam, url: each.url }]
        return ""
      } else if (each.url.includes("apple")) {
        icons = [...icons, { icon: apple, url: each.url }]
        return ""
      } else if (each.url.includes("google")) {
        icons = [...icons, { icon: playstore, url: each.url }]
        return ""
      } else {
        icons = [...icons, { icon: gamepad, url: each.url }]
        return ""
      }
    })
    return [icons]
  }
  const ageRating = (ageRating) => {
    switch (ageRating) {
      case "Everyone":
        return "3+, Everyone"
      case "Everyone 10+":
        return "10+, Everyone 10+"
      case "Teen":
        return "13+, Teen"
      case "Mature":
        return "17+, Mature"
      case "Adults Only":
        return "18+, Adults Only"
      case "not":
        return "Rating Pending"
      default:
        return "Rating Pending"
    }
  }
  const getStars = () => {
    const stars = []
    const renderedStars = []
    const rating = Math.round(game.rating * 10) / 10
    for (let i = 0.5; i < 5; i += 0.5) {
      if (rating >= i) {
        stars.push(0.5)
      }
    }
    if (Number.isInteger(stars.length / 2)) {
      for (let i = 0; i < stars.length / 2; i++) {
        renderedStars.push(
          <img
            alt='fullstar'
            key={`fullStar${renderedStars.length}`}
            src={fullStar}
          />
        )
      }
    } else {
      for (let i = 0; i < Math.floor(stars.length / 2); i++) {
        renderedStars.push(
          <img
            alt='fullstar'
            key={`fullStar${renderedStars.length}`}
            src={fullStar}
          />
        )
      }
      renderedStars.push(
        <img
          alt='halfstar'
          key={`halfStar${renderedStars.length}`}
          src={halfStar}
        />
      )
    }

    while (renderedStars.length < 5) {
      for (let i = 0; i < 5 - renderedStars.length; i++) {
        renderedStars.push(
          <img
            key={`emptyStar${renderedStars.length}`}
            alt='emptyStar'
            src={emptyStar}
          />
        )
      }
    }
    return renderedStars
  }
  return (
    <>
      {!isLoading && (
        <ShadowDiv className='shadow-div' onClick={getBackHandler}>
          <DetailsCard
            layoutId={pathId}
            playIcon={playIcon}
            className='detailsCard'
          >
            <svg
              onClick={() => {
                closeDetailCard()
              }}
              id='closeCard'
              viewBox='0 0 51 55'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle cx='25.5' cy='29.5' r='25.5' fill='#252525' />
              <path
                d='M29.8169 40.37L25.4139 33.821L20.8629 40.37L17.1999 38.335L23.0089 30.824L17.4959 24.016L21.6029 21.204L25.6359 27.457L30.0019 21.13L33.5909 23.35L28.0779 30.528L33.9239 37.558L29.8169 40.37Z'
                fill='#e9e9e9'
              />
            </svg>

            <p>
              {game.tags.map((each) => (
                <span key={`hash${each.id}`}>{`#${each.name}`}</span>
              ))}
            </p>
            <div className='details_intro'>
              <div className='name_and_rating'>
                <h1>{game.name}</h1>
                <h4>
                  Rating: {game.rating}
                  <p>({game.ratings_count})</p>
                </h4>
                <div className='details_stars'>{getStars()}</div>
              </div>
              <div className='details_platforms'>
                <h1>Available stores</h1>
                <div className='details_icons'>
                  {platformsIcons()[0].map((icon) => (
                    <a
                      rel='noreferrer'
                      key={`Link${icon.icon}`}
                      href={icon.url}
                      target='_blank'
                    >
                      <img
                        alt='platformIcons'
                        key={`img${icon.icon}`}
                        src={icon.icon}
                      ></img>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className='details_gallery'>
              <div className='details_video'>
                {game.clip !== undefined &&
                  game.clip !== null &&
                  game.id === currentScreen.id &&
                  videoPlaying && (
                    <video
                      onLoadedMetadata={playVideoHandler}
                      ref={videoRef}
                      src={game.clip.clips.full}
                      controls
                    ></video>
                  )}
                <div
                  onClick={thumbnailVideoHandler}
                  className={`thumbnail-video ${
                    videoAvailable && game.id === currentScreen.id
                      ? "video-available"
                      : ""
                  }`}
                  style={{
                    opacity: `${
                      videoPlaying && game.id === currentScreen.id ? 0 : 1
                    }`,
                    pointerEvents: `${videoPlaying ? "none" : "all"}`,
                  }}
                >
                  <motion.img
                    layoutId={`image${pathId}`}
                    src={currentScreen.image}
                    onLoadStartCapture={setImageLoader}
                    onLoad={removeImageLoader}
                    ref={galleryImgRef}
                  />
                  <svg
                    className={`GameDetailsLoader ${
                      imageLoading ? "activeLoader" : ""
                    }`}
                    viewBox='0 0 288 288'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <mask id='path-1-inside-1' fill='white'>
                      <path d='M180.507 36.8407C159.379 29.5543 136.565 28.6968 114.949 34.3766C93.3335 40.0563 73.8877 52.0183 59.0705 68.7498C44.2534 85.4813 34.7305 106.231 31.706 128.375C28.6815 150.518 32.2913 173.062 42.0789 193.154C51.8666 213.246 67.3924 229.984 86.6931 241.253C105.994 252.521 128.202 257.813 150.511 256.459C172.819 255.105 194.225 247.167 212.021 233.648C229.818 220.128 243.206 201.635 250.492 180.507L226.422 172.206C220.777 188.573 210.406 202.899 196.619 213.373C182.833 223.846 166.25 229.995 148.969 231.044C131.687 232.093 114.482 227.993 99.5307 219.264C84.579 210.535 72.5516 197.568 64.9694 182.003C57.3872 166.438 54.5908 148.974 56.9337 131.82C59.2767 114.666 66.6539 98.592 78.1323 85.6306C89.6108 72.6692 104.675 63.4025 121.42 59.0026C138.165 54.6026 155.839 55.2669 172.206 60.9115L180.507 36.8407Z' />
                    </mask>
                    <path
                      d='M180.507 36.8407C159.379 29.5543 136.565 28.6968 114.949 34.3766C93.3335 40.0563 73.8877 52.0183 59.0705 68.7498C44.2534 85.4813 34.7305 106.231 31.706 128.375C28.6815 150.518 32.2913 173.062 42.0789 193.154C51.8666 213.246 67.3924 229.984 86.6931 241.253C105.994 252.521 128.202 257.813 150.511 256.459C172.819 255.105 194.225 247.167 212.021 233.648C229.818 220.128 243.206 201.635 250.492 180.507L226.422 172.206C220.777 188.573 210.406 202.899 196.619 213.373C182.833 223.846 166.25 229.995 148.969 231.044C131.687 232.093 114.482 227.993 99.5307 219.264C84.579 210.535 72.5516 197.568 64.9694 182.003C57.3872 166.438 54.5908 148.974 56.9337 131.82C59.2767 114.666 66.6539 98.592 78.1323 85.6306C89.6108 72.6692 104.675 63.4025 121.42 59.0026C138.165 54.6026 155.839 55.2669 172.206 60.9115L180.507 36.8407Z'
                      fill='rgba(255, 255, 255, 0.5)'
                      strokeWidth='17'
                    />
                  </svg>
                </div>
              </div>
              <div className='details_screenshots'>
                <StyledScreenshot
                  img={game.background_image}
                  key={game.id}
                  onClick={() =>
                    setCurrentScreen({
                      id: game.id,
                      image: imgOptimizer(game.background_image, 1280),
                    })
                  }
                  className={`${
                    currentScreen.id === game.id ? "active-screen" : ""
                  }`}
                />
                {screenshots.map((screen) => (
                  <StyledScreenshot
                    img={screen.image}
                    key={screen.id}
                    onClick={() => changeScreenHandler(screen.id)}
                    className={`${
                      currentScreen.id === screen.id ? "active-screen" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className='details-description'>
              <h1>About :</h1>
              <p>{game.description_raw}</p>
            </div>
            <div className='moreDetails'>
              <div className='firstColumn'>
                <div className='oneType'>
                  {game.genres && <h4>Genre :</h4>}
                  {game.genres &&
                    game.genres.map((each) => <p key={each.id}>{each.name}</p>)}
                </div>
                <div className='oneType'>
                  {game.playtime !== 0 && <h4>Playtime :</h4>}
                  {game.playtime !== 0 && <p>{game.playtime} hours</p>}
                </div>
                <div className='oneType'>
                  {game.developers && <h4>Developers :</h4>}
                  {game.developers &&
                    game.developers.map((each) => (
                      <p key={each.id}>{each.name}</p>
                    ))}
                </div>
                <div className='oneType'>
                  <h4>Age rating :</h4>
                  <p>
                    {ageRating(
                      game.esrb_rating !== null ? game.esrb_rating.name : "not"
                    )}
                  </p>
                </div>
              </div>
              <div className='secondColumn'>
                <div className='oneType'>
                  {game.released && <h4>Released :</h4>}
                  {game.released && <p>{game.released.replace(/-/g, "/")}</p>}
                </div>
                <div className='oneType'>
                  {game.website && <h4>Website :</h4>}
                  {game.website && (
                    <a
                      rel='noreferrer'
                      className='websiteLink'
                      target='_blank'
                      href={game.website}
                    >
                      {game.website}
                    </a>
                  )}
                </div>
                <div className='oneType'>
                  {game.reddit_url && <h4>Reddit :</h4>}
                  {game.reddit_url && (
                    <a
                      rel='noreferrer'
                      className='redditLink'
                      target='_blank'
                      href={game.reddit_url}
                    >
                      {game.reddit_url}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </DetailsCard>
        </ShadowDiv>
      )}
    </>
  )
}
const ShadowDiv = styled(motion.div)`
  p {
    font-family: "Signika", sans-serif;
    font-weight: lighter;
    font-size: calc(0.3rem + 1vw);
    margin-bottom: 0.1vw;
    span {
      margin-left: 0.3rem;
      color: #e8e8e8;
    }
  }
  .moreDetails {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    font-family: "Signika", sans-serif;
    font-weight: lighter;
    margin-top: calc(1rem + 1vw);
    .firstColumn,
    .secondColumn {
      flex: 1 1 20rem;
      .oneType {
        margin: calc(0.8vw) 0;
        h4 {
          font-weight: 400;
          font-size: calc(1.2rem + 1vw);
        }
        p,
        a {
          font-size: calc(1rem + 0.2vw);
          color: #e2e2e2;
          font-weight: ligher;
          margin-top: 0.35rem;
        }
      }
      display: flex;
      justify-content: space-around;
      flex-direction: column;
    }
    .websiteLink,
    .redditLink {
      text-decoration: underline;
      display: block;
      max-width: calc(30rem + 1vw);
      word-wrap: break-word;
    }
  }
  background: rgba(0, 0, 0, 0.7);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: scroll;
  height: 100vh;
  width: 100%;
  z-index: 4;
  //Scrollbar
  &::-webkit-scrollbar {
    width: 0.45rem;
  }
  &::-webkit-scrollbar-track {
    background: #151516;
  }
  &::-webkit-scrollbar-thumb {
    background: #717171;
  }
  scrollbar-width: thin;
`
const DetailsCard = styled(motion.div)`
  position: relative;
  #closeCard {
    width: calc(2.5rem + 1vw);
    height: calc(2.5rem + 1vw);
    position: absolute;
    right: 0%;
    top: 0%;
    transform: translate(-30%, 30%);
    cursor: pointer;
    transition: 0.1s ease;
    &:hover circle {
      fill: #272727;
    }
    &:hover path {
      fill: #ffffff;
    }
  }
  opacity: 1 !important;
  box-shadow: 0 0 10px #151515;
  border-radius: 20px;
  padding: calc(2rem + 1vw);
  background: #151515;
  width: 91%;
  margin: 0 auto;
  margin-top: calc(1rem + 1vw);
  .details_intro {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
  }
  .name_and_rating {
    h1 {
      font-family: "Acme", sans-serif;
      margin-bottom: 0.6rem;
      font-size: calc(1.7rem + 1vw);
    }
    h4 {
      font-family: "Signika", sans-serif;
      font-weight: lighter;
      font-size: calc(0.6rem + 1vw);
      position: relative;
      display: inline-block;
      p {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(110%, -30%);
        font-size: calc(0.2rem + 1vw);
      }
    }
    margin-bottom: 0.7rem;
    .details_stars {
      margin-top: 0.1rem;
      img {
        filter: saturate(0.8);
        width: calc(1.4rem + 1vw);
        height: calc(1.4rem + 1vw);
        margin-right: 0.4rem;
        pointer-events: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    }
  }
  .details_platforms {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    h1 {
      font-family: "Cabin", sans-serif;
      font-size: calc(1.7rem + 1vw);
      font-weight: normal;
    }
    .details_icons {
      width: max-content;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.7vw;
      margin-top: 0.5vw;
      a {
        margin-right: 1.2vw;
        img {
          width: calc(1.8rem + 1vw);
          height: calc(1.8rem + 1vw);
          cursor: pointer;
        }
      }
    }
  }
  .details-description {
    margin-top: calc(1rem + 1vw);
    position: relative;
    h1 {
      font-family: "Cabin", sans-serif;
      margin-bottom: 0.6vw;
      font-size: calc(1.7rem + 1vw);
    }
    p {
      font-family: "Signika", sans-serif;
      font-weight: lighter;
      font-size: calc(0.5rem + 1vw);
      color: #f0f0f0;
      line-height: 150%;
      .moreLink {
        font-size: 77%;
        color: white;
        text-decoration: underline;
      }
    }
  }
  .details_gallery {
    display: flex;
    justify-content: center;
    align-items: stretch;
    height: 60vh;
    min-height: 330px;

    .details_screenshots {
      flex: 1 1 20rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 0.7vw;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }
  .details_video {
    width: 100%;
    flex: 4 1 30rem;
    margin-right: 0.7vw;
    position: relative;
    background-size: cover;
    overflow: hidden;
    border-radius: 20px;

    .thumbnail-video {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      transition: all 0.2s ease;

      img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 20px;
        object-fit: cover;
        pointer-events: none;
        opacity: 1 !important;
      }
    }
    .video-available::before {
      content: "";
      cursor: pointer;
      filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.6));
      width: calc(4rem + 1vw);
      height: calc(4rem + 1vw);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: url(${(props) => props.playIcon});
      background-size: cover;
    }
    video {
      display: block;
      width: 100%;
      border-radius: 20px;
      height: 100%;
      object-fit: cover;
    }
  }
  .GameDetailsLoader {
    width: calc(4.5rem + 1vw);
    height: calc(4.5rem + 1vw);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    animation: unset;
    opacity: 0;
    &.activeLoader {
      transition: 0s 0.2s;
      opacity: 1;
      animation: animateLoaderDetails 0.55s infinite linear;
    }
  }
  @keyframes animateLoaderDetails {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`
const StyledScreenshot = styled.div`
  background: url(${(props) => imgOptimizer(props.img, 640)});
  background-size: cover;
  background-position: 50%;
  border-radius: 10px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    transition: all 0.5s ease;
    border-radius: 10px;
  }
  &::after {
    content: "";
    position: absolute;
    left: 0%;
    bottom: 0%;
    height: calc(0.5rem + 1vw);
    width: calc(0.5rem + 1vw);
    border-radius: 50%;
    transform: translate(23%, -23%);
    transition: 0.3s ease;
    z-index: 2;
  }

  &.active-screen::after {
    background: rgba(255, 255, 255, 0.35) !important;
    cursor: pointer;
  }
  &::before {
    background: unset !important;
  }
  &.active-screen:hover::before {
    background: rgba(0, 0, 0, 0.5) !important;
  }
  &:hover::before {
    background: rgba(0, 0, 0, 0.1) !important;
  }
  &.active-screen::before {
    background: rgba(0, 0, 0, 0.5) !important;
  }
`
export default GameDetail
