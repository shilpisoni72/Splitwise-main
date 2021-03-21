import React, { Component } from 'react';
import SWAppBar from './components/AppBar/SWAppBar.js';
import SignUpLogin from './components/SignUpLogin/SignUpLogin';
import Dashboard from './components/Dashboard/Dashboard.js';

class SplitWise extends Component{
    constructor(props){
        super(props);
        this.state = {createGroupShow:false, chooseAvatarShow:false};
        //this.chooseAvatarOpen.bind(this);
        //this.chooseAvatarClose.bind(this);
    }
    chooseAvatarOpen(){
        console.log("opening avatar");
        this.setState({chooseAvatarShow: true});
    }
    chooseAvatarClose(){
        console.log("closing avatar");
        this.setState({chooseAvatarShow: false});
    }
    render(){
        return(
            <div>
                <SWAppBar   page={this.props.page}
                    onTitleClick={this.props.onTitleClick}  signupLogin={this.props.signupLogin}
                    signupPage={this.props.signupPage}      loginPage={this.props.loginPage}
                    signup={this.props.signup}              login={this.props.login}                
                    loggedIn={this.props.loggedIn}          username={this.props.username}
                    logout={this.props.logout}              
                    chooseAvatarOpen={this.chooseAvatarOpen.bind(this)}
                />
             {this.props.loggedIn
                ?
                    <Dashboard  users={this.props.users}
                                friends={this.props.friends}    groups={this.props.groups}
                                account={this.props.account}    log={this.props.log}
                                addBill={this.props.addBill}
                                addGroup={this.props.addGroup}  addFriends={this.props.addFriends}
                                setAvatar={this.props.setAvatar}
                                chooseAvatarClose={this.chooseAvatarClose}
                                
                    />
                :
                    <SignUpLogin loggedIn={this.props.loggedIn}     signupLogin={this.props.signupLogin}
                        signupPage={this.props.signupPage}      loginPage={this.props.loginPage}
                        signup={this.props.signup}              login={this.props.login}/>
             }
            </div>
        );
    }
}

export default SplitWise;
/* {this.props.loggedIn === 2
                ?
                    <Dashboard  users={this.props.users}
                                friends={this.props.friends}    groups={this.props.groups}
                                account={this.props.account}    log={this.props.log}
                                addBill={this.props.addBill}
                                addGroup={this.props.addGroup}  addFriends={this.props.addFriends}
                                setAvatar={this.props.setAvatar}
                                chooseAvatarClose={this.chooseAvatarClose}
                    />
                :
  
                */