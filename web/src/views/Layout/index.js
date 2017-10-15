import React from 'react';
import {connect} from 'react-redux';
import { Layout, Menu, Icon, message } from 'antd';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import Login from '../login';
import Register from '../Register';
import FxPic from '../MyPic'
import MyGallery from '../PictureGallery'
import {login, register, logout} from '../../actions/user';
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

    onClickMenuItem ({key}){
        console.log('click key: ', key);
        if (key === '6') {
            console.log('try to logout');
            this.props.actions.logout();
        }
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.onClickMenuItem.bind(this)}>
                        <Menu.Item key="1">
                            <Link to="/">
                                <Icon type="laptop" />
                                <span>首页</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/register">
                                <Icon type="user" />
                                <span>注册</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/login">
                                <Icon type="user" />
                                <span>登录</span>
                            </Link>
                        </Menu.Item>
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="folder" /><span>我的图片</span></span>}
                        >
                            <Menu.Item key="4"><Link to="/changepic">滤镜</Link></Menu.Item>
                            <Menu.Item key="5"><Link to="/gallery">照片墙</Link></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="6">
                                <Icon type="user" />
                                <span>退出</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 650 }}>
                            <Switch>
                                <Route exact path="/" render={() => <div><img src="http://localhost:3000/picture/night03.jpeg"/></div>} />
                                <Route path="/login" component={Login} />
                                <Route path="/register" component={Register} />
                                <Route path="/changepic" component={FxPic} />
                                <Route path="/gallery" component={MyGallery} />
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        olivia.chen 出品
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    const {auth} = state;
    return {auth};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({login, register, logout}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App2)

/** logout
 *  <Breadcrumb style={{ margin: '12px 0' }}>
 <Breadcrumb.Item>User</Breadcrumb.Item>
 <Breadcrumb.Item>Bill</Breadcrumb.Item>
 </Breadcrumb>

 render={() => (
                                    this.props.auth.user ? (<Redirect to="/"/>):(<Login/>))}


 * */
