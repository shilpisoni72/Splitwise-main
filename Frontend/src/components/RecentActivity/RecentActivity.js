import React from "react";
import "./Dashboard.css";

const MiddleRecentActivity = (props) => {
  return (
    <div className="Middle">
      <div className="MidDash">
        <div className="DashHeader">
          <h3> RECENT ACTIVITY</h3>
        </div>
      </div>

      <div>
        <div className="float-left ml-3 ">
          <ul>
            <li>
              Michael Added $25 for "Food Arrangements" to "Farewell Party"
            </li>
            <br></br>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MiddleRecentActivity;
