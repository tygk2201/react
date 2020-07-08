import { combineReducers } from 'redux';
const initialState={
    num:0,
}
const reducerA=(state=initialState,action)=>{
    switch(action.type){
        case "ADDNUM":
            
            return {num:state.num+action.value}
        default:
            return state

    }

}
const reducerB=(state=[],action)=>{
    switch(action.type){
        case "CHANGENAME":
            return [...state,{text: action.value,completed: false}
              ]
        default:
            return state

    }

}
const someApp = combineReducers({
    reducerA,
    reducerB
  });
  export default someApp