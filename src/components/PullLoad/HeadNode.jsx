import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {STATS} from './constants';
import CircularProgress from "material-ui/Progress/CircularProgress";

export default class HeadNode extends PureComponent {

    static propTypes = {
        loaderState: PropTypes.string.isRequired,
    };

    static defaultProps = {
        loaderState: STATS.init,
    };

    render() {
        const {
            loaderState
        } = this.props;

        return (
            <div className="pull-load-head-default">
                {/*<i/>*/}
                {
                    loaderState !== STATS.loading && <CircularProgress color="secondary" size={19}/>
                }
            </div>
        );
    }
}
