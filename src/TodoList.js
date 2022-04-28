import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = (props) => {
  const { todoList } = props;
  return (
    <ul>
      {todoList.map(function (item) {
        return <TodoListItem onRemoveTodo={props.onRemoveTodo} key={item.id} item={item} />;
      })}
    </ul>
  );
};

export default TodoList;
