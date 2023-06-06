import './ProfileInfo.css'
import { Card, Button } from 'react-bootstrap';
import matchServices from './../../services/match.services'
import usersService from './../../services/users.services'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react';


const ProfileInfo = ({ _id, name, lastName, email, avatar, role }) => {

    const { user, logout } = useContext(AuthContext)

    const navigate = useNavigate()
    const { id } = useParams()

    const deleteHandler = () => {
        usersService
            .deleteUser(_id)
            .then(() => {
                logout()
                navigate(`/`)
            })
            .catch(err => console.log(err))

    }

    const matchHandler = () => {
        matchServices
            .getMatchPlaces(id)
            .then(({ data }) => console.log('ESTO LO RECIBO EN EL FRONT  SON LOS COMMON', data))
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

            <div className="d-grid gap-2">

                {

                    (user._id === _id || user.role === "ADMIN") &&
                    <>
                        <Button variant="dark" href={`/profile/${_id}/edit`}> Edit</Button>
                        <Button variant="danger" onClick={deleteHandler} >Delete</Button>
                    </>

                }

                <Button variant="success" onClick={matchHandler} >Match 💦</Button>

            </div>
        </Card>
    )
}

export default ProfileInfo

