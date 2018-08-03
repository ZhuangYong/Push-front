import React from "react";
import withStyles from "material-ui/styles/withStyles";

import Card from '@material-ui/core/Card';

import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import BaseComponent from "../../components/common/BaseComponent";
import customStyle from "../../assets/jss/view/custom";
import SearchInput from "../../components/CustomInput/SearchInput";
import PullRefresh from "../../components/PageContainer/PullRefresh";

@withStyles(customStyle)
@inject(({store: {deviceState}}) => ({deviceState}))
@observer
export default class DeviceIndex extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {};
        this.devicePageAction = this.devicePageAction.bind(this);
    }
    render() {
        return <div>
            <Card style={{padding: 0}}>
                <div>
                    <SearchInput placeholder="请输入设备号"/>
                </div>
            </Card>
            <div style={{padding: 0}}>
                <PullRefresh pageAction={this.devicePageAction} fixBottom={96}/>
            </div>

        </div>;
    }

    devicePageAction(data) {
        return this.props.deviceState.getDeviceGroupPage(data);
    }
}
