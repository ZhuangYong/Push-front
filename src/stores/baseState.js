import request from "../utils/axios";

export default class baseState {

    fetch(data, success, fail) {
        const {setState, loading = ""} = data;
        const loadingKey = (loading || "") + "Loading";
        if (loading) {
            this[loadingKey] = true;
        }
        return request({
            url: data.url,
            method: data.method || 'post',
            data: data.data || {}
        }, res => {
            if (setState) {
                if (typeof this[setState] === "function") {
                    this[setState](res);
                }
            }
            success && success(res);
            if (loading) {
                this[loadingKey] = false;
            }
        }, err => {
            fail && fail(err);
            if (loading) {
                this[loadingKey] = false;
            }
        });
    }
}
