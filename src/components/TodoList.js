import React from "react";
import TodoListItem from "./TodoListItem";
import style from "../styles.module.css";
import PropTypes from "prop-types";

const TodoList = (props) => {
  const { todoList, onRemoveTodo } = props;
  return (
    <ul className={style.todoList}>
      {todoList.map(function (item) {
        return <TodoListItem onRemoveTodo={onRemoveTodo} key={item.id} item={item} />;
      })}
    </ul>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
};

export default TodoList;
