import React from "react";
import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import BaseComponent from "../../components/common/BaseComponent";
import customStyle from "../../assets/jss/view/custom";
import PullRefresh from "../../components/PageContainer/PullRefresh";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ArrowForwardIcon from "@material-ui/icons/KeyboardArrowRight";
import Path from "../../utils/path";

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
@inject(({store: {deviceState}}) => ({deviceState}))
@observer
export default class DeviceGroup extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            searchIng: false,
            isSearch: false
        };
        this.handlerSearch = this.handlerSearch.bind(this);
        this.handlerClear = this.handlerClear.bind(this);
    }
    render() {
        const classes = style;
        const {searchIng, searchKeyWords, isSearch} = this.state;
        const fixBottom = this.getFixBottom();
        return <div>
            {/*<div>
                <SearchInput
                    placeholder="请输入设备号 、SN号"
                    handelSearch={this.handlerSearch}
                    handelClear={this.handlerClear}
                    searchIng={searchIng}
                />
            </div>*/}

            {
                searchKeyWords ? <div style={classes.searchResult}>
                    "{searchKeyWords}"的搜索结果
                    <DeleteOutlinedIcon style={{...classes.icon, ...style.searchClear}} onClick={this.handlerClear}/>
                </div> : ""
            }
            <div className="pull-data-list">
                <PullRefresh
                    ref="pagerGroup"
                    fixBottom={fixBottom}
                    show={!isSearch}
                    pageAction={this.deviceGroupPageAction}
                    renderItem={item => {
                        return <ListItem
                            key={item.id || item.channelCode}
                            style={classes.item}
                            onClick={() => this.deviceGroupDetail(item)}>
                            <ListItemText
                                primary={<span>{item.name || item.channelName || "未命名"}<font style={{fontSize: '.8rem', color: '#808080'}}> （{item.deviceCount || 0}台）</font></span>}
                            />
                            <ListItemSecondaryAction>
                                <font color="#808080">{item.parentProportions || 0}元</font>
                                <IconButton onClick={() => this.deviceGroupDetail(item)}>
                                    <ArrowForwardIcon color="disabled"/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>;
                    }}
                />

                <PullRefresh
                    ref="pager1"
                    show={isSearch}
                    autoFirstPage={false}
                    fixBottom={fixBottom}
                    pageAction={this.deviceListPageAction}
                    renderItem={item => {
                        return <ListItem key={item.deviceId} style={classes.item}>
                            <div>
                                <p style={classes.infoLine}>
                                    <font style={classes.infoLabel}>机型：</font>{item.channelName}
                                </p>
                                <p style={classes.infoLine}>
                                    <font style={classes.infoLabel}>收入总额：</font><font color="red">￥</font>{item.total}
                                </p>
                                <p style={classes.infoLine}>
                                    <font style={classes.infoLabel}>投放时间：</font>{item.putTime}
                                </p>
                                <p style={classes.infoLine}>
                                    <font style={classes.infoLabel}>SN号：</font>{item.sn}
                                </p>
                                <p style={classes.infoLine}>
                                    <font style={classes.infoLabel}>设备号：</font>{item.deviceId}
                                </p>
                            </div>
                        </ListItem>;
                    }}
                />
            </div>

        </div>;
    }

    getFixBottom = () => {
        const {searchKeyWords} = this.state;
        let fixBottom = 56 + window.rem2px(2.8) + 12 + 48 + 41;
        if (searchKeyWords) {
            fixBottom += 28;
        }
        return fixBottom;
    };

    deviceGroupDetail = (item) => {
        // this.linkTo(Path.PATH_DEVICE_INDEX, {groupUuid: item.uuid || "", channelCode: item.channelCode || ""});
        this.props.deviceState.setDeviceGroupDetailData(item);
        this.linkTo(Path.PATH_DEVICE_GROUP_SELF_DETAIL, {groupUuid: item.uuid || "", channelCode: item.channelCode || ""});
    };

    deviceGroupPageAction = (data) => {
        return this.props.deviceState.getDeviceGroupPage(data);
    };

    deviceListPageAction = (data) => {
        return this.props.deviceState.getDevicePage(data);
    };

    handlerSearch(v) {
        if (this.validSearchKeyWord(v)) {
            this.setState({searchIng: true, isSearch: !!v});
            this.state.isSearch = !!v;
            return this.refs.pager1.handelFilter({searchKey: v})
                .then(res => {
                    this.setState({searchKeyWords: v, searchIng: false});
                    return Promise.resolve(res);
                })
                .catch(err => {
                    this.setState({searchIng: false});
                    return Promise.reject(err);
                });
        } else {
            return Promise.reject(new Error("no search keyword"));
        }
    }

    handlerClear() {
        this.setState({searchIng: true, isSearch: false});
        this.state.isSearch = false;
        return this.refs.pager1.handelFilter({searchKey: ""})
            .then(res => {
                this.setState({searchKeyWords: "", searchIng: false});
                return Promise.resolve(res);
            })
            .catch(err => {
                this.setState({searchIng: false});
                return Promise.reject(err);
            });
    }
    validSearchKeyWord = (v) => {
        const valid = !!v.replace(/ /g, "");
        if (!valid) {
            this.notification("请输入你想搜索的关键字", "bc");
        }
        return valid;
    }
}
