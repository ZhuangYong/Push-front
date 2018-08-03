import React from "react";
import Snackbar from "../../components/Snackbar/Snackbar.jsx";
import IconButton from '@material-ui/core/IconButton';
import AddAlert from "@material-ui/icons/AddAlert";
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});


export default class CommonFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queue: [],
            openSnackbar: false,
            snackbarMsg: {}
        };
        this.showSnackbar = this.showSnackbar.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    render() {
        // const { classes } = this.props;
        const { snackbarMsg, openSnackbar } = this.state;
        return (
            <div>
                <Snackbar
                    place="tc"
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

    showSnackbar(message) {
        this.setState({
            snackbarMsg: message,
            openSnackbar: true,
        });
    }

    closeSnackbar() {
        this.setState({ openSnackbar: false });
    }
}
