import React, { useState, useRef, useEffect } from 'react';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null);

  // Focus the input field on component mount
  useEffect(() => {
    inputRef.current.focus();
  }, []); // Runs only once when the component mounts.

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure the input is not empty before submitting
    if (!input.trim()) {
      return; // Explicit return for readability
    }

    // Pass the new todo to the parent component
    props.onSubmit({
      id: Math.floor(Math.random() * 10000), // Generate a random ID
      text: input,
    });

    setInput(''); // Clear input after submit
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            type="text"
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="text"
            className="todo-input edit"
            ref={inputRef}
          />
          <button type="submit" className="todo-button edit">
            Update todo
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Add a todo"
            value={input}
            onChange={handleChange}
            name="text"
            className="todo-input"
            ref={inputRef}
          />
          <button type="submit" className="todo-button">
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
