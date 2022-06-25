import React from "react";
import stylez from "./styles.module.css";
import style from "./TodoListItem.module.css";

export default function TodoListItem(props) {
  const { item } = props;

  return (
    //
    <li className={style.ListItem}>
      {item.fields.Title}{" "}
      <button className={stylez.removeButton} onClick={() => props.onRemoveTodo(item.id)}>
        X
      </button>
    </li>
  );
}
