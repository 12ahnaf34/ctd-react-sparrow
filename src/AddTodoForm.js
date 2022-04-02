import React from "react";

const AddTodoForm = (props) => {
  let handleAddTodo = (event) => {
    event.preventDefault();
    const todoTitle = event.target.title.value;
    props.onAddTodo(todoTitle);
    console.log(todoTitle);
    event.target.reset();
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input name="title" id="todoTitle" type="text" />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
