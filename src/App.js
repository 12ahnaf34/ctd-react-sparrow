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
    title: "Sleep early",
  },
];

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(function (item) {
          return <li key={item.id}>{item.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
