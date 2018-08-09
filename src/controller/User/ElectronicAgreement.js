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

@withRouter
@withStyles({...customStyle, ...{
        formContainer: {
        },
        item: {
            width: '7.6rem',
            float: 'left',
            display: 'flex',
            alignItems: 'center',
            height: '7.6rem',
            padding: '.2rem',
            margin: '.2rem',
            backgroundColor: 'white',
            justifyContent: 'center'
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
        const {loginUserData = {}} = this.props.userState;
        return <div>
            <div className={classes.card + " " + classes.formContainer}>
                {
                    loginUserData.list && loginUserData.list.map((i, index) => {
                        return <Grow key={i.id} in={true} timeout={index * 400} style={{transformOrigin: '0 0 0'}}>
                            <div className={classes.item} style={{backgroundImage: `url(${svgBottom})`}}>
                                <img src={i.image} className={classes.img}/>
                            </div>
                        </Grow>;
                    })
                }
                {
                    typeof loginUserData.list !== "undefined" && _.isEmpty(loginUserData.list) && "无相关数据"
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
