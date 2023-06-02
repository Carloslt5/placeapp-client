import './ProfileContent.css'
import { Row, Card, Col, Nav, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EachPlace from '../EachPlace/EachPlace';

const ProfileContent = ({ userPlacesData }) => {

    return (

        <Card>
            <Card.Header>
                <Nav variant="pills" defaultActiveKey="#first">

                    <Nav.Item>
                        <Nav.Link href="#first">
                            <Link to="/profile/:id/myplaces">My places</Link>
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link href="#link">My favourites</Nav.Link>
                    </Nav.Item>

                </Nav>
            </Card.Header>

            <Card.Body>
                <Row>
                    {

                        !userPlacesData
                            ?
                            <p>Cargando...</p>
                            :
                            userPlacesData.map(place => {
                                return (

                                    <>
                                        <Col>
                                            <EachPlace place={place} />
                                        </Col>
                                    </>
                                )
                            })
                    }
                </Row>

            </Card.Body>

        </Card>

    )
}

export default ProfileContent