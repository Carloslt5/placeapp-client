
import { Col } from 'react-bootstrap'
import EachPlace from '../EachPlace/EachPlace'
import { Link } from 'react-router-dom'


const PlacesProfile = ({ userPlacesData }) => {

    return (
        <>
            {
                userPlacesData.map(place => {
                    return (
                        <Col xs={12} md={6} lg={4} key={place._id} className='mb-4' >
                            <Link to={`/places/${place._id}`}>
                                <EachPlace {...place} />
                            </Link>
                        </Col>
                    )
                })
            }
        </>
    )

}

export default PlacesProfile