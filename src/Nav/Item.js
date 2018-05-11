import React, { Component } from "react";
import Arrowback from "material-ui/svg-icons/navigation/arrow-back";

//import Left from "material-ui/svg-icons/navigation/chevron-left";
//import SubdirectoryArrowLeft from "material-ui/svg-icons/navigation/subdirectory-arrow-left";
//import { white } from "material-ui/styles/colors";
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //one: true,
    };
  }
  showNodeIcon(item) {
    return !item.leaf ? (
      <span>
        <Arrowback style={{ color: "white" }} />
      </span>
    ) : null;
  }
  onclick = () => {
    if (!this.props.currentSelection || !this.props.leaf) {
      console.log("bubble up if not currentSelection");
      this.props.onclick(this.props.item);
    } else {
      console.log("NOT bubble up because currentSelection");
    }
  };

  render() {
    const s = clas => {
      console.log("s " + clas);
      this.props.childrenShowing ? t : null;
    };
    const t = {
      transition: "transform 2s ease-out",
      transform: "translateX(-290%)"
    };
    return (
      <div
        className={this.props.styl}
        onClick={this.onclick}
        style={{
          lineHeight: "24px",
          margin: "4px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginLeft: "10px",
          cursor: "pointer",

          opacity: this.props.show ? 100 : 0
        }}
      >
        <div style={s()}>
          {this.showNodeIcon(this.props.item)}
          {`${this.props.item.name}`}
        </div>
      </div>
    );
  }
}

export default Item;
