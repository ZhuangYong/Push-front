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
import {setTitle} from "../../utils/comUtils";

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
            name: "",
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

    render() {
        const {classes = ""} = this.props;
        const {loginUserData} = this.props.userState;
        let {name, alipayAccount, method, parentProportions, phone, sendOrderUrl, remark, region, city, area, address, images, areaId} = this.state;

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
                    <CustomInput
                        placeholder="合作伙伴电话号码"
                        labelText="绑定电话（登陆账号）"
                        value={phone}
                        name="phone"
                        reg={/^\d{11}$/}
                        required
                    />
                    <CustomInput
                        labelText="支付宝账号"
                        placeholder="合作伙伴支付宝账号"
                        value={alipayAccount}
                        name="alipayAccount"
                    />

                    <CustomInput
                        placeholder="请输入0~100之间的数字"
                        labelText="结算比例配置（%）"
                        value={parentProportions}
                        name="parentProportions"
                        reg={/^\d{1,2}(\.\d{1,2})?$|^100$/}
                        required
                    />

                    <div>
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
                    </div>

                    <hr style={{margin: 0, borderBottom: '1px solid #d2d2d2', marginBottom: 10, borderTop: 'none'}}/>

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
                    </div>

                    <hr style={{borderBottom: '1px solid #d2d2d2', margin: '10 0', borderTop: 'none'}}/>

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
            const {name, alipayAccount, method, parentProportions, phone, sendOrderUrl, remark, region, city, area, areaId, address, images} = this.state;
            this.setState({submiting: true});
            this.props.salesState.editSalesData({
                name: name,
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

    refreshUserInfo = () => {
        this.props.userState.getUserInfo();
    };

    uploadUserAvatarAction = (data) => {
        return this.props.userState.uploadImage(data)
            .then(setTimeout(() => this.props.userState.getUserInfo(), 500));
    };

}
