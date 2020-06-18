import React, { useState, useEffect } from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Welcome } from './components/Welcome'
import { Pokedex } from './components/Pokedex'
import { Battle } from './components/Battle'
import { Prefight } from './components/Prefight'
// import { samplePlayerBattleTeam, sampleComputerBattleTeam } from './utils/Helpers'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import axios from 'axios'
import './styles/style.scss'

const App = () => {
  const [allPokemon, setAllPokemon] = useState([])
  const [chosenPokemon, setChosenPokemon] = useState([])
  const [computerPokemon, setComputerPokemon] = useState([])
  const [playerBattleTeam, setPlayerBattleTeam] = useState([])
  const [computerBattleTeam, setComputerBattleTeam] = useState([])

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon/?limit=151')
      .then(resolvePokemon)
  }, [])

  function resolvePokemon(response) {
    const responseArray = response.data.results.map((pokemon, index) => {
      const capitalizedName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
      const finalName = capitalizedName.replace(/(-.)$/, match => match === '-m' ? '♂' : '♀')
      return {
        name: finalName,
        url: pokemon.url,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        isChosen: false,
        index: index
      }
    })
    setAllPokemon(responseArray)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <HashRouter>
        <main>
          <Header />
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/pokedex">
              <Pokedex 
                allPokemon={allPokemon} 
                setAllPokemon={setAllPokemon} 
                chosenPokemon={chosenPokemon} 
                setChosenPokemon={setChosenPokemon} 
                computerPokemon={computerPokemon} 
                setComputerPokemon={setComputerPokemon}
              />
            </Route>
            <Route path="/prefight">
              <Prefight                 
                chosenPokemon={chosenPokemon} 
                setChosenPokemon={setChosenPokemon} 
                computerPokemon={computerPokemon} 
                setComputerPokemon={setComputerPokemon}
                playerBattleTeam={playerBattleTeam}
                setPlayerBattleTeam={setPlayerBattleTeam}
                computerBattleTeam={computerBattleTeam}
                setComputerBattleTeam={setComputerBattleTeam} 
              />
            </Route>
            <Route path="/battle">
              <Battle 
                playerBattleTeam={playerBattleTeam}
                setPlayerBattleTeam={setPlayerBattleTeam}
                computerBattleTeam={computerBattleTeam}
                setComputerBattleTeam={setComputerBattleTeam}
              />
            </Route>
          </Switch>
        </main>
      </HashRouter>
    </DndProvider>
  )
}

export default App
