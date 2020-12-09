import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
import '../css/Detail.css'
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class GWRow extends Component {

    render() {
        return (
            <tr>
                <td>
                    <NavLink
                        to={{ pathname: "/GWDetail", query: { _id: this.props._id } }}
                    >
                        {this.props.createdAt.substring(0, 10)}
                    </NavLink>
                </td>
                <td>
                    <NavLink
                        to={{ pathname: "/GWDetail", query: { _id: this.props._id } }}
                    >
                        {this.props.loc}
                    </NavLink>
                </td>
                <td>
                    <NavLink
                        to={{ pathname: "/GWDetail", query: { _id: this.props._id } }}
                    >
                        {this.props.title}
                    </NavLink>
                </td>
            </tr>
        );
    }
}

class GWForm extends Component {
    state = {
        gwList: [],
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
        this.getGWList();
    };


    getGWList = () => {
        const send_param = {
            headers,
            _id: $.cookie("login_id")
        };
        axios
            .post("http://localhost:8080/gw/getGWList", send_param)
            .then(returnData => {
                let gwList;
                console.log(returnData.data.list.length);
                if (returnData.data.list.length > 0) {
                    //console.log(returnData.data.list.length);
                    const gws = returnData.data.list;
                    gwList = gws.map(item => (
                        <GWRow
                            key={Date.now() + Math.random() * 500}
                            _id={item._id}
                            createdAt={item.createdAt}
                            title={item.title}
                            loc={item.loc}
                        ></GWRow>
                    ));
                    // console.log(gwList);
                    this.setState({
                        gwList: gwList
                    });
                } else {
                    gwList = (
                        <tr>
                            <td colSpan="2">작성한 게시글이 존재하지 않습니다.</td>
                        </tr>
                    );
                    this.setState({
                        gwList: gwList
                    });
                    // window.location.reload();
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
    render() {
        const divStyle = {
            margin: 50,
            background:'#CABAA3',
            width: 1300,
            height:450
        };
        const buttonStyle={
            background: '#CABAA3',
            fontFamily: 'MapoGoldenPier',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: 20,
            padding: 15,

        }
        const BtnWrite =()=>(
            <div style={{textAlign:'center'}}>
                <NavLink to="/GWWrite">
                    <button style={buttonStyle} variant="primary">
                        나의 여행지 추가하기♥
                    </button>
                </NavLink>
            </div>
        )
        const NoLogin =()=>(
            <div style={{ backgroundColor : '#F0EAE3', fontFamily:'MapoGoldenPier', color: '#3A1900',padding:'0'}}>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;글 작성은 로그인 후 가능합니다.
            </div>
        )

        return (
            <div >
                <div style={{ backgroundColor : '#F0EAE3', fontFamily:'MapoGoldenPier', color: '#3A1900',padding:'0'}}>
                    <h3 style={{fontSize:'23px'}}>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;여기는 강원도 입니다.</h3>

                </div>

                <div style={divStyle}>
                    <Table striped bordered hover>
                        <thead style={{fontSize:'20px', backgroundColor : '#F0EAE3', fontFamily:'MapoGoldenPier', color: '#3A1900',padding:'0'}}>
                        <tr>
                            <th style={{width:'20%'}}>날짜</th>
                            <th style={{width:'20%'}}>장소</th>
                            <th>제목</th>
                        </tr>
                        </thead>
                        <tbody>{this.state.gwList}</tbody>
                    </Table>

                </div>
                { this.state.isLogin ? <BtnWrite /> : <NoLogin /> }


            </div>
        );
    }
}

export default GWForm;