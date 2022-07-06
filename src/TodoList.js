import React from "react";
import TodoListItem from "./TodoListItem";
import style from "./styles.module.css";

const TodoList = (props) => {
  const { todoList, setTodoList } = props;

  return (
    <ul className={style.todoList}>
      {todoList.map(function (item) {
        return <TodoListItem item={item} todoList={todoList} setTodoList={setTodoList} />;
      })}
    </ul>
  );
};

export default TodoList;
