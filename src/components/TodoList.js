import React, { useState } from "react";
import TodoListItem from "./TodoListItem";
import style from "../styles.module.css";
import PropTypes from "prop-types";

const TodoList = (props) => {
  const { todoList, setTodoList } = props;
  const [sortState, setSortState] = useState(true);
  const [text, setText] = useState("Sort A-Z");

  const sortTitles = () => {
    if (sortState) {
      setSortState(false);
      setText("Sort Z-A");
      const sortedList = todoList.sort((objectA, objectB) => {
        if (objectA.fields.Title.toLowerCase() < objectB.fields.Title.toLowerCase()) return -1;
        if (objectA.fields.Title.toLowerCase() === objectB.fields.Title.toLowerCase()) return 0;
        if (objectA.fields.Title.toLowerCase() > objectB.fields.Title.toLowerCase()) return 1;
      });
      setTodoList(sortedList);
    } else {
      setSortState(true);
      setText("Sort A-Z");
      const sortedList = todoList.sort((objectA, objectB) => {
        if (objectA.fields.Title.toLowerCase() < objectB.fields.Title.toLowerCase()) return 1;
        if (objectA.fields.Title.toLowerCase() === objectB.fields.Title.toLowerCase()) return 0;
        if (objectA.fields.Title.toLowerCase() > objectB.fields.Title.toLowerCase()) return -1;
      });
      setTodoList(sortedList);
    }
  };

  return (
    <div>
      <button className={style.sortButton} type="button" onClick={sortTitles}>
        {text}
      </button>
      <ul className={style.todoList}>
        {todoList.map(function (item) {
          return <TodoListItem key={item.id} item={item} todoList={todoList} setTodoList={setTodoList} />;
        })}
      </ul>
    </div>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.array,
  setTodoList: PropTypes.func,
};

export default TodoList;
