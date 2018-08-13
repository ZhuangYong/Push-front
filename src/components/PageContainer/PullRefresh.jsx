import React from "react";
import PropTypes from "prop-types";
import BaseComponent from "../common/BaseComponent";
import ReactPullLoad from '../PullLoad/ReactPullLoad';
import {STATS} from '../PullLoad/constants';

import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ArrowForwardIcon from "@material-ui/icons/KeyboardArrowRight";
import {getScreenSize} from "../../utils/comUtils";

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
            pageSize: pageSize,
            extParam: {},
            screenSize: getScreenSize()
        };
        this.handleAction = this.handleAction.bind(this);
        this.handRefreshing = this.handRefreshing.bind(this);
        this.handLoadMore = this.handLoadMore.bind(this);
        this.domItem = this.domItem.bind(this);
        this.handelFilter = this.handelFilter.bind(this);
    }

    componentDidMount() {
        const {autoFirstPage} = this.props;
        if (autoFirstPage) {
            this.handLoadMore();
        }
        window.addEventListener('resize', this.resize);
        window.addEventListener('orientationchange', this.resize);
    }
    render() {
        const classes = style;
        const {hasMore, data, screenSize} = this.state;
        const {autoHeight, show} = this.props;
        const containerHeight = this.props.fullHeight ? screenSize.height - this.props.fixBottom : "100%";
        return (
            <div style={{position: 'relative', height: autoHeight ? containerHeight : "", display: show ? "" : "none"}}>
                <div style={{...classes.container, height: containerHeight}}>
                    <ReactPullLoad
                        style={{height: '100%'}}
                        downEnough={150}
                        action={this.state.action}
                        handleAction={this.handleAction}
                        hasMore={hasMore}
                        noRefresh={true}
                        isBlockContainer={true}
                        distanceBottom={1000}>
                        <ul style={classes.list}>
                            {
                                data.map(item => this.domItem(item))
                            }
                        </ul>
                    </ReactPullLoad>
                </div>
            </div>
        );
    }

    domItem(item) {
        const {renderItem} = this.props;
        if (!renderItem) {
            return <ListItem key={item.id}>
                <ListItemText
                    primary={item.name || ""}
                />
                <ListItemSecondaryAction>
                    <IconButton>
                        <ArrowForwardIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>;
        }
        return renderItem(item);
    }

    handleAction(action) {
        if (!action) {
            return;
        }
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
        const {pageSize, extParam} = this.state;
        const {pageAction, pageParam} = this.props;
        const nextPageParam = Object.assign({
            currentPage: 1,
            pageSize: pageSize
        }, pageParam, extParam);
        this.setState({
            action: STATS.refreshing
        });
        return pageAction(nextPageParam).then(res => {
            const {totalRow, totalPage, data} = res;
            this.setState({
                data: [...data],
                action: STATS.reset,
                hasMore: totalPage > 1,
                currentPage: 1
            });
            return Promise.resolve(res);
        }).catch(err => {
            this.setState({
                action: STATS.reset
            });
            return Promise.reject(err);
        });

    }

    /**
     * 加载下一页
     */
    handLoadMore() {
        const {currentPage, pageSize, extParam} = this.state;
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
        }, extParam);
        this.setState({
            action: STATS.loading
        });
        return pageAction(nextPageParam).then(res => {
            const {totalRow, totalPage, data} = res;
            this.setState({
                data: [...this.state.data, ...data],
                action: STATS.reset,
                hasMore: totalPage > nextPage,
                currentPage: nextPage
            });
            return Promise.resolve(res);
        }).catch(err => {
            this.setState({
                action: STATS.reset
            });
            return Promise.reject(err);
        });
    }

    handelFilter(param) {
        this.state.extParam = param;
        return this.handRefreshing();
    }

    resize = () => {
        this.setState({screenSize: getScreenSize()});
    }

}

PullRefresh.propTypes = {
    show: PropTypes.bool,
    autoFirstPage: PropTypes.bool,
    pageParam: PropTypes.object,
    pageAction: PropTypes.func,
    renderItem: PropTypes.func,
    placeholder: PropTypes.string,
    pageSize: PropTypes.number,
    currentPage: PropTypes.number,
    fullHeight: PropTypes.bool,
    autoHeight: PropTypes.bool,
    fixBottom: PropTypes.number,
    height: PropTypes.number
};
PullRefresh.defaultProps = {
    show: true,
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
