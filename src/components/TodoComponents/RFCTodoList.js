import React from "react";
import Todo from "./Todo";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    border: "3px solid red",
    borderRadius: 10,
    margin: 10
  }
});

export default function RFCTodoList(props) {
  const classes = useStyles();
  return <div className={classes.wrapper}>{Object.keys(props.rfcTodoList).map(id => !props.rfcTodoList[id].deleted && <Todo todo={props.rfcTodoList[id]} key={id} toggleTodo={props.toggleTodo} />)}</div>;
}
