import React from "react";
import BaseComponent from "../../components/common/BaseComponent";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import withStyles from "material-ui/styles/withStyles";
import _ from "lodash";

import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import customStyle from "../../assets/jss/view/custom";

import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import PullRefresh from "../../components/PageContainer/PullRefresh";
import Const from "../../utils/const";
import {parseTime} from "../../utils/comUtils";
import DatePicker from 'react-mobile-datepicker';
import Drawer from '@material-ui/core/Drawer';
import CircularProgress from "material-ui/Progress/CircularProgress";


@withStyles({
    ...customStyle,
    ...{
        itemSearch: {
            fontSize: '.8rem'
        },
        timeBound: {
            border: '1px solid #b3b3b3',
            margin: '0 .4rem',
            padding: '.2rem .6rem',
            borderRadius: '.2rem',
            fontSize: '.8rem'
        },
        channelName: {
            width: '5rem',
            fontSize: '.8rem',
            textAlign: 'center',
            overflow: 'hidden',
            display: 'block',
            height: '1.6rem',
            borderBottom: ".1rem solid gray",
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        }
    }
})
@inject(({store: {userState, statisticsState}}) => ({userState, statisticsState}))
@observer
export default class Index extends BaseComponent {

    constructor(props) {
        super(props);
        const startTime = this.formatTime(new Date().getTime() - 1000 * 60 * 60 * 24 * 6);
        const endTime = this.formatTime(new Date());
        this.state = {
            deviceIncomeData: "",
            channelListData: "",
            startTime: startTime,
            endTime: endTime,
            chooseChannel: "",
            chooseChannelName: "",
            startTimeOpen: false,
            endTimeOpen: false,
            channelOpen: false,
            loading: false
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userState.loginUserData !== this.state.loginUserData) {
            this.setState({loginUserData: prevProps.userState.loginUserData});
            this.initial();
        }
    }
    componentDidMount() {
        this.initial();
    }
    render() {
        const {classes = ""} = this.props;
        const {deviceIncomeData, channelListData, startTime, endTime, startTimeOpen, endTimeOpen, channelOpen, chooseChannel, chooseChannelName, loading} = this.state;
        const {loginUserData} = this.props.userState;

        return <div>
            <div style={{padding: 0}}>
                {
                    loginUserData.type === Const.ROLE.MANUFACTURE && <div>
                        <Card className={classes.card} style={{borderRadius: 0}}>
                            <List className={classes.list}>
                                <ListItem className={classes.item + " " + classes.itemSearch}>
                                    开始: <font className={classes.timeBound} onClick={() => this.setState({startTimeOpen: true})}>{startTime}</font>
                                    结束: <font className={classes.timeBound} onClick={() => this.setState({endTimeOpen: true})}>{endTime}</font>
                                    <ListItemSecondaryAction className={classes.secondary}>
                                        {
                                            channelListData && <span className={classes.channelName} onClick={() => this.setState({channelOpen: true})}>
                                                {
                                                    chooseChannelName || "机型 ▽"
                                                }
                                            </span>
                                        }
                                    </ListItemSecondaryAction>
                                </ListItem>
                                {
                                    loading && <div style={{backgroundColor: '#eeeeee', textAlign: 'center', paddingTop: '.3rem', borderTop: '1px solid #dedede'}}>
                                        <CircularProgress color="secondary" size={22} />
                                    </div>
                                }

                                <ListItem className={classes.item}>
                                    <ListItemText
                                        primary="套餐购买总量"
                                    />
                                    <ListItemSecondaryAction className={classes.secondary}>
                                        {deviceIncomeData.orderCount}
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem className={classes.item} style={{paddingBottom: 0}}>
                                    <ListItemText
                                        primary={<p>套餐占比：<font style={{fontSize: '.72rem', color: 'gray'}}>（ {!_.isEmpty(deviceIncomeData.list) ? "左右拖动查看更多" : "暂无"} ）</font></p>}
                                    />
                                </ListItem>
                                <ListItem className={classes.item} style={{padding: '0 .4rem', borderTop: 'none'}}>
                                    <div style={{minWidth: '100%'}}>
                                        <div style={{backgroundColor: '#f1f1f1', overflowX: "scroll"}}>
                                            <Table className={classes.table}>
                                                {
                                                    !_.isEmpty(deviceIncomeData.list) && <TableHead>
                                                        <TableRow style={{height: '1rem'}}>
                                                            {
                                                                deviceIncomeData.list.map((s, index) => <TableCell key={index} style={{whiteSpace: 'nowrap', padding: '0 16px'}}>
                                                                    {s.productName}
                                                                </TableCell>)
                                                            }
                                                        </TableRow>
                                                    </TableHead>
                                                }
                                                {
                                                    !_.isEmpty(deviceIncomeData.list) && <TableBody>
                                                        <TableRow>
                                                            {
                                                                deviceIncomeData.list.map((s, index) => <TableCell key={index} style={{whiteSpace: 'nowrap', padding: '0 16px'}}>
                                                                    {s.count}
                                                                </TableCell>)
                                                            }
                                                        </TableRow>
                                                    </TableBody>
                                                }
                                            </Table>
                                        </div>
                                    </div>
                                </ListItem>
                                <ListItem className={classes.item}>
                                    <ListItemText
                                        primary="套餐总额"
                                    />
                                    <ListItemSecondaryAction className={classes.secondary}>
                                        {deviceIncomeData.total} 元
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem className={classes.item}>
                                    <ListItemText
                                        primary="激活设备量"
                                    />
                                    <ListItemSecondaryAction className={classes.secondary}>
                                        {deviceIncomeData.activeCount}
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem className={classes.item}>
                                    <ListItemText
                                        primary="活跃设备量"
                                    />
                                    <ListItemSecondaryAction className={classes.secondary}>
                                        {deviceIncomeData.runCount}
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem className={classes.item}>
                                    <ListItemText
                                        primary="新注册设备量"
                                    />
                                    <ListItemSecondaryAction className={classes.secondary}>
                                        {deviceIncomeData.registerCount}
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        </Card>

                        <DatePicker
                            value={this.formatTimeToDate(startTime)}
                            isOpen={startTimeOpen}
                            theme={"ios"}
                            onSelect={v => {
                                const _startTime = this.formatTime(v);
                                this.setState({startTimeOpen: false, startTime: _startTime, endTime: _startTime > endTime ? _startTime : endTime});
                                this.state.startTime = _startTime;
                                this.refreshIncomeStatic();
                            }}
                            onCancel={() => this.setState({startTimeOpen: false})}/>

                        <DatePicker
                            value={this.formatTimeToDate(endTime)}
                            isOpen={endTimeOpen}
                            theme={"ios"}
                            min={this.formatTimeToDate(startTime)}
                            onSelect={v => {
                                const endTime = this.formatTime(v);
                                this.setState({endTimeOpen: false, endTime: endTime});
                                this.state.endTime = endTime;
                                this.refreshIncomeStatic();
                            }}
                            onCancel={() => this.setState({endTimeOpen: false})}/>

                        <Drawer anchor="bottom" open={channelOpen} onClose={() => this.setState({channelOpen: false})}>
                            <div
                                tabIndex={0}
                                role="button"
                                onClick={f => f}
                                onKeyDown={f => f}
                            >
                                <List style={{maxHeight: '16rem'}}>
                                    {(channelListData || []).map(item => (
                                        <ListItem
                                            dense
                                            button
                                            key={item.id}
                                            style={{paddingTop: 0, paddingBottom: 0}}
                                            onClick={() => {
                                                if (chooseChannel === item.code) {
                                                    this.setState({chooseChannel: "", chooseChannelName: "", channelOpen: false});
                                                    this.state.chooseChannel = "";
                                                } else {
                                                    this.setState({chooseChannel: item.code, chooseChannelName: item.name, channelOpen: false});
                                                    this.state.chooseChannel = item.code;
                                                }
                                                this.refreshIncomeStatic();
                                            }}
                                            className={classes.listItem}
                                        >
                                            <Checkbox
                                                checked={chooseChannel === item.code}
                                                tabIndex={-1}
                                                disableRipple
                                            />
                                            <ListItemText primary={item.name} />
                                        </ListItem>
                                    ))}
                                </List>
                            </div>
                        </Drawer>
                    </div>
                }
                {
                    loginUserData.type === Const.ROLE.SALES && <PullRefresh
                        ref="pager"
                        pageAction={this.incomePageAction}
                        renderItem={item => {
                            return <ListItem key={item.deviceId} className={classes.item}>
                                <ListItemText
                                    primary={<span><font className={classes.infoLabel}>设备名：</font><font>{item.deviceName || "未设置"}</font></span>}
                                    secondary={<font style={{fontSize: '.8rem'}}>设备号 {item.deviceId}</font>}
                                />
                                <ListItemSecondaryAction className={classes.secondary}>
                                    {item.amount} 元
                                </ListItemSecondaryAction>
                            </ListItem>;
                        }}
                    />
                }

            </div>
        </div>;
    }

    initial = () => {
        const {loginUserData} = this.props.userState;
        if (loginUserData.type === Const.ROLE.MANUFACTURE) {
            this.refreshIncomeStatic();
            this.props.statisticsState.getIndexStatisticsChannelListData()
                .then(res => this.setState({channelListData: res}))
                .catch();
        }
    };

    incomePageAction = (data) => {
        return this.props.userState.getUserIncomeInfo(data);
    };

    refreshIncomeStatic = () => {
        const {startTime, endTime, chooseChannel} = this.state;
        const param = {
            startTime: startTime,
            endTime: endTime,
            channelCode: chooseChannel
        };
        this.setState({loading: true});
        this.incomePageAction(param)
            .then(res => this.setState({deviceIncomeData: res, loading: false}))
            .catch(err => this.setState({loading: false}));
    };

    formatTime = (date) => {
        if (!date) date = new Date();
        if (typeof date === "number") date = new Date(date);
        if (typeof date === "string") date = new Date(date.replace(/-/g, "/"));
        return parseTime(date.getTime(), '{y}-{m}-{d}');
    };

    formatTimeToDate = (date) => {
        return new Date(this.formatTime(date).replace(/-/g, "/"));
    };

}
