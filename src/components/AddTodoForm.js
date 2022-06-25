import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import style from "../styles.module.css";
import PropTypes from "prop-types";

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
      <InputWithLabel todoTitle={todoTitle} handleTitleChange={handleTitleChange}>
        Title
      </InputWithLabel>
      <button className={style.addButton} type="submit">
        Add
      </button>
    </form>
  );
};

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
  todoTitle: PropTypes.string,
  handleTitleChange: PropTypes.func,
  newTodoTitle: PropTypes.string,
  handleAddTodo: PropTypes.func,
};

export default AddTodoForm;
