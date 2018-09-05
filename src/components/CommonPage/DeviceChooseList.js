import React from "react";
import PropTypes from "prop-types";
import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import PullrefreshPage from "../../components/CommonPage/PullrefreshPage";

import customStyle from "../../assets/jss/view/custom";

const style = {
    ...customStyle,
};
@inject("deviceState", "userState")
@observer
export default class DeviceChooseList extends PullrefreshPage {

    constructor(props) {
        super(props);
        this.state.chooseDevices = [];
    }

    // override 获取分页参数
    // getPageParam = () => {
    //     return {};
    // };

    // 分页接口
    pageAction = (data) => {
        const {pageAction} = this.props;
        if (pageAction) {
            return pageAction(data);
        } else {
            return this.props.deviceState.getDeviceChoosePage(data);
        }
    };

    // 列表子项
    listItem = (item) => {
        const parentProportions = item.parentProportions;
        const {classes = "", isPartner, maxProportions} = this.props;
        const {chooseDevices} = this.state;
        const canAdd = !isPartner || parentProportions >= maxProportions;

        return <ListItem
            key={item.deviceId}
            style={{...style.item, padding: 0}}
            onClick={canAdd ? () => this.changeChoose(item.deviceUuid) : f => f}>
            <Checkbox
                disabled={!canAdd}
                indeterminate={!canAdd}
                checked={chooseDevices.indexOf(item.deviceUuid) >= 0}
                disableRipple
            />
            <ListItemText
                style={{padding: '.6rem .2rem'}}
                primary={ <span className={classes.infoLine}>
                    {
                        item.toSalesName ? <font color="red">已经被分配给：{item.toSalesName}<br/></font> : ""
                    }
                    <font className={classes.infoLabel}>机型：</font>{item.channelName}
                </span>}
                secondary={
                    <span className={classes.infoLine}>
                            <font className={classes.infoLabel}>分成比例：</font>{item.parentProportions} % {!canAdd && <font color="red">（ 比例不匹配 ）</font>}
                        <br/>
                            <font className={classes.infoLabel}>SN号：</font>{item.sn}
                        <br/>
                            <font className={classes.infoLabel}>设备号：</font>{item.deviceId}
                        </span>
                }
            />
        </ListItem>;
    };

    getFixBottom = () => {
       const {fixBottom} = this.props;
        return fixBottom + window.rem2px(3.2);
    };

    changeChoose = (deviceUuid) => {
        const {handelChooseChange} = this.props;
        const {chooseDevices} = this.state;
        if (chooseDevices.indexOf(deviceUuid) >= 0) {
            const _chooseDevices = chooseDevices.filter(id => id !== deviceUuid);
            this.setState({chooseDevices: _chooseDevices});
            handelChooseChange(_chooseDevices);
        } else {
            chooseDevices.push(deviceUuid);
            this.setState({chooseDevices: chooseDevices});
            handelChooseChange(chooseDevices);
        }
    };
}

DeviceChooseList.propTypes = {
    isPartner: PropTypes.bool,
    maxProportions: PropTypes.number,
    salesUuid: PropTypes.string,
    pageAction: PropTypes.func,
    fixBottom: PropTypes.number,
    handelChooseChange: PropTypes.func
};

DeviceChooseList.defaultProps = {
    isPartner: false,
    maxProportions: 100,
    salesUuid: "",
    fixBottom: 0,
    handelChooseChange: f => f
};
