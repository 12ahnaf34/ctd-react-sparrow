import React from "react";

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
        return <li key={item.id}>{item.title}</li>;
      })}
    </ul>
  );
};

export default TodoList;
