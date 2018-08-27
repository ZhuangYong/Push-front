import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
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
import editIcon from "../../assets/img/icon/edit.png";
import Const from "../../utils/const";
import {
    AddressIcon,
    AgreementIcon,
    AliPayIcon,
    CashIcon,
    FeedbackIcon,
    LocationIcon,
    PhoneIcon,
    UserIcon
} from "../../components/common/SvgIcons";

const style = {...customStyle, ...{
        editButton: {
            height: '1.6rem',
            float: 'right',
            fontSize: '.8rem',
            color: '#484848',
            display: 'flex',
            alignItems: 'center'
        },
        editIcon: {
            height: '.8rem',
            marginLeft: '.2rem'
        },
        carHeaderLabel: {
            fontSize: '1.4rem',
            color: 'white',
            textShadow: '1px 1px 4px black'
        },
        infoBar: {
            position: 'absolute',
            top: '-2rem',
            width: '100%',
            backgroundColor: 'white',
            borderRadius: '1rem 1rem 0 0',
            padding: '.4rem 1rem'
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
        // this.props.userState.auth();
        this.refreshStatistics();
    }
    render() {
        const {loginUserData} = this.props.userState;
        const {indexStatisticsData} = this.props.statisticsState;
        const {classes = ""} = this.props;
        return <div>
            {
                loginUserData.type === Const.ROLE.SALES && <Card className={classes.card}>
                    <CardHeader
                        style={{paddingBottom: '2rem'}}
                        className={[classes.carHeader, classes.card].join(" ")}
                        title={<PictureUpload
                            label={loginUserData.nickName || ""}
                            labelStyle={style.carHeaderLabel}
                            defaultImage={loginUserData.headImg}
                            uploadAction={this.uploadUserAvatarAction}
                        />}
                    />
                    <div style={{position: 'relative'}}>
                        <div className={classes.infoBar} style={{}}>
                            <span style={{lineHeight: '1.6rem', fontSize: '.8rem'}}>
                             基本信息
                            </span>
                                <span style={style.editButton} onClick={() => this.linkTo(Path.PATH_USER_EDIT_INFO)}>
                                编辑 <img src={editIcon} className={classes.editIcon}/>
                            </span>
                        </div>
                    </div>
                    <List className={classes.list} style={{paddingTop: 0}}>
                        <ListItem className={classes.item}>
                            <ListItemIcon>
                                <UserIcon size="1.6rem"/>
                            </ListItemIcon>
                            <ListItemText className={classes.ListItemText}
                                primary="昵称"
                            />
                            <ListItemSecondaryAction className={classes.secondary}>
                                {loginUserData.nickName || "未设置"}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.item}>
                            <ListItemIcon>
                                <PhoneIcon size="1.6rem"/>
                            </ListItemIcon>
                            <ListItemText className={classes.ListItemText}
                                primary="手机号"
                            />
                            <ListItemSecondaryAction className={classes.secondary}>
                                {loginUserData.phone || "未设置"}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.item}>
                            <ListItemIcon>
                                <AliPayIcon size="1.6rem"/>
                            </ListItemIcon>
                            <ListItemText className={classes.ListItemText}
                                primary="收款账号"
                            />
                            <ListItemSecondaryAction className={classes.secondary}>
                                {loginUserData.alipayAccount || "未设置"}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.item}>
                            <ListItemIcon>
                                <LocationIcon size="1.6rem"/>
                            </ListItemIcon>
                            <ListItemText className={classes.ListItemText}
                                primary="所在区域"
                            />
                            <ListItemSecondaryAction className={classes.secondary}>
                                {loginUserData.area ? `${loginUserData.region} ${loginUserData.city} ${loginUserData.area}` : "未填写"}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.item}>
                            <ListItemIcon>
                                <AddressIcon size="1.6rem"/>
                            </ListItemIcon>
                            <ListItemText className={classes.ListItemText}
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
                loginUserData.type === Const.ROLE.MANUFACTURE && <Card className={classes.card} style={{border: 'none'}}>
                    <CardHeader className={[classes.carHeader, classes.carHeader].join(" ")}
                                title={<PictureUpload
                                    label={loginUserData.viewName || ""}
                                    labelStyle={style.carHeaderLabel}
                                    defaultImage={loginUserData.headImg}
                                    uploadAction={this.uploadUserAvatarAction}
                                />}
                    />
                </Card>
            }

            <Card className={classes.card} style={{marginTop: 16}}>
                <List className={classes.list}>
                    {
                        loginUserData.type === Const.ROLE.SALES && <ListItem className={classes.item} onClick={() => this.linkTo(Path.PATH_ORDER_CASH_APPLY_INDEX)}>
                            <ListItemIcon>
                                <CashIcon size="1.6rem"/>
                            </ListItemIcon>
                            <ListItemText className={classes.ListItemText}
                                primary="提现"
                            />
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => this.linkTo(Path.PATH_ORDER_CASH_APPLY_INDEX)}>
                                    <ArrowForwardIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    }

                    {
                        loginUserData.type === Const.ROLE.SALES && <ListItem className={classes.item} onClick={() => this.linkTo(Path.PATH_USER_ELECTRONIC_AGREEMENT)}>
                            <ListItemIcon>
                                <AgreementIcon size="1.6rem"/>
                            </ListItemIcon>
                            <ListItemText className={classes.ListItemText}
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
                        <ListItemIcon>
                            <FeedbackIcon size="1.6rem"/>
                        </ListItemIcon>
                        <ListItemText className={classes.ListItemText}
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

            <Card className={classes.card} style={{marginTop: 16}}>
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
