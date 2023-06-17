import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getAllTemperament, postRaza } from "../../redux/actions";
import Dog from "../Dog/Dog";
import "./index.css"

function validate (input) {
  let error = {}
  if (!/^[\w\s]{1,30}$/.test(input.name)){
    error.name = "nombre no valido"
  }
  if(!input.name){
    error.name = "se requiere un nombre"
  }
  if(!input.altura_max){
    error.altura_max = "se requiere altura max"
  }
  if(!input.altura_min){
    error.altura_min = "se requiere altura min"
  }
  if(!input.peso_max){
    error.peso_max = "se requiere peso max"
  }
  if(!input.peso_min){
    error.peso_min = "se requiere peso min"
  }
  if(!input.vida_max){
    error.vida_max = "se requiere vida max"
  }
  if(!input.vida_min){
    error.vida_min = "se requiere vida min"
  }
  return error
}

const CreateDog = (props)=>{

  const [sta, setSta] = useState({
    name: "",
    altura_min: 0,
    altura_max: 0,
    peso_min: 0,
    peso_max: 0,
    vida_min: 0,
    vida_max: 0,
    id: []
  })

  const [errors, setErrors] = useState({});
  const [loding, setLonding] = useState(false);

  const [values, setValues] = useState({ image: ""});

  let contador1 = 0

  let contador4 = 0

  let contador5 = 0

  const s = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80]

   const sd = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]

  useEffect(()=>{
    if(props.temperament.length <= 0){
      props.getAllTemperament()
    }
  }, [props])

  const handleInputChange = (e)=>{
    setSta({
      ...sta,
      [e.target.name]: e.target.value
    })
    let error = validate({...sta, [e.target.name]: e.target.value})
    setErrors(error)
  }

  const handle = (e, iiD) =>{
    e.preventDefault()
    const dd = sta.id?.filter((i)=> i === iiD)
    if(!dd?.length > 0){
          return setSta({
            ...sta,
            id: [...sta.id, iiD]})
  } else {
    return setSta({
      ...sta,
      id: sta.id?.filter((i)=> i !== iiD)})
  }
  }

  const handle3 = (e)=>{
    e.preventDefault()
    props.postRaza({
        name:sta.name, 
        altura:`${sta.altura_min} - ${sta.altura_max}`,
        peso:`${sta.peso_min} - ${sta.peso_max}`,
        temperament:sta.id,
        añosDeVida:`${sta.vida_min} - ${sta.vida_max} years`,
        image: values.image
    })
  }

  function co(arr, id){
    let co = 0;
    for(var i = 0; i < arr?.length; i++){
      if(arr[i]===id){
        co = 1;
      }
    }
    if(co === 0){ 
      return true
    } else {
      return undefined
    }
  }
  const uqdat = async (e) => {
    const files = e.target.files;
    const data2 = new FormData();
    data2.append("file", files[0]);
    data2.append("upload_preset", "images");
    setLonding(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/bl3ychz/image/upload",
      {
        method: "POST",
        body: data2,
      }
    );
    const file = await res.json();
    setLonding(false);
    return setValues({
      ...values,
      image: file.secure_url,
    });
  };

  return(
    <div className="gra">
      <h1>CREA TU RAZA DE PERRO</h1>
      <form onSubmit={(e)=>handle3(e)}>
        <label htmlFor="name">Nombre: </label>
          <input type="text" name="name" onChange={handleInputChange}/>
          {errors?.name && (<p className="danger">{errors?.name}</p>)}
          <h3>Altura</h3>
          <select
                defaultValue={"default"}
                name="altura_min"
                onChange={handleInputChange}
              >
                <option value="default" disabled>
                  min:
                </option>
                {s.map((i)=> 
                    <option key={i} value={i}>{i}</option>
                )}
              </select>
              <select
                defaultValue={"default"}
                name="altura_max"
                onChange={handleInputChange}
              >
                <option value="default" disabled>
                  max:
                </option>
                {s.map((i)=> 
                    <option key={i+1000} value={i}>{i}</option>
                )}
              </select>
              {errors?.altura_max && (<p className="danger">{errors?.altura_max}</p>)}
              {errors?.altura_min && (<p className="danger">{errors?.altura_min}</p>)}
              <h3>Peso</h3>
          <select
                defaultValue={"default"}
                name="peso_min"
                onChange={handleInputChange}
              >
                <option value="default" disabled>
                  min:
                </option>
                {s.map((i)=> 
                    <option key={i} value={i}>{i}</option>
                )}
              </select>
              <select
                defaultValue={"default"}
                name="peso_max"
                onChange={handleInputChange}
              >
                <option value="default" disabled>
                  max:
                </option>
                {s.map((i)=> 
                    <option key={i+1000} value={i}>{i}</option>
                )}
              </select>
              {errors?.peso_max && (<p className="danger">{errors?.peso_max}</p>)}
              {errors?.peso_min && (<p className="danger">{errors?.peso_min}</p>)}
              <h3>Años De Vida</h3>
          <select
                defaultValue={"default"}
                name="vida_min"
                onChange={handleInputChange}
              >
                <option value="default" disabled>
                  min:
                </option>
                {sd.map((i)=> 
                    <option key={i} value={i}>{i}</option>
                )}
              </select>
              <select
                defaultValue={"default"}
                name="vida_max"
                onChange={handleInputChange}
              >
                <option value="default" disabled>
                  max:
                </option>
                {sd.map((i)=> 
                    <option key={i+100} value={i}>{i}</option>
                )}
              </select>
              <label for="image" className="selectI">
              <h3>Select Image</h3>
              <input
                id="image"
                className="select-image"
                type="file"
                name="image"
                onChange={uqdat}
              />
            </label>
              {errors?.vida_max && (<p className="danger">{errors?.vida_max}</p>)}
              {errors?.vida_min && (<p className="danger">{errors?.vida_min}</p>)}
              {(!errors.vida_max?.length > 0 && !errors.vida_min?.length > 0 && !errors.peso_min?.length > 0 && !errors.peso_max?.length > 0 && !errors.altura_min?.length > 0 && !errors.altura_max?.length > 0 && !errors.name?.length > 0 && sta.name) && 
                <button type="submit">CREAR</button>
              }
              {(props.mesege1.message?.length > 0) && 
                <p key={props.mesege1.message}>{props.mesege1.message}</p>
              }
              </form>
              <div className="fle">
              {(props.temperament?.length > 0) && props.temperament?.map(r=> 
                <div key={contador5++} className="flew">
                  <Dog key={r}
                    name={r}/>
                    {(co(sta.id, r)) ?
                      <button key={contador1++} onClick={(e)=>handle(e,r)} className="bien">Añadir</button>
                      :<button key={contador4+1000} onClick={(e)=>handle(e,r)} className="danger">Sacar</button>
                    }
                </div> 
              )}
            </div>
    </div>
  )
}

export const mapStateToProps = state=>{
  return {
    temperament: state.temperament,
    mesege1: state.mesege1
  }
}

export const mapDispatchToProps = dispatch=>{
  return {
    getAllTemperament: () => dispatch(getAllTemperament()),
    postRaza: (objeto) => dispatch(postRaza(objeto))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDog);