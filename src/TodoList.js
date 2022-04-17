import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = (props) => {
  const { todoList } = props;
  return (
    <ul>
      {todoList.map(function (item) {
        return <TodoListItem key={item.id} item={item} />;
      })}
    </ul>
  );
};

export default TodoList;
