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
            searchKeyWords: ""
        };
        this.handlerSearch = this.handlerSearch.bind(this);
        this.handlerClear = this.handlerClear.bind(this);
    }
    render() {
        const {showSearch} = this.props;
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

    renderSearch = () => {
        const {searchIng} = this.state;
        return <SearchInput
            placeholder="请输入设备号 、SN号"
            handelSearch={this.handlerSearch}
            handelClear={this.handlerClear}
            searchIng={searchIng}
        />;
    };

    renderTopExt = () => {
        return "";
    };

    renderExt = () => {
        return "";
    };

    getFixBottom = () => {
        // const {searchKeyWords} = this.state;
        // let fixBottom = 56 + window.rem2px(3.2);
        // if (searchKeyWords) {
        //     fixBottom += 28;
        // }
        // return fixBottom;
        return 0;
    };

    getPageParam = () => {
        return {};
    };

    listItem = (item) => {
    };

    pageAction = (data) => {
    };


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

    validSearchKeyWord(v) {
        const valid = !!v.replace(/ /g, "");
        if (!valid) {
            this.notification("请输入你想搜索的关键字", "bc");
        }
        return valid;
    }
}

PullRefreshPage.propTypes = {
    showSearch: PropTypes.bool
};

PullRefreshPage.defaultProps = {
    showSearch: true
};
