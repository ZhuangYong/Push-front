import {action, observable} from "mobx";
import Api from "../utils/api";
import BaseState from "./baseState";

export default class priceState extends BaseState {

    @observable pricePageData = "";

    @action
    setPricePageData(data) {
        this.orderData = data;
    }

    getPricePageData(data) {
        return this.fetch({
            url: Api.API_PRICE_PRODUCT_PAGE,
            setState: "setPricePageData",
            data: data
        });
    }

    saveProductPrice(data) {
        return this.fetch({
            url: Api.API_PRICE_PRODUCT_SAVE,
            data: data
        });
    }
}
