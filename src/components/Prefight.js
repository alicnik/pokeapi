import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Pokemon } from '../utils/Helpers'

async function getMoves(arrayOfMoves) {
  const moves = {}
  for (let i = 0; i < 4; i++) {
    const url = arrayOfMoves.randomIndex().move.url
    resolveMove(url).then(data => {
      Object.assign(moves, { [data.name]: { ...data } })
    })
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
    initialArray.map(async pkmn => {
      return getMoves(pkmn.moves).then(data => {
        return new Pokemon(pkmn.name, 
          pkmn.stats[0].base_stat,
          pkmn.stats[1].base_stat,
          pkmn.stats[2].base_stat,
          pkmn.stats[3].base_stat,
          pkmn.stats[4].base_stat,
          pkmn.stats[5].base_stat,
          [...pkmn.types],
          pkmn.sprites.back_default,
          pkmn.sprites.front_default,
          { data }
        )
      })
    })
  )
  return team
}


export const Prefight = ({ chosenPokemon, computerPokemon }) => {

  const [playerBattleTeam, setPlayerBattleTeam] = useState([])
  const [computerBattleTeam, setComputerBattleTeam] = useState([])

  useEffect(()=>{
    console.log(chosenPokemon)
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
