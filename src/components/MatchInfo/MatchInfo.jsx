import { Row, Col, Container } from "react-bootstrap"
import './MatchInfo.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFaceSadCry } from '@fortawesome/free-solid-svg-icons'
import EachPlace from '../EachPlace/EachPlace'
import Loader from '../Loader/Loader'


const MatchInfo = ({ commonPlaces }) => {

    return (
        <Row>
            {
                !commonPlaces.length
                    ?
                    <Container className="d-flex flex-column justify-content-center align-items-center gap-3 py-3">
                        <h1> OOOOH!</h1>
                        <h3> You don't share favorite places with this person</h3>
                        <FontAwesomeIcon className="icon-cry mt-4" icon={faFaceSadCry} />

                    </Container>
                    :
                    !commonPlaces
                        ?
                        <Loader md={{ offset: 3, span: 6 }} />
                        :
                        commonPlaces.map(place => {
                            return (
                                <Col sm={12} md={6} key={place._id} className='mb-3'>
                                    <EachPlace {...place} />
                                </Col>
                            )
                        })
            }
        </Row>
    )
}


export default MatchInfo