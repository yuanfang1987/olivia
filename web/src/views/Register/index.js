import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Button, Row, Col, Icon, message, Radio} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {login, register} from '../../actions/user';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

import './index.less';

const propTypes = {
    user: PropTypes.object,
    loggingIn: PropTypes.bool,
    loginErrors: PropTypes.string
};

const contextTypes = {
    store: PropTypes.object.isRequired
};

class Register extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const error = nextProps.loginErrors;
        const isLoggingIn = nextProps.loggingIn;
        const user = nextProps.user;

        console.log('get next props: ', nextProps);
        console.log("componentWillReceiveProps, get user object: ", user);

        if (error !== this.props.loginErrors && error) {
            message.error(error);
        }

        if ( user && !error && !isLoggingIn) {
            console.log("Welcome ", user.name);
            message.success('终于等到你, ' + user.name + ' !');
            this.props.history.replace('/');
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = this.props.form.getFieldsValue();
        // this.props.actions.login(data.email, data.password);
        this.props.actions.register(data.email, data.password, data.gender, data.name);
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
                            {getFieldDecorator('name')(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                                       placeholder='用户名'/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('gender')(
                                <RadioGroup>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={0}>女</Radio>
                                </RadioGroup>
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
                                    loading={this.props.load.loading} htmlType='submit'>注册</Button>
                        </p>
                    </Form>
                </Col>
            </Row>

        )
    }
}

Register.contextTypes = contextTypes;

Register.propTypes = propTypes;

Register = Form.create()(Register);

function mapStateToProps(state) {
    const {auth} = state;
    const {load} = state;
    // return {auth}
    if (auth.user) {
        return {load, user: auth.user, loggingIn: auth.loggingIn, loginErrors: ''};
    }

    return {load, user: null, loggingIn: auth.loggingIn, loginErrors: auth.loginErrors};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({login, register}, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register))

// onChange={this.onChange} value={this.state.value}