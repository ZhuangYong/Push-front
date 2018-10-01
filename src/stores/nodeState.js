import {action, observable} from "mobx";
import Api from "../utils/api";
import BaseState from "./baseState";

export default class orderState extends BaseState {

    // 推送服务器节点
    @observable nodeData = "";
    // 节点用户
    @observable nodeUserData = "";

    @action
    setNodeData(data) {
        this.nodeData = data;
    }

    @action
    setNodeUserData(data) {
        this.nodeUserData = data;
    }

    /**
     * 获取推送服务器列表
     * @param data
     * @returns {*}
     */
    getNodePage(data) {
        return this.fetch({
            url: Api.API_PUSH_NODE_PAGE,
            setState: "setNodeData",
            data: data
        });
    }

    /**
     * 所有推送服务器列表
     * @param data
     * @returns {*}
     */
    getNodeList(data) {
        return this.fetch({
            url: Api.API_PUSH_NODE_LIST,
            data: data
        });
    }

    /**
     * 推送服务器节点用户
     * @param data
     * @returns {*}
     */
    getNodeUserPage(data) {
        return this.fetch({
            url: Api.API_PUSH_NODE_USER,
            setState: "setNodeUserData",
            data: data
        });
    }

    /**
     * 跟踪用户/设备
     * @param data
     * @returns {*}
     */
    trackUser(data) {
        return this.fetch({
            url: Api.API_PUSH_NODE_USER_TRACK,
            data: data
        });
    }

    /**
     * 取消跟踪用户/设备
     * @param data
     * @returns {*}
     */
    deleteTrackUser(data) {
        return this.fetch({
            url: Api.API_PUSH_NODE_USER_TRACK_DELETE,
            data: data
        });
    }

    /**
     * 清除跟踪用户/设备
     * @param data
     * @returns {*}
     */
    clearTrackUser(data) {
        return this.fetch({
            url: Api.API_PUSH_NODE_USER_TRACK_CLEAR,
            data: data
        });
    }
}
