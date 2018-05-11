import React from "react";
import TextField from "material-ui/TextField";

export default class TextFieldControlled extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.data,
      name: this.props.name
    };
  }
  handleChange = event => {
    this.setState({
      value: event.target.value
    });
    this.props.change(this.state.name, event.target.value, this.props.id);
  };
  render() {
    return (
      <div>
        <TextField
          id="text-field-controlled"
          label="ADD NICE FILE NAME"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
