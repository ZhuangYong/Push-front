import React from "react";
import BaseComponent from "../../components/common/BaseComponent";
import withStyles from "material-ui/styles/withStyles";
import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import CustomInput from "../../components/CustomInput/CustomInput";
import Form from "../../components/Form/BaseForm";
import customStyle from "../../assets/jss/view/custom";
import {withRouter} from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from "material-ui/Progress/CircularProgress";

@withRouter
@withStyles({...customStyle, ...{
    formContainer: {
        padding: '2rem',
        backgroundColor: 'white',
        boxShadow: '1px 1px 8px 3px #80808014',
    }
}})
@inject(({store: {userState}}) => ({userState}))
@inject("store")
@observer
export default class Feedback extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            feedback: "",
            submiting: false,
        };
    }

    render() {
        const {feedback} = this.state;
        const {classes = ""} = this.props;
        return <div>
            <div className={classes.card + " " + classes.formContainer}>
                <Form
                    ref="form"
                    v-data={this.state}
                    setState={this.stateFun}>
                    <CustomInput
                        labelText="您的意见与建议"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            value: feedback,
                            multiline: true,
                            rows: 12,
                            rowsMax: 12,
                            onChange: this.onChange
                        }}
                    />
                </Form>
            </div>
            <div style={{marginTop: '1rem', backgroundColor: 'white'}}>
                <ListItem className={classes.item} style={{borderBottom: '0.01rem solid #dadada'}} onClick={this.submit}>
                    <ListItemText
                        primary={<div style={{margin: 0, padding: 0, textAlign: 'center'}}>
                            {
                                this.state.submiting ? <div style={{paddingTop: 4}}><CircularProgress color="secondary" size={16} /></div> : "提交"
                            }
                        </div>}
                    />
                </ListItem>
            </div>
        </div>;
    }

    submit = () => {
        const {feedback} = this.state;
        if (feedback.replace(/ /g, "").length < 10) {
            this.notification("请输入大于10个字符，O(∩_∩)O");
            return;
        }
        if (feedback.length > 200) {
            this.notification("不能多余200个字符，~ o(*￣▽￣*)o");
            return;
        }
        this.setState({submiting: true});
        this.props.userState.saveFeedback({
            content: feedback,
        })
            .then(res => {
                this.setState({submiting: false, submitSuccess: true, feedback: ""});
                this.notification("感谢您宝贵的意见与建议，(￣▽￣)");
                setTimeout(() => this.back(), 1000);
            })
            .catch(err => this.setState({submiting: false}));
    };

    onChange = (e) => {
        this.setState({feedback: e.target.value});
    };

}
