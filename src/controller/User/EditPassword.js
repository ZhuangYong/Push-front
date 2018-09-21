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
import md5 from "md5";
import CircularProgress from "material-ui/Progress/CircularProgress";
import {setTitle} from "../../utils/comUtils";
import Const from "../../utils/const";

@withRouter
@withStyles({...customStyle, ...{
    formContainer: {
        padding: '2rem',
        backgroundColor: 'white',
        boxShadow: '1px 1px 8px 3px #80808014',
    }
}})
@inject("userState")
@observer
export default class EditPassword extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        setTitle("修改密码");
        this.state = {
            oldpwd: "",
            newpwd: "",
            newpwdAgain: ""
        };
    }

    render() {
        const {classes = ""} = this.props;
        const {loginUserData} = this.props.userState;
        let {oldpwd, newpwd, newpwdAgain} = this.state;
        const {configData} = this.props.userState;
        const {isInit} = configData || {};
        return <div>
            <div className={classes.card + " " + classes.formContainer}>
                {
                    isInit === Const.FORCE_CHANGE_PASSWORD_FIRST_LOGIN && <div>
                        <h5>为了安全，请修改默认密码！</h5>
                    </div>
                }
                <Form
                    ref="form"
                    v-data={this.state}
                    initialData={loginUserData}
                    setState={this.stateFun}>
                    <CustomInput
                        labelText="原密码"
                        value={oldpwd}
                        name="oldpwd"
                        required
                        inputProps={{
                            type: "password",
                        }}
                    />
                    <CustomInput
                        labelText="新密码"
                        placeholder="长度8~20,必须包含大小写字母与数字"
                        value={newpwd}
                        name="newpwd"
                        reg={v => Const.VALID_PASSWORD.test(v)}
                        required
                        inputProps={{
                            type: "password",
                        }}
                    />
                    <CustomInput
                        labelText="再次确认密码"
                        value={newpwdAgain}
                        name="newpwdAgain"
                        reg={v => v === newpwd}
                        required
                        inputProps={{
                            type: "password",
                        }}
                    />
                </Form>
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
            const {oldpwd, newpwd} = this.state;
            this.props.userState.updateUserPassword({
                oldpwd: md5(oldpwd),
                newpwd: md5(newpwd),
            })
                .then(res => {
                    this.alert("密码修改成功，请重新登录", "", this.logout, this.logout);
                })
                .catch(err => this.setState({submiting: false}));
        }
    };

    logout = () => {
        this.props.userState.logout().then(res => {
            this.linkTo(Path.PATH_LOGIN);
        }).catch(err => this.setState({submiting: false}));
    }

}
