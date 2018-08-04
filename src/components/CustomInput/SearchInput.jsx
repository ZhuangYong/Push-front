import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import BaseComponent from "../common/BaseComponent";

import Zoom from '@material-ui/core/Zoom';
import CircularProgress from "material-ui/Progress/CircularProgress";
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import Button from "../../components/CustomButtons/Button.jsx";

const style = {
    searchContainer: {
        padding: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(0deg, #40e5f9, #26c6da)'
    },
    inputBorder: {
        height: 32,
        padding: 16,
        width: "88%",
        borderRadius: "32px",
        // border: '.6px solid gray',
        display: 'flex',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        height: 30,
        border: 'none'
    },
    clearButton: {
        height: 24,
        width: 24,
        padding: 0,
        marginRight: -9
    },
    clearIcon: {
        width: 16,
        height: 16
    },

    SearchButton: {
        height: 32,
        width: '16%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    SearchIcon: {
        filter: 'drop-shadow( .1px .1px 2px #18b1c3)',
        color: 'white'
    }

};
@withStyles(style)
export default class SearchInput extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            value: "",
            searchIng: false
        };
    }
    render() {
        const {value, searchIng} = this.state;
        const {classes, placeholder} = this.props;
        return (
            <div>
                <div className={classes.searchContainer}>
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
                                <ClearIcon style={style.clearIcon}/>
                            </Button>
                        </Zoom>
                    </div>
                    <div className={classes.SearchButton} onClick={this.handelSearch}>
                        {
                            searchIng ? <CircularProgress style={style.SearchIcon} size={20} /> : <SearchIcon style={style.SearchIcon}/>
                        }
                    </div>
                </div>
            </div>
        );
    }

    handelSearch() {

    }

}

SearchInput.propTypes = {
    placeholder: PropTypes.string,
};
SearchInput.defaultProps = {
    placeholder: "",
};
