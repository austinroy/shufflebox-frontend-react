import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false,
            isInvalidToken: false
        };
        
    }

    componentWillMount() {
        this.checkToken();
    }

    getTokenFromURL = () => {
        const {search} = window.location;
        const splitSearch = search.split("?token=");
        if (splitSearch.length < 2 || !splitSearch[1]){
            return "";
        }

        return splitSearch[1];
    }

    checkToken = () => {
        const token = this.getTokenFromURL();
        try{
            const {UserInfo} = jwt_decode(token);
            
            if (UserInfo.email.match("@andela.com")){
                localStorage.setItem("token", token);
                this.setState(state => ({isLoggedIn: true}));
            } else {
                this.setState(state => ({isInvalidToken: true}));
            }
        } catch (exception){
            this.setState(state => ({isInvalidToken: true}));
        }
       
    }

    

    render = () => {
        if (this.state.isLoggedIn){
            return <Redirect to="/shuffle/brownbag" />;
        }

        if (this.state.isInvalidToken){
            return <Redirect to="/" />;
        }
        // return <div>Invalid login</div>
    }
}

export default Login;