import './ProfileInfo.css'
import { Card, Button } from 'react-bootstrap';
import usersService from './../../services/users.services'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react';


const ProfileInfo = ({ _id, name, lastName, email, avatar, role }) => {

    const { user, logout } = useContext(AuthContext)

    const navigate = useNavigate()

    const deleteHandler = () => {
        usersService
            .deleteUser(_id)
            .then(() => {
                logout()
                navigate(`/`)
            })
            .catch(err => console.log(err))

    }

    return (

        <Card>
            <Card.Img variant="top" src={avatar} />
            <Card.Body>
                <Card.Title><strong>{name} {lastName}</strong></Card.Title>


                <article>
                    <Card.Text>role: {role}</Card.Text>
                    <Card.Text>email: {email}</Card.Text>
                </article>
            </Card.Body>

            <Card.Body>
                <div className="d-grid gap-2">

                    {
                        user._id === _id &&
                        <>
                            <Button variant="dark" href={`/profile/${_id}/edit`}> Edit</Button>
                            <Button variant="danger" onClick={deleteHandler} >Delete</Button>
                        </>
                    }

                </div>
            </Card.Body>
        </Card>
    )
}

export default ProfileInfo