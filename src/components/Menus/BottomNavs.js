import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// import HomeIcon from '@material-ui/icons/LocalAtm';
import {HomeIcon, PartnerIcon} from "../../components/common/SvgIcons";
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
        borderTop: '1px solid rgba(233, 30, 99, 0.2)',
    }
})
@withRouter
export default class BottomNavs extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            visible: true,
            v2p: [Path.PATH_INDEX, Path.PATH_DEVICE_GROUP_INDEX, Path.PATH_PARTNER_LIST_INDEX, Path.PATH_ORDER_INDEX, Path.PATH_USER_INDEX],
            v2ps: [
                [Path.PATH_INDEX, Path.PATH_USER_INCOME_INFO],
                [Path.PATH_DEVICE_GROUP_INDEX, Path.PATH_DEVICE_INDEX, Path.PATH_DEVICE_PARTNER_INDEX],
                [Path.PATH_PARTNER_LIST_INDEX],
                [Path.PATH_ORDER_INDEX],
                [Path.PATH_USER_INDEX, Path.PATH_USER_EDIT_INFO, Path.PATH_USER_FEEDBACK]
            ]
        };
        this.initialState = this.initialState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getActiveStyle = this.getActiveStyle.bind(this);
    }

    componentDidMount() {
        this.initialState();
    }

    componentDidUpdate() {
        this.initialState();
    }

    render() {
        const {classes} = this.props;
        const {value, v2ps} = this.state;
        if (!v2ps.find(ps => ps.indexOf(this.props.history.location.pathname) >= 0)) {
            return "";
        }
        const nav0 = this.getActiveStyle(0);
        const nav1 = this.getActiveStyle(1);
        const nav2 = this.getActiveStyle(2);
        const nav3 = this.getActiveStyle(3);
        const nav4 = this.getActiveStyle(4);
        return (
            <BottomNavigation
                value={value}
                onChange={this.handleChange}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction label="首页" icon={<HomeIcon size='1.6rem' color={nav0.color}/>} style={nav0}/>
                <BottomNavigationAction label="设备组" icon={<DevicesIcon/>} style={nav1}/>
                <BottomNavigationAction label="合作者" icon={<PartnerIcon size='1.8rem' color={nav2.color}/>} style={nav2}/>
                <BottomNavigationAction label="订单" icon={<ShoppingCartIcon/>} style={nav3}/>
                {/*<BottomNavigationAction label="价格" icon={<PriceIcon size='1.6rem' color={nav3.color}/>} style={nav3}/>*/}
                <BottomNavigationAction label="我" icon={<PersonIcon/>} style={nav4}/>
            </BottomNavigation>
        );
    }

    handleChange(event, value) {
        this.setState({ value });
        this.linkTo(this.state.v2p[value]);
    }

    initialState() {
        const {v2ps, value} = this.state;
        v2ps.forEach((v, index) => {
            if (v.indexOf(this.props.history.location.pathname) >= 0) {
                if (value !== index) {
                    this.setState({value: index});
                }
            }
        });
    }

    getActiveStyle(index) {
        const {value} = this.state;
        const activeColor = "#e91e63";
        if (value === index) return {color: activeColor, minWidth: 0};
        return {color: 'rgba(0, 0, 0, 0.54)', minWidth: 0};
    }
}

BottomNavs.propTypes = {
    classes: PropTypes.object.isRequired,
};

BottomNavs.defaultProps = {
    classes: {}
};
