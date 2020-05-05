import React from 'react'
import { Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import { HomeOutlined, WarningOutlined, BarChartOutlined  } from '@ant-design/icons';

//styles
import './defaultLayout.scss'

const { Header, Content, Footer, Sider } = Layout;


const DefaultLayout = ( props ) => {
  const onNavigation = (nav) => {
    console.log(nav)
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0" >
        <div className="logo"/>
        <Menu onSelect={onNavigation} theme="dark" defaultSelectedKeys={[1]} mode="inline">
          <Menu.Item key="1" >
            <HomeOutlined />
            <Link to="/">
              <span>Inicio</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <WarningOutlined />
            <Link to="/recomendaciones">
              <span>Recomendaciones</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <BarChartOutlined />
            <Link to="/estadisticas">
              <span>Estadísticas</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
          <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
            <Content style={{ margin: '24px 16px 0' }}>
                { props.children }
            </Content>
          {/* <Footer className="footer">Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>
    </Layout>
  )
}

export default DefaultLayout
