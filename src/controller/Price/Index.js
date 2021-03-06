import React from "react";
import PullRefreshPage from "../../components/CommonPage/PullrefreshPage";
import {inject, observer} from "mobx-react/index";
import ListItem from '@material-ui/core/ListItem';
import CardHeader from '@material-ui/core/CardHeader';
import customStyle from "../../assets/jss/view/custom";
import withStyles from "material-ui/styles/withStyles";
import {BlankImage, EditIcon, MenuDotIcon} from "../../components/common/SvgIcons";
import {getQueryString, setTitle} from "../../utils/comUtils";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Form from "../../components/Form/BaseForm";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import CustomInput from "../../components/CustomInput/CustomInput";
import DeviceMarquee from "../Device/Marquee/DeviceMarqueeList";
import Const from "../../utils/const";
import ActionCustomItem from "../../components/CustomItem/ActionCustomItem";

const style = {
    ...customStyle,
    addButton: {
        position: 'fixed',
        bottom: 62,
        right: '.4rem',
        opacity: '.6'
    }
};
@withStyles(style)
@inject("priceState", "userState")
@observer
export default class PricePage extends PullRefreshPage {
    constructor(props) {
        super(props);
        setTitle("价格包");
        this.state = {
            groupUuid: getQueryString("groupUuid"),
            price: 0,
            limitPrice: 0,
            editItem: "",
            openEditPrice: false
        };
    }

    pageAction = () => {
        const {groupUuid} = this.state;
        return this.props.priceState.getPricePageData(groupUuid);
    };

    listItem = (item) => {
        const {classes = ""} = this.props;

        return <ActionCustomItem
            key={item.id}
            className={classes.item}
            onActionClick={() => this.openDrawerMenu({drawerMenus: [
                    {label: '修改价格', onClick: () => this.editPrice(item)},
                ]})}>
            <CardHeader
                avatar={
                    item.wxPic ? <img src={item.wxPic || BlankImage} style={{height: '4rem'}}/> : <BlankImage style={{height: '4rem', width: '4rem', margin: 0, float: 'left'}}/>
                }
                title={item.name}
                subheader={<span>
                     <font color="red">￥{item.price}</font>
                </span>}
                style={{padding: 0}}
            />
        </ActionCustomItem>;
    };

    renderExt = () => {
        const salesUuid = getQueryString("salesUuid");
        const {openEditPrice, submitIng, price, limitPrice} = this.state;
        return <div>
            <CustomDialog
                title="修改设备套餐价格"
                open={openEditPrice}
                handelClose={() => this.setState({openEditPrice: false})}
                handleSure={() => this.handelEditPrice()}
                loading={submitIng}
                content={
                    <Form
                        ref="form"
                        v-data={this.state}
                        setState={this.stateFun}>
                        <CustomInput
                            labelProps={{
                                style: {whiteSpace: "nowrap"}
                            }}
                            labelText={`套餐价格${limitPrice ? `（不能低于${limitPrice}）` : ""}`}
                            placeholder="最多保留两位小数"
                            name="price"
                            value={(price || "") + ""}
                            reg={this.validPrice}
                        />
                    </Form>
                }
            />
        </div>;
    };

    getFixBottom = () => {
        return 56;
    };

    editPrice = (item) => {
        this.setState({
            openEditPrice: true,
            editItem: item,
            limitPrice: item.limitPrice,
            price: item.price
        });
    };

    validPrice = (v) => {
        const {limitPrice} = this.state;
        if (!/^\d+(.\d{1,2})?$/g.test(v)) {
            return false;
        }
        if (limitPrice) {
            return parseFloat(v).toFixed(2) >= limitPrice;
        } else {
            return parseFloat(v).toFixed(2) > 0;
        }
    };

    handelEditPrice = () => {
        const {price, editItem} = this.state;
        if (this.refs.form.valid()) {
            this.setState({submitIng: true});
            this.props.priceState.saveProductPrice({prices: [price], uuids: [editItem.uuid]})
                .then(res => {
                    editItem.price = price;
                    this.setState({submitIng: false, openEditPrice: false, editItem: editItem});
                })
                .catch(err => this.setState({submitIng: false}));
        }
    };
}

PricePage.defaultProps = {
    showSearch: false
};

