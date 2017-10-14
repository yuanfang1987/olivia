import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Button, Row, Col, Icon, message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {login, register} from '../../actions/user';

const FormItem = Form.Item;

import './index.less'

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

    componentWillMount() {
        const {actions} = this.props;
        //actions.fetchProfile();
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

        if (!isLoggingIn && !error && user) {
            console.log("Welcome ", user.email);
            this.props.history.replace('/');
            message.success('Welcome , ' + user.email);
        }

        if (user) {
            this.props.history.replace('/');
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
                                       placeholder='email'/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password')(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type='password'
                                       placeholder='password'/>
                            )}
                        </FormItem>
                        <p>
                            <Button className="btn-login" type='primary' size="large" icon="poweroff"
                                    loading={this.props.load.loading} htmlType='submit'>'Login'</Button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
