import React, { Component, createRef } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

import "./style.css";

export class ProfileImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      selectedFile: URL.createObjectURL(event.target.files[0]),
    });
  }

  logout = (event) => {
    event.preventDefault();
    this.props.history.push("/login");
  };

  render() {
    return (
      <div>
        <div className="leftPanel">
          <div className="centerPanel">
            <div className="container">
              <img className="profileImage" src={this.state.selectedFile} />
            </div>
            <br></br>
            Change your avatar<br></br>
            <input type="file" onChange={this.handleClick} />
            {/* <input type="file" accept="image/*" id="profileImg" /> */}
            <div className="center">
              {this.props.formSubmitted &&
                this.props.profile &&
                this.props.profile.profileImage.length === 0 && (
                  <span className="error">Please Select Image</span>
                )}
            </div>
          </div>

          <div className="row">
            <b> Your Name :</b>
            <img className="profile" alt="" srcset="" align="right" />
            {"Edit"}
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              placeholder="Michael"
            />
          </div>
          <br></br>
          <div className="row">
            <b> Your email :</b>
            <img className="profile" alt="" srcset="" align="right" />
            {"Edit"}
            <br></br>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              placeholder="Michael@gmail.com"
            />
          </div>
          <br></br>
          <div className="row">
            <b> Your phone number :</b>
            <img className="profile" alt="" srcset="" />
            {"Edit"}
            <br></br>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              placeholder="None"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileImage;
