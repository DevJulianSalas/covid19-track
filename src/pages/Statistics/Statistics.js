import React from 'react'
import { Row, Col, Typography } from 'antd';

import LineChart from '../../components/LineChart/LineChart'



const Statistics = () => {
  return (
    <div>
      <p>esto es estadisticas</p>
      <Row>
        <Col lg={8} xs={24}>
          <LineChart/>
        </Col>
      </Row>
    </div>
  )
}

export default Statistics
