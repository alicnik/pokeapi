import React from 'react'
import { DragPreviewImage, useDrag } from 'react-dnd'
import { ItemTypes } from '../utils/Helpers'


export const PokemonCard = ({ pokemon, index, handleClick }) => {

  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: ItemTypes.CARD,
      index: index
    },
    collect: monitor => ({ isDragging: !!monitor.isDragging() })
  })

  return <> 
  {/* {console.log(preview)} */}
  {/* Drag preview image below lets you change the preview of what is being dragged, but not the style it seems... */}
    {/* <DragPreviewImage connect={preview} src={pokemon.image} className="sway"  style={{ animation: 'begindrag 16s infinite' }}/> */}
    < div
      ref={drag}
      opacity={isDragging ? '0.5' : '1'}
      id={index}
      //! Probbaly don't need the ternary below unless you have any bright ideas...
      className={`pokedex-card ${isDragging ? 'sway' : ''}`}
      onClick={handleClick} 
      style={isDragging ? { display: 'none' } : {}}>
      <img src={pokemon.image} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
    </div >
  </>
}