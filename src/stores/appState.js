import {action, observable} from "mobx";
import BaseState from "./baseState";
import {conn} from "../utils/wsUtils";

export default class appState extends BaseState {

    @observable appLoaded = false;
    @observable pageDeviceList = {
    tabIndex: 0
    };

    @action
    setPageDeviceListTabIndex(index) {
        this.pageDeviceList.tabIndex = index;
    }

    @action
    setAppLoaded(data) {
        this.appLoaded = data;
    }

    @action
    linkInWs(url, userId, deviceId, onReceive, onOpen, onClose, onError) {
        conn(url, userId, deviceId, onReceive, onOpen, onClose, onError);
    }

}
