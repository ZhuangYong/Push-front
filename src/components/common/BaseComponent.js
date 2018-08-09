import React from "react";
import PropTypes from "prop-types";
import Const from "../../utils/const";
import NavUtils from "../../utils/navUtils";
import Path from "../../utils/path";
import _ from "lodash";

export default class BaseComponent extends React.Component {

    constructor(props) {
        super(props);
        this.title = this.title.bind(this);
        this.stateFun = state => {
            this.setState(state);
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

    linkTo(url, param) {
        if (param) {
            let paramStr = "";
            Object.keys(param).forEach(key => paramStr += "&" + key + "=" + param[key]);
            if (url.indexOf("?") >= 0) {
                url += paramStr;
            } else {
                url += "?" + paramStr.substr(1);
            }
        }
        NavUtils.linkTo(url);
    }

    back() {
        NavUtils.back();
    }
    replace(path, state) {
        NavUtils.replace(path, state);
    }

    alert(msg) {
        this.props.alert(msg);
    }

    notification(msg, pos) {
        this.props.notification(msg, pos);
    }

    initialState(data, key) {
        if (data && _.isEmpty(this[key])) {
            Object.keys(data).forEach(key => this.state[key] = data[key]);
            this.setState(this.state);
            this[key] = data;
        }
    }

}
BaseComponent.propTypes = {
    execCmd: PropTypes.func,
    alert: PropTypes.func,
    notification: PropTypes.func,
};
BaseComponent.defaultProps = {
    execCmd: () => console.log("not set execCmd function"),
    alert: () => console.log("not set alert function"),
    notification: () => console.log("not set notification function"),
};
