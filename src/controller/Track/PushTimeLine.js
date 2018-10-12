import React from "react";
import withStyles from "material-ui/styles/withStyles";

import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import customStyle from "../../assets/jss/view/custom";
import {getQueryString, parseTime, setTitle} from "../../utils/comUtils";
import ActionCustomItem from "../../components/CustomItem/ActionCustomItem";
import BaseComponent from "../../components/common/BaseComponent";
import Const from "../../utils/const";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Command = Const.COMMAND;

const style = {
    ...customStyle,
    infoLine: {
        fontSize: '.86rem',
        color: '#555555',
        margin: 0,
        whiteSpace: 'pre-wrap',
        border: '1px solid #ebebeb',
        padding: '.4rem',
        lineHeight: '1.2rem',
        marginTop: '.4rem',
        borderRadius: '.3rem'
    },
    infoLabel: {
        color: 'black',
        width: '4rem',
        fontSize: '.9rem',
        fontWeight: 500
    },
    infoContent: {
        wordBreak: 'break-all',
        color: 'gray',
    },
    list: {
        padding: '0 .6rem 0 2rem',
    },
    msgMeItem: {
        marginTop: '3.4rem',
        border: '1px solid #e7e7e7',
        borderRadius: '0 .4rem .4rem .4rem',
        backgroundColor: 'white',
        padding: '.6rem!important',
        "&:before": {
            content: "' '",
            height: '120%',
            borderLeft: '1px solid #b1b1b1',
            position: 'absolute',
            left: '-.8rem',
            top: '-1rem',
        }
    },
    time: {
        position: 'absolute',
        left: '-1.6rem',
        zIndex: 99,
        top: '-2.6rem',
        border: '1px solid #cecece',
        padding: '.2rem',
        backgroundColor: 'white',
        borderRadius: '.4rem',
    }
};
@withStyles(style)
@inject("nodeState")
@observer
export default class PushTimeLine extends BaseComponent {

    constructor(props) {
        super(props);
        const userId = getQueryString("userId");
        this.state = {
            userId: userId,
            data: []
        };
        setTitle(userId + ":track push");
    }

    componentDidMount() {
        this.ini();
    }

    componentWillUnmount() {
        this.unIni();
    }

    render() {
        const {classes = ""} = this.props;
        const {data} = this.state;
        return data && data.length ? <ul className={classes.list}>
            {
                data.map(item => this.listItem(item))
            }
        </ul> : "";
    }


    listItem = (item) => {
        const {userId} = this.state;
        const {classes = ""} = this.props;
        const {hash, list = []} = item;
        const firstItem = list[0] || {};
        const {formUserId, userId: toUserId, message, sessionId, time, desc} = list[0];

        return <ActionCustomItem
            key={hash}
            className={classes.item + " " + classes.msgMeItem}
            showAction={false}>
            <p className={classes.time}>
                {this.formatTime(time)}
            </p>
            <div>
                <ExpansionPanel style={{boxShadow: "none"}}>
                    <ExpansionPanelSummary
                        style={{padding: 0}}
                        expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                            {userId === formUserId ? `发送给：${toUserId}` : `收到：${formUserId}`} | {(desc || " ").split(" ")[0]}<br/>
                            <font className={classes.infoContent}>{hash}</font>
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{padding: '0 .2rem'}}>
                        <Typography>
                            formUserId：<font className={classes.infoContent}>{formUserId}</font> <br/>
                            toUserId：<font className={classes.infoContent}>{toUserId}</font> <br/>
                            time：<font className={classes.infoContent}>{time}</font> <br/>
                            message：<font className={classes.infoContent}>{message}</font> <br/>
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                {
                    (list || []).map(subItem => <div key={subItem.time}>
                        <p className={classes.infoLine}>
                            <font className={classes.infoLabel}>{this.formatTime(subItem.time)}：</font>{(subItem.desc || "").split("=")[0].split(".")[0]}
                        </p>
                    </div>)
                }
            </div>
        </ActionCustomItem>;
    };


    ini = () => {
        document.addEventListener(Const.EVENT.EVENT_WS_ON_OPEN, this.onOpen);
        document.addEventListener(Const.EVENT.EVENT_WS_ON_CLOSE, this.onClose);
        document.addEventListener(Const.EVENT.EVENT_WS_ON_ERROR, this.onError);
        document.addEventListener(Const.EVENT.EVENT_WS_ON_RECEIVE, this.onReceive);
    };

    unIni = () => {
        document.removeEventListener(Const.EVENT.EVENT_WS_ON_OPEN, this.onOpen);
        document.removeEventListener(Const.EVENT.EVENT_WS_ON_CLOSE, this.onClose);
        document.removeEventListener(Const.EVENT.EVENT_WS_ON_ERROR, this.onError);
        document.removeEventListener(Const.EVENT.EVENT_WS_ON_RECEIVE, this.onReceive);
    };

    onOpen = () => {

    };

    onClose = () => {

    };

    onError = () => {

    };

    onReceive = ({cause}) => {
        let {userId, data} = this.state;
        try {
            const packet = JSON.parse(cause.data);
            if (Command.PUSH === packet.cmd) {
                if (packet.body.hasOwnProperty("content") && packet.body.content) {
                    let {content} = packet.body;
                    if (typeof content === "string") {
                        content = JSON.parse(content);
                    }
                    const {formUserId, userId: toUserId, message, sessionId, hash, time, desc} = content;
                    if (userId === formUserId || userId === toUserId) {
                        let has = false;
                        data.forEach(d => {
                            if (d.hash === hash) {
                                d.list.push(content);
                                has = true;
                            }
                        });
                        if (!has) {
                            data = [{
                                hash: hash,
                                time: time,
                                list: [content]
                            }].concat(data);
                        }
                        this.setState({data});
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }

    };

    formatTime = time => {
        return parseTime(new Date(time), '{i}:{s}') + "." + (time + "").substr(10);
    };
}
