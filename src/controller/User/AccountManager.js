import React from "react";
import withStyles from "material-ui/styles/withStyles";
import md5 from "md5";
import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import customStyle from "../../assets/jss/view/custom";
import Form from "../../components/Form/BaseForm";
import AddIcon from '@material-ui/icons/Add';
import svgBottom from "../../assets/svg/bottom-tear.svg";
import PullRefreshPage from "../../components/CommonPage/PullrefreshPage";
import Radio from '@material-ui/core/Radio';
import {setTitle} from "../../utils/comUtils";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ActionCustomItem from "../../components/CustomItem/ActionCustomItem";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from '@material-ui/core/Button';
import Const from "../../utils/const";

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
    }
};
@withStyles(style)
@inject("userState")
@observer
export default class AccountManager extends PullRefreshPage {

    constructor(props) {
        super(props);
        setTitle("管理账号");
        this.state.loginName = "";
        this.state.password = "";
        this.state.phone = "";
        this.state.realName = "";
        this.state.isInit = Const.FORCE_CHANGE_PASSWORD_FIRST_LOGIN;
    }

    pageAction = (data) => {
        return this.props.userState.getManagePage(data);
    };

    listItem = (item) => {
        const {submitIng} = this.state;
        const {classes = ""} = this.props;
        return <ActionCustomItem
            key={item.loginName}
            loading={!!submitIng}
            showAction={(submitIng && submitIng === item.deviceUuid) || !submitIng}
            onActionClick={() => this.openDrawerMenu({drawerMenus: [
                {label: '修改信息', onClick: () => this.doEditManageAccount(item)},
                {label: '更改密码', onClick: () => this.doEditManagePwd(item)},
            ]})}>
            <div>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>{item.isAdmin === 1 ? "超级管理员" : ""}</font>
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>名称：</font>{item.realName}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>账号：</font>{item.loginName}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>电话：</font>{item.phone}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>上次登录IP：</font>{item.lastLoginIp || "暂无记录"}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>上次登录时间：</font>{item.lastLoginTime || "暂无记录"}
                </p>
            </div>
        </ActionCustomItem>;
    };

    renderExt = () => {
        const {editItem, loginName, password, phone, realName, isInit, submitIng, openEditManage, openEditManagePwd} = this.state;
        const {classes} = this.props;
        return <div>
            <Button className={classes.menuBottomButton} style={{bottom: 58}} onClick={this.doAddManageAccount}>
                <AddIcon/> 添加
            </Button>

            <CustomDialog
                title={editItem ? "修改管理账号信息" : "添加管理账号账号"}
                open={openEditManage}
                style={{margin: '4%'}}
                handelClose={() => this.setState({openEditManage: false})}
                handleSure={() => this.handelSaveAccount()}
                loading={submitIng}
                content={
                    editItem ? <Form
                                    ref="form"
                                    v-data={this.state}
                                    setState={this.stateFun}>
                            <CustomInput
                                placeholder="电话号码"
                                labelText="11位手机号码"
                                value={phone}
                                name="phone"
                                reg={/^\d{11}$/}
                                required
                            />

                            <CustomInput
                                labelText="管理者名称"
                                value={realName}
                                name="realName"
                                required
                            />
                        </Form> : <Form
                                    ref="form"
                                    v-data={this.state}
                                    setState={this.stateFun}>
                        <CustomInput
                            placeholder="电话号码"
                            labelText="11位手机号码"
                            value={phone}
                            name="phone"
                            reg={/^\d{11}$/}
                            required
                        />

                        <CustomInput
                            labelText="管理员名称"
                            value={realName}
                            name="realName"
                            required
                        />

                        <CustomInput
                            labelText="管理登录账户"
                            placeholder="长度3~20/电话号码/email"
                            value={loginName}
                            name="loginName"
                            required
                            reg={v => {
                                if (v.length >= 3 && v.length <= 20) {
                                    return (v.indexOf('.') < 0 || (v.indexOf('.') >= 1 && Const.VALID_USERNAME_EMAIL.test(v)));
                                        // checkLoginName({loginName: value}).then(response => {
                                        //     return response.result === false ? callback(new Error('此名已被占用或校验不通过')) : callback();
                                        // });
                                } else {
                                     return false;
                                }
                            }}
                        />
                        <CustomInput
                            labelText="登录密码"
                            placeholder="8~20位，大小写字母与数字组合"
                            value={password}
                            name="password"
                            required
                            reg={v => Const.VALID_PASSWORD.test(v)}
                        />
                        <FormControlLabel
                            label="强制修改密码"
                            className="form-control-label"
                            labelPlacement="start"
                            onChange={v => this.setState({isInit: parseInt(v.target.value, 10)})}
                            control={<div>
                                <FormControlLabel
                                    checked={isInit === Const.FORCE_CHANGE_PASSWORD_FIRST_LOGIN}
                                    value={Const.FORCE_CHANGE_PASSWORD_FIRST_LOGIN + ""}
                                    control={<Radio/>}
                                    label="是"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    checked={isInit === Const.FORCE_CHANGE_PASSWORD_FIRST_LOGIN_DISABLE}
                                    value={Const.FORCE_CHANGE_PASSWORD_FIRST_LOGIN_DISABLE + ""}
                                    control={<Radio />}
                                    label="否"
                                    labelPlacement="end"
                                />
                            </div>}
                        />
                            <hr style={{margin: 0, borderBottom: '1px solid #d2d2d2', marginBottom: 10, borderTop: 'none'}}/>
                    </Form>
                }
            />

            <CustomDialog
                title="修改管理账号密码"
                open={openEditManagePwd}
                handelClose={() => this.setState({openEditManagePwd: false})}
                handleSure={() => this.handelSaveAccountPwd()}
                loading={submitIng}
                content={
                    <Form
                        ref="form"
                        v-data={this.state}
                        setState={this.stateFun}>
                        <p className={classes.infoLine}>
                            <font className={classes.infoLabel}>登录账号：</font>{editItem.loginName}
                        </p>
                        <CustomInput
                            labelText="登录密码"
                            placeholder="8~20位大小写字母与数字"
                            value={password}
                            name="password"
                            required
                            reg={v => Const.VALID_PASSWORD.test(v)}
                        />
                    </Form>
                }
            />
        </div>;
    };


