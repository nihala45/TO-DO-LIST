import React, { useState, useRef, useEffect } from 'react';

function TodoForm(props) {
  const [input, setInput] = useState('');

  const inputRef = useRef(null);

  // Focus the input field on component mount
  useEffect(() => {
    inputRef.current.focus();
  }, []); // Empty dependency array ensures this runs only once, when the component mounts.

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Ensure that the input is not empty before submitting
    if (!input.trim()) return;

    // Pass the new todo to the parent component
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),  // Generate a random ID
      text: input,
    });

    setInput(''); // Clear input after submit
  };

  return (
    <form className='todo-form' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Add a todo'
        value={input}
        onChange={handleChange}
        name='text'
        className='todo-input'
        ref={inputRef}
      />
      <button type="submit" className='todo-button'>
        Add todo
      </button>
    </form>
  );
}

export default TodoForm;
