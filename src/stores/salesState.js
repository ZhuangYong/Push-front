import {action, observable} from "mobx";
import Api from "../utils/api";
import BaseState from "./baseState";

export default class priceState extends BaseState {

    @observable salesPageData = "";

    @action
    setSalesPageData(data) {
        this.orderData = data;
    }

    getSalesPageData(data) {
        return this.fetch({
            url: Api.API_SALES_PAGE,
            setState: "setSalesPageData",
            data: data
        });
    }

    editSalesData(data) {
        return this.fetch({
            url: Api.API_SALES_EDIT,
            data: data
        });
    }

    saveSalesDevice(data) {
        return this.fetch({
            url: Api.API_SALES_SAVE_DEVICE,
            data: data
        });
    }
}
