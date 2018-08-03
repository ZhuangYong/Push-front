import React from "react";
import {render} from "react-dom";
import {Router, Route, Switch} from "react-router-dom";
import { Provider } from "mobx-react";
import {rehydrate} from "rfx-core";
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import "./stores/stores";
import indexRoutes from "./routes/index.jsx";
import "assets/scss/material-dashboard-pro-react.scss?v=1.1.0";
import Bundle from "./Loadable/Bundle";
import makeInspectable from 'mobx-devtools-mst';
import Const from "./utils/const";
import "./assets/scss/main.scss";

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);
const store = rehydrate();
if (!Const.isProduction) {
    makeInspectable(store);
}

render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                {indexRoutes.map((prop, key) => {
                    let component = prop.component;
                    if (prop.path.length > 1) {
                        component = () => <Bundle load={prop.component}>
                            {Component => <Component/>}
                        </Bundle>;
                    }
                    return <Route path={prop.path} component={component} key={key}/>;
                })}
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root")
);
