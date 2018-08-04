import {action, observable} from "mobx";
import Api from "../utils/api";
import BaseState from "./baseState";

export default class deviceState extends BaseState {

    @observable deviceGroupData = "";
    @observable deviceData = "";

    @action
    setDeviceGroupData(data) {
        this.deviceGroupData = data;
    }

    @action
    setDeviceData(data) {
        this.deviceData = data;
    }

    getDeviceGroupPage(data) {
        return this.fetch({
            url: Api.API_STATIS_DEVICE_GROUP_PAGE,
            setState: "setDeviceGroupData",
            data: data
        });
    }

    getGroupPage(data) {
        return this.fetch({
            url: Api.API_STATIS_DEVICE_PAGE,
            setState: "setDeviceData",
            data: data
        });
    }

}