    getFixBottom = () => {
        return 56;
    };

    doAddManageAccount = (item) => {
        this.setState({
            openEditManage: true,
            editItem: "",
            realName: "",
            userName: "",
            password: "",
            loginName: "",
            phone: "",
            isInit: Const.FORCE_CHANGE_PASSWORD_FIRST_LOGIN
        });
    };

    doEditManageAccount = (item) => {
        const {phone, realName, userName} = item;
        this.setState({openEditManage: true, editItem: item, realName: realName, userName: userName, phone: phone});
    };

    doEditManagePwd = (item) => {
        this.setState({openEditManagePwd: true, editItem: item});
    };

    /**
     * 保存或修改管理账号
     * @returns {*}
     */
    handelSaveAccount = () => {
        const {editItem, loginName, password, phone, realName, isInit} = this.state;
        if (this.refs.form.valid()) {
            const form = {};
            form.realName = realName;
            form.userName = realName;
            form.phone = phone;
            if (editItem) {
                form.uuid = editItem.uuid;
            } else {
                form.loginName = loginName;
                form.password = md5(password);
                form.isInit = isInit;
            }
            this.setState({submitIng: true});
            return this.props.userState.saveUserManagerAccountInfo(form)
                .then(res => {
                    this.setState({submitIng: false, openEditManage: false, proportions: ""});
                    this.handelPageRefresh();
                    setTimeout(() => {
                        this.notification(editItem ? "修改管理账号信息成功" : "添加管理账号成功");
                    }, 300);
                })
                .catch(err => this.setState({submitIng: false}));
        }
    };

    /**
     * 修改管理者账户密码
     * @returns {Observable<any> | * | Promise<T | void>}
     */
    handelSaveAccountPwd = () => {
        const {password, editItem} = this.state;
        if (!editItem) {
            return;
        }
        if (this.refs.form.valid()) {
            this.setState({submitIng: true});
            return this.props.userState.updateUserPassword({newpwd: md5(password), uuid: editItem.uuid})
                .then(res => {
                    this.setState({submitIng: false, openEditManagePwd: false, editItem: ""});
                    this.notification("修改账号密码成功");
                })
                .catch(err => this.setState({submitIng: false}));
        }
    };
}

AccountManager.defaultProps = {
    showSearch: false
};
