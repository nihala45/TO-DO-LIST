import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm'; // Import the TodoForm component
import Todo from './Todo'; // Import the Todo component

function TodoList() {
  // State to hold the list of todos
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

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
    console.log(todo, ...todos);
  };

  // Update existing todo
  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  // Remove todo by ID
  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };

  // Mark todo as completed
  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Function to clear the todos from both state and localStorage
  const clearTodos = () => {
    setTodos([]);
    localStorage.removeItem('todos');
  };

  return (
    <div>
      <h1>What's the plan for today</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
      <button onClick={clearTodos}>Clear All Todos</button>
    </div>
  );
}

export default TodoList;
