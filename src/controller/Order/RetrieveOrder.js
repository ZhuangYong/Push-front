import React from "react";
import withStyles from "material-ui/styles/withStyles";

import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import customStyle from "../../assets/jss/view/custom";
import Form from "../../components/Form/BaseForm";
import ListItem from '@material-ui/core/ListItem';
import svgBottom from "../../assets/svg/bottom-tear.svg";
import PullRefreshPage from "../../components/CommonPage/PullrefreshPage";
import {getQueryString, setTitle} from "../../utils/comUtils";
import SearchInput from "../../components/CustomInput/SearchInput";
import ActionCustomItem from "../../components/CustomItem/ActionCustomItem";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import CustomInput from "../../components/CustomInput/CustomInput";

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
export default class RetrieveOrder extends PullRefreshPage {

    constructor(props) {
        super(props);
        setTitle("找回订单");
        this.state.salesUuid = getQueryString("salesUuid");
        this.state.proportions = "";
    }

    pageAction = (data) => {
        return this.props.orderState.getRetrieveOrderPage(data);
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
        const {submitIng} = this.state;
        const {classes = ""} = this.props;
        // 为1时不能选中， 并提示tips
        const {disableSelect, tips} = item;
        return <ActionCustomItem
            key={item.orderNo}
            loading={!!submitIng}
            showAction={(submitIng && submitIng === item.deviceUuid) || !submitIng}
            onActionClick={() => this.openDrawerMenu({drawerMenus: [
                {label: '找回', onClick: () => disableSelect === 1 ? this.alert(tips, "不能进行该操作") : this.doRetrieveOrder(item)},
            ]})}>
            <div>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>套餐名称：</font>{item.productName}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>套餐金额：</font><font color="red">￥{item.amount}</font>
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>分成比例：</font>{item.proportion}%
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>订单时间：</font>{item.time}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>订单号：</font>{item.orderNo}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>设备别名：</font>{item.consumerName || "未设置"}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>设备SN号：</font>{item.sn}
                </p>
            </div>
        </ActionCustomItem>;
    };

    renderExt = () => {
        const {proportions, editItem, submitIng, openEditOrder} = this.state;
        const {classes = ""} = this.props;
        return <div>
            <CustomDialog
                title="为代理商找回订单"
                open={openEditOrder}
                handelClose={() => this.setState({openEditOrder: false})}
                handleSure={() => this.handelRetrieveOrder()}
                loading={submitIng}
                content={
                    <Form
                        ref="form"
                        v-data={this.state}
                        setState={this.stateFun}>
                        <p className={classes.infoLine}>
                            <font className={classes.infoLabel}>订单：</font>{editItem.productName}
                        </p>
                        <p className={classes.infoLine}>
                            <font className={classes.infoLabel}>套餐金额：</font><font color="red">￥{editItem.amount}</font>
                        </p>
                        <p className={classes.infoLine}>
                            <font className={classes.infoLabel}>分成比例：</font>{editItem.proportion}%
                        </p>
                        <p className={classes.infoLine}>
                            <font className={classes.infoLabel}>订单时间：</font>{editItem.time}
                        </p>
                        <p className={classes.infoLine}>
                            <font className={classes.infoLabel}>订单号：</font><font style={{fontSize: '.76rem'}}>{editItem.orderNo}</font>
                        </p>
                        <p className={classes.infoLine}>
                            <font className={classes.infoLabel}>设备别名：</font>{editItem.consumerName || "未设置"}
                        </p>
                        <p className={classes.infoLine}>
                            <font className={classes.infoLabel}>设备SN号：</font>{editItem.sn}
                        </p>
                        <CustomInput
                            labelProps={{
                                style: {whiteSpace: "nowrap"}
                            }}
                            labelText={`分成比例（% 0 ~ ${editItem.proportion}）`}
                            placeholder={`请输入0~${editItem.proportion}之间的数字`}
                            name="proportions"
                            value={proportions}
                            reg={v => /^\d{1,2}(\.\d{1,2})?$|^100$/.test(v) && v <= parseFloat(editItem.proportion)}
                            required
                        />
                    </Form>
                }
            />
        </div>;
    };

    getFixBottom = () => {
        return 56 + window.rem2px(3.2);
    };

    doRetrieveOrder = (item) => {
        this.setState({openEditOrder: true, editItem: item});
    };

    /**
     * 找回订单
     * @returns {*}
     */
    handelRetrieveOrder = () => {
        if (this.refs.form.valid()) {
            const {proportions, salesUuid, editItem} = this.state;
            const {orderNo} = editItem;
            this.setState({submitIng: true});
            return this.props.orderState.doOrderRetrieve({proportions, salesUuid, orderNo})
                .then(res => {
                    this.setState({submitIng: false, openEditOrder: false, proportions: ""});
                    setTimeout(() => {
                        this.notification("为代理商找回订单成功");
                    }, 300);
                })
                .catch(err => this.setState({submitIng: false}));
        }
    };

}
