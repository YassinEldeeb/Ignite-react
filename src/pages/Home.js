import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  loadPopularGames,
  loadUpcomingGames,
  loadSearchedGames,
} from "../actions/gameAction"
import styled from "styled-components"
import Game from "../components/Game"
import GameDetail from "../components/GameDetail"
import { useLocation, useHistory } from "react-router-dom"
import { useInView } from "react-intersection-observer"
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion"
import Nav from "../components/Nav"
import { detailsAction } from "../actions/detailsAction"
import { fadeIn } from "../animation"

const Home = () => {
  const history = useHistory()
  const pathId = useLocation().pathname.split("/")[2]
  const secondPath = useLocation().pathname.split("/")[1]
  const [element, inView] = useInView()
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [toggle, setToggle] = useState(false)
  const [scrolledEnough, setScrolledEnough] = useState(0)
  const [lastSearch, setLastSearch] = useState("")

  window.addEventListener("scroll", () => {
    setTimeout(() => {
      setScrolledEnough(window.scrollY)
    }, 200)
  })
  useEffect(() => {
    console.log(localStorage.getItem("IgniteGamesType"))
    if (!localStorage.getItem("IgniteGamesType")) {
      localStorage.setItem("IgniteGamesType", "popular")
    }
  }, [])
  const gamesTypeValue = () => {
    if (localStorage.getItem("IgniteGamesType")) {
      return localStorage.getItem("IgniteGamesType")
    }
    return "popular"
  }
  const [currentGamesType, setCurrentGamesType] = useState(gamesTypeValue())
  const { popular, upcoming, searched, fetched } = useSelector(
    (state) => state.games
  )

  const loopedGamesArray = () => {
    switch (currentGamesType) {
      case "popular":
        return popular
      case "upcoming":
        return upcoming
      case "searched":
        return searched
      default:
        return popular
    }
  }
  const loopedGamesFetching = (pageNum) => {
    switch (currentGamesType) {
      case "popular":
        return loadPopularGames(pageNum)
      case "upcoming":
        return loadUpcomingGames(pageNum)
      case "searched":
        return loadSearchedGames(pathId, page)
      default:
        return loadPopularGames(pageNum)
    }
  }
  useEffect(() => {
    async function fetchData() {
      if (page < 10) {
        if (inView && fetched) {
          try {
            await dispatch(loopedGamesFetching(page))
            setPage(page + 1)
          } catch (e) {
            setPage(page + 10)
          }
        }
      }
    }
    if (secondPath !== "searched") fetchData()
    if (secondPath === "searched") {
      setCurrentGamesType("searched")
      if (inView && fetched && pathId) {
        async function runAsync() {
          try {
            await dispatch(loopedGamesFetching(page))
            setPage(page + 1)
          } catch (e) {
            setPage(page + 10)
          }
        }
        if (page < 10) {
          runAsync()
        }
      }
    }
  }, [inView, dispatch, loopedGamesArray(), pathId])

  useEffect(() => {
    if (secondPath === "games" || secondPath === "searched_game") {
      dispatch(detailsAction(pathId))
    }
    if (secondPath === "searched") {
      setPage(1)
      setLastSearch(pathId)
      console.log("ran")
    }
  }, [pathId, secondPath])
  return (
    <StyledGamesCont>
      <Nav
        setLastSearch={setLastSearch}
        setPage={setPage}
        setCurrentGamesType={setCurrentGamesType}
      />
      <AnimateSharedLayout type='crossfade'>
        {pathId && (
          <AnimatePresence>
            <GameDetail lastSearch={lastSearch} />
          </AnimatePresence>
        )}
        <div
          className='scrollUp'
          style={{
            opacity: `${scrolledEnough > 500 ? 1 : 0}`,
            transform: `${scrolledEnough > 500 ? "scale(1)" : "scale(0)"}`,
          }}
          onClick={() =>
            window.scroll({
              top: 0,
              left: 0,
            })
          }
        >
          <svg
            viewBox='0 0 66 66'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle cx='33' cy='33' r='33' fill='rgba(0, 0, 0, 0.6)' />
            <path
              d='M31.6899 43.7819C32.471 44.563 33.7373 44.563 34.5183 43.7819L47.2463 31.054C48.0273 30.2729 48.0273 29.0066 47.2463 28.2256C46.4652 27.4445 45.1989 27.4445 44.4178 28.2256L33.1041 39.5393L21.7904 28.2256C21.0094 27.4445 19.743 27.4445 18.962 28.2256C18.1809 29.0066 18.1809 30.2729 18.962 31.054L31.6899 43.7819ZM31.1041 41.6842L31.1041 42.3677L35.1041 42.3677L35.1041 41.6842L31.1041 41.6842Z'
              fill='white'
            />
          </svg>
        </div>
        <div className='controlSection'>
          <h1 className='type'>
            {currentGamesType.charAt(0).toUpperCase() +
              currentGamesType.slice(1)}{" "}
            Games :
          </h1>
          <div
            className='drop-down'
            onClick={() => {
              setToggle(!toggle)
            }}
          >
            <h1
              className='option'
              style={{
                borderBottomLeftRadius: `${toggle ? "0px" : "10px"}`,
                borderBottomRightRadius: `${toggle ? "0px" : "10px"}`,
                background: `${
                  toggle ? "rgba(49, 49, 49, 0.6)" : "rgba(49, 49, 49, 0.8)"
                }`,
              }}
            >
              {currentGamesType}
              <svg
                style={{
                  transform: `${
                    toggle
                      ? "rotate(180deg) translateY(-11%)"
                      : "rotate(0deg) translateY(11%)"
                  }`,
                }}
                viewBox='0 0 8 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M3.70846 4.41987C3.90372 4.61514 4.2203 4.61514 4.41557 4.41987L7.59755 1.23789C7.79281 1.04263 7.79281 0.726049 7.59755 0.530786C7.40228 0.335524 7.0857 0.335524 6.89044 0.530786L4.06201 3.35921L1.23358 0.530786C1.03832 0.335524 0.72174 0.335524 0.526478 0.530786C0.331216 0.726048 0.331216 1.04263 0.526478 1.23789L3.70846 4.41987ZM3.56201 3.94205L3.56201 4.06632L4.56201 4.06632L4.56201 3.94205L3.56201 3.94205Z'
                  fill='white'
                />
              </svg>
            </h1>
            {toggle && (
              <div className='drop-down-menu'>
                <span
                  onClick={() => {
                    if (currentGamesType !== "popular") setPage(1)
                    setCurrentGamesType("popular")
                    history.push("/")
                    localStorage.setItem("IgniteGamesType", "popular")
                  }}
                >
                  Popular
                </span>
                <span
                  onClick={() => {
                    if (currentGamesType !== "upcoming") setPage(1)
                    history.push("/")
                    setCurrentGamesType("upcoming")
                    localStorage.setItem("IgniteGamesType", "upcoming")
                  }}
                >
                  Upcoming
                </span>
              </div>
            )}
          </div>
        </div>
        <StyledGamesDiv variants={fadeIn} initial='hidden' animate='show'>
          {loopedGamesArray().map((game) => (
            <Game
              pathIdURL={pathId}
              name={game.name}
              img={game.background_image}
              released={game.released}
              clip={game.clip}
              platforms={game.platforms}
              key={game.id}
              id={game.id}
            />
          ))}
          {page < 10 && (
            <div className='scroll-div' ref={element}>
              <svg
                style={{
                  animation: `${
                    inView ? "loaderAnim 0.7s infinite linear" : "unset"
                  }`,
                }}
                viewBox='0 0 288 288'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <mask id='path-1-inside-1' fill='white'>
                  <path d='M180.507 36.8407C159.379 29.5543 136.565 28.6968 114.949 34.3766C93.3335 40.0563 73.8877 52.0183 59.0705 68.7498C44.2534 85.4813 34.7305 106.231 31.706 128.375C28.6815 150.518 32.2913 173.062 42.0789 193.154C51.8666 213.246 67.3924 229.984 86.6931 241.253C105.994 252.521 128.202 257.813 150.511 256.459C172.819 255.105 194.225 247.167 212.021 233.648C229.818 220.128 243.206 201.635 250.492 180.507L226.422 172.206C220.777 188.573 210.406 202.899 196.619 213.373C182.833 223.846 166.25 229.995 148.969 231.044C131.687 232.093 114.482 227.993 99.5307 219.264C84.579 210.535 72.5516 197.568 64.9694 182.003C57.3872 166.438 54.5908 148.974 56.9337 131.82C59.2767 114.666 66.6539 98.592 78.1323 85.6306C89.6108 72.6692 104.675 63.4025 121.42 59.0026C138.165 54.6026 155.839 55.2669 172.206 60.9115L180.507 36.8407Z' />
                </mask>
                <path
                  d='M180.507 36.8407C159.379 29.5543 136.565 28.6968 114.949 34.3766C93.3335 40.0563 73.8877 52.0183 59.0705 68.7498C44.2534 85.4813 34.7305 106.231 31.706 128.375C28.6815 150.518 32.2913 173.062 42.0789 193.154C51.8666 213.246 67.3924 229.984 86.6931 241.253C105.994 252.521 128.202 257.813 150.511 256.459C172.819 255.105 194.225 247.167 212.021 233.648C229.818 220.128 243.206 201.635 250.492 180.507L226.422 172.206C220.777 188.573 210.406 202.899 196.619 213.373C182.833 223.846 166.25 229.995 148.969 231.044C131.687 232.093 114.482 227.993 99.5307 219.264C84.579 210.535 72.5516 197.568 64.9694 182.003C57.3872 166.438 54.5908 148.974 56.9337 131.82C59.2767 114.666 66.6539 98.592 78.1323 85.6306C89.6108 72.6692 104.675 63.4025 121.42 59.0026C138.165 54.6026 155.839 55.2669 172.206 60.9115L180.507 36.8407Z'
                  fill='rgba(255, 255, 255, 0.65)'
                  strokeWidth='10'
                />
              </svg>
            </div>
          )}
        </StyledGamesDiv>
        )
      </AnimateSharedLayout>
    </StyledGamesCont>
  )
}

