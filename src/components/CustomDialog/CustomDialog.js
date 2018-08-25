import React from "react";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import BaseComponent from "../common/BaseComponent";
import CircularProgress from "material-ui/Progress/CircularProgress";

export default class CustomDialog extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }
    render () {
        const {title, open, actions, handleCancel, handleSure, content, loading} = this.props;
        return (<Dialog
            open={open}
            onClose={this.handelClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {content}
            </DialogContent>
            {
                actions || <DialogActions>
                    <Button onClick={this.handelCancel} color="secondary" disabled={loading}>
                        取消
                    </Button>
                    <Button onClick={this.handelSure} color="secondary" disabled={loading}>
                        {
                            loading ? <CircularProgress color="secondary" size={14}/> : "确定"
                        }
                    </Button>
                </DialogActions>
            }
        </Dialog>);
    }

    handelSure = () => {
        this.props.handleSure();
    };

    handelCancel = () => {
        this.props.handleCancel();
        this.handelClose();
    };

    handelClose = () => {
        if (!this.state.loading) {
            this.props.handelClose();
        }
    };
}

CustomDialog.propTypes = {
    title: PropTypes.string,
    loading: PropTypes.bool,
    open: PropTypes.bool,
    actions: PropTypes.any,
    handleCancel: PropTypes.func,
    handleSure: PropTypes.func,
    handelClose: PropTypes.func,
    content: PropTypes.any
};
CustomDialog.defaultProps = {
    title: "",
    open: false,
    loading: false,
    actions: "",
    handleCancel: () => true,
    handleSure: () => true,
    handelClose: () => true,
    content: ""
};
