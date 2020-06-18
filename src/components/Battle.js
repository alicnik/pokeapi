import React, { useEffect, useState } from 'react'

const audio = new Audio('../assets/battle-theme.mp3')

export const Battle = ({ playerBattleTeam, setPlayerBattleTeam,computerBattleTeam, setComputerBattleTeam }) => {
  const [music, setMusic] = useState(audio)

  useEffect(() => {
    music.play()

    return function cleanup() {
      music.pause()
      music.currentTime = 0
      setMusic(audio)
    }
  }, [])

  const [currentPlayerPokemon, setCurrentPlayerPokemon] = useState({})
  const [currentComputerPokemon, setCurrentComputerPokemon] = useState({})
  const [currentPlayerMove, setCurrentPlayerMove] = useState('')
  const [currentComputerMove, setCurrentComputerMove] = useState('')
  const [moveHovered, setMoveHovered] = useState(false)
  const [switchingSamePokemon, setSwitchingSamePokemon] = useState(false)

  function updateStatus(previous, index, key, newValue) {
    const copy = [...previous]
    copy[index][key] = newValue
    return copy
  }

  useEffect(()=> {
    setPlayerBattleTeam(previous => updateStatus(previous, 0, 'isOut', true))
    setComputerBattleTeam(previous => updateStatus(previous, 0, 'isOut', true))
  }, [])
  
  useEffect(()=> {
    setCurrentPlayerPokemon(() => playerBattleTeam.find(pokemon => pokemon.isOut) || {})
    setCurrentComputerPokemon(() => computerBattleTeam.find(pokemon => pokemon.isOut) || {})
  }, [playerBattleTeam, computerBattleTeam])

  useEffect(()=> {
    const playerIndex = playerBattleTeam.findIndex(pokemon => pokemon.isOut)
    const computerIndex = computerBattleTeam.findIndex(pokemon => pokemon.isOut)
    const currentPlayerInstance = playerBattleTeam[playerIndex]
    const currentComputerInstance = computerBattleTeam[computerIndex]
    if (currentPlayerInstance?.isAttacking || currentPlayerPokemon?.isAttacking) {
      console.log('line 35')
      const damage = currentPlayerInstance?.attack(currentPlayerMove, currentComputerPokemon)
      currentComputerInstance.reduceHp(damage)
    } 
    if (currentPlayerInstance.hasAttacked || currentPlayerPokemon.hasAttacked) {
      console.log('line 40')
      const damage = currentComputerInstance?.attack(currentComputerMove, currentPlayerPokemon)
      currentPlayerInstance?.reduceHp(damage)
    }
  })

  return <>
    <section id="battle">
      <div className="opponent">
        <div className="opponent-stats">
          <h3>{currentComputerPokemon?.name}</h3>
          <progress 
            value={computerBattleTeam[currentComputerPokemon?.index]?.currentHp} 
            max={currentComputerPokemon?.hp}>
          </progress>
          <p>HP: {computerBattleTeam[currentComputerPokemon?.index]?.currentHp}/{currentComputerPokemon?.hp}</p>
        </div>
        <div className="opponent-sprite">
          <img src={currentComputerPokemon?.frontSprite}></img>
        </div>
      </div>

      <div className="player">
        <div className="player-sprite">
          <img src={currentPlayerPokemon?.backSprite}></img>
        </div>
        <div className="player-stats">
          <h3>{currentPlayerPokemon?.name}</h3>
          <progress value={playerBattleTeam[currentPlayerPokemon?.index]?.currentHp} max={currentPlayerPokemon?.hp}></progress>
          <p>HP: {playerBattleTeam[currentPlayerPokemon?.index]?.currentHp}/{currentPlayerPokemon?.hp}</p>
        </div>
        <button
          onClick={() => {
            setPlayerBattleTeam(previous => {
              const copy = [...previous]
              copy[currentPlayerPokemon.index].isFighting = false
              copy[currentPlayerPokemon.index].isChoosing = true
              copy[currentPlayerPokemon.index].isRunning = false
              copy[currentPlayerPokemon.index].isSwitching = false
              copy[currentPlayerPokemon.index].isAttacking = false
              copy[currentPlayerPokemon.index].hasAttacked = false
              return copy
            })
            setSwitchingSamePokemon(false)
            setMoveHovered(false)
            setCurrentPlayerMove('')
          }}
        >RESET</button>
        <div className="player-options">
          <div className="options-announce">
            {currentPlayerPokemon?.isChoosing && <h3>What will <span className="uppercase">{currentPlayerPokemon?.name}</span> do?</h3>}
            {currentPlayerPokemon?.isFighting && <ul className='fighting'>
              {Object.keys(currentPlayerPokemon.moves).map((move, index) => {
                const playerMove = currentPlayerPokemon.moves[move]
                return <li 
                  key={index} 
                  onMouseEnter={(e)=> {
                    setCurrentPlayerMove(e.target.innerHTML)
                    setMoveHovered(true)
                  }}
                  onMouseLeave={() => setMoveHovered(false)}

                  // TODO ATTACKING FUNCTIONALITY HERE

                  onClick={() => {
                    setPlayerBattleTeam(previous => updateStatus(previous, currentPlayerPokemon.index, 'isFighting', false))
                    setPlayerBattleTeam(previous => updateStatus(previous, currentPlayerPokemon.index, 'isAttacking', true))
                  }}
                >
                  {playerMove.name}
                </li>
              })}          
            </ul>
            }
            {currentPlayerPokemon?.isAttacking && <h3><span className='uppercase'>{currentPlayerPokemon?.name}</span> used <span className="uppercase">{currentPlayerMove}</span>!</h3>}
            {currentPlayerPokemon?.hasAttacked && <h3><span className='uppercase'>{currentComputerPokemon?.name}</span> used <span className="uppercase">{currentComputerMove}</span>!</h3>}
            {currentPlayerPokemon?.isRunning && <h3>You can&rsquo;t run from a battle!</h3>}
            {(currentPlayerPokemon?.isSwitching && !switchingSamePokemon) && <ul>
              {playerBattleTeam.filter(pokemon => !pokemon.hasFainted).map((pokemon, index) => {
                return <li 
                  key={index}
                  onClick={(e) => {
                    const clickedPokemonName = e.target.innerHTML
                    currentPlayerPokemon.name === clickedPokemonName ?
                      setSwitchingSamePokemon(true) :
                      setPlayerBattleTeam(previousState => {
                        const newPokemonIndex = previousState.findIndex(pokemon => pokemon.name === clickedPokemonName)
                        const copy = [...previousState]
                        copy[newPokemonIndex].isOut = true
                        copy[newPokemonIndex].isChoosing = true
                        copy[currentPlayerPokemon.index].isOut = false
                        return copy
                      })
                  }}
                >{pokemon.name}</li>
              })}
            </ul>}
            {switchingSamePokemon && <h3><span className="uppercase">{currentPlayerPokemon?.name}</span> is already out!</h3>}
          </div>
          <div className="options-choices">
            {currentPlayerPokemon.isChoosing && <ul>
              <li onClick={() => {
                setPlayerBattleTeam(previous => updateStatus(previous, currentPlayerPokemon.index, 'isChoosing', false))
                setPlayerBattleTeam(previous => updateStatus(previous, currentPlayerPokemon.index, 'isFighting', true))
              }}>
                FIGHT
              </li>
              <li onClick={() => {
                setMoveHovered(false)
                setPlayerBattleTeam(previous => updateStatus(previous, currentPlayerPokemon.index, 'isChoosing', false))
                setPlayerBattleTeam(previous => updateStatus(previous, currentPlayerPokemon.index, 'isSwitching', true))
              }}>
                POKéMON
              </li>
              <li>BAG</li>
              <li onClick={() => {
                setPlayerBattleTeam(previous => updateStatus(previous, currentPlayerPokemon.index, 'isChoosing', false))
                setPlayerBattleTeam(previous => updateStatus(previous, currentPlayerPokemon.index, 'isRunning', true))
              }}
              >RUN</li>
            </ul>}
            {currentPlayerPokemon.isFighting && <ul>
              <p>PP</p>
              <p>TYP/</p>
              <p>{moveHovered && `${currentPlayerPokemon.moves[currentPlayerMove]?.ppLeft}/${currentPlayerPokemon.moves[currentPlayerMove]?.pp}`}</p>
              <p>{moveHovered && currentPlayerPokemon.moves[currentPlayerMove]?.type}</p>
            </ul>}
            {currentPlayerPokemon?.isAttacking && <h3 
              onClick={() => {
                setPlayerBattleTeam(previous => updateStatus(previous, currentPlayerPokemon.index, 'isAttacking', false))
                setPlayerBattleTeam(previous => updateStatus(previous, currentPlayerPokemon.index, 'hasAttacked', true))
                setCurrentComputerMove(Object.keys(currentComputerPokemon.moves).randomIndex())
              }}
            >NEXT</h3>}
            {currentPlayerPokemon?.hasAttacked && <h3
              onClick={() => {
                setPlayerBattleTeam(previous => updateStatus(previous, currentPlayerPokemon.index, 'hasAttacked', false))
                setPlayerBattleTeam(previous => updateStatus(previous, currentPlayerPokemon.index, 'isChoosing', true))
              }}
            >NEXT</h3>}
          </div>

        </div>


      </div>



    </section>
  </>

}