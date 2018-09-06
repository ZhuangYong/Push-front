import React from "react";
import withStyles from "material-ui/styles/withStyles";

import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import customStyle from "../../assets/jss/view/custom";
import Button from '@material-ui/core/Button';
import List from "material-ui/List";
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from "material-ui/List/ListItem";
import ListItemText from "material-ui/List/ListItemText";
import {getQueryString, setTitle} from "../../utils/comUtils";
import AddIcon from '@material-ui/icons/Add';
import Drawer from "material-ui/Drawer";
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
import ActionCustomItem from "../../components/CustomItem/ActionCustomItem";

const style = {
    ...customStyle,
    infoLine: {
        fontSize: '.86rem',
        color: '#555555',
        margin: '.2rem 0',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center'
    },
    infoLabel: {
        color: 'black',
        // width: '5rem',
        fontSize: '.9rem',
        fontWeight: 500,
    },
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
    },
    chooseProportion: {
        backgroundColor: 'rgb(233, 33, 101)',
        color: 'white',
        "&>p": {
            padding: 0,
            margin: '.6rem 1rem',
            height: '1.8rem',
            borderBottom: '1px solid white'
        }
    }
};
@withStyles(style)
@inject("deviceState", "userState", "salesState")
@observer
export default class PartnerDeviceList extends PullrefreshPage {

    constructor(props) {
        super(props);
        setTitle("代理商设备列表");
        this.state.chooseDevices = [];
        this.state.openChooseDevicePage = false;
        this.state.partnerDeviceGroup = [];
        this.state.delIng = "";
        this.state.proportionOpen = false;
        this.state.defaultSearchValue = getQueryString("sno");
        this.state.salesUuid = getQueryString("salesUuid");
        this.state.groupUuid = getQueryString("groupUuid");
    }

    componentDidMount() {
        this.initial();
    }

    getPageParam = () => {
        const {salesUuid} = this.state;
        let pageParam = {};
        if (salesUuid) {
            pageParam = {salesUuid: salesUuid};
        }
        return pageParam;
    };

    pageAction = (data) => {
        const {groupUuid} = this.state;
        return this.props.deviceState.getPartnerDevicePage(groupUuid, data);
    };

