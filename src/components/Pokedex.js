import React, { useEffect } from 'react'
import { PokemonCard } from './PokemonCard'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../utils/Helpers'
import { Link } from 'react-router-dom'
import axios from 'axios'

export const Pokedex = ({ allPokemon, setAllPokemon, chosenPokemon, setChosenPokemon, computerPokemon, setComputerPokemon }) => {

  function handleClick(e) {
    const clickedIndex = Number(e.target.id)
    transferCard(clickedIndex)
  }

  function transferCard(clickedIndex) {
    setChosenPokemon(previousState => {
      return allPokemon[clickedIndex].isChosen ?
        previousState.filter(pokemon => pokemon.index !== clickedIndex) :
        previousState.concat(allPokemon[clickedIndex])
    })
    setAllPokemon(previousState => {
      return previousState.map((pokemon, index) => index !== clickedIndex ? pokemon : {
        ...pokemon,
        isChosen: !pokemon.isChosen
      })
    })
  }

  const makeDroppable = () => {
    const [, drop] = useDrop({
      accept: ItemTypes.CARD,
      drop: item => {
        transferCard(item.index)
      },
      collect: monitor => ({
        isOver: !!monitor.isOver()
      })
    })
    return drop
  }

  function computerChooses() {
    if (chosenPokemon.length < 6 || computerPokemon.length > 5) return
    for (let i = 0; i < 6; i++) {
      const choice = allPokemon.randomIndex()
      setComputerPokemon(previousState => previousState.concat(choice))
    }
  }

  useEffect(() => {
    computerChooses()
  }, [chosenPokemon])

  function getPokemonDetails(array, setter) {
    if (array.length < 5) return 
    const promise = new Promise(resolve => {
      const newArray = Promise.all(array.map(async (pokemon) => {
        const pokemonDetails = await axios.get(pokemon.url)
        return pokemonDetails.data
      }))
      resolve(newArray)
    })
    promise.then(response => setter(response))
  }
  
  function handleSubmit() {
    getPokemonDetails(computerPokemon, setComputerPokemon)
    getPokemonDetails(chosenPokemon, setChosenPokemon)
  }

  const Pokedex = () => {
    const drop = makeDroppable()
    return (
      <div ref={drop} className={chosenPokemon.length > 5 ? 'pokedex-choices pointer-events-none' : 'pokedex-choices'}>
        <h1>Pokedex</h1>
        {allPokemon.map((pokemon, index) => (pokemon.isChosen ||
          <PokemonCard key={index} pokemon={pokemon} index={index} handleClick={handleClick} />
        ))}
      </div>
    )
  }

  const ChosenPokemon = () => {
    const drop = makeDroppable()
    return (
      <div ref={drop} className="chosen-pokemon">
        <div className="chosen-pokemon-header">
          <img src="../assets/pokemon-bag.svg" alt="pokemon bag" />
          <h2>Your team</h2>
        </div>
        {allPokemon.map((pokemon, index) => (pokemon.isChosen &&
          <PokemonCard key={index} pokemon={pokemon} index={index} handleClick={handleClick} />
        ))}
        {chosenPokemon.length < 1 && <div className="click-to-choose">Click or drag to add pokémon to your team.</div>}
        {chosenPokemon.length > 5 && <Link to='/prefight'><button onClick={handleSubmit}>Proceed</button></Link>}
      </div>
    )
  }

  return (
    <section id="pokedex">
      <Pokedex />
      <ChosenPokemon />
    </section>
  )
}