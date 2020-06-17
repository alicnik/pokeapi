import React, { useState } from 'react'
import { PokemonCard } from './PokemonCard'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../utils/Helpers'
import { Link } from 'react-router-dom'

export const Pokedex = ({ allPokemon, setAllPokemon, chosenPokemon, setChosenPokemon }) => {

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

  function handleSubmit() {
    // API call for chosen pokemon
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
          <span>
            <img src="../assets/pokemon-bag.svg" alt="pokemon bag" />
            <h2>Your team</h2>
          </span>
        </div>
        {allPokemon.map((pokemon, index) => (pokemon.isChosen &&
          <PokemonCard key={index} pokemon={pokemon} index={index} handleClick={handleClick} />
        ))}
        {chosenPokemon.length < 1 && <div className="click-to-choose">Click or drag to add pokémon to your team.</div>}
        {chosenPokemon.length > 5 && <Link to='/battle'><button className="battle-button" onClick={handleSubmit}>Proceed</button></Link>}
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