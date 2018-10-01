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
        return this.fetch({
            url: Api.API_STATISTICS_INDEX,
            setState: "setIndexStatisticsData",
            data
        });
    }

}
