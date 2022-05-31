import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

function App() {
  //This is the list of todo items
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/default`, {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}` },
    })
      .then((response) => response.json())
      .then((result) => {
        setTodoList(result.records);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Stores the list of todo items in localstorage
  useEffect(() => {
    if (isLoading === false) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  //Adds a new todo item to the todo list
  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  function removeTodo(id) {
    const updatedList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedList);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home onAddTodo={addTodo} isLoading={isLoading} todoList={todoList} onRemoveTodo={removeTodo} />} />
        <Route path="/new" element={<New />} />
      </Routes>
    </Router>
  );
}

const Home = (props) => {
  console.log(props.isLoading);
  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={props.addTodo} />
      {props.isLoading ? <p>Loading...</p> : <TodoList todoList={props.todoList} onRemoveTodo={props.removeTodo} />}
    </>
  );
};

const New = () => {
  return (
    <>
      <h1>New Todo List</h1>
    </>
  );
};

export default App;
