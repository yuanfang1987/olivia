import createG2 from 'g2-react';
import { Stat } from 'g2';
import React, { Component } from 'react';
// import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
// import {getJiraIssue, getJiraProjects} from '../../actions/jira'

const Line = createG2(chart => {
    chart.col('date', {
        alias: '日期'
    });
    chart.col('count', {
       alias: 'Bug数量'
    });
    chart.legend({
        position: 'top',
        dy: -20
    });
    chart.line().position('date*count').color('category', ['#ff7f0e', '#2ca02c']).shape('spline').size(2);
    chart.render();
});

class MyChart extends Component {
    state = {
        data: this.props.jira.issueItems, //.slice(0, data.length / 2 - 1),
        width: 1100,
        height: 250,
        plotCfg: {
            margin: [10, 100, 50, 120],
        },
    };

    // getIssueHandler = (e) => {
    //     e.preventDefault();
    //     this.props.actions.getJiraIssue('test', 'test', 'test')
    // };

    componentWillReceiveProps(nextProps) {
        const items = nextProps.jira.issueItems;
        console.log('get issues in Mychar component: ', items);
        this.setState({
            data: items
        });
    }

    render() {
        return (
            <div>
                <Line
                    data={this.state.data}
                    width={this.state.width}
                    height={this.state.height}
                    plotCfg={this.state.plotCfg}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {jira} = state;
    return {jira};
}

// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators({getJiraIssue, getJiraProjects}, dispatch)
//     }
// }

export default connect(mapStateToProps)(MyChart)
