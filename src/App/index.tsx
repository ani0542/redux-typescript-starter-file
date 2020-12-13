
import React, { useRef, useState,ChangeEvent, FormEvent, useEffect } from 'react'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux';

import  {State} from '../type'
import './App.css';


import {
  createTodoActionCreator,
  editTodoActionCreator,
  toggleTodoActionCreator,
  deleteTodoActionCreator,
  SelectTodoActionCreator
} from "../redux-og";






function App() {


  const dispatch=useDispatch()
  const todos=useSelector((state:State)=>state.todos)
  const selectedTodoId = useSelector((state:State)=>state.selectedTodo)
  const editedCount = useSelector((state:State)=>state.counter)












  const [newTodoInput,setNewTodoInput] = useState<string>('')
  const [editTodoInput,setEditTodoInput] = useState<string>('')
  const [isEditMode,setIsEditMode] = useState<boolean>(false);

  const editInput = useRef<HTMLInputElement>(null)



  
 





 

     const selectedTodo =  (selectedTodoId && todos.find(value=>value.id === selectedTodoId)) || null;

    //  console.log(selectedTodo)







  const handleNewInputChange=(e:ChangeEvent<HTMLInputElement>):void=>{
    setNewTodoInput(e.target.value)
  }



  const handleCreateNewTodo = (e:FormEvent<HTMLFormElement>):void=>{
        e.preventDefault()
        console.log(newTodoInput)
        


        if(!newTodoInput.length) return;

        dispatch(createTodoActionCreator({desc:newTodoInput}))

        setNewTodoInput('')

        
  }


  const handleEdit=():void=>{
            if(!selectedTodo) return ;
            setEditTodoInput(selectedTodo.desc)
            setIsEditMode(true)
  }




  const handleUpdate=(e:FormEvent<HTMLFormElement>):void=>{
    e.preventDefault()
          if(!editTodoInput.length || !selectedTodoId) {
            handleCancelUpdate()
             return;
          }

         


          dispatch(editTodoActionCreator({id:selectedTodoId,desc:editTodoInput}))


          setEditTodoInput('')
          setIsEditMode(false)

  }



  useEffect(()=>{
     if(isEditMode){
         editInput?.current?.focus()
     }
  },[isEditMode])



  const handleEditChange=(e: ChangeEvent<HTMLInputElement>):void=>{
          setEditTodoInput(e.target.value);
  }




  const handleDelete = (): void => {
    if (!selectedTodoId) return;

  dispatch(deleteTodoActionCreator({id:selectedTodoId}))
  };



  const handleCancelUpdate =():void=>{
       setIsEditMode(false)
  }



  const handleSelect=(id:string)=>():void=>{
          dispatch(SelectTodoActionCreator({id:id}))
  }




  const handleToggle=():void=>{

    if(!selectedTodo || !selectedTodoId) return ;
     dispatch(toggleTodoActionCreator({id:selectedTodoId ,isComplete:!selectedTodo?.isComplete}))
  }

  return (


    <div className="App">
           <div className="App__counter">Todos Updated Count:{editedCount}</div>

           <div className="App__header">
               <h1>Todo: Redux vs RTK Edition</h1>
                


               <form onSubmit={handleCreateNewTodo}>
                      <label htmlFor="new-todo">Add new:</label>
                        <input
                          onChange={handleNewInputChange}
                          id="new-todo"
                          value={newTodoInput}
                        
                        />
                            <button type="submit" >Create</button>
               </form>



                  


            </div>


            <div className="App__body">
                   <ul className="App__list">
                       <h2>My Todos:</h2>
                    

                  {
                      todos.map((value,index)=>{
                        return (
                               <li className={`${value.isComplete ? "done" : ""}`} key={value.id} onClick={handleSelect(value.id)}>
                                    <span>{value.desc}</span>
                               </li>
                        )
                      })
                  } 

                    </ul>

                    <div className="App_todo-info">
                              <h2>Selected Todo:</h2>
                             
                             {
                                selectedTodo == null ?
                                   (
                                    <span className="empty-state">No Todo Selected</span>
                                   ):!isEditMode?(
                                         <>
                                               <span>
                                                     {selectedTodo.desc}
                                               </span>

                                                <div className="todo-actions">
                                                      <button onClick={handleEdit}>Edit</button>
                                                      <button onClick={handleToggle} >Toggle</button>
                                                      <button onClick={handleDelete}>Delete</button>
                                                </div>
                                         </>
                                   ):(
                                          <form onSubmit={handleUpdate}>
                                                  <label htmlFor="edit-todo">Edit:</label>
          
                                                       <input type='text'   ref={editInput} value={editTodoInput} onChange={handleEditChange}/>
                                                       <button type="submit" >Update</button>
                                                        <button onClick={handleCancelUpdate}>Cancel</button>
                                           </form>
                                   )
                             }

                    </div>
            </div>



      </div>
  )
}

export default App
