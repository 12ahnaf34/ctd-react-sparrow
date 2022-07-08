import React, { useEffect } from "react";
import PropTypes from "prop-types";

export default function InputWithLabel(props) {
  const { children, todoTitle, handleTitleChange } = props;
  const inputRef = React.useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <label htmlFor="todoTitle">{children}</label>
      <input ref={inputRef} name="title" id="todoTitle" type="text" value={todoTitle} onChange={handleTitleChange} />
    </>
  );
}

InputWithLabel.propTypes = {
  children: PropTypes.string,
  todoTitle: PropTypes.string,
  handleTitleChange: PropTypes.func,
};
