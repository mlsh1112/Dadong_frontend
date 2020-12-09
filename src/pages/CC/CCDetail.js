import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };



class CCDetail extends Component {
    state = {
        board: []
    };


    componentDidMount() {
        if (this.props.location.query !== undefined) {
            this.getDetail();
        } else {
            window.location.href = "/";
        }
    }


    getDetail = () => {
        const send_param = {
            headers,
            _id: this.props.location.query._id
        };
        axios
            .post("http://localhost:8080/cc/detail", send_param)
            //정상 수행
            .then(returnData => {
                if (returnData.data.cc[0]) {
                    const cc = (
                        <div >
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th style={{width:'20%', background:'#CABAA3'}}>&nbsp; &nbsp;제목 </th>
                                    <th>{returnData.data.cc[0].title}</th>
                                </tr>
                                </thead>
                                <thead>
                                <tr>
                                    <th style={{width:'20%', background:'#CABAA3'}}>&nbsp; &nbsp;장소 </th>
                                    <th>{returnData.data.cc[0].loc}</th>
                                </tr>
                                </thead>
                                <tbody>

                                <tr>
                                    <td style={{width:'20%', background:'#CABAA3'}}>&nbsp; 게시글 </td>
                                    <td
                                        dangerouslySetInnerHTML={{
                                            __html: returnData.data.cc[0].content
                                        }}
                                    ></td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>

                    );
                    this.setState({
                        cc: cc
                    });
                } else {
                    alert("글 상세 조회 실패");
                }
            })
            //에러
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        const divStyle = {
            margin: 50,
            background:'#CABAA3',
            width: 1300,
            height:500
        };

        return (
            <div >
            <NavLink to='/CCForm' style={{fontSize:'23px', textDecoration:'none', backgroundColor : '#F0EAE3', fontFamily:'MapoGoldenPier', color: '#3A1900',padding:'0'}}>
                &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; ⇦ 목록으로 돌아가기!
            </NavLink>
        <div style={divStyle}>{this.state.cc}</div>
            </div>
    );
    }
}

export default CCDetail;