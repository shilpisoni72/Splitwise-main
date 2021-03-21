import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from '../../muiTheme.js';
import SplitWise from '../../SplitWise';
import Snackbar from 'material-ui/Snackbar'
import Axios from 'axios';

//create the Navbar Component
class Navbar extends Component {

    constructor(props){
        super(props);
        var users 	= {};
        var friends 	= {};
        var groups	= {};
        var log		= {};

        this.user  =    { userId: '', userEmail:'', userName: '', noOfFriends:0, profileImage: null,userGroups: null};
        this.account =  { totalBalance: null, youOwe: null, youAreOwed: null};

        this.state =    { page:1 , signupLogin: 0, loggedIn: false, err: 0, errorOpen: false,
                          users:users, friends:friends, groups:groups, log:log};

        this.updateFriends.bind(this);
        this.updateGroups.bind(this);
        
        this.updateUserlogs.bind(this);
		this.insertLog.bind(this);
		
        ;

        this.setCookie.bind(this);
        this.getCookie.bind(this);
        this.signup = this.signup.bind(this);
        this.error = this.error.bind(this);
        this.setAvatar = this.setAvatar.bind(this);
        this.updateUserAccount = this.updateUserAccount.bind(this);
        //------------
        //this.componentWillMount();
    }
    
    signupPage(){   this.setState({signupLogin: 0});    }
    loginPage(){    this.setState({signupLogin: 1});    }
    
    ValidateEmail(mail) {  
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  {  return (true);  }   
        return (false);  
    }  

    //----------   add new friends
    addFriends = (newFriends) => {
        let that = this;
        //console.log(newFriends);
        var selected_friends =  newFriends;
        var selected_friends_id=[]; // this array will contain the retrieved ids of the friends

        if((that.state.noOfFriends + selected_friends.length) >10){
            this.error(6);
        }
        else{
            //------- step 1 : get corresponding ids of all selected users from the list of potential friends
           
console.log(selected_friends);
            for(let i=0; i < selected_friends.length; i++){
                
                const data = {
                    userName : selected_friends[i]
                }
                axios.post('http://localhost:3001/getUserByUsername',data)
                .then(function(response) {
                    return response;
                })
                .then(function(result) {
                    selected_friends_id[i]=result.data[0].user_id;
                    //console.log(selected_friends_id);
                    //------- step 2 : inserting the id, username pairs of new friends for current-user
                    if(i === (selected_friends.length - 1)){
                        let friendUserId = "friend_user_id_";
                        let friendUserName = "friend_username_";
                        let friend_counter = that.state.noOfFriends;
                        for(let j=0; j < selected_friends.length; j++){
                            friend_counter++;
                            let COL_friend_user_id  = friendUserId + friend_counter;
                            let COL_friend_username = friendUserName + friend_counter;
                            var c1  = JSON.stringify(COL_friend_user_id);
                            var c2  = JSON.stringify(COL_friend_username);
                            console.log(COL_friend_user_id);
                            console.log(selected_friends_id[j]);
                            let data = {};
                                data[COL_friend_user_id] =  selected_friends_id[j],
                                data[COL_friend_username] = selected_friends[j],
                                data["total_friends"]=  friend_counter,
                                data["userId"] = that.getCookie("userId")
                                console.log(JSON.stringify(data));
                            
                            axios.post('http://localhost:3001/addFriend',data)
                            .then(function(response) {
                                that.state.noOfFriends = friend_counter;
                                console.log("updated no of friends : "+that.state.noOfFriends);
                                that.updateFriends();//that.APPcomponentWillMount();
                                that.error(1001);  
                                return response;                                                       
                            })
                            .catch(function(error) {
                                console.log('Request Failed:' + error);
                            });
                        }
                    }
                })
                .catch(function(error) {
                    console.log('Request Failed:' + error);
                });
            }    
        }
    };

