import React from "react";
import Snackbar from "../../components/Snackbar/Snackbar.jsx";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Drawer from "material-ui/Drawer";
import List from '@material-ui/core/List';
import ListItem from "material-ui/List/ListItem";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import AppHeader from "../Header/AppHeader";
import Const from "../../utils/const";
import {dispatchCustomEvent} from "../../utils/comUtils";

const CLOSE_TIME_COUNT = 3;
let timeout;
const style = {
    drawerMenu: {
        backgroundColor: 'white',
        borderTop: '1px solid #dedede',
        justifyContent: 'center',
    }
};
export default class CommonMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queue: [],
            openSnackBar: false,
            showSnackBar: {},
            position: "",
            openDialog: false,
            dialogTitle: "",
            dialogMsg: "",
            dialogOnSure: "",
            dialogOnClose: "",

            openFullPage: false,
            fullPageTitle: "",
            fullPageToolButtons: "",
            fullPageContent: "",

            openDrawerMenu: false,
            drawerMenus: []
        };
        this.execCmd = this.execCmd.bind(this);
    }

    componentDidMount() {
        document.addEventListener(Const.EVENT.EVENT_API_ERR, e => {
            this.notification(e.cause === "Network Error" ? "网络错误，请稍后重试！" : e.cause);
        });
        document.addEventListener(Const.EVENT.EVENT_MSG, e => {
            const {type, msg, ...arg} = e.cause;
            this.showMsg(type, msg, arg);
        });
        document.addEventListener(Const.EVENT.EVENT_DRAWER_MENU, e => {
            const {...arg} = e.cause;
            this.showDrawerMenu(arg);
        });
    }

    componentWillUnmount() {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    }

    render() {
        // const { classes } = this.props;
        const {
            showSnackBar,
            openSnackBar,
            position,
            openDialog,
            dialogTitle,
            dialogMsg,
            dialogOnSure,
            dialogOnClose,
            dialogOnCancel,
            openFullPage,
            fullPageTitle,
            fullPageToolButtons,
            fullPageContent,
            openDrawerMenu,
            drawerMenus
        } = this.state;

        return (
            <div>
                <Snackbar
                    place={position || "tc"}
                    color="warning"
                    // icon={AddAlert}
                    message={<span id="message-id">{showSnackBar}</span>}
                    open={openSnackBar}
                    closeNotification={this.closeSnackBar}
                    style={{display: openSnackBar ? "" : "none"}}
                    close
                />

                <Dialog
                    open={openDialog}
                    fullWidth={true}
                    TransitionComponent={this.Transition}
                    keepMounted
                    onClose={() => {
                        this.handleClose();
                        typeof dialogOnClose === "function" && dialogOnClose();
                    }}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {dialogTitle || " "}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {dialogMsg}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {
                            dialogOnCancel && <Button onClick={() => {
                                this.handleClose();
                                typeof dialogOnCancel === "function" && dialogOnCancel();
                            }} color="secondary">
                                取消
                            </Button>
                        }
                        <Button onClick={() => {
                            this.handleClose();
                            typeof dialogOnSure === "function" && dialogOnSure();
                        }} color="secondary">
                            确定
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    ref="openedFullPage"
                    fullScreen
                    open={openFullPage}
                    onClose={this.closeFullPage}
                    TransitionComponent={this.Transition}>
                    <AppHeader
                        onClose={this.closeFullPage}
                        title={fullPageTitle}
                        fullPageToolButtons={fullPageToolButtons}/>
                    {
                        fullPageContent
                    }
                </Dialog>

                <Drawer
                    open={openDrawerMenu}
                    anchor="bottom"
                    PaperProps={{
                        style: {backgroundColor: 'rgba(0,0,0,0)'}
                    }}
                    onClose={() => this.setState({openDrawerMenu: false})}>
                    <div style={{backgroundColor: 'rgba(0,0,0,0)'}}>
                        <List style={{padding: 0}}>
                            {
                                drawerMenus && drawerMenus.map((menu, index) => <ListItem
                                    dense
                                    button
                                    key={index}
                                    style={style.drawerMenu}
                                    onClick={() => {
                                        this.setState({openDrawerMenu: false});
                                        typeof menu.onClick === "function" && setTimeout(() => menu.onClick(), 250);
                                    }}>
                                    {menu.label}
                                </ListItem>)
                            }

                            <ListItem
                                dense
                                button
                                style={{...style.drawerMenu, color: 'red', marginTop: '1rem'}}
                                onClick={() => this.setState({openDrawerMenu: false})}>
                                取消
                            </ListItem>
                        </List>
                    </div>
                </Drawer>

            </div>
        );
    }

    Transition = (props) => {
        return <Slide direction="up" {...props} />;
    };

    handleClose = () => {
        this.setState({openDialog: false});
    };

    showSnackBar = (message, pos) => {
        this.setState({
            showSnackBar: message,
            openSnackBar: true,
            position: pos
        });
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        timeout = setTimeout(() => this.closeSnackBar(), CLOSE_TIME_COUNT * 1000);
    };

    closeSnackBar = () => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        this.setState({openSnackBar: false});
    };

    showDialog = (message, title, onSure, onClose, onCancel) => {
        this.setState({
            dialogMsg: message,
            dialogTitle: title,
            openDialog: true,
            dialogOnSure: onSure,
            dialogOnClose: onClose,
            dialogOnCancel: onCancel
        });
    };

    showFullDialog = (fullPageTitle, fullPageToolButtons, fullPageContent) => {
        this.setState({
            openFullPage: true,
            fullPageTitle: fullPageTitle,
            fullPageToolButtons: fullPageToolButtons,
            fullPageContent: fullPageContent,
        });
    };

    closeFullPage = () => {
        this.setState({openFullPage: false});
    };

    notification = (msg, pos) => {
        this.execCmd(Const.CMD_MSG, Const.MSG_TYPE_NOTIFICATION, msg, {pos});
    };

    alert = (msg, title, onSure, onClose, onCancel) => {
        this.execCmd(Const.CMD_MSG, Const.MSG_TYPE_ALERT, msg, {title, onSure, onClose, onCancel});
    };

    execCmd() {
        if (arguments.length > 0) {
            const cmd = arguments[0];
            const arg1 = arguments[1];
            const arg2 = arguments[2];
            const arg3 = arguments[3];
            switch (cmd) {
                case Const.CMD_MSG:
                    this.showMsg(arg1, arg2, arg3);
                    break;
                default:
                    console.info("not match cmd");
            }
        }
    }

    showMsg = (type, msg, arg) => {
        switch (type) {
            case Const.MSG_TYPE_NOTIFICATION: {
                const {pos} = arg || {};
                this.showSnackBar(msg, pos);
            }
                break;
            case Const.MSG_TYPE_ALERT: {
                const {title, onSure, onClose, onCancel} = arg || {};
                this.showDialog(msg, title, onSure, onClose, onCancel);
            }
                break;
            case Const.MSG_TYPE_OPEN_FULL_PAGE: {
                const {fullPageToolButtons, fullPageContent} = arg || {};
                this.showFullDialog(msg, fullPageToolButtons, fullPageContent);
            }
                break;
            default:
                console.info("no match show msg type");
        }
    };

    showDrawerMenu = (args) => {
        const {drawerMenus} = args;
        this.setState({openDrawerMenu: true, drawerMenus: drawerMenus});
    };


    // --------------  static function for outside ----------------
    static alert(msg, title, onSure, onClose, onCancel) {
        const type = "alert";
        dispatchCustomEvent(Const.EVENT.EVENT_MSG, {type, msg, title, onSure, onClose, onCancel});
    }

    static notification(msg, pos) {
        // this.props.notification(msg, pos);
        const type = "notification";
        dispatchCustomEvent(Const.EVENT.EVENT_MSG, {type, msg, pos});
    }

    /**
     * 显示全屏弹出页面
     * @param msg 标题
     * @param fullPageToolButtons 顶端buttons
     * @param fullPageContent 页面内容
     */
    static showFullPage(msg, fullPageToolButtons, fullPageContent) {
        const type = "showFullPage";
        dispatchCustomEvent(Const.EVENT.EVENT_MSG, {type, msg, fullPageToolButtons, fullPageContent});
    }

    static closeFullPage() {
        const type = "closeFullPage";
        dispatchCustomEvent(Const.EVENT.EVENT_MSG, {type});
    }

    static openDrawerMenu(menus) {
        dispatchCustomEvent(Const.EVENT.EVENT_DRAWER_MENU, menus);
    }
}
