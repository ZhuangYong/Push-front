import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import withStyles from "material-ui/styles/withStyles";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from "@material-ui/icons/KeyboardArrowRight";

import CircularProgress from "material-ui/Progress/CircularProgress";
import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import BaseComponent from "../../components/common/BaseComponent";
import PictureUpload from "../../components/CustomUpload/PictureUpload";
import Path from "../../utils/path";
import customStyle from "../../assets/jss/view/custom";

@withStyles(customStyle)
@inject(({store: {statisticsState, userState}}) => ({statisticsState, userState}))
@observer
export default class Index extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            submiting: false
        };
        this.refreshStatistics = this.refreshStatistics.bind(this);
        this.logout = this.logout.bind(this);
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
                <CardHeader className={classes.carHeader} style={{padding: '.2rem'}}
                    title={<PictureUpload label={loginUserData.nickName || ""}/>}
                />
                <List className={classes.list}>
                    <ListItem className={classes.item}>
                        <ListItemText
                            primary="所在区域"
                        />
                        <ListItemSecondaryAction className={classes.secondary}>
                            {loginUserData.area || "未填写"}
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem className={classes.item}>
                        <ListItemText
                            primary="昵称"
                        />
                        <ListItemSecondaryAction className={classes.secondary}>
                            {loginUserData.nickName || "未设置"}
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem className={classes.item}>
                        <ListItemText
                            primary="手机号"
                        />
                        <ListItemSecondaryAction className={classes.secondary}>
                            {loginUserData.phone || "未设置"}
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem className={classes.item}>
                        <ListItemText
                            primary="收款账号"
                        />
                        <ListItemSecondaryAction className={classes.secondary}>
                            {loginUserData.alipayAccount || "未设置"}
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem className={classes.item}>
                        <ListItemText
                            primary="详细地址"
                        />
                        <ListItemSecondaryAction className={classes.secondary}>
                            {loginUserData.address || "未填写"}
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Card>

            <Card style={{marginTop: 10}}>
                <List className={classes.list}>
                    <ListItem>
                        <ListItemText
                            primary="电子协议"
                        />
                        <ListItemSecondaryAction>
                            <IconButton>
                                <ArrowForwardIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem className={classes.item}>
                        <ListItemText
                            primary="意见反馈"
                        />
                        <ListItemSecondaryAction>
                            <IconButton>
                                <ArrowForwardIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem className={classes.item} onClick={!this.state.submiting ? this.logout : f => f}>
                        <ListItemText
                            primary={<div style={{margin: 0, padding: 0, textAlign: 'center'}}>
                                {
                                    this.state.submiting && <CircularProgress color="secondary" size={14} />
                                }
                                退出登录
                            </div>}
                        />
                    </ListItem>
                </List>
            </Card>
        </div>;
    }

    refreshStatistics() {
        this.props.statisticsState.getIndexStatisticsData();
    }

    logout() {
        this.setState({submiting: true});
        this.props.userState.logout().then(res => {
            this.setState({submiting: false});
            this.linkTo(Path.PATH_LOGIN);
        }).catch(err => this.setState({submiting: false}));
    }
}
