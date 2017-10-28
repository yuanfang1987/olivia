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

    constructor(props) {
        super(props);
    }

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

    handleSubmit(e) {
        e.preventDefault();
        const data = this.props.form.getFieldsValue();
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
                                    loading={this.props.user.loading} htmlType='submit'>注册</Button>
                        </p>
                    </Form>
                </Col>
            </Row>

        )
    }
}

Register = Form.create()(Register);

function mapStateToProps(state) {
    const {user} = state;
    return {user};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({register}, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register))
