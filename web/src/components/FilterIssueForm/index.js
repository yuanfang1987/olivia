import {Form, Input, Button, Icon} from 'antd'
// import { DatePicker } from 'antd';
import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
// import moment from 'moment';
import {getJiraIssue, filterJiraIssue} from '../../actions/jira'

const FormItem = Form.Item;

class FilterForm extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = this.props.form.getFieldsValue();
        const project_id = data['projectName'];
        console.log('project name: ', project_id);
        this.props.actions.filterJiraIssue(project_id);
    };


    render() {
        // const date = new Date();
        // const nowDate=date.toLocaleDateString();//获取当前日期（年月日）
        // , getFieldsError, getFieldError, isFieldTouched
        const { getFieldDecorator} = this.props.form;
        return (
            <Form layout="inline" onSubmit={this.handleSubmit.bind(this)} >
                <FormItem label="项目名称">
                    {getFieldDecorator('projectName', {
                        rules: [{require: true, message: '请输入项目名称'}]
                    })(
                        <Input prefix={<Icon type="solution" />} style={{ fontSize: 13 }} placeholder="project name" />
                    )}

                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" loading={this.props.jira.loading}
                            size="large" icon="poweroff">查询</Button>
                </FormItem>
            </Form>
        )
    }
}

FilterForm = Form.create()(FilterForm);

function mapStateToProps(state) {
    const {jira} = state;
    return {jira};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({getJiraIssue, filterJiraIssue}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm)
