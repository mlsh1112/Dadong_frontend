import React, {Component} from 'react';
import {BrowserRouter as Router, NavLink} from "react-router-dom";
import './css/Body.css';
import korea from '../img/korea.png';

class Home extends Component {
    render() {
        return (
            <div>

                <div style={{ backgroundColor : '#F0EAE3',paddingLeft:'80px', fontFamily:'MapoGoldenPier', color: '#3A1900',padding:'0'}}>
                    <h3 style={{fontSize:'23px'}}>
                        &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;원하는 여행지를 고르세요!</h3>
                    <br/>
                    <div style={{float:'right'}}>
                    <img src={korea}  width={"400px"} className="center"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <div style={{paddingLeft:'80px'}}>
                    <ul className="location">
                        <p style={{padding:'8px'}}>
                            &nbsp; &nbsp;
                            <NavLink to='/SeoulForm' className="loc">&nbsp; &nbsp;  서울&nbsp; &nbsp;&nbsp;</NavLink>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <NavLink to='/IncheonForm' className="loc">&nbsp; &nbsp;  인천&nbsp; &nbsp;&nbsp;</NavLink>
                        </p>
                        <br/>
                        <p style={{padding:'8px'}}>
                            &nbsp; &nbsp;
                            <NavLink to='/CCForm' className="loc">&nbsp;&nbsp;  충청도&nbsp;&nbsp;</NavLink>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <NavLink to='/GGForm' className="loc">&nbsp;&nbsp;  경기도 &nbsp;&nbsp;</NavLink>
                        </p>
                        <br/>
                        <p style={{padding:'8px'}}>
                            &nbsp; &nbsp;
                            <NavLink to='/GSForm' className="loc">&nbsp;&nbsp;  경상도&nbsp;&nbsp;</NavLink>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <NavLink to='/JLForm' className="loc">&nbsp;&nbsp;  전라도 &nbsp;&nbsp;</NavLink>
                        </p>
                        <br/>
                        <p style={{padding:'8px'}}>
                            &nbsp; &nbsp;
                            <NavLink to='/JJForm' className="loc">&nbsp;&nbsp;  제주도&nbsp;&nbsp;</NavLink>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <NavLink to='/GWForm' className="loc">&nbsp;&nbsp;  강원도 &nbsp;&nbsp;</NavLink>
                        </p>
                    </ul>
                    </div>
                </div>

            </div>
        );
    }
}

export default Home;