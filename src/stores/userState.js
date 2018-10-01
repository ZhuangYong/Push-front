import {action, observable} from "mobx";
import Api from "../utils/api";
import BaseState from "./baseState";
import {cacheUserInfo, removeCachedUserInfo, removeToken, setToken} from "../utils/auth";

export default class userState extends BaseState {
    // agent 1是代理人 2不是代理人 3申请中 4  审核失败
    static AGENT_TYPE_AGENT = 1;
    static AGENT_TYPE_NOT_AGENT = 2;
    static AGENT_TYPE_AGENT_APPLY_ING = 3;
    static AGENT_TYPE_AGENT_APPLY_FAIL = 4;


    // 用户登陆信息（主要是token类数据）
    @observable loginData = "";
    // 账户管理员列表
    @observable managerData = "";
    // 登陆用户的用户信息（用户详情）
    @observable loginUserData = "";
    // 用户收入概况
    @observable userIncomeData = "";
    // 配置信息
    @observable configData = "";

    @action
    setLoginData(data) {
        this.loginData = data;
        const {token} = data || {};
        setToken(token);
    }

    @action
    setManagerData(data = []) {
        this.managerData = {
            currentPage: 1,
            data: data,
            pageSize: 20,
            totalPage: 1,
            totalRow: data.length
        };
    }

    @action
    setLoginUserData(data) {
        this.loginUserData = data || {};
        cacheUserInfo(data);
    }

    @action
    clearLoginUserData() {
        this.loginUserData = "";
        removeToken();
        removeCachedUserInfo();
        this.setConfigData("");
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

    /**
     * 获取授权
     * @param data
     * @returns {*}
     */
    auth(data) {
        return this.fetch({
            url: Api.API_WEIXIN_AUTH,
            data: data
        });
    }

    /**
     * 退出登录
     * @param data
     * @returns {*}
     */
    logout(data) {
        return this.fetch({
            url: Api.API_USER_LOGOUT,
            setState: "setLoginData",
            loading: "logout",
            data: data
        }, res => this.clearLoginUserData());
    }

    /**
     * 获取用户信息
     * @param data
     * @returns {*}
     */
    getUserInfo(data) {
        return this.fetch({
            url: Api.API_USER_INFO,
            setState: "setLoginUserData",
            data: data
        });
    }

    /**
     * 获取账户管理员列表
     * @returns {*}
     */
    getManagePage(data) {
        return this.fetch({
            url: Api.API_STATIS_MANAGER_PAGE,
            setState: "setManagerData",
            data: data
        });
    }

    /**
     * 上传登陆用户头像并直接保存
     * @param data
     * @returns {*}
     */
    uploadUserAvatar(data) {
        return this.fetch({
            url: Api.API_IMAGE_UPLOAD_AVATAR,
            data: data
        });
    }

    /**
     * 上传图片
     * @param data
     * @returns {*}
     */
    uploadImage(data) {
        return this.fetch({
            url: Api.API_IMAGE_UPLOAD,
            data: data
        });
    }

    /**
     * 保存用户信息
     * @param data
     * @returns {*}
     */
    saveUserInfo(data) {
        return this.fetch({
            url: Api.API_USER_SAVE,
            data: data
        });
    }

    /**
     * 保存用户信息
     * @param data
     * @returns {*}
     */
    saveUserManagerAccountInfo(data) {
        return this.fetch({
            url: Api.API_USER_MANAGER_ACCOUNT_SAVE,
            data: data
        });
    }

    /**
     * 修改用户密码
     * @param data
     * @returns {*}
     */
    updateUserPassword(data) {
        return this.fetch({
            url: Api.API_USER_CHANGE_PASSWORD,
            data: data
        });
    }

    /**
     * 获取输入概况
     * @param data
     * @returns {*}
     */
    getUserIncomeInfo(data) {
        return this.fetch({
            url: Api.API_STATIS_INDEX_DETAIL,
            setState: "setUserIncomeData",
            data: data
        });
    }

    /**
     * 保存意见反馈
     * @param data
     * @returns {*}
     */
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

    /**
     * 关闭或开启1元试唱功能
     * @returns {*}
     */
    onOffFreeSing() {
        return this.fetch({
            url: Api.API_CONFIG_CHANGE_FREE_SING,
        });
    }

    /**
     * 开启或关闭微信推送
     * @returns {*}
     */
    onOffNotice() {
        return this.fetch({
            url: Api.API_CONFIG_CHANGE_NOTICE_SING,
        });
    }

    /**
     * 申请成为代理商
     * @returns {*}
     */
    applyAgent() {
        return this.fetch({
            url: Api.API_CONFIG_APPLY_AGENT,
        });
    }
}
