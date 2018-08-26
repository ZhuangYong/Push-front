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
import Path from "../../utils/path";
import CircularProgress from "material-ui/Progress/CircularProgress";

@withRouter
@withStyles({...customStyle, ...{
    formContainer: {
        padding: '2rem',
        backgroundColor: 'white',
        boxShadow: '1px 1px 8px 3px #80808014',
    }
}})
@inject(({store: {userState}}) => ({userState}))
@inject("store")
@observer
export default class EditInfo extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            area: "",
            nickName: "",
            phone: "",
            address: "",
        };
    }

    render() {
        const {classes = ""} = this.props;
        const {loginUserData} = this.props.userState;
        let {area, nickName, phone, address} = this.state;
        if (typeof area !== "undefined") {
            area = area || "未设置";
            phone = phone || "未设置";
        }

        return <div>
            <div className={classes.card + " " + classes.formContainer}>
                <Form
                    ref="form"
                    v-data={this.state}
                    initialData={loginUserData}
                    setState={this.stateFun}>
                   {/* <CustomInput
                        labelText="所在区域"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            value: area,
                            disabled: true
                        }}
                        name="area"
                        required
                    />*/}
                    <CustomInput
                        labelText="昵称"
                        value={nickName}
                        name="nickName"
                        required
                    />
                   {/* <CustomInput
                        labelText="手机号"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            value: phone,
                            disabled: true
                        }}
                        name="phone"
                        required
                    />*/}
                    <CustomInput
                        labelText="详细地址"
                        value={address}
                        name="address"
                        required
                    />
                </Form>
                {/*<Button color="warning" disabled={this.state.submiting} onClick={() => this.back()}>
                    取消
                </Button>
                <Button color="success" disabled={this.state.submiting} onClick={this.submit}>
                    {
                        this.state.submiting && <CircularProgress color="secondary" size={14} />
                    }
                    修改
                </Button>*/}
            </div>

            <div style={{marginTop: '1rem', backgroundColor: 'white'}}>
                <ListItem className={classes.item} style={{borderBottom: '0.01rem solid #dadada'}} onClick={this.submit}>
                    <ListItemText
                        primary={<div style={{margin: 0, padding: 0, textAlign: 'center'}}>
                            {
                                this.state.submiting ? <div style={{paddingTop: 4}}><CircularProgress color="secondary" size={16} /></div> : "提交修改"
                            }
                        </div>}
                    />
                </ListItem>
            </div>
        </div>;
    }

    submit = () => {
        if (this.refs.form.valid()) {
            this.setState({submiting: true});
            const {area, nickName, phone, address} = this.state;
            this.props.userState.saveUserInfo({
                area: area,
                nickName: nickName,
                phone: phone,
                address: address,
            })
                .then(res => {
                    this.setState({submiting: false});
                    this.refreshUserInfo();
                    this.notification("修改成功");
                    setTimeout(() => this.replace(Path.PATH_USER_INDEX), 1000);
                })
                .catch(err => this.setState({submiting: false, subInfo: err.msg}));
        }
    };

    refreshUserInfo = () => {
        this.props.userState.getUserInfo();
    };

}
