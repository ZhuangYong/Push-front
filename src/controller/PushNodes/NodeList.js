import React from "react";
import withStyles from "material-ui/styles/withStyles";

import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import customStyle from "../../assets/jss/view/custom";
import ListItem from '@material-ui/core/ListItem';
import svgBottom from "../../assets/svg/bottom-tear.svg";
import PullRefreshPage from "../../components/CommonPage/PullrefreshPage";
import {getQueryString, setTitle} from "../../utils/comUtils";
import SearchInput from "../../components/CustomInput/SearchInput";
import Path from "../../utils/path";

const style = {
    ...customStyle,
    infoLine: {
        fontSize: '.86rem',
        color: '#555555',
        margin: 0
    },
    infoLabel: {
        color: 'black',
        width: '4rem',
        fontSize: '.9rem',
        fontWeight: 500
    },
    searchClear: {
        position: 'absolute',
        right: 12,
        top: 2
    }
};
@withStyles(style)
@inject("nodeState")
@observer
export default class NodeList extends PullRefreshPage {

    constructor(props) {
        super(props);
        setTitle("推送服务器");
    }

    pageAction = (data) => {
        return this.props.nodeState.getNodePage(data);
    };

    listItem = (item) => {
        const {classes = ""} = this.props;
        const {host, port, userNum} = item;
        return <ListItem
            key={host}
            className={classes.item + " " + classes.orderItem}
            onClick={() => this.linkTo(Path.PATH_NODE_USER_LIST, {host})}>
            <div>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>服务器地址：</font>{host + ":" + port}
                </p>
                <p className={classes.infoLine}>
                    <font className={classes.infoLabel}>在线设备：</font>{userNum}
                </p>
            </div>
        </ListItem>;
    };

    getFixBottom = () => {
        return 56 + 56;
    };

}

NodeList.defaultProps = {
    showSearch: false
};
