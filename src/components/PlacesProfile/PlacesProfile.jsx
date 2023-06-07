
import { Col } from 'react-bootstrap'
import EachPlace from '../EachPlace/EachPlace'


const PlacesProfile = ({ userPlacesData }) => {

    return (
        <>
            {
                userPlacesData.map(place => {
                    return (
                        <Col xs={12} md={6} lg={4} key={place._id} className='mb-3' >
                            <EachPlace {...place} />
                        </Col>
                    )
                })
            }
        </>
    )

}

export default PlacesProfile