import React from "react";
import PropTypes from "prop-types";
import NavUtils from "../../utils/navUtils";
import Slide from '@material-ui/core/Slide';
import _ from "lodash";
import CommonMessage from "./CommonMessage";
import {dispatchCustomEvent, getQueryString, setSession} from "../../utils/comUtils";
import Const from "../../utils/const";

export default class BaseComponent extends React.Component {

    constructor(props) {
        super(props);
        this.title = this.title.bind(this);
        this.stateFun = state => this.setState(state);
        this.initialBase();
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

    alert(msg, title, onSure, onClose, cancel) {
        CommonMessage.alert(msg, title, onSure, onClose, cancel);
    }

    notification(msg, pos) {
        CommonMessage.notification(msg, pos);
    }

    /**
     * 显示全屏弹出页面
     * @param msg 标题
     * @param fullPageToolButtons 顶端buttons
     * @param fullPageContent 页面内容
     */
    showFullPage(msg, fullPageToolButtons, fullPageContent) {
        CommonMessage.showFullPage(msg, fullPageToolButtons, fullPageContent);
    }

    closeFullPage() {
        CommonMessage.closeFullPage();
    }

    openDrawerMenu(menus) {
        CommonMessage.openDrawerMenu(menus);
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

    appLoadingDone = () => {
        dispatchCustomEvent(Const.EVENT.APP_LOADING_DONE);
    };

    initialBase = () => {
        const bindUuid = getQueryString("bindUuid");
        if (bindUuid) {
            setSession("bindUuid", bindUuid);
        }
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
