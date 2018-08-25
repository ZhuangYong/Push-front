import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import FormControl from "material-ui/Form/FormControl";
import FormHelperText from "material-ui/Form/FormHelperText";
import Input from "material-ui/Input";
import InputLabel from "material-ui/Input/InputLabel";

// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";

import customInputStyle from "../../assets/jss/material-dashboard-pro-react/components/customInputStyle";

function CustomInput({...props}) {
    const {
        value,
        placeholder,
        classes,
        formControlProps,
        labelText,
        id,
        labelProps,
        inputProps,
        error,
        success,
        helpText,
        rtlActive,
        onClick,
        disabled
    } = props;

    let labelClasses = cx({
        [" " + classes.labelRootError]: error,
        [" " + classes.labelRootSuccess]: success && !error
    });

    let formControlClasses = classes.formControl;
    if (formControlProps !== undefined) {
        formControlClasses += " " + formControlProps.className;
    }
    let underlineClasses = cx({
        [classes.underline]: true,
        [classes.underlineError]: error,
        [classes.underlineSuccess]: success && !error,
    });
    if (inputProps !== undefined) {
        formControlClasses =
            formControlClasses +
            " " +
            cx({
                [classes.inputWithAdornment]:
                (inputProps.startAdornment !== undefined ||
                    inputProps.endAdornment !== undefined) &&
                labelText === undefined
            });
    }
    if (inputProps !== undefined) {
        labelClasses =
            labelClasses +
            " " +
            cx({
                [classes.labelWithAdornment]: inputProps.endAdornment !== undefined
            });
    }
    const successClasses =
        classes.feedback +
        " " +
        classes.labelRootSuccess +
        " " +
        cx({
            [classes.feedbackNoLabel]: labelText === undefined,
            [classes.feedbackAdorment]:
            inputProps !== undefined && inputProps.endAdornment !== undefined
        });
    const errorClasses =
        classes.feedback +
        " " +
        classes.labelRootError +
        " " +
        cx({
            [classes.feedbackNoLabel]: labelText === undefined,
            [classes.feedbackAdorment]:
            inputProps !== undefined && inputProps.endAdornment !== undefined
        });
    const input =
        classes.input +
        " " +
        cx({
            [classes.inputRTL]: rtlActive,
            [classes.inputNoLabel]: labelText === undefined
        });
    return (
        <FormControl
            {...formControlProps}
            className={formControlClasses}
            aria-describedby={id + "-text"}
            onClick={onClick}
        >
            {labelText !== undefined ? (
                <InputLabel
                    className={classes.labelRoot + labelClasses}
                    htmlFor={id}
                    {...labelProps}
                >
                    {labelText}
                </InputLabel>
            ) : null}
            <Input
                classes={{
                    input: input,
                    disabled: classes.disabled,
                    underline: underlineClasses
                }}
                id={id}
                placeholder={placeholder}
                // inputProps={Object.assign({value: value}, inputProps)}
                {...Object.assign(inputProps, {value: value, disabled: disabled})}
            />
            {error ? (
                <Clear className={errorClasses}/>
            ) : success ? (
                <Check className={successClasses}/>
            ) : null}
            {helpText !== undefined ? (
                <FormHelperText id={id + "-text"}>{helpText}</FormHelperText>
            ) : null}
        </FormControl>
    );
}

CustomInput.propTypes = {
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    classes: PropTypes.object.isRequired,
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    formControlProps: PropTypes.object,
    error: PropTypes.bool,
    success: PropTypes.bool,
    helpText: PropTypes.string,
    rtlActive: PropTypes.bool,
    onClick: PropTypes.func
};

CustomInput.defaultProps = {
    formControlProps: {fullWidth: true},
    disabled: false,
    placeholder: "",
    onClick: f => f
};

export default withStyles(customInputStyle)(CustomInput);
