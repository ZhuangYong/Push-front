import baseState from "./baseState";
import {action, observable} from "mobx";
import Api from "../utils/api";

export default class statisticsState extends baseState {

    @observable
    indexStatisticsData = "";

    @action
    setIndexStatisticsData(data) {
        this.indexStatisticsData = data;
    }

    getIndexStatisticsData(data) {
        this.fetch({
            url: Api.API_STATIS_INDEX,
            setState: "setIndexStatisticsData",
            data
        });
    }
}
