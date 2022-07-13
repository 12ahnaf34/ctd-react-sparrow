import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import style from "./App.module.css";
import checklistIcon from "./svgs/checklist.svg";
import initialFetchList, { createTodo } from "./components/Airtable";
import PropTypes from "prop-types";
import TaskScheduler from "./components/TaskScheduler";

function App() {
  //This is the list of todo items and a state checker to see if page is loading
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortState, setSortState] = useState(true);

  //Initial load of todoList from Airtable
  useEffect(() => {
    initialFetchList(setTodoList, setIsLoading);
  }, []);

  function addTodo(title) {
    createTodo(title, todoList, setTodoList, sortState);
  }

  function removeTodo(id) {
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/default/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}` },
    })
      .then((response) => response.json())
      .then((result) => {
        const filteredList = todoList.filter((result) => result.id !== id);
        setTodoList(filteredList);
      });
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Home
              isLoading={isLoading}
              todoList={todoList}
              setTodoList={setTodoList}
              onAddTodo={addTodo}
              onRemoveTodo={removeTodo}
              sortState={sortState}
              setSortState={setSortState}
            />
          }
        />
        <Route path="/taskScheduler" exact element={<TaskScheduler todoList={todoList} setTodoList={setTodoList} />} />
      </Routes>
    </Router>
  );
}

function Home(props) {
  const { isLoading, todoList, setTodoList, onAddTodo, onRemoveTodo, sortState, setSortState } = props;
  return (
    <div className={style.container}>
      <div className={style.header}>
        <nav className={style.navbar}>
          <Link to="/">Home</Link>
          <Link to="/taskScheduler">Task Scheduler</Link>
        </nav>
        <h1>
          <img className={style.checklistIcon} src={checklistIcon} alt="Icon" title="TodoListIcon" />
          Todo List
        </h1>
      </div>
      <AddTodoForm todoList={todoList} setTodoList={setTodoList} onAddTodo={onAddTodo} />
      {isLoading ? (
        <p className={style.loadingText}>Loading...</p>
      ) : (
        <TodoList todoList={todoList} setTodoList={setTodoList} onRemoveTodo={onRemoveTodo} sortState={sortState} setSortState={setSortState} />
      )}
    </div>
  );
}

App.propTypes = {
  todoList: PropTypes.array,
  setTodoList: PropTypes.func,
  isLoading: PropTypes.bool,
  setIsLoading: PropTypes.func,
};

Home.propTypes = {
  isLoading: PropTypes.bool,
  todoList: PropTypes.array,
  setTodoList: PropTypes.func,
  onAddTodo: PropTypes.func,
  onRemoveTodo: PropTypes.func,
  sortState: PropTypes.bool,
  setSortState: PropTypes.func,
};

export default App;
