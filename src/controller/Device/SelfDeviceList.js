import React from "react";
import withStyles from "material-ui/styles/withStyles";
import propTypes from "prop-types";
import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import customStyle from "../../assets/jss/view/custom";
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import {getQueryString, setTitle} from "../../utils/comUtils";
import {EditIcon} from "../../components/common/SvgIcons";
import AddIcon from '@material-ui/icons/Add';
import Const from "../../utils/const";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import CustomInput from "../../components/CustomInput/CustomInput";
import Form from "../../components/Form/BaseForm";
import PullrefreshPage from "../../components/CommonPage/PullrefreshPage";
import DeviceChooseList from "../../components/CommonPage/DeviceChooseList";
import CircularProgress from "material-ui/Progress/CircularProgress";
import AppHeader from "../../components/Header/AppHeader";
import Dialog from '@material-ui/core/Dialog';
import _ from "lodash";
import Path from "../../utils/path";
import ActionCustomItem from "../../components/CustomItem/ActionCustomItem";

const style = {
    ...customStyle,
    searchClear: {
        position: 'absolute',
        right: 12,
        top: 2
    },
    addButton: {
        position: 'fixed',
        bottom: 62,
        right: '.4rem',
        opacity: '.6'
    }
};
@withStyles(style)
@inject("deviceState", "userState", "salesState")
@observer
export default class SelfDeviceList extends PullrefreshPage {

    constructor(props) {
        super(props);
        setTitle("设备列表");
        this.state.chooseDevices = [];
        this.state.openChooseDevicePage = false;
        this.state.groupUuid = getQueryString("groupUuid");
        this.state.salesUuid = getQueryString("salesUuid");
        this.state.channelCode = getQueryString("channelCode");
        this.state.isDefault = getQueryString("isDefault");
    }

    getPageParam = () => {
        const {salesUuid, channelCode} = this.state;
        let pageParam = {};
        if (salesUuid) {
            pageParam = {salesUuid: salesUuid};
        } else if (channelCode) {
            pageParam = {channelCode: channelCode};
        }
        return pageParam;
    };

    pageAction = (data) => {
        const {groupUuid} = this.state;
        return this.props.deviceState.getDevicePage(groupUuid, data);
    };

    renderExt = () => {
        const {classes} = this.props;
        const {isDefault} = this.state;
        const showAction = !isDefault;
        const {openEditDeviceNickname, submitIng, openChooseDevicePage} = this.state;
        return <div>
            <CustomDialog
                title="修改设备别名"
                open={openEditDeviceNickname}
                handelClose={() => this.setState({openEditDeviceNickname: false})}
                handleSure={() => this.handelEditDeviceNickname()}
                loading={submitIng}
                content={
                    <Form
                        ref="form"
                        setState={this.stateFun}>
                        <CustomInput
                            labelText="设备别名"
                            name="nickname"
                            value={this.state.nickname}
                        />
                    </Form>
                }
            />

            {
                showAction && <Button className={classes.menuBottomButton} style={{bottom: 56}} onClick={() => this.setState({openChooseDevicePage: true})}>
                    <AddIcon/> 添加设备
                </Button>
            }

            <Dialog
                ref="openedFullPage"
                fullScreen
                open={openChooseDevicePage}
                onClose={this.closeChooseDevicePage}
                TransitionComponent={this.TransitionUp}>
                <AppHeader
                    onClose={this.closeChooseDevicePage}
                    title="选择所要分配的设备"
                    fullPageToolButtons={{
                        right: submitIng ? <CircularProgress color="inherit" size={14}/> : <div onClick={this.handelSaveSaleDevices}>
                            确定
                        </div>
                    }}/>
                <DeviceChooseList
                    fixBottom={window.rem2px(3) + 1}
                    handelChooseChange={v => this.setState({chooseDevices: v})}/>
            </Dialog>
        </div>;
    };

    listItem = (item) => {
        const {loginUserData} = this.props.userState;
        const {classes = ""} = this.props;
        const {delIng, isDefault} = this.state;
        const showAction = !isDefault;
        return <ActionCustomItem
            key={item.deviceId}
            loading={!!delIng}
            className={classes.item}
            showAction={((delIng && delIng === item.uuid) || !delIng) && showAction}
            onActionClick={() => this.openDrawerMenu({drawerMenus: [
                    {label: '修改别名', onClick: () => this.editDevice(item)},
                    {label: '解绑设备', onClick: () => this.unBindDevice(item)},
                ]})}>
            <div>
                {
                    loginUserData.type === Const.ROLE.SALES && <p className={classes.infoLine}>
                        <font className={classes.infoLabel}>别名：</font>{item.consumerName || "无"}
                    </p>
                }
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>机型：</font>{item.channelName}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>收入总额：</font><font color="red">￥{item.total}</font>
                </p>
                {
                    loginUserData.type === Const.ROLE.SALES && <p className={classes.infoLine}>
                        <font className={classes.infoLabel}>投放时间：</font>{item.putTime}
                    </p>
                }
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>位置：</font>{item.location}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>SN号：</font>{item.sn}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>设备号：</font>{item.deviceId}
                </p>
            </div>
        </ActionCustomItem>;
    };

    getFixBottom = () => {
        const {searchKeyWords, isDefault} = this.state;
        const showAction = !isDefault;
        let fixBottom = 56 + window.rem2px(3.2) + (showAction ? 41 : 0);
        if (searchKeyWords) {
            fixBottom += 28;
        }
        return fixBottom;
    };

    editDevice = (item) => {
        this.setState({
            openEditDeviceNickname: true,
            editItem: item,
            nickname: item.consumerName
        });
    };

    unBindDevice = (item) => {
        this.alert("确认解绑设备吗？", "", () => {
            this.setState({delIng: item.deviceUuid});
            this.props.deviceState.unbindSalesDevice({deviceUuids: [item.deviceUuid]})
                .then(res => {
                    this.setState({delIng: ""});
                    this.handelPageRefresh();
                })
                .catch(err => this.setState({delIng: ""}));
        }, null, true);
    };

    handelEditDeviceNickname = () => {
        const {nickname, editItem, groupUuid} = this.state;
        this.setState({submitIng: true});
        this.props.deviceState.saveDeviceName({name: nickname, deviceUuid: editItem.deviceUuid, groupUuid: groupUuid})
            .then(res => {
                editItem.consumerName = nickname;
                this.setState({submitIng: false, openEditDeviceNickname: false, editItem: editItem});
            })
            .catch(err => this.setState({submitIng: false}));
    };

    handelSaveSaleDevices = () => {
        const {groupUuid} = this.state;
        const {chooseDevices} = this.state;
        if (_.isEmpty(chooseDevices)) {
            this.notification("请选择");
            return;
        }
        this.setState({submitIng: true});
        this.props.deviceState.saveChooseDevice({
            teamUuid: groupUuid,
            deviceUuids: chooseDevices
        })
            .then(res => {
                this.setState({submitIng: false});
                this.closeChooseDevicePage();
                this.refs.pager.handRefreshing();
            })
            .catch(err => {
                this.setState({submitIng: false});
            });
    };

    /**
     * 关闭选择设备弹出页面
     */
    closeChooseDevicePage = () => {
        this.setState({openChooseDevicePage: false});
    };
}

SelfDeviceList.propTypes = {
    addDevice: propTypes.bool
};
