import './EachPlace.css'
import { Button, Card } from "react-bootstrap"



const EachPlace = ({ photoReference, name, userRating, _id, owner }) => {

    return (
        <>
            <Card>

                <Card.Img variant="top" src={photoReference} />

                <Card.Body className='justify-content'>

                    <article>
                        <Card.Title className='card-title'><p><strong>{name}</strong></p></Card.Title>
                        <hr />
                    </article>

                    <div>
                        <Card.Text><p><strong>Rating: </strong>{userRating}</p></Card.Text>
                        <Button variant="dark" href={`/places/${_id}`}>
                            View Details
                        </Button>
                    </div>

                </Card.Body>

            </Card >
        </>
    )
}

export default EachPlace