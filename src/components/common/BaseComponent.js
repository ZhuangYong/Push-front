import React from "react";
import PropTypes from "prop-types";
import Const from "../../utils/const";
import NavUtils from "../../utils/navUtils";
import Path from "../../utils/path";
import Slide from '@material-ui/core/Slide';
import _ from "lodash";
import {dispatchCustomEvent} from "../../utils/comUtils";

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

    alert(msg, title, onSure, onClose) {
        // this.props.alert(msg, title, onSure, onClose);
        const type = "alert";
        dispatchCustomEvent('EVENT_MSG', {type, msg, title, onSure, onClose});
    }

    notification(msg, pos) {
        // this.props.notification(msg, pos);
        const type = "notification";
        dispatchCustomEvent('EVENT_MSG', {type, msg, pos});
    }

    /**
     * 显示全屏弹出页面
     * @param msg 标题
     * @param fullPageToolButtons 顶端buttons
     * @param fullPageContent 页面内容
     */
    showFullPage(msg, fullPageToolButtons, fullPageContent) {
        // this.props.showFullPage(fullPageTitle, fullPageToolButtons, fullPageContent);
        const type = "showFullPage";
        dispatchCustomEvent('EVENT_MSG', {type, msg, fullPageToolButtons, fullPageContent});
    }

    closeFullPage() {
        // this.props.closeFullPage();
        const type = "closeFullPage";
        dispatchCustomEvent('EVENT_MSG', {type});
    }

    initialState(data, key) {
        if (data && _.isEmpty(this[key])) {
            Object.keys(data).forEach(key => this.state[key] = data[key]);
            this.setState(this.state);
            this[key] = data;
        }
    }

    TransitionUp = (props) => {
        return <Slide direction="up" {...props} />;
    };

}
BaseComponent.propTypes = {
    execCmd: PropTypes.func,
    alert: PropTypes.func,
    notification: PropTypes.func,
    showFullPage: PropTypes.func,
};
BaseComponent.defaultProps = {
    execCmd: () => console.log("not set execCmd function"),
    alert: () => console.log("not set alert function"),
    notification: () => console.log("not set notification function"),
    showFullPage: () => console.log("not set showFullPage function"),
};
