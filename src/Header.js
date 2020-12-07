import React, {Component} from 'react';
import {  NavLink } from "react-router-dom";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './pages/css/Header.css';
import axios from "axios";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };


class Header extends Component {

    render() {
        return (
            <Router>
            <div>
                <div className="top">
                    <h3 >국내 여행지 공유 웹사이트&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                    <NavLink to="/" activeStyle={{  background : '#F0EAE3',  color: '#3A1900',fontFamily:'MapoGoldenPier',textDecoration: 'none', fontSize:'20px' }}>
                        <h1>대동여지도&nbsp;&nbsp;</h1>
                    </NavLink>
                </div>

            </div>
            <main>
                <switch>
                    <Route exact path="/" />
                </switch>

            </main>
            </Router>
        );
    }
}

export default Header;