    renderExt = () => {
        const {classes} = this.props;
        const {groupUuid, salesUuid, partnerDeviceGroup = [], chooseProportion = {}} = this.state;
        const {openEditDeviceNickname, submitIng, openChooseDevicePage, proportionOpen} = this.state;
        // 如果是分成组则不显示添加
        if (groupUuid) return "";
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

            <Button className={classes.menuBottomButton} style={{bottom: 56}} onClick={() => this.setState({openChooseDevicePage: true})}>
                <AddIcon/> 添加设备
            </Button>

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
                {
                    partnerDeviceGroup.length === 1 && <div className={classes.chooseProportion}>
                        <p style={{border: 'none'}}>
                            分成比例 {chooseProportion.parentProportions}%
                        </p>
                    </div>
                }

                {
                    partnerDeviceGroup.length > 1 && <div className={classes.chooseProportion} onClick={this.openDrawer}>
                        <p>
                            <font>▼</font> 分成比例 {chooseProportion.parentProportions}%, {chooseProportion.name}
                        </p>
                    </div>
                }

                <DeviceChooseList
                    isPartner={true}
                    maxProportions={chooseProportion.parentProportions || 0}
                    fixBottom={window.rem2px(3 + 3) + 1}
                    pageAction={data => this.props.salesState.getPartnerChooseDeviceListData({...(data || {}), salesUuid: salesUuid, groupUuid: groupUuid})}
                    handelChooseChange={v => this.setState({chooseDevices: v})}/>
            </Dialog>

            <Drawer
                anchor="bottom"
                open={proportionOpen}
                disableEnforceFocus={true}
                onClose={this.closeDrawer}>
                <div
                    tabIndex={0}
                    role="button">
                    <div style={{padding: '0.66rem 1rem', borderBottom: '1px solid #dedede'}}>
                        <span>请选择分成比例组</span>
                        <span
                            className={classes.button}
                            style={{float: 'right', color: '#f50057'}}
                            onClick={this.closeDrawer}>
                            取消
                        </span>
                    </div>
                    <List style={{maxHeight: '17.6rem', overflowY: 'scroll'}}>
                        {(partnerDeviceGroup || []).map(item => (
                            <ListItem
                                dense
                                button
                                key={item.id}
                                style={{paddingTop: 0, paddingBottom: 0}}
                                onClick={() => {
                                    if (chooseProportion.id !== item.id) {
                                        this.setState({chooseProportion: item, proportionOpen: false});
                                    }
                                }}
                                className={classes.listItem}
                            >
                                <Checkbox
                                    checked={chooseProportion.id === item.id}
                                    tabIndex={-1}
                                    disableRipple
                                />
                                <ListItemText primary={`（ ${item.parentProportions}% ）` + item.name} style={{padding: 0}} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </div>;
    };

    listItem = (item) => {
        const {delIng, groupUuid} = this.state;
        const {loginUserData} = this.props.userState;
        const {classes = ""} = this.props;
        // const showAction = !!groupUuid;
        const showAction = item.disableUnbind === 2;
        return <ActionCustomItem
            key={item.deviceId}
            loading={!!delIng}
            showAction={((delIng && delIng === item.deviceUuid) || !delIng) && showAction}
            onActionClick={() => this.openDrawerMenu({drawerMenus: [
                // {label: '编辑别名', onClick: () => this.editDevice(item)},
                {label: '解绑设备', onClick: () => this.unBindDevice(item)},
            ]})}>
            <div>
                {
                    // 1不能解绑  2能解绑
                    item.disableUnbind === 1 ? <p className={classes.infoLine}>
                        <font color="red">已经被代理商分配，不能进行其他操作</font>
                    </p> : ""
                }
                {
                    loginUserData.type === Const.ROLE.SALES && <p className={classes.infoLine}>
                        <font className={classes.infoLabel}>别名：</font>{item.consumerName || "无"}
                    </p>
                }
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>机型：</font>{item.channelName}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>分成比例：</font>{item.parentProportions}%
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
                    <font className={classes.infoLabel}>SN号：</font>{item.sn}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>位置：</font>{item.location}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>设备号：</font>{item.deviceId}
                </p>
            </div>
        </ActionCustomItem>;

    };

    getFixBottom = () => {
        const {searchKeyWords, groupUuid} = this.state;
        let fixBottom = 56 + window.rem2px(3.2) + (!groupUuid ? 41 : 0);
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

    handelEditDeviceNickname = () => {
        const {nickname, editItem} = this.state;
        this.setState({submitIng: true});
        this.props.deviceState.saveDeviceInfo({name: nickname, deviceUuid: editItem.deviceUuid, groupUuid: editItem.groupUuid})
            .then(res => {
                editItem.consumerName = nickname;
                this.setState({submitIng: false, openEditDeviceNickname: false, editItem: editItem});
            })
            .catch(err => this.setState({submitIng: false}));
    };

    handelSaveSaleDevices = () => {
        const {groupUuid, salesUuid, chooseProportion = {}} = this.state;
        const defaultGroupUuid = getQueryString("defaultGroupUuid");
        const {chooseDevices} = this.state;
        if (_.isEmpty(chooseDevices)) {
            this.notification("请选择");
            return;
        }
        this.setState({submitIng: true});
        this.props.salesState.saveSalesDevice({
            salesUuid: salesUuid,
            groupUuid: defaultGroupUuid || groupUuid || chooseProportion.uuid,
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

    unBindDevice = (item) => {
        const {salesUuid} = this.state;
        this.alert("确认解绑设备吗？", "", () => {
            this.setState({delIng: item.deviceUuid});
            this.props.salesState.unbindSalesDevice({salesUuid: salesUuid, deviceUuids: [item.deviceUuid]})
                .then(res => {
                    this.setState({delIng: ""});
                    this.handelPageRefresh();
                })
                .catch(err => this.setState({delIng: ""}));
        }, null, true);
    };

    initial = () => {
        const {defaultSearchValue} = this.state;
        if (defaultSearchValue) {
            this.handlerSearch(defaultSearchValue);
        } else {
            this.handelPageRefresh();
        }
        this.getProportion();
    };

    getProportion = () => {
        const {salesUuid} = this.state;
        this.props.salesState.getPartnerDeviceGroupPageData({salesUuid: salesUuid})
            .then(res => this.setState({partnerDeviceGroup: res.data, chooseProportion: (res.data || [])[0]}));
    };

    openDrawer = () => {
        this.setState({proportionOpen: true});
    };

    closeDrawer = () => {
        this.setState({proportionOpen: false});
    };
}

PartnerDeviceList.defaultProps = {
    autoFirstPage: false
};
