import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';
import Gallery from 'react-grid-gallery';
import {Button} from 'antd';
import {uploadPicture, getAllPictures, deletePictures} from '../../actions/picture'


class MyGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
    }

    componentDidMount(){
        this.props.actions.getAllPictures();
    }

    componentWillReceiveProps(nextProps){
        let pictures = nextProps.picture.pictures;
        console.log('next props pictures: ', pictures);
        // pictures = pictures.map(item => {
        //     item.store_path = 'http://localhost:3000/' + item.store_path;
        //     return item;
        // });

        pictures = pictures.map(item => ({
            originPath: item.store_path,
            src: 'http://localhost:3000/' + item.store_path,
            thumbnail: 'http://localhost:3000/' + item.store_path,
            thumbnailWidth: 320,
            thumbnailHeight: 212,
            caption: item.description
        }));

        this.setState({
            images: pictures
        });

        console.log('pictures on state: ', this.state.images);
    }

    onSelectImage (index, image) {
        console.log('select image: ', image);
        let images = this.state.images.slice();
        let img = images[index];
        if(img.hasOwnProperty("isSelected")){
            img.isSelected = !img.isSelected;
        } else {
            img.isSelected = true;
        }

        this.setState({
            images: images
        });

        console.log('after selected: ', this.state.images);
    }

    onClickDeleteButton(e) {
        e.preventDefault();
        var toBeDeletedArr = [];
        let images = this.state.images.slice();
        for(let i = 0; i < images.length; i++){
            let img = images[i];
            if(img.hasOwnProperty('isSelected')){
                if(img.isSelected){
                    toBeDeletedArr.push(img.originPath);
                }
            }
        }
        console.log('to be delete images: ', toBeDeletedArr);
        this.props.actions.deletePictures(toBeDeletedArr)
    }

    render() {
        return (
            <div>
                <Button className="btn-login" type='primary' size="large" icon="poweroff"
                        loading={this.props.picture.loading} htmlType='button' onClick={this.onClickDeleteButton.bind(this)}>
                    删除
                </Button>
                <br/>
                <Gallery images={this.state.images} onSelectImage={this.onSelectImage}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {picture} = state;
    return {picture};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({uploadPicture, getAllPictures, deletePictures}, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyGallery))
