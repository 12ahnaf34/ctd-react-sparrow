import React from "react";

export default function TodoListItem(props) {
  const { item } = props;
  return (
    //
    <li>
      {item.fields.Title} <button onClick={() => props.onRemoveTodo(item.id)}>Remove</button>
    </li>
  );
}