    //----------   update friends after adding new friends or on mounting    
    updateFriends(){
        var that = this;
        var tmpAllUsersList = {};
        var potentialFriendsList = {};
        var tmpUsersList = {};
        var tmpFriendList = {};

       axios.get('http://localhost:3001/getAllUsers')
       
        .then(function(response) {
            return response;
        })
        .then(function(result) {                            //console.log(result);
            for(let i=0,j=1; i < result.data.length; i++,j++){
                tmpAllUsersList[j] = result.data[i].userName;
                console.log(tmpAllUsersList[j])
            }
            //---We have list of all users now we will fetch existing friends of current user
          
            axios.post("http://localhost:3001/getUserDetails",{userId : that.getCookie("userId")})
            .then(function(response) {
                return response;
            })
            .then(function(result) {                                //console.log(result);
                that.state.noOfFriends = result.data[0].total_friends; //try a setState here
                var tmpStr = "friend_username_";
                for(let i=0,j=1; i < that.state.noOfFriends; i++,j++){
                    let tmpCol = tmpStr + j;
                    tmpFriendList[j] = result.data[0][tmpCol];
                }
                that.setState({friends:tmpFriendList});
                //--- this is the list of all existing friends
                //--- next we will show potential friends  = users who aren't already friends
                var TMPusers   = tmpAllUsersList;
                var TMPfriends = that.state.friends;
                
                var k = 1;
                for(let i=1; i<=Object.keys(TMPusers).length; i++){
                  let check = 0;
                  for(let j=1; j<=Object.keys(TMPfriends).length; j++){
                    if((TMPusers[i]===TMPfriends[j])||(TMPusers[i]===that.user.userName)){
                      check = 1;
                    }
                  }
                  if(check===0){
                    potentialFriendsList[k] = TMPusers[i];
                    k++;
                  }
                }
                //console.log(potentialFriendsList);         
                that.setState({users:potentialFriendsList});
            })
            .catch(function(error) {
                console.log('Request Failed:' + error);
            });
            //------------
        })
        .catch(function(error) {
            console.log('Request Failed:' + error);
        });
    }
 //----------- end of update friends   
    addGroup = (groupName, groupMembers) => {
        var that = this;
        //console.log(groupName);
        //console.log(groupMembers);
        if(groupMembers.length <= 0){
            this.error(4);
        }
        else if(groupMembers.length > 4){
            this.error(7);
        }
        else{
            var group_name = groupName;
            var group_member_default = that.getCookie("username");
            var group_members = groupMembers;
            var no_of_members = group_members.length + 1;
            
            const data = {
                group_name: group_name, 
                member_username_1: group_member_default,
                member_username_2: group_members[0],
                member_username_3: group_members[1],
                member_username_4: group_members[2],
                member_username_5: group_members[3],
                number_of_members: no_of_members
            };
              
            axios.post("http://localhost:3001/addGroup",data)
            .then(function(response) {
                return response;
            })
            .then(res => {
            const {member_username_1: name1,member_username_2: name2,member_username_3: name3,member_username_4: name4,member_username_5: name5}  = data;
            let memberNames = [];
            memberNames.push(name1);
            memberNames.push(name2);
            memberNames.push(name3);
            memberNames.push(name4);
            memberNames.push(name5);

            memberNames.push()
                for (let i =0; i< no_of_members;i++)
               {
                   ;
                   let obj = {
                        userName :memberNames[i],
                        group_name:data.group_name,
                        acceptInvite: 0
                   }
                   axios.post("http://localhost:3001/sendInvite",obj)
                .then(response => {return response})
                .catch(err => console.log(err));
               }

                
            })
            .then(function(result) {		//console.log(result);
                //-------- next : update users append to the group_ids for current user
                that.updateGroups();
                that.error(1002);
                //that.APPcomponentWillMount();
            })
            .catch(function(error) {
                console.log('Request Failed:' + error);
            });
        }
    };
    updateGroups(){
        var that = this;
        var tmpGroupsList = {};
        
        //------- getting names of all  the groups an user is associated with
       axios.post("http://localhost:3001/getAllGroups", {userName : that.getCookie("username")})
            .then(function(response) {
            return response;
        })
        .then(function(result) {
            //console.log(result);                        //console.log(result.result.length-1);
            var groups_current_user = result.data.length;    //var groups_current_user = result.result.length-1;

            for(let k=0; k < groups_current_user; k++){
                tmpGroupsList[k+1] = result.data[k]["group_name"];
            }
            // update state here
            //tmpGroupsList = { 1:'group  1', 2:'group  2', 3:'group  3'};
            that.setState({groups:tmpGroupsList});
            console.log("Updated Groups");
            //console.log(that.state.groups);
        })
        .catch(function(error) {
            console.log('Request Failed:' + error);
        });
    }
    componentWillMount(){
        var userCookie   = this.getCookie("username");
        var loggedCookie = this.getCookie("userLoggedIn");
        
        if(loggedCookie){
            this.setState({loggedIn:true});//that.state.auth = true;
            this.user.userName = userCookie;
            this.APPcomponentWillMount();
        }
    }
    //---- after construction mounting will take place
    APPcomponentWillMount(){
        this.updateFriends();
        this.updateGroups();
        this.updateUserAccount(); //get account balance of current user
        this.updateUserlogs();    //get the logs for current user
    }
//----------   update friends 
//----------- update the groups in a similar way 
//------------------ display the list of expenditures
    updateUserlogs(){
        var that = this;
        var user_owes_dollar = 0;
        var user_owed_dollar = 0;
        var logs = {};
        		
        axios.post("http://localhost:3001/getLogs",{userId : that.getCookie("userId")})
        .then(function(response) { 
            return response; 
        })
		.then(function(result) {				console.log(result);
			//fill the logs and calculate account
			for(let i = 0; i < result.data.length; i++){
				var tmpLog = {'name':null,'group':null,'year':null,'month':null,'day':null,'paidBy':null,
							  paid:null,'lentBy':null,'lent':null};

				tmpLog['name'] 		= result.data[i]['bill_name'];
				tmpLog['group'] 	= result.data[i]['group_name'];
				tmpLog['year'] 		= result.data[i]['year'];
				tmpLog['month'] 	= result.data[i]['month'];
				tmpLog['day'] 		= result.data[i]['date'];
				tmpLog['paidBy'] 	= result.data[i]['paid_by_username'];
				tmpLog['paid'] 		= result.data[i]['paid_amount'];
				tmpLog['lentBy'] 	= result.data[i]['paid_by_username'];
				tmpLog['lent'] 		= result.data[i]['lent_amount'];

				tmpLog['notes'] 	= result.data[i]['notes'];
				tmpLog['file_path'] = result.data[i]['file'];
				
				logs[i+1]  = tmpLog;
				if(result.data[i]['lent_amount'] === 0)	{ user_owed_dollar += parseInt(result.data[i]['paid_amount']); }
				else								{ user_owes_dollar += parseInt(result.data[i]['lent_amount']); }
            }
            console.log("owes:",user_owes_dollar,"owed",user_owed_dollar)
			that.account.youOwe     = user_owes_dollar;
 			that.account.youAreOwed = user_owed_dollar;
			that.setState({log:logs}, function(){console.log(that.state.log);})
		})
		.catch(function(error) { console.log('Request Failed:' + error); });
    }
//----- end of update log()
//------------------  displays the account status
    updateUserAccount(){
        var that = this;
    
        //get only total_balance
    	
        axios.get("http://localhost:3001/getUserBalance",{userId : this.user.userId})
        .then(function(response) { 
            return response;
        })
		.then(function(result) {				//console.log(result);
			that.account.totalBalance = result.data[0]["total_balance"];
		})
		.catch(function(error) { console.log('Request Failed:' + error); });
    }
//----- end of update account()
//----------- end of component will mount

