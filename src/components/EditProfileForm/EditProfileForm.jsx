import { useContext, useState } from 'react'
import './EditProfileForm.css'
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate, useParams } from 'react-router-dom'
import usersService from './../../services/users.services'
import uploadServices from './../../services/upload.services'
import FormError from "../FormError/FormError";
import { AuthContext } from '../../contexts/auth.context'


const EditProfileForm = () => {

    const { user } = useContext(AuthContext)
    const { id } = useParams()

    const [editData, setEditData] = useState({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        avatar: '',
    })



    const handleInputChange = event => {
        const { name, value } = event.target
        setEditData({ ...editData, [name]: value })
    }

    const [loadingAvatar, setloadingAvatar] = useState(false)

    const handleSubmit = event => {
        event.preventDefault()

        usersService
            .editUser(id, editData)
            .then(({ data }) => {
                console.log('data en el front AQUI TU PUTA MADRE CON TODO JUNTO UNO ENCIMA DE OTRO', data)
                // closeModal()
                // updateList()
            })
            .catch(err => console.log(err))
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
                console.log(err)
                setloadingAvatar(false)
            })
    }



    return (
        <>
            <Container>

                <Form onSubmit={handleSubmit} encType="multipart/form-data">

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name: </Form.Label>
                        <Form.Control type="text" value={editData.name} onChange={handleInputChange} name='name' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control type="text" value={editData.lastName} onChange={handleInputChange} name='lastName' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={editData.email} onChange={handleInputChange} name='email' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="image">
                        <Form.Label>Imagen (URL)</Form.Label>
                        <Form.Control type="file" onChange={handleFileUpload} />
                    </Form.Group>

                    <div className="d-grid mt-4">
                        <Button variant="dark" type="submit"> Edit Profile</Button>
                    </div>

                </Form>
            </Container>

        </>
    )
}

export default EditProfileForm

