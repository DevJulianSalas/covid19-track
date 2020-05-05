import React from 'react';
import { Card, Avatar } from 'antd';

import './cardInfo.scss'

const { Meta } = Card;

const getColor = (key) => (
  {
    infect: 'volInfo',
    deceased: 'redInfo',
    recover: 'greenInfo',
    mild: 'yellInfo',
  }
)


const CardInfo = ( props ) => {
  const dataCov = [
    {
      key: 'infect',
      title: 'Número de Infectados',
      count: props.covData !== null ? props.covData.infected : 0
    },
    {
      key: 'deceased',
      title: 'Número de Fallecidos',
      count: props.covData !== null ? props.covData.deceased : 0
    },
    {
      key: 'recover',
      title: 'Número de Recuperados',
      count: props.covData !== null ? props.covData.recover : 0
    },
    {
      key: 'mild',
      title: 'Número de Leves',
      count: props.covData !== null ? props.covData.mild : 0
    },
  ]
  const cardData = dataCov.map((data, i) => (
    <Card key={i} style={{ width: 250, marginTop: 16 }} loading={props.loading}>
      <Meta
        title={<div className={`${getColor()[data.key]} ant-card-meta-title`}>{data.count}</div>}
        description={data.title}
      />
    </Card>
  ))
  return (
    <div className="cardData">
      { cardData }
    </div>
  )
}

export default CardInfo
