import React from "react";
import withStyles from "material-ui/styles/withStyles";
import appStyle from "../../assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx";
import CommonMessage from "./CommonMessage";
import Const from "../../utils/const";

@withStyles(appStyle)
export default class CommonFrame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        document.addEventListener("EVENT_API_ERR", e => {
            this.notification(e.cause);
        });
    }

    render() {
        const Child = this.props.children;
        return (
            <div>
                {
                    // Object.prototype.toString.apply(this.props.children) === '[object Array]' ? this.props.children.map((Ele, index) => React.cloneElement(<Ele/>, {key: index, alert: this.showSnackbar.bind(this)})) : React.cloneElement(<Child alert={this.showSnackbar.bind(this)}/>, {alert: this.showSnackbar.bind(this)})
                    <Child execCmd={this.execCmd.bind(this)} alert={this.alert.bind(this)} notification={this.notification.bind(this)}/>
                }
                {
                    <CommonMessage ref="commonMsg"/>
                }
            </div>
        );
    }

    notification(msg, pos) {
        this.execCmd(Const.CMD_MSG, Const.MSG_TYPE_NOTIFICATION, msg, pos);
    }

    alert(msg) {
        this.execCmd(Const.CMD_MSG, Const.MSG_TYPE_ALERT, msg);
    }

    execCmd() {
        if (arguments.length > 0) {
            const cmd = arguments[0];
            const arg1 = arguments[1];
            const arg2 = arguments[2];
            const arg3 = arguments[3];
            switch (cmd) {
                case Const.CMD_MSG:
                    this.showMsg(arg1, arg2, arg3);
                    break;
                default:
                    console.info("not match cmd");
            }
        }
    }

    showMsg(type, msg, pos) {
        const commonMsg = this.refs.commonMsg;
        if (!commonMsg) return;
        switch (type) {
            case Const.MSG_TYPE_NOTIFICATION:
                commonMsg.showSnackbar(msg, pos);
                break;
            case Const.MSG_TYPE_ALERT:
                commonMsg.showSnackbar(msg, pos);
                break;
            default:
                console.info("no match show msg type");
        }
    }
}
