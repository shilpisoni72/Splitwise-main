import React, {Component} from 'react';
import Styles from '../../Styles.js';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';

class AddFriendDialog extends Component{
	constructor(props){
		super(props);
		const users = [];
		
		this.state={users:users, modalOpen:this.props.click, selectedUsers:[]};
		//this.props.click
		this.newFriends=[];
	};
	componentWillMount(){
		const users = [];
		var uKeys = Object.keys(this.props.users);
		var uLen  = uKeys.length;
		for (let i=0; i<uLen; i++){
  			users.push(
  				<Checkbox	key={i+2500}	label={this.props.users[uKeys[i]]}	labelPosition="left"
          					onCheck={this.updateCheck.bind(this)}		value={this.props.users[uKeys[i]]}/>
          	);
		}
		this.setState({users:users});
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.click===2){
			this.setState({modalOpen: true});
		}
		//console.log(nextProps);
		const users = [];
		
		var uKeys = Object.keys(this.props.users);
		var uLen  = uKeys.length;
		for (let i=0; i<uLen; i++){
  			users.push(
  				<Checkbox	key={i+2500}	label={this.props.users[uKeys[i]]}	labelPosition="left"
          					onCheck={this.updateCheck.bind(this)}		value={this.props.users[uKeys[i]]}/>
          	);
		}
		this.setState({users:users});
	};
	componentDidMount(){
		this.componentWillMount();
	}
	
	updateCheck = (event, index, value) => {
		if(event.target.checked){
			this.state.selectedUsers.push(event.target.value);
		}
		else if(!event.target.checked){
			this.state.selectedUsers.splice(this.state.selectedUsers.indexOf(event.target.value), 1);
		}
  	}
	handleClose = () => {
    	this.setState({modalOpen: false});
  	};
	addDone = () => {
		this.newFriends = this.state.selectedUsers;
    	this.setState({modalOpen: false});
		console.log(this.newFriends)
		this.props.addFriends(this.newFriends);
    	this.state.selectedUsers=[];
  	};

	render(){
		const actions = [	<FlatButton	label="Cancel"	onClick={this.handleClose} 	
							labelStyle={Styles.dasboardFlatLabel} 				style={Styles.flatModalCancel}
							backgroundColor='#ff4e00' 	hoverColor='#ff9d00' 	rippleColor='#efefef' />,
      						<FlatButton	label="Done"	onClick={this.addDone.bind(this)}	
      						labelStyle={Styles.dasboardFlatLabel}				style={Styles.flatModalDone}
		                    backgroundColor='#08ce00' 	hoverColor='#64dd17' 	rippleColor='#efefef' labelStyle={Styles.dasboardFlatLabel}				style={Styles.flatModalDone}
		                    backgroundColor='#08ce00' 	hoverColor='#64dd17' 	rippleColor='#efefef' />
      					];
		return(
			<Dialog		title="Add new friends"	modal={true}	autoScrollBodyContent={true}  
						actions={actions}					open={this.state.modalOpen}
						titleStyle={Styles.addBillTitle} 	bodyStyle={Styles.addOtherBody}
						contentStyle={Styles.addBillContent}>
				<div>
						<span>Select users to add them as friends</span>
						<Divider style={Styles.modalDivider} />
						<div>{this.state.users}</div>
				</div>
			</Dialog>
		);
	}
}

export default AddFriendDialog;