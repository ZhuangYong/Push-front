import React from "react";
import PropTypes from "prop-types";
import CustomInput from "../CustomInput/CustomInput";
import _ from "lodash";

export default class BaseForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props['v-data'],
            validSuccess: {},
            validFail: {},
            formNodes: []
        };
        this.autoState = this.autoState.bind(this);
        this.validItem = this.validItem.bind(this);
        this.initialState = this.initialState.bind(this);
    }
    componentDidMount() {
        this.initialState();
    }
    componentDidUpdate() {
        this.initialState();
    }
    render() {
        return <div className="valid-form">
            {this.autoState(this.props.children) || ""}
        </div>;
    }

    autoState(node, key) {
        if (node && node.length) {
            const nodes = [];
            node.forEach((n, index) => nodes.push(this.autoState(n, 'form-auto-index' + index)));
            return nodes;
        } else if (node) {
            if (this.state.formNodes.indexOf(node) < 0) {
                this.state.formNodes.push(node);
            }
            const {name, inputProps} = node.props;
            if (name) {
                const onChange = e => {
                    const {value} = e.target;
                    const setState = {};
                    setState[name] = value;
                    this.props.setState(setState);
                    this.validItem(node, value);
                };
                if (typeof inputProps !== "undefined") {
                    inputProps.onChange = onChange;
                }
                const cloneProps = {};
                if (typeof this.state.validSuccess[name] === 'undefined') {
                    this.state.validSuccess[name] = false;
                    this.state.validFail[name] = false;
                }
                if (key) {
                    cloneProps.key = key;
                }

                if (node.type === CustomInput) {
                    const enableValid = typeof node.props.required !== "undefined" || typeof node.props.reg !== "undefined";
                    return <CustomInput
                        success={enableValid && this.state.validSuccess[name]}
                        error={enableValid && this.state.validFail[name]}
                        inputProps={{
                            ...inputProps,
                            onChange
                        }}
                        {...node.props}
                        {...cloneProps}
                    />;
                } else {
                    return React.cloneElement(node, cloneProps);
                }
            } else {
                return node;
            }
        }
    }

    /**
     * 验证以及验证结果样式修改
     * @param name
     * @returns {boolean}
     */
    valid(name) {
        let validSuccess = true;
        const {formNodes = []} = this.state;
        if (typeof name !== "undefined") {
            Object.keys(this.state.validSuccess).forEach(key => {
                if (name === key) {
                    if (!this.state.validSuccess[key]) {
                        this.state.validFail[key] = true;
                        validSuccess = false;
                    } else {
                        this.state.validFail[key] = false;
                    }
                }
            });
        } else {
            formNodes.forEach(node => {
                const {name} = node.props;
                const value = this.props['v-data'][name];
                // const value = node.value || (node.props.inputProps || {}).value;
                this.validItem(node, value, true);
            });
            Object.keys(this.state.validSuccess).forEach(key => {
                if (!this.state.validSuccess[key]) {
                    this.state.validFail[key] = true;
                    validSuccess = false;
                } else {
                    this.state.validFail[key] = false;
                }
            });
        }
        this.setState({validFail: this.state.validFail});
        return validSuccess;
    }

    /**
     * 验证子项
     * @param node
     * @param v
     * @param notShow 是否刷新显示
     */
    validItem(node, v, notShow) {
        const {name, required, reg} = node.props;
        if (required && !v) {
            this.state.validSuccess[name] = false;
        } else if (typeof reg !== "undefined") {
            if (reg.test) {
                this.state.validSuccess[name] = reg.test(v);
            } else if (typeof reg === "function") {
                this.state.validSuccess[name] = reg(v);
            }
        } else {
            this.state.validSuccess[name] = true;
        }
        if (!notShow) {
            this.valid(name);
        }
    }

    initialState() {
        const {initialData, initialDataKey} = this.props;
        const {formNodes = []} = this.state;
        if (initialData && _.isEmpty(this[initialDataKey])) {
            Object.keys(initialData).forEach(key => this.state[key] = initialData[key]);
            this.props.setState(this.state);
            this[initialDataKey] = initialData;
            formNodes.forEach(node => {
                const value = node.value || (node.props.inputProps || {}).value;
                this.validItem(node, value, true);
            });
        }
    }
}
BaseForm.propTypes = {
    'v-data': PropTypes.any,
    setState: PropTypes.func,
    initialData: PropTypes.any,
    initialDataKey: PropTypes.string
};
BaseForm.defaultProps = {
    'v-data': "not set v-data",
    setState: f => f,
    initialDataKey: "key_" + Math.random()
};
