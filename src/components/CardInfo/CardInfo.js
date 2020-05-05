import React from 'react';
import { Card, Avatar } from 'antd';

import './cardInfo.scss'

const { Meta } = Card;


const CardInfo = ( props ) => {
  const dataCov = [
    {
      title: 'Número de Infectados',
      icon: '.',
      count: props.covData !== null ? props.covData.infected : 0
    },
    {
      title: 'Número de Fallecidos',
      icon: '.',
      count: props.covData !== null ? props.covData.deceased : 0
    },
    {
      title: 'Número de Recuperados',
      icon: '.',
      count: props.covData !== null ? props.covData.recover : 0
    },
    {
      title: 'Número de Leves',
      icon: '.',
      count: props.covData !== null ? props.covData.mild : 0
    },
  ]
  const cardData = dataCov.map((data, i) => (
    <Card key={i} style={{ width: 250, marginTop: 16 }} loading={props.loading}>
      <Meta
        title={data.count}
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
