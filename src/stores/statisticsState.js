import baseState from "./baseState";
import {action, observable} from "mobx";
import Api from "../utils/api";

export default class statisticsState extends baseState {

    @observable
    indexStatisticsData = "";
    @observable
    IndexStatisticsChannelListData = "";
    @observable
    testData = "";

    @action
    setIndexStatisticsData(data) {
        this.indexStatisticsData = data;
    }
    @action
    setIndexStatisticsChannelList(data) {
        this.IndexStatisticsChannelListData = data;
    }

    getIndexStatisticsData(data) {
        return this.fetch({
            url: Api.API_STATIS_INDEX,
            setState: "setIndexStatisticsData",
            data
        });
    }

    getIndexStatisticsChannelListData(data) {
        return this.fetch({
            url: Api.API_STATIS_CHANNEL_LIST,
            setState: "setIndexStatisticsChannelList",
            data
        });
    }
}
