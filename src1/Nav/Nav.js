import React, { Component } from "react";
import * as R from "ramda";
import "./Nav.css";
//import "../Tooltip.css";
import Remove from "material-ui/svg-icons/content/remove";
import CircleAdd from "material-ui/svg-icons/image/control-point";
import ExpandLess from "material-ui/svg-icons/navigation/arrow-drop-up";
import ExpandMore from "material-ui/svg-icons/navigation/arrow-drop-down";
import Home from "material-ui/svg-icons/action/home";
import IconButton from "material-ui/IconButton";
import Item from "./Item";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.data };
  }
  componentDidMount() {
    window.addEventListener("resize", () =>
      this.setState({ width: window.innerWidth })
    );
  }
  componentWillUnmount() {
    window.addEventListener("resize", () =>
      this.setState({ width: window.innerWidth })
    );
  }
  fStyle(show, id = 0) {
    let addCSS = "";
    if (id === this.state.level1Selection && !this.state.currentSelectionLeaf) {
      addCSS = "todoitemA selectedA";
    } else if (
      id === this.state.level1Selection &&
      this.state.level2Selection
    ) {
      addCSS = "todoitemC";
    } else {
      addCSS = "todoitemA";
    }
    return show ? addCSS : "hide1A hide2A";
  }
  onclick = item => {
    //this.setState({ data: this.updateSibs(item, false, this.state.data) });
    //  this.setState({ data: this.updateChildren(item, true, this.state.data) });
    this.setState({
      data: this.updateChildren(
        item,
        true,
        this.updateSibs(item, false, this.state.data)
      )
    });
  };
  home = () => {};

  updateSibs = (item, bShow, data) => {
    return R.map(
      x =>
        x.id != item.id && x.level == item.level
          ? R.merge(x, { show: bShow })
          : x,
      data
    );
  };
  updateChildren = (item, bShow, data) => {
    return R.map(
      x => (x.parentId == item.id ? R.merge(x, { show: bShow }) : x),
      data
    );
  };
  updateParent = (item, bShow, data) => {
    console.log("updateParent f");
    return R.map(
      x => (x.id == item.parentId ? R.merge(x, { show: bShow }) : x),
      data
    );
  };
  /*direction param:  0= same level, -1= parent,+1 = child */
  updateShow = (item, show = true, direction = 0, data) => {
    const level = R.prop("level", item);
    console.log(level);
    console.table(R.filter(x => x.level == level + direction, data));
    console.log(item.id);
    if (!direction) {
      console.table(
        //  R.map(x => (x.id !== item.id ? (x.show = show) : x), this.state.data)
        R.map(
          x => (x.id !== item.id ? R.merge(x, { show: show }) : x),
          this.state.data
        )
      );
    } else {
      console.table(
        //  R.map(x => (x.id !== item.id ? (x.show = show) : x), this.state.data)
        R.map(
          x => (x.parentId !== item.id ? R.merge(x, { show: show }) : x),
          this.state.data
        )
      );
    }

    return R.map(
      x => (x.id !== item.id ? (x.show = show) : x),
      this.state.data
    );
  };
  render() {
    //const { data } = this.props;
    console.table(this.state.data);

    return (
      <div style={{ padding: "0px" }}>
        {this.state.data.map(
          (x, i) =>
            x.show && (
              <Item
                key={x.id}
                styl={this.fStyle(x.show, x.id)}
                item={x}
                onclick={this.onclick}
                currentSelection={
                  this.state.currentSelection == x.id ? true : false
                }
                currentParent={
                  this.state.level1Selection == x.id ? true : false
                }
                leaf={x.leaf}
              />
            )
        )}
      </div>
    );
  }
}

export default Nav;
