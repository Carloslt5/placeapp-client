
import { Col } from 'react-bootstrap'
import EachPlace from '../EachPlace/EachPlace'


const FavouritesProfile = ({ favouritePlaces }) => {

    return (
        <>
            {
                favouritePlaces?.map(place => {
                    return (
                        <Col key={place._id}>
                            <EachPlace {...place} />
                        </Col>
                    )
                })
            }
        </>
    )
}


export default FavouritesProfile