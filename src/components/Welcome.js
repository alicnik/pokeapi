import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactTypingEffect from 'react-typing-effect'
import Speaking from './Speaking'
import { Link } from 'react-router-dom'
import pokemonTheme from '../assets/pokemon-theme.mp3'
import pokemonLogo from '../assets/pokemon-logo.svg'
import profOakImg from '../assets/prof-oak.gif'
import pokedex from '../assets/pokedex.png'

const audio = new Audio(pokemonTheme)
audio.volume = 0.5

export const Welcome = () => {
  const [music, setMusic] = useState(audio)
  const [startGame, setStartGame] = useState(false)
  const [profOak, setProfOak] = useState(false)


  useEffect(() => {


    return function cleanup() {
      music.pause()
      music.currentTime = 0
      setMusic(audio)
    }
  }, [])


  function handleClick() {
    music.play()
    setStartGame(true)
    setTimeout(() => {
      setProfOak(Speaking)
    }, 2000)
  }

  return <>
    <div id="welcome">

      <div className={`${startGame && profOak ? 'exit' : startGame ? 'start-game' : 'logo'}`}>
        <img src={pokemonLogo} alt="Pokemon logo" />
      </div>
      <div className={`${startGame ? 'logo' : 'click-to-start'}`} onClick={handleClick}>
        <h2>Click to Start!</h2>

      </div>
      <div className={`${profOak ? 'prof-oak' : 'logo'}`}>
        <div className='oak-speaks'>
          {profOak}
        </div>
        <img src={profOakImg} alt="prof-oak" />

        <div className="pokedex-link">
          <Link to='/pokedex'> <img src={pokedex} alt="prof-oak" /> </Link>
          <p>Pokédex</p>
        </div>
      </div>




    </div>

    {/* <img src='../assets/prof-oak.gif'></img> */}
  </>
}