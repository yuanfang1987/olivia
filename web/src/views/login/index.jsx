import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Button, Row, Col, Icon, message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {login, register} from '../../actions/user';

const FormItem = Form.Item;

import './index.less';

const propTypes = {
    user: PropTypes.object,
    loggingIn: PropTypes.bool,
    loginErrors: PropTypes.string
};

const contextTypes = {
    store: PropTypes.object.isRequired
};

class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        console.log('get next props: ', nextProps);
        if (nextProps.auth.status !== 'NotStarted' && nextProps.auth.status !== this.props.auth.status) {
            if (nextProps.auth.status === 'Success') {
                message.success('欢迎回来 , ' + nextProps.auth.user.name + '!');
                this.props.history.replace('/');
            } else if (nextProps.auth.status === 'Fail') {
                message.error('登录失败！ '+ nextProps.auth.loginErrors);
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
                                    loading={this.props.load.loading} htmlType='submit'>登录</Button>
                        </p>
                    </Form>
                </Col>
            </Row>

        )
    }
}

Login.contextTypes = contextTypes;

Login.propTypes = propTypes;

Login = Form.create()(Login);

function mapStateToProps(state) {
    const {auth, load} = state;
    return {auth, load}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({login, register}, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
