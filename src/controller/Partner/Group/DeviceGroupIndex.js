import React from "react";
import Button from '@material-ui/core/Button';
import withStyles from "material-ui/styles/withStyles";
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import Path from "../../../utils/path";
import {inject, observer} from "mobx-react/index";
import {getQueryString, setTitle} from "../../../utils/comUtils";
import customStyle from "../../../assets/jss/view/custom";
import PullrefreshPage from "../../../components/CommonPage/PullrefreshPage";
import SearchInput from "../../../components/CustomInput/SearchInput";
import ActionCustomItem from "../../../components/CustomItem/ActionCustomItem";

@withStyles(customStyle)
@inject("salesState")
@observer
export default class DeviceGroupIndex extends PullrefreshPage {

    constructor(props) {
        super(props);
        setTitle("合作者分成组");
        this.state.delIng = "";
    }

    // 列表子项
    listItem = (item) => {
        const {classes} = this.props;
        const {delIng} = this.state;
        return <ActionCustomItem
            key={item.id || item.channelCode}
            loading={!!delIng}
            showAction={(delIng && delIng === item.uuid) || !delIng}
            onActionClick={() => this.openDrawerMenu({drawerMenus: [
                    {label: '查看分成组设备', onClick: () => this.deviceGroupDetail(item)},
                    {label: <font color="red">删除分成组</font>, onClick: () => this.deleteGroup(item)},
                ]})}>
            <div>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>名称：</font>{item.name || "未命名"}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>分成比例：</font>{item.parentProportions || 0}%
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>设备数：</font>{item.deviceCount || 0}台
                </p>
                {
                    item.remark && <p className={classes.infoLine}>
                        <font className={classes.infoLabel}>备注：</font>{item.remark}
                    </p>
                }
            </div>
        </ActionCustomItem>;
    };

    renderExt = () => {
        const {classes} = this.props;
        const salesUuid = getQueryString("salesUuid");
        return <Button className={classes.menuBottomButton} onClick={() => this.linkTo(Path.PATH_DEVICE_PARTNER_GROUP_EDIT, {salesUuid: salesUuid})}>
            <AddIcon/> 添加分成组
        </Button>;
    };

    renderSearch = () => {
        const salesUuid = getQueryString("salesUuid");
        return <SearchInput
            placeholder="请输入设备号 、SN号"
            handelSearch={v => this.linkTo(Path.PATH_DEVICE_PARTNER_INDEX, {salesUuid: salesUuid, sno: v})}
        />;
    };

    getFixBottom = () => {
        return 56 + window.rem2px(3.2) + 41;
    };

    // override
    deviceGroupDetail = (item) => {
        this.linkTo(Path.PATH_DEVICE_PARTNER_INDEX, {groupUuid: item.uuid || "", salesUuid: getQueryString("salesUuid")});
    };

    // override
    pageAction = (data) => {
        const salesUuid = getQueryString("salesUuid");
        return this.props.salesState.getPartnerDeviceGroupPageData({salesUuid: salesUuid});
    };

    // override
    deviceListPageAction = (data) => {
        return this.props.deviceState.getDevicePage(data);
    };

    /**
     * 删除分成比例组
     * @param item
     */
    deleteGroup = (item) => {
        this.alert("确认删除吗？", "", () => {
            this.setState({delIng: item.uuid});
            this.props.salesState.deleteDeviceGroup(item.uuid)
                .then(res => {
                    this.setState({delIng: ""});
                    this.handelPageRefresh();
                })
                .catch(err => this.setState({delIng: ""}));
        }, null, true);
    };
}
