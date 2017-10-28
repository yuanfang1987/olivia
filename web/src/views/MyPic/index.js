import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Slider, Button, Select, Input, message} from 'antd';
import fx from './glfx';
import {uploadPicture} from '../../actions/picture';
import actionStatus from '../../actions/actionTypes';
import './index.less'

const { Option } = Select;
const { TextArea } = Input;

class FxPic extends React.Component {
    /** 构造函数 */
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            value1: 0,
            value2: 0,
            value3: 0,
            min1: 0,
            min2: 0,
            min3: 0,
            max1: 0,
            max2: 0,
            max3: 0,
            step1: 0,
            step2: 0,
            step3: 0,
            labelName1: '',
            labelName2: '',
            labelName3: '',
            prepare: false,
            imageUrl: '',
            imageDesc: ''
        };
        this.canvas = null;
        this.image = null;
        this.texture = null;
    }

    /** 当有新的属性更新时就会触发这个函数 */
    componentWillReceiveProps(nextProps){
        if (nextProps.picture.status !== 'NotStarted' && nextProps.picture.status !== this.props.picture.status) {
            if (nextProps.picture.status === actionStatus.UPLOAD_PICTURE_SUCCESS) {
                message.success('图片上传成功！');
            } else if (nextProps.picture.status === actionStatus.UPLOAD_PICTURE_FAIL) {
                message.error('图片上传失败! ')
            }

        }
    }

    /** 从本地打开一个图片并显示在网页的时候触发的函数 */
    changePic = () => {
        this.canvas = fx.canvas();
        /** 居中显示 */
        this.canvas.className = "aligncenter";
        this.image = document.getElementById('glfx-image');
        this.texture = this.canvas.texture(this.image);
        this.canvas.draw(this.texture).hueSaturation(this.state.value1, this.state.value2).update();
        this.image.parentNode.insertBefore(this.canvas, this.image);
    };

    /** 拖动滤镜进度条，改变滤镜参数时触发的函数 */
    kiddingMe = () => {
        if (this.canvas === null) {
            this.changePic();
            this.setState({
                prepare: true,
                imageUrl: ''
            });
        }
        const name = this.state.filterName;
        switch (name) {
            case 'brightnessContrast':
                this.canvas.draw(this.texture).brightnessContrast(this.state.value1, this.state.value2).update();
                break;
            case 'hueSaturation':
                this.canvas.draw(this.texture).hueSaturation(this.state.value1, this.state.value2).update();
                break;
            case 'unsharpMask':
                this.canvas.draw(this.texture).unsharpMask(this.state.value1, this.state.value2).update();
                break;
            case 'noise':
                this.canvas.draw(this.texture).noise(this.state.value1).update();
                break;
            case 'sepia':
                this.canvas.draw(this.texture).sepia(this.state.value1).update();
                break;
            case 'vignette':
                this.canvas.draw(this.texture).vignette(this.state.value1, this.state.value2).update();
                break;
            case 'lensBlur':
                this.canvas.draw(this.texture).lensBlur(this.state.value1, this.state.value2, this.state.value3).update();
                break;
            case 'ink':
                this.canvas.draw(this.texture).ink(this.state.value1).update();
                break;
        }
    };

    /** 拖动第一个进度条触发的函数 */
    changeParaOne = (value) => {
        this.setState({
                value1: value,
            }
        );
        console.log('value1: ', value);
        this.kiddingMe();
    };

    /** 拖动第二个进度条触发的函数 */
    changeParaTwo = (value) => {
        this.setState({
            value2: value,
        });
        console.log('value2: ', value);
        this.kiddingMe();
    };

    /** 拖动第三个进度条触发的函数 */
    changeParaThree = (value) => {
        this.setState({
            value3: value
        });
        console.log('value3: ', value);
        this.kiddingMe();
    };

    /** 上传图片到后台服务器 */
    handleUpload = () => {
        this.canvas.update();
        const aa = this.canvas.toDataURL();
        console.log('base64 pic: ', aa);
        this.props.actions.uploadPicture(aa, this.state.imageDesc);
    };

    /** 从本地选择图片之后的处理事件 */
    onInputChange = (e) => {
        if (e.target.files.length === 0) {
            console.log('未选择任何图片');
            return
        }

        /** 清空 canvas 的内容 */
        if (this.texture !== null) {
            this.texture.destroy();
        }
        if (this.canvas !== null) {
            this.image.parentNode.removeChild(this.canvas);
            this.canvas = null;
        }

        /** 读取图片内容，并转化成 base64 编码 */
        const read = new FileReader();
        read.onload = () => {
            const fileDataUrlString = read.result;
            this.setState({
                imageUrl: fileDataUrlString
            });
        };
        read.onabort = () => console.log('file reading was aborted');
        read.onerror = () => console.log('file reading has failed');

        read.readAsDataURL(e.target.files[0]);
    };

    /** 图片的描述文字发生变化后触发的函数 */
    onTextAreaChange = (e) => {
        const content = e.target.value;
        this.setState({
            imageDesc: content
        });
    };

    /** 选择不同滤镜触发的函数 */
    onSelectOption = (value, option) => {
        switch (value) {
            case 'brightnessContrast':
                this.setState({
                    min1: -1,
                    max1: 1,
                    step1: 0.01,
                    labelName1: '亮度',
                    min2: -1,
                    max2: 1,
                    step2: 0.01,
                    labelName2: '对比度',
                    filterName: value
                });
                break;
            case 'hueSaturation':
                this.setState({
                    min1: -1,
                    max1: 1,
                    step1: 0.01,
                    labelName1: '色度',
                    min2: -1,
                    max2: 1,
                    step2: 0.01,
                    labelName2: '饱和度',
                    filterName: value
                });
                break;
            case 'unsharpMask':
                this.setState({
                    min1: 0,
                    max1: 200,
                    step1: 1,
                    labelName1: '半径',
                    min2: 0,
                    max2: 5,
                    step2: 0.01,
                    labelName2: '强度',
                    filterName: value
                });
                break;
            case 'noise':
                this.setState({
                    min1: 0,
                    max1: 1,
                    step1: 0.01,
                    labelName1: '数量',
                    filterName: value
                });
                break;
            case 'sepia':
                this.setState({
                    min1: 0,
                    max1: 1,
                    step1: 0.01,
                    labelName1: '数量',
                    filterName: value
                });
                break;
            case 'vignette':
                this.setState({
                    min1: 0,
                    max1: 1,
                    step1: 0.01,
                    labelName1: '尺寸',
                    min2: 0,
                    max2: 1,
                    step2: 0.01,
                    labelName2: '数量',
                    filterName: value
                });
                break;
            case 'lensBlur':
                this.setState({
                    min1: 0,
                    max1: 50,
                    step1: 1,
                    labelName1: '半径',
                    min2: -1,
                    max2: 1,
                    step2: 0.01,
                    labelName2: '亮度',
                    min3: -3.141592653,
                    max3: 3.141592653,
                    step3: 0.01,
                    labelName3: '角度',
                    filterName: value
                });
                break;
            case 'ink':
                this.setState({
                    min1: 0,
                    max1: 1,
                    step1: 0.01,
                    labelName1: '强度',
                    filterName: value
                });
                break;
        }
    };

    /** 渲染页面 */
    render() {
        const sliders = [];
        const s1 = <div key="div1">
                    {this.state.labelName1}:
                    <Slider min={this.state.min1}
                            max={this.state.max1}
                            onChange={this.changeParaOne.bind(this)}
                            value={this.state.value1} step={this.state.step1} key="s1"/>
                    </div>;
        const s2 = <div key="div2">
                    {this.state.labelName2}:
                    <Slider min={this.state.min2}
                            max={this.state.max2}
                            onChange={this.changeParaTwo.bind(this)}
                            value={this.state.value2} step={this.state.step2} key="s2"/>
                    </div>;
        const s3 = <div key="div3">
                    {this.state.labelName3}:
                    <Slider min={this.state.min3}
                            max={this.state.max3}
                            onChange={this.changeParaThree.bind(this)}
                            value={this.state.value3} step={this.state.step3} key="s3"/>
                    </div>;
        const newline1 = <br key="line1"/>;
        const newline2 = <br key="line2"/>;

        /** 根据滤镜名称来决定需要多少个参数 */
        const name = this.state.filterName;
        switch (name) {
            case 'brightnessContrast':
                sliders.push(s1);
                sliders.push(newline1);
                sliders.push(s2);
                break;
            case 'hueSaturation':
                sliders.push(s1);
                sliders.push(newline1);
                sliders.push(s2);
                break;
            case 'unsharpMask':
                sliders.push(s1);
                sliders.push(newline1);
                sliders.push(s2);
                break;
            case 'vignette':
                sliders.push(s1);
                sliders.push(newline1);
                sliders.push(s2);
                break;
            case 'noise':
                sliders.push(s1);
                sliders.push(newline1);
                break;
            case 'sepia':
                sliders.push(s1);
                sliders.push(newline1);
                break;
            case 'ink':
                sliders.push(s1);
                sliders.push(newline1);
                break;
            case 'lensBlur':
                sliders.push(s1);
                sliders.push(newline1);
                sliders.push(s2);
                sliders.push(newline2);
                sliders.push(s3);
                break;
        }

        return (
            <div>
                <div>
                    <img id="glfx-image" className="aligncenter" src={this.state.imageUrl} />
                </div>

                <br/>

                <input type="file" size="36" onChange={this.onInputChange.bind(this)}/>

                <br/>
                选择滤镜：
                <Select style={{ width: 300 }} placeholder="请选择一个滤镜" onSelect={this.onSelectOption.bind(this)} >
                    <Option value="brightnessContrast" key="brightnessContrast">亮度/对比度</Option>
                    <Option value="hueSaturation" key="hueSaturation">色度/饱和度</Option>
                    <Option value="unsharpMask" key="unsharpMask">锐利</Option>
                    <Option value="noise" key="noise">噪点</Option>
                    <Option value="sepia" key="sepia">怀旧</Option>
                    <Option value="vignette" key="vignette">光圈</Option>
                    <Option value="lensBlur" key="lensBlur">模糊</Option>
                    <Option value="ink" key="ink">墨水</Option>
                </Select>

                <br/>

                <div style={{width:'40%'}}>
                    {sliders}
                </div>

                <br/>

                <TextArea rows={4} placeholder="附上一段文字来描述你美美的照片吧！" onChange={this.onTextAreaChange.bind(this)} />

                <br/>

                <Button className="btn-login" type='primary' size="large" icon="poweroff"
                        loading={this.props.picture.loading} htmlType='button' onClick={this.handleUpload.bind(this)}>
                    上传
                </Button>
            </div>
        )
    }
}

/** 只从 state 状态树中取 picture 这一小部分, 注意这里用到了解构赋值的语法 */
function mapStateToProps(state) {
    const {picture} = state;
    return {picture};
}

/** 绑定 uploadPicture 函数 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({uploadPicture}, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FxPic))
