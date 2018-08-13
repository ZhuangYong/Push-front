import React from "react";
import BaseComponent from "../components/common/BaseComponent";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import withStyles from "material-ui/styles/withStyles";

import ListItemIcon from '@material-ui/core/ListItemIcon';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from "@material-ui/icons/KeyboardArrowRight";

import customStyle from "../assets/jss/view/custom";

import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import Path from "../utils/path";

import ktvIcon from "../assets/img/icon/ktv.png";
import percentIcon from "../assets/img/icon/percent.png";
import incomeIcon from "../assets/img/icon/income.png";
import totalIncomeIcon from "../assets/img/icon/totalIncome.png";

import vipTotalIncomeIcon from "../assets/img/icon/vip_total_income.png";
import vipTotalDeviceIcon from "../assets/img/icon/vip_total_device.png";
import vipExpiredIcon from "../assets/img/icon/vip_expired.png";
import totalDeviceIcon from "../assets/img/icon/total_device.png";
import activationDeviceIcon from "../assets/img/icon/activation_device.png";
import registerDeviceIcon from "../assets/img/icon/register_device.png";
import activeIcon from "../assets/img/icon/active.png";

import defaultImage from "../assets/img/default-avatar.png";
import Const from "../utils/const";

@withStyles({
    ...customStyle,
    ...{
        gradeItem: {
            margin: 0,
            backgroundColor: 'white',
            backgroundRepeat: 'no-repeat',
            padding: '.6rem .6rem .6rem 4rem',
            borderBottom: '1px solid #dedede',
            backgroundSize: 'auto 60%',
            backgroundPosition: '.6rem center'
        },
        gradeItemPrimary: {
            fontSize: '1rem',
            fontWeight: 400,
            margin: 0
        },
        gradeItemPrimaryRight: {
            float: 'right',
            fontSize: '1.4rem'
        },
        gradeItemSecond: {
            margin: '.2rem 0 0 0',
            fontSize: '.8rem'
        },
        picture: {
            width: '4rem',
            height: '4rem',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        },
        nickname: {
            margin: 0,
            color: 'white',
            fontSize: '1.4rem',
            textShadow: '1px 1px 4px black'
        },
        viewName: {
            margin: 0,
            color: 'white',
            fontSize: '1rem',
            textShadow: '1px 1px 4px black'
        },
        staticsTitle: {
            margin: 0,
            fontSize: '.9rem',
            padding: '.2rem .6rem',
            backgroundColor: '#e4e3e3',
        },
        deviceUserInfo: {
            top: '4rem',
            right: '.6rem',
            color: 'white',
            position: 'absolute',
            textShadow: '1px 1px 4px black'
        }
    }
})
@inject(({store: {statisticsState, userState}}) => ({statisticsState, userState}))
@observer
export default class Index extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {};
        this.refreshStatistics = this.refreshStatistics.bind(this);
    }
    componentDidMount() {
        this.refreshStatistics();
    }
    render() {
        const {loginUserData} = this.props.userState;
        const {indexStatisticsData} = this.props.statisticsState;
        const {classes = ""} = this.props;
        return <div>
                {
                    loginUserData.type === Const.ROLE.MANUFACTURE && <div>
                        <Card className={classes.card} style={{border: 'none'}}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="Recipe" className={classes.avatar}>
                                        <div className={classes.picture} style={{backgroundImage: `url(${loginUserData.headImg || defaultImage})`}}>
                                        </div>
                                    </Avatar>
                                }
                                title={<p className={classes.nickname}>{loginUserData.viewName}</p>}
                                action={<p className={classes.deviceUserInfo} onClick={() => this.linkTo(Path.PATH_USER_INCOME_INFO)}>
                                    设备使用数据 ▷
                                </p>}
                                className={classes.carHeader}
                            />
                        </Card>
                        <div>
                           <div className={classes.gradeItem} style={{backgroundImage: `url(${vipTotalIncomeIcon})`}}>
                               <p className={classes.gradeItemPrimary}>
                                   VIP收入总额 <font className={classes.gradeItemPrimaryRight}>{indexStatisticsData.amount}元</font>
                               </p>
                               <p className={classes.gradeItemSecond}>
                                   今日增长 {indexStatisticsData.dayAmount} 元
                               </p>
                           </div>
                            <div className={classes.gradeItem} style={{backgroundImage: `url(${vipTotalDeviceIcon})`}}>
                                <p className={classes.gradeItemPrimary}>
                                    vip设备数量 <font className={classes.gradeItemPrimaryRight}>{indexStatisticsData.vipDeviceCount}</font>
                                </p>
                                <p className={classes.gradeItemSecond}>
                                    今日增长 {indexStatisticsData.dayVipDeviceCount} 台
                                </p>
                            </div>
                            <div className={classes.gradeItem} style={{backgroundImage: `url(${vipExpiredIcon})`}}>
                                <p className={classes.gradeItemPrimary}>
                                    vip过期设备数量 <font className={classes.gradeItemPrimaryRight}>{indexStatisticsData.expireCount}</font>
                                </p>
                                <p className={classes.gradeItemSecond}>
                                    今日增长 {indexStatisticsData.dayExpireCount} 台
                                </p>
                            </div>
                            <div className={classes.gradeItem} style={{backgroundImage: `url(${totalDeviceIcon})`}}>
                                <p className={classes.gradeItemPrimary}>
                                    设备总数 <font className={classes.gradeItemPrimaryRight}>{indexStatisticsData.deviceCount}</font>
                                </p>
                                <p className={classes.gradeItemSecond}>
                                    今日增长 {indexStatisticsData.dayDeviceCount} 台
                                </p>
                            </div>
                            <div className={classes.gradeItem} style={{backgroundImage: `url(${activationDeviceIcon})`}}>
                                <p className={classes.gradeItemPrimary}>
                                    激活设备数 <font className={classes.gradeItemPrimaryRight}>{indexStatisticsData.activeCount}</font>
                                </p>
                                <p className={classes.gradeItemSecond}>
                                    今日增长 {indexStatisticsData.dayActiveCount} 台
                                </p>
                            </div>
                            <div className={classes.gradeItem} style={{backgroundImage: `url(${registerDeviceIcon})`}}>
                                <p className={classes.gradeItemPrimary}>
                                    注册设备数 <font className={classes.gradeItemPrimaryRight}>{indexStatisticsData.registerCount}</font>
                                </p>
                                <p className={classes.gradeItemSecond}>
                                    今日增长 {indexStatisticsData.dayRegisterCount} 台
                                </p>
                            </div>
                            <div className={classes.gradeItem} style={{backgroundImage: `url(${activeIcon})`}}>
                                <p className={classes.gradeItemPrimary}>
                                    本月活跃量 <font className={classes.gradeItemPrimaryRight}>{indexStatisticsData.runCount}</font>
                                </p>
                                <p className={classes.gradeItemSecond}>
                                    今日增长 {indexStatisticsData.dayRunCount} 台
                                </p>
                            </div>
                        </div>
                    </div>
                }

                {
                    loginUserData.type === Const.ROLE.SALES && <Card className={classes.card} style={{borderRadius: 0}}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="Recipe" className={classes.avatar}>
                                    <div className={classes.picture} style={{backgroundImage: `url(${loginUserData.headImg || defaultImage})`}}>
                                    </div>
                                </Avatar>
                            }
                            title={<p className={classes.nickname}>{loginUserData.nickName}</p>}
                            subheader={<p className={classes.viewName}>{loginUserData.viewName}</p>}
                            action={<p className={classes.deviceUserInfo} onClick={() => this.linkTo(Path.PATH_USER_INCOME_INFO)}>
                                收入概况 ▷
                            </p>}
                            className={classes.carHeader}
                        />
                        <div>
                            <p className={classes.staticsTitle}>
                                统计概要
                            </p>
                        </div>

                        <List className={classes.list}>
                            <ListItem className={classes.item}>
                                <ListItemIcon>
                                    <img src={ktvIcon} className={classes.itemIcon}/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="设备数"
                                />
                                <ListItemSecondaryAction className={classes.secondary}>
                                    {indexStatisticsData.deviceCount}
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem className={classes.item}>
                                <ListItemIcon>
                                    <img src={percentIcon} className={classes.itemIcon}/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="分成比例"
                                />
                                <ListItemSecondaryAction className={classes.secondary}>
                                    {indexStatisticsData.proportion}
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem className={classes.item}>
                                <ListItemIcon>
                                    <img src={incomeIcon} className={classes.itemIcon}/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="收入总金额"
                                />
                                <ListItemSecondaryAction className={classes.secondary}>
                                    {indexStatisticsData.allAmount}
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem className={classes.item}>
                                <ListItemIcon>
                                    <img src={totalIncomeIcon} className={classes.itemIcon}/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="累计分红"
                                />
                                <ListItemSecondaryAction className={classes.secondary}>
                                    {indexStatisticsData.getAmount}
                                </ListItemSecondaryAction>
                            </ListItem>

                            <div>
                                <p className={classes.staticsTitle}>
                                    最近收入
                                </p>
                            </div>

                            <ListItem className={classes.item}>
                                <ListItemText
                                    primary="今日收入"
                                />
                                <ListItemSecondaryAction className={classes.secondary}>
                                    {indexStatisticsData.dayAmount}
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem className={classes.item}>
                                <ListItemText
                                    primary="昨日收入"
                                />
                                <ListItemSecondaryAction className={classes.secondary}>
                                    {indexStatisticsData.yesterdayAmount}
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem className={classes.item}>
                                <ListItemText
                                    primary="本周收入"
                                />
                                <ListItemSecondaryAction className={classes.secondary}>
                                    {indexStatisticsData.sevenAmount}
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </Card>
                }

            {/*{
                loginUserData.type === Const.ROLE.SALES && <Card style={{marginTop: 10, borderRadius: 0, boxShadow: 'none', borderTop: '1px solid #dedede', borderBottom: '1px solid #dedede'}}>
                    <List className={classes.list}>
                        <ListItem onClick={() => this.linkTo(Path.PATH_USER_INCOME_INFO)}>
                            <ListItemText
                                primary="收入概况"
                            />
                            <ListItemSecondaryAction onClick={() => this.linkTo(Path.PATH_USER_INCOME_INFO)}>
                                <IconButton>
                                    <ArrowForwardIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </Card>
            }*/}
        </div>;
    }

    refreshStatistics() {
        this.props.statisticsState.getIndexStatisticsData();
    }
}
