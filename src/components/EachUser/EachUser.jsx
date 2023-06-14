import { Button, Card } from 'react-bootstrap'
import './EachUser.css'
import { Link } from 'react-router-dom'


const EachUser = ({ name, lastName, avatar, _id }) => {

    return (
        <>
            <Card>

                <Card.Img variant="top" src={avatar} />
                <Card.Body className='justify-content'>

                    <Card.Title className='card-title'><strong>{name} {lastName}</strong></Card.Title>

                    <div className="d-grid">
                        <Button className='mt-3 btnBlue' >
                            <Link to={`/profile/${_id}`}>
                                View Profile
                            </Link>
                        </Button>
                    </div>
                </Card.Body>

            </Card>
        </>
    )
}


export default EachUser