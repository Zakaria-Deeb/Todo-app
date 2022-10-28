import React from 'react'
import './Todo.css'

const Todo = (props) =>{

  return (
    <div className='singleTodo'>
        
        <h4>{props.title}</h4>
        <p>{props.text}</p>
        <button  className='Button' onClick={props.editTodo}>edit Todo</button>
        <button className='Button' onClick={props.deleteTodo}>Delete Todo</button>
        
         <label className='Label'> 
         <input className='Checkbox' type='checkbox' onChange={props.changed} checked={props.checked}/>
         <span className='Checkmark'></span>Completed</label>
         
    </div>
  )
}

export default Todo