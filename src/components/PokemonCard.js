import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../utils/Helpers'


export const PokemonCard = ({ pokemon, index, handleClick }) => {

  const [{ isDragging }, drag] = useDrag({
    item: { 
      type: ItemTypes.CARD, 
      index: index 
    },
    collect: monitor => ({ isDragging: !!monitor.isDragging() })
  })
  
  return (
    <div 
      ref={drag}
      opacity={isDragging ? '0.5' : '1'}
      id={index} 
      className="pokedex-card" 
      onClick={handleClick}>
      <img src={pokemon.image} alt={pokemon.name}/>
      <h3>{pokemon.name}</h3>
    </div>
  )
}