import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd';
import Search from '../../components/Search/Search'
import CardInfo from '../../components/CardInfo/CardInfo'

import { getCities, getCovData } from '../../api/index'

//styles
import './home.scss'

const searchStyles = {
  display: 'flex',
  flex: '0, 0 90%'
}

const Home = () => {
  const [selectedValue, setselectedValue] = useState('')
  const [covData, setcovData] = useState({})
  const [loading, setLoading] = useState(false)
  const [choices, setchoices] = useState([])

  useEffect(() => {
    const getCitiesData = async() => {
      const cities = await getCities()
      if (cities){
        setchoices(cities)
      }
    }
    getCitiesData()
  }, [])

  // getGeneralData()

  const onChangeOpt = async( option ) => {
    setselectedValue(option)
    setLoading(true)
    const data = await getCovData(option)
    setLoading(false)
    setcovData({...covData, ...data})
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
          <CardInfo covData={covData} loading={loading}/>
        </Col>
      </Row>
    </>
  )
}

export default Home
