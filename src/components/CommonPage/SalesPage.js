import React from "react";
import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import BaseComponent from "../../components/common/BaseComponent";
import customStyle from "../../assets/jss/view/custom";
import SearchInput from "../../components/CustomInput/SearchInput";
import PullRefresh from "../../components/PageContainer/PullRefresh";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ArrowForwardIcon from "@material-ui/icons/KeyboardArrowRight";
import Path from "../../utils/path";
import salesState from "../../stores/salesState";
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
            onClick={() => this.linkTo(Path.PATH_DEVICE_PARTNER_INDEX, {salesUuid: item.uuid || "", defaultGroupUuid: item.defaultGroupUuid || ""})}>
            <ListItemText
                primary={<span>{item.name || item.channelName || "未命名"}<font style={{fontSize: '.8rem', color: '#808080'}}> （{item.deviceCount || 0}台）</font></span>}
            />
            <ListItemSecondaryAction>
                <font color="#808080">{item.parentProportions || 0}元</font>
                <IconButton onClick={() => this.linkTo(Path.PATH_DEVICE_PARTNER_INDEX, {salesUuid: item.uuid || "", defaultGroupUuid: item.defaultGroupUuid || ""})}>
                    <ArrowForwardIcon color="disabled"/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>;
    };

    getFixBottom = () => {
        const {searchKeyWords} = this.state;
        let fixBottom = 56 + window.rem2px(3.2) + 48;
        if (searchKeyWords) {
            fixBottom += 28;
        }
        return fixBottom;
    };

}
