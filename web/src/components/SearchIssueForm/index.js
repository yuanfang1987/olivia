import {Form, Input, Button, Icon} from 'antd'
import { DatePicker } from 'antd';
import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
// import moment from 'moment';
import {getJiraIssue, getJiraProjects} from '../../actions/jira'

const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';


class SearchForm extends Component {
    constructor(props) {
        super(props);
    }

    onFromChanged = (value, datestring) => {
        this.props.form.setFields({
            fromDate: {
                value: value
            }
        });
        console.log('set from data: ', value);
        console.log('from data string', datestring);
    };

    onEndChanged = (value, datestring) => {
        this.props.form.setFields({
            toDate: {
                value: value
            }
        });
        console.log('set to date: ', value);
        console.log('end date string: ', datestring);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const data = this.props.form.getFieldsValue();
        const project_id = data['projectName'];
        console.log('project name: ', project_id);
        const from = data['fromDate'];
        const to = data['toDate'];
        console.log('from date: ', from);
        console.log('to date: ', to);
        // debug
        var start_date = '';
        var end_date = '';
        // ((from !== null || from !== undefined) && (to !== null || to !== undefined))
        if (from && to) {
            start_date = from.format(dateFormat);
            end_date = to.format(dateFormat);
        }
        // const start_date = from.format(dateFormat);
        // const end_date = to.format(dateFormat);
        console.log('from: ', start_date);
        console.log('to: ', end_date);
        this.props.actions.getJiraIssue(project_id, start_date, end_date);
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
                <FormItem label="开始日期">
                    {getFieldDecorator('fromDate',
                        // {initialValue: moment(nowDate, dateFormat).subtract(1, 'months')}
                    )(
                        <DatePicker
                            format={dateFormat}
                            onChange={this.onFromChanged.bind(this)}
                        />
                    )}
                </FormItem>
                <FormItem label="截止日期">
                    {getFieldDecorator('toDate',
                        // {initialValue: moment(nowDate, dateFormat)}
                    )(
                        <DatePicker
                            format={dateFormat}
                            onChange={this.onEndChanged.bind(this)}
                        />
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

SearchForm = Form.create()(SearchForm);

function mapStateToProps(state) {
    const {jira} = state;
    return {jira};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({getJiraIssue, getJiraProjects}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)
