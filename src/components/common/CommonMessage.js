import React from "react";
import Snackbar from "../../components/Snackbar/Snackbar.jsx";
import IconButton from '@material-ui/core/IconButton';
import AddAlert from "@material-ui/icons/AddAlert";
import CloseIcon from '@material-ui/icons/Close';

const CLOSE_TIME_COUNT = 3;
let timeout;
export default class CommonFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queue: [],
            openSnackbar: false,
            snackbarMsg: {},
            position: ""
        };
        this.showSnackbar = this.showSnackbar.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    render() {
        // const { classes } = this.props;
        const {snackbarMsg, openSnackbar, position} = this.state;
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
            </div>
        );
    }

    showSnackbar(message, pos) {
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
    }

    closeSnackbar() {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        this.setState({ openSnackbar: false });
    }
}
