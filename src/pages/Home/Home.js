import React, { useState, useEffect } from 'react'
import { Row, Col, Typography } from 'antd';
import Search from '../../components/Search/Search'
import CardInfo from '../../components/CardInfo/CardInfo'
import CardMeta from '../../components/CardMeta/CardMeta'

//styles
import './home.scss'

//api
import { getCities, getCovData, getMetaData } from '../../api/index'

//sub
const { Title } = Typography;



const searchStyles = {
  display: 'flex',
  flex: '0, 0 90%'
}

const Home = () => {
  const [selectedValue, setselectedValue] = useState('')
  const [covMetaData, setcovMetaData] = useState([])
  const [covData, setcovData] = useState({})
  const [loading, setLoading] = useState(true)
  const [loadingMeta, setloadingMeta] = useState(true)
  const [choices, setchoices] = useState([])
  const [optionChoiced, setOptionChoiced] = useState('')

  useEffect(() => {
    const getMetadata = async() => {
      setloadingMeta(true)
      const data = await getMetaData()
      if (data) {
        console.log(data)
        setloadingMeta(false)
        setcovMetaData(data)
      }
    }
    const getDataCov = async() => {
      setLoading(true)
      const data = await getCovData()
      if (data) {
        console.log(data)
        setLoading(false)
        setcovData({...covData, ...data})

      }
    }
    const getCitiesData = async() => {
      const cities = await getCities()
      if (cities){
        setchoices(cities)
      }
    }
    getMetadata()
    getDataCov()
    getCitiesData()
  }, [])

  const onChangeOpt = async( option ) => {
    setselectedValue(option)
    setLoading(true)
    const data = await getCovData(option)
    setOptionChoiced(option)
    setLoading(false)
    setcovData({...covData, ...data})
  }

  const getHeaderMsg = () => (
    optionChoiced  ? `Datos de ${optionChoiced}` : 'Datos de Colombia'
  )

  return (
    <>
      <Row className="home" justify="center">
        <Col xs={24} lg={12}>
          <Search
            selectedValue={selectedValue}
            options={choices} 
            styles={searchStyles} 
            placeHolder={"Buscar por cuidad"}
            onChangeOpt={ onChangeOpt }
          />
        </Col>
      </Row>
      <Row>
        <Col><Title level={3}>{getHeaderMsg()}</Title></Col>
      </Row>
      <Row>
        <Col lg={24} xs={24}>
          <CardInfo covData={covData} loading={loading}/>
        </Col>
      </Row>
      <Row>
        <Col className="headerData">
          <Title level={3}>{"Conjunto de Metadatos"}</Title>
        </Col>
      </Row>
      <Row>
        <Col lg={24} xs={24}>
          <CardMeta covMetadata={covMetaData} loading={loadingMeta}/>
        </Col>
      </Row>
    </>
  )
}

export default Home
