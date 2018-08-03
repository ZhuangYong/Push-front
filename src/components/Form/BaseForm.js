import React from "react";
import PropTypes from "prop-types";
import CustomInput from "../CustomInput/CustomInput";

export default class BaseForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props['v-data'],
            validSuccess: {},
            validFail: {}
        };
        this.autoState = this.autoState.bind(this);
        this.validItem = this.validItem.bind(this);
    }

    render() {
        return this.autoState(this.props.children) || "";
    }

    autoState(node, key) {
        if (node.length) {
            const nodes = [];
            node.forEach((n, index) => nodes.push(this.autoState(n, 'form-auto-index' + index)));
            return nodes;
        } else if (node) {
            const {name, inputProps} = node.props;
            if (name) {
                if (inputProps) {
                    inputProps.onChange = e => {
                        const {value} = e.target;
                        this.state.data[name] = value;
                        this.validItem(node, value);
                    };
                } else {
                    node.onChange = e => {
                        const {value} = e.target;
                        this.state.data[name] = value;
                        this.validItem(node, value);
                    };
                }
                const cloneProps = {};
                if (typeof this.state.validSuccess[name] === 'undefined') {
                    this.state.validSuccess[name] = false;
                    this.state.validFail[name] = false;
                }
                if (key) {
                    cloneProps.key = key;
                }
                if (node.type.displayName === "WithStyles(CustomInput)") {
                    if (typeof node.props.required !== "undefined" || typeof node.props.reg !== "undefined") {
                        return <CustomInput
                            success={this.state.validSuccess[name]}
                            error={this.state.validFail[name]}
                            {...node.props}
                            {...cloneProps}
                        />;
                    } else {
                        return <CustomInput
                            {...node.props}
                            {...cloneProps}
                        />;
                    }
                } else {
                    return React.cloneElement(node, cloneProps);
                }
            } else {
                return node;
            }
        }
    }

    valid() {
        let validSuccess = true;
        Object.keys(this.state.validSuccess).forEach(key => {
           if (!this.state.validSuccess[key]) {
               this.state.validFail[key] = true;
               validSuccess = false;
           } else {
               this.state.validFail[key] = false;
           }
        });
        this.setState({validFail: this.state.validFail});
        return validSuccess;
    }

    validItem(node, v) {
        const {name, required, reg} = node.props;
        if (required && !v) {
            this.state.validSuccess[name] = false;
        } else if (typeof reg !== "undefined" && reg.test && !reg.test(v)) {
            this.state.validSuccess[name] = false;
        } else {
            this.state.validSuccess[name] = true;
        }
        this.valid();
    }
}
BaseForm.propTypes = {
    'v-data': PropTypes.any
};
BaseForm.defaultProps = {
    'v-data': "not set execCmd function"
};
