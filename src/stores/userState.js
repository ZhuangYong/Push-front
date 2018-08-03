import {action, observable} from "mobx";
import Api from "../utils/api";
import BaseState from "./baseState";
import {cacheUserInfo, removeToken, setToken} from "../utils/auth";

export default class userState extends BaseState {

    @observable loginData = "";
    @observable loginUserData = "";

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

    logout(data) {
        return this.fetch({
            url: Api.API_USER_LOGOUT,
            setState: "setLoginData",
            data: data
        }, res => removeToken());
    }

    getUserInfo(data) {
        return this.fetch({
            url: Api.API_STATIS_USER_INFO,
            setState: "setLoginUserData",
            data: data
        });
    }

}
