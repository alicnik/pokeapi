import React, { useEffect } from 'react';
import { PokemonCard } from './PokemonCard';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/Helpers';
import { Link } from 'react-router-dom';
import axios from 'axios';
import pokemonBag from '../assets/pokemon-bag.svg';
import { getRandomElement } from '../utils/Helpers';
import { useHistory } from 'react-router-dom';

export const Pokedex = ({
  allPokemon,
  setAllPokemon,
  chosenPokemon,
  setChosenPokemon,
  computerPokemon,
  setComputerPokemon,
}) => {
  const history = useHistory();

  function handleClick(e) {
    const clickedIndex = Number(e.target.id);
    transferCard(clickedIndex);
  }

  function transferCard(clickedIndex) {
    setChosenPokemon((previousState) => {
      return allPokemon[clickedIndex].isChosen
        ? previousState.filter((pokemon) => pokemon.index !== clickedIndex)
        : previousState.concat(allPokemon[clickedIndex]);
    });
    setAllPokemon((previousState) => {
      return previousState.map((pokemon, index) =>
        index !== clickedIndex
          ? pokemon
          : {
              ...pokemon,
              isChosen: !pokemon.isChosen,
            },
      );
    });
  }

  const makeDroppable = () => {
    const [, drop] = useDrop({
      accept: ItemTypes.CARD,
      drop: (item) => {
        transferCard(item.index);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });
    return drop;
  };

  function computerChooses() {
    if (chosenPokemon.length < 6 || computerPokemon.length > 5) return;
    for (let i = 0; i < 6; i++) {
      const choice = getRandomElement(allPokemon);
      setComputerPokemon((previousState) => previousState.concat(choice));
    }
  }

  useEffect(() => {
    computerChooses();
  }, [chosenPokemon]);

  async function getPokemonDetails(array, setter) {
    if (array.length < 5) return;
    const pokemonDetails = await Promise.all(
      array.map(async (pokemon) => {
        const response = await axios.get(pokemon.url);
        return response.data;
      }),
    );
    setter(pokemonDetails);
  }

  async function handleSubmit() {
    await Promise.all([
      getPokemonDetails(computerPokemon, setComputerPokemon),
      getPokemonDetails(chosenPokemon, setChosenPokemon),
    ]);
    history.push('/prefight');
  }

  const Pokedex = () => {
    const drop = makeDroppable();
    return (
      <div
        ref={drop}
        className={
          chosenPokemon.length > 5
            ? 'pokedex-choices pointer-events-none'
            : 'pokedex-choices'
        }
      >
        <h1>Pokedex</h1>
        {allPokemon.map(
          (pokemon, index) =>
            pokemon.isChosen || (
              <PokemonCard
                key={index}
                pokemon={pokemon}
                index={index}
                handleClick={handleClick}
              />
            ),
        )}
      </div>
    );
  };

  const ChosenPokemon = () => {
    const drop = makeDroppable();
    return (
      <div ref={drop} className="chosen-pokemon">
        <div className="chosen-pokemon-header">
          <span>
            <img src={pokemonBag} alt="pokemon bag" />
            <h2>Your team</h2>
          </span>
        </div>
        {allPokemon.map(
          (pokemon, index) =>
            pokemon.isChosen && (
              <PokemonCard
                key={index}
                pokemon={pokemon}
                index={index}
                handleClick={handleClick}
              />
            ),
        )}
        {chosenPokemon.length < 1 && (
          <div className="click-to-choose">
            Click or drag to add pokémon to your team.
          </div>
        )}
        {chosenPokemon.length > 5 && (
          <button className="battle-button" onClick={handleSubmit}>
            Proceed
          </button>
        )}
      </div>
    );
  };

  return (
    <section id="pokedex">
      <Pokedex />
      <ChosenPokemon />
    </section>
  );
};
