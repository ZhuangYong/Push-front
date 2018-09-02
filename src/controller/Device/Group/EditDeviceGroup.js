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
@inject("deviceState", "userState")
@observer
export default class EditInfo extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            name: "",
            // 1: 直营 2: 加盟 3: 同步
            type: 2,
            remark: "",
        };
    }

    render() {
        const {classes = ""} = this.props;
        let {name, remark} = this.state;

        return <div>
            <div className={classes.card + " " + classes.formContainer}>
                <Form
                    ref="form"
                    v-data={this.state}
                    setState={this.stateFun}>
                    <CustomInput
                        placeholder=""
                        labelText="设备分组名称"
                        value={name}
                        name="name"
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

            <div style={{marginTop: '1rem', backgroundColor: 'white'}}>
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
        </div>;
    }

    submit = () => {
        if (this.refs.form.valid()) {
            const {name, remark, type} = this.state;
            this.setState({submiting: true});
            this.props.deviceState.saveDeviceGroup({
                name: name,
                type: type,
                remark: remark,
            })
                .then(res => {
                    this.setState({submiting: false});
                    this.alert("创建分组成功！", "", () => this.back(), () => this.back());
                })
                .catch(err => this.setState({submiting: false}));
        }
    };

}
