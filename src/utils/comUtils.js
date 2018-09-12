import React from "react";
// 一些通用的方法
// import {JSEncrypt} from 'jsencrypt';
// import sysConfig from "./sysConfig";
import navUtils from "./navUtils";
import Const from "./const";

/**
 * 返回特定格式时间字符串
 * @param time
 * @param cFormat
 * @returns {*}
 */
export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
        date = time;
    } else {
        if (('' + time).length === 10) time = parseInt(time, 0) * 1000;
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
        if (result.length > 0 && value < 10) {
            value = '0' + value;
        }
        return value || 0;
    });
    return timeStr;
}

/**
 * 根据时间戳返回对应的y，m，d
 * @param  {[type]} tNum [description]
 * @return {string}      [description]
 */
export function timeToYmd(tNum, sep) {
    let date = tNum ? new Date(tNum) : new Date();
    let y = date.getFullYear() + '';
    let m = (date.getMonth() + 101 + '').substring(1);
    let d = (date.getDate() + 100 + '').substring(1);

    if (sep === '年月日') {
        return y + '年' + m + '月' + d + '日';
    } else if (typeof sep === 'string') {
        return [y, m, d].join(sep);
    } else {
        return [y, m, d].join('-');
    }
}

export function timeToYmdSec(tNum, sep1, sep2) {
    let ymd = timeToYmd(tNum, sep1);
    let date = tNum ? new Date(tNum) : new Date();
    // let h = date.getHours();
    let h = (date.getHours() + 100 + '').substring(1);
    // let m = date.getMinutes();
    let m = (date.getMinutes() + 100 + '').substring(1);
    if (sep2) {
        return ymd + ' ' + [h, m].join(sep2);
    } else {
        return ymd + ' ' + [h, m].join(':');
    }
}


/**
 * 生成相关联的时间
 * 参考当前时间分别返回：
 * 三分钟之内显示 刚刚，
 * 一小时之内显示 xx分钟之前，
 * 当天显示 今天 时:分,
 * 不是当天显示 xxxx年xx月xx日 时:分
 * @param  {[type]} tNum [description]
 * @return {[type]}      [description]
 */
export function timeToRelative(tNum, curt) {
    let cur = curt ? new Date(curt) : new Date();
    let t = new Date(tNum);
    let diff = cur.getTime() - tNum;
    let re;

    let dbHours = (t.getHours() + 100 + '').substring(1);
    let dbMinutes = (t.getMinutes() + 100 + '').substring(1);

    if (diff < 180000) {
        // 3*60*1000
        re = '刚刚';
    } else if (diff < 3600000) {
        // 60*60*1000
        re = Math.round(diff / 60000) + '分钟之前';
    } else if (diff < 86400000 && t.getDate() === cur.getDate()) {
        // 24小时之内，且天数和当前是同一天
        // 24*60*60*1000
        re = '今天 ' + dbHours + ':' + dbMinutes;
    } else {
        re = timeToYmd(tNum) + ' ' + dbHours + ':' + dbMinutes;
    }
    return re;
}

// 获取url?后某参数
export function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r !== null) {
        return /*unescape(*/r[2]/*)*/;
    }
    return "";
}

/**
 * 计算iscroll的option.click的选项的值，在设置iscroll时，option.clidk的值采用这个方法返回的值。
 *
 * 如果直接设置option.click为true，ios要双击才能触发单击事件，如果设置为false，ios可以触发单击事件，
 * 但是android又不能触发事件了，所以需要检测机型来设置。
 *
 * @return {boolean} [description]
 */
export function iScrollClick() {
    if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent))
        return false;
    if (/Silk/i.test(navigator.userAgent))
        return false;
    if (/Android/i.test(navigator.userAgent)) {
        let chromeVersion = 0;
        if (/Chrome/i.test(navigator.userAgent)) {
            chromeVersion = navigator.userAgent.substr(navigator.userAgent.indexOf('Chrome') + 7, 2);
        }
        let s = navigator.userAgent.substr(navigator.userAgent.indexOf('Android') + 8, 3);
        if (parseFloat(s[0] + s[2]) < 44) {
            if (chromeVersion < 40) {
                return false;
            }
        }
        return true;
    }
}

/**
 * 处理富文本编辑器的内容
 * 主要替换掉富文本编辑器中插入的style
 *
 * @param  {[type]} rawText 原始文本
 * @return {[type]}         [description]
 */
export function processRichText(rawText) {
    return rawText.replace(/(style=.+?"|color=.+?")/g, '');
}

/**
 * 把对象数组转换成一个对象，新对象包含了原对象数组中的各个对象。
 * 指定原对象数组中每个对象的一个属性，用它的值来作为新对象中指向各个对象的属性名。
 * eg.
 * 转换前
 * arr = [
 *    {k:'obj1',x:1,y:2,z:3},
 *    {k:'obj2',x:4,y:5,z:6}
 * ]
 *
 * arrToObj(arr, 'k');
 * 转换后
 * obj = {
	 * 	ojb1: {k:'obj1',x:1,y:2,z:3},
	 * 	obj2: {k:'obj2',x:4,y:5,z:6}
	 * }
 *
 * @param {[type]} arr 待转换的对象数组
 * @param {[type]} key 作为对象索引的属性的属性名
 */
