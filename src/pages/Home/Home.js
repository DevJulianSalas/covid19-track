import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd';
import Search from '../../components/Search/Search'
import CardInfo from '../../components/CardInfo/CardInfo'

//firebase
import { getGeneralData, getCities, getDataByCity } from '../../api/index'

//styles
import './home.scss'

const searchStyles = {
  display: 'flex',
  flex: '0, 0 90%'
}

const Home = () => {
  const [selectedValue, setselectedValue] = useState('')
  const [covidData, setcovidData] = useState({})
  const [loading, setLoading] = useState(false)
  const [choices, setchoices] = useState([
    {
      city: 'Bogotá D.C.',
      cod: '11001'
    },
    {
      city: 'Arenal',
      cod: '13042'
    }
  ])

  // useEffect(() => {
  //   const getCities = async() => {
  //     setLoading(true)
  //     setTimeout(() => {
  //       console.log('dd')
  //       setLoading(false)
  //     }, 3000);
  //   }
  //   getCities()
  // }, [])

  // getGeneralData()

  const onChangeOpt = async( option ) => {
    console.log('s')
    // setselectedValue(option)
    // setLoading(true)
    // const data = await getDataByCity(option)
    // setLoading(false)
    // setcovidData({...covidData, ...data})
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
          <CardInfo covidData={covidData} loading={loading}/>
        </Col>
      </Row>
    </>
  )
}

export default Home
