import React from "react";
import PropTypes from 'prop-types';
import defaultImage from "../../assets/img/default-avatar.png";

class PictureUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            imagePreviewUrl: defaultImage
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
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
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
        return (
            <div className="picture-container">
                <div className="picture" style={{width: 76, height: 76, backgroundImage: `url(${this.state.imagePreviewUrl})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
                    {/*<img
                        src={this.state.imagePreviewUrl}
                        className="picture-src"
                        alt="..."
                    />*/}
                    <input type="file" onChange={e => this.handleImageChange(e)} style={{width: 76, height: 76, left: '50%', marginLeft: -38}}/>
                </div>
                <p className="description" style={{fontSize: 14, margin: 0}}>{this.props.label}</p>
            </div>
        );
    }
}

PictureUpload.propTypes = {
    label: PropTypes.string
};
PictureUpload.defaultProps = {
    label: "点击编辑图片"
};

export default PictureUpload;
