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
  updateSibs = (data, item, bShow) => {
    console.log("updateSibs f");
    if (item.leaf) {
      return;
    }
    return R.map(
      x =>
        x.id != item.id && x.level == item.level
          ? R.merge(x, { show: bShow })
          : x,
      data
    );
  };
  updateChildren = (data, item, bShow) => {
    console.log("updateChildren f");
    return R.map(
      x => (x.parentId == item.id ? R.merge(x, { show: bShow }) : x),
      data
    );
  };
  updateParent = (data, item, bShow) => {
    console.log("updateParent f");
    return R.map(
      x => (x.id == item.parentId ? R.merge(x, { show: bShow }) : x),
      data
    );
  };
  setChildrenShowing = (data, item, bShow) => {
    console.log("setChildrenShowing f");
    return R.map(
      x => (x.id == item.id ? R.merge(x, { childrenShowing: bShow }) : x),
      data
    );
  };
  hasChild = item => {
    return !!R.find(x => x.parentId == item.id, this.state.data);
  };
  hasChildrenShowing = item => {
    //return !!R.find(x => x.id == item.id, this.state.data);
    console.log("hasChildrenshowing f");
    return !!R.prop("childrenShowing", item);
  };

  onclick = item => {
    console.log("onclick");
    console.log(this.hasChildrenShowing(item));
    if (this.hasChildrenShowing(item)) {
      this.setState({
        data: this.updateChildren(
          this.updateSibs(
            this.setChildrenShowing(this.state.data, item, false),
            item,
            true
          ),
          item,
          false
        )
      });
    } else if (this.hasChild(item)) {
      console.log("hasCHild");
      this.setState({
        data: this.updateChildren(
          this.updateSibs(
            this.setChildrenShowing(this.state.data, item, true),
            item,
            false
          ),
          item,
          true
        )
      });
    }
  };
  home = () => {};
  render() {
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
