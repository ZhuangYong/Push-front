import React from "react";
import PropTypes from "prop-types";
import AppBar from '@material-ui/core/AppBar';
import CloseIcon from '@material-ui/icons/Close';
import BaseComponent from "../common/BaseComponent";

const style = {
    appBar: {
        display: "flex",
        flexFlow: "row",
        height: "3rem",
        position: 'static',
        alignItems: "center",
        boxShadow: 'none',
        backgroundColor: "rgb(33, 157, 233)",
        justifyContent: "space-between",
    },
    leftAction: {
        width: '15%',
        display: "flex",
        minWidth: '4rem',
        textAlign: 'left',
        paddingLeft: '.6rem',
    },
    rightAction: {
        width: '15%',
        display: "flex",
        minWidth: '4rem',
        justifyContent: 'center',
        paddingRight: '.6rem',
    },
    barContent: {
        width: '70%',
        minWidth: '4rem',
        textAlign: 'center'
    }
};
export default class AppHeader extends React.Component {
    render() {
        const {title, fullPageToolButtons, onClose} = this.props;
        const {left, right} = fullPageToolButtons;
        return <AppBar style={style.appBar}>
            <div style={style.leftAction}>
                {onClose && <CloseIcon onClick={onClose}/>}{left}
            </div>
            <div style={style.barContent}>
                {title}
            </div>
            <div style={style.rightAction}>
                {right}
            </div>
        </AppBar>;
    }
}
AppHeader.propTypes = {
    onClose: PropTypes.func,
    closeIcon: PropTypes.node,
    title: PropTypes.string,
    fullPageToolButtons: PropTypes.any
};
AppHeader.defaultProps = {
    onClose: f => f,
    closeIcon: <CloseIcon/>,
    title: "",
    fullPageToolButtons: {
        left: "",
        right: ""
    }
};

