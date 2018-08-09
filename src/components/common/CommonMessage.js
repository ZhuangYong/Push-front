import React from "react";
import Snackbar from "../../components/Snackbar/Snackbar.jsx";
import IconButton from '@material-ui/core/IconButton';
import AddAlert from "@material-ui/icons/AddAlert";
import CloseIcon from '@material-ui/icons/Close';

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
    }

    closeSnackbar() {
        this.setState({ openSnackbar: false });
    }
}
