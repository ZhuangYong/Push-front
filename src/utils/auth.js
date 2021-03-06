import Cookies from 'js-cookie';
import {getCookie, setCookie} from "./comUtils";

// token 存储key
const TokenKey = 'Login-Token';

/**
 * 获取token
 * 登陆标志
 * @returns {*}
 */
export function getToken() {
    return getCookie(TokenKey);
}

/**
 * 设置token
 * @param token
 * @returns {*}
 */
export function setToken(token) {
    return setCookie(TokenKey, token);
}

/**
 * 删除token
 * @returns {*|void}
 */
export function removeToken() {
    return Cookies.remove(TokenKey);
}

export function cacheUserInfo(userInfo = "") {
    if (typeof userInfo !== "string") {
        userInfo = JSON.stringify(userInfo);
    }
    window.sessionStorage.setItem("login-user-info", userInfo);
}

export function getCachedUserInfo(userInfo) {
    try {
        return JSON.parse(window.sessionStorage.getItem("login-user-info"));
    } catch (e) {
        console.log("err when get cached user info", e);
        return {};
    }
}

export function removeCachedUserInfo() {
    window.sessionStorage.removeItem("login-user-info");
}
