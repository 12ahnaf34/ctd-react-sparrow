import React, { useState } from "react";
import TodoListItem from "./TodoListItem";
import style from "./TodoList.module.css";
import PropTypes from "prop-types";

const TodoList = (props) => {
  const { todoList, setTodoList, onRemoveTodo, sortState, setSortState } = props;

  const [text, setText] = useState("A - Z");

  const sortTitles = () => {
    if (sortState) {
      setSortState(false);
      setText("Z - A");
      const sortedList = todoList.sort((objectA, objectB) => {
        if (objectA.fields.Title.toLowerCase() < objectB.fields.Title.toLowerCase()) {
          return 1;
        }
        if (objectA.fields.Title.toLowerCase() === objectB.fields.Title.toLowerCase()) {
          return 0;
        }
        if (objectA.fields.Title.toLowerCase() > objectB.fields.Title.toLowerCase()) {
          return -1;
        }
      });
      setTodoList(sortedList);
    } else {
      setSortState(true);
      setText("A - Z");
      const sortedList = todoList.sort((objectA, objectB) => {
        if (objectA.fields.Title.toLowerCase() < objectB.fields.Title.toLowerCase()) {
          return -1;
        }
        if (objectA.fields.Title.toLowerCase() === objectB.fields.Title.toLowerCase()) {
          return 0;
        }
        if (objectA.fields.Title.toLowerCase() > objectB.fields.Title.toLowerCase()) {
          return 1;
        }
      });
      setTodoList(sortedList);
    }
  };

  return (
    <div>
      <div>
        <button className={style.sortButton} type="button" onClick={sortTitles}>
          {text}
        </button>
      </div>
      <div>
        <ul className={style.todoList}>
          {todoList.map(function (item) {
            if (item.fields.Title !== " ") {
              return <TodoListItem key={item.id} todo={item} todoList={todoList} setTodoList={setTodoList} onRemoveTodo={onRemoveTodo} />;
            }
          })}
        </ul>
      </div>
    </div>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.array,
  setTodoList: PropTypes.func,
  onRemoveTodo: PropTypes.func,
  sortState: PropTypes.bool,
  setSortState: PropTypes.func,
};

export default TodoList;
