import React from "react";
import PullRefreshPage from "../../components/CommonPage/PullrefreshPage";
import {inject, observer} from "mobx-react/index";
import ListItem from '@material-ui/core/ListItem';
import CardHeader from '@material-ui/core/CardHeader';
import customStyle from "../../assets/jss/view/custom";
import withStyles from "material-ui/styles/withStyles";
import {BlankImage, EditIcon} from "../../components/common/SvgIcons";
import {getQueryString} from "../../utils/comUtils";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Form from "../../components/Form/BaseForm";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import CustomInput from "../../components/CustomInput/CustomInput";

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
@inject(({store: {priceState, userState}}) => ({priceState, userState}))
@observer
export default class PricePage extends PullRefreshPage {
    constructor(props) {
        super(props);
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
        return <ListItem key={item.id} className={classes.item}>
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
            <ListItemSecondaryAction>
                <EditIcon color="#e91e63" size='2.2rem' onClick={() => this.editPrice(item)}/>
            </ListItemSecondaryAction>
        </ListItem>;
    };

    renderExt = () => {
        const salesUuid = getQueryString("salesUuid");
        const {openEditPrice, submitIng} = this.state;
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
                        setState={this.stateFun}>
                        <CustomInput
                            labelText="套餐价格"
                            name="price"
                            value={(this.state.price || "") + ""}
                            reg={this.validPrice}
                        />
                    </Form>
                }
            />
        </div>;
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
        if (limitPrice) {
            return parseInt(v, 10) >= limitPrice;
        } else {
            return parseInt(v, 10) > 0;
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
