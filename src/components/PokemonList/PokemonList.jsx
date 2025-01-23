import { useEffect,useState } from "react";
import axios from 'axios';
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";


function PokemonList()
{
    const [pokemonlist, setPokemonList] = useState([]);
    const [isloading, setIsLoading ] = useState(true);

async function downloadPokemons() {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const pokemonResults= response.data.results;
    console.log(response.data); 

    //iterating over array of pokemons and using the url to iterate over promises(promises are used to make data fetching easy by assuring no intterruption ) that downlaod 
    // detail of those pokemons such as image name id key Etc.

    const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

    //passing that promise array to axios.all(Axios, which is a popular library is mainly used to 
    // send asynchronous(async) HTTP requests to REST endpoints. This library is very useful to perform CRUD operations)
    const pokemonData = await axios.all(pokemonResultPromise);
    console.log(pokemonData);

    //iterating the array data of each pokemon to get desired data keys
    const res = pokemonData.map((pokeData)=>{
      const pokemon =pokeData.data;
      return {
        name:pokemon.name,
        image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny ,
        type:pokemon.types,
        id:pokemon.id}
    }) ;
    console.log(res);
    setPokemonList(res);
    setIsLoading(false);
}



//IMP : useEffect does all this process of executing downloadPokemons function after component gets mounted in DOM server
useEffect(()=>{
downloadPokemons();
},[]);



  return (
    <div className="pokemon-list-wrapper">
 <div className="pokemon-list-wrapper">
 
 <div className="pokemon-wrapper">
                   {(isloading) ? 'Loading...' : pokemonlist.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id}/>)}
  </div>
  <div className='controls'>
             <button>Prev</button>
             <button>Next</button>
  </div>
  </div>
    </div>
  )

}

export default PokemonList;