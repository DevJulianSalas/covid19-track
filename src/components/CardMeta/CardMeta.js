import React from 'react'
import { Row, Col, Divider, Card } from 'antd';

import './cardMeta.scss'


const CardMeta = ({covMetadata, loading, ...rest}) => {
  return (
    <div className="cardMeta ant-card ant-card-bordered">
      {covMetadata.length > 0 
        ?
        <Row>
          <Col className="cardTitle ant-card-meta-title" lg={6} xs={24}>
            <h3>Actualización</h3>
            <h2 className="cardDescription">15 de mayo del 2020</h2>
            <p className="ant-card-meta-title">Fecha de creación</p>
            <p className="ant-card-meta-description">27 de marzo de 2020</p>
          </Col>
          <Col lg={1}>
            <Divider className="dividerCard" type="vertical" />
          </Col>
          <Col className="cardTitle ant-card-meta-title" lg={16} xs={24}>
            <h3>Información entidad emisora</h3>
            <Row>
              <Col lg={12}>
                <span className="ant-card-meta-title">Nombre de la entidad</span>
              </Col>
              <Col lg={6}>
                <span className="ant-card-meta-description">{ covMetadata[0].attribution }</span>
              </Col>
              <Col lg={12}>
                <span className="ant-card-meta-title">Etiqueta datos</span>
              </Col>
              <Col lg={6}>
                <span className="ant-card-meta-description">{covMetadata[0].name}</span>
              </Col>
              <Col lg={12}>
                <span className="ant-card-meta-title">Sector</span>
              </Col>
              <Col lg={6}>
                <span className="ant-card-meta-description">
                  {covMetadata.length > 0 ? covMetadata[0].customFields['Información de la Entidad'].Sector: ''}
                </span>
              </Col>
              <Col lg={12}>
                <span className="ant-card-meta-title">Categorías</span>
              </Col>
              <Col lg={6}>
                <span className="ant-card-meta-description">{covMetadata[0].tags.join(', ')}</span>
              </Col>
              <Col lg={12}>
                <span className="ant-card-meta-title">Fuente de Datos</span>
              </Col>
              <Col lg={6}>
                <a 
                  href={covMetadata[0].webUri}  
                  target="_blank" 
                  rel='noreferrer noopener'
                  className="cardUrlData ant-card-meta-description">Ingresa al sitio oficial de los datos
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
        : <Row> <Card loading={loading}></Card> </Row> }
    </div>
  )
}

export default CardMeta
