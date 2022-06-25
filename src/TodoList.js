import React from "react";
import TodoListItem from "./TodoListItem";
import style from "./styles.module.css";

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

export default TodoList;
