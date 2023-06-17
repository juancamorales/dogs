import { GET_ALL_DOGS, DOG_DETAILS, GET_DOGS, GET_ALL_TEMPERAMENT, POST_RAZA, ORDER_BY_NAME, ORDER_BY_TEMPERAMEMT, ORDER_BY_PESO, CLEAR, GET_DOGSS, ORDER_POR_TEMPERAMEMT } from "../actions/index";

const initialState = {
  dogs: [],
  dog: {},
  dogs1: [], 
  mesege: {},
  temperament: [],
  mesege1: {},
  dogs3: []
};

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: action.payload.resp,
        dogs3: action.payload.resp
      }
      case DOG_DETAILS:
        return {
          ...state,
          dog: action.payload
        }
        case GET_DOGS:
            if(action.payload.resp[0].sot){
              return {
                ...state,
                mesege: action.payload,
                dogs: [],
              }
            } else {
              return {
                ...state,
                dogs: action.payload.resp,
                mesege: [],
              }
            }
    case GET_ALL_TEMPERAMENT:
      return {
        ...state,
        temperament: action.payload,
      }
      case POST_RAZA:
        return {
          ...state,
          mesege1: action.payload
        }
        case ORDER_BY_NAME:
          let sortedArr =
            action.payload === "A-Z"
              ? state.dogs3?.sort(function (a, b) {
                  if (a.name > b.name) {
                    return 1;
                  }
                  if (b.name > a.name) {
                    return -1;
                  }
                  return 0;
                })
              : state.dogs3?.sort(function (a, b) {
                  if (a.name > b.name) {
                    return -1;
                  }
                  if (b.name > a.name) {
                    return 1;
                  }
                  return 0;
                });
                return {
                  ...state,
                  dogs: sortedArr,
                };
    case ORDER_BY_TEMPERAMEMT:
      const allCountry = state.dogs3;
      const activityFilter =
      action.payload === "Con Temperamentos"
      ? allCountry?.filter((f) => f.characters?.length !== 0)
      : action.payload === "Sin Temperamentos"
      ? allCountry?.filter((f) => !f.characters?.length)
      : allCountry;
          return {
            ...state,
            dogs: activityFilter
        }
    case ORDER_BY_PESO:
      const mape = state.dogs3.map((i)=>{ 
        if((i.peso.length-2) === 0){
          return i={
            id: i.id,
		        peso: (i.peso.length-1),
		        altura: i.altura,
		        image: i.image,
		        name: i.name,
		        añosDeVida: i.añosDeVida,
		        characters: i.characters
          }
        } else {
          return i={
            id: i.id,
		        peso: `${(i.peso.length-2)}${(i.peso.length-1)}`,
		        altura: i.altura,
		        image: i.image,
		        name: i.name,
		        añosDeVida: i.añosDeVida,
		        characters: i.characters
          }
        }
      })
      const pesoFilter =
      action.payload === "Menor a Mayor"
              ? mape?.sort(function (a, b) {
                  if (a.peso > b.peso) {
                    return 1;
                  }
                  if (b.peso > a.peso) {
                    return -1;
                  }
                  return 0;
                })
              : mape?.sort(function (a, b) {
                if (a.peso > b.peso) {
                  return -1;
                }
                if (b.peso > a.peso) {
                  return 1;
                }
                return 0;
              });
          return {
            ...state,
            dogs: pesoFilter
        }
        case CLEAR: 
        return{
          ...state, 
          dog: {}
        }
        case GET_DOGSS:
          return {
            ...state,
            dogs: action.payload
          }
          case ORDER_POR_TEMPERAMEMT:
            const resp = action.payload === "all" 
            ? state.dogs3
            : state.dogs3.filter(dog => {
                if(!dog.characters) return undefined
                return dog.characters.includes(action.payload) 
            })
            return {
              ...state,
              dogs: resp
          }
    default: 
      return state
  };
};

export default rootReducer;