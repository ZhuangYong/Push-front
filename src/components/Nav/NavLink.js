import React from "react";
import PropTypes from "prop-types";

export default class NavLink extends React.Component {
    render() {
        const {className, onClick} = this.props;
        return <a href="javascript:;" className={className} onClick={onClick}>
            {
                this.props.children
            }
        </a>;
    }
}

NavLink.propTypes = {
    to: PropTypes.string,
    onClick: PropTypes.func,
    exact: PropTypes.bool,
    strict: PropTypes.bool,
    location: PropTypes.object,
    activeClassName: PropTypes.string,
    className: PropTypes.string,
    activeStyle: PropTypes.object,
    style: PropTypes.object,
};
