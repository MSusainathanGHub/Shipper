import React from 'react'
import BarChart from './Barchart'
import RadialChart from './RadialChart'
import { Card, Col, Row } from 'antd'
import { TableDashbord } from './TableDashboard'

const Dashboard = () => {
  return (
    <div className='container-fluid'>

      <BarChart />

      <Row className='mt-3' gutter={16}>
        <Col span={12}>
          <Card  title="Module Info"
     > 
        <TableDashbord/>
        </Card>
        </Col>
        <Col span={12}>
        <Card  title="Module Statistics"
    >
          
          <RadialChart />
          </Card>
          </Col></Row>
    </div>
  )
}

export default Dashboard