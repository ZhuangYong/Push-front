import {store} from "rfx-core";

import userState from "./userState";
import statisticsState from "./statisticsState";
import deviceState from "./deviceState";

export default store.setup({
    userState: userState,
    statisticsState: statisticsState,
    deviceState: deviceState
});
