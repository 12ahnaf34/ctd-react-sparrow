import React from "react";
import stylez from "../styles.module.css";
import style from "./TodoListItem.module.css";
import Airtable from "airtable";
import TodoList from "./TodoList";

function TodoListItem(props) {
  const { item, todoList, setTodoList } = props;

  function removeTodo(id) {
    base("Default").destroy(id, function (err, deletedRecord) {
      if (err) {
        console.error(err);
        return;
      }
    });
    const filteredList = todoList.filter((item) => item.id !== id);
    setTodoList(filteredList);
  }

  return (
    <li className={style.ListItem}>
      {item.fields.Title}
      <button className={stylez.removeButton} onClick={() => removeTodo(item.id)}>
        X
      </button>
    </li>
  );
}

export default TodoListItem;
