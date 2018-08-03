import React from "react";
import PropTypes from "prop-types";
import Const from "../../utils/const";
import NavUtils from "../../utils/navUtils";
import Path from "../../utils/path";

export default class BaseComponent extends React.Component {

    constructor(props) {
        super(props);
        this.title = this.title.bind(this);
        this.formData = {

        };
    }

    componentDidMount() {
    }
    render() {
        return (
            <div/>
        );
    }

    title(title) {
        document.title = title;
    }

    linkTo(url) {
        NavUtils.linkTo(url);
    }

    alert(msg) {
        this.props.alert(msg);
    }

    notification(msg) {
        this.props.notification(msg);
    }

}
BaseComponent.propTypes = {
    execCmd: PropTypes.func,
    alert: PropTypes.func,
    notification: PropTypes.func,
};
BaseComponent.defaultProps = {
    execCmd: () => console.log("not set execCmd function"),
    alert: () => console.log("not set execCmd function"),
    notification: () => console.log("not set execCmd function"),
};
