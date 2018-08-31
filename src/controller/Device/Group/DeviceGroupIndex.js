import React from "react";
import DeviceGroup from "../../../components/CommonPage/DeviceGroup";
import Path from "../../../utils/path";
import {inject, observer} from "mobx-react/index";

@inject(({store: {deviceState}}) => ({deviceState}))
@observer
export default class DeviceGroupIndex extends DeviceGroup {

    // override
    deviceGroupDetail = (item) => {
        const {isDefault} = item;
        if (isDefault === 1) {
            this.linkTo(Path.PATH_DEVICE_INDEX, {groupUuid: item.uuid || ""});
        } else {
            this.props.deviceState.setDeviceGroupDetailData(item);
            this.linkTo(Path.PATH_DEVICE_GROUP_SELF_DETAIL, {groupUuid: item.uuid || "", channelCode: item.channelCode || ""});
        }
    };

    // override
    deviceGroupPageAction = (data) => {
        return this.props.deviceState.getDeviceGroupPage(data);
    };

    // override
    deviceListPageAction = (data) => {
        return this.props.deviceState.getDevicePage(data);
    };
}
