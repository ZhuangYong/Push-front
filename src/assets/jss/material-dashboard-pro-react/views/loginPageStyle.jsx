// ##############################
// // // LoginPage view styles
// #############################

import {container} from "../../../../assets/jss/material-dashboard-pro-react.jsx";

const loginPageStyle = {
    content: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 80px)",
        position: "relative",
        zIndex: "4",
        height: "100vh",
        backgroundColor: "#40939d"
    },
    container,
    customButtonClass: {
        "&,&:focus,&:hover": {
            color: "#FFFFFF",
        },
        marginLeft: "5px",
        marginRight: "5px"
    },
    inputAdornment: {
        marginRight: "18px"
    },
    inputAdornmentIcon: {
        color: "#555"
    },
    cardHidden: {
        opacity: "0",
        transform: "translate3d(0, -60px, 0)"
    }
};

export default loginPageStyle;
