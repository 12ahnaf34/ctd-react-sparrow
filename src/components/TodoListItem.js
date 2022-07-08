import React from "react";
import stylez from "../styles.module.css";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

function TodoListItem(props) {
  const { item, todoList, setTodoList } = props;

  function removeTodo(id) {
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/default/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}` },
    }).then((response) => console.log("deleted todo list item"));

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

TodoListItem.propTypes = {
  item: PropTypes.object,
  todoList: PropTypes.array,
  setTodoList: PropTypes.func,
};

export default TodoListItem;
