import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import { Form, Button } from "react-bootstrap";
import { } from "jquery.cookie";
import img1 from '../img/person.png';
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class RegisterPage extends Component {
    join = () => {
        const joinEmail = this.joinEmail.value;
        const joinName = this.joinName.value;
        const joinPw = this.joinPw.value;
        const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        const regExp2 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
        if (joinEmail === "" || joinEmail === undefined) {
            alert("이메일 주소를 입력해주세요.");
            this.joinEmail.focus();
            return;
        } else if (
            joinEmail.match(regExp) === null ||
            joinEmail.match(regExp) === undefined
        ) {
            alert("이메일 형식에 맞게 입력해주세요.");
            this.joinEmail.value = "";
            this.joinEmail.focus();
            return;
        } else if (joinName === "" || joinName === undefined) {
            alert("이름을 입력해주세요.");
            this.joinName.focus();
            return;
        } else if (joinPw === "" || joinPw === undefined) {
            alert("비밀번호를 입력해주세요.");
            this.joinPw.focus();
            return;
        } else if (
            joinPw.match(regExp2) === null ||
            joinPw.match(regExp2) === undefined
        ) {
            alert("비밀번호를 숫자와 문자, 특수문자 포함 8~16자리로 입력해주세요.");
            this.joinPw.value = "";
            this.joinPw.focus();
            return;
        }

        const send_param = {
            headers,
            email: this.joinEmail.value,
            name: this.joinName.value,
            password: this.joinPw.value
        };
        axios
            .post("http://localhost:8080/member/join", send_param)
            //정상 수행
            .then(returnData => {
                if (returnData.data.message) {
                    alert(returnData.data.message);
                    //이메일 중복 체크
                    if (returnData.data.dupYn === "1") {
                        this.joinEmail.value = "";
                        this.joinEmail.focus();
                    } else {
                        this.joinEmail.value = "";
                        this.joinName.value = "";
                        this.joinPw.value = "";
                    }
                    window.location.href = "/LoginPage";
                } else {
                    alert("회원가입 실패");
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
        const registerStyle = {
            fontFamily: 'MapoGoldenPier',
            textAlign : 'center'
        };
        return (
            <div style={registerStyle}>
                <p></p>
                <img src={img1} width={"250px"} className="center"/>
                <Form.Group controlId="joinForm" >
                    <h4>이메일 주소를 입력하세요.&nbsp;&nbsp;
                    <Form.Control
                        type="email"
                        maxLength="100"
                        ref={ref => (this.joinEmail = ref)}
                        placeholder="Enter email"

                    /></h4>
                    <h4>별명을 입력하세요.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Form.Control
                        type="text"
                        maxLength="20"
                        ref={ref => (this.joinName = ref)}
                        placeholder="name"
                    /></h4>
                    <h4>비밀번호를 입력하세요 &nbsp;&nbsp;
                    <Form.Control
                        type="password"
                        maxLength="64"
                        ref={ref => (this.joinPw = ref)}
                        placeholder="Password"
                    /></h4>
                    <Button
                        style={buttonStyle}
                        onClick={this.join}
                        variant="primary"
                        type="button"
                        block
                    >
                        회원가입 하기!
                    </Button>
                </Form.Group>

            </div>
        );
    }
}

export default RegisterPage;