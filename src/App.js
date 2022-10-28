import React, { useEffect, useState } from 'react';
import './App.css';
import SingleTodo from './Todo/Todo';

const App = () => {
const [Todos,setTodos] = useState(localStorage.getItem("Todos") ? JSON.parse(localStorage.getItem("Todos")) : [])
const [Todo,setTodo] = useState("")
const [TodoTitle,setTodoTitle] = useState("")
const [TodoEdit,setTodoEdit] = useState(null)
const [editingText,setEditingText] = useState("")


  useEffect(()=>{    
    const temp = localStorage.getItem("Todos")
    const loadedTodos = JSON.parse(temp)
    if(loadedTodos){ 
      setTodos(loadedTodos)
    }
  },[])

  useEffect(()=>{
    const tempJson = JSON.stringify(Todos)
    localStorage.setItem("Todos",tempJson)
  },[Todos])

  const handleSubmit = (e) =>{
    e.preventDefault()

    let newTodo = {
      id:new Date().getTime(),
      title:TodoTitle,
      text:Todo,
      checked:false
    }

   setTodos([...Todos,newTodo])
   setTodo("")
   setTodoTitle("") 
  }

  const deleteHandler = (id) =>{
    const newTodos = [...Todos].filter((todo)=>todo.id!== id)
    setTodos(newTodos)
  }

  const completeHandler = (id) =>{
    const updatedTodos = [...Todos].map((todo)=>{
      if(todo.id===id){
        todo.checked = !todo.checked
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const editTodoHandler = (id) =>{
    const updatedTodos = [...Todos].map((todo)=>{
      if(todo.id === id){
        todo.text = editingText
      }
      return todo
    })
    setTodos(updatedTodos)
    setTodoEdit(null)
    setEditingText("")
  }

  return (
    <div className="App" onSubmit={handleSubmit}>
      <h1>To Do List</h1>

      <div className="todoInput">
      
      <div>
      <input className='Title' type="text" placeholder='Title' onChange={(e)=>setTodoTitle(e.target.value)} value={TodoTitle}/>
      <label className="Title-label">Title</label>
      </div>
      
      <div>
      <input className='Description' placeholder='Description' type="text" onChange={(e)=>setTodo(e.target.value)} value={Todo}/>
      <label className="Description-label">Details</label>
      </div>

      {Todo && TodoTitle&& <button className='Submit' type="submit" onClick={handleSubmit}>Add Todo</button>}
      </div>

      { Todos.map((todo) =>( 
      <div key={todo.id}>
      {TodoEdit === todo.id?
      <div className="todoInput">
         <input className='Title' type="text" onChange={(e)=>setEditingText(e.target.value)} value={editingText}/>
         <button className='Submit' onClick={()=>editTodoHandler(todo.id)}>Submit Edit</button>
      </div>
        :<SingleTodo 
         title={todo.title}
         text={todo.text}
         deleteTodo={()=>deleteHandler(todo.id)}
         editTodo={()=>setTodoEdit(todo.id)}
         changed={()=>completeHandler(todo.id)}
         checked={todo.checked}/>
      }
         </div>
      ) )}

    </div>
  );
}

export default App;
