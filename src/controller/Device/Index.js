import React from "react";

import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import BaseComponent from "../../components/common/BaseComponent";
import customStyle from "../../assets/jss/view/custom";
import SearchInput from "../../components/CustomInput/SearchInput";
import Path from "../../utils/path";
import TabMenu from "../../components/Tabs/TabMenu";
import AddIcon from '@material-ui/icons/Add';
import DeviceGroup from "../../components/CommonPage/DeviceGroup";
import SalesPage from "../../components/CommonPage/SalesPage";

const style = {
    ...customStyle,
    infoLine: {
        fontSize: '.86rem',
        color: '#555555',
        margin: '.2rem 0'
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
@inject(({store: {appState, deviceState}}) => ({appState, deviceState}))
@observer
export default class DeviceIndex extends BaseComponent {

    constructor(props) {
        super(props);
        const {tabIndex} = this.props.appState.pageDeviceList;
        this.state = {
            tabIndex: tabIndex || 0,
            searchIng: false,
            isSearch: false,
            searchKeyWord1: "",
            searchKeyWord2: ""
        };
    }
    render() {
        const {searchIng, searchKeyWord1, searchKeyWord2, isSearch, tabIndex} = this.state;
        return <div>
            <div>
                {
                    tabIndex === 0 && <SearchInput
                        placeholder="请输入设备号 、SN号"
                        defaultValue={searchKeyWord1}
                        handelSearch={this.handlerSearch}
                        handelClear={this.handlerClear}
                        searchIng={searchIng}
                        searchContainerStyle={{border: 'none', paddingTop: '12px', backgroundColor: 'white'}}
                    />
                }
                {
                    tabIndex === 1 && <SearchInput
                        placeholder="请输入设备号 、SN号"
                        defaultValue={searchKeyWord2}
                        handelSearch={this.handlerSearch}
                        handelClear={this.handlerClear}
                        searchIng={searchIng}
                        searchContainerStyle={{border: 'none', paddingTop: '12px', backgroundColor: 'white'}}
                    />
                }

            </div>

            <TabMenu
                tabIndex={tabIndex}
                handelChangeTab={i => {
                    this.setState({tabIndex: i});
                    this.props.appState.setPageDeviceListTabIndex(i);
                }}
                items={[
                {
                    tabLabel: "自营店",
                    tabContainer: <DeviceGroup ref="deviceGroup"/>,
                    menu: {
                        color: 'secondary',
                        icon: <AddIcon/>,
                        click: () => this.linkTo(Path.PATH_DEVICE_GROUP_EDIT)
                    }
                },
                {
                    tabLabel: "合作伙伴",
                    tabContainer: <SalesPage showSearch={false} ref="salesPage"/>,
                    menu: {
                        color: 'secondary',
                        icon: <AddIcon/>,
                        click: () => this.linkTo(Path.PATH_SALES_EDIT)
                    }
                }
            ]}/>
        </div>;
    }


    handlerSearch = (v) => {
        const {tabIndex} = this.state;
        this.setState({searchIng: true});
        if (tabIndex === 0) {
            this.refs.deviceGroup.wrappedInstance.handlerSearch(v)
                .then(res => this.setState({searchIng: false, searchKeyWord1: v}))
                .catch(err => this.setState({searchIng: false}));
        } else if (tabIndex === 1) {
            this.refs.salesPage.wrappedInstance.handlerSearch(v)
                .then(res => this.setState({searchIng: false, searchKeyWord2: v}))
                .catch(err => this.setState({searchIng: false}));
        }
    };

    handlerClear = () => {
        const {tabIndex} = this.state;
        if (tabIndex === 0) {
            this.refs.deviceGroup.wrappedInstance.handlerClear();
        } else if (tabIndex === 1) {
            this.refs.salesPage.wrappedInstance.handlerClear();
        }
    };
}
