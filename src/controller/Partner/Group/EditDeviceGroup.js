import React from "react";
import BaseComponent from "../../../components/common/BaseComponent";
import withStyles from "material-ui/styles/withStyles";
import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import CustomInput from "../../../components/CustomInput/CustomInput";
import Form from "../../../components/Form/BaseForm";
import customStyle from "../../../assets/jss/view/custom";
import {withRouter} from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from "material-ui/Progress/CircularProgress";
import 'react-picker-address/dist/react-picker-address.css';
import {getQueryString, setTitle} from "../../../utils/comUtils";

@withRouter
@withStyles({...customStyle, ...{
        formContainer: {
            padding: '.6rem 2rem',
            backgroundColor: 'white',
            boxShadow: '1px 1px 8px 3px #80808014',
        },
        imagesContainer: {
            width: '100%',
            float: 'left',
            padding: '1rem 0 .8rem .8rem'
        },
        imgSpan: {
            width: '4rem',
            height: '4rem',
            float: 'left',
            display: 'flex',
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '.8rem .8rem 0 0',
            border: '1px solid #e4e4e4',
        },
        delIcon: {
            top: '-.6rem',
            right: '-.6rem',
            width: '2rem',
            height: '2rem',
            color: 'white',
            display: 'flex',
            position: 'absolute',
            alignItems: 'center',
            backgroundColor: 'red',
            borderRadius: '2rem',
            justifyContent: 'center',
        },
        img: {
            maxWidth: '96%',
            maxHeight: '96%',
        }
}})
@inject("salesState", "userState")
@observer
export default class EditDeviceGroup extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        setTitle("添加代理商分成组");
        this.state = {
            salesUuid: getQueryString("salesUuid"),
            groupUuid: getQueryString("groupUuid"),
            name: "",
            parentProportions: "",
            remark: "",
        };
    }

    componentDidMount() {
        this.initial();
    }

    render() {
        const {classes = ""} = this.props;
        let {name, parentProportions, remark} = this.state;
        const {partnerDetailData} = this.props.salesState;
        return <div>
            <div className={classes.card + " " + classes.formContainer}>
                <Form
                    ref="form"
                    v-data={this.state}
                    setState={this.stateFun}>
                    <CustomInput
                        placeholder=""
                        labelText="分成组名称"
                        value={name}
                        name="name"
                        required
                    />
                    <CustomInput
                        placeholder="请输入0~100之间的数字"
                        labelText={`结算比例配置（%）不能高于 ${partnerDetailData.proportion}`}
                        value={parentProportions}
                        name="parentProportions"
                        reg={v => /^\d{1,2}(\.\d{1,2})?$|^100$/.test(v) && v <= partnerDetailData.proportion}
                        required
                    />
                    <CustomInput
                        labelText="备注"
                        value={remark}
                        inputProps={{
                            multiline: true,
                            rows: 2,
                        }}
                        name="remark"
                    />
                </Form>

            </div>

            {
                partnerDetailData && <div style={{marginTop: '1rem', backgroundColor: 'white'}}>
                    <ListItem className={classes.item} style={{borderBottom: '0.01rem solid #dadada'}} onClick={this.submit}>
                        <ListItemText
                            primary={<div style={{margin: 0, padding: 0, textAlign: 'center'}}>
                                {
                                    this.state.submiting ? <div style={{paddingTop: 4}}><CircularProgress color="secondary" size={16} /></div> : "提交"
                                }
                            </div>}
                        />
                    </ListItem>
                </div>
            }
        </div>;
    }

    submit = () => {
        if (this.refs.form.valid()) {
            const {name, parentProportions, remark, salesUuid} = this.state;
            this.setState({submiting: true});
            this.props.salesState.saveDeviceGroup({
                salesUuid: salesUuid,
                name: name,
                parentProportions: parentProportions,
                remark: remark,
            })
                .then(res => {
                    this.setState({submiting: false});
                    this.alert("创建分组成功！", "", () => this.back(), () => this.back());
                })
                .catch(err => this.setState({submiting: false}));
        }
    };

    initial = () => {
        // 如果没有 salesUuid 将退回上个页面
        const {salesUuid} = this.state;
        const {partnerDetailData} = this.props.salesState;
        if (!salesUuid) {
            this.back();
        }
        if (!partnerDetailData) {
            this.getPartnerDetail();
        }
    };

    getPartnerDetail = () => {
        const {salesUuid} = this.state;
        this.props.salesState.getPartnerDetail(salesUuid);
    };

}
