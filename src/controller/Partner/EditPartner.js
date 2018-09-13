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
@inject("userState", "salesState")
@observer
export default class EditPartner extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        setTitle("添加代理商");
        this.state = {
            salesUuid: getQueryString("salesUuid"),
            isAgent: UserState.AGENT_TYPE_NOT_AGENT,
            isInit: Const.FORCE_CHANGE_PASSWORD_FIRST_LOGIN,
            name: "",
            uuid: "",
            alipayAccount: "",
            method: '1',
            parentProportions: "",
            phone: "",
            sendOrderUrl: "",
            remark: "",
            areas: "",
            address: "",
            images: [],
            showCityPicker: false,
            areaId: ""
        };
    }

    componentDidMount() {
        if (this.state.salesUuid) {
            this.getPartnerDetail();
        }
    }

    render() {
        const {classes = ""} = this.props;
        const {loginUserData} = this.props.userState;
        let {salesUuid, isAgent, isInit, password, name, alipayAccount, method, parentProportions, phone, sendOrderUrl, remark, region, city, area, address, images, areaId} = this.state;
        return <div>
            <div className={classes.card + " " + classes.formContainer}>
                <Form
                    ref="form"
                    v-data={this.state}
                    setState={this.stateFun}>
                    <CustomInput
                        placeholder="合作伙伴名称"
                        labelText="名称"
                        value={name}
                        name="name"
                        required
                    />
                    {
                        !salesUuid && <CustomInput
                            placeholder="合作伙伴电话号码"
                            labelText="绑定电话（登陆账号）"
                            value={phone}
                            name="phone"
                            reg={/^\d{11}$/}
                            required
                        />
                    }

                    {
                        !salesUuid && <CustomInput
                            placeholder="登录密码"
                            labelText="代理商登录密码"
                            value={password}
                            name="password"
                            required
                        />
                    }

                    {
                        !salesUuid && <div>
                            <FormControlLabel
                                label="首次登录强制修改密码"
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
                        </div>
                    }

                    <div>
                        <FormControlLabel
                            label="是否为代理商"
                            className="form-control-label"
                            labelPlacement="start"
                            onChange={v => this.setState({isAgent: parseInt(v.target.value, 10)})}
                            control={<div>
                                <FormControlLabel
                                    checked={isAgent === UserState.AGENT_TYPE_NOT_AGENT}
                                    value={UserState.AGENT_TYPE_NOT_AGENT + ""}
                                    control={<Radio/>}
                                    label="否"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    checked={isAgent === UserState.AGENT_TYPE_AGENT}
                                    value={UserState.AGENT_TYPE_AGENT + ""}
                                    control={<Radio />}
                                    label="是"
                                    labelPlacement="end"
                                />
                            </div>}
                        />
                        <hr style={{margin: 0, borderBottom: '1px solid #d2d2d2', marginBottom: 10, borderTop: 'none'}}/>
                    </div>

                    <CustomInput
                        labelText="支付宝账号"
                        placeholder="合作伙伴支付宝账号"
                        value={alipayAccount}
                        name="alipayAccount"
                    />

                    {
                        !salesUuid && <CustomInput
                            placeholder="请输入0~100之间的数字"
                            labelText="结算比例配置（%）"
                            value={parentProportions}
                            name="parentProportions"
                            reg={/^\d{1,2}(\.\d{1,2})?$|^100$/}
                            required
                        />
                    }

                    {
                        !salesUuid && <div>
                            <FormControlLabel
                                label="结算方式"
                                className="form-control-label"
                                labelPlacement="start"
                                control={<div>
                                    <FormControlLabel
                                        disabled
                                        checked
                                        value={'1'}
                                        control={<Radio/>}
                                        label="手动（暂时仅限）"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        disabled
                                        value={'2'}
                                        control={<Radio />}
                                        label="自动"
                                        labelPlacement="end"
                                    />
                                </div>}
                            />
                            <hr style={{margin: 0, borderBottom: '1px solid #d2d2d2', marginBottom: 10, borderTop: 'none'}}/>
                        </div>
                    }

                    <div>
                        <FormControlLabel
                            className="form-control-label"
                            control={<div>
                                <MultiPictureUpload
                                    ref="fileUpload"
                                    enableLabel={false}
                                    uploadSuccess={url => {
                                        images.push(url);
                                        this.setState({images: images});
                                    }}
                                    uploadAction={this.uploadUserAvatarAction}/>
                            </div>}
                            label="电子协议"
                            labelPlacement="start"
                        />

                        <FormControlLabel
                            style={images && images.length > 0 ? {display: 'block'} : {}}
                            className="form-control-label"
                            control={<div>
                                {
                                    images && images.length > 0 && <div className={classes.imagesContainer}>
                                        {
                                            images.map(url => <div key={url} className={classes.imgSpan}>
                                                <div className={classes.delIcon}>
                                                    <DeleteIcon style={{fontSize: '1.4rem'}} onClick={() => {
                                                        this.refs.fileUpload.refs.file.value = "";
                                                        const _images = images.filter(u => u !== url);
                                                        this.setState({images: _images});
                                                    }}/>
                                                </div>
                                                <img src={url} className={classes.img}/>
                                            </div>)
                                        }
                                    </div>
                                }
                            </div>}
                            label=" "
                            labelPlacement="start"
                        />
                        <hr style={{borderBottom: '1px solid #d2d2d2', margin: '10 0', borderTop: 'none'}}/>
                    </div>


                    {/*<CustomInput
                        placeholder="http://......"
                        labelText="发送订单链接"
                        value={sendOrderUrl}
                        name="sendOrderUrl"
                    />*/}

                    <CustomInput
                        disabled
                        labelText="所在区域"
                        value={region || city || area ? `${region} ${city} ${area}` : "点击选择所在省市区"}
                        name="areas"
                        onClick={() => this.setState({showCityPicker: true})}
                    />

                    <CustomInput
                        labelText="详细地址"
                        value={address}
                        name="address"
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

                {
                    this.state.showCityPicker && <Picker
                        title={"请选择合作伙伴区域"}
                        visible={this.state.showCityPicker}
                        onClose={() => this.setState({showCityPicker: false})}
                        dataSource={district}
                        value={(areaId || "").split(",")}
                        onChange={(v, a) => {
                            if (v) {
                                const areaId = v.join(",");
                                const region = a[0]['title'];
                                const city = a[1]['title'];
                                const area = a[2]['title'];
                                this.setState({showCityPicker: false, areaId: areaId, region: region, city: city, area: area});
                            } else {
                                this.setState({showCityPicker: false, areaId: "", region: "", city: "", area: ""});
                            }
                        }}
                    />
                }

            </div>

            <div style={{marginTop: '1rem', backgroundColor: 'white'}}>
                <ListItem className={classes.item} style={{borderBottom: '0.01rem solid #dadada'}} onClick={salesUuid ? this.modify : this.submit}>
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
     * 新建代理商信息
     */
    submit = () => {
        if (this.state.submiting) {
            return;
        }
        if (this.refs.form.valid()) {
            const {name, alipayAccount, method, password, parentProportions, phone, sendOrderUrl, remark, region, city, area, areaId, address, images, isAgent, isInit} = this.state;
            this.setState({submiting: true});
            this.state.submiting = true;
            this.props.salesState.editSalesData({
                name: name,
                password: password,
                isAgent: isAgent,
                isInit: isInit,
                alipayAccount: alipayAccount,
                method: 1,
                parentProportions: parentProportions,
                phone: phone,
                // sendOrderUrl: sendOrderUrl,
                remark: remark,
                areaId: areaId,
                region: region,
                city: city,
                area: area,
                address: address,
                images: images
            })
                .then(res => {
                    this.setState({submiting: false});
                    this.alert(res.password ? ("新创建的代理商初始密码为: " + res.password + " 请尽快登陆修改！") : "", "创建代理商成功", () => this.back(), () => this.back());
                })
                .catch(err => this.setState({submiting: false}));
        }
    };

    /**
     * 修改代理商信息
     */
    modify = () => {
        if (this.state.submiting) {
            return;
        }
        if (this.refs.form.valid()) {
            const {name, alipayAccount, remark, region, city, area, areaId, address, images, uuid, isAgent} = this.state;
            this.setState({submiting: true});
            this.state.submiting = true;
            this.props.salesState.editSalesData({
                uuid: uuid,
                name: name,
                alipayAccount: alipayAccount,
                remark: remark,
                areaId: areaId,
                region: region,
                city: city,
                area: area,
                address: address,
                images: images
            })
                .then(res => {
                    this.setState({submiting: false});
                    this.alert("代理商信息修改成功！", "操作成功", () => this.back(), () => this.back());
                })
                .catch(err => this.setState({submiting: false}));
        }
    };

    refreshUserInfo = () => {
        this.props.userState.getUserInfo();
    };

    uploadUserAvatarAction = (data) => {
        return this.props.userState.uploadImage(data)
            .then(setTimeout(() => this.props.userState.getUserInfo(), 500));
    };

    /**
     * 获取代理商详情
     */
    getPartnerDetail = () => {
        const {salesUuid} = this.state;
        this.setState({submiting: true});
        this.props.salesState.getPartnerDetail(salesUuid)
            .then(res => {
                const cloneRes = _.clone(res);
                cloneRes.name = res.viewName;
                cloneRes.images = res.list;
                this.setState({...cloneRes, submiting: false});
            })
            .catch(err => this.setState({submiting: false}));
    };

}
