import './ProfileContent.css'
import { Row, Card, Col, Nav, Tab, Button, Tabs, TabContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EachPlace from '../EachPlace/EachPlace';
import { useState } from 'react';

const ProfileContent = ({ userPlacesData }) => {

    return (
        <TabContainer defaultActiveKey="#myplaces">

            <Card>
                <Card.Header>
                    <Nav variant="pills">

                        <Nav.Item>
                            <Nav.Link href='#myplaces'>My Places</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link href='#favourites'>My favourites</Nav.Link>
                        </Nav.Item>

                    </Nav>
                </Card.Header>

                <Card.Body >

                    <Tab.Content >
                        <Tab.Pane eventKey="#myplaces">
                            <Row>
                                {
                                    !userPlacesData
                                        ?
                                        <p>Cargando...</p>
                                        :
                                        userPlacesData.map(place => {
                                            return (
                                                <Col key={place._id}>
                                                    <EachPlace {...place} />
                                                </Col>
                                            )
                                        })
                                }
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#favourites">
                            MIS FAVORITOS
                        </Tab.Pane>

                    </Tab.Content>

                </Card.Body>

            </Card >

        </TabContainer>

    )
}

export default ProfileContent