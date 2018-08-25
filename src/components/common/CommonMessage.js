import React from "react";
import Snackbar from "../../components/Snackbar/Snackbar.jsx";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import AppHeader from "../Header/AppHeader";

const CLOSE_TIME_COUNT = 3;
let timeout;
export default class CommonFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queue: [],
            openSnackbar: false,
            snackbarMsg: {},
            position: "",
            openDialog: false,
            dialogTitle: "",
            dialogMsg: "",
            dialogOnSure: "",
            dialogOnClose: "",

            openFullPage: false,
            fullPageTitle: "",
            fullPageToolButtons: "",
            fullPageContent: ""
        };
    }

    render() {
        // const { classes } = this.props;
        const {snackbarMsg, openSnackbar, position, openDialog, dialogTitle, dialogMsg, dialogOnSure, dialogOnClose, dialogOnCancel, openFullPage, fullPageTitle, fullPageToolButtons, fullPageContent} = this.state;
        return (
            <div>
                <Snackbar
                    place={position || "tc"}
                    color="warning"
                    // icon={AddAlert}
                    message={<span id="message-id">{snackbarMsg}</span>}
                    open={openSnackbar}
                    closeNotification={this.closeSnackbar}
                    style={{display: openSnackbar ? "" : "none"}}
                    close
                />

                <Dialog
                    open={openDialog}
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
                        {dialogTitle}
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
                    TransitionComponent={this.Transition}
                >
                    <AppHeader
                        onClose={this.closeFullPage}
                        title={fullPageTitle}
                        fullPageToolButtons={fullPageToolButtons}/>
                    {
                        fullPageContent
                    }
                </Dialog>
            </div>
        );
    }

    Transition = (props) => {
        return <Slide direction="up" {...props} />;
    };

    handleClose = () => {
        this.setState({openDialog: false});
    };

    showSnackbar = (message, pos) => {
        this.setState({
            snackbarMsg: message,
            openSnackbar: true,
            position: pos
        });
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        timeout = setTimeout(() => this.closeSnackbar(), CLOSE_TIME_COUNT * 1000);
    };

    closeSnackbar = () => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        this.setState({ openSnackbar: false });
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

    showFullPage = (fullPageTitle, fullPageToolButtons, fullPageContent) => {
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
}
