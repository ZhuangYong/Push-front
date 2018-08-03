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

import customStyle from "../assets/jss/view/custom";

import {observer} from "mobx-react";
import {inject} from "mobx-react/index";

@withStyles(customStyle)
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
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                            {loginUserData.nickName}
                        </Avatar>
                    }
                    title={loginUserData.nickName}
                    subheader={loginUserData.viewName}
                    className={classes.carHeader}
                />
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

            <Card style={{marginTop: 10}}>
                <List className={classes.list}>
                    <ListItem>
                        <ListItemText
                            primary="收入概况"
                        />
                        <ListItemSecondaryAction>
                            <IconButton>
                                <ArrowForwardIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Card>
        </div>;
    }

    refreshStatistics() {
        this.props.statisticsState.getIndexStatisticsData();
    }
}
