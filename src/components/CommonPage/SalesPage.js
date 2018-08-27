import React from "react";
import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import customStyle from "../../assets/jss/view/custom";

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ArrowForwardIcon from "@material-ui/icons/KeyboardArrowRight";
import Path from "../../utils/path";
import PullRefreshPage from "./PullrefreshPage";

const style = {
    ...customStyle,
    infoLine: {
        fontSize: '.86rem',
        color: '#555555',
        margin: '.2rem 0'
    },
    infoLabel: {
        color: 'black',
        width: '4rem',
        fontSize: '.9rem',
        fontWeight: 500
    },
    searchClear: {
        position: 'absolute',
        right: 12,
        top: 2
    },
    menuBottomButton: {
        bottom: 56,
        width: '100%',
        position: 'fixed',
        backgroundColor: 'white',
        borderTop: '1px solid #dedede',
        borderRadius: '0'
    }
};
@inject(({store: {salesState}}) => ({salesState}))
@observer
export default class SalesPage extends PullRefreshPage {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    pageAction = (data) => {
        return this.props.salesState.getSalesPageData(data);
    };

    listItem = (item) => {
        return <ListItem
            key={item.id || item.channelCode}
            style={style.item}
            onClick={() => this.deviceGroupDetail(item)}>
            <ListItemText style={style.ListItemText}
                primary={<span>{item.name || item.channelName || "未命名"}<font style={{fontSize: '.8rem', color: '#808080'}}> （{item.deviceCount || 0}台）</font></span>}
            />
            <ListItemSecondaryAction>
                <font color="#808080">{item.parentProportions || 0}元</font>
                <IconButton onClick={() => this.deviceGroupDetail(item)}>
                    <ArrowForwardIcon color="disabled"/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>;
    };

    renderExt = () => {
        return <Button style={{...style.menuBottomButton, bottom: 56}} onClick={() => this.linkTo(Path.PATH_SALES_EDIT)}>
            <AddIcon/> 添加合作者
        </Button>;
    };

    getFixBottom = () => {
        const {searchKeyWords} = this.state;
        let fixBottom = 56 + window.rem2px(3.2) + 41;
        if (searchKeyWords) {
            fixBottom += 28;
        }
        return fixBottom;
    };

    deviceGroupDetail = (item) => {
        // this.linkTo(Path.PATH_DEVICE_PARTNER_INDEX, {salesUuid: item.uuid || "", defaultGroupUuid: item.defaultGroupUuid || ""});
        this.props.salesState.setPartnerDetailData(item);
        this.linkTo(Path.PATH_PARTNER_DETAIL, {salesUuid: item.uuid || ""});
    };

}
