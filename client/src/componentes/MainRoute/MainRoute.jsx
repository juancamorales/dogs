import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllDogs, getdogs, orderByName, orderByTemperament, orderByPeso, getdogss, getAllTemperament, orderporTemperament } from '../../redux/actions';
import Dog from "../Dog/Dog"
import Paginado from '../Paginado/Paginado';
import "./index.css"

function validate (input) {
  let error = {}
  if (!/^[\w\s]{1,30}$/.test(input.name)){
    error.name = "nombre no valido"
  }
  return error
}

const Dogs = (props)=>{

  const [ input, setInput] = useState({
    name: "",
  })

  const [errors, setErrors] = useState({});

  const con = props.dogs

  const [order, setOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1); //1 porque arranca en la primer pagina

  const [countriesPerPage] = useState(8); //cuantos dog por pagina

  const indexOfLastCountry = currentPage * countriesPerPage; 

  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

  const currentCountry = props.dogs?.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  useEffect(()=>{
    if(props.dogs?.length <= 0){
    props.getAllDogs()
    props.getAllTemperament()
    }
  }, [props])

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleInputChange = function(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    let error = validate({...input, [e.target.name]: e.target.value})
        setErrors(error)
  }

  const handle = e =>{
    e.preventDefault()
    if(input.name){
      if(!errors.name){
        props.getdogs(input.name)
        e.target[0].value = ""
      }
    }
  }
  function handleSortName(e) {
    e.preventDefault();
    props.orderByName(e.target.value)
    setCurrentPage(1); //seteando para que arranque de la pagina uno
    setOrder(`Ordenando de la ${e.target.value}`); //para que cuando setea la pagina modifique el estado local y se reenderize
    const fun = ()=>{ return setTimeout(()=>{setOrder("")}, 5000)}
    fun()
  }

  function handleFilterTemperament(e) {
    e.preventDefault()
    props.orderByTemperament(e.target.value);
    setCurrentPage(1);
    setOrder(`Ordenando ${e.target.value}`);
    const fun = ()=>{ return setTimeout(()=>{setOrder("")}, 5000)}
    fun()
  }

  function handlePeso(e) {
    e.preventDefault()
    props.orderByPeso(e.target.value);
    setCurrentPage(1);
    setOrder(`Ordenando de ${e.target.value}`);
    const fun = ()=>{ return setTimeout(()=>{setOrder("")}, 5000)}
    fun()
  }

  function handleName(e) {
    e.preventDefault()
    props.getdogss(e.target.value);
    setCurrentPage(1);
    setOrder(`Ordenando Por ${e.target.value}`);
    const fun = ()=>{ return setTimeout(()=>{setOrder("")}, 5000)}
    fun()
  }

  function handleTemperament(e) {
    e.preventDefault()
    props.orderporTemperament(e.target.value);
    setCurrentPage(1);
    setOrder(`Ordenando Por ${e.target.value}`);
    const fun = ()=>{ return setTimeout(()=>{setOrder("")}, 5000)}
    fun()
  }

  const hand = e =>{
    e.preventDefault()
    props.getAllDogs()
  }

  return(
    <div className='gra'>
      <select
            onChange={(e) => handleSortName(e)}
            defaultValue={"default"}
          >
            <option value="default" disabled>
              Ordenar Por Nombre
            </option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
          <select
            onChange={(e) => handleFilterTemperament(e)}
            defaultValue={"default"}
          >
            <option value="default" disabled>
              Ordenar Por Temperamentos
            </option>
            <option value="Con Temperamentos">Con Temperamentos</option>
            <option value="Sin Temperamentos">Sin Temperamentos</option>
          </select>
          <select
            onChange={(e) => handlePeso(e)}
            defaultValue={"default"}
          >
            <option value="default" disabled>
              Ordenar Por Peso
            </option>
            <option value="Menor a Mayor">Menor a Mayor</option>
            <option value="Mayor a Menor">Mayor a Menor</option>
          </select>
          <select
            onChange={(e) => handleName(e)}
            defaultValue={"default"}
          >
            <option value="default" disabled>
              Ordenar Por API y BSD
            </option>
            <option value="api">API</option>
            <option value="BSD">BSD</option>
          </select>
          <select 
            onChange={(e) => handleTemperament(e)}
            defaultValue={"default"}
            >
              <option value="default" disabled>
              Ordenar por temperament
            </option>
            {(props.temperament?.length > 0) && 
            props.temperament.map((i)=>
            <option value={i} key={i}>{i}</option>
            )
            }
            </select>
      <form onSubmit={(e)=>handle(e)}>
        <label>Nombre De La Raza De Perro: </label>
        <input type="text" name="name" onChange={handleInputChange}  value={input.name}/>
        <button type="submit">Buscar</button>
        <button onClick={(e)=>hand(e)}>|^|</button>
        {errors.name && (<p className="danger">{errors.name}</p>)}
        {(props.mesege.resp?.length > 0) && 
          <p>{props.mesege.resp[0].message}</p>
        }
      </form>
      {(order) && <p className='l'>{order}</p>}
      <div className='fle'>
      { currentCountry?.map(r=> <Dog 
            id={r.id}
            key={r.id}
            name={r.name}
            img={r.image}
            characters={r.characters}
            peso={r.peso}
            añosDeVida={r.añosDeVida}
            />)}
            <Paginado
          countriesPerPage={countriesPerPage}
          allCountries={con?.length}
          paginado={paginado}
        />
        </div>
    </div>
  )
}

export const mapStateToProps = state=>{
  return {
    dogs: state.dogs,
    dogs1: state.dogs1,
    mesege: state.mesege,
    temperament: state.temperament
  }
}

export const mapDispatchToProps = dispatch=>{
  return {
    getAllDogs: () => dispatch(getAllDogs()),
    getdogs: (name)=> dispatch(getdogs(name)),
    orderByName: (strr)=> dispatch(orderByName(strr)),
    orderByTemperament: (str)=> dispatch(orderByTemperament(str)),
    orderByPeso: (str)=> dispatch(orderByPeso(str)),
    getdogss: (str)=> dispatch(getdogss(str)),
    getAllTemperament: ()=> dispatch(getAllTemperament()),
    orderporTemperament: (str)=> dispatch(orderporTemperament(str))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dogs)
