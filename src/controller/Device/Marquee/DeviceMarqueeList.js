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
import customStyle from "../../../assets/jss/view/custom";
import 'react-picker-address/dist/react-picker-address.css';
import {getQueryString} from "../../../utils/comUtils";
import {EditIcon} from "../../../components/common/SvgIcons";
import PullRefreshPage from "../../../components/CommonPage/PullrefreshPage";
import Path from "../../../utils/path";

@withRouter
@withStyles({...customStyle, ...{
    editIcon: {
        position: 'absolute',
        top: '1rem',
        right: '1rem'
    }
}})
@inject(({store: {deviceState}}) => ({deviceState}))
@inject("store")
@observer
export default class DeviceMarquee extends PullRefreshPage {

    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }

    pageAction = (data) => {
        return this.props.deviceState.getDeviceMarquee(data);
    };

    getPageParam = () => {
        const groupUuid = getQueryString("groupUuid");
        return {groupUuid: groupUuid};
    };

    getFixBottom = () => {
        return 41;
    };

    listItem = (item) => {
        const {classes} = this.props;
        return <ListItem key={item.id} className={classes.item} style={{position: 'relative'}}>
            <EditIcon color="#e91e63" size='2.2rem' className={classes.editIcon} onClick={() => this.editDeviceMarquee(item)}/>
            <div>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>行数：</font>{item.lineNum}
                </p>
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
        </ListItem>;
    };

    renderExt = () => {
        const {classes} = this.props;
        return <Button className={classes.menuBottomButton} style={{bottom: 0}} onClick={this.editDeviceMarquee}>
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

}

DeviceMarquee.defaultProps = {
    showSearch: false
};
