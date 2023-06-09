import { Button, Card } from "react-bootstrap"
import { Link } from 'react-router-dom'
import './EachPlace.css'


const EachPlace = ({ addressComponents, description, photoReference, name, userRating, _id, owner }) => {

    return (
        <Card>

            <Card.Img variant="top" src={photoReference} />

            <Card.Body className='justify-content'>

                <article>
                    <Card.Title><strong>{name}</strong></Card.Title>
                    <hr />
                </article>

                <div>
                    {description === 'data not available' ? '' : <Card.Text className="mb-3">{description}</Card.Text>}
                    <Card.Text> <strong>City:</strong> {addressComponents.city} </Card.Text>
                    <Card.Text><strong>Rating: </strong>{userRating}</Card.Text>

                    <div className="d-grid">
                        <Button className='mt-3 ' >
                            <Link to={`/places/${_id}`}>
                                View Details
                            </Link>
                        </Button>
                    </div>
                </div>


            </Card.Body>

        </Card >
    )
}


export default EachPlace