import React from 'react'
import { Layout, Menu } from 'antd';
import { HomeOutlined, WarningOutlined, BarChartOutlined  } from '@ant-design/icons';

//styles
import './defaultLayout.scss'

const { Header, Content, Footer, Sider } = Layout;


const DefaultLayout = ( props ) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0" >
        <div className="logo"/>
        <Menu theme="dark" defaultSelectedKeys={[1]} mode="inline">
          <Menu.Item key="1">
            <HomeOutlined />
            <span>Inicio</span>
          </Menu.Item>
          <Menu.Item key="2">
            <WarningOutlined />
            <span>Recomendaciones</span>
          </Menu.Item>
          <Menu.Item key="3">
            <BarChartOutlined />
            <span>Estadísticas</span>
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
