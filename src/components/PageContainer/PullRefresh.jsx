import React from "react";
import PropTypes from "prop-types";
import withStyles from "material-ui/styles/withStyles";
import BaseComponent from "../common/BaseComponent";
import ReactPullLoad from '../PullLoad/ReactPullLoad';
import {STATS} from '../PullLoad/constants';
// import 'react-pullload/dist/ReactPullLoad.css';
import {observer} from "mobx-react/index";

import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ArrowForwardIcon from "@material-ui/icons/KeyboardArrowRight";
import {getScreenSize} from "../../utils/comUtils";

// const style = {
//     position: "fixed",
//     width: "100%",
//     height: "50px",
//     color: "#fff",
//     lineHeight: "50px",
//     backgroundColor: "#e24f37",
//     left: 0,
//     top: 0,
//     textAlign: "center",
//     zIndex: 1
// };

const style = {
    card: {
        backgroundColor: '#eeeeee'
    },
    carHeader: {
        marginBottom: '.6rem',
        backgroundColor: '#ffffff',
        borderBottom: '.01rem solid #dadada'
    },
    root: {
        position: 'relative'
    },
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: '100%'
    },
    list: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
        backgroundColor: '#ffffff'
    },
    item: {
        padding: '1rem',
        borderTop: '.01rem solid #dadada'
    },
    secondary: {
        paddingRight: 12
    }
};
const loadMoreLimitNum = 10;
const cData = [];

@observer
@withStyles(style)
export default class PullRefresh extends BaseComponent {

    constructor(props) {
        super(props);
        const {currentPage, pageSize} = this.props;
        this.state = {
            hasMore: true,
            data: cData,
            action: STATS.init,
            index: loadMoreLimitNum,
            currentPage: currentPage,
            pageSize: pageSize
        };
        this.handleAction = this.handleAction.bind(this);
        this.handRefreshing = this.handRefreshing.bind(this);
        this.handLoadMore = this.handLoadMore.bind(this);
    }

    componentDidMount() {
        const {autoFirstPage} = this.props;
        if (autoFirstPage) {
            this.handLoadMore();
        }
    }
    render() {
        const {hasMore, data} = this.state;
        const {classes, autoHeight} = this.props;
        const screenSize = getScreenSize();
        const containerHeight = this.props.fullHeight ? screenSize.height - this.props.fixBottom : "100%";
        return (
            <div className={classes.root} style={autoHeight ? {height: containerHeight} : {}}>
                <div className={classes.container} style={{height: containerHeight}}>
                    <ReactPullLoad
                        style={{height: '100%'}}
                        downEnough={150}
                        action={this.state.action}
                        handleAction={this.handleAction}
                        hasMore={hasMore}
                        // noRefresh={true}
                        isBlockContainer={true}
                        distanceBottom={1000}>
                        <ul className={classes.list}>
                            {
                                data.map(item => <ListItem key={item.id}>
                                    <ListItemText
                                        primary={item.name || ""}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton>
                                            <ArrowForwardIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>)
                            }
                        </ul>
                    </ReactPullLoad>
                </div>
            </div>
        );
    }

    handleAction(action) {
        if (action === this.state.action) {
            return false;
        }
        if (action === STATS.refreshing) {
            this.handRefreshing();
        } else if (action === STATS.loading) {
            this.handLoadMore();
        } else {
            this.setState({
                action: action
            });
        }
    }

    handRefreshing() {
        if (STATS.refreshing === this.state.action) {
            return false;
        }

        const {pageSize} = this.state;
        const {pageAction, pageParam} = this.props;
        const nextPageParam = Object.assign({
            currentPage: 1,
            pageSize: pageSize
        }, pageParam);
        pageAction(nextPageParam).then(res => {
            const {totalRow, totalPage, data} = res;
            this.setState({
                data: [...data],
                action: STATS.reset,
                hasMore: totalPage > 1,
                currentPage: 1
            });
        }).catch(err => {
            this.setState({
                action: STATS.reset
            });
        });

        this.setState({
            action: STATS.refreshing
        });
    }

    /**
     * 加载下一页
     */
    handLoadMore() {
        const {currentPage, pageSize} = this.state;
        const {pageAction, pageParam} = this.props;
        const nextPage = currentPage + 1;
        if (STATS.loading === this.state.action) {
            return false;
        }
        //无更多内容则不执行后面逻辑
        if (!this.state.hasMore) {
            return;
        }
        const nextPageParam = Object.assign({
            currentPage: 0,
            pageSize: pageSize
        }, pageParam, {
            currentPage: nextPage
        });
        pageAction(nextPageParam).then(res => {
            const {totalRow, totalPage, data} = res;
            this.setState({
                data: [...this.state.data, ...data],
                action: STATS.reset,
                hasMore: totalPage > nextPage,
                currentPage: nextPage
            });
        }).catch(err => {
            this.setState({
                action: STATS.reset
            });
        });
        // setTimeout(() => {
        //     if (this.state.index === 0) {
        //         this.setState({
        //             action: STATS.reset,
        //             hasMore: false
        //         });
        //     } else {
        //         this.setState({
        //             data: [...this.state.data, cData[0], cData[0]],
        //             action: STATS.reset,
        //             index: this.state.index - 1
        //         });
        //     }
        // }, 30000000);

        this.setState({
            action: STATS.loading
        });
    }


}

PullRefresh.propTypes = {
    autoFirstPage: PropTypes.bool,
    pageParam: PropTypes.object,
    pageAction: PropTypes.func,
    placeholder: PropTypes.string,
    pageSize: PropTypes.number,
    currentPage: PropTypes.number,
    fullHeight: PropTypes.bool,
    autoHeight: PropTypes.bool,
    fixBottom: PropTypes.number,
    height: PropTypes.number
};
PullRefresh.defaultProps = {
    autoFirstPage: true,
    placeholder: "",
    pageAction: () => new Error("not set page action"),
    pageParam: {},
    pageSize: 20,
    currentPage: 0,
    fullHeight: true,
    autoHeight: false,
    fixBottom: 0,
    height: 0
};
