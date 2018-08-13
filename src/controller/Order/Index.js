import React from "react";
import withStyles from "material-ui/styles/withStyles";

import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import BaseComponent from "../../components/common/BaseComponent";
import customStyle from "../../assets/jss/view/custom";
import SearchInput from "../../components/CustomInput/SearchInput";
import PullRefresh from "../../components/PageContainer/PullRefresh";
import ListItem from '@material-ui/core/ListItem';
import svgBottom from "../../assets/svg/bottom-tear.svg";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const style = {
    ...customStyle,
    infoLine: {
        fontSize: '.86rem',
        color: '#555555',
        margin: 0
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
        backgroundColor: '#ececec',
        borderBottom: '1px solid #e6e6e6'
    },
    orderItem: {
        width: 'auto!important',
        backgroundImage: `url(${svgBottom})`,
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '120%',
        border: '1px solid #e4e3e3',
        margin: '0 .4rem .4rem .4rem',
        padding: '.6rem .8rem 1.2rem .8rem!important',
        borderBottom: 'none'
    },
    searchClear: {
        position: 'absolute',
        right: 12,
        top: 2
    }
};
@withStyles(style)
@inject(({store: {orderState}}) => ({orderState}))
@observer
export default class OrderIndex extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const {searchIng, searchKeyWords} = this.state;
        const {classes = ""} = this.props;
        return <div>
            <div>
                <SearchInput
                    placeholder="请输入订单号、设备号查询订单"
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
                    pageAction={this.devicePageAction}
                    fixBottom={searchKeyWords ? 128 : 100}
                    renderItem={item => {
                        return <ListItem key={item.orderNo} className={classes.item + " " + classes.orderItem}>
                            <div>
                                <p className={classes.infoLine}>
                                    <font className={classes.infoLabel}>套餐名称：</font>{item.productName}
                                </p>
                                <p className={classes.infoLine}>
                                    <font className={classes.infoLabel}>套餐金额：</font><font color="red">￥</font>{item.amount}
                                </p>
                                <p className={classes.infoLine}>
                                    <font className={classes.infoLabel}>订单时间：</font>{item.time}
                                </p>
                                <p className={classes.infoLine}>
                                    <font className={classes.infoLabel}>订单号：</font>{item.orderNo}
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

    devicePageAction = (data) => {
        return this.props.orderState.getOrderPage(data);
    };

    handlerSearch = (v) => {
        if (this.validSearchKeyWord(v)) {
            this.setState({searchIng: true});
            this.refs.pager.handelFilter({searchKey: v})
                .then(res => this.setState({searchKeyWords: v, searchIng: false}))
                .catch(err => this.setState({searchIng: false}));
        }
    };

    handlerClear = () => {
        this.setState({searchIng: true});
        this.refs.pager.handelFilter({searchKey: ""})
            .then(res => this.setState({searchKeyWords: "", searchIng: false}))
            .catch(err => this.setState({searchIng: false}));
    };

    validSearchKeyWord = (v) => {
        const valid = !!v.replace(/ /g, "");
        if (!valid) {
            this.notification("请输入你想搜索的关键字", "bc");
        }
        return valid;
    };

}
