import React from "react";
import BaseComponent from "../../components/common/BaseComponent";
import withStyles from "material-ui/styles/withStyles";
import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import CustomInput from "../../components/CustomInput/CustomInput";
import Form from "../../components/Form/BaseForm";
import customStyle from "../../assets/jss/view/custom";
import {withRouter} from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import CircularProgress from "material-ui/Progress/CircularProgress";
import MultiPictureUpload from "../../components/CustomUpload/MultiPictureUpload";
import Picker from 'react-picker-address';
import 'react-picker-address/dist/react-picker-address.css';
import {district} from "../../utils/district";
import {getQueryString, setTitle} from "../../utils/comUtils";
import _ from "lodash";
import UserState from "../../stores/userState";
import Const from "../../utils/const";

@withRouter
@withStyles({...customStyle, ...{
        formContainer: {
            padding: 0,
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
@inject("userState", "salesState")
@observer
export default class EditPartnerProportion extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        setTitle("修改代理商设备分成比例");
        this.state = {
            deviceUuid: getQueryString("deviceUuid"),
            partnerProportionDetail: [],
            editProportionDetail: []
        };

    }

    componentDidMount() {
         this.getPartnerProportionDetail();
    }

    render() {
        const {classes = ""} = this.props;
        const {partnerProportionDetail, editProportionDetail, total, errorTxt} = this.state;
        return <div>
            <div className={classes.card + " " + classes.formContainer}>
                <h5 style={{backgroundColor: '#fafafa', padding: 12, textAlign: 'center'}}>总比例: {total || ""}%</h5>
                {
                    partnerProportionDetail.map((detail, index) => <div key={index} style={{padding: 12}}>
                        <p>
                            代理商： {detail.salesName || ""}
                        </p>
                        <CustomInput
                            labelText={`代理商分成比例(当前：${detail.proportion || 0}%)`}
                            value={editProportionDetail[index]["proportion"] + "" || ""}
                            error={!Const.VALID_PROPORTION_100.test(editProportionDetail[index]["proportion"])}
                            errorTxt={"请输入0~100之间的数字"}
                            inputProps={{
                                onChange: v => {
                                    editProportionDetail[index]["proportion"] = v.target.value;
                                    this.setState({editProportionDetail});
                                    this.valid();
                                }
                            }}
                            required
                        />
                    </div>)
                }
                <h5 style={{color: 'red', textAlign: 'center'}}>{errorTxt}</h5>
            </div>


            <div style={{marginTop: '1rem', backgroundColor: 'white'}}>
                <ListItem className={classes.item} style={{borderBottom: '0.01rem solid #dadada'}} onClick={this.modify}>
                    <ListItemText
                        primary={<div style={{margin: 0, padding: 0, textAlign: 'center'}}>
                            {
                                this.state.submiting ? <div style={{paddingTop: 4}}><CircularProgress color="secondary" size={16} /></div> : "提交"
                            }
                        </div>}
                    />
                </ListItem>
            </div>
        </div>;
    }

    /**
     * 修改代理商信息
     */
    modify = () => {
        if (this.state.submiting) {
            return;
        }
        if (!this.valid()) {
            const {deviceUuid, editProportionDetail} = this.state;
            this.setState({submiting: true});
            this.state.submiting = true;
            this.props.salesState.savePartnerDeviceProportion(deviceUuid, editProportionDetail)
                .then(res => {
                    this.setState({submiting: false});
                    this.alert("修改代理商设备比例成功！", "操作成功", () => this.back(), () => this.back());
                })
                .catch(err => this.setState({submiting: false}));
        }
    };

    /**
     * 验证比例范围
     * @returns {string}
     */
    valid = () => {
        const {editProportionDetail, total} = this.state;
        let errorTxt = "";
        let totalProportion = 0;
        editProportionDetail.forEach(detail => {
            const {proportion} = detail;
            if (!Const.VALID_PROPORTION_100.test(proportion)) {
                errorTxt = " 请正确输入比例";
            }
            totalProportion += parseFloat(proportion).toFixed(2) * 100;
        });
        if (totalProportion > total * 100) {
            errorTxt += " 总比例不能大于" + total + "%";
        }
        this.setState({errorTxt});
        return errorTxt;
    };

    /**
     * 获取代理商设备分成详情
     */
    getPartnerProportionDetail = () => {
        const {deviceUuid} = this.state;
        this.setState({submiting: true});
        this.props.salesState.getPartnerProportionDetail(deviceUuid)
            .then(({level: partnerProportionDetail, total}) => {
                const editProportionDetail = [];
                partnerProportionDetail.forEach(detail => editProportionDetail.push({
                    salesUuid: detail.salesUuid,
                    proportion: detail.proportion
                }));
                this.setState({partnerProportionDetail, editProportionDetail, total, submiting: false});
            })
            .catch(err => this.setState({submiting: false}));
    };

}
