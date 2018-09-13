import React from "react";
// material-ui components
import withStyles from "material-ui/styles/withStyles";
import InputAdornment from "material-ui/Input/InputAdornment";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import LockOutline from "@material-ui/icons/LockOutlined";
// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import ItemGrid from "../../components/Grid/ItemGrid.jsx";
import LoginCard from "../../components/Cards/LoginCard.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";

import loginPageStyle from "../../assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import BaseComponent from "../../components/common/BaseComponent";
import Form from "../../components/Form/BaseForm";
import md5 from "md5";
import CircularProgress from "material-ui/Progress/CircularProgress";
import Path from "../../utils/path";
import {getCookie, getSession, removeSession, setCookie, setTitle} from "../../utils/comUtils";
import loginBg from "../../assets/img/bg/login_bg.jpg";

@inject("userState")
@observer
@withRouter
@withStyles({...loginPageStyle,
    ...{
        loginBg: {
            backgroundImage: `url(${loginBg})`,
            backgroundSize: '100% auto',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#0d0101',
        },
        loginButton: {
            width: '100%',
            background: '#ffffff47',
            padding: '1rem 2rem',
            color: 'white',
        }
    }
}, {name: "loginPage", flip: true, withTheme: true})
export default class LoginPage extends BaseComponent {
    constructor(props) {
        super(props);
        setTitle("金麦客商户通");
        this.state = {
            cardAnimaton: "cardHidden",
            submiting: false,
            subInfo: "",
            loginname: getCookie("loginname") || "",
            password: ""
        };
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        setTimeout(
            function () {
                this.setState({cardAnimaton: ""});
            }.bind(this),
            700
        );
        this.appLoadingDone();
    }

    render() {
        const {classes = ""} = this.props;
        const {subInfo} = this.state;
        return (
            <div className={[classes.content, classes.loginBg].join(" ")}>
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <ItemGrid xs={12} sm={6} md={4}>
                            <form>
                                <LoginCard
                                    customCardClass={classes[this.state.cardAnimaton]}
                                    headerColor="black"
                                    cardTitle="微信商户平台"
                                    cardSubtitle={<span style={{color: subInfo ? 'red' : ""}}>
                                        {subInfo || "请登陆"}
                                    </span>}
                                    footerAlign="center"
                                    footer={
                                        <Button color="roseNoBackground" wd size="lg" disabled={this.state.submiting} onClick={this.state.submiting ? null : this.login}>
                                            {
                                                this.state.submiting && <CircularProgress color="secondary" size={14} />
                                            }
                                            登录
                                        </Button>
                                    }
                                    content={
                                        <div>
                                            <Form
                                                ref="form"
                                                v-data={this.state}
                                                setState={this.stateFun}>
                                                <CustomInput
                                                    labelText="登录名"
                                                    value={this.state.loginname}
                                                    name="loginname"
                                                    required
                                                />
                                                <CustomInput
                                                    labelText="密码"
                                                    inputProps={{
                                                        type: "password",
                                                    }}
                                                    value={this.state.password}
                                                    name="password"
                                                    required
                                                />
                                            </Form>
                                        </div>
                                    }
                                />
                            </form>
                        </ItemGrid>
                    </GridContainer>
                </div>
            </div>
        );
    }

    login() {
        const {loginname, password} = this.state;
        setTimeout(() => {
            if (this.refs.form.valid()) {
                this.setState({submiting: true});
                const param = {
                    loginname: loginname,
                    password: md5(password)
                };
                const bindUuid = getSession("bindUuid");
                if (bindUuid) {
                    param.bindUuid = bindUuid;
                }
                this.props.userState.login(param)
                    .then(res => {
                        this.setState({submiting: false});
                        removeSession("bindUuid");
                        setCookie("loginname", loginname);
                        this.props.history.push(Path.PATH_INDEX);
                    })
                    .catch(err => this.setState({submiting: false, subInfo: err.msg}));
            }
        }, 500);
    }
}
