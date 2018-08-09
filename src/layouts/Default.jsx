import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import withStyles from "material-ui/styles/withStyles";
import pageRoutes from "../routes/pages";

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
@inject(({store: {userState}}) => ({userState}))
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
        return this.props.location.pathname !== "/maps/full-screen-maps";
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.wrapper}>
                <div ref="mainPanel" style={{paddingBottom: '5.6rem'}}>
                    {this.getRoute() ? (
                        <div className={classes.content}>
                            <div className={classes.container}>{switchRoutes}</div>
                        </div>
                    ) : (
                        <div className={classes.map}>{switchRoutes}</div>
                    )}
                </div>
                <BottomNavs/>
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
        this.props.userState.getUserInfo();
    }
}
