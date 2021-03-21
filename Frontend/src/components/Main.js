import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import Delete from './Delete/Delete';
import SignUpLogin from './SignUpLogin/SignUpLogin';
import Navbar from '../components/LandingPage/Navbar';

//Create a Main Component
class Main extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar}/>
                <Route path="/login" component={SignUpLogin}/>
                <Route path="/home" component={Home}/>
                <Route path="/delete" component={Delete}/>
                <Route path="/signup" component={SignUpLogin}/>
                
            </div>
        )
    }
}
//Export The Main Component
export default Main;