import {action, observable} from "mobx";
import Api from "../utils/api";
import BaseState from "./baseState";

export default class deviceState extends BaseState {

    @observable deviceGroupData = "";
    @observable deviceData = "";
    @observable partnerDeviceData = "";
    @observable chooseDeviceData = "";
    @observable deviceGroupDetailData = "";
    @observable deviceMarqueeData = "";
    @observable deviceMarqueeDetailData = "";

    @action
    setDeviceGroupData(data) {
        this.deviceGroupData = data;
    }

    @action
    setDeviceData(data) {
        const {tails} = data;
        if (tails && data.data && data.data.map) {
            data.data.map(item => {
                item.tails = tails;
            });
        }
        this.deviceData = data;
    }

    @action
    setPartnerDeviceData(data) {
        this.partnerDeviceData = data;
    }

    @action
    setChooseDeviceData(data) {
        this.chooseDeviceData = data;
    }

    @action
    setDeviceGroupDetailData(data) {
        this.deviceGroupDetailData = data;
    }

    @action
    setDeviceMarqueeData(data) {
        this.deviceMarqueeData = data;
    }

    @action
    setDeviceMarqueeDetailData(data) {
        this.deviceMarqueeDetailData = data;
    }

    getDeviceGroupPage(data) {
        return this.fetch({
            url: Api.API_STATIS_DEVICE_GROUP_PAGE,
            setState: "setDeviceGroupData",
            data: data
        });
    }

    getPartnerDevicePage(groupUuid, data) {
        return this.fetch({
            url: Api.API_SALES_GROUP_DEVICE_LIST + groupUuid,
            setState: "setPartnerDeviceData",
            data: data
        });
    }

    getDeviceChoosePage(data) {
        return this.fetch({
            url: Api.API_DEVICE_CHOOSE_PAGE,
            setState: "setChooseDeviceData",
            data: data
        });
    }

    getDevicePage(groupUuid, data) {
        return this.fetch({
            url: Api.API_DEVICE_PAGE + groupUuid,
            setState: "setDeviceData",
            data: data
        });
    }

    getDeviceGroupDetail(groupUUID) {
        return this.fetch({
            url: Api.API_DEVICE_GROUP_STATIS + groupUUID,
            setState: "setDeviceGroupDetailData",
        });
    }

    getDeviceMarquee(data) {
        return this.fetch({
            url: Api.API_DEVICE_MARQUEE_LIST,
            setState: "setDeviceMarqueeData",
            data: data
        });
    }

    /**
     * 保存设备信息
     * @param data
     * @returns {*}
     */
    saveDeviceInfo(data) {
        return this.fetch({
            url: Api.API_DEVICE_SAVE_INFO,
            data: data
        });
    }

    /**
     *  为虚拟组添加设备
     * @param data
     * @returns {*}
     */
    saveChooseDevice(data) {
        return this.fetch({
            url: Api.API_DEVICE_CHOOSE_SAVE,
            data: data
        });
    }

    /**
     * 保存虚拟设备组
     * @param data
     * @returns {*}
     */
    saveDeviceGroup(data) {
        return this.fetch({
            url: Api.API_DEVICE_GROUP_SAVE,
            data: data
        });
    }

    /**
     * 保存虚拟设备组设备别名
     * @param data
     * @returns {*}
     */
    saveDeviceName(data) {
        return this.fetch({
            url: Api.API_DEVICE_NAME_SAVE,
            data: data
        });
    }

    /**
     * 删除虚拟设备组
     * @param teamUuid
     * @returns {*}
     */
    deleteDeviceGroup(teamUuid) {
        return this.fetch({
            url: Api.API_DEVICE_GROUP_DELETE + teamUuid,
        });
    }

    saveDeviceMarquee(data) {
        return this.fetch({
            url: Api.API_DEVICE_MARQUEE_SAVE,
            data: data
        });
    }

    deleteDeviceMarquee(data) {
        return this.fetch({
            url: Api.API_DEVICE_MARQUEE_DELETE,
            data: data
        });
    }

    /**
     * 解绑虚拟组设备
     * @param data
     * @returns {*}
     */
    unbindSalesDevice(data) {
        return this.fetch({
            url: Api.API_UNBIND_DEVICE,
            data: data
        });
    }

}
