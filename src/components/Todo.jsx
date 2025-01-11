import React, { useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import TodoForm from './TodoForm';

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  // Submit the update for the todo item
  const submitUpdate = value => {
    updateTodo(edit.id, value);  // Call updateTodo to update the todo item
    setEdit({
      id: null,
      value: ''
    });
  };

  // If we're editing a todo, show the TodoForm component
  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  // Map through todos and display each one
  return todos.map((todo) => (
    <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={todo.id}>
      <div onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}  // Delete the todo
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}  // Set todo for editing
          className="edit-icon"
        />
      </div>
    </div>
  ));
}

export default Todo;
