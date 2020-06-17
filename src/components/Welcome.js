import React, { useState, useEffect } from 'react'
import axios from 'axios'

const audio = new Audio('../assets/pokemon-theme.mp3')

export const Welcome = () => {
  const [music, setMusic] = useState(audio)


  useEffect(() => {
    music.play()

    return function cleanup() {
      music.pause()
      music.currentTime = 0
      setMusic(audio)
    }
  }, [])

  return <>
    <div id="welcome">

      <div className="logo">
        <img src="../assets/pokemon-logo.svg" alt="Pokemon logo" />
      </div>
      <h2>Click to Start!</h2>





    </div>

    {/* <img src='../assets/prof-oak.gif'></img> */}
  </>
}