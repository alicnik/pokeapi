import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Pokemon } from '../utils/Helpers'


//TODO How can we make sure this always returns 4 moves?

async function getMoves(arrayOfMoves) {
  const moves = {}
  moreMoves(moves)
  function moreMoves(moves) {
    if (Object.keys(moves).length < 4) {
      const url = arrayOfMoves.randomIndex().move.url
      resolveMove(url).then(data => {
        if (data.power > 0) {
          Object.assign(moves, { [data.name]: { ...data, ppLeft: data.pp } })
        }
        moreMoves(moves)
      })
    }
    return
  }
  return moves
}

const resolveMove = async (moveUrl) => {
  const response = await axios.get(moveUrl)
  const { accuracy, name, pp, type, power } = response.data
  return { accuracy, name, pp, type: type.name, power }
}

function createBattleTeam(initialArray) {
  const team = Promise.all(
    initialArray.map(async (pkmn, index) => {
      return getMoves(pkmn.moves).then(moves => {
        return new Pokemon(pkmn.name, 
          pkmn.stats[0].base_stat,
          pkmn.stats[1].base_stat,
          pkmn.stats[2].base_stat,
          pkmn.stats[3].base_stat,
          pkmn.stats[4].base_stat,
          pkmn.stats[5].base_stat,
          [pkmn.types.map(typeObj => typeObj.type.name)],
          pkmn.sprites.back_default,
          pkmn.sprites.front_default,
          moves,
          index
        )
      })
    })
  )
  return team
}


export const Prefight = ({ chosenPokemon, computerPokemon, playerBattleTeam, setPlayerBattleTeam,computerBattleTeam, setComputerBattleTeam }) => {

  useEffect(()=>{
    createBattleTeam(chosenPokemon)
      .then(data => setPlayerBattleTeam(data))
      .catch((err)=>console.log(err))
    createBattleTeam(computerPokemon)
      .then(data => setComputerBattleTeam(data))
      .catch((err)=>console.log(err))
  }, [chosenPokemon, computerPokemon])

  return <section id="prefight">
    <div className="battle-lineup-banner top-banner">
      <h2 className="battle-lineup-heading">Computer Team</h2>
    </div>

    <div className="battle-lineup computer-lineup">
      {computerBattleTeam.map((pokemon, index) => {
        return <div key={index} className='battle-lineup-card'>
          <img src={pokemon.frontSprite} alt={pokemon.name}/>
          <h3>{pokemon.name}</h3>
        </div>
      })}
    </div>
    <div className="battle-lineup player-lineup">
      {playerBattleTeam.map((pokemon, index) => {
        return <div key={index} className='battle-lineup-card'>
          <img src={pokemon.frontSprite} alt={pokemon.name}/>
          <h3>{pokemon.name}</h3>
        </div>
      })}
    </div>
    <div className="battle-lineup-banner bottom-banner">
      <Link to='./battle'>
        <button className="battle-lineup-ready">Ready?</button>
      </Link>
      <h2 className="battle-lineup-heading">Your Team</h2>
    </div>
  </section>
}
