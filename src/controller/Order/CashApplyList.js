import React from "react";
import withStyles from "material-ui/styles/withStyles";

import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import Button from '@material-ui/core/Button';
import customStyle from "../../assets/jss/view/custom";
import ListItem from '@material-ui/core/ListItem';
import svgBottom from "../../assets/svg/bottom-tear.svg";
import PullRefreshPage from "../../components/CommonPage/PullrefreshPage";
import CircularProgress from "material-ui/Progress/CircularProgress";
import {getQueryString} from "../../utils/comUtils";

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
    },
    detailContainer: {
        height: 126,
        backgroundColor: '#1899d9',
        padding: '22px 22px 10px 22px'
    },
    cashAmount: {
        fontSize: '56px',
        color: 'white',
        paddingLeft: 40
    },
    cashDetailTitle: {
        color: 'white',
    },
    cashDetailOption: {
        color: 'white',
        textAlign: 'right',
        margin: '6px 0 0'
    }
};
@withStyles(style)
@inject("orderState")
@observer
export default class CashApplyList extends PullRefreshPage {

    constructor(props) {
        super(props);
        this.state = {
            listClassName: "pull-data-list-order",
        };
    }

    componentDidMount() {
        this.cashDetail();
    }

    renderTopExt = () => {
        const {submiting} = this.state;
        const {classes} = this.props;
        const {orderCashDetailData} = this.props.orderState;
        const {cashAmount, cashEnable, tips} = orderCashDetailData || {};
        return <div className={classes.detailContainer}>
            <p className={classes.cashDetailTitle}>
                可提现金额
            </p>
            <span className={classes.cashAmount}>
                {cashAmount}
            </span>
            {
                cashEnable ? <div className={classes.cashDetailOption} onClick={this.applyOrderCache}>
                    {
                        submiting ? <div style={{paddingTop: 4}}><CircularProgress color="inherit" size={16} /></div> : "申请提现"
                    }
                </div> : <p className={classes.cashDetailOption}>
                    {
                        tips
                    }
                </p>
            }
        </div>;
    };

    renderSearch = () => {
        return "";
    };

    getFixBottom = () => {
        return 126;
    };

    listItem = (item) => {
        const {classes = ""} = this.props;
        return <ListItem key={item.id} className={classes.item + " " + classes.orderItem}>
            <div>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>提现金额：</font><font color="red">￥{item.amount}</font>
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>状态：</font>{this.status2str(item.status)}
                </p>
              {/*  <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>申请人：</font>{item.salesName}
                </p>*/}
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>操作时间：</font>{item.createTime}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>提现序列号：</font>{item.uuid}
                </p>
            </div>
        </ListItem>;
    };

    pageAction = (data) => {
        return this.props.orderState.getOrderCashApplyData(data);
    };

    cashDetail = (data) => {
        this.props.orderState.getOrderCashDetailData(data);
    };

    applyOrderCache = () => {
        if (this.state.submiting) return;
        this.setState({submiting: true});
        this.state.submiting = true;
        this.props.orderState.applyOrderCash()
            .then(res => {
                this.setState({submiting: false});
                this.cashDetail();
                this.alert("您的申请我们将再三个工作日内为你处理！", "申请成功");
            })
            .catch(err => this.setState({submiting: false}));
    };

    status2str = (status) => {
        // status 结算状态.0结算申请 1:结算成功，2结算中，3结算失败，4未结算
        switch (status) {
            case 0:
                return <font color="orange">结算申请中</font>;
            case 1:
                return <font color="green">结算成功</font>;
            case 2:
                return <font color="#da70d6">结算中</font>;
            case 3:
                return <font color="red">结算失败</font>;
            case 4:
                return "未结算";
            default:
                return "未知状态";
        }
    };
}
