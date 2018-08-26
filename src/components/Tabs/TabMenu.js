import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import BaseComponent from "../common/BaseComponent";

const transitionDuration = {
    enter: 200,
    exit: 200,
};

export default class TabMenu extends BaseComponent {
    state = {
        value: this.props.tabIndex,
    };

    render() {
        const {items} = this.props;
        return (
            <div>
                <AppBar position="static" color="default" style={{backgroundColor: 'white', boxShadow: 'none'}}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        fullWidth>
                        {
                            items.map((item, index) => <Tab key={index} label={item.tabLabel} style={{borderBottom: '1px solid #cecece'}}/>)
                        }
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    index={this.state.value}
                    style={{overflow: 'visible'}}
                    slideStyle={{overflow: 'visible'}}
                    onChangeIndex={this.handleChangeIndex}>
                    {
                        items.map((item, index) => <TabContainer key={index}>{item.tabContainer}</TabContainer>)
                    }
                </SwipeableViews>
                {items.map((item, index) => (
                    <Zoom
                        key={index}
                        in={this.state.value === index}
                        timeout={transitionDuration}
                        style={{
                            transitionDelay: `${this.state.value === index ? transitionDuration.exit : 0}ms`,
                        }}
                        unmountOnExit
                    >
                        <Button style={item.menu.style || {}} color={item.menu.color} onClick={item.menu.click}>
                            {item.menu.icon}{item.menu.label || ""}
                        </Button>
                    </Zoom>
                ))}
            </div>
        );
    }

    handleChange = (event, value) => {
        const {handelChangeTab} = this.props;
        this.setState({ value });
        handelChangeTab(value);
    };

    handleChangeIndex = index => {
        const {handelChangeTab} = this.props;
        this.setState({ value: index });
        handelChangeTab(index);
    };

}


function TabContainer(props) {
    const { children, dir } = props;

    return (
        <Typography component="div" dir={dir}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    // children: PropTypes.node.isRequired,
    // dir: PropTypes.string.isRequired,
};

TabMenu.propTypes = {
    tabIndex: PropTypes.number,
    containerHeight: PropTypes.number,
    items: PropTypes.any,
    handelChangeTab: PropTypes.func
    // classes: PropTypes.object.isRequired,
    // theme: PropTypes.object.isRequired,
};
TabMenu.defaultProps = {
    tabIndex: 0,
    items: [],
    handelChangeTab: f => f
};

// export default withStyles(styles, { withTheme: true })(FloatingActionButtonZoom);
