import { Button, Card } from 'react-bootstrap'
import './EachUser.css'


const EachUser = ({ name, lastName, avatar, _id }) => {

    return (
        <>
            <Card>

                <Card.Img variant="top" src={avatar} />
                <Card.Body className='justify-content'>

                    <Card.Title className='card-title'><strong>{name} {lastName}</strong></Card.Title>

                    <Button href={`/profile/${_id}`}>
                        View Profile
                    </Button>

                </Card.Body>

            </Card>
        </>
    )
}


export default EachUser