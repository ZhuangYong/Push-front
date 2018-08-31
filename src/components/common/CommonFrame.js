import React from "react";
import withStyles from "material-ui/styles/withStyles";
import appStyle from "../../assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx";
import CommonMessage from "./CommonMessage";
import Const from "../../utils/const";
import {dispatchCustomEvent} from "../../utils/comUtils";

@withStyles(appStyle)
export default class CommonFrame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    // componentDidMount() {
    //     document.addEventListener(Const.EVENT_API_ERR, e => {
    //         this.notification(e.cause === "Network Error" ? "网络错误，请稍后重试！" : e.cause);
    //     });
    //     document.addEventListener(Const.EVENT_MSG, e => {
    //         const {type, msg, ...arg} = e.cause;
    //         this.showMsg(type, msg, arg);
    //     });
    // }

    render() {
        const Child = this.props.children;
        return (
            <div>
                {
                    // Object.prototype.toString.apply(this.props.children) === '[object Array]' ? this.props.children.map((Ele, index) => React.cloneElement(<Ele/>, {key: index, alert: this.showSnackbar.bind(this)})) : React.cloneElement(<Child alert={this.showSnackbar.bind(this)}/>, {alert: this.showSnackbar.bind(this)})
                    <Child
                        // execCmd={this.execCmd.bind(this)}
                        // alert={this.alert.bind(this)}
                        // notification={this.notification.bind(this)}
                        // showFullPage={this.showFullPage.bind(this)}
                        // closeFullPage={this.closeFullPage}
                    />
                }
                {
                    <CommonMessage ref="commonMsg"/>
                }
            </div>
        );
    }
    //
    // notification(msg, pos) {
    //     this.execCmd(Const.CMD_MSG, Const.MSG_TYPE_NOTIFICATION, msg, {pos});
    // }
    //
    // alert(msg, title, onSure, onClose, onCancel) {
    //     this.execCmd(Const.CMD_MSG, Const.MSG_TYPE_ALERT, msg, {title, onSure, onClose, onCancel});
    // }
    //
    // showFullPage(fullPageTitle, fullPageToolButtons, fullPageContent) {
    //     this.execCmd(Const.CMD_MSG, Const.MSG_TYPE_OPEN_FULL_PAGE, fullPageTitle, {fullPageToolButtons, fullPageContent});
    // }
    //
    // execCmd() {
    //     if (arguments.length > 0) {
    //         const cmd = arguments[0];
    //         const arg1 = arguments[1];
    //         const arg2 = arguments[2];
    //         const arg3 = arguments[3];
    //         switch (cmd) {
    //             case Const.CMD_MSG:
    //                 this.showMsg(arg1, arg2, arg3);
    //                 break;
    //             default:
    //                 console.info("not match cmd");
    //         }
    //     }
    // }
    //
    // showMsg(type, msg, arg) {
    //     const commonMsg = this.refs.commonMsg;
    //     if (!commonMsg) return;
    //     switch (type) {
    //         case Const.MSG_TYPE_NOTIFICATION:
    //             {
    //                 const {pos} = arg || {};
    //                 commonMsg.showSnackBar(msg, pos);
    //             }
    //             break;
    //         case Const.MSG_TYPE_ALERT:
    //             {
    //                 const {title, onSure, onClose, onCancel} = arg || {};
    //                 commonMsg.showDialog(msg, title, onSure, onClose, onCancel);
    //             }
    //             break;
    //         case Const.MSG_TYPE_OPEN_FULL_PAGE:
    //             {
    //                 const {fullPageToolButtons, fullPageContent} = arg || {};
    //                 commonMsg.showFullPage(msg, fullPageToolButtons, fullPageContent);
    //             }
    //             break;
    //         default:
    //             console.info("no match show msg type");
    //     }
    // }
    //
    // closeFullPage = () => {
    //     this.refs.commonMsg.closeFullPage();
    // };
}
