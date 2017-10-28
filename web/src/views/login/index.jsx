import React from 'react';
import {Form, Input, Button, Row, Col, Icon, message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {login} from '../../actions/user';
import actionStatus from '../../actions/actionTypes';
import './index.less';

const FormItem = Form.Item;

class Login extends React.Component {
    /** 构造函数 */
    constructor(props) {
        super(props);
    }

    /** 当有新的属性更新时就会触发这个函数 */
    componentWillReceiveProps(nextProps) {
        console.log('get next props: ', nextProps);
        if (nextProps.user.status !== 'NotStarted' && nextProps.user.status !== this.props.user.status) {
            if (nextProps.user.status === actionStatus.LOGIN_SUCCESS) {
                message.success('欢迎回来 , ' + nextProps.user.user.name + '!');
                /** 登录成功后，切换到首页 */
                this.props.history.replace('/');
            } else if (nextProps.user.status === actionStatus.LOGIN_ERROR) {
                message.error('登录失败！ '+ nextProps.user.message);
            }
        }
    }

    /** 点击登录按钮后触发的函数 */
    handleSubmit(e) {
        e.preventDefault();
        /** 获取表单的值，也就是用户输入的 email 和 password */
        const data = this.props.form.getFieldsValue();
        /** 把用户名和密码发送给后台服务器 */
        this.props.actions.login(data.email, data.password)
    }

    /** 渲染登录页面 */
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Row className="login-row" type="flex" justify="space-around" align="middle">
                <Col span="8">
                    <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)} className="login-form">
                        <h2 className="logo"><span>logo</span></h2>
                        <FormItem>
                            {getFieldDecorator('email')(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                                       placeholder='邮箱地址'/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password')(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type='password'
                                       placeholder='密码'/>
                            )}
                        </FormItem>
                        <p>
                            <Button className="btn-login" type='primary' size="large" icon="poweroff"
                                    loading={this.props.user.loading} htmlType='submit'>登录</Button>
                        </p>
                    </Form>
                </Col>
            </Row>

        )
    }
}

/** 创建表单组件 */
Login = Form.create()(Login);

/** 只从 state 状态树中取 user 这一小部分, 注意这里用到了解构赋值的语法 */
function mapStateToProps(state) {
    const {user} = state;
    return {user}
}

/** 绑定 login 函数 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({login}, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
