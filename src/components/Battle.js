import React, { useState, useEffect } from 'react'

const audio = new Audio('../assets/battle-theme.mp3')

export const Battle = () => {
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


    <section id="battle">
      <div className="opponent">
        <div className="opponent-stats">
          <h3>Charizard</h3>
          <progress value="75" max="100"></progress>
          <p>HP: 75/100</p>
        </div>
        <div className="opponent-sprite">
          <img src="../assets/charizard.png"></img>
        </div>
      </div>

      <div className="player">
        <div className="player-sprite">
          <img src="../assets/Pikachu_back.png"></img>
        </div>
        <div className="player-stats">
          <h3>Pikachu</h3>
          <progress value="50" max="100"></progress>
          <p>HP: 50/100</p>
        </div>
        <div className="player-options">
          <div className="options-announce">
            <h3> What will Pikachu do?</h3>
          </div>
          <div className="options-choices">
            <ul>
              <li>FIGHT</li>
              <li>CHANGE POKéMON</li>
              <li>RUN</li>
            </ul>
          </div>

        </div>


      </div>



    </section>
  </>

}