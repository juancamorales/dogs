import axios from 'axios';
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const DOG_DETAILS = "DOG_DETAILS";
export const GET_DOGS = "GET_DOGS";
export const GET_DOGSS = "GET_DOGSS";
export const GET_ALL_TEMPERAMENT = "GET_ALL_TEMPERAMENT"
export const POST_RAZA = "POST_RAZA"
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_TEMPERAMEMT = "ORDER_BY_TEMPERAMEMT";
export const ORDER_POR_TEMPERAMEMT = "ORDER_POR_TEMPERAMEMT";
export const ORDER_BY_PESO = "ORDER_BY_PESO"
export const CLEAR = "CLEAR"

    export function getAllDogs() {
        return async function(dispatch) {
            const res = await axios.get('/dogs')
            return dispatch({
                type: GET_ALL_DOGS,
                payload: res.data
            }); 
        };
    };

    export function dogDetails(iD) {
      return async function(dispatch) {
          try {
          const res = await axios.get(`/dogs/${iD}`)
          return dispatch({
              type: DOG_DETAILS,
              payload: res.data
          }) 
      } catch(error){
          console.log(error.message)
      }
      }
  };

  export function getdogs(name) {
    return async function(dispatch) {
        try {
        const res = await axios.get(`/dogs?name=${name}`)
        return dispatch({
            type: GET_DOGS,
            payload: res.data,
        })
    } catch(error){
        console.log(error.message)
    }
    };
};

export function getAllTemperament() {
    return async function(dispatch) {
        const res = await axios.get('/temperamentos')
        return dispatch({
            type: GET_ALL_TEMPERAMENT,
            payload: res.data
        }); 
    };
};

export function postRaza(objeto) {
    return async function(dispatch) {
        try {
        const res = await axios.post(`/dogs`,objeto)
        return dispatch({
            type: POST_RAZA,
            payload: res.data
        })
    } catch(error){
        console.log(error.message)
    }
    }
};

export function orderByName(payload) {
    return {
      type: ORDER_BY_NAME,
      payload,
    };
  }

export function orderByTemperament(payload) {
    return {
      type: ORDER_BY_TEMPERAMEMT,
      payload,
    };
}

export function orderporTemperament(payload) {
    return {
      type: ORDER_POR_TEMPERAMEMT,
      payload,
    };
}

export function orderByPeso(payload) {
    return {
      type: ORDER_BY_PESO,
      payload,
    };
}

export function clear() {
    return {
      type: CLEAR
    };
}

export function getdogss(str) {
    return async function(dispatch) {
        try {
        const res = await axios.get(`/dogss?str=${str}`)
        return dispatch({
            type: GET_DOGSS,
            payload: res.data,
        })
    } catch(error){
        console.log(error.message)
    }
    };
}
