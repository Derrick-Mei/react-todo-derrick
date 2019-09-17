import React from "react";
import { Route } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";
import TodoForm from "./components/TodoComponents/TodoForm";
import RFCTodoList from "./components/TodoComponents/RFCTodoList";
import RCCTodoList from "./components/TodoComponents/RCCTodoList";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      rfcTodoList: {
        1: { title: "rfc", description: "rfc description", completed: false, id: 1, deleted: false, dueDate: "01/01/2000", createdAt: 0 },
        3: { title: "rfc2", description: "rfc description2", completed: true, id: 3, deleted: false, dueDate: "01/01/2000", createdAt: 0 }
      },
      rccTodoList: { 2: { title: "rcc", description: "rcc description", completed: true, id: 2, deleted: false, dueDate: "01/01/2000", createdAt: 1 } },
      id: 4
    };
  }

  addTodo = (type, todo) => {
    let prevState = this.state;
    prevState[type] = { ...prevState[type], [prevState.id]: { ...todo, id: prevState.id } };
    this.setState({
      ...prevState,
      id: prevState.id + 1
    });
  };

  toggleTodo = (type, id) => {
    let list = this.state[type];
    list[id]["completed"] = !list[id]["completed"];
    this.setState({
      [type]: list
    });
  };

  safeDelete = () => {
    let rfcTodoList = this.state.rfcTodoList;
    let rccTodoList = this.state.rccTodoList;
    Object.keys(rfcTodoList).map(id => {
      if (rfcTodoList[id].completed) rfcTodoList[id].deleted = true;
    });
    Object.keys(rccTodoList).map(id => {
      if (rccTodoList[id].completed) rccTodoList[id].deleted = true;
    });
    this.setState({
      rfcTodoList,
      rccTodoList
    });
  };

  undoDelete = () => {
    let rfcTodoList = this.state.rfcTodoList;
    let rccTodoList = this.state.rccTodoList;
    Object.keys(rfcTodoList).map(id => {
      rfcTodoList[id].deleted = false;
    });
    Object.keys(rccTodoList).map(id => {
      rccTodoList[id].deleted = false;
    });
    this.setState({
      rfcTodoList,
      rccTodoList
    });
  };

  hardDelete = () => {
    console.log("hard Delete")
    let rfcTodoList = this.state.rfcTodoList;
    let rccTodoList = this.state.rccTodoList;
    Object.keys(rfcTodoList).map(id => {
      if (rfcTodoList[id].completed) delete rfcTodoList[id];
    });
    Object.keys(rccTodoList).map(id => {
      if (rccTodoList[id].completed) delete rccTodoList[id];
    });
    this.setState({
      rfcTodoList,
      rccTodoList
    });
  };

  render() {
    return (
      <div>
        <NavBar />
        <h2>Welcome to your Todo App!</h2>
        <Route
          exact
          path="/"
          render={props => (
            <>
              <TodoForm addTodo={this.addTodo} safeDelete={this.safeDelete} undoDelete={this.undoDelete} hardDelete={this.hardDelete} {...props} />
              <RFCTodoList rfcTodoList={this.state.rfcTodoList} toggleTodo={this.toggleTodo} {...props} />
              <RCCTodoList rccTodoList={this.state.rccTodoList} toggleTodo={this.toggleTodo} {...props} />
            </>
          )}
        />
        <Route
          path="/todo"
          render={props => (
            <>
              <RFCTodoList rfcTodoList={this.state.rfcTodoList} toggleTodo={this.toggleTodo} {...props} />
              <RCCTodoList rccTodoList={this.state.rccTodoList} toggleTodo={this.toggleTodo} {...props} />{" "}
            </>
          )}
        />

        <Route path="/form" render={props => <TodoForm addTodo={this.addTodo} safeDelete={this.safeDelete} undoDelete={this.undoDelete} hardDelete={this.hardDelete} {...props} />} />
            <div>Things To do</div>
            <ul>
              <li>Regex search</li>
              <li>String similarity search</li>
              <li>completed components page</li>
              <li>deleted components page</li>
            </ul>
      </div>
    );
  }
}

export default App;
