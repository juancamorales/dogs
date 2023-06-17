import { useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux"; 
import { dogDetails, clear } from "../../redux/actions"; 
import "./index.css"

const DogDetails = (props)=>{ 
    const {id} = props.match.params; 
    const dispatch = useDispatch() 
    useEffect(()=>{
        dispatch(dogDetails(id))
        return ()=>{
            dispatch(clear())
        }
    }, [id, dispatch]) 
    const dog = useSelector((state) => state.dog)
    return( 
            <div className="l">
                {(dog.length > 0) && dog.map((r)=>
                    <div key={r.id}>
                        <h1>{r.name}</h1> 
                        <img src={r.image} alt="no tiene imagen" width="300px" height="300px" className="l"/> 
                        <p>Peso: {r.peso}Kg</p>
                        <p>Altura: {r.altura}Cm</p>
                        <p>Años De Vida: {r.añosDeVida}</p>
                        <p>Temperamentos</p>
                        { r.characters?.map(i=> 
                            <p className="l" key={i}>{i}</p>
                        )}
                    </div>
                )}
            </div> 
        )
    } 
         
export default DogDetails;