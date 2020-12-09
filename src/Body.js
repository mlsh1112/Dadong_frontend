import React, {Component} from 'react';
import {  NavLink } from "react-router-dom";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './pages/css/Body.css'
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import SeoulDetail from "./pages/Seoul/SeoulDetail";
import SeoulForm from "./pages/Seoul/SeoulForm";
import SeoulWriteForm from "./pages/Seoul/SeoulWriteForm";
import IncheonForm from "./pages/Incheon/IncheonForm";
import IncheonDetail from "./pages/Incheon/IncheonDetail";
import IncheonWriteForm from "./pages/Incheon/IncheonWriteForm";
import CCForm from "./pages/CC/CCForm";
import CCDetail from "./pages/CC/CCDetail";
import CCWriteForm from "./pages/CC/CCWriteForm";
import GGForm from "./pages/GG/GGForm";
import GGDetail from "./pages/GG/GGDetail";
import GGWriteForm from "./pages/GG/GGWriteForm";
import GSForm from "./pages/GS/GSForm";
import GSDetail from "./pages/GS/GSDetail";
import GSWriteForm from "./pages/GS/GSWriteForm";
import GWForm from "./pages/GW/GWForm";
import GWDetail from "./pages/GW/GWDetail";
import GWWriteForm from "./pages/GW/GWWriteForm";
import JJForm from "./pages/JJ/JJForm";
import JJDetail from "./pages/JJ/JJDetail";
import JJWriteForm from "./pages/JJ/JJWriteForm";
import JLForm from "./pages/JL/JLForm";
import JLDetail from "./pages/JL/JLDetail";
import JLWriteForm from "./pages/JL/JLWriteForm";
import homeimg from "./img/home.png";
import userimg from "./img/user.png";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Body extends Component {
    state = {
        isLogin: 0
    };
    componentDidMount() {
        if ($.cookie("login_id")) {
            this.setState({
                isLogin: 1
            });
        } else {
            this.setState({
                isLogin: 0
            });
        }
    }


    logout = () => {
        axios
            .get("http://localhost:8080/member/logout", {
                headers
            })
            .then(returnData => {
                if (returnData.data.message) {
                    $.removeCookie("login_id");
                    alert("로그아웃 되었습니다!");
                    window.location.href = "/";
                }
            });
    };
    render() {

        const buttonStyle={
            background: '#CABAA3',
            fontFamily: 'MapoGoldenPier',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: 20,
        }
        const YesLogin = () => (
            <div>
                <NavLink to='/' >
                    <img src={homeimg} style={{paddingRight:'10px', paddingTop:'5px'}} width={"25px"}/>
                </NavLink>
                <button onClick={this.logout} style={buttonStyle} variant="primary" >
                    로그아웃
                </button>
            </div>

        )

        const NoLogin = () => (
            <div >
               <NavLink to='/' >
                    <img src={homeimg} style={{paddingRight:'10px', paddingTop:'5px'}} width={"25px"}/>
              </NavLink>
                   <NavLink to="/LoginPage" className='login'>
                      <button style={buttonStyle} variant="primary">
                          로그인
                      </button>
                   </NavLink>
            </div>
        )
        return (
            <Router>

                <ul className="navibar" >
                    { this.state.isLogin ? <YesLogin /> : <NoLogin/> }
                </ul>

                <main>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path='/RegisterPage' component={RegisterPage}/>
                        <Route path='/LoginPage' component={LoginPage}/>
                        <Route path='/SeoulDetail' component={SeoulDetail}/>
                        <Route path='/SeoulForm' component={SeoulForm}/>
                        <Route path='/SeoulWrite' component={SeoulWriteForm}/>
                        <Route path='/IncheonDetail' component={IncheonDetail}/>
                        <Route path='/IncheonWrite' component={IncheonWriteForm}/>
                        <Route path='/IncheonForm' component={IncheonForm}/>
                        <Route path='/CCForm' component={CCForm}/>
                        <Route path='/CCDetail' component={CCDetail}/>
                        <Route path='/CCWrite' component={CCWriteForm}/>
                        <Route path='/GGForm' component={GGForm}/>
                        <Route path='/GGDetail' component={GGDetail}/>
                        <Route path='/GGWrite' component={GGWriteForm}/>
                        <Route path='/GSForm' component={GSForm}/>
                        <Route path='/GSDetail' component={GSDetail}/>
                        <Route path='/GSWrite' component={GSWriteForm}/>
                        <Route path='/GWForm' component={GWForm}/>
                        <Route path='/GWDetail' component={GWDetail}/>
                        <Route path='/GWWrite' component={GWWriteForm}/>
                        <Route path='/JJForm' component={JJForm}/>
                        <Route path='/JJDetail' component={JJDetail}/>
                        <Route path='/JJWrite' component={JJWriteForm}/>
                        <Route path='/JLForm' component={JLForm}/>
                        <Route path='/JLDetail' component={JLDetail}/>
                        <Route path='/JLWrite' component={JLWriteForm}/>
                    </Switch>
                </main>
            </Router>

        );
    }
}

export default Body;