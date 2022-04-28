import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";

const AddTodoForm = (props) => {
  const { onAddTodo } = props;
  //This sets the name of the todo item
  const [todoTitle, setTodoTitle] = useState("");

  //Saves todo title to todoTitle variable
  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  //Passes new todo object to App.js->addTodo function
  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo({ title: todoTitle, id: Date.now() });
    setTodoTitle("");
  };

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel label="Title" todoTitle={todoTitle} handleTitleChange={handleTitleChange} />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
