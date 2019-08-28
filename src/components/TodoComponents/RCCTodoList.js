import React, { Component } from 'react'

import TodoClass from './TodoClass'

import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  wrapper: {
    display: "flex",
    border: "3px solid blue",
    borderRadius: 10,
    margin: 10
  }
});

class RCCTodoList extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.wrapper}>
                {Object.keys(this.props.rccTodoList).map(id => !this.props.rccTodoList[id].deleted && <TodoClass todo={this.props.rccTodoList[id]} key={id} toggleTodo={this.props.toggleTodo}/>)}
            </div>
        )
    }
}

export default withStyles(styles)(RCCTodoList);