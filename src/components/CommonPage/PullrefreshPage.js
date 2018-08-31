import React from "react";

import PropTypes from 'prop-types';
import BaseComponent from "../../components/common/BaseComponent";
import customStyle from "../../assets/jss/view/custom";
import SearchInput from "../../components/CustomInput/SearchInput";
import PullRefresh from "../../components/PageContainer/PullRefresh";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const style = {
    ...customStyle,
    infoLine: {
        fontSize: '.86rem',
        color: '#555555',
        margin: '.2rem 0',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center'
    },
    infoLabel: {
        color: 'black',
        // width: '5rem',
        fontSize: '.9rem',
        fontWeight: 500,
    },
    searchClear: {
        position: 'absolute',
        right: 12,
        top: 2
    }
};
export default class PullRefreshPage extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            editItem: {},
            searchIng: false,
            nickname: "",
            submitIng: false,
            searchKeyWords: "",
        };
        this.handlerSearch = this.handlerSearch.bind(this);
        this.handlerClear = this.handlerClear.bind(this);
    }
    render() {
        const {showSearch, autoFirstPage} = this.props;
        const {searchIng, searchKeyWords, openEditDeviceNickname, nickname, submitIng, listClassName} = this.state;
        // const groupUuid = getQueryString("groupUuid");
        // const channelCode = getQueryString("channelCode");
        // let pageParam = {};
        // if (groupUuid) {
        //     pageParam = {groupUuid: groupUuid};
        // } else if (channelCode) {
        //     pageParam = {channelCode: channelCode};
        // }
        const pageParam = this.getPageParam();
        const fixBottom = this.getFixBottom();
        return <div>
            <div>
                {
                    this.renderTopExt()
                }
                {
                    showSearch && this.renderSearch()
                }
            </div>
            {
                searchKeyWords ? <div style={style.searchResult}>
                    "{searchKeyWords}"的搜索结果
                    <DeleteOutlinedIcon style={{...style.icon, ...style.searchClear}} onClick={this.handlerClear}/>
                </div> : ""
            }

            <div className={`pull-data-list ${listClassName}`}>
                <PullRefresh
                    ref="pager"
                    autoFirstPage={autoFirstPage}
                    pageParam={pageParam}
                    fixBottom={fixBottom}
                    pageAction={this.pageAction}
                    renderItem={item => this.listItem(item)}
                />
            </div>
            {
                this.renderExt()
            }
        </div>;
    }

    /**
     * 搜索头
     * @returns {*}
     */
    renderSearch = () => {
        const {searchIng, defaultSearchValue} = this.state;
        return <SearchInput
            placeholder="请输入设备号 、SN号"
            defaultValue={defaultSearchValue}
            handelSearch={this.handlerSearch}
            handelClear={this.handlerClear}
            searchIng={searchIng}
        />;
    };

    /**
     * render 头部添加额外node
     * @returns {string}
     */
    renderTopExt = () => {
        return "";
    };

    /**
     * 尾部添加额外node
     * @returns {string}
     */
    renderExt = () => {
        return "";
    };

    /**
     * pull refresh 底部高度修正
     * @returns {number}
     */
    getFixBottom = () => {
        // const {searchKeyWords} = this.state;
        // let fixBottom = 56 + window.rem2px(3.2);
        // if (searchKeyWords) {
        //     fixBottom += 28;
        // }
        // return fixBottom;
        return 0;
    };

    /**
     * 分页参数
     * @returns {{}}
     */
    getPageParam = () => {
        return {};
    };

    /**
     * 列表子项模板
     * @param item
     */
    listItem = (item) => {
        return <div>
            this is list item template
        </div>;
    };

    /**
     * 分页接口方法 成功失败都需要返回promise对象
     * @param data
     */
    pageAction = (data) => {
        // return apiFunction();
    };


    /**
     * 搜索关键字
     * @param v
     * @returns {*}
     */
    handlerSearch(v) {
        if (this.validSearchKeyWord(v)) {
            this.setState({searchIng: true});
            return this.refs.pager.handelFilter({searchKey: v})
                .then(res => {
                    this.setState({searchKeyWords: v, searchIng: false});
                    return Promise.resolve(res);
                })
                .catch(err => {
                    this.setState({searchIng: false});
                    return Promise.reject(err);
                });
        } else {
            return Promise.reject(new Error("no search keyword"));
        }
    }

    /**
     * 清空搜索
     * @returns {*|Observable<any>|Promise<T>}
     */
    handlerClear() {
        this.setState({searchIng: true});
        return this.refs.pager.handelFilter({searchKey: ""})
            .then(res => {
                this.setState({searchKeyWords: "", searchIng: false});
                return Promise.resolve(res);
            })
            .catch(err => {
                this.setState({searchIng: false});
                return Promise.reject(err);
            });
    }

    /**
     * 刷新pull refresh页面
     */
    handelPageRefresh = () => {
        this.refs.pager.handRefreshing();
    };

    /**
     * 验证搜索关键字
     * @param v
     * @returns {boolean}
     */
    validSearchKeyWord(v) {
        const valid = !!v.replace(/ /g, "");
        if (!valid) {
            this.notification("请输入你想搜索的关键字", "bc");
        }
        return valid;
    }
}

PullRefreshPage.propTypes = {
    showSearch: PropTypes.bool,
    autoFirstPage: PropTypes.bool
};

PullRefreshPage.defaultProps = {
    showSearch: true,
    autoFirstPage: true
};
