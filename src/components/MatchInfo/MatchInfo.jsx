import { Row, Col } from "react-bootstrap"
import './MatchInfo.css'
import EachPlace from '../EachPlace/EachPlace'
import Loader from '../Loader/Loader'


const MatchInfo = ({ commonPlaces }) => {

    return (
        <Row>
            {
                !commonPlaces.length
                    ?
                    <h1>NO HAY MATCH 😩</h1>
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