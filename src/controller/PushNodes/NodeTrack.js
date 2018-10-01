import React from "react";
import withStyles from "material-ui/styles/withStyles";

import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import customStyle from "../../assets/jss/view/custom";
import ListItem from '@material-ui/core/ListItem';
import svgBottom from "../../assets/svg/bottom-tear.svg";
import PullRefreshPage from "../../components/CommonPage/PullrefreshPage";
import {getQueryString, setTitle} from "../../utils/comUtils";
import SearchInput from "../../components/CustomInput/SearchInput";
import ActionCustomItem from "../../components/CustomItem/ActionCustomItem";

const style = {
    ...customStyle,
    infoLine: {
        fontSize: '.86rem',
        color: '#555555',
        margin: 0
    },
    infoLabel: {
        color: 'black',
        width: '4rem',
        fontSize: '.9rem',
        fontWeight: 500
    },
    searchClear: {
        position: 'absolute',
        right: 12,
        top: 2
    }
};
@withStyles(style)
@inject("nodeState")
@observer
export default class NodeTrack extends PullRefreshPage {

    constructor(props) {
        super(props);
        const userId = getQueryString("userId");
        const deviceId = getQueryString("deviceId");
        this.state.userId = userId;
        this.state.deviceId = deviceId;
        setTitle("跟踪设备:" + userId);
    }

    pageAction = () => {
        const {host} = this.state;
        return this.props.nodeState.getNodeUserPage({host});
    };

    listItem = (item) => {
        const {classes = ""} = this.props;
        return <ActionCustomItem
            key={item.userId}
            className={classes.item + " " + classes.orderItem}
            onActionClick={() => this.openDrawerMenu({drawerMenus: [
                    {label: '跟踪该设备', onClick: () => this.track(item)},
                    {label: '测试推送', onClick: () => this.testPush(item)},
                    {label: '限制该设备', onClick: () => this.limit(item)},
                    {label: '踢出该设备', onClick: () => this.kick(item)},
                    {label: '更多', onClick: () => this.more(item)},
                ]})}>
            <div>
                {
                    item.userId.indexOf("admin") >= 0 && <p className={classes.infoLine}>
                        <font className={classes.infoLabel} style={{color: "red"}}>推送平台超级管理员</font>
                    </p>
                }
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>设备Id：</font>{item.deviceId}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>连接Id：</font>{item.connId}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>设备UserId：</font>{item.userId}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>服务器地址：</font>{item.host + ":" + item.port}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>设备系统：</font>{item.osName}
                </p>
            </div>
        </ActionCustomItem>;
    };

    getFixBottom = () => {
        return 56 + 56;
    };

    track = (item) => {

    };

    testPush = (item) => {

    };

    limit = (item) => {

    };

    kick = (item) => {

    };

    more = (item) => {

    };
}

NodeList.defaultProps = {
    showSearch: false
};
