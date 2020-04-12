import React, { useState } from 'react'
import { Row, Col } from 'antd';
import Search from '../../components/Search/Search'
import CardInfo from '../../components/CardInfo/CardInfo'

//firebase
import { getGeneralData } from '../../api/index'

//styles
import './home.scss'

const searchStyles = {
  display: 'flex',
  flex: '0, 0 90%'
}

const Home = () => {
  const [selectedValue, setselectedValue] = useState(undefined)
  const [choices, setchoices] = useState([
    {value: 1, text: 'Apple'},
    {value: 2, text: 'Tomato'},
    {value: 3, text: 'Banana'}
  ])

  getGeneralData()

  const onChangeOpt = ( option ) => {
    setselectedValue(option)
  }

  return (
    <>
      <Row className="home" justify="center">
        <Col xs={24} lg={12}>
          <Search
            selectedValue={selectedValue}
            options={choices} 
            styles={searchStyles} 
            placeHolder={'Buscar por cuidad'}
            onChangeOpt={ onChangeOpt }
          />
        </Col>
      </Row>
      <Row>
        <Col lg={24} xs={24}>
          <CardInfo />
        </Col>
      </Row>
    </>
  )
}

export default Home
