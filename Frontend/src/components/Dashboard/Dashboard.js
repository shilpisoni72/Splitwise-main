// import React, { Component } from 'react';
// import Styles from '../../Styles.js';
// import DashboardMenu from './DashboardMenu.js';
// import DashboardMain from './DashboardMain.js';
// import DashboardAside from './DashboardAside.js';

// class Dashboard extends Component{
//     render(){
//         return(
//             <div style={{display:'flex', flexDirection:'row', marginLeft:'190px'}}>
//                 <DashboardMenu  users={this.props.users}    friends={this.props.friends}    groups={this.props.groups}
//                                 addGroup={this.props.addGroup}  addFriends={this.props.addFriends}/>
//                 <DashboardMain account={this.props.account} groups={this.props.groups}		log={this.props.log} 
//                 addBill={this.props.addBill} />
//                 <DashboardAside />
//             </div>
//         );
//     }
// }

// export default Dashboard;


import React, { Component } from "react";
import Styles from "../../Styles.js";
import DashboardMenu from "./DashboardMenu.js";
import DashboardMain from "./DashboardMain.js";
import DashboardAside from "./DashboardAside.js";
import Profile from "../Profile/Profile";
import MiddleRecentActivity from "../RecentActivity/RecentActivity";
import MyGroups from "../RecentActivity/MyGroups"
import { DeviceBluetoothDisabled } from "material-ui/svg-icons";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { profile: false, dash: true, recentactivity: false,mygroup:false, account :  this.props.account};
    this.account =  { totalBalance: null, youOwe: null, youAreOwed: null};
    //this.randomAvatar.bind(this);
    //this.randomAvatar();
    //this.props.chooseAvatarOpen.bind(this);
  }

  showProfile = () => {
    this.setState({ profile: true, dash: false, recentactivity: false,mygroup:false });
  };
  showDash = () => {
    this.setState({ dash: true, profile: false, recentactivity: false,mygroup:false });
  };
  showRecentActivity = () => {
    this.setState({ recentactivity: true, dash: false, profile: false,mygroup:false });
  };
showMyGroups=()=>{
    this.setState({mygroup:true,account:{youOwe : 25},recentactivity:false,dash:false,profile:false});
}
  render() {
    let redirectVar = null;
    if (this.state.profile) {
      redirectVar = <Profile />;
    }
    if (this.state.recentactivity) {
      // redirectVar = <Profile />;
      redirectVar = <MiddleRecentActivity />;
    }
    if(this.state.mygroup)
    {
        redirectVar = <MyGroups/>;
    }
    if (this.state.dash) {
      //show dash
      redirectVar = (
        <div
          style={{ display: "flex", flexDirection: "row", marginLeft: "190px" }}
        >
          <DashboardMenu
            users={this.props.users}
            friends={this.props.friends}
            groups={this.props.groups}
            addGroup={this.props.addGroup}
            addFriends={this.props.addFriends}
          />
          <DashboardMain
            account={this.state.account}
            groups={this.props.groups}
            log={this.props.log}
            addBill={this.props.addBill}
          />
        </div>
      );
    }
    return (
      <div>
        <button onClick={this.showProfile.bind(this)}>Profile</button>
        <br></br>
        <button onClick={this.showDash.bind(this)}>Dashboard</button>
        <br></br>
        <button onClick={this.showRecentActivity.bind(this)}>
          Recent Activity
        </button>
        <button onClick={this.showMyGroups.bind(this)}>
            Show Groups
        </button>
        {redirectVar}
        {/* <div
          style={{ display: "flex", flexDirection: "row", marginLeft: "190px" }}
        >
          <DashboardMenu
            users={this.props.users}
            friends={this.props.friends}
            groups={this.props.groups}
            addGroup={this.props.addGroup}
            addFriends={this.props.addFriends}
          />
          <DashboardMain
            account={this.props.account}
            groups={this.props.groups}
            log={this.props.log}
            addBill={this.props.addBill}
          />
          <DashboardAside />
        </div> */}
      </div>
    );
  }
}

export default Dashboard;
