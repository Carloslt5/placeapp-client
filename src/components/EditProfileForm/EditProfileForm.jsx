import { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from "react-bootstrap"
import './EditProfileForm.css'
import { useNavigate, useParams } from 'react-router-dom'
import { MessageContext } from '../../contexts/message.context'
import { AuthContext } from '../../contexts/auth.context'
import usersService from './../../services/users.services'
import uploadServices from './../../services/upload.services'
import FormError from "../FormError/FormError"


const EditProfileForm = () => {

    const { user } = useContext(AuthContext)
    const { emitMessage } = useContext(MessageContext)

    const { id } = useParams()

    const [errors, setErrors] = useState([])
    const [loadingAvatar, setloadingAvatar] = useState(false)

    const [editData, setEditData] = useState({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        avatar: '',
    })

    const navigate = useNavigate()

    useEffect(() => {
        loaderUser()
    }, [])

    const loaderUser = () => {
        usersService
            .getOneUser(id)
            .then(({ data }) => {
                setEditData(data)
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = event => {
        const { name, value } = event.target
        setEditData({ ...editData, [name]: value })
    }

    const handleSubmit = event => {
        emitMessage("Not Authorized")
        event.preventDefault()

        usersService
            .editUser(id, editData)
            .then(({ data }) => {
                navigate(`/profile/${user._id}`)
            })
            .catch(err => {
                setErrors(err.response.data.errorMessages)
                if (err.response.data.errorMessages) { navigate(`/profile/${user._id}`) }
            })
    }

    const handleFileUpload = e => {

        setloadingAvatar(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadImage(formData)
            .then(({ data }) => {
                setEditData({ ...editData, avatar: data.cloudinary_url })
                setloadingAvatar(false)
            })
            .catch(err => {
                setloadingAvatar(false)
            })
    }

    const { name, lastName, email, avatar } = editData

    return (
        <>
            <Container>

                <Form onSubmit={handleSubmit} encType="multipart/form-data">

                    {errors.length > 0 && <FormError>{errors.map((elem, index) => <p key={index} className="my-0">{elem}</p>)}</FormError>}

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name: </Form.Label>
                        <Form.Control type="text" value={name} onChange={handleInputChange} name='name' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control type="text" value={lastName} onChange={handleInputChange} name='lastName' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={email} onChange={handleInputChange} name='email' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="imageData">
                        <Form.Label>Imagen (URL)</Form.Label>
                        <Form.Control type="file" onChange={handleFileUpload} />
                    </Form.Group>

                    <div className="d-grid mt-4">
                        <Button variant="dark" disabled={loadingAvatar} type="submit"> {loadingAvatar ? 'loading image...' : ' Edit Profile'}</Button>
                    </div>

                </Form>
            </Container>
        </>
    )
}


export default EditProfileForm

