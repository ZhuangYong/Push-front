import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import withStyles from "material-ui/styles/withStyles";
import pageRoutes from "../routes/pages";

import {Device2Icon, DeviceIcon, HomeIcon, OrderIcon, PartnerIcon, UserIcon} from "../components/common/SvgIcons";
import appStyle from "../assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx";
import BaseComponent from "../components/common/BaseComponent";
import CommonFrame from "../components/common/CommonFrame";
import Bundle from "../Loadable/Bundle";
import {inject} from "mobx-react";
import {observer} from "mobx-react/index";
import BottomNavs from "../components/Menus/BottomNavs";
import NavUtils from "../utils/navUtils";
import Path from "../utils/path";
import {getToken} from "../utils/auth";
import Const from "../utils/const";

const genRoute = (prop, key) => {
    return <Route exact path={prop.path} render={() => {
        if (prop.needLogin && prop.path !== Path.PATH_LOGIN && !getToken()) {
            return <Redirect from={prop.path} to={Path.PATH_LOGIN} key={key}/>;
        }
        return <CommonFrame>{props => (
            <Bundle load={prop.component}>
                {Component => <Component {...props}/>}
            </Bundle>
        )}</CommonFrame>;
    }} key={key}/>;
};

const switchRoutes = (
    <Switch>
        {pageRoutes.map((prop, key) => {
            if (prop.redirect)
                return <Redirect from={prop.path} to={prop.pathTo} key={key}/>;
            if (prop.collapse) {
                return prop.views.map((prop, key) => genRoute(prop, key));
            } else {
                return genRoute(prop, key);
            }
        })}
    </Switch>
);

@withStyles(appStyle)
@inject("userState", "appState")
@observer
export default class Dashboard extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.initial = this.initial.bind(this);
        this.refreshUserInfo = this.refreshUserInfo.bind(this);
    }

    componentDidMount() {
        this.initial();
    }
    getRoute() {
        return this.props.location.pathname !== "/some/condition/path";
    }

    render() {
        const {classes} = this.props;
        const {appLoaded} = this.props.appState;
        const {loginUserData} = this.props.userState;
        if (!appLoaded) {
            return "";
        }
        return (
            <div>
                <div
                    className={[classes.wrapper, "page-container"].join(" ")}
                    style={{overflowY: 'auto', WebkitOverflowScrolling: 'touch', transition: 'all 0.3s ease 0s'}}>
                    <div ref="mainPanel" style={{paddingBottom: '5.6rem'}}>
                        {this.getRoute() ? (
                            <div className={classes.content}>
                                <div className={classes.container}>{switchRoutes}</div>
                            </div>
                        ) : (
                            <div className={classes.map}>{switchRoutes}</div>
                        )}
                    </div>
                </div>
                {
                    loginUserData.type === Const.ROLE.SALES && <BottomNavs items={[
                        {label: "首页", icon: <HomeIcon/>, paths: [Path.PATH_INDEX, Path.PATH_USER_INCOME_INFO]},
                        {label: "设备", icon: <Device2Icon/>, paths: [Path.PATH_DEVICE_GROUP_INDEX, Path.PATH_DEVICE_INDEX, Path.PATH_DEVICE_GROUP_SELF_DETAIL, Path.PATH_PRICE_INDEX, Path.PATH_DEVICE_MARQUEE_LIST, Path.PATH_DEVICE_GROUP_EDIT]},
                        {label: "代理商", icon: <PartnerIcon/>, iconSize: "1.8rem", paths: [Path.PATH_PARTNER_LIST_INDEX, Path.PATH_PARTNER_DETAIL, Path.PATH_DEVICE_PARTNER_INDEX, Path.PATH_PARTNER_DEVICE_GROUP_LIST]},
                        {label: "订单", icon: <OrderIcon/>, paths: [Path.PATH_ORDER_INDEX]},
                        {label: "我", icon: <UserIcon/>, paths: [Path.PATH_USER_INDEX, Path.PATH_USER_EDIT_INFO, Path.PATH_USER_FEEDBACK]},
                    ]}/>
                }
                {
                    loginUserData.type === Const.ROLE.MANUFACTURE && <BottomNavs items={[
                        {label: "首页", icon: <HomeIcon/>, paths: [Path.PATH_INDEX, Path.PATH_USER_INCOME_INFO]},
                        {label: "设备", icon: <Device2Icon/>, paths: [Path.PATH_MANUFACTURE_DEVICE_GROUP_INDEX, Path.PATH_DEVICE_INDEX, Path.PATH_DEVICE_GROUP_SELF_DETAIL]},
                        {label: "订单", icon: <OrderIcon/>, paths: [Path.PATH_ORDER_INDEX]},
                        {label: "我", icon: <UserIcon/>, paths: [Path.PATH_USER_INDEX, Path.PATH_USER_EDIT_INFO, Path.PATH_USER_FEEDBACK]},
                    ]}/>
                }
                {
                    !loginUserData && <BottomNavs items={[
                        {label: "...", icon: <HomeIcon/>, paths: []},
                    ]}/>
                }
            </div>
        );
    }

    initial() {
        NavUtils.setHistory(this.props.history);
        const {loginUserData} = this.props.userState;
        if (!loginUserData) {
            this.refreshUserInfo();
        }
    }

    refreshUserInfo() {
        this.props.userState.getUserInfo()
            .then(res => {
                this.props.appState.setAppLoaded(true);
                this.appLoadingDone();
            });
    }
}
