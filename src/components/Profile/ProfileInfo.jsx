import './ProfileInfo.css'
import { Card, Button } from 'react-bootstrap';





const ProfileInfo = ({ userData: { _id, name, lastName, email, avatar, role } }) => {


    return (

        <Card>
            <Card.Img variant="top" src={avatar} />
            <Card.Body>
                <Card.Title>{name} {lastName}</Card.Title>
                <Card.Text>

                    <p>email: {email}</p>
                    <p>role: {role}</p>

                </Card.Text>
            </Card.Body>

            <Card.Body>
                <div className="d-grid gap-2">
                    <Button variant="dark" href={`/profile/${_id}/edit`}>
                        Edit
                    </Button>
                    <Button variant="danger">
                        Delete
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default ProfileInfo