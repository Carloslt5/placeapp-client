import { Button, Card } from "react-bootstrap"
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

                </div>
                <div className="d-flex gap-2 justify-content-end">
                    <Button href={`/places/${_id}`} className='mt-3' >
                        View Details
                    </Button>
                </div>


            </Card.Body>

        </Card >
    )
}


export default EachPlace