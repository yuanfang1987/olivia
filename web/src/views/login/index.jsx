import React from 'react';
import {Form, Input, Button, Icon, message} from 'antd';
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
        this.props.form.validateFields((err, values) => {
            /** 检查校验规则有没有报错，如果没有，则把邮箱和密码发给服务器 */
            if (!err) {
                console.log('get value from login form: ', values);
                /** 把用户名和密码发送给后台服务器 */
                this.props.actions.login(values.email, values.password)
            }
        });
    }

    /** 渲染登录页面
     *  里面就是一个 Form 表单而已， 两个输入框和一个登录按钮.
     *  注意 Button 的 htmlType 是 "submit", 当Button被点击时，触发整个Form被提交，也就导致了
     *  Form的 onSubmit 属性绑定的函数 handleSubmit 被触发
     * */
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
                <div style={{ textAlign: 'center' }}>
                <Form onSubmit={this.handleSubmit.bind(this)} style={{maxWidth: 300, margin: '0 auto'}}>
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [{type: 'email', message: '邮箱地址格式非法'},
                                { required: true, message: '请输入邮箱地址' }]
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="邮箱地址" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码'}]
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password"
                                   placeholder="密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button className="btn-login" type='primary' size="large" icon="poweroff"
                                loading={this.props.user.loading} htmlType='submit'>登录</Button>
                    </FormItem>
                </Form>
                </div>

        )
    }
}

/** 创建表单组件 */
Login = Form.create()(Login);

/** 只从 state 状态树中取 user 这一小部分, 注意这里用到了解构赋值的语法
 * const {user} = state 相当于 const user = state.user
 * */
function mapStateToProps(state) {
    const {user} = state;
    return {user}
}

/** 绑定 login 函数
 *  给 handleSubmit 回调函数使用
 * */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({login}, dispatch)
    }
}

/** 把当前组件 Login 跟状态树state关联起来 */
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
