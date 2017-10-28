import React from 'react';
import {Form, Input, Button, Row, Col, Icon, message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {login} from '../../actions/user';
import './index.less';

const FormItem = Form.Item;

class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        console.log('get next props: ', nextProps);
        if (nextProps.user.status !== 'NotStarted' && nextProps.user.status !== this.props.user.status) {
            if (nextProps.user.status === 'Success') {
                message.success('欢迎回来 , ' + nextProps.user.user.name + '!');
                this.props.history.replace('/');
            } else if (nextProps.user.status === 'Fail') {
                message.error('登录失败！ '+ nextProps.user.loginErrors);
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = this.props.form.getFieldsValue();
        this.props.actions.login(data.email, data.password)
    }

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

Login = Form.create()(Login);

function mapStateToProps(state) {
    const {user} = state;
    return {user}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({login}, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
