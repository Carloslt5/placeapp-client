import './EachPlace.css'
import { Button, Card } from "react-bootstrap"

const EachPlace = ({ place }) => {

    return (
        <>
            <Card>

                <Card.Img variant="top" src={place.photoReference} />

                <Card.Body className='justify-content'>
                    <article>
                        <Card.Title className='card-title'><p><strong>{place.name}</strong></p></Card.Title>
                        <hr />
                    </article>

                    <Card.Text>

                        <article>
                            <p><strong>Rating: </strong>{place.userRating}</p>
                        </article>

                    </Card.Text>
                    <Button variant="dark" href={`/places/${place.placeId}`}>
                        View Details
                    </Button>
                </Card.Body>

            </Card>
        </>
    )
}

export default EachPlace