import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
import '../css/Detail.css'
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class SeoulRow extends Component {

    render() {
        return (
            <tr>
                <td>
                    <NavLink
                        to={{ pathname: "/SeoulDetail", query: { _id: this.props._id } }}
                    >
                        {this.props.createdAt.substring(0, 10)}
                    </NavLink>
                </td>
                <td>
                    <NavLink
                        to={{ pathname: "/SeoulDetail", query: { _id: this.props._id } }}
                    >
                        {this.props.loc}
                    </NavLink>
                </td>
                <td>
                    <NavLink
                        to={{ pathname: "/SeoulDetail", query: { _id: this.props._id } }}
                    >
                        {this.props.title}
                    </NavLink>
                </td>
            </tr>
        );
    }
}

class SeoulForm extends Component {
    state = {
        seoulList: [],
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
        this.getSeoulList();
    };


    getSeoulList = () => {
        const send_param = {
            headers,
            _id: $.cookie("login_id")
        };
        axios
            .post("http://localhost:8080/seoul/getSeoulList", send_param)
            .then(returnData => {
                let seoulList;
                console.log(returnData.data.list.length);
                if (returnData.data.list.length > 0) {
                     //console.log(returnData.data.list.length);
                    const seouls = returnData.data.list;
                    seoulList = seouls.map(item => (
                        <SeoulRow
                            key={Date.now() + Math.random() * 500}
                            _id={item._id}
                            createdAt={item.createdAt}
                            title={item.title}
                            loc={item.loc}
                        ></SeoulRow>
                    ));
                    // console.log(seoulList);
                    this.setState({
                        seoulList: seoulList
                    });
                } else {
                    seoulList = (
                        <tr>
                            <td colSpan="2">????????? ???????????? ???????????? ????????????.</td>
                        </tr>
                    );
                    this.setState({
                        seoulList: seoulList
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
            <NavLink to="/SeoulWrite">
                <button style={buttonStyle} variant="primary">
                    ?????? ????????? ???????????????
                </button>
            </NavLink>
            </div>
        )
        const NoLogin =()=>(
            <div style={{ backgroundColor : '#F0EAE3', fontFamily:'MapoGoldenPier', color: '#3A1900',padding:'0'}}>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;??? ????????? ????????? ??? ???????????????.
            </div>
        )

        return (
            <div >
                <div style={{ backgroundColor : '#F0EAE3', fontFamily:'MapoGoldenPier', color: '#3A1900',padding:'0'}}>
                    <h3 style={{fontSize:'23px'}}>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;????????? ?????? ?????????.</h3>

                </div>

                <div style={divStyle}>
                <Table striped bordered hover>
                <thead style={{fontSize:'20px', backgroundColor : '#F0EAE3', fontFamily:'MapoGoldenPier', color: '#3A1900',padding:'0'}}>
                <tr>
                    <th style={{width:'20%'}}>??????</th>
                    <th style={{width:'20%'}}>??????</th>
                    <th>??????</th>
                </tr>
                </thead>
                <tbody>{this.state.seoulList}</tbody>
            </Table>

                </div>
                { this.state.isLogin ? <BtnWrite /> : <NoLogin /> }


        </div>
        );
    }
}

export default SeoulForm;