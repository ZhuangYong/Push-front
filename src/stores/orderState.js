import {action, observable} from "mobx";
import Api from "../utils/api";
import BaseState from "./baseState";

export default class orderState extends BaseState {

    @observable orderData = "";

    @action
    setOrderData(data) {
        this.orderData = data;
    }

    getOrderPage(data) {
        return this.fetch({
            url: Api.API_STATIS_ORDER_PAGE,
            setState: "setOrderData",
            data: data
        });
    }

}
