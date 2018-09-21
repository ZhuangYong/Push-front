import {action, observable} from "mobx";
import Api from "../utils/api";
import BaseState from "./baseState";

export default class orderState extends BaseState {

    @observable orderData = "";
    @observable retrieveOrderData = "";
    @observable orderCashApplyData = "";
    @observable orderCashDetailData = "";

    @action
    setOrderData(data) {
        this.orderData = data;
    }

    @action
    setRetrieveOrderData(data) {
        this.retrieveOrderData = data;
    }

    @action
    setOrderCashApplyData(data) {
        this.orderCashApplyData = data;
    }
    @action
    setOrderCashDetailData(data) {
        this.orderCashDetailData = data;
    }

    /**
     * 获取订单列表
     * @param data
     * @returns {*}
     */
    getOrderPage(data) {
        return this.fetch({
            url: Api.API_STATIS_ORDER_PAGE,
            setState: "setOrderData",
            data: data
        });
    }

    /**
     * 找回订单列表
     * @param data
     * @returns {*}
     */
    getRetrieveOrderPage(data) {
        return this.fetch({
            url: Api.API_STATIS_ORDER_RETRIEVE_PAGE,
            setState: "setRetrieveOrderData",
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

    /**
     * 找回订单
     * @param data
     * @returns {*}
     */
    doOrderRetrieve(data) {
        return this.fetch({
            url: Api.API_STATIS_ORDER_RETRIEVE,
            data: data
        });
    }

    /**
     * 提现订单详情
     * @param data
     * @returns {*}
     */
    orderCashList(data) {
        return this.fetch({
            url: Api.API_ORDER_CASH_ORDER_LIST,
            data: data
        });
    }
}
