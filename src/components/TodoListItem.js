import React from "react";
import style from "./TodoListItem.module.css";
<<<<<<< HEAD
import PropTypes from "prop-types";
=======
import Airtable from "airtable";
import TodoList from "./TodoList";
>>>>>>> 42c3e0301a512ec34d93adf19b82701a04afea00

function TodoListItem(props) {
  const { todo, onRemoveTodo } = props;

  return (
    <li className={style.listItem}>
      {todo.fields.Title}
      <button className={style.removeButton} onClick={() => onRemoveTodo(todo.id)}>
        X
      </button>
    </li>
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.object,
  onRemoveTodo: PropTypes.func,
};

export default TodoListItem;
