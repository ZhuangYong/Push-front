import React from "react";
import DeviceGroup from "../../../components/CommonPage/DeviceGroup";
import Path from "../../../utils/path";
import {inject, observer} from "mobx-react/index";
import {setTitle} from "../../../utils/comUtils";

@inject("deviceState")
@observer
export default class DeviceGroupIndex extends DeviceGroup {
    constructor(props) {
        super(props);
        setTitle("设备组");
    }
    // override
    deviceGroupDetail = (item) => {
        const {type} = item;
        if (type === DeviceGroup.GROUP_TYPE_DEFAULT || type === DeviceGroup.GROUP_TYPE_PARTNER) {
            this.linkTo(Path.PATH_DEVICE_INDEX, {groupUuid: item.uuid || "", isDefault: type === DeviceGroup.GROUP_TYPE_PARTNER ? "partner" : true});
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
