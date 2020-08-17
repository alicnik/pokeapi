import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import pokeBall from '../assets/pokeball.svg'

const audio = new Audio('../assets/battle-theme.mp3')
audio.volume = 0.5

export const Battle = ({ setAllPokemon, playerBattleTeam,setChosenPokemon, setPlayerBattleTeam,computerBattleTeam, setComputerBattleTeam }) => {
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

  useEffect(() => {
    const playerIndex = playerBattleTeam.findIndex(pokemon => pokemon.isOut)
    const computerIndex = computerBattleTeam.findIndex(pokemon => pokemon.isOut)
    const currentPlayerInstance = playerBattleTeam[playerIndex]
    const currentComputerInstance = computerBattleTeam[computerIndex]
    // currentPlayerInstance.willThisPokemonFaint(currentComputerMove)
    // currentComputerInstance.willThisPokemonFaint(currentPlayerMove)
    if (currentPlayerInstance.isAttacking) {
      console.log('line 47')
      const damage = currentPlayerInstance?.attack(currentPlayerMove, currentComputerPokemon)
      currentComputerInstance.reduceHp(damage)
    }
    if (currentPlayerInstance.hasAttacked && !currentComputerInstance.isChoosing) {
      console.log('line 52')
      console.log(currentComputerInstance)
      const damage = currentComputerInstance?.attack(currentComputerMove, currentPlayerPokemon)
      currentPlayerInstance.reduceHp(damage)
    }
  })

  useEffect(() => {
    const playerIndex = playerBattleTeam.findIndex(pokemon => pokemon.isOut)
    const computerIndex = computerBattleTeam.findIndex(pokemon => pokemon.isOut)
    // const currentPlayerInstance = playerBattleTeam[playerIndex]
    const currentComputerInstance = computerBattleTeam[computerIndex]
    // console.log(history)
    
    if (currentComputerInstance?.hasFainted && computerBattleTeam.filter(pokemon => !pokemon.hasFainted).length < 1) {
      alert('YOU WON!')
    } else if (currentComputerInstance?.hasFainted) {
      setComputerBattleTeam(previous => {
        const copy = [...previous]
        copy[computerIndex].isOut = false
        copy[computerIndex + 1].isOut = true
        return copy
      })
      setPlayerBattleTeam(previous => {
        const copy = [...previous]
        copy[playerIndex].isAttacking = false
        copy[playerIndex].hasAttacked = false
        copy[playerIndex].isChoosing = true
        return copy
      })
    }
  }, [playerBattleTeam, computerBattleTeam])

  return <>
    <section id="battle">
      <div className="opponent">
        <div className="opponent-stats">
          <h3>{currentComputerPokemon?.name || ''}</h3>
          <progress 
            value={computerBattleTeam[currentComputerPokemon?.index]?.currentHp || '0'} 
            max={currentComputerPokemon?.hp || '0'}>
          </progress>
          <p>HP: {computerBattleTeam[currentComputerPokemon?.index]?.currentHp || '0'}/{currentComputerPokemon?.hp || '0'}</p>
        </div>
        <div className="opponent-sprite">
          <img src={currentComputerPokemon?.frontSprite || pokeBall}></img>
        </div>
      </div>

      <div className="player">
        <div className="player-sprite">
          <img src={currentPlayerPokemon?.backSprite || pokeBall}></img>
        </div>
        <div className="player-stats">
          <h3>{currentPlayerPokemon?.name || ''}</h3>
          <progress value={playerBattleTeam[currentPlayerPokemon?.index]?.currentHp || '0'} max={currentPlayerPokemon?.hp || '0'}></progress>
          <p>HP: {playerBattleTeam[currentPlayerPokemon?.index]?.currentHp || '0'}/{currentPlayerPokemon?.hp || '0'}</p>
        </div>

        <button style={{ position: 'absolute', border: 'none', backgroundColor: 'transparent', color: 'grey' }}
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
                  onClick={() => {
                    if (currentPlayerPokemon.moves[currentPlayerMove].pp < 1) return
                    computerBattleTeam[currentComputerPokemon.index].willThisPokemonFaint(playerBattleTeam[currentPlayerPokemon.index]?.attack(currentPlayerMove, currentComputerPokemon))
                    setPlayerBattleTeam(previous => updateStatus(previous, currentPlayerPokemon.index, 'isFighting', false))
                    setPlayerBattleTeam(previous => updateStatus(previous, currentPlayerPokemon.index, 'isAttacking', true))
                    setComputerBattleTeam(previous => updateStatus(previous, currentComputerPokemon.index, 'isChoosing', false))
                    setCurrentComputerMove(Object.keys(currentComputerPokemon.moves).randomIndex())
                    console.log('comp index:' , currentComputerPokemon.index)
                    console.log('comp battle team at comp index:' , computerBattleTeam[currentComputerPokemon.index])
                  }}
                >
                  {playerMove.name}
                </li>
              })}          
            </ul>
            }
            {currentPlayerPokemon?.isAttacking && <h3><span className='uppercase'>{currentPlayerPokemon?.name}</span> used <span className="uppercase">{currentPlayerMove}</span>!</h3>}
            {currentPlayerPokemon?.isAttacking && computerBattleTeam[currentComputerPokemon.index].hasFainted && <h3><span className='uppercase'>{currentComputerPokemon?.name}</span> fainted!</h3>}
            {currentPlayerPokemon?.hasAttacked && <h3><span className='uppercase'>{currentComputerPokemon?.name}</span> used <span className="uppercase">{currentComputerMove}</span>!</h3>}
            {currentPlayerPokemon?.isRunning && <h3>You can&rsquo;t run from a battle!</h3>}
            {(currentPlayerPokemon?.isSwitching && !switchingSamePokemon) && <ul>
              {console.log('This is the playerBattleTeam:', playerBattleTeam)}
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
                        copy[newPokemonIndex].isSwitching = false
                        copy[currentPlayerPokemon.index].isSwitching = false
                        return copy
                      })
                  }}
                >{pokemon.name}</li>
              })}
            </ul>}
            {switchingSamePokemon && <h3><span className="uppercase">{currentPlayerPokemon?.name}</span> is already out!</h3>}
            {currentPlayerPokemon?.hasFainted && playerBattleTeam.filter(pokemon => !pokemon.hasFainted).length > 0 && <>
              <h3><span className='uppercase'>{currentPlayerPokemon?.name}</span> has fainted. Please choose another POKéMON:</h3>
              <ul>
                {console.log('This is the playerBattleTeam:', playerBattleTeam)}
                {playerBattleTeam.filter(pokemon => !pokemon.hasFainted).map((pokemon, index) => {
                  return <li 
                    key={index}
                    onClick={(e) => {
                      const clickedPokemonName = e.target.innerHTML
                      setPlayerBattleTeam(previousState => {
                        const newPokemonIndex = previousState.findIndex(pokemon => pokemon.name === clickedPokemonName)
                        const copy = [...previousState]
                        copy[newPokemonIndex].isOut = true
                        copy[newPokemonIndex].isChoosing = true
                        copy[newPokemonIndex].isSwitching = false
                        copy[currentPlayerPokemon.index].isChoosing = false
                        copy[currentPlayerPokemon.index].isOut = false
                        copy[currentPlayerPokemon.index].isSwitching = false
                        return copy
                      })
                    }}
                  >{pokemon.name}</li>
                })}
              </ul>
            </>}
            {currentPlayerPokemon?.hasFainted && playerBattleTeam.filter(pokemon => !pokemon.hasFainted).length < 1 && <>
            <h3>GAME OVER</h3>
            <Link to='/'><h3>START OVER</h3></Link>
            </>}
          </div>
          
          <div className="options-choices">
            {currentPlayerPokemon.isChoosing && <ul>
              <li onClick={() => {
                setPlayerBattleTeam(previous => updateStatus(previous, currentPlayerPokemon.index, 'isChoosing', false))
                setPlayerBattleTeam(previous => updateStatus(previous, currentPlayerPokemon.index, 'isFighting', true))
                setComputerBattleTeam(previous => updateStatus(previous, currentComputerPokemon.index, 'isChoosing', true))

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
              <li 
                onClick={() => {
                  setAllPokemon(previousState => {
                    return previousState.map((pokemon) => ({
                      ...pokemon,
                      isChosen: false
                    }))
                  })
                  setChosenPokemon([])
                }}
              ><Link to='/pokedex'>RUN</Link></li>
            </ul>}
            {currentPlayerPokemon.isFighting && <ul>
              <p>PP</p>
              <p>TYP/</p>
              <p>{moveHovered && `${currentPlayerPokemon.moves[currentPlayerMove]?.ppLeft}/${currentPlayerPokemon.moves[currentPlayerMove]?.pp}`}</p>
              <p>{moveHovered && currentPlayerPokemon.moves[currentPlayerMove]?.type}</p>
            </ul>}
            {currentPlayerPokemon?.isAttacking && !computerBattleTeam[currentComputerPokemon.index].willFaint && <h3 
              onClick={() => {
                setPlayerBattleTeam(previous => updateStatus(previous, currentPlayerPokemon.index, 'isAttacking', false))
                setPlayerBattleTeam(previous => updateStatus(previous, currentPlayerPokemon.index, 'hasAttacked', true))
              }}
            >NEXT</h3>}
            {currentPlayerPokemon?.isAttacking && computerBattleTeam[currentComputerPokemon.index].willFaint && <h3 
              onClick={() => {
                setPlayerBattleTeam(previous => updateStatus(previous, currentPlayerPokemon.index, 'isAttacking', false))
                setPlayerBattleTeam(previous => updateStatus(previous, currentPlayerPokemon.index, 'isChoosing', true))
              }}
            >NEXT</h3>}
            {currentPlayerPokemon?.hasAttacked && !currentPlayerPokemon?.hasWon && <h3
              onClick={() => {
                setPlayerBattleTeam(previous => updateStatus(previous, currentPlayerPokemon.index, 'hasAttacked', false))
                setPlayerBattleTeam(previous => !currentPlayerPokemon.hasFainted ? updateStatus(previous, currentPlayerPokemon.index, 'isChoosing', true) : previous)
              }}
            >NEXT</h3>}
            {currentPlayerPokemon?.hasWon && <Link to='/pokedex'><h3>START OVER</h3></Link>}
          </div>

        </div>


      </div>



    </section>
  </>

}