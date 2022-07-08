import Airtable from "airtable";
import React from "react";

function initialFetchList(setList, setLoading) {
  setLoading(false);
  fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/default`, {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}` },
  })
    .then((response) => response.json())
    .then((result) => {
      const sortedList = result.records.sort((objectA, objectB) => {
        if (objectA.fields.Title.toLowerCase() < objectB.fields.Title.toLowerCase()) return 1;
        if (objectA.fields.Title.toLowerCase() === objectB.fields.Title.toLowerCase()) return 0;
        if (objectA.fields.Title.toLowerCase() > objectB.fields.Title.toLowerCase()) return -1;
      });
      setList(sortedList);
      setLoading(false);
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
      let newList = [...list, item];
      const sortedList = newList.sort((objectA, objectB) => {
        if (objectA.fields.Title.toLowerCase() < objectB.fields.Title.toLowerCase()) return 1;
        if (objectA.fields.Title.toLowerCase() === objectB.fields.Title.toLowerCase()) return 0;
        if (objectA.fields.Title.toLowerCase() > objectB.fields.Title.toLowerCase()) return -1;
      });
      setList(sortedList);
    });
}

export default initialFetchList;

export { createTodo };
