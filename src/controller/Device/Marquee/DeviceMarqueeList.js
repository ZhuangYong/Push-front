/**
 *  销售组的跑马灯列表
 */

import React from "react";
import {withRouter} from "react-router-dom";
import withStyles from "material-ui/styles/withStyles";
import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from "material-ui/Progress/CircularProgress";
import customStyle from "../../../assets/jss/view/custom";
import 'react-picker-address/dist/react-picker-address.css';
import {getQueryString, setTitle} from "../../../utils/comUtils";
import {EditIcon, MenuDotIcon} from "../../../components/common/SvgIcons";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import PullRefreshPage from "../../../components/CommonPage/PullrefreshPage";
import Path from "../../../utils/path";

@withRouter
@withStyles({...customStyle, ...{
    editIcon: {
        position: 'absolute!important',
        top: '2.6rem!important',
        right: '1rem!important'
    }
}})
@inject("deviceState")
@observer
export default class DeviceMarquee extends PullRefreshPage {

    constructor(props, context) {
        super(props, context);
        setTitle("跑马灯列表");
        this.state.delIng = "";
    }

    pageAction = (data) => {
        return this.props.deviceState.getDeviceMarquee(data);
    };

    getPageParam = () => {
        const groupUuid = getQueryString("groupUuid");
        return {groupUuid: groupUuid};
    };

    getFixBottom = () => {
        return 41 + 58;
    };

    listItem = (item) => {
        const {delIng} = this.state;
        const {classes} = this.props;
        return <ListItem key={item.id} className={classes.item} style={{position: 'relative'}}>
            <div>
                {/*<p className={classes.infoLine}>*/}
                    {/*<font className={classes.infoLabel}>行数：</font>{item.lineNum}*/}
                {/*</p>*/}
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>字体：</font>{item.font || "未设置"}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>颜色：</font>{item.color || "未设置"}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>启用状态：</font>{item.isEnabled === 1 ? <font color="green">启用</font> : <font color="gray">禁用</font>}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>内容：</font><font style={{maxWidth: '20rem'}}>{item.content}</font>
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>背景：</font>{item.img ? <img src={item.img} style={{maxWidth: '20rem'}}/> : "未设置"}
                </p>
            </div>

            {
                !delIng && <ListItemSecondaryAction className={classes.editIcon}>
                    <MenuDotIcon size='2.2rem' onClick={() => this.openDrawerMenu({drawerMenus: [
                            {label: '编辑', onClick: () => this.editDeviceMarquee(item)},
                            {label: '删除', onClick: () => this.delDeviceMarquee(item)},
                        ]})}/>
                </ListItemSecondaryAction>
            }

            {
                delIng && delIng === item.id ? <ListItemSecondaryAction className={classes.editIcon}>
                    <CircularProgress color="secondary" size={20} />
                </ListItemSecondaryAction> : ""
            }

        </ListItem>;
    };

    renderExt = () => {
        const {classes} = this.props;
        return <Button className={classes.menuBottomButton} style={{bottom: 58}} onClick={this.editDeviceMarquee}>
            <AddIcon/> 添加
        </Button>;
    };

    editDeviceMarquee = (item) => {
        const groupUuid = getQueryString("groupUuid");
        const param = {groupUuid: groupUuid};
        if (item && item.id) {
            this.props.deviceState.setDeviceMarqueeDetailData(item);
            param.id = item.id;
        }
        this.linkTo(Path.PATH_DEVICE_MARQUEE_EDIT, param);
    };

    delDeviceMarquee = (item) => {
        this.alert("确认删除吗？", "", () => {
            this.setState({delIng: item.id});
            this.props.deviceState.deleteDeviceMarquee({ids: item.id})
                .then(res => {
                    this.setState({delIng: ""});
                    this.handelPageRefresh();
                })
                .catch(err => this.setState({delIng: ""}));
        }, null, true);
    };
}

DeviceMarquee.defaultProps = {
    showSearch: false
};
