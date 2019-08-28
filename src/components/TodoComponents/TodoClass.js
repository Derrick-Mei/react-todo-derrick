import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
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

class TodoClass extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={this.props.todo.completed ? `${classes.card} ${classes.completed}` : classes.card} onClick={() => this.props.toggleTodo("rccTodoList", this.props.todo.id)}>
        <CardContent>

          <Typography className={classes.title} color="textSecondary" gutterBottom>
            RCC To Do
          </Typography>
          <Typography variant="h5">{this.props.todo.title}</Typography>

          {this.props.todo.description && (
          <>
            <Typography className={classes.description} color="textSecondary">
              Description
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {this.props.todo.description}
            </Typography>{" "}
          </>
        )}

          <FormControlLabel control={<Checkbox checked={this.props.todo.completed} />} label="Completed" />

          <div>{this.props.todo.dueDate && `Due Date: ${this.props.todo.dueDate}`}</div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(TodoClass);
