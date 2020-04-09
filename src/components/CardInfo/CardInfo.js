import React from 'react';
import { Card, Avatar } from 'antd';

const { Meta } = Card;


const CardInfo = ( props ) => {
  return (
    <div>
      <Card style={{ width: 300, marginTop: 16 }} loading={props.loading}>
        <Meta
          avatar={
            <Avatar src={props.image}/>
          }
          title="Card title"
          description="This is the description"
        />
      </Card>
    </div>
  )
}

export default CardInfo
