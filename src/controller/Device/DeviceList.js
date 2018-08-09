import React from "react";
import withStyles from "material-ui/styles/withStyles";

import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import BaseComponent from "../../components/common/BaseComponent";
import customStyle from "../../assets/jss/view/custom";
import SearchInput from "../../components/CustomInput/SearchInput";
import PullRefresh from "../../components/PageContainer/PullRefresh";
import ListItem from '@material-ui/core/ListItem';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import {getQueryString} from "../../utils/comUtils";

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
    searchResult: {
        margin: 0,
        position: 'relative',
        padding: '4px 12px',
        fontSize: '.86rem',
        backgroundColor: '#fbfbfb'
    },
    searchClear: {
        position: 'absolute',
        right: 12,
        top: 2
    }
};
@withStyles(style)
@inject(({store: {deviceState}}) => ({deviceState}))
@observer
export default class DeviceIndex extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            searchIng: false,
            searchKeyWords: ""
        };
        this.devicePageAction = this.devicePageAction.bind(this);
        this.handlerSearch = this.handlerSearch.bind(this);
        this.handlerClear = this.handlerClear.bind(this);
    }
    render() {
        const {searchIng, searchKeyWords} = this.state;
        const {classes = ""} = this.props;
        const groupUuid = getQueryString("groupUuid");
        const channelCode = getQueryString("channelCode");
        let pageParam = {};
        if (groupUuid) {
            pageParam = {groupUuid: groupUuid};
        } else if (channelCode) {
            pageParam = {channelCode: channelCode};
        }
        return <div>
            <div>
                <SearchInput
                    placeholder="请输入设备号 、SN号、机型查询"
                    handelSearch={this.handlerSearch}
                    handelClear={this.handlerClear}
                    searchIng={searchIng}
                />
            </div>
            {
                searchKeyWords ? <div className={classes.searchResult}>
                        "{searchKeyWords}"的搜索结果
                    <DeleteOutlinedIcon className={classes.icon} style={style.searchClear} onClick={this.handlerClear}/>
                </div> : ""
            }

            <div style={{padding: 0}}>
                <PullRefresh
                    ref="pager"
                    pageParam={pageParam}
                    fixBottom={searchKeyWords ? 128 : 100}
                    pageAction={this.devicePageAction}
                    renderItem={item => {
                        return <ListItem key={item.deviceId} className={classes.item}>
                            <div>
                                <p className={classes.infoLine}>
                                    <font className={classes.infoLabel}>机型：</font>{item.channelName}
                                </p>
                                <p className={classes.infoLine}>
                                    <font className={classes.infoLabel}>收入总额：</font>{item.total} <font color="red">￥</font>
                                </p>
                                <p className={classes.infoLine}>
                                    <font className={classes.infoLabel}>投放时间：</font>{item.putTime}
                                </p>
                                <p className={classes.infoLine}>
                                    <font className={classes.infoLabel}>SN号：</font>{item.sn}
                                </p>
                                <p className={classes.infoLine}>
                                    <font className={classes.infoLabel}>设备号：</font>{item.deviceId}
                                </p>
                            </div>
                        </ListItem>;
                    }}
                />
            </div>
        </div>;
    }

    devicePageAction(data) {
        return this.props.deviceState.getDevicePage(data);
    }

    handlerSearch(v) {
        if (this.validSearchKeyWord(v)) {
            this.setState({searchIng: true});
            this.refs.pager.handelFilter({searchKey: v})
                .then(res => this.setState({searchKeyWords: v, searchIng: false}))
                .catch(err => this.setState({searchIng: false}));
        }
    }

    handlerClear() {
        this.setState({searchIng: true});
        this.refs.pager.handelFilter({searchKey: ""})
            .then(res => this.setState({searchKeyWords: "", searchIng: false}))
            .catch(err => this.setState({searchIng: false}));
    }

    validSearchKeyWord(v) {
        const valid = !!v.replace(/ /g, "");
        if (!valid) {
            this.notification("请输入你想搜索的关键字", "bc");
        }
        return valid;
    }
}
