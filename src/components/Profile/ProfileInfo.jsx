import './ProfileInfo.css'
import { Col, Card, Button } from 'react-bootstrap';
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'




const ProfileInfo = ({ userData: { name, lastName, email, avatar, role } }) => {

    return (

        <Card>
            <Card.Img variant="top" src={avatar} />
            <Card.Body>
                <Card.Title>{name} {lastName}</Card.Title>
                <Card.Text>
                    <p>email: {email}</p>
                    <p>role: {role}</p>
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export default ProfileInfo