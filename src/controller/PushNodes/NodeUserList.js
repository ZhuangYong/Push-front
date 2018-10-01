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
import {TrackIcon} from "../../components/common/SvgIcons";

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
export default class NodeList extends PullRefreshPage {

    constructor(props) {
        super(props);
        const host = getQueryString("host");
        this.state.host = host;
        setTitle("推送服务器:" + host);
    }

    pageAction = () => {
        const {host} = this.state;
        return this.props.nodeState.getNodeUserPage({host});
    };

    listItem = (item) => {
        const {classes = ""} = this.props;
        const {inTrack} = item;
        // 设备是管理平台连入
        const isAdmin = item.deviceId.indexOf("admin") >= 0;
        let drawerMenus = [
            {label: '测试推送', onClick: () => this.testPush(item)},
            {label: '限制该设备', onClick: () => this.limit(item)},
            {label: '踢出该设备', onClick: () => this.kick(item)},
            {label: '更多', onClick: () => this.more(item)},
        ];
        if (!inTrack) {
            drawerMenus = [{label: '跟踪该设备', onClick: () => this.track(item)}].concat(drawerMenus);
        } else {
            drawerMenus = [
                {label: '取消跟踪该设备', onClick: () => this.unTrack(item)},
                {label: '清除该设备跟踪', onClick: () => this.clearTrack(item)}
            ].concat(drawerMenus);
        }
        return <ActionCustomItem
            key={item.userId}
            className={classes.item + " " + classes.orderItem}
            showAction={!isAdmin}
            onActionClick={() => this.openDrawerMenu({drawerMenus: drawerMenus})}>
            <div>
                {
                    isAdmin && <p className={classes.infoLine}>
                        <font className={classes.infoLabel} style={{color: "red"}}>推送平台超级管理员</font>
                    </p>
                }
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>UserId：</font>{item.userId}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>设备Id：</font>{item.deviceId}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>连接Id：</font>{item.connId}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>服务器地址：</font>{item.host + ":" + item.port}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>设备系统：</font>{item.osName}
                </p>
                {
                    inTrack > 0 ? <p className={classes.infoLine}>
                        <TrackIcon size="1.6rem"/>
                    </p> : ""
                }
            </div>
        </ActionCustomItem>;
    };

    getFixBottom = () => {
        return 56 + 56;
    };

    /**
     * 跟踪设备
     * @param item
     */
    track = (item) => {
        const {userId} = item;
        this.props.nodeState.trackUser({userId})
            .then(res => {
                this.notification("跟踪成功，你可以查看跟踪信息了");
                this.handelPageRefresh();
            });
    };

    /**
     * 取消跟踪设备
     * @param item
     */
    unTrack = (item) => {
        const {userId} = item;
        this.props.nodeState.deleteTrackUser({userId})
            .then(res => {
                this.notification("取消跟踪成功！");
                this.handelPageRefresh();
            });
    };

    /**
     * 清除设备跟踪
     * @param item
     */
    clearTrack = (item) => {
        const {userId} = item;
        this.props.nodeState.clearTrackUser({userId})
            .then(res => {
                this.notification("清除跟踪成功！");
                this.handelPageRefresh();
            });
    };

    /**
     * 对设备推送测试
     * @param item
     */
    testPush = (item) => {

    };

    /**
     * 限制设备
     * @param item
     */
    limit = (item) => {

    };

    /**
     * 将设备踢下线
     * @param item
     */
    kick = (item) => {

    };

    /**
     * 跟多操作
     * @param item
     */
    more = (item) => {

    };
}

NodeList.defaultProps = {
    showSearch: false
};
