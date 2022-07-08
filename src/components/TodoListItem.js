import React from "react";
import stylez from "../styles.module.css";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

function TodoListItem(props) {
  const { item, onRemoveTodo } = props;

  return (
    <li className={style.ListItem}>
      {item.fields.Title}
      <button className={stylez.removeButton} onClick={() => onRemoveTodo(item.id)}>
        X
      </button>
    </li>
  );
}

TodoListItem.propTypes = {
  item: PropTypes.object,
  onRemoveTodo: PropTypes.func,
};

export default TodoListItem;
