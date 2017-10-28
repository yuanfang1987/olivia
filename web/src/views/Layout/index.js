import React from 'react';
import {connect} from 'react-redux';
import { Layout, Menu, Icon, message } from 'antd';
import { Route, Link, Switch } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import Login from '../login';
import Register from '../Register';
import FxPic from '../MyPic'
import MyGallery from '../PictureGallery'
import {logout} from '../../actions/user';
import actionStatus from '../../actions/actionTypes';
import './index.less'


const {Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class App extends React.Component {
    /** 构造函数 */
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    /** 当有新的属性更新时就会触发这个函数 */
    componentWillReceiveProps(nextProps) {
        console.log('get next props: ', nextProps);
        if (nextProps.user.status !== 'NotStarted' && nextProps.user.status !== this.props.user.status) {
            if (nextProps.user.status === actionStatus.LOGOUT_SUCCESS) {
                if (this.props.user.user.name) {
                    message.success('退出成功');
                    /** 不管当前处在哪个页面，退出成功后，都要强制返回首页 */
                    this.props.history.replace('/');
                }
            }
        }
    }

    /** 点击左侧菜单时触发的函数，如果点击到 key 等于6 的菜单，就是执行退出操作 */
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
                    style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
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
                <Layout style={{ marginLeft: 200 }}>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 800 }}>
                            <Switch>
                                <Route exact path="/" render={() => <div><img src="http://localhost:3000/picture/home.jpg"
                                                                              height="100%" width="100%"/></div>} />
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

/** 只从 state 状态树中取 user 这一小部分, 注意这里用到了解构赋值的语法 */
function mapStateToProps(state) {
    const {user} = state;
    return {user};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({logout}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
