import React from "react";
import TodoListItem from "./TodoListItem";

let todoList = [
  {
    id: 0,
    title: "Meditate",
  },
  {
    id: 1,
    title: "Eat",
  },
  {
    id: 2,
    title: "Exercise",
  },
];

const TodoList = () => {
  return (
    <ul>
      {todoList.map(function (item) {
        return <TodoListItem key={item.id} item={item} />;
      })}
    </ul>
  );
};

export default TodoList;
