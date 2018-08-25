import {action, observable} from "mobx";
import Api from "../utils/api";
import BaseState from "./baseState";

export default class orderState extends BaseState {

    @observable orderData = "";
    @observable orderCashApplyData = "";
    @observable orderCashDetailData = "";

    @action
    setOrderData(data) {
        this.orderData = data;
    }

    @action
    setOrderCashApplyData(data) {
        this.orderCashApplyData = data;
    }
    @action
    setOrderCashDetailData(data) {
        this.orderCashDetailData = data;
    }
    getOrderPage(data) {
        return this.fetch({
            url: Api.API_STATIS_ORDER_PAGE,
            setState: "setOrderData",
            data: data
        });
    }

    getOrderCashApplyData(data) {
        return this.fetch({
            url: Api.API_ORDER_CASH_LIST,
            setState: "setOrderCashApplyData",
            data: data
        });
    }

    getOrderCashDetailData(data) {
        return this.fetch({
            url: Api.API_ORDER_CASH_DETAIL,
            setState: "setOrderCashDetailData",
            data: data
        });
    }

    applyOrderCash(data) {
        return this.fetch({
            url: Api.API_ORDER_CASH_APPLY,
            data: data
        });
    }
}
