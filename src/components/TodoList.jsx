import React, { useState } from 'react'; // Import React and the useState hook for state management
import TodoForm from './TodoForm'; // Import the TodoForm component
import Todo from './Todo'
function TodoList() {
  // State to hold the list of todos
  const [todos, setTodos] = useState([]);

  // Function to add a new todo
  const addTodo = (todo) => {
    // Validation to ensure the todo text is not empty or just whitespace
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return; // If invalid, exit the function without adding the todo
    }

    // Create a new array of todos by adding the new todo at the start of the list
    const newTodos = [todo, ...todos];

    // Update the todos state with the new list
    setTodos(newTodos);

    // Log the new todo and the updated todos list for debugging purposes
    console.log(todo, ...todos);
  };

  const updateTodo = (todoId,newValue)=>{
    if(!newValue.text ||  /^\s*$/.test(newValue.text)){
        return;
    }
    setTodos(prev => prev.map(item=>(item.id === todoId ? newValue:item)))
  }

  const removeTodo =  id => {
    const removeArr = [...todos].filter(todo => todo.id !== id)
    setTodos(removeArr)
  }

  

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
        if(todo.id === id){
            todo.isComplete = !todo.isComplete
        }
        return todo;
    });
    setTodos(updatedTodos)
  }

  return (
    <div>
      {/* Title for the Todo List */}
      <h1>What's the plan for today</h1>

      {/* Render the TodoForm component and pass the addTodo function as a prop */}
      <TodoForm onSubmit={addTodo} />
      <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>
    </div>
  );
}

export default TodoList; // Export the TodoList component for use in other parts of the app
