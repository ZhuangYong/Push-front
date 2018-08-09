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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import BaseComponent from "../../components/common/BaseComponent";
import PictureUpload from "../../components/CustomUpload/PictureUpload";
import Path from "../../utils/path";
import customStyle from "../../assets/jss/view/custom";

import areaIcon from "../../assets/img/icon/position.png";
import phoneIcon from "../../assets/img/icon/phone.png";
import homeIcon from "../../assets/img/icon/home.png";
import Const from "../../utils/const";

const style = {...customStyle, ...{
        editButton: {
            height: '1.6rem',
            float: 'right',
            fontSize: '.8rem',
            color: '#484848'
        },
        carHeader: {
            padding: '.2rem',
            margin: 0,
            borderBottom: '.01rem solid #dadada'
        }
    }};
@withStyles(style)
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
            {
                loginUserData.type === Const.ROLE.SALES && <Card className={classes.card} style={{borderRadius: 0}}>
                    <CardHeader className={[classes.carHeader, classes.carHeader].join(" ")}
                                title={<PictureUpload
                                    label={loginUserData.nickName || ""}
                                    defaultImage={loginUserData.headImg}
                                    uploadAction={this.uploadUserAvatarAction}
                                />}
                    />
                    <div style={{padding: 6, backgroundColor: "#eeeeee"}}>
                    <span>
                        基本信息
                    </span>
                        <IconButton style={style.editButton} onClick={() => this.linkTo(Path.PATH_USER_EDIT_INFO)}>
                            编辑 ➜
                        </IconButton>
                    </div>
                    <List className={classes.list} style={{paddingTop: 0}}>
                        <ListItem className={classes.item}>
                            <ListItemIcon>
                                <img src={areaIcon} style={{width: '1.6rem', margin: 0}}/>
                            </ListItemIcon>
                            <ListItemText
                                primary="所在区域"
                            />
                            <ListItemSecondaryAction className={classes.secondary}>
                                {loginUserData.area || "未填写"}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.item}>
                            <ListItemIcon>
                                <img src={phoneIcon} style={{width: '1.6rem', margin: 0}}/>
                            </ListItemIcon>
                            <ListItemText
                                primary="昵称"
                            />
                            <ListItemSecondaryAction className={classes.secondary}>
                                {loginUserData.nickName || "未设置"}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.item}>
                            <ListItemIcon>
                                <img src={phoneIcon} style={{width: '1.6rem', margin: 0}}/>
                            </ListItemIcon>
                            <ListItemText
                                primary="手机号"
                            />
                            <ListItemSecondaryAction className={classes.secondary}>
                                {loginUserData.phone || "未设置"}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.item}>
                            <ListItemIcon>
                                <img src={phoneIcon} style={{width: '1.6rem', margin: 0}}/>
                            </ListItemIcon>
                            <ListItemText
                                primary="收款账号"
                            />
                            <ListItemSecondaryAction className={classes.secondary}>
                                {loginUserData.alipayAccount || "未设置"}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.item}>
                            <ListItemIcon>
                                <img src={homeIcon} style={{width: '1.6rem', margin: 0}}/>
                            </ListItemIcon>
                            <ListItemText
                                primary="详细地址"
                            />
                            <ListItemSecondaryAction className={classes.secondary}>
                                {loginUserData.address || "未填写"}
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </Card>
            }

            {
                loginUserData.type === Const.ROLE.MANUFACTURE && <Card className={classes.card} style={{borderRadius: 0}}>
                    <CardHeader className={[classes.carHeader, classes.carHeader].join(" ")}
                                title={<PictureUpload
                                    label={<h4>{loginUserData.viewName || ""}</h4> }
                                    defaultImage={loginUserData.headImg}
                                    uploadAction={this.uploadUserAvatarAction}
                                />}
                    />
                </Card>
            }

            <Card style={{marginTop: 16, borderRadius: 0}}>
                <List className={classes.list}>
                    {
                        loginUserData.type === Const.ROLE.SALES && <ListItem onClick={() => this.linkTo(Path.PATH_USER_ELECTRONIC_AGREEMENT)}>
                            <ListItemText
                                primary="电子协议"
                            />
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => this.linkTo(Path.PATH_USER_ELECTRONIC_AGREEMENT)}>
                                    <ArrowForwardIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    }
                    <ListItem className={classes.item} onClick={() => this.linkTo(Path.PATH_USER_FEEDBACK)}>
                        <ListItemText
                            primary="意见反馈"
                        />
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => this.linkTo(Path.PATH_USER_FEEDBACK)}>
                                <ArrowForwardIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Card>

            <Card style={{marginTop: 16, borderRadius: 0}}>
                <List className={classes.list}>
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

    uploadUserAvatarAction = (data) => {
        return this.props.userState.uploadUserAvatar(data)
            .then(setTimeout(() => this.props.userState.getUserInfo(), 500));
    };

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
