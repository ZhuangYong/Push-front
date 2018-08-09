import React from "react";
import BaseComponent from "../components/common/BaseComponent";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import withStyles from "material-ui/styles/withStyles";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from "@material-ui/icons/KeyboardArrowRight";
import GridList from '@material-ui/core/GridList';

import customStyle from "../assets/jss/view/custom";

import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import Path from "../utils/path";

import defaultImage from "../assets/img/default-avatar.png";
import Const from "../utils/const";

@withStyles({
    ...customStyle,
    ...{
        gradeItem: {
            margin: '.6rem',
            padding: '.6rem',
            backgroundColor: 'white',
            borderRadius: '.4rem',
            border: '1px solid #dedede',
            boxShadow: '1px 2px 5px 0px rgba(206, 206, 206, 0.2)'
        },
        gradeItemPrimary: {
            fontWeight: 400,
            margin: 0
        },
        gradeItemPrimaryRight: {
            float: 'right',
            fontSize: '1.4rem'
        },
        gradeItemSecond: {
            margin: '.2rem 0 0 0',
            borderTop: '1px solid #e0e0e0',
            fontSize: '.8rem'
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
                        <Card className={classes.card} style={{borderRadius: 0, boxShadow: 'none'}}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="Recipe" className={classes.avatar}>
                                        <img src={loginUserData.headImg || defaultImage} style={{maxWidth: '100%', maxHeight: '100%'}}/>
                                    </Avatar>
                                }
                                title={loginUserData.viewName}
                                action={<p style={{position: 'absolute', top: '4rem', right: '.6rem'}} onClick={() => this.linkTo(Path.PATH_USER_INCOME_INFO)}>
                                    设备使用数据 ▷
                                </p>}
                                className={classes.carHeader}
                            />
                        </Card>
                        <div>
                           <div className={classes.gradeItem}>
                               <p className={classes.gradeItemPrimary}>
                                   VIP收入总额 <font className={classes.gradeItemPrimaryRight}>{indexStatisticsData.amount}元</font>
                               </p>
                               <p className={classes.gradeItemSecond}>
                                   今日增长 {indexStatisticsData.dayAmount} 元
                               </p>
                           </div>
                            <div className={classes.gradeItem}>
                                <p className={classes.gradeItemPrimary}>
                                    vip设备数量 <font className={classes.gradeItemPrimaryRight}>{indexStatisticsData.vipDeviceCount}</font>
                                </p>
                                <p className={classes.gradeItemSecond}>
                                    今日增长 {indexStatisticsData.dayVipDeviceCount} 台
                                </p>
                            </div>
                            <div className={classes.gradeItem}>
                                <p className={classes.gradeItemPrimary}>
                                    vip过期设备数量 <font className={classes.gradeItemPrimaryRight}>{indexStatisticsData.expireCount}</font>
                                </p>
                                <p className={classes.gradeItemSecond}>
                                    今日增长 {indexStatisticsData.dayExpireCount} 台
                                </p>
                            </div>
                            <div className={classes.gradeItem}>
                                <p className={classes.gradeItemPrimary}>
                                    设备总数 <font className={classes.gradeItemPrimaryRight}>{indexStatisticsData.deviceCount}</font>
                                </p>
                                <p className={classes.gradeItemSecond}>
                                    今日增长 {indexStatisticsData.dayDeviceCount} 台
                                </p>
                            </div>
                            <div className={classes.gradeItem}>
                                <p className={classes.gradeItemPrimary}>
                                    激活设备数 <font className={classes.gradeItemPrimaryRight}>{indexStatisticsData.activeCount}</font>
                                </p>
                                <p className={classes.gradeItemSecond}>
                                    今日增长 {indexStatisticsData.dayActiveCount} 台
                                </p>
                            </div>
                            <div className={classes.gradeItem}>
                                <p className={classes.gradeItemPrimary}>
                                    注册设备数 <font className={classes.gradeItemPrimaryRight}>{indexStatisticsData.registerCount}</font>
                                </p>
                                <p className={classes.gradeItemSecond}>
                                    今日增长 {indexStatisticsData.dayRegisterCount} 台
                                </p>
                            </div>
                            <div className={classes.gradeItem}>
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
                                    <img src={loginUserData.headImg || defaultImage} style={{maxWidth: '100%', maxHeight: '100%'}}/>
                                </Avatar>
                            }
                            title={loginUserData.nickName}
                            subheader={loginUserData.viewName}
                            className={classes.carHeader}
                        />
                        <div style={{padding: 6, backgroundColor: "#eeeeee"}}>
                        </div>

                        <List className={classes.list}>
                            <ListItem className={classes.item}>
                                <ListItemText
                                    primary="设备数"
                                />
                                <ListItemSecondaryAction className={classes.secondary}>
                                    {indexStatisticsData.deviceCount}
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem className={classes.item}>
                                <ListItemText
                                    primary="分成比例"
                                />
                                <ListItemSecondaryAction className={classes.secondary}>
                                    {indexStatisticsData.proportion}
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem className={classes.item}>
                                <ListItemText
                                    primary="收入总金额"
                                />
                                <ListItemSecondaryAction className={classes.secondary}>
                                    {indexStatisticsData.allAmount}
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem className={classes.item}>
                                <ListItemText
                                    primary="累计分红"
                                />
                                <ListItemSecondaryAction className={classes.secondary}>
                                    {indexStatisticsData.getAmount}
                                </ListItemSecondaryAction>
                            </ListItem>
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

            {
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
            }
        </div>;
    }

    refreshStatistics() {
        this.props.statisticsState.getIndexStatisticsData();
    }
}
