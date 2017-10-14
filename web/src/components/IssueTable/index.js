import React, { Component } from 'react';
import { Table } from 'antd';


class IssueTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Table columns={this.props.col} dataSource={this.props.data} />
        )
    }

}

export default IssueTable
