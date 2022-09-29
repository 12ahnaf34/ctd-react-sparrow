import moment from "moment";

function initialTaskSchedulerList(setList, setLoading, sortState, setSortState) {
  fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/default`, {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}` },
  })
    .then((response) => response.json())
    .then((result) => {
      const data = result.records.filter((item) => {
        if (item.fields.Date !== " ") return item.fields;
      });
      data.sort((a, b) => {
        const d1 = moment(a.fields.Date);
        const d2 = moment(b.fields.Date);
        if (sortState) {
          return d2 - d1;
        } else {
          return d1 - d2;
        }
      });
      setList(data);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
}

function initialFetchList(setList, setLoading) {
  fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/default`, {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}` },
  })
    .then((response) => response.json())
    .then((result) => {
      const sortedList = result.records.sort((objectA, objectB) => {
        if (objectA.fields.Title.toLowerCase() < objectB.fields.Title.toLowerCase()) {
          return -1;
        } else if (objectA.fields.Title.toLowerCase() === objectB.fields.Title.toLowerCase()) {
          return 0;
        } else if (objectA.fields.Title.toLowerCase() > objectB.fields.Title.toLowerCase()) {
          return 1;
        }
      });
      setList(sortedList);
      setLoading(false);
      return;
    })
    .catch((error) => {
      console.log(error);
    });
}

function createTodo(newTitle, list, setList, sortState) {
  fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/default`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ records: [{ fields: { Title: newTitle, Upcoming: " ", Date: " " } }] }),
  })
    .then((response) => response.json())
    .then((result) => {
      const item = result.records[0];
      let newList = [...list, item];

      if (sortState) {
        const sortedList = newList.sort((objectA, objectB) => {
          if (objectA.fields.Title.toLowerCase() < objectB.fields.Title.toLowerCase()) {
            return -1;
          } else if (objectA.fields.Title.toLowerCase() === objectB.fields.Title.toLowerCase()) {
            return 0;
          } else if (objectA.fields.Title.toLowerCase() > objectB.fields.Title.toLowerCase()) {
            return 1;
          }
        });
        setList(sortedList);
      } else {
        const sortedList = newList.sort((objectA, objectB) => {
          if (objectA.fields.Title.toLowerCase() < objectB.fields.Title.toLowerCase()) {
            return 1;
          } else if (objectA.fields.Title.toLowerCase() === objectB.fields.Title.toLowerCase()) {
            return 0;
          } else if (objectA.fields.Title.toLowerCase() > objectB.fields.Title.toLowerCase()) {
            return -1;
          }
        });
        setList(sortedList);
        return;
      }
    });
}

//newTitle->Name of item   newDate->Date of item   list->the array where items are stored
//setList->useState function to set the list   sortState->bool showing ascending or descending order of list
//setSortState->sets the sortState
function createTaskSchedulerTodo(newTitle, newDate, list, setList, sortState, setSortState) {
  fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/default`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ records: [{ fields: { Title: " ", Upcoming: newTitle, Date: newDate } }] }),
  })
    .then((response) => response.json())
    .then((result) => {
      const item = result.records[0];
      let newList = [...list, item];

      const sortedList = newList
        .filter((item) => item.fields.Date !== " ")
        .sort((a, b) => {
          const d1 = moment(a.fields.Date);
          const d2 = moment(b.fields.Date);
          if (sortState) {
            setSortState(false);
            return d1 - d2;
          } else {
            setSortState(true);
            return d2 - d1;
          }
        });
      setList(sortedList);
      return;
    });
}

export default initialFetchList;

export { createTodo, createTaskSchedulerTodo, initialTaskSchedulerList };
