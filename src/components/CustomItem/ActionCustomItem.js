import React from "react";
import PropTypes from "prop-types";
import withStyles from "material-ui/styles/withStyles";
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from "material-ui/Progress/CircularProgress";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import customStyle from "../../assets/jss/view/custom";
import {MenuDotIcon} from "../common/SvgIcons";

@withStyles({...customStyle, ...{
    editIcon: {
        top: '2.6rem!important',
        right: '1rem!important'
    }
}})
export default class ActionCustomItem extends React.Component {

    render() {
        const {classes, loading, loadingColor, showAction, onActionClick, ...res} = this.props;
        const Child = this.props.children;
        return <ListItem className={classes.item} {...res}>
            {Child}
            {
                showAction && <ListItemSecondaryAction className={classes.editIcon}>
                    {
                        !loading && <MenuDotIcon color={loadingColor} size='2.2rem' onClick={onActionClick}/>
                    }
                    {
                        loading ? <CircularProgress color="secondary" style={{color: loadingColor}} size={20} /> : ""
                    }
                </ListItemSecondaryAction>
            }
        </ListItem>;
    }
}

ActionCustomItem.propTypes = {
    loading: PropTypes.bool,
    loadingColor: PropTypes.string,
    showAction: PropTypes.bool,
    onActionClick: PropTypes.func,
    action: PropTypes.node,
};

ActionCustomItem.defaultProps = {
    loading: false,
    loadingColor: "gray",
    showAction: true,
    onActionClick: f => f,
    action: ""
};
