import React, { Component } from "react";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import NavContainer from "./Nav/NavContainer";
import ThemeDefault from "./theme-default";
import { Provider } from "react-redux";
//import { configureStore } from "./store";
//const store = configureStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.onclick = this.onclick.bind(this);
  }
  onclick() {
    console.log("onclick");
    //json.grid.table.tableBody.scroll = "true";
  }
  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={ThemeDefault}>
          <NavContainer />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
