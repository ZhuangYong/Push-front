import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/LocalAtm';
import DevicesIcon from '@material-ui/icons/Devices';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import BaseComponent from "../common/BaseComponent";
import Path from "../../utils/path";
import {withRouter} from "react-router-dom";

@withStyles({
    root: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        boxShadow: '1px -1px 7px 0px #80808059'
    }
})
@withRouter
export default class BottomNavs extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            v2p: [Path.PATH_INDEX, Path.PATH_DEVICE_GROUP_LIST, Path.PATH_ORDER_INDEX, Path.PATH_USER_INDEX]
        };
        this.initialState = this.initialState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getActiveStyle = this.getActiveStyle.bind(this);
    }

    componentDidMount() {
        this.initialState();
    }

    render() {
        const {classes} = this.props;
        const {value} = this.state;
        return (
            <BottomNavigation
                value={value}
                onChange={this.handleChange}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction label="首页" icon={<HomeIcon/>} style={this.getActiveStyle(0)}/>
                <BottomNavigationAction label="设备" icon={<DevicesIcon/>} style={this.getActiveStyle(1)}/>
                <BottomNavigationAction label="订单" icon={<ShoppingCartIcon/>} style={this.getActiveStyle(2)}/>
                <BottomNavigationAction label="我" icon={<PersonIcon/>} style={this.getActiveStyle(3)}/>
            </BottomNavigation>
        );
    }

    handleChange(event, value) {
        this.setState({ value });
        this.linkTo(this.state.v2p[value]);
    }

    initialState() {
        this.state.v2p.forEach((v, index) => {
            if (v === this.props.history.location.pathname) {
                this.setState({value: index});
            }
        });
    }

    getActiveStyle(index) {
        const {value} = this.state;
        const activeColor = "#e91e63";
        if (value === index) return {color: activeColor};
        return {};
    }
}

BottomNavs.propTypes = {
    classes: PropTypes.object.isRequired,
};

BottomNavs.defaultProps = {
    classes: {}
};
