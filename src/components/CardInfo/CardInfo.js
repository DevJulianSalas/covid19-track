import React from 'react';
import { Card, Avatar } from 'antd';

const { Meta } = Card;


const CardInfo = ( props ) => {
  console.log(props)
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
    <Card key={i} style={{ width: 300, marginTop: 16 }} loading={props.loading}>
      <Meta
        avatar={
          <Avatar src={data.icon}/>
        }
        title={data.count}
        description={data.title}
      />
    </Card>
  ))
  return (
    <div>
      { cardData }
    </div>
  )
}

export default CardInfo
