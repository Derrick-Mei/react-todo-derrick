import React from "react";
import Button from "@material-ui/core/Button";

import { NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  border: {
    // border: "1px solid black",
    height: "3rem"
  },
  navButton: {
    padding: 5,
    margin: 5
  }
});

export default function NavBar() {
  const classes = useStyles();
  return (
    <div className={classes.border}>
      <Button className={classes.navButton} component={NavLink} exact to="/" color="primary">Home</Button>
      <Button className={classes.navButton} component={NavLink} to="/todo" color="secondary">To Do List</Button>
      <Button className={classes.navButton} component={NavLink} to="/form" >Add To Do/Form</Button>
      <Button disabled className={classes.navButton} component={NavLink} to="/completed" >Completed Items</Button>
      <Button disabled className={classes.navButton} component={NavLink} to="/completed" >Deleted Items</Button>
    </div>
  );
}
