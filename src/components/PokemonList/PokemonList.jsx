import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
  });

  // Fetch Pokemon data
  async function downloadPokemons() {
    setPokemonListState((state) => ({ ...state, isLoading: true }));

    try {
      const response = await axios.get(pokemonListState.pokedexUrl);
      const pokemonResults = response.data.results;

      setPokemonListState((state) => ({
        ...state,
        nextUrl: response.data.next,
        prevUrl: response.data.previous,
      }));

      const pokemonResultPromises = pokemonResults.map((pokemon) =>
        axios.get(pokemon.url)
      );

      const pokemonData = await axios.all(pokemonResultPromises);

      const pokeListResult = pokemonData.map((pokeData) => {
        const pokemon = pokeData.data;
        return {
          name: pokemon.name,
          image: pokemon.sprites.other
            ? pokemon.sprites.other.dream_world.front_default
            : pokemon.sprites.front_shiny,
          type: pokemon.types,
          id: pokemon.id,
        };
      });

      setPokemonListState((state) => ({
        ...state,
        pokemonList: pokeListResult,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setPokemonListState((state) => ({ ...state, isLoading: false }));
    }
  }

  // Execute on component mount and when pokedexUrl changes
  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {pokemonListState.isLoading
          ? "Loading..."
          : pokemonListState.pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
      </div>

      <div className="controls">
        <button
          disabled={!pokemonListState.prevUrl}
          onClick={() =>
            setPokemonListState((state) => ({
              ...state,
              pokedexUrl: state.prevUrl,
            }))
          }
        >
          Prev
        </button>

        <button
          disabled={!pokemonListState.nextUrl}
          onClick={() =>
            setPokemonListState((state) => ({
              ...state,
              pokedexUrl: state.nextUrl,
            }))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
