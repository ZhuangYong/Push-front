import React from "react";
import BaseComponent from "../../components/common/BaseComponent";
import withStyles from "material-ui/styles/withStyles";
import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import _ from "lodash";
import Grow from '@material-ui/core/Grow';
import customStyle from "../../assets/jss/view/custom";
import {withRouter} from "react-router-dom";
import Path from "../../utils/path";
import svgBottom from "../../assets/svg/bottom-tear.svg";
import WxImageViewer from 'react-wx-images-viewer';

@withRouter
@withStyles({...customStyle, ...{
        formContainer: {
            '-webkit-column-gap': 0,
            '-webkit-column-count': 3,
            columnGap: 0,
            columnCount: 3
        },
        item: {
            padding: '.2rem',
        },
        img: {
            maxHeight: "100%",
            maxWidth: "100%",
        }
}})
@inject(({store: {userState}}) => ({userState}))
@inject("store")
@observer
export default class ElectronicAgreement extends BaseComponent {

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
        const {viewImgIndex, showImgView} = this.state;
        const {loginUserData = {}} = this.props.userState;
        return <div>
            <div className={classes.formContainer}>
                {
                    loginUserData.list && loginUserData.list.map((i, index) => {
                        return <Grow
                            key={i.id}
                            in={true}
                            timeout={index * 400}
                            style={{
                                transformOrigin: '0 0 0',
                                // transitionDelay: `${index * 400}ms`,
                            }}>
                            <div className={classes.item}>
                                <img src={i.image} className={classes.img} onClick={() => this.setState({showImgView: true, viewImgIndex: index})}/>
                            </div>
                        </Grow>;
                    })
                }
                {
                    typeof loginUserData.list !== "undefined" && _.isEmpty(loginUserData.list) && "无相关数据"
                }

                {
                    showImgView && loginUserData.list && loginUserData.list.length && <WxImageViewer
                        onClose={() => this.setState({showImgView: false})}
                        urls={loginUserData.list.map(i => i.image)}
                        index={viewImgIndex}/>
                }

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
