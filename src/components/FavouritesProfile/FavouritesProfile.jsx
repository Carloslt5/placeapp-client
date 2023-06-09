
import { Col } from 'react-bootstrap'
import EachPlace from '../EachPlace/EachPlace'


const FavouritesProfile = ({ favouritePlaces }) => {

    return (
        <>
            {
                favouritePlaces?.map(place => {
                    return (
                        <Col xs={12} md={6} lg={4} key={place._id} className='mb-4'>
                            <EachPlace {...place} />
                        </Col>
                    )
                })
            }
        </>
    )
}


export default FavouritesProfile