import React, {Component} from 'react';
import Styles from '../../Styles.js';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';

class Group extends Component{
constructor(props) {
    super(props);
    this.state = {value: this.props.groups[0]};

    
}
  handleChange(event) {
    this.setState(event.value);
  }



  render() {
    return (
          <Select
              value={this.state.value}
              name="filter__statistics"
              options={options}
              onChange={this.handleChange}
              multi={true}
          />
    );
  }
}