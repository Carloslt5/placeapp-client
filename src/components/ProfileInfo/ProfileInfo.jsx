import { Card, Button, Modal } from 'react-bootstrap'
import './ProfileInfo.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
                <Card.Body className='p-3'>
                    <Card.Title><strong>{name} {lastName}</strong></Card.Title>
                    <hr />
                    <article>
                        <Card.Text><strong>Role: </strong> {role}</Card.Text>
                        <Card.Text><strong>Email: </strong> {email}</Card.Text>
                    </article>
                </Card.Body>

                <div className="d-flex gap-1 p-3 justify-content-end">

                    {
                        user._id !== _id && <Button className='btnMatch' onClick={matchHandler}> Connect </Button>
                    }

                    {
                        (user._id === _id || user.role === "ADMIN") &&
                        <>
                            <Button>
                                <Link to={`/profile/${_id}/edit`}>
                                    <FontAwesomeIcon icon={faPenToSquare} className='me-2' />
                                    Edit
                                </Link>
                            </Button>
                            <Button>
                                <Link to={`/profile/${_id}/edit`} onClick={deleteHandler}>
                                    <FontAwesomeIcon icon={faTrash} className='me-2' />
                                    Delete
                                </Link>
                            </Button>
                        </>

                    }

                </div>
            </Card>


            <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Connect Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MatchInfo commonPlaces={commonPlaces} />
                </Modal.Body>
            </Modal>
        </>
    )
}


export default ProfileInfo

