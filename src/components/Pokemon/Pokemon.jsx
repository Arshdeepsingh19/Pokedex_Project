import './Pokemon.css';
import { Link } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
function Pokemon ({name,image,id})
{

return(<div className="pokemon">
           <Link to = {`/pokemon/${id}`}>
    <div className='pokemonname'>{name}</div>
    <div>
    <img className='pokemonimg' src={image} /></div>
    </Link>
</div>
)


}

export default Pokemon;