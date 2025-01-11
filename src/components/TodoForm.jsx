import React, { useState, useRef, useEffect } from 'react'; // Import React and hooks for state and DOM manipulation

function TodoForm(props) {
  // State to manage the value of the input field
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  // Ref to access the DOM element of the input field
  const inputRef = useRef(null);

  // Focus the input field on component mount
  useEffect(() => {
    inputRef.current.focus(); // Automatically focuses the input field when the form is rendered
  }, []); // Runs only once, similar to componentDidMount in class components

  // Function to handle input changes
  const handleChange = (e) => {
    setInput(e.target.value); // Update the input state with the value typed by the user
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (page reload)

    // Ensure the input is not empty or just whitespace
    if (!input.trim()) {
      return; // Exit the function if input is invalid
    }

    // Pass the new todo data to the parent component via the onSubmit prop
    props.onSubmit({
      id: Math.floor(Math.random() * 10000), // Generate a unique ID for the todo
      text: input, // Use the current input value as the todo text
    });

    // Clear the input field after submission
    setInput('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {/* Conditional rendering for 'edit' or 'add' mode */}
      {props.edit ? (
        <>
          {/* Input field for editing an existing todo */}
          <input
            type="text"
            placeholder="Update your item" // Placeholder text for edit mode
            value={input} // Controlled input value bound to the state
            onChange={handleChange} // Update state on change
            name="text"
            className="todo-input.edit" // Additional class for styling edit mode
            ref={inputRef} // Attach the input field to the ref for focus management
          />
          {/* Button to update the todo */}
          <button type="submit" className="todo-button edit">
            Update todo
          </button>
        </>
      ) : (
        <>
          {/* Input field for adding a new todo */}
          <input
            type="text"
            placeholder="Add a todo" // Placeholder text for add mode
            value={input} // Controlled input value bound to the state
            onChange={handleChange} // Update state on change
            name="text"
            className="todo-input" // Styling for add mode
            ref={inputRef} // Attach the input field to the ref for focus management
          />
          {/* Button to add the todo */}
          <button type="submit" className="todo-button">
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm; // Export the TodoForm component for use in other parts of the app
