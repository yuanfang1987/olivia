import React from 'react';
import {connect} from 'react-redux';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Route, Link } from 'react-router-dom';
import IssueSummary from '../Jira';
import Login from '../login';
import FxPic from '../MyPic'
import './index.less'


const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class App2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Link to="login">
                                <Icon type="pie-chart" />
                                <span>首页</span>
                            </Link>
                        </Menu.Item>

                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="desktop"/>Bug统计</span>}
                        >
                            <Menu.Item key="2">
                                <Link to="/jiraissues">
                                    <span>Bug趋势</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="21">
                                    <span>Bug详情</span>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="user" /><span>User</span></span>}
                        >
                            <Menu.Item key="3"><Link to="/changepic">Tom</Link></Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub3"
                            title={<span><Icon type="team" /><span>Team</span></span>}
                        >
                            <Menu.Item key="6">车载组</Menu.Item>
                            <Menu.Item key="8">Display组</Menu.Item>
                            <Menu.Item key="9">Eufy组</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9">
                            <Icon type="file" />
                            <span>File</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Breadcrumb style={{ margin: '12px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 650 }}>
                            <Route path="/login" component={Login} />
                            <Route path="/jiraissues" component={IssueSummary} />
                            <Route path="/changepic" component={FxPic} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        海翼软件测试中心荣誉出品
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    const {jira} = state;
    return {jira};
}

export default connect(mapStateToProps)(App2)
