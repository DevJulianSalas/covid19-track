import React from 'react'
import { Row, Col } from 'antd';
import Search from '../../components/Search/Search'


//styles
import './home.scss'

const Home = () => {
  return (
    <>
      <Row className="home" justify="center">
        <Col xs={24} lg={12}>
          <Search/>
        </Col>
      </Row>
    </>
  )
}

export default Home