    setAvatar = (avatar_no) => {
        console.log("app.js : set avatar")
        console.log(avatar_no);
    }

    dateTime(){
        var billTime = {};
        var today = new Date();
        var time = today.getTime();
        var date = today.getDate();
        var month = "";
        var mm = today.getMonth()+1;
        var year = today.getFullYear();
        switch(mm){
             case 1 :   month = "JAN";      break;
             case 2 :   month = "FEB";      break;
             case 3 :   month = "MAR";      break;
             case 4 :   month = "APR";      break;
             case 5 :   month = "MAY";      break;
             case 6 :   month = "JUN";      break;
             case 7 :   month = "JUL";      break;
             case 8 :   month = "AUG";      break;
             case 9 :   month = "SEP";      break;
             case 10 :  month = "OCT";      break;
             case 11 :  month = "NOV";      break;
             case 12 :  month = "DEC";      break;
        }
        billTime.date = date;
        billTime.month = month;
        billTime.year = year;
        billTime.time = time;
        //console.log(billTime);
        return (billTime);
    }
//  end of date time
insertLog(logDetails){					
    console.log(logDetails);
    var that =  this;
    
    console.log("inserting log for :"+logDetails.insert_for_user_id);
    
    var data = {
        year:               logDetails.insert_year,
        group_name:         logDetails.insert_group_name,
        notes:              logDetails.insert_notes,
        paid_by_username:   logDetails.insert_paid_by_username,
        bill_id:            logDetails.insert_bill_id,
        date:               logDetails.insert_date,
        paid_amount:        parseInt(logDetails.insert_paid_amount),
        lent_amount:        parseInt(logDetails.insert_lent_amount),
        month:              logDetails.insert_month,
        for_user_id:        parseInt(logDetails.insert_for_user_id),
        file:               logDetails.insert_file,
        bill_name:          logDetails.insert_bill_name
    };

    axios.post("http://localhost:3001/insertLog",data)
    .then(function(response) 
    { 
        return response; 
    })
    .then(function(result) { 				//console.log(result);
        that.updateUserlogs();
    })
    .catch(function(error) { console.log('Request Failed:' + error); });

}
//--- end   of log insert

addBill = (billDetails) => {					//console.log(billDetails);
    var that = this;
    var billTime = this.dateTime();

    var noOfGroupMembers = 0;
    var allMemberUsername = {};
    var allMemberID = [];

    var accountDetails = {};
    var account_user_ids = [];
    var account_paid = billDetails.billAmount;


    //vars for the columns of logs
    let logDetails = {};
    logDetails.insert_bill_id          = billTime.time;
    logDetails.insert_for_user_id      = null;
    logDetails.insert_bill_name        = billDetails.billName;
    logDetails.insert_date             = billTime.date;
    logDetails.insert_month            = billTime.month;
    logDetails.insert_group_name       = billDetails.groupName;
    logDetails.insert_paid_by_username = that.getCookie("username");
    logDetails.insert_paid_amount      = billDetails.billAmount;
    logDetails.insert_lent_amount      = 0;
    logDetails.insert_notes            = billDetails.notes;
    logDetails.insert_file             = billDetails.tmpFilepath;
    logDetails.insert_year             = billTime.year;
    //console.log(logDetails);
    //get all the group member username then their corresponding ids
    //fetch usernames
  
    const data = 
    {
        group_name : billDetails.groupName
    }
   
    axios.post("http://localhost:3001/getGroupDetails",data)
    .then(function(response) { return response })
    .then(function(result) {									console.log(result);
        noOfGroupMembers     = result.data[0]["number_of_members"];
        allMemberUsername[1] = result.data[0]["member_username_1"];
        allMemberUsername[2] = result.data[0]["member_username_2"];
        allMemberUsername[3] = result.data[0]["member_username_3"];
        allMemberUsername[4] = result.data[0]["member_username_4"];
        allMemberUsername[5] = result.data[0]["member_username_5"];

        //fetch ids (no need to fetch for current_user)
        //--- start of for loop
        for(let i=1; i<=noOfGroupMembers; i++){
            
            if(allMemberUsername[i] != that.user.userName){				//eliminate current_user
                
                axios.post('http://localhost:3001/getUserByUsername',{userName : allMemberUsername[i]})
                .then(function(response) 
                { return response;
                })
                .then(function(result) {	
                    console.log(result);						
                    logDetails.insert_for_user_id = result.data[0]["id"];
                    logDetails.insert_lent_amount = ( (logDetails.insert_paid_amount) / (noOfGroupMembers) ).toFixed(2);
                    
                    account_user_ids[i] = logDetails.insert_for_user_id;
                    //console.log(logDetails);
                    that.insertLog(logDetails);
                })
                .catch(function(error) {
                    console.log('Request Failed:' + error);
                });
            }
        }
        //--- end of for loop still in results of 1st api-call

        // call for current_user
            logDetails.insert_for_user_id = that.user.userId;
            logDetails.insert_lent_amount = 0;
            that.insertLog(logDetails);

            account_user_ids[0] = parseInt(that.user.userId);
            accountDetails = {'user_id_list':account_user_ids, 'account_paid':account_paid};
        
            //call  for ui update
    })
    .catch(function(error) { console.log('Request Failed:' + error); });
};
//--- end of adding bills
signup = (newUser) => {
    let signUpObj = this;
    console.log(newUser);
    if((newUser.userName==='')||(newUser.userEmail==='')||(newUser.password==='')){
        this.error(3);
    }
    else if((newUser.password).length < 8){
        this.error(5);
    }
    else if(!this.ValidateEmail(newUser.userEmail)){
        this.error(1);
    }
    // even all inputs are in correct format
    else{
        let data = {
            userName: newUser.userName,
            userEmail: newUser.userEmail,
            password: newUser.password
        };
        
        axios.post("http://localhost:3001/signup",data)
        .then(function(response) {
            //console.log(response.json());
            signUpObj.setState({loggedIn:true, userId: response.data.userId});
            return response;
            
            //This.setstate- PALAK
        })
        
        .catch(function(error) {
            console.log('Request Failed:' + error);
        });
    }
};
//-------- end up sign up
acceptInvite = () => {
    let that = this;

    axios.post("http://localhost:3001/acceptInvite",{userName : that.user.userName})
    .then(res =>
        {
            console.log(res);
        })
        .catch(err => console.log(err))
};

login = (authUser) => {  
    let loginObj = this;      
    let data = {
        userName: authUser.userName,
        userEmail: authUser.userEmail,
        password: authUser.password
    };
    axios.post('http://localhost:3001/login',data)
    .then(function(response) {
        return response;
    })
    .then(function(result) {
        //console.log(result);
        if(result.code === "invalid-creds"){
            //that.error(2);
        }
        else{
            console.log(JSON.stringify(result));
            //console.log('authenticated user');
            loginObj.setCookie("username",authUser.userName,1);
            loginObj.setCookie("userLoggedIn",true,1);
            loginObj.setCookie("token",result.data.token,1);
            loginObj.setCookie("userEmail",authUser.userEmail,1);
            loginObj.setCookie("userId",result.data[0].id);
            loginObj.setState({loggedIn: true});
            console.log(result.data[0].id);
            loginObj.updateFriends();
            loginObj.user.userId = result.data[0].id;
            loginObj.updateGroups();
            return loginObj;
        }
    })
    .catch(function(error) {
        console.log('Request Failed:' + error);
    });
    //this.setState({page: 2});   
};
//---- end of  login


