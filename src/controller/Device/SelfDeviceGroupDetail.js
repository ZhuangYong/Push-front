import React from "react";
import BaseComponent from "../../components/common/BaseComponent";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import withStyles from "material-ui/styles/withStyles";
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from "@material-ui/icons/KeyboardArrowRight";

import ListItemIcon from '@material-ui/core/ListItemIcon';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import customStyle from "../../assets/jss/view/custom";

import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import Path from "../../utils/path";

import ktvIcon from "../../assets/img/icon/ktv.png";
import percentIcon from "../../assets/img/icon/percent.png";
import incomeIcon from "../../assets/img/icon/income.png";
import totalIncomeIcon from "../../assets/img/icon/totalIncome.png";
import {BarrageIcon} from "../../components/common/SvgIcons";

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
            fontSize: '1.4rem',
        },
        viewName: {
            margin: 0,
            fontSize: '1rem',
        },
        staticsTitle: {
            margin: 0,
            fontSize: '.9rem',
            padding: '.2rem .6rem',
            backgroundColor: '#f6f6f6',
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
@inject(({store: {deviceState}}) => ({deviceState}))
@observer
export default class Index extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
    }
    render() {
        const {deviceGroupDetailData} = this.props.deviceState;
        const {classes = ""} = this.props;
        return <div>
            <Card className={classes.card} style={{borderRadius: 0}}>
                <CardHeader
                    title={<p className={classes.nickname}>{deviceGroupDetailData.name}</p>}
                    subheader={<p className={classes.viewName}>创建时间：{deviceGroupDetailData.createTime}</p>}
                />
                <List className={classes.list}>
                    <ListItem className={classes.item}>
                        <ListItemIcon>
                            <img src={percentIcon} className={classes.itemIcon}/>
                        </ListItemIcon>
                        <ListItemText
                            primary="分成比例"
                        />
                        <ListItemSecondaryAction className={classes.secondary}>
                            {deviceGroupDetailData.proportion}
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
                            {deviceGroupDetailData.allAmount}
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
                            {deviceGroupDetailData.getAmount}
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem className={classes.item} onClick={() => this.deviceList(deviceGroupDetailData)}>
                        <ListItemIcon>
                            <img src={ktvIcon} className={classes.itemIcon}/>
                        </ListItemIcon>
                        <ListItemText
                            primary="设备数"
                        />
                        <ListItemSecondaryAction>
                            {deviceGroupDetailData.deviceCount}
                            <IconButton onClick={() => this.deviceList(deviceGroupDetailData)}>
                                <ArrowForwardIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem className={classes.item} style={{borderBottom: '1px solid #cecece'}} onClick={() => this.deviceMarqueeList(deviceGroupDetailData)}>
                        <ListItemIcon>
                            <BarrageIcon size="1.6rem" color="red"/>
                        </ListItemIcon>
                        <ListItemText className={classes.ListItemText}
                            primary="扫码滚动文字"
                        />
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => this.deviceMarqueeList(deviceGroupDetailData)}>
                                <ArrowForwardIcon/>
                            </IconButton>
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
                            {deviceGroupDetailData.dayAmount}
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem className={classes.item}>
                        <ListItemText
                            primary="昨日收入"
                        />
                        <ListItemSecondaryAction className={classes.secondary}>
                            {deviceGroupDetailData.yesterdayAmount}
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem className={classes.item}>
                        <ListItemText
                            primary="本周收入"
                        />
                        <ListItemSecondaryAction className={classes.secondary}>
                            {deviceGroupDetailData.sevenAmount}
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Card>

        </div>;
    }

    deviceList = (item) => {
        this.linkTo(Path.PATH_DEVICE_INDEX, {groupUuid: item.uuid || "", channelCode: item.channelCode || ""});
    };

    deviceMarqueeList = (item) => {
        item.uuid && this.linkTo(Path.PATH_DEVICE_MARQUEE_LIST, {groupUuid: item.uuid});
    };

}
