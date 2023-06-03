import './EachPlace.css'
import { Button, Card } from "react-bootstrap"



const EachPlace = ({ photoReference, name, userRating, _id }) => {

    return (
        <>
            <Card>

                <Card.Img variant="top" src={photoReference} />

                <Card.Body className='justify-content'>
                    <article>
                        <Card.Title className='card-title'><p><strong>{name}</strong></p></Card.Title>
                        <hr />
                    </article>

                    <Card.Text>

                        <article>
                            <p><strong>Rating: </strong>{userRating}</p>
                        </article>

                    </Card.Text>
                    <Button variant="dark" href={`/places/${_id}`}>
                        View Details
                    </Button>

                </Card.Body>

            </Card>
        </>
    )
}

export default EachPlace