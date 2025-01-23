import './Pokemon.css';


// eslint-disable-next-line react/prop-types
function Pokemon ({name,image})
{

return(<div className="pokemon">
    <div className='pokemonname'>{name}</div>
    <div>
    <img className='pokemonimg' src={image}/></div>
</div>
)


}

export default Pokemon;