import './ProfileInfo.css'
import { Card, Button } from 'react-bootstrap';
import usersService from './../../services/users.services'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react';


const ProfileInfo = ({ userData: { _id, name, lastName, email, avatar, role } }) => {

    const { user, logout } = useContext(AuthContext)

    const navigate = useNavigate()

    const deleteHandler = () => {
        usersService
            .deleteUser(_id)
            .then(({ data }) => {
                logout()
                navigate(`/`)
            })
            .catch(err => console.log(err))

    }

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
                    <Button variant="danger" onClick={deleteHandler} >
                        Delete
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default ProfileInfo