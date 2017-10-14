import React from 'react';
import { Tabs } from 'antd';
// import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
// import {me, logout} from '../../actions/user';
import MyChart from '../../components/IssueChart';
import SearchForm from '../../components/SearchIssueForm'
import IssueTable from '../../components/IssueTable'

const TabPane = Tabs.TabPane;

class Foo extends React.Component {
    constructor(props) {
        super(props)
    }

    buildColumns(name) {
        return ([{
            title: name,
            dataIndex: 'category',
            key: 'category',
        }, {
            title: '数量',
            dataIndex: 'count',
            key: 'count',
        }, {
            title: '百分比',
            dataIndex: 'percent',
            key: 'percent',
        }
        ]);
    }

    render() {
        return(
            <div>
                <SearchForm/>
                <br/>
                <MyChart/>
                <br/>
                <h3>Bug详情</h3>
                <p><span>有效Bug总数: {this.props.jira.total}</span></p>
                <Tabs onChange={this.callback} type="card">
                    <TabPane tab="严重程度" key="1">
                        <IssueTable col={this.buildColumns('严重程度')} data={this.props.jira.filterServeriy}/>
                    </TabPane>
                    <TabPane tab="紧急程度" key="2">
                        <IssueTable col={this.buildColumns('紧急程度')} data={this.props.jira.priorIssu}/>
                    </TabPane>
                    <TabPane tab="缺陷类型" key="3">
                        <IssueTable col={this.buildColumns('缺陷类型')} data={this.props.jira.typeIssu}/>
                    </TabPane>
                    <TabPane tab="功能模块" key="4">
                        <IssueTable col={this.buildColumns('功能模块')} data={this.props.jira.compoIssue}/>
                    </TabPane>
                    <TabPane tab="当前状态" key="5">
                        <IssueTable col={this.buildColumns('当前状态')} data={this.props.jira.stateissues}/>
                    </TabPane>
                    <TabPane tab="Bug提交人" key="6">
                        <IssueTable col={this.buildColumns('Bug提交人')} data={this.props.jira.reporterissues} />
                    </TabPane>
                    <TabPane tab="当前责任人" key="7">
                        <IssueTable col={this.buildColumns('当前责任人')} data={this.props.jira.assigneesissue} />
                    </TabPane>
                    <TabPane tab="ReOpen数量" key="8">
                        <IssueTable col={this.buildColumns('ReOpen数量')} data={this.props.jira.reopenissues} />
                    </TabPane>
                    <TabPane tab="Rejected数量" key="9">
                        <IssueTable col={this.buildColumns('Rejected数量')} data={this.props.jira.rejectedissues} />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {jira} = state;
    return {jira};
}

// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators({me, logout}, dispatch)
//     }
// }

export default withRouter(connect(mapStateToProps)(Foo))
