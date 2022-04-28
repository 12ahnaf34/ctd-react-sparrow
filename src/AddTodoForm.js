import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";

const AddTodoForm = (props) => {
  const { onAddTodo } = props;
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

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
