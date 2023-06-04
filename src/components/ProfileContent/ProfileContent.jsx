import './ProfileContent.css'
import { Row, Card, Col, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import EachPlace from '../EachPlace/EachPlace'
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'


const ProfileContent = ({ userPlacesData }) => {

    const { user } = useContext(AuthContext)


    return (

        <Card>
            <Card.Header>
                <Nav variant="pills" defaultActiveKey="#first">

                    <Nav.Item>
                        <Nav.Link href="#first">
                            <Link to={`/profile/${user._id}/myplaces`}>My places</Link>
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link href="#link">
                            <Link to={`/profile/${user._id}/myplaces`}>My favourites</Link>

                        </Nav.Link>
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
                                    <Col key={place._id}>
                                        <EachPlace {...place} />
                                    </Col>
                                )
                            })
                    }
                </Row>

            </Card.Body>

        </Card>

    )
}

export default ProfileContent