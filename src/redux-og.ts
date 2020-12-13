

import { combineReducers, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";


//constant

import { Todo } from "./type";
import  { v1 as uuid } from "uuid";

export const CREATE_TODO = "CREATE_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const SELECT_TODO = "SELECT_TODO";


// Actions & Action Type


interface CreateTodoActionType {
    type:typeof CREATE_TODO,
    payload:Todo
}



  export const createTodoActionCreator=(data:{
      desc:string
  }):CreateTodoActionType=>{
      const {desc} = data;
       return {
           type:CREATE_TODO,
           payload:{
               id:uuid(),
               desc:desc,
               isComplete:false
           }
       }
  }








  interface EditTodoActionType {
    type:typeof EDIT_TODO,
    payload:{
        id:string,
        desc:string
    }

}




export const editTodoActionCreator=(data:{
      id:string,
      desc:string
}):EditTodoActionType=>{
    
    const {desc,id} = data;
    return {
        type:EDIT_TODO,
        payload:{
            id,
            desc:desc,
            
        }
    }
}










interface ToggleTodoActionType {
    type:typeof TOGGLE_TODO,
    payload:{
        id:string,
        isComplete:boolean
    }

}




export const toggleTodoActionCreator=(data:{
    id:string,
    isComplete:boolean

}):ToggleTodoActionType=>{
      const {id,isComplete} = data;

      return {
          type:TOGGLE_TODO,
          payload:{
              id,
              isComplete
          }
      }
}









interface DeleteTodoActionType{
    type:typeof DELETE_TODO,
    payload:{
        id:string,
    }
}



export const deleteTodoActionCreator=(data:{
    id:string
}):DeleteTodoActionType=>{
      const {id} = data;

      return {
             type:DELETE_TODO,
             payload:{
                 id
             }
      }
}










interface SelectTodoActionType{
    type:typeof SELECT_TODO,
    payload:{
        id:string,
    }
}







export const SelectTodoActionCreator=(data:{
    id:string
}):SelectTodoActionType=>{
      const {id} = data;
      
      return {
             type:SELECT_TODO,
             payload:{
                 id
             }
      }
}












//reducers



type TodoActionTypes =   CreateTodoActionType| EditTodoActionType| ToggleTodoActionType| DeleteTodoActionType;

type SelectedTodoActionTypes = SelectTodoActionType;





const todosInitialState: Todo[] =[

      {
        id: uuid(),
        desc: "Learn React",
        isComplete: true
      },

      {
        id: uuid(),
        desc: "Learn Redux",
        isComplete: true
      },
      {
        id: uuid(),
        desc: "Learn Redux-ToolKit",
        isComplete: false
      }



]





const todosReducer = (state: Todo[]=todosInitialState,action:TodoActionTypes)=>{
        switch(action.type){
              case CREATE_TODO:
                 
                      return [...state,action.payload]

              case EDIT_TODO:
                return state.map(value =>

                     value.id === action.payload.id ? { ...value, desc: action.payload.desc } : value

                  );  





                  case TOGGLE_TODO:
                        return state.map((value)=>{
                            return (
                                value.id === action.payload.id ?  { ...value, isComplete: action.payload.isComplete } : value
                            )
                        })



                case DELETE_TODO:
                      return state.filter((value)=>{
                          return (value.id !== action.payload.id)
                      })





                default:
                      return state;



        }
}





const selectedTodoReducer=(state: string|null =null, action:SelectedTodoActionTypes)=>{
       switch(action.type){

           case SELECT_TODO:
                return action.payload.id;

           default:
                return state;
       }
}



const counterReducer = (state: number = 0, action: TodoActionTypes) => {
       switch(action.type){

             case CREATE_TODO:

                  return state+1;

             case EDIT_TODO:
                 return state+1;



            case TOGGLE_TODO:
                return state+1;

            case DELETE_TODO:
                return state+1

            default:
                  return state
       }
}


 



const reducers = combineReducers({
    todos: todosReducer,
    selectedTodo: selectedTodoReducer,
    counter: counterReducer
  });






  // Store
  export default createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk, logger))
  );









