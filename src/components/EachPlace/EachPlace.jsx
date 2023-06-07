import { Button, Card } from "react-bootstrap"
import './EachPlace.css'


const EachPlace = ({ photoReference, name, userRating, _id, owner }) => {

    return (
        <Card>

            <Card.Img variant="top" src={photoReference} />

            <Card.Body className='justify-content'>

                <article>
                    <Card.Title className='card-title'><strong>{name}</strong></Card.Title>
                    <hr />
                </article>

                <div>
                    <Card.Text><strong>Rating: </strong>{userRating}</Card.Text>
                    <Button variant="dark" href={`/places/${_id}`} className='mt-3'>
                        View Details
                    </Button>
                </div>

            </Card.Body>

        </Card >
    )
}


export default EachPlace