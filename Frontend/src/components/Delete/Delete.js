import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Delete extends Component{
    constructor()
    {
        super()

        this.state = {
            BookID : "",
            resultStr:null,
            Redirect:null
        }
        
        this.submitDelete           = this.submitDelete.bind(this);
        this.bookIDChangeHandler    = this.bookIDChangeHandler.bind(this);
    }

    bookIDChangeHandler = (e) => {
        this.setState({
            BookID : e.target.value
        })
    }
    
    submitDelete = (e) => {

        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            BookID : this.state.BookID
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/delete',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        BookID:"",
                        Redirect: <Redirect to ="/home"/>
                    });
                }else{
                    this.setState({
                        resultStr:<p>an error occured</p>
                        
                    })
                }
            })
            .catch(()=>{
                this.setState({
                    resultStr:<p>an error occured</p>
                })
            });
        }
    render(){
         //if not logged in go to login page
         let redirectVar = null;
         if(!cookie.load('cookie')){
             redirectVar = <Redirect to= "/login"/>
         }
         return(
             <div>
                 {redirectVar}
                 {this.state.Redirect}
                 {this.state.resultStr}
            <div class="container">
                <form>
                    <div style={{width: "50%",float: "left"}} class="form-group">
                        <input  onChange = {this.bookIDChangeHandler} type="text" class="form-control" name="BookID" placeholder="Search a Book by Book ID" required/>
                    </div>
                    <div style={{width: "50%", float: "right"}}>
                            <button onClick ={this.submitDelete} class="btn btn-success" type="submit">Delete</button>
                    </div> 
                </form>
            </div>
            </div>
        )
    }
}

export default Delete;