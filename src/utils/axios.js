import axios from "axios";
import {getToken} from "./auth";
import Const from "./const";
import NavUtils from "./navUtils";
import Path from "./path";
import {dispatchCustomEvent} from "./comUtils";

axios.defaults.retry = 0;
axios.defaults.retryDelay = 1000;
axios.defaults.baseURL = Const.BASE_API;

// request拦截器
axios.interceptors.request.use(config => {
    config.headers['token'] = getToken();
    let {data, url} = config;
    if (data) {
        const {urlJoin} = data;
        if (urlJoin) {
            config.url = url + urlJoin;
            delete data.urlJoin;
            config.data = data;
        }
    }
    return config;
}, error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
});

axios.interceptors.response.use(
    response => Promise.resolve(response),
    error => {
        const {config} = error;
        // If config does not exist or the retry option is not set, reject
        if (!config || !config.retry) return Promise.reject(error);

        // Set the variable for keeping track of the retry count
        config.retryCount = config.retryCount || 0;

        // Check if we've maxed out the total number of retries
        if (config.retryCount >= config.retry) {
            if (error.response) {
                switch (error.response.status) {
                    case 401: {
                        // TODO
                        break;
                    }
                    default:
                        break;
                }
            }
            return Promise.reject(error);
        }
        config.retryCount += 1;

        const backoff = new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, config.retryDelay || 1);
        });

        return backoff.then(() => axios(config));
    }
);

// axios.interceptors.response.use(
//   response => Promise.resolve(response),
//   error => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401: {
//           // TODO
//           break;
//         }
//         case 403: {
//           notification.warn({ message: "您没有权限这样做!" });
//           break;
//         }
//         default:
//           break;
//       }
//     }
//     return Promise.reject(error);
//   }
// );

/**
 * ajax请求同意封装
 *
 * @param    {Object}  config     axios请求配置
 * @param    {Object}  success    请求成功配置
 * @param    {Object}  error      请求失败配置
 * @return   {Promise} response   ajax请求结果
 *
 * @date     18-3-22
 * @author   gongtiexin
 */
const request = (config, success, error) =>
    axios(config).then(
        response => {
            console.log("------------");
            if (response.data.indexOf && response.data.indexOf("<script") === 0) {
                return document.write(response.data);
            }
            const {data: {data, status, msg = "error"}} = response;
            if (status && status !== 200) {
                const newError = new Error();
                newError.status = status;
                newError.msg = msg;
                newError.data = data;

                dispatchCustomEvent('EVENT_API_ERR', msg);

                handelErr(status);

                return Promise.reject(newError);
            }
            // if (success && success.message) {
            //     // notification.success({ message: success.message });
            // }
            if (typeof success === 'function') {
                success(data);
            }
            return Promise.resolve(data);
        }, err => {
            const {response = {}, message} = err;
            let description = "";
            switch (response.status) {
                case 403: {
                    description = "您没有权限这样做";
                    break;
                }
                case 503: {
                    description = "服务器当前无法处理请求";
                    break;
                }
                case 502: {
                    description = "服务器接暂无响应";
                    break;
                }
                default: {
                    if (response && response.data && response.data.message) {
                        description = response.data.message;
                    }
                }
            }
            if (typeof error === 'function') {
                error(description);
            }
            dispatchCustomEvent('EVENT_API_ERR', message || description);
            return Promise.reject(description);
        }
    );

const handelErr = (status) => {
    switch (status) {
        case 401: {
            NavUtils.linkTo(Path.PATH_LOGIN);
            break;
        }
        default: {
            console.log("no default handel error");
        }
    }
};

export default request;
