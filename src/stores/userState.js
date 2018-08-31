import {action, observable} from "mobx";
import Api from "../utils/api";
import BaseState from "./baseState";
import {cacheUserInfo, removeCachedUserInfo, removeToken, setToken} from "../utils/auth";

export default class userState extends BaseState {

    @observable loginData = "";
    @observable loginUserData = "";
    @observable userIncomeData = "";
    @observable configData = "";

    @action
    setLoginData(data) {
        this.loginData = data;
        const {token} = data || {};
        setToken(token);
    }

    @action
    setLoginUserData(data) {
        this.loginUserData = data;
        cacheUserInfo(data);
    }

    @action
    clearLoginUserData() {
        this.loginUserData = "";
        removeToken();
        removeCachedUserInfo();
    }

    @action
    setUserIncomeData(data) {
        this.userIncomeData = data;
    }


    @action
    setConfigData(data) {
        this.configData = data;
    }

    /**
     * 登录
     * @param data
     * @returns {*}
     */
    login(data) {
        return this.fetch({
            url: Api.API_USER_LOGIN,
            setState: "setLoginData",
            data: data
        });
    }

    auth(data) {
        return this.fetch({
            url: Api.API_WEIXIN_AUTH,
            data: data
        });
    }

    logout(data) {
        return this.fetch({
            url: Api.API_USER_LOGOUT,
            setState: "setLoginData",
            data: data
        }, res => this.clearLoginUserData());
    }

    getUserInfo(data) {
        return this.fetch({
            url: Api.API_STATIS_USER_INFO,
            setState: "setLoginUserData",
            data: data
        });
    }

    uploadUserAvatar(data) {
        return this.fetch({
            url: Api.API_IMAGE_UPLOAD_AVATAR,
            data: data
        });
    }

    uploadImage(data) {
        return this.fetch({
            url: Api.API_IMAGE_UPLOAD,
            data: data
        });
    }

    saveUserInfo(data) {
        return this.fetch({
            url: Api.API_USER_SAVE,
            data: data
        });
    }

    updateUserPassword(data) {
        return this.fetch({
            url: Api.API_USER_CHANGE_PASSWORD,
            data: data
        });
    }

    getUserIncomeInfo(data) {
        return this.fetch({
            url: Api.API_STATIS_INDEX_DETAIL,
            setState: "setUserIncomeData",
            data: data
        });
    }

    saveFeedback(data) {
        return this.fetch({
            url: Api.API_USER_SAVE_FEEDBACK,
            data: data
        });
    }

    /**
     * 获取配置
     * @returns {*}
     */
    getConfigData() {
        return this.fetch({
            url: Api.API_CONFIG_INDEX,
            setState: "setConfigData",
        });
    }

    onOffFreeSing() {
        return this.fetch({
            url: Api.API_CONFIG_CHANGE_FREE_SING,
        });
    }
}
