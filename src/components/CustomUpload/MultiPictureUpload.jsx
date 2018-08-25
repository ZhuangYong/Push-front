import React from "react";
import PropTypes from 'prop-types';
import addImage from "../../assets/img/icon/add-image.png";
import CircularProgress from "material-ui/Progress/CircularProgress";
const style = {
    picture: {
        width: '2rem',
        height: '2rem',
        backgroundImage: `url(${addImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: 0,
        backgroundColor: 'white',
        border: 'none',
        overflow: 'hidden'
    },
    uploadInput: {
        width: '2rem',
        height: '2rem',
    }
};

class MultiPictureUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            uploadIng: false,
            imagePreviewUrl: ""
        };
        this.handleImageChange = this.handleImageChange.bind(this);
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
                this.props.uploadSuccess(res);
                this.setState({uploadIng: false});
            }).catch(err => {
                this.setState({uploadIng: false});
            });
        };
        reader.readAsDataURL(file);
    }

    render() {
        const {label, labelStyle, enableLabel} = this.props;
        return (
            <div className="picture-container">
                {
                    this.state.uploadIng ? <div style={{width: '2rem', height: '2rem', padding: '.4rem'}}>
                        <CircularProgress color="secondary" size={14} />
                    </div> : <div className="picture" style={style.picture}>
                        <input ref="file" type="file" onChange={e => this.handleImageChange(e)} style={style.uploadInput}/>
                    </div>
                }
                {
                    enableLabel && <p className="description" style={{fontSize: 14, margin: 0, ...labelStyle}}>{label}</p>
                }
            </div>
        );
    }
}

MultiPictureUpload.propTypes = {
    enableLabel: PropTypes.bool,
    uploadAction: PropTypes.func,
    uploadSuccess: PropTypes.func,
    defaultImage: PropTypes.string,
    label: PropTypes.string,
    labelStyle: PropTypes.any
};
MultiPictureUpload.defaultProps = {
    enableLabel: true,
    uploadAction: f => f,
    uploadSuccess: f => f,
    defaultImage: "",
    label: "点击添加",
    labelStyle: {}
};

export default MultiPictureUpload;
