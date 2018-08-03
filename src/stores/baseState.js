import request from "../utils/axios";

export default class baseState {

    fetch(data, success, fail) {
        return request({
            url: data.url,
            method: data.method || 'post',
            data: data.data || {}
        }, res => {
            const {setState} = data;
            if (setState) {
                if (typeof this[setState] === "function") {
                    this[setState](res);
                }
            }
            success && success(res);
        }, fail);
    }
}
