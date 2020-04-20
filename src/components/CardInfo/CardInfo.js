import React from 'react';
import { Card, Avatar } from 'antd';

const { Meta } = Card;


const CardInfo = ( props ) => {
  const { infected, deceased, recover, mild } = props.covidData
  return (
    <div>
      <Card style={{ width: 300, marginTop: 16 }} loading={props.loading}>
        <Meta
          avatar={
            <Avatar src={props.image}/>
          }
          title="Número de Infectados"
          description={infected}
        />
      </Card>
      <Card style={{ width: 300, marginTop: 16 }} loading={props.loading}>
        <Meta
          avatar={
            <Avatar src={props.image}/>
          }
          title="Número de Fallecidos"
          description={deceased}
        />
      </Card>
      <Card style={{ width: 300, marginTop: 16 }} loading={props.loading}>
        <Meta
          avatar={
            <Avatar src={props.image}/>
          }
          title="Número de Recuperados"
          description={recover}
        />
      </Card>
      <Card style={{ width: 300, marginTop: 16 }} loading={props.loading}>
        <Meta
          avatar={
            <Avatar src={props.image}/>
          }
          title="Número de Leves"
          description={mild}
        />
      </Card>
    </div>
  )
}

export default CardInfo
