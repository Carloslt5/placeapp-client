import './DetailsPlace.css'
import { Card } from 'react-bootstrap'


const DetailsPlace = ({ placeData }) => {
    console.log("placeData desde detailsPlace", placeData)

    return (


        <Card>
            <Card.Img variant="top" src={placeData.photoReference} />
            <Card.Body>
                <Card.Text>{placeData.name}</Card.Text>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
export default DetailsPlace