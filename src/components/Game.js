//Add Link tag to each game without ruining the design!!
import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import styled from "styled-components"
import playIcon from "../img/playButton.svg"
import { useSelector, useDispatch } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { imgOptimizer } from "../utils"
import { popup } from "../animation"

const Game = ({ name, released, img, clip, platforms, id, pathIdURL }) => {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [startLoading, setStartLoading] = useState(false)
  const { loading } = useSelector((state) => state.details)
  const dispatch = useDispatch()

  const gameClip = (clipObj) => {
    if (clipObj === null) return null
    else if (clipObj === undefined) return null
    else return clipObj.clips["320"]
  }
  //Handlers
  const leaveHandler = () => {
    setHovered(false)
    setIsPlaying(false)
    setStartLoading(false)
  }
  const enterHandler = () => {
    setHovered(true)
    setIsPlaying(true)
    setStartLoading(true)
  }
  function truncate(str) {
    return str.length > 24 ? str.substr(0, 24 - 1) + "..." : str
  }
  const videoLoadedHandler = () => {
    videoRef.current.play().catch((e) => {
      console.log("Can't Play right now")
    })
    setStartLoading(false)
  }
  const pathId = parseInt(useLocation().pathname.split("/")[2])
  const secondPath = useLocation().pathname.split("/")[1]

  useEffect(() => {
    if (pathId) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [pathId])
  const gameClickHandler = () => {
    dispatch({
      type: "CLEAN_DETAIL",
    })
  }
  return (
    <StyledGame
      variants={popup}
      initial='hidden'
      animate='show'
      icon={{ play: playIcon }}
      className='gameCard'
      layoutId={id}
      style={{
        transform: `${pathIdURL ? "unset !important" : "auto"}`,
      }}
    >
      <Link
        onClick={gameClickHandler}
        to={`${secondPath ? `/searched_game/${id}` : `/games/${id}`}`}
      >
        <div className={`game-info ${gameClip(clip) == null ? "noVideo" : ""}`}>
          <div className='platforms'></div>
          <div className='game-desc' title={name}>
            <h1>{truncate(name)}</h1>
            <p>{released ? released.replace(/[-]/g, "/") : ""}</p>
          </div>

          <svg
            style={{
              opacity: `${
                startLoading && gameClip(clip) !== null && !loading ? 1 : 0
              }`,
              animation: `${
                startLoading && gameClip(clip) && !loading !== null
                  ? "animateLoader 0.5s infinite linear"
                  : "unset"
              }`,
            }}
            className={`loadingVideo ${
              startLoading && gameClip(clip) && !loading !== null
                ? "active"
                : ""
            }`}
            viewBox='0 0 102 102'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <mask id='path-1-inside-1' fill='white'>
              <path d='M86.9469 64.8327C89.1487 59.128 89.9639 52.9819 89.3252 46.9005C88.6866 40.819 86.6124 34.9763 83.2735 29.8535C79.9347 24.7307 75.4266 20.4743 70.1206 17.4349C64.8146 14.3955 58.8625 12.66 52.7545 12.3714L52.3439 21.0602C57.0756 21.2838 61.6866 22.6282 65.797 24.9828C69.9074 27.3373 73.3996 30.6346 75.9862 34.6032C78.5727 38.5717 80.1795 43.0978 80.6743 47.809C81.169 52.5201 80.5375 57.2813 78.8319 61.7006L86.9469 64.8327Z' />
            </mask>
            <path
              d='M86.9469 64.8327C89.1487 59.128 89.9639 52.9819 89.3252 46.9005C88.6866 40.819 86.6124 34.9763 83.2735 29.8535C79.9347 24.7307 75.4266 20.4743 70.1206 17.4349C64.8146 14.3955 58.8625 12.66 52.7545 12.3714L52.3439 21.0602C57.0756 21.2838 61.6866 22.6282 65.797 24.9828C69.9074 27.3373 73.3996 30.6346 75.9862 34.6032C78.5727 38.5717 80.1795 43.0978 80.6743 47.809C81.169 52.5201 80.5375 57.2813 78.8319 61.7006L86.9469 64.8327Z'
              strokeWidth='40'
              stroke='white'
              strokeOpacity='0.9'
              mask='url(#path-1-inside-1)'
            />
          </svg>
        </div>
        <div
          className={`game-cover ${
            loading && id === pathId ? "active-loading" : ""
          }`}
        >
          <svg
            className='loader12'
            viewBox='0 0 288 288'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <mask id='path-1-inside-1' fill='white'>
              <path d='M180.507 36.8407C159.379 29.5543 136.565 28.6968 114.949 34.3766C93.3335 40.0563 73.8877 52.0183 59.0705 68.7498C44.2534 85.4813 34.7305 106.231 31.706 128.375C28.6815 150.518 32.2913 173.062 42.0789 193.154C51.8666 213.246 67.3924 229.984 86.6931 241.253C105.994 252.521 128.202 257.813 150.511 256.459C172.819 255.105 194.225 247.167 212.021 233.648C229.818 220.128 243.206 201.635 250.492 180.507L226.422 172.206C220.777 188.573 210.406 202.899 196.619 213.373C182.833 223.846 166.25 229.995 148.969 231.044C131.687 232.093 114.482 227.993 99.5307 219.264C84.579 210.535 72.5516 197.568 64.9694 182.003C57.3872 166.438 54.5908 148.974 56.9337 131.82C59.2767 114.666 66.6539 98.592 78.1323 85.6306C89.6108 72.6692 104.675 63.4025 121.42 59.0026C138.165 54.6026 155.839 55.2669 172.206 60.9115L180.507 36.8407Z' />
            </mask>
            <path
              d='M180.507 36.8407C159.379 29.5543 136.565 28.6968 114.949 34.3766C93.3335 40.0563 73.8877 52.0183 59.0705 68.7498C44.2534 85.4813 34.7305 106.231 31.706 128.375C28.6815 150.518 32.2913 173.062 42.0789 193.154C51.8666 213.246 67.3924 229.984 86.6931 241.253C105.994 252.521 128.202 257.813 150.511 256.459C172.819 255.105 194.225 247.167 212.021 233.648C229.818 220.128 243.206 201.635 250.492 180.507L226.422 172.206C220.777 188.573 210.406 202.899 196.619 213.373C182.833 223.846 166.25 229.995 148.969 231.044C131.687 232.093 114.482 227.993 99.5307 219.264C84.579 210.535 72.5516 197.568 64.9694 182.003C57.3872 166.438 54.5908 148.974 56.9337 131.82C59.2767 114.666 66.6539 98.592 78.1323 85.6306C89.6108 72.6692 104.675 63.4025 121.42 59.0026C138.165 54.6026 155.839 55.2669 172.206 60.9115L180.507 36.8407Z'
              fill='rgba(255, 255, 255, 0.45)'
              strokeWidth='17'
            />
          </svg>

          <motion.img
            className='gameImage'
            layoutId={`image${id}`}
            onMouseEnter={() => enterHandler()}
            onMouseLeave={() => leaveHandler()}
            src={imgOptimizer(img, 640)}
            alt={name}
          />
          <div
            className='hover-effect'
            style={{ opacity: `${isPlaying ? 1 : 0}` }}
          >
            {gameClip(clip) !== null && !loading && hovered && (
              <video
                ref={videoRef}
                muted
                src={gameClip(clip)}
                onLoadedMetadata={videoLoadedHandler}
                loop
              ></video>
            )}
          </div>
        </div>
      </Link>
    </StyledGame>
  )
}
const StyledGame = styled(motion.div)`
  flex: 1 1 350px;
  height: max-content;
  cursor: pointer;
  /* opacity: 1 !important;
  transition: all 0.35s ease;
  transform: unset !important; */
  a {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: "Signika", sans-serif;
    border-radius: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.03);
    background: #202020;
  }

  .game-desc {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    h1 {
      font-weight: normal;
      color: #ffffea;
      font-size: calc(0.9rem + 0.5vw);
    }
    p {
      font-size: calc(0.65rem + 0.5vw);
      font-weight: lighter;
      color: #d4d4d4;
      padding-left: 1vw;
    }
  }
  .game-cover {
    position: relative;
    &:hover .hover-effect {
      background: rgba(0, 0, 0, 0.1);
    }

    .loader12 {
      width: calc(4rem + 1vw);
      height: calc(4rem + 1vw);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      pointer-events: none;
      animation: unset;
    }
    &.active-loading .loader12 {
      opacity: 1;
      pointer-events: none;
      transition: 0.05s ease;
      animation: loaderAnim1 0.7s infinite linear;
    }
    @keyframes loaderAnim1 {
      from {
        transform: translate(-50%, -50%) rotate(0deg);
      }
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }
    .hover-effect {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 2;
      border-radius: 20px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      pointer-events: none;
      transition: all 0.3s ease;

      video {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 1;
        transition: all 0.5s ease;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
      }
    }
    .gameImage {
      display: block;
      width: 100%;
      height: 38vh;
      min-height: 190px;
      object-fit: cover;
      border-radius: 20px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      opacity: 1 !important;
      transform: unset !important;
      transform-origin: unset !important;
    }
  }
  &:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.07);
  }

  .game-info {
    display: flex;
    flex-direction: column;
    order: 2;
    padding: calc(0.8rem + 1vw);
    color: white;
    position: relative;

    &::before {
      content: "";
      z-index: 1;
      width: calc(2.2rem + 1vw);
      height: calc(2.2rem + 1vw);
      background: url(${(props) => props.icon.play});
      position: absolute;
      left: 0;
      top: 0;
      transform: translate(30%, -130%);
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 50%;
      pointer-events: none;
    }

    .platforms {
      img {
        margin: 0 0.2rem;
      }
    }
  }
  .noVideo::before {
    display: none;
  }
  .loadingVideo {
    width: calc(2.2rem + 1vw);
    height: calc(2.2rem + 1vw);
    z-index: 4;
    position: absolute;
    top: 0;
    right: 0;
    pointer-events: none;
    transform: translate(-30%, -130%) rotate(0deg);
    opacity: 0;
    animation: unset;
    &.active {
      opacity: 1;
      animation: animateLoader 0.5s infinite linear;
      transition: 0s 0.2s;
    }
  }
  @keyframes animateLoader {
    from {
      transform: translate(-30%, -130%) rotate(0deg);
    }
    to {
      transform: translate(-30%, -130%) rotate(360deg);
    }
  }
`

export default Game
