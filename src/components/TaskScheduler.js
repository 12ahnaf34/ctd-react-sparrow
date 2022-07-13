import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./TaskScheduler.module.css";
import { createTaskSchedulerTodo, initialTaskSchedulerList } from "./Airtable";
import PropTypes from "prop-types";
import Date from "./Date";
import moment from "moment";
import Calendar from "react-calendar";

function TaskScheduler(props) {
  const [upcomingTasksList, setUpcomingTasksList] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortState, setSortState] = useState(true);

  useEffect(() => {
    initialTaskSchedulerList(setUpcomingTasksList, setLoading, sortState, setSortState);
  }, []);

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleDateChange = (event) => {
    setNewDate(event.target.value);
  };

  const addTask = (event) => {
    event.preventDefault();
    createTaskSchedulerTodo(newTitle, newDate, upcomingTasksList, setUpcomingTasksList, sortState, setSortState);
  };

  const sort = () => {
    const sortedList = upcomingTasksList
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
    setUpcomingTasksList(sortedList);
  };

  const removeTask = (id) => {
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/default/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}` },
    });

    const filteredList = upcomingTasksList.filter((item) => item.id !== id);
    setUpcomingTasksList(filteredList);
  };

  return (
    <div>
      <div>
        <nav className={style.navbar}>
          <Link to="/">Home</Link>
          <Link to="/taskScheduler">Task Scheduler</Link>
        </nav>
        <h1>Task Scheduler</h1>
      </div>

      <form onSubmit={addTask}>
        <label htmlFor="todoTitleInput">Title</label>
        <input className={style.titleInput} required id="todoTitleInput" type="text" onChange={handleTitleChange} />
        <br />
        <label htmlFor="todoDateInput">Date</label>
        <input className={style.dateInput} required placeholder="MM-DD-YY" id="todoDateInput" type="date" onChange={handleDateChange} />
        <button type="submit" className={style.addButton}>
          Add
        </button>
      </form>
      <br />
      <button className={style.addButton} type="button" onClick={sort}>
        {sortState ? "Newest - Oldest" : "Oldest - Newest"}
      </button>
      <br />

      <ul className={style.taskScheduler}>
        {upcomingTasksList.map((item) => {
          if (item.fields.Upcoming !== " ") {
            return (
              <li key={item.id}>
                {item.fields.Upcoming}
                {"  "}
                <Date date={item.fields.Date} />
                <button className={style.removeButton} onClick={() => removeTask(item.id)}>
                  X
                </button>{" "}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

//value={upcomingTasksList.fields.Date[0]}

TaskScheduler.propTypes = {
  upcomingTasksList: PropTypes.array,
  setUpcomingTasksList: PropTypes.func,
  newTitle: PropTypes.string,
  setNewTitle: PropTypes.func,
  setNewDate: PropTypes.func,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
};

export default TaskScheduler;
