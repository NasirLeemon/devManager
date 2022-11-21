import React from 'react'
import {Outlet,  NavLink} from 'react-router-dom'
import {ListGroup, Row, Col, Tab,} from 'react-bootstrap'

function DashBoard() {
  return (
    <>
    <h2 className='rext-center mb-4'>Dash Board</h2>
    
    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
      <Row>
        <Col sm={4}>
          <ListGroup>
            <ListGroup.Item action as={NavLink} to='profile'>
              Profile
            </ListGroup.Item>
            <ListGroup.Item action as={NavLink} to='contacts'>
              Contacts 
            </ListGroup.Item>
            <ListGroup.Item action as={NavLink} to='manage-password'>
              Manage Password
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={8}>
          <Tab.Content>
          <Outlet/>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>

    </>
  )
}

export default DashBoard