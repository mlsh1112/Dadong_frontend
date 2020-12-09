import React from "react";
import ReactDOM from "react-dom";
import {HashRouter} from 'react-router-dom';
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import './index.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
    typography: {
        fontFamily: 'MapoGoldenPier',
    },
});
ReactDOM.render(
    <HashRouter >
        <MuiThemeProvider theme={theme}>
        <Header/>
        <Body/>
        <Footer/>
        </MuiThemeProvider>

    </HashRouter>,
    document.querySelector("#container")
);
