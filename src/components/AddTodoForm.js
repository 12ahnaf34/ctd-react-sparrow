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
    setTodoTitle(todoTitle);

    onAddTodo(todoTitle);
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
};

export default AddTodoForm;
