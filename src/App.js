import  { React, useState } from 'react'
import "./App.css"
import Todo from './componants/Todo';
import TodoForm from './componants/TodoForm'

const App = () => {
  
  let [todos,setTodos] =useState([]);
  const [todoToShow,setTodoToShow]=useState("all")
  const [toggleAllComplete,settoggleAllComplete]=useState(true)
  const AddTodo = (todo)=>{
    setTodos([...todos ,todo])
  }
  const handleDelete =(id)=>{
    setTodos(todos.filter((todo)=>todo.id!==id))
  }

  const updateTodoToShow=(s)=>{
    setTodoToShow(s);
  };
  const removeAllThatAreComplete=()=>{
    setTodos(todos.filter((todo)=>!todo.complete));
  }
  const toggleComplete=(id)=>{
    setTodos(
      todos.map((todo)=>{
        if (todo.id===id){
          return{
            ...todo,
            complete: !todo.complete
          };
        }else{
          return todo;
        }
      })
    )
  }
  if(todoToShow==="active") {
    todos=todos.filter((todo) =>!todo.complete);
  }
  else if(todoToShow==="complete"){
    todos=todos.filter((todo)=>todo.complete);
  }
  

  
  return (
    <div className='container'>
     
      <TodoForm onSubmit={AddTodo}/>
      {
        todos.map((todo)=>(
          <Todo key={todo.id} todo={todo} onDelete={()=>handleDelete(todo.id)}
            toggleComplete ={() =>toggleComplete(todo.id)}/>
        )

        )
      }
      <div>
                <button className='update-btn btn ' onClick={()=> updateTodoToShow("all")}>all</button>
                <button className='update-btn btn'onClick={()=> updateTodoToShow("active")}>active</button>
                <button className='update-btn btn'onClick={()=> updateTodoToShow("complete")}>complete</button>
            </div>
            {todos.some((todo)=>todo.complete) ? (
              <button onClick={removeAllThatAreComplete} className='all-btn btn'>
                Remove all complete</button>): null
            }
            <button onClick={()=>{
              setTodos(
                todos.map((todo)=>({
                  ...todo,
                  complete:toggleAllComplete
                }))
              );
              settoggleAllComplete(!toggleAllComplete)
            }} className='all-btn btn'>Toggle all complete :{`${toggleAllComplete}`}</button>
    </div>
      
  )
}

export default App