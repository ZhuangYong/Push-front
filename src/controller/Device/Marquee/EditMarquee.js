import React from "react";
import BaseComponent from "../../../components/common/BaseComponent";
import withStyles from "material-ui/styles/withStyles";
import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import CustomInput from "../../../components/CustomInput/CustomInput";
import Form from "../../../components/Form/BaseForm";
import customStyle from "../../../assets/jss/view/custom";
import {withRouter} from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import CircularProgress from "material-ui/Progress/CircularProgress";
import MultiPictureUpload from "../../../components/CustomUpload/MultiPictureUpload";
import 'react-picker-address/dist/react-picker-address.css';
import {getQueryString} from "../../../utils/comUtils";

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
@inject("deviceState", "userState")
@observer
export default class EditMarquee extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        // groupUuid，id(编辑时传，新增不传)，content，contentUuid(编辑时传，新增不传)，lineNum，font，color，img，isEnabled
        const id = getQueryString("id");
        const groupUuid = getQueryString("groupUuid");
        this.state = {
            groupUuid: groupUuid,
            id: id,
            content: '',
            contentUuid: "",
            lineNum: "1",
            font: "",
            color: "",
            img: "",
            isEnabled: '1',
        };
    }

    componentDidMount() {
        this.initial();
    }

    render() {
        const {classes = ""} = this.props;
        const {groupUuid, id, content, contentUuid, lineNum, font, color, img, isEnabled} = this.state;

        return <div>
            <div className={classes.card + " " + classes.formContainer}>
                <Form
                    ref="form"
                    v-data={this.state}
                    setState={this.stateFun}>
                    <CustomInput
                        placeholder="滚动显示文字内容"
                        labelText="内容"
                        value={content}
                        name="content"
                        required
                        inputProps={{
                            multiline: true,
                            rows: 2,
                        }}
                    />
                    <CustomInput
                        placeholder="请输入一位整数"
                        labelText="滚动显示文字行数"
                        value={lineNum + ""}
                        name="lineNum"
                        reg={/^\d{1}$/}
                        required
                    />
                    <CustomInput
                        placeholder="滚动显示文字字体"
                        labelText="请输入整数"
                        value={font}
                        name="font"
                        reg={/^\d{1,6}$/}
                    />
                    <CustomInput
                        placeholder="滚动显示文字颜色"
                        labelText="颜色"
                        value={color}
                        name="color"
                    />

                    <FormControlLabel
                        className="form-control-label"
                        control={<div>
                            <MultiPictureUpload
                                ref="fileUpload"
                                enableLabel={false}
                                uploadSuccess={url => this.setState({img: url})}
                                uploadAction={this.uploadUserAvatarAction}/>
                        </div>}
                        label="背景图片"
                        labelPlacement="start"
                    />

                    <FormControlLabel
                        style={img ? {display: 'block'} : {}}
                        className="form-control-label"
                        control={<div>
                            {
                                img && <div className={classes.imagesContainer}>
                                    <div key={img} className={classes.imgSpan}>
                                        <div className={classes.delIcon}>
                                            <DeleteIcon style={{fontSize: '1.4rem'}} onClick={() => this.setState({img: ""})}/>
                                        </div>
                                        <img src={img} className={classes.img}/>
                                    </div>
                                </div>
                            }
                        </div>}
                        label=" "
                        labelPlacement="start"
                    />

                    <FormControlLabel
                        label="是否启用"
                        className="form-control-label"
                        labelPlacement="start"
                        style={{marginBottom: 10}}
                        control={<div>
                            <FormControlLabel
                                checked={isEnabled + "" === '1'}
                                value={'1'}
                                control={<Radio onChange={e => this.setState({isEnabled: e.target.value})}/>}
                                label="启用"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                checked={isEnabled + "" === '0'}
                                value={'0'}
                                control={<Radio onChange={e => this.setState({isEnabled: e.target.value})}/>}
                                label="禁用"
                                labelPlacement="end"
                            />
                        </div>}
                    />

                </Form>
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
            const {groupUuid, id, content, contentUuid, lineNum, font, color, img, isEnabled} = this.state;
            const param = {
                groupUuid: groupUuid,
                id: id,
                content: content,
                contentUuid: contentUuid,
                lineNum: lineNum,
                font: font,
                color: color,
                img: img,
                isEnabled: isEnabled,
            };
            if (!id) {
                delete param.id;
                delete param.contentUuid;
            }
            this.setState({submiting: true});
            this.props.deviceState.saveDeviceMarquee(param)
                .then(res => {
                    this.notification("操作成功！");
                    setTimeout(() => {
                        this.back();
                    }, 1500);

                })
                .catch(err => this.setState({submiting: false}));
        }
    };

    uploadUserAvatarAction = (data) => {
        return this.props.userState.uploadUserAvatar(data)
            .then(setTimeout(() => this.props.userState.getUserInfo(), 500));
    };

    initial = () => {
        const {deviceMarqueeDetailData} = this.props.deviceState;
        const {id} = this.state;
        if (id) {
            if (!deviceMarqueeDetailData) {
                this.back();
            } else {
                this.setState(deviceMarqueeDetailData);
            }
        }
    };

}
