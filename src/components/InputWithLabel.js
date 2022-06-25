import React, { useEffect } from "react";
import PropTypes from "prop-types";

function InputWithLabel(props) {
  const { todoTitle, handleTitleChange, children } = props;
  const inputRef = React.useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor="todoTitle">{children}</label>
      <input ref={inputRef} name="title" id="todoTitle" type="text" value={todoTitle} onChange={handleTitleChange} />
    </>
  );
}

InputWithLabel.propType = {
  inputRef: PropTypes.func,
  todoTitle: PropTypes.string,
  handleTitleChange: PropTypes.func,
};

export default InputWithLabel;
