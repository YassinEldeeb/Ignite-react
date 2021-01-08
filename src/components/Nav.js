import React, { useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import fireLogo from "../img/fire.svg"
import { Link, useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"

const Nav = ({ setCurrentGamesType, setPage }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [inputValue, setInputValue] = useState("")
  const submitHandler = (e) => {
    e.preventDefault()
    if (inputValue !== "") {
      history.push(`/searched/${inputValue}`)
      setInputValue("")
      dispatch({
        type: "CLEAN_DETAIL",
      })
      dispatch({
        type: "CLEAR_SEARCHED",
      })
    }
  }
  return (
    <StyledNav>
      <Link
        to='/'
        className='logo'
        onClick={() => {
          setPage(1)
          setCurrentGamesType(localStorage.getItem("IgniteGamesType"))
        }}
      >
        <img alt='logo' src={fireLogo} />
        <h1>Ignite</h1>
      </Link>
      <form className='search'>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          type='text'
        />
        <button onClick={submitHandler} type='submit'>
          Search
        </button>
      </form>
    </StyledNav>
  )
}
const StyledNav = styled(motion.nav)`
  position: sticky;
  top: 0%;
  z-index: 4;
  background: #151515;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.6vw;
  padding-bottom: 1.4vw;
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    h1 {
      color: white;
      font-family: "Cabin", sans-serif;
      font-weight: 400;
      font-size: calc(1.7rem + 1vw);
      padding-left: 0.3rem;
      filter: drop-shadow(0px 0px 1px #fff);
    }
    img {
      width: calc(2.2rem + 1vw);
      height: calc(2.2rem + 1vw);
      filter: drop-shadow(0px 0px 1px #e05638);
    }
  }
  .search {
    display: flex;
    justify-content: space-between;
    align-items: stretch;

    input {
      box-shadow: 0px 0px 3px white;
      padding: 0.45rem 0.55rem;
      border-radius: 3px;
      border: none;
      font-family: "Cabin", sans-serif;
      font-size: calc(0.5rem + 1vw);
      text-transform: capitalize;
    }
    button {
      box-shadow: 0px 0px 3px #e05638;
      margin-left: 0.4vw;
      border-radius: 3px;
      border: none;
      font-family: "Cabin", sans-serif;
      font-size: calc(0.3rem + 1vw);
      padding: 0 0.8rem;
      cursor: pointer;
      background: #e05638;
      color: white;
      transition: 0.3s ease;
      &:hover {
        background: #e26447;
      }
    }
  }
`
export default Nav