    logout(){
        this.setCookie("username","",0);
        this.setCookie("userLoggedIn",false,0);
        this.setCookie("userEmail","",0)
        this.setCookie("token",null,0);
        this.setState({loggedIn: false, signupLogin: 1}); 
        
    };

    error = (val) => {
        this.setState({ errorOpen: true});
        //this.setState({err: val}, function(){console.log("error in app.js - "+this.state.err);});
        this.setState({err: val});
    };
    //--------- API CALLS SIGNUP
    handleError1Click = () => {
        this.setState({errorOpen: false});
    };
    handleError2Click = () => {
        this.setState({errorOpen: false});
        alert('Re-type : both username and password manually');
    };
    handleErrorRequestClose = () => {
        this.setState({errorOpen: false});
    };
//----------   end of logout
    setCookie = (name, value, expDays) => {
	    let d = new Date();
	    d.setTime(d.getTime() + (expDays * 24 * 60 * 60 * 1000));
	    let expires = "expires="+d.toUTCString();
	    document.cookie = name + "=" + value + ";" + expires + ";path=/";
	};

	getCookie = (name) => {
	    let cookieArr = document.cookie.split(';');
	    for(let i = 0; i < cookieArr.length; i++) {
            let c = cookieArr[i].split('=');
            if(c[0].trim() === name)
            {
	            return c[1];
	        }
	    }
	    return "";
	};
//------------ end of   cookie  handling
    render(){
        return(
            <div className="App">
                <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <SplitWise  page={this.state.page}
                        signupLogin={this.state.signupLogin}
                        signupPage={this.signupPage.bind(this)}     loginPage={this.loginPage.bind(this)}
                        signup={this.signup}                        login={this.login.bind(this)}               
                        loggedIn={this.state.loggedIn}              username={this.user.userName}
                        logout={this.logout.bind(this)}             setAvatar={this.setAvatar}
                        account={this.account}                      users={this.state.users}
                        friends={this.state.friends}                groups={this.state.groups}
                        log={this.state.log}                              
                        addBill={this.addBill.bind(this)}
                        addGroup={this.addGroup.bind(this)}         addFriends={this.addFriends.bind(this)}
                    />
                <div className="error-display">
                    {(this.state.err===1)
                        ?
                            <Snackbar
                                open={this.state.errorOpen}
                                message="Please enter email in correct format"
                                action="Try Again"
                                autoHideDuration={5000}
                                onActionClick={this.handleError1Click.bind(this)}
                                onRequestClose={this.handleErrorRequestClose.bind(this)}
                                
                            />
                        :   <span></span>
                        }
                        {(this.state.err===2)
                        ?
                            <Snackbar
                                open={this.state.errorOpen}
                                message="Whoops! We couldn’t find an account for that username/password."
                                action="Re-type"
                                autoHideDuration={5000}
                                onActionClick={this.handleError2Click.bind(this)}
                                onRequestClose={this.handleErrorRequestClose.bind(this)}
                            />
                        :   <span></span>
                        }
                        {(this.state.err===3)
                        ?
                            <Snackbar
                                open={this.state.errorOpen}
                                message="All fields are required"
                                action="Try Again"
                                autoHideDuration={5000}
                                onActionClick={this.handleError1Click.bind(this)}
                                onRequestClose={this.handleErrorRequestClose.bind(this)}
                            />
                        :   <span></span>
                        }
                        {(this.state.err===4)
                        ?
                            <Snackbar
                                open={this.state.errorOpen}
                                message="You cannot form group without adding friends"
                                action="Re-select"
                                autoHideDuration={5000}
                                onActionClick={this.handleError1Click.bind(this)}
                                onRequestClose={this.handleErrorRequestClose.bind(this)}
                            />
                        :   <span></span>
                        }
                        {(this.state.err===5)
                        ?
                            <Snackbar
                                open={this.state.errorOpen}
                                message="Password must be at lest 9 characters long"
                                action="ok"
                                autoHideDuration={5000}
                                onActionClick={this.handleError1Click.bind(this)}
                                onRequestClose={this.handleErrorRequestClose.bind(this)}
                            />
                        :   <span></span>
                        }
                        {(this.state.err===6)
                        ?
                            <Snackbar
                                open={this.state.errorOpen}
                                message="Currently you can have atmost 10 friends"
                                action="ok"
                                autoHideDuration={5000}
                                onActionClick={this.handleError1Click.bind(this)}
                                onRequestClose={this.handleErrorRequestClose.bind(this)}
                            />
                        :   <span></span>
                        }
                        {(this.state.err===7)
                        ?
                            <Snackbar
                                open={this.state.errorOpen}
                                message="You can have atmost 5 members (including you)"
                                action="ok"
                                autoHideDuration={5000}
                                onActionClick={this.handleError1Click.bind(this)}
                                onRequestClose={this.handleErrorRequestClose.bind(this)}
                            />
                        :   <span></span>
                        }
                        {(this.state.err===1001)
                        ?
                            <Snackbar
                                open={this.state.errorOpen}
                                message="Selected friend(s) added successfully"
                                action="ok"
                                autoHideDuration={5000}
                                onActionClick={this.handleError1Click.bind(this)}
                                onRequestClose={this.handleErrorRequestClose.bind(this)}
                            />
                        :   <span></span>
                        }
                        {(this.state.err===1002)
                        ?
                            <Snackbar
                                open={this.state.errorOpen}
                                message="Group created successfully"
                                action="ok"
                                autoHideDuration={5000}
                                onActionClick={this.handleError1Click.bind(this)}
                                onRequestClose={this.handleErrorRequestClose.bind(this)}
                            />
                        :   <span></span>
                        }
                </div>                    
                </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default Navbar;

