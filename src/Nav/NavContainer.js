import React, { Component } from "react";
import Nav from "./Nav.js";
//import { connect } from "react-redux";
//import { saveFavs } from "../../actions";
import { data } from "./data";

class NavContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {}
  componentDidMount() {}

  render() {
    let { closeSelf } = this.props;
    return (
      <div style={{ padding: "10px" }}>
        {data && (
          <Nav
            preferences={null}
            setFavs={null}
            authorizations={null}
            closeSelf={closeSelf}
            login={null}
            data={data}
          />
        )}
      </div>
    );
  }
}
//  adminData: state.presence.rows
//  ? R.sort(R.ascend(R.prop("firstName")), state.presence.rows)
//  : null,
/*
const mapStateToProps = (state, ownProps) => ({
  user: state.presence.rows ? state.notifications : null,
  preferences: state.presence.rows
    ? state.notifications.user.preferences
    : null,
  authorizations: state.presence.rows
    ? state.notifications.user.permissions
    : null,
  login: state.notifications ? state.notifications.login : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  setFavorites: arr => {
    dispatch(saveFavs(arr));
  }
});
const NavContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  NavContainer
);
export default NavContainer2;
*/
export default NavContainer;
