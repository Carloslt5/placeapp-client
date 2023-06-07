import { Card, Button, Modal } from 'react-bootstrap'
import './ProfileInfo.css'
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import matchServices from './../../services/match.services'
import usersService from './../../services/users.services'
import MatchInfo from '../../components/MatchInfo/MatchInfo'


const ProfileInfo = ({ _id, name, lastName, email, avatar, role }) => {

    const { user, logout } = useContext(AuthContext)

    const { id } = useParams()

    const [showModal, setShowModal] = useState(false)
    const [commonPlaces, setcommonPlaces] = useState([])

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

    const matchHandler = () => {
        matchServices
            .getMatchPlaces(id)
            .then(({ data }) => {
                setShowModal(true)
                setcommonPlaces(data)
            })
            .catch(err => console.log(err))

    }


    return (
        <>
            <Card>
                <Card.Img variant="top" src={avatar} />
                <Card.Body className='p-4'>
                    <Card.Title><strong>{name} {lastName}</strong></Card.Title>
                    <hr />
                    <article>
                        <Card.Text><strong>Role: </strong> {role}</Card.Text>
                        <Card.Text><strong>Email: </strong> {email}</Card.Text>
                    </article>
                </Card.Body>

                <div className="d-flex gap-2 p-4 justify-content-end">

                    {
                        user._id !== _id && <Button variant="success" onClick={matchHandler}> Match 💦</Button>
                    }

                    {
                        (user._id === _id || user.role === "ADMIN") &&
                        <>
                            <Button variant="dark" href={`/profile/${_id}/edit`}> Edit</Button>
                            <Button variant="danger" onClick={deleteHandler} >Delete</Button>
                        </>

                    }

                </div>
            </Card>


            <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Match Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MatchInfo commonPlaces={commonPlaces} />
                </Modal.Body>
            </Modal>
        </>
    )
}


export default ProfileInfo

