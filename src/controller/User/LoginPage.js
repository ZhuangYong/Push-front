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

@inject(({store: {userState}}) => ({userState}))
@observer
@withRouter
@withStyles(loginPageStyle)
export default class LoginPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            cardAnimaton: "cardHidden",
            submiting: false,
            subInfo: ""
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
    }

    render() {
        const {classes = ""} = this.props;
        const {subInfo} = this.state;
        return (
            <div className={classes.content}>
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <ItemGrid xs={12} sm={6} md={4}>
                            <form>
                                <LoginCard
                                    customCardClass={classes[this.state.cardAnimaton]}
                                    headerColor="blue"
                                    cardTitle="微信共享商户平台"
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
                                            <Form v-data={this.formData} ref="form">
                                                <CustomInput
                                                    labelText="登录名"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <Face className={classes.inputAdornmentIcon}/>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    name="loginname"
                                                    required
                                                />
                                                <CustomInput
                                                    labelText="密码"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        type: "password",
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <LockOutline
                                                                    className={classes.inputAdornmentIcon}
                                                                />
                                                            </InputAdornment>
                                                        )
                                                    }}
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
        if (this.refs.form.valid()) {
            this.setState({submiting: true});
            this.props.userState.login({
                loginname: this.formData.loginname,
                password: md5(this.formData.password)
            })
                .then(res => {
                    this.setState({submiting: false});
                    this.props.history.push(Path.PATH_INDEX);
                })
                .catch(err => this.setState({submiting: false, subInfo: err.msg}));
        }
    }
}
