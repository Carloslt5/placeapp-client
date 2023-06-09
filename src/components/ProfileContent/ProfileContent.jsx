import { Row, Card, Nav, Tab, TabContainer } from 'react-bootstrap'
import './ProfileContent.css'
import Loader from '../../components/Loader/Loader'
import PlacesProfile from '../PlacesProfile/PlacesProfile'
import FavouritesProfile from '../FavouritesProfile/FavouritesProfile'


const ProfileContent = ({ userPlacesData, favouritePlaces }) => {

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
                                        <Loader md={{ offset: 3, span: 6 }} />
                                        :
                                        <PlacesProfile userPlacesData={userPlacesData} />
                                }

                            </Row>
                        </Tab.Pane>

                        <Tab.Pane eventKey="#favourites">

                            <Row>

                                {
                                    !favouritePlaces
                                        ?
                                        <Loader md={{ offset: 3, span: 6 }} />
                                        :
                                        <FavouritesProfile favouritePlaces={favouritePlaces} />

                                }


                            </Row>


                        </Tab.Pane>

                    </Tab.Content>

                </Card.Body>

            </Card >

        </TabContainer >

    )
}


export default ProfileContent