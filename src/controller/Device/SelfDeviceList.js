import React from "react";
import withStyles from "material-ui/styles/withStyles";

import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import customStyle from "../../assets/jss/view/custom";
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import {getQueryString} from "../../utils/comUtils";
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
@inject(({store: {deviceState, userState, salesState}}) => ({deviceState, userState, salesState}))
@observer
export default class SelfDeviceList extends PullrefreshPage {

    constructor(props) {
        super(props);
        this.state.chooseDevices = [];
        this.state.openChooseDevicePage = false;
    }

    /*constructor(props) {
        super(props);
        this.state = {
            editItem: {},
            searchIng: false,
            nickname: "",
            submitIng: false,
            searchKeyWords: ""
        };
        this.devicePageAction = this.devicePageAction.bind(this);
        this.handlerSearch = this.handlerSearch.bind(this);
        this.handlerClear = this.handlerClear.bind(this);
    }
    render() {
        const {loginUserData} = this.props.userState;
        const {searchIng, searchKeyWords, openEditDeviceNickname, nickname, submitIng} = this.state;
        const {classes = ""} = this.props;
        const groupUuid = getQueryString("groupUuid");
        const channelCode = getQueryString("channelCode");
        let pageParam = {};
        if (groupUuid) {
            pageParam = {groupUuid: groupUuid};
        } else if (channelCode) {
            pageParam = {channelCode: channelCode};
        }
        let fixBottom = 56 + window.rem2px(3.2);
        if (searchKeyWords) {
            fixBottom += 28;
        }
        return <div>
            <div>
                <SearchInput
                    placeholder="请输入设备号 、SN号"
                    handelSearch={this.handlerSearch}
                    handelClear={this.handlerClear}
                    searchIng={searchIng}
                />
            </div>
            {
                searchKeyWords ? <div className={classes.searchResult}>
                        "{searchKeyWords}"的搜索结果
                    <DeleteOutlinedIcon className={classes.icon} style={style.searchClear} onClick={this.handlerClear}/>
                </div> : ""
            }

            <div className="pull-data-list">
                <PullRefresh
                    ref="pager"
                    pageParam={pageParam}
                    fixBottom={fixBottom}
                    pageAction={this.devicePageAction}
                    renderItem={item => {
                        return <ListItem key={item.deviceId} className={classes.item}>
                            <div>
                                {
                                    loginUserData.type === Const.ROLE.SALES && <p className={classes.infoLine}>
                                        <font className={classes.infoLabel}>别名：</font>{item.consumerName || "无"} <EditIcon color="#e91e63" size='1.2rem' onClick={() => this.editDevice(item)}/>
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
                                    <font className={classes.infoLabel}>SN号：</font>{item.sn}
                                </p>
                                <p className={classes.infoLine}>
                                    <font className={classes.infoLabel}>设备号：</font>{item.deviceId}
                                </p>
                            </div>
                        </ListItem>;
                    }}
                />
            </div>

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
                            inputProps={{
                                value: this.state.nickname
                            }}
                        />
                    </Form>
                }
            />
        </div>;
    }*/

    getPageParam = () => {
        const groupUuid = getQueryString("groupUuid");
        const salesUuid = getQueryString("salesUuid");
        const channelCode = getQueryString("channelCode");
        let pageParam = {};
        if (salesUuid) {
            pageParam = {salesUuid: salesUuid};
        } else if (groupUuid) {
            pageParam = {groupUuid: groupUuid};
        } else if (channelCode) {
            pageParam = {channelCode: channelCode};
        }
        return pageParam;
    };

    pageAction = (data) => {
        return this.props.deviceState.getDevicePage(data);
    };

    renderExt = () => {
        const salesUuid = getQueryString("salesUuid");
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

            <Button
                mini
                variant="fab"
                color="secondary"
                style={style.addButton}
                onClick={() => this.setState({openChooseDevicePage: true})}>
                <AddIcon/>
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
                <DeviceChooseList
                    handelChooseChange={v => this.setState({chooseDevices: v})}/>
            </Dialog>
        </div>;
    };

    listItem = (item) => {
        const {loginUserData} = this.props.userState;
        const {classes = ""} = this.props;
        return <ListItem key={item.deviceId} className={classes.item}>
            <div>
                {
                    loginUserData.type === Const.ROLE.SALES && <p className={classes.infoLine}>
                        <font className={classes.infoLabel}>别名：</font>{item.consumerName || "无"} <EditIcon color="#e91e63" size='1.2rem' onClick={() => this.editDevice(item)}/>
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
        </ListItem>;
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
        this.props.deviceState.saveDeviceInfo({name: nickname, deviceId: editItem.deviceId})
            .then(res => {
                editItem.consumerName = nickname;
                this.setState({submitIng: false, openEditDeviceNickname: false, editItem: editItem});
            })
            .catch(err => this.setState({submitIng: false}));
    };

    handelSaveSaleDevices = () => {
        const groupUuid = getQueryString("groupUuid");
        const {chooseDevices} = this.state;
        if (_.isEmpty(chooseDevices)) {
            this.notification("请选择");
            return;
        }
        this.setState({submitIng: true});
        this.props.salesState.saveSalesDevice({
            groupUuid: groupUuid,
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
