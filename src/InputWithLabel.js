import React, { useEffect } from "react";

export default function InputWithLabel(props) {
  const inputRef = React.useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor="todoTitle">{props.children}</label>
      <input ref={inputRef} name="title" id="todoTitle" type="text" value={props.todoTitle} onChange={props.handleTitleChange} />
    </>
  );
}
