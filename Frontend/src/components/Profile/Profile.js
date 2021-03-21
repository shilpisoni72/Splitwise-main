// import React from "react";

import ProfileImage from "./Divider/index";
import Divider from "./ProfileImage/index";
import React, { Component } from "react";

export class Profile extends Component {
  render() {
    //const { selectValue, filterData } = this.props;
    return (
      <div>
        {/* <DashHeader /> */}
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <ProfileImage />
        <Divider />

        <div className="rightPanel">
          <div className="row">
            <label className="col-sm-2 col-form-label">
              <b>Default currency</b>{" "}
            </label>
            <div className="col-sm-6 mb-2">
              <br></br>
              <select>
                <option disabled defaultValue selected>
                  Select your appropriate Currency
                </option>
                <option> USD </option>
                <option> KWD </option>
                <option> BHD </option>
                <option>GBP</option>
                <option>EUR</option>
                <option>CAD</option>
              </select>
            </div>

            <div className="col-sm-4"></div>
          </div>

          <div className="row">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              <b>Your Timezone</b>
            </label>
            <div className="col-sm-6 mb-2">
              <br></br>
              <select>
                <option disabled defaultValue selected>
                  Select your appropriate timezone
                </option>
                <option> (GMT - 08:00) Pacific Time (US) </option>
                <option> (GMT - 07:00) </option>
                <option> (GMT - 06:00) </option>
                <option>(GMT - 05:00)</option>
              </select>
            </div>
            <div className="col-sm-4"></div>
          </div>
          <br></br>
          <div className="row">
            <label htmlFor="telephone" className="col-sm-2 col-form-label">
              <b>Language</b>
            </label>
            <div className="col-sm-6 mb-2">
              <select>
                <br></br>
                <option disabled defaultValue selected>
                  Select your appropriate language
                </option>
                <option> English </option>
                <option> Spanish </option>
                <option> Hindi </option>
                <option>French</option>
              </select>
            </div>
            <div className="col-sm-4"></div>
          </div>
          <br></br>

          <div className="row">
            <div className="col-sm-5 mb-2"></div>
            <div className="col-sm-4 left">
              <button
                type="button"
                className="button btn btn-outline-success btn-lg"
                onClick={this.submitForm}
              >
                Save
              </button>
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
