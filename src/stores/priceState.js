import {action, observable} from "mobx";
import Api from "../utils/api";
import BaseState from "./baseState";

export default class priceState extends BaseState {

    @observable pricePageData = "";

    @action
    setPricePageData(data) {
        this.orderData = data;
    }

    getPricePageData(groupUuid) {
        return this.fetch({
            url: Api.API_PRICE_PRODUCT_PAGE + "?uuid=" + groupUuid,
            setState: "setPricePageData",
        });
    }

    saveProductPrice(data) {
        return this.fetch({
            url: Api.API_PRICE_PRODUCT_SAVE,
            data: data
        });
    }
}
