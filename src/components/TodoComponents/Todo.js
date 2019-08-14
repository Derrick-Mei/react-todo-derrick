import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: "22%",
    margin: 10
  },
  title: {
    fontSize: 14
  },
  description: {
    marginBottom: 12
  },
  completed: {
    textDecoration: "line-through"
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();

  return (
    <Card className={props.todo.completed ? `${classes.card} ${classes.completed}` : classes.card} onClick={() => props.toggleTodo("rfcTodoList", props.todo.id)}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          RFC To Do
        </Typography>
        <Typography variant="h5">{props.todo.title}</Typography>

        {props.todo.description && (
          <>
            <Typography className={classes.description} color="textSecondary">
              Description
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {props.todo.description}
            </Typography>{" "}
          </>
        )}

        <FormControlLabel control={<Checkbox checked={props.todo.completed} />} label="Completed" />

        <div>{props.todo.dueDate && `Due Date: ${props.todo.dueDate}`}</div>
      </CardContent>
    </Card>
  );
}
