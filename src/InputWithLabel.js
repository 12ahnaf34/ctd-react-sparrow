import React from "react";

export default function InputWithLabel(props) {
  return (
    <>
      <label htmlFor="todoTitle">{props.label}</label>
      <input name="title" id="todoTitle" type="text" value={props.todoTitle} onChange={props.handleTitleChange} />
    </>
  );
}
