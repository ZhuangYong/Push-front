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
import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import BaseComponent from "../../components/common/BaseComponent";
import PictureUpload from "../../components/CustomUpload/PictureUpload";
import Path from "../../utils/path";
import customStyle from "../../assets/jss/view/custom";

import areaIcon from "../../assets/img/icon/area.png";
import nicknameIcon from "../../assets/img/icon/nickname.png";
import accountIcon from "../../assets/img/icon/account.png";
import phoneIcon from "../../assets/img/icon/phone.png";
import homeIcon from "../../assets/img/icon/home.png";
import agreementIcon from "../../assets/img/icon/agreement.png";
import ktvIcon from "../../assets/img/icon/ktv.png";
import headBg from "../../assets/img/bg/headbg.jpg";

const style = {...customStyle, ...{
        partnerCarHead: {
            backgroundImage: `url(${headBg})`,
        },
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
@inject(({store: {salesState}}) => ({salesState}))
@observer
export default class Index extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            submiting: false
        };
    }
    render() {
        const {partnerDetailData} = this.props.salesState;
        const {classes = ""} = this.props;
        return <div>
            {
                <Card className={classes.card}>
                    <CardHeader
                        style={{paddingBottom: '2rem'}}
                        className={[classes.carHeader, classes.partnerCarHead].join(" ")}
                        title={<PictureUpload
                            label={partnerDetailData.name || ""}
                            labelStyle={style.carHeaderLabel}
                            defaultImage={partnerDetailData.headImg}
                        />}
                    />
                    <List className={classes.list} style={{paddingTop: 0}}>
                        <ListItem>
                            <ListItemIcon>
                                <img src={nicknameIcon} className={classes.itemIcon}/>
                            </ListItemIcon>
                            <ListItemText
                                primary="昵称"
                            />
                            <ListItemSecondaryAction className={classes.secondary}>
                                {partnerDetailData.nickName || "未设置"}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.item}>
                            <ListItemIcon>
                                <img src={phoneIcon} className={classes.itemIcon}/>
                            </ListItemIcon>
                            <ListItemText
                                primary="手机号"
                            />
                            <ListItemSecondaryAction className={classes.secondary}>
                                {partnerDetailData.phone || "未设置"}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.item}>
                            <ListItemIcon>
                                <img src={accountIcon} className={classes.itemIcon}/>
                            </ListItemIcon>
                            <ListItemText
                                primary="收款账号"
                            />
                            <ListItemSecondaryAction className={classes.secondary}>
                                {partnerDetailData.alipayAccount || "未设置"}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.item}>
                            <ListItemIcon>
                                <img src={areaIcon} className={classes.itemIcon}/>
                            </ListItemIcon>
                            <ListItemText
                                primary="所在区域"
                            />
                            <ListItemSecondaryAction className={classes.secondary}>
                                {partnerDetailData.area ? `${partnerDetailData.region} ${partnerDetailData.city} ${partnerDetailData.area}` : "未填写"}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.item}>
                            <ListItemIcon>
                                <img src={homeIcon} className={classes.itemIcon}/>
                            </ListItemIcon>
                            <ListItemText
                                primary="详细地址"
                            />
                            <ListItemSecondaryAction className={classes.secondary}>
                                {partnerDetailData.address || "未填写"}
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </Card>
            }


            <Card className={classes.card} style={{marginTop: 16}}>
                <List className={classes.list}>
                    <ListItem className={classes.item} onClick={() => this.deviceList(partnerDetailData)}>
                        <ListItemIcon>
                            <img src={ktvIcon} className={classes.itemIcon}/>
                        </ListItemIcon>
                        <ListItemText
                            primary="设备数"
                        />
                        <ListItemSecondaryAction>
                            {partnerDetailData.deviceCount}
                            <IconButton onClick={() => this.deviceList(partnerDetailData)}>
                                <ArrowForwardIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem className={classes.item} onClick={() => this.linkTo(Path.PATH_USER_ELECTRONIC_AGREEMENT)}>
                        <ListItemIcon>
                            <img src={agreementIcon} className={classes.itemIcon}/>
                        </ListItemIcon>
                        <ListItemText
                            primary="电子协议"
                        />
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => this.linkTo(Path.PATH_USER_ELECTRONIC_AGREEMENT)}>
                                <ArrowForwardIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Card>

        </div>;
    }

    deviceList = (item) => {
        this.linkTo(Path.PATH_DEVICE_PARTNER_INDEX, {salesUuid: item.uuid || ""});
    };

}
