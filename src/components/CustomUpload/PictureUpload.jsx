import React from "react";
import PropTypes from 'prop-types';
import defaultNoneImage from "../../assets/img/default-avatar.png";
import CircularProgress from "material-ui/Progress/CircularProgress";

class PictureUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            uploadIng: false,
            imagePreviewUrl: ""
        };
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        if (!file) {
            return;
        }
        reader.onloadend = () => {
            const data = new FormData();
            data.append("file", file);
            this.setState({uploadIng: true});
            this.props.uploadAction(data).then(res => {
                this.setState({
                    file: file,
                    imagePreviewUrl: res
                });
                this.setState({uploadIng: false});
            }).catch(err => {
                this.setState({uploadIng: false});
            });
        };
        reader.readAsDataURL(file);
    }

    handleSubmit(e) {
        e.preventDefault();
        // this.state.file is the file/image uploaded
        // in this function you can save the image (this.state.file) on form submit
        // you have to call it yourself
    }

    render() {
        const {imagePreviewUrl} = this.state;
        const {defaultImage, label, labelStyle, disabled} = this.props;
        return (
            <div className="picture-container">
                <div className="picture" style={{width: '6rem', height: '6rem', backgroundImage: `url(${imagePreviewUrl || defaultImage || defaultNoneImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', borderColor: 'white'}}>
                        {
                            this.state.uploadIng ? <CircularProgress color="secondary" size={14} /> : ""
                        }
                    {
                        !disabled && <input type="file" onChange={e => this.handleImageChange(e)} style={{width: '6rem', height: '6rem', left: '50%', marginLeft: -38}}/>
                    }
                </div>
                <p className="description" style={{fontSize: 14, margin: 0, ...labelStyle}}>{label}</p>
            </div>
        );
    }
}

PictureUpload.propTypes = {
    disabled: PropTypes.bool,
    uploadAction: PropTypes.func,
    defaultImage: PropTypes.string,
    label: PropTypes.string,
    labelStyle: PropTypes.any
};
PictureUpload.defaultProps = {
    disabled: false,
    uploadAction: console.log("not set uploadAction"),
    defaultImage: "",
    label: "点击编辑图片",
    labelStyle: {}
};

export default PictureUpload;
