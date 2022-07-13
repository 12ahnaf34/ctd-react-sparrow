import React from "react";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

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
