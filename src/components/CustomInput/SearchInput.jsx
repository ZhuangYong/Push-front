import React from "react";
import PropTypes from "prop-types";
import withStyles from "material-ui/styles/withStyles";
import BaseComponent from "../common/BaseComponent";

import Zoom from '@material-ui/core/Zoom';
import CircularProgress from "material-ui/Progress/CircularProgress";
import ClearIcon from '@material-ui/icons/Clear';
// import SearchIcon from '@material-ui/icons/Search';
import Button from "../../components/CustomButtons/Button.jsx";
import {MenuIcon} from "../common/SvgIcons";

const style = {
    searchContainer: {
        padding: '.4rem',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        borderBottom: '.06rem solid #cbcbcb'
    },
    inputBorder: {
        width: "88%",
        display: 'flex',
        height: '2.4rem',
        borderRadius: '2.4rem',
        alignItems: 'center',
        backgroundColor: 'white',
        border: '1px solid #dcdcdc',
        justifyContent: 'space-between',
        padding: '.8rem .3rem .8rem 1rem'
    },
    input: {
        height: '2.2rem',
        width: "88%",
        fontSize: '1rem',
        border: 'none'
    },
    clearButton: {
        height: '1.8rem',
        width: '1.8rem',
        padding: 0,
    },
    clearIcon: {
        width: '1rem',
        height: '1rem',
    },

    SearchButton: {
        height: '2.3rem',
        width: '16%',
        fontSize: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    SearchIcon: {
        // filter: 'drop-shadow( .1px .1px 2px #18b1c3)',
        color: 'rgb(233, 30, 99)'
    }

};
@withStyles(style)
export default class SearchInput extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.defaultValue,
            searchKeyWords: ""
        };
        this.handelClear = this.handelClear.bind(this);
        this.handelSearch = this.handelSearch.bind(this);
    }
    render() {
        const {value, searchKeyWords} = this.state;
        const {classes, placeholder, searchIng, searchContainerStyle} = this.props;
        return (
            <div>
                <div className={classes.searchContainer} style={searchContainerStyle}>
                    {
                        <MenuIcon size="2rem" color="gray" style={{margin: '0 .6rem'}}/>
                    }
                    <div className={classes.inputBorder}>
                        <input type="text"
                               className={classes.input}
                               placeholder={placeholder}
                               value={value}
                               onChange={e => {
                                   this.setState({value: e.target.value});
                               }}
                        />
                        <Zoom in={!!value}>
                            <Button round size="sm" style={style.clearButton} onClick={() => {
                                this.setState({value: ""});
                            }}>
                                <ClearIcon style={style.clearIcon} onClick={this.handelClear}/>
                            </Button>
                        </Zoom>
                    </div>
                    <div className={classes.SearchButton} onClick={this.handelSearch}>
                        {/*<SearchIcon style={style.SearchIcon}/>*/}
                        {
                            searchIng ? <CircularProgress style={style.SearchIcon} size={20} /> : "搜索"
                        }
                    </div>
                </div>
            </div>
        );
    }

    handelSearch() {
        const {handelSearch, searchIng} = this.props;
        const {value} = this.state;
        if (searchIng) {
            return;
        }
        if (handelSearch && typeof handelSearch === "function") {
            handelSearch(value);
            this.setState({searchKeyWords: value});
        }
    }

    handelClear() {
        const {handelClear} = this.props;
        const {value, searchKeyWords} = this.state;
        // if (searchKeyWords && handelClear && typeof handelClear === "function") {
        //     handelClear(value);
        // }
    }

}

SearchInput.propTypes = {
    defaultValue: PropTypes.string,
    handelSearch: PropTypes.func,
    handelClear: PropTypes.func,
    placeholder: PropTypes.string,
    searchIng: PropTypes.bool,
    searchContainerStyle: PropTypes.object
};
SearchInput.defaultProps = {
    defaultValue: "",
    handelSearch: f => f,
    handelClear: f => f,
    placeholder: "",
    searchIng: false,
    searchContainerStyle: {}
};
