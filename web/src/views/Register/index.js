import React from 'react';
import {Form, Input, Button, Row, Col, Icon, message, Radio} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {register} from '../../actions/user';
import actionStatus from '../../actions/actionTypes';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

import './index.less';

class Register extends React.Component {

    /** 构造函数 */
    constructor(props) {
        super(props);
    }

    /** 当有新的属性更新时就会触发这个函数 */
    componentWillReceiveProps(nextProps) {
        console.log('get next props: ', nextProps);
        if (nextProps.user.status !== 'NotStarted' && nextProps.user.status !== this.props.user.status) {
            if (nextProps.user.status === actionStatus.REGISTER_SUCCESS) {
                message.success('注册成功！终于等到你 , ' + nextProps.user.user.name + '!');
                this.props.history.replace('/');
            } else if (nextProps.user.status === actionStatus.REGISTER_ERROR) {
                message.error('注册失败！ '+ nextProps.user.message);
            }
        }

    }

    /** 点击注册按钮后触发的函数 */
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('get values from register form: ', values);
                /** 把用户输入的email,密码，名字、性别， 发给后台 */
                this.props.actions.register(values.email, values.password, values.gender, values.name);
            }
        });
    }

    /** 渲染注册页面 */
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
                    <div style={{ textAlign: 'center' }}>
                    <Form onSubmit={this.handleSubmit.bind(this)} style={{maxWidth: 300, margin: '0 auto'}}>
                        <FormItem>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入用户名'}]
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                                       placeholder='用户名'/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('gender', {
                                rules: [{ required: true, message: '请选择性别'}]
                            })(
                                <RadioGroup style={{float: 'left'}}>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={0}>女</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('email', {
                                rules: [{type: 'email', message: '邮箱地址格式非法'},
                                    { required: true, message: '请输入邮箱地址' }]
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                                       placeholder='邮箱地址'/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码'}]
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type='password'
                                       placeholder='密码'/>
                            )}
                        </FormItem>
                        <p>
                            <Button className="btn-login" type='primary' size="large" icon="poweroff"
                                    loading={this.props.user.loading} htmlType='submit'>注册</Button>
                        </p>
                    </Form>
                    </div>
        )
    }
}

/** 创建表单组件 */
Register = Form.create()(Register);

/** 只从 state 状态树中取 user 这一小部分, 注意这里用到了解构赋值的语法 */
function mapStateToProps(state) {
    const {user} = state;
    return {user};
}

/** 绑定 register 函数 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({register}, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register))
