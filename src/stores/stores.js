import {store} from "rfx-core";
import userState from "./userState";
import statisticsState from "./statisticsState";
import deviceState from "./deviceState";
import orderState from "./orderState";
import priceState from "./priceState";
import salesState from "./salesState";
import appState from "./appState";

export default store.setup({
    appState: appState,
    userState: userState,
    statisticsState: statisticsState,
    deviceState: deviceState,
    orderState: orderState,
    priceState: priceState,
    salesState: salesState
});
