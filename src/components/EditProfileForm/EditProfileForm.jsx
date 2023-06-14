import { useContext, useEffect, useState } from 'react'
import { Button, Form, Card, Col, Row } from "react-bootstrap"
import './EditProfileForm.css'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import usersService from './../../services/users.services'
import uploadServices from './../../services/upload.services'
import FormError from "../FormError/FormError"


const EditProfileForm = () => {

    const { user } = useContext(AuthContext)

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
        <Row className="justify-content-center">
            <Col md={{ span: 10 }}>
                <Card className="p-4">

                    <Form onSubmit={handleSubmit} encType="multipart/form-data">

                        {errors.length > 0 && <FormError>{errors.map((elem, index) => <p key={index} className="my-0">{elem}</p>)}</FormError>}

                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label> <strong>Name: </strong></Form.Label>
                            <Form.Control type="text" value={name} onChange={handleInputChange} name='name' />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label><strong> Last Name:</strong></Form.Label>
                            <Form.Control type="text" value={lastName} onChange={handleInputChange} name='lastName' />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label> <strong>Email:</strong></Form.Label>
                            <Form.Control type="email" value={email} onChange={handleInputChange} name='email' />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="imageData">
                            <Form.Label> <strong>Image (URL)</strong></Form.Label>
                            <Form.Control type="file" onChange={handleFileUpload} />
                        </Form.Group>

                        <div className="d-grid mt-4">
                            <Button variant="dark" disabled={loadingAvatar} type="submit"> {loadingAvatar ? 'loading image...' : ' Edit Profile'}</Button>
                        </div>

                    </Form>
                </Card>
            </Col>
        </Row>
    )
}


export default EditProfileForm

