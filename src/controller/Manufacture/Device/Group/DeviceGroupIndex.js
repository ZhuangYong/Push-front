import React from "react";
import DeviceGroup from "../../../../components/CommonPage/DeviceGroup";
import Path from "../../../../utils/path";
import {inject, observer} from "mobx-react/index";
import {setTitle} from "../../../../utils/comUtils";

@inject("deviceState")
@observer
export default class DeviceGroupIndex extends DeviceGroup {

    constructor(props) {
        super(props);
        setTitle("设备组");
    }
    // override
    deviceGroupDetail = (item) => {
        this.linkTo(Path.PATH_DEVICE_INDEX, {channelCode: item.channelCode || ""});
    };

    // override
    deviceGroupPageAction = (data) => {
        return this.props.deviceState.getDeviceGroupPage(data);
    };

    // override
    deviceListPageAction = (data) => {
        return this.props.deviceState.getDevicePage(data);
    };

    getFixBottom = () => {
        const {searchKeyWords} = this.state;
        let fixBottom = 56 + window.rem2px(3.2);
        if (searchKeyWords) {
            fixBottom += 28;
        }
        return fixBottom;
    };

    renderExt = () => {
        return "";
    };

}
