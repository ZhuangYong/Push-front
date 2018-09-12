import React from "react";
import withStyles from "material-ui/styles/withStyles";

import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import customStyle from "../../assets/jss/view/custom";
import ListItem from '@material-ui/core/ListItem';
import svgBottom from "../../assets/svg/bottom-tear.svg";
import PullRefreshPage from "../../components/CommonPage/PullrefreshPage";
import {setTitle} from "../../utils/comUtils";
import SearchInput from "../../components/CustomInput/SearchInput";

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
@inject("orderState")
@observer
export default class OrderIndex extends PullRefreshPage {

    constructor(props) {
        super(props);
        setTitle("订单");
        this.state = {
            listClassName: "pull-data-list-order"
        };
    }

    pageAction = (data) => {
        return this.props.orderState.getOrderPage(data);
    };

    /**
     * 搜索头
     * @returns {*}
     */
    renderSearch = () => {
        const {searchIng, defaultSearchValue} = this.state;
        return <SearchInput
            placeholder="请输入订单号、SN号、设备别名"
            defaultValue={defaultSearchValue}
            handelSearch={this.handlerSearch}
            handelClear={this.handlerClear}
            searchIng={searchIng}
        />;
    };

    listItem = (item) => {
        const {classes = ""} = this.props;
        return <ListItem key={item.orderNo} className={classes.item + " " + classes.orderItem}>
            <div>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>套餐名称：</font>{item.productName}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>套餐金额：</font><font color="red">￥{item.amount}</font>
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>订单时间：</font>{item.time}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>订单号：</font>{item.orderNo}
                </p>
                {/*<p className={classes.infoLine}>
                    <font className={classes.infoLabel}>设备号：</font>{item.deviceId}
                </p>*/}
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>设备别名：</font>{item.consumerName || "未设置"}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>设备SN号：</font>{item.sn}
                </p>
            </div>
        </ListItem>;
    };

    getFixBottom = () => {
        return 56 + window.rem2px(3.2);
    };

}
