import { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm'; // Correct import
import TodoList from './components/TodoList';

function App() {
  return (
    <div className='todo-app'>
      <TodoList /> {/* Correct usage of the TodoForm component */}
    </div>
  );
}

export default App;