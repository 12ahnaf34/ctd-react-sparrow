import Airtable from "airtable";
import React from "react";

const base = new Airtable({ apiKey: "keyYsPzdK44dRGy6F" }).base("appKF1Bhdb3sx1dpu");

function fetchTodo() {
  console.log("Fetch");
}

function initialFetchList(setList, setLoading) {
  setLoading(false);
  fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/default`, {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}` },
  })
    .then((response) => response.json())
    .then((result) => {
      setList(result.records);
      setLoading(false);
      localStorage.setItem("todoList", JSON.stringify(result.records));
    })
    .catch((error) => {
      console.log(error);
    });
}

function createTodo(todoTitle, list, setList) {
  fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/default`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ records: [{ fields: { Title: todoTitle } }] }),
  })
    .then((response) => response.json())
    .then((result) => {
      const item = result.records[0];
      setList([...list, item]);
    });
}

export default fetchTodo;

export { initialFetchList, createTodo };
