import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';
import Gallery from 'react-grid-gallery';
import {Button} from 'antd';
import {getAllPictures, deletePictures} from '../../actions/picture'


class MyGallery extends React.Component {
    /** 构造函数 */
    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
    }

    /** 在照片墙页面渲染完成后， 自动向后台服务器发起请求，获取当前用户的照片列表 */
    componentDidMount(){
        this.props.actions.getAllPictures();
    }

    /** 当有新的属性更新时就会触发这个函数 */
    componentWillReceiveProps(nextProps){
        let pictures = nextProps.picture.pictures;
        console.log('next props pictures: ', pictures);

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

    /** 选取照片后触发的函数 */
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

    /** 点击删除按钮后，把要删除的照片的信息发给服务器 */
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
        /** 把要删除的图片（一个或两个以上），的路径发给服务器 */
        this.props.actions.deletePictures(toBeDeletedArr)
    }

    /** 渲染照片墙页面 */
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

/** 只从 state 状态树中取 picture 这一小部分, 注意这里用到了解构赋值的语法 */
function mapStateToProps(state) {
    const {picture} = state;
    return {picture};
}

/** 绑定 getAllPictures， deletePictures 两个函数 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({getAllPictures, deletePictures}, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyGallery))