const StyledGamesDiv = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: calc(0.1rem + 1vw);
`
const StyledGamesCont = styled(motion.div)`
  .scrollUp {
    position: fixed;
    right: 5%;
    bottom: 5%;
    z-index: 3;
    cursor: pointer;
    transition: all 0.15s ease;
    svg {
      width: calc(3rem + 1vw);
      height: calc(3rem + 1vw);
      transform: rotate(180deg);
      circle {
        transition: 0.2s ease;
      }
    }
    &:hover svg circle {
      fill: rgba(0, 0, 0, 0.7) !important;
    }
  }
  .controlSection {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 15vh;
    padding-bottom: calc(0.4rem + 1vw);
    padding-top: calc(0.8rem + 1vw);
    .option {
      color: white;
      font-family: "Signika", sans-serif;
      font-weight: 400;
      border-radius: 10px;
      font-size: calc(0.8rem + 0.5vw);
      transition: 0.3s ease;
      cursor: pointer;
      padding: calc(0.32rem + 0.6vw) calc(0.9rem + 0.6vw);
      text-transform: capitalize;
      width: max-content;
      svg {
        width: calc(12px + 0.5vw);
        height: calc(7.5px + 0.5vw);
        margin-left: calc(0.5rem + 0.5vw);
        transition: 0.05s ease;
      }
    }
    .drop-down {
      position: relative;
    }
    .drop-down-menu {
      position: absolute;
      bottom: 0;
      left: 0;
      padding-top: 0.7rem;
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      flex-direction: column;
      z-index: 3;
      color: white;
      font-family: "Signika", sans-serif;
      background: #2b2b2b;
      transform: translate(0%, 102%);
      border-radius: 10px;
      width: 100%;
      padding: 0.5rem calc(0.5rem + 0.6vw);
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      span {
        font-size: calc(0.8rem + 0.5vw);
        cursor: pointer;
        padding: 0.5rem 0;
        transition: 0.2s ease;
        width: 100%;
        &:hover {
          color: #d1d1d1;
        }
      }
    }
  }
  .type {
    font-family: "Acme", sans-serif;
    font-size: calc(3rem + 1vw);
    color: white;
    filter: drop-shadow(0px 0px 1px #fff);
  }
  width: 91%;
  margin: 0 auto;
  margin-bottom: 1.2vw;

  .scroll-div {
    width: 100%;
    min-height: calc(1rem + 1vw);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.5vw 0;
    svg {
      width: calc(3.5rem + 1vw);
      height: calc(3.5rem+ 1vw);
      border-radius: 50%;
    }
    @keyframes loaderAnim {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
`

export default Home
