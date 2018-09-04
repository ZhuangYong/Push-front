import React from "react";
import BaseComponent from "../../components/common/BaseComponent";
import withStyles from "material-ui/styles/withStyles";
import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import _ from "lodash";
import Grow from '@material-ui/core/Grow';
import customStyle from "../../assets/jss/view/custom";
import {withRouter} from "react-router-dom";
import WxImageViewer from 'react-wx-images-viewer';
import {getQueryString, setTitle} from "../../utils/comUtils";

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
@inject("userState", "salesState")
@observer
export default class ElectronicAgreement extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        setTitle("电子协议");
        this.state = {
            salesUuid: getQueryString("salesUuid"),
            area: "",
            nickName: "",
            phone: "",
            address: "",
        };
    }

    render() {
        const {classes = ""} = this.props;
        const {viewImgIndex, showImgView, salesUuid} = this.state;
        const {loginUserData = {}} = this.props.userState;
        const {partnerDetailData = {}} = this.props.salesState;
        let imgList = [];
        let empty = false;
        if (salesUuid) {
            if (!partnerDetailData) {
                this.back();
            }
            if (typeof partnerDetailData.list !== "undefined" && _.isEmpty(partnerDetailData.list)) {
                empty = true;
            } else {
                imgList = partnerDetailData.list || [];
            }
        } else {
            if (typeof loginUserData.list !== "undefined" && _.isEmpty(loginUserData.list)) {
                empty = true;
            } else {
                imgList = loginUserData.list || [];
            }
        }

        return <div>
            <div className={classes.formContainer}>
                {
                    imgList.map((i, index) => {
                        return <Grow
                            key={i.id}
                            in={true}
                            timeout={index * 400}
                            style={{
                                transformOrigin: '0 0 0',
                                // transitionDelay: `${index * 400}ms`,
                            }}>
                            <div className={imgList.length > 1 ? classes.item : ""}>
                                <img src={i.image} className={classes.img} onClick={() => this.setState({showImgView: true, viewImgIndex: index})}/>
                            </div>
                        </Grow>;
                    })
                }

                {
                    showImgView && !_.isEmpty(imgList) && <WxImageViewer
                        onClose={() => this.setState({showImgView: false})}
                        urls={imgList.map(i => i.image)}
                        index={viewImgIndex}/>
                }

            </div>
            {
                empty && <p style={{textAlign: 'center', padding: '2rem'}}>暂未上传电子协议</p>
            }
        </div>;
    }

    refreshUserInfo = () => {
        this.props.userState.getUserInfo();
    };

}
