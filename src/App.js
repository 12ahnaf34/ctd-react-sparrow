import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import style from "./styles.module.css";
import checklistIcon from "./svgs/checklist.svg";
import initialFetchList, { createTodo } from "./components/Airtable";

function App() {
  //This is the list of todo items and a state checker to see if page is loading
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //Initial load of todoList from Airtable
  useEffect(() => {
    initialFetchList(setTodoList, setIsLoading);
  }, []);

  function addTodo(newTodo) {
    createTodo(newTodo, todoList, setTodoList);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home isLoading={isLoading} todoList={todoList} setTodoList={setTodoList} onAddTodo={addTodo} />} />
        <Route path="/new" exact element={<New />} />
      </Routes>
    </Router>
  );
}

const Home = (props) => {
  const { isLoading, todoList, setTodoList, onAddTodo } = props;
  return (
    <div className={style.container}>
      <div className={style.header}>
        <nav className={style.navbar}>
          <Link to="/">Home</Link>
          <Link to="/new">New</Link>
        </nav>
        <img className={style.checklistIcon} src={checklistIcon} alt="Icon" title="TodoListIcon" />
        <h1>Todo List</h1>
      </div>
      <AddTodoForm todoList={todoList} setTodoList={setTodoList} onAddTodo={onAddTodo} />
      {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} setTodoList={setTodoList} />}
    </div>
  );
};

const New = () => {
  const [data, setData] = useState([]);
  const [singleItem, setSingleItem] = useState("");

  const handleChange = (event) => {
    setSingleItem(event.target.value);
  };

  const addItem = () => {
    setData([...data, singleItem]);
  };
  console.log(data);

  return (
    <>
      <h1>New Todo List</h1>
      <label htmlFor="todoInput">Title</label>
      <input id="todoInput" type="text" onChange={handleChange} />
      <button type="button" onClick={addItem}>
        Add
      </button>
      <ul>
        {data.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </>
  );
};

export default App;
