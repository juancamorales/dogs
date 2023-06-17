import { Link } from 'react-router-dom';
import "./index.css"

const Dog = (props)=>{

    return(
        <div className='flew'>
            {(props.peso?.length > 0) ? 
            <div>
            <Link to={`/Dog/${props.id}`}><h3 className='r'>{props.name}</h3></Link>
            <img 
            src={props.img}
            alt={props.name}
            width="100px"
            height="100px"
            className='r'
            />
            <p>Años De Vida: {props.añosDeVida}</p>
            <p>Peso: {props.peso}Kg</p>
            </div>
        : <h5 key={props.name}>{props.name}</h5>}
        </div>
    )
}

export default Dog;