export function arrToObj(arr, key) {
    let i, tmp, obj = {};
    for (i = 0; i < arr.length; i++) {
        tmp = arr[i];
        if (!obj.hasOwnProperty(tmp[key])) {
            obj[tmp[key]] = tmp;
        }
    }
    return obj;
}

/**
 * 生成随机字符串
 */
export function getRandomString(len) {
    let seed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let index, str = '';
    for (let i = 0; i < len; i++) {
        index = Math.round(Math.random() * 61);
        str += seed[index];
    }
    return str;
}

/**
 * 生成随机字符串
 */
export function writeAnalyjs(len) {
    let analyjs = document.getElementById('analyjs');
    let oScript = document.createElement("script");
    oScript.id = "analyjs";
    oScript.type = "text/javascript";
    oScript.src = "https://s4.cnzz.com/z_stat.php?id=1258600689&web_id=1258600689";
    oScript.setAttribute("async", true);
    oScript.setAttribute("defer", true);
    analyjs && analyjs.remove();
    document.body.appendChild(oScript);
}

/**
 * 前往指定的页面
 * @param  {string} link         页面path
 */
export function linkTo(link) {
    let fullLink;
    if (link.indexOf('http') === 0) {
        fullLink = link;
        location.href = link;
        return;
    }
    navUtils.forward(fullLink);
}


export function loadScript(url, callback) {
    const queryScript = document.querySelector("[src='" + url + "']");
    if (queryScript) return;

    let script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) { //IE
        script.onreadystatechange = function () {
            if (script.readyState === "loaded" ||
                script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //Others: Firefox, Safari, Chrome, and Opera
        script.onload = function () {
            callback();
        };
    }
    script.src = url;
    document.head.appendChild(script);
}

export function setSession(key, value) {
    window.sessionStorage.setItem(key, value);
}

export function getSession(key) {
    return window.sessionStorage.getItem(key);
}

export function removeSession(key) {
    window.sessionStorage.removeItem(key);
}

export function setCookie(name, value, expireDays) {
    let date = new Date();
    date.setDate(date.getDate() + (expireDays || 365));
    document.cookie = name + "=" + escape(value) + ((expireDays === null) ? "" : ";path=/;expires=" + date.toGMTString());
}

export function removeCookie(name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 100);
    let val = this.getCookie(name);
    if (val !== null)
        document.cookie = name + "=" + val + ";path=/;expires=" + exp.toGMTString();
}

export function getCookie(name) {
    if (document.cookie.length > 0) {
        let cStart, cEnd;
        cStart = document.cookie.indexOf(name + "=");
        if (cStart !== -1) {
            cStart = cStart + name.length + 1;
            cEnd = document.cookie.indexOf(";", cStart);
            if (cEnd === -1) cEnd = document.cookie.length;
            return unescape(document.cookie.substring(cStart, cEnd));
        }
        return "";
    }
    return "";
}

export function expireT(time) {
    let expireT = (time - new Date().getTime()) / (1000 * 60 * 60 * 24);
    return expireT.toFixed(2);
}

export function wxConfig(data = {}) {
    window.wx && window.wx.config({
        debug: false,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: [
            'getNetworkType',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'scanQRCode',
            'startRecord',
            'stopRecord',
            'translateVoice',
            'chooseWXPay',
            'chooseImage',
            'getLocalImgData',
            'uploadImage'
        ]
    });
}

// 去除字符串所有标点
export function stripScript(s) {
    let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    let rs = "";
    for (let i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

export function toRem(px) {
    const designW = 750;
    return px * 10 / designW + "rem";
}

// 解决精度问题
// 加法
export function accAdd(arg1, arg2) {
    let r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}

// 减法
export function subtr(arg1, arg2) {
    let r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}


export function formatTime(second) {
    if (!second) return "00:00:00";
    let h = '0' + parseInt(second / (60 * 60), 0);
    let m = '0' + parseInt((second - h * 60 * 60) / 60, 0);
    let s = '0' + second % 60;
    h = h.substr(h.length - 2, h.length);
    m = m.substr(m.length - 2, m.length);
    s = s.substr(s.length - 2, s.length);
    return h + ":" + m + ":" + s;
}

export function dispatchCustomEvent(eventName, cause = "", target = document) {
    const event = document.createEvent('Event');
    event.initEvent(eventName, true, false);
    event.cause = cause;

    const loadingDiv = document.querySelector("#appLoading");
    if (eventName === Const.EVENT.EVENT_API_ERR && loadingDiv) {
        alert(cause);
    } else {
        target.dispatchEvent(event);
    }
}

export function getScreenSize() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    };
}

export function setTitle(title) {
    document.title = title;
}

export function isWeiXin() {
    const ua = window.navigator.userAgent.toLowerCase();
    return (ua.match(/MicroMessenger/i) || []).indexOf("micromessenger") > -1;
}
