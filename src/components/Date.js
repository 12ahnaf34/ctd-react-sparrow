import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import styles from "./Date.module.css";

function Date(props) {
  const { date } = props;

  return (
    //
    <span>
      {" "}
      {"\u00a0\u00a0"}
      <Moment className={styles.date} format="MM-DD-YY">
        {date}
      </Moment>
    </span>
  );
}

Date.propTypes = {
  date: PropTypes.node,
};

export default Date;
