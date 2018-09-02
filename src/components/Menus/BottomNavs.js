import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BaseComponent from "../common/BaseComponent";
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
        };
    }

    render() {
        const {classes} = this.props;
        const {value} = this.state;
        const items = this.getItems();
        if (!this.inPath()) {
            return "";
        }
        return (
            <BottomNavigation
                value={value}
                onChange={this.handleChange}
                showLabels
                className={classes.root}>
                {
                    items
                }
            </BottomNavigation>
        );
    }

    inPath = () => {
        const {items} = this.props;
        return (items || []).find(item => (item.paths || []).indexOf(this.props.history.location.pathname) >= 0);
    };

    getItems = () => {
        const {items, activeColor, defaultColor} = this.props;
        return items.map((item, index) => {
            const color = (item.paths || []).indexOf(this.props.history.location.pathname) >= 0 ? activeColor : defaultColor;
            return <BottomNavigationAction
                key={index}
                label={item.label}
                icon={<item.icon.type size={item.iconSize ? item.iconSize : '1.6rem'} color={color}/>}
                style={{color: color, minWidth: 0}}/>;
        });
    };

    handleChange = (event, value) => {
        const {items} = this.props;
        this.setState({ value });
        this.linkTo((items[value].paths || [])[0]);
    };
}

BottomNavs.propTypes = {
    items: PropTypes.array,
    activeColor: PropTypes.string,
    classes: PropTypes.object.isRequired,
};

BottomNavs.defaultProps = {
    classes: {},
    activeColor: "#e91e63",
    defaultColor: "rgba(0, 0, 0, 0.54)",
    items: []
};
