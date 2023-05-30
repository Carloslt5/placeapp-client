import { useState } from 'react'
import './SignupForm.css'
import { Button, Form } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import authService from './../../services/auth.services'
import uploadServices from './../../services/upload.services'

const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        avatar: '',
    })

    const [loadingAvatar, setloadingAvatar] = useState(false)

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleSubmit = e => {

        e.preventDefault()

        authService
            .signup(signupData)
            .then(({ data }) => navigate('/login'))
            .catch(err => console.log(err))
    }


    const { name, lastName, password, email } = signupData


    const handleFileUpload = e => {

        setloadingAvatar(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadImage(formData)
            .then(({ data }) => {
                setSignupData({ ...signupData, avatar: data.cloudinary_url })
                setloadingAvatar(false)
            })
            .catch(err => {
                console.log(err)
                setloadingAvatar(false)
            })
    }


    return (
        <>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name: </Form.Label>
                    <Form.Control type="text" value={name} name='name' onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control type="text" value={lastName} name='lastName' onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" value={email} name='email' onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" value={password} name='password' onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Imagen (URL)</Form.Label>
                    <Form.Control type="file" onChange={handleFileUpload} />
                </Form.Group>

                <div className="d-grid mt-4">
                    <Button variant="dark" disabled={loadingAvatar} type="submit"> {loadingAvatar ? 'loading image...' : 'Signup'}</Button>
                </div>

            </Form>
        </>
    )
}

export default SignupForm

