import React, { Component } from "react";
import CKEditor from "ckeditor4-react";
import { Button, Form} from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
import {NavLink} from "react-router-dom";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class SeoulWriteForm extends Component {
    state = {
        data: ""
    };
    seoulLoc;

    componentDidMount() {
        if (this.props.location.query !== undefined) {
            this.seoulTitle.value = this.props.location.query.title;
            this.seoulLoc.value = this.props.location.query.loc;
        }
    }

    componentWillMount(){
        if (this.props.location.query !== undefined) {
            this.setState({
                data: this.props.location.query.content
            });
        }
    }

    writeSeoul = () => {
        let url;
        let send_param;

        const seoulTitle = this.seoulTitle.value;
        const seoulLoc = this.seoulLoc.value;
        const seoulContent = this.state.data;

        if (seoulTitle === undefined || seoulTitle === "") {
            alert("글 제목을 입력 해주세요.");
            return;
        } else if (seoulContent === undefined || seoulContent === "") {
            alert("글 내용을 입력 해주세요.");
        }

        if (this.props.location.query !== undefined) {
            url = "http://localhost:8080/seoul/update";
            send_param = {
                headers,
                "_id" : this.props.location.query._id,
                "title": seoulTitle,
                "content": seoulContent,
                "loc" : seoulLoc
            };
        } else {
            url = "http://localhost:8080/seoul/write";
            send_param = {
                headers,
                "_id" : $.cookie("login_id"),
                "title": seoulTitle,
                "content": seoulContent,
                "loc" : seoulLoc
            };

        }

        axios
            .post(url, send_param)
            //정상 수행
            .then(returnData => {
                if (returnData.data.message) {
                    alert(returnData.data.message);
                    window.location.href = "/";
                } else {
                    alert("글쓰기 실패");
                }
            })
            //에러
            .catch(err => {
                console.log(err);
            });
    };

    onEditorChange = evt => {
        this.setState({
            data: evt.editor.getData()
        });
    };

    render() {
        const divStyle = {
            fontFamily: 'MapoGoldenPier',
            fontSize: 20
        };
        const titleStyle = {
            marginBottom: 5,
            width : 300,
            height:20
        };
        const buttonStyle = {
            background: '#CABAA3',
            fontFamily: 'MapoGoldenPier',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            padding: 10,
        };

        return (
            <div style={divStyle} className="App">
                <h2>&nbsp;&nbsp;글쓰기</h2>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<Form.Control
                    type="text"
                    style={titleStyle}
                    placeholder="글 제목"
                    ref={ref => (this.seoulTitle = ref)}
                />
                </p>
                &nbsp;&nbsp;&nbsp;&nbsp;<Form.Control
                    type="text"
                    style={titleStyle}
                    placeholder="장소"
                    ref={ref => (this.seoulLoc = ref)}
                />
                <CKEditor
                    data={this.state.data}
                    onChange={this.onEditorChange}
                ></CKEditor>
                <Button style={buttonStyle} onClick={this.writeSeoul} block>

                    저장하기
                </Button>
            </div>
        );
    }
}

export default SeoulWriteForm;
