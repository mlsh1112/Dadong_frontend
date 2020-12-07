import React, { Component } from "react";
import {  NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import { Form, Button } from "react-bootstrap";
import { } from "jquery.cookie";
import img1 from '../img/person.png';
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };


class LoginPage extends Component {
    login = () => {
        const loginEmail = this.loginEmail.value;
        const loginPw = this.loginPw.value;

        if (loginEmail === "" || loginEmail === undefined) {
            alert("이메일 주소를 입력해주세요.");
            this.loginEmail.focus();
            return;
        } else if (loginPw === "" || loginPw === undefined) {
            alert("비밀번호를 입력해주세요.");
            this.loginPw.focus();
            return;
        }

        const send_param = {
            headers,
            email: this.loginEmail.value,
            password: this.loginPw.value
        };
        axios
            .post("http://localhost:8080/member/login", send_param)
            //정상 수행
            .then(returnData => {
                if (returnData.data.message) {
                    // console.log("login_id:" + returnData.data._id);
                    $.cookie("login_id", returnData.data._id, { expires: 1 });
                    $.cookie("login_email", returnData.data.email, { expires: 1 });
                    alert(returnData.data.message);
                    if ($.cookie("login_id"))
                        window.location.href = "/";
                    else
                        window.location.href = "/LoginPage";
                } else {
                    alert(returnData.data.message);
                }
            })
            //에러
            .catch(err => {
                console.log(err);
            });
    };
    render() {
        const buttonStyle = {
            background: '#CABAA3',
            fontFamily: 'MapoGoldenPier',
            marginTop: 10
        };
        const loginStyle = {
            fontFamily: 'MapoGoldenPier',
            textAlign : 'center'
        };
        return (
            <div style={loginStyle}>
                <p></p>
                <img src={img1} width={"250px"} className="center"/>
                <Form.Group controlId="loginForm">
                <h4>이메일 주소를 입력하세요.&nbsp;&nbsp;
                <Form.Control
                    type="email"
                    maxLength="100"
                    ref={ref => (this.loginEmail = ref)}
                    placeholder="Enter email"
                /></h4>
                <h4>비밀번호를 입력하세요&nbsp;&nbsp;
                <Form.Control
                    type="password"
                    maxLength="20"
                    ref={ref => (this.loginPw = ref)}
                    placeholder="Password"
                /></h4>

                <Button
                    style={buttonStyle}
                    onClick={this.login}
                    variant="primary"
                    type="button"
                    block
                >
                    로그인
                </Button>
            </Form.Group>
                <p style={{textAlign:"center", fontWeight:'bold',color:'black'}}>
                    회원이 아니신가요? ->
                    <NavLink to='/RegisterPage' style={{color:'black',textDecoration:'none'}} >
                        &nbsp;&nbsp;<button style={buttonStyle}>회원가입 하기!</button></NavLink>
                </p>

            </div>
        );
    }
}

export default LoginPage;