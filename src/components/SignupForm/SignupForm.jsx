import { Button, Card, Col, Form, Row } from "react-bootstrap"
import './SignupForm.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from './../../services/auth.services'
import uploadServices from './../../services/upload.services'
import FormError from "../FormError/FormError"


const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        avatar: '',
    })

    const [loadingAvatar, setloadingAvatar] = useState(false)
    const [errors, setErrors] = useState([])

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
            .catch(err => { setErrors(err.response.data.errorMessages) })
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
                setloadingAvatar(false)
            })
    }


    return (
        <Row className="justify-content-center">
            <Col md={{ span: 6 }}>
                <Card className="p-4">


                    <Form onSubmit={handleSubmit} encType="multipart/form-data" >

                        <Form.Group className="mb-4" controlId="name">
                            <Form.Label>Name: </Form.Label>
                            <Form.Control type="text" value={name} name='name' onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="lastName">
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control type="text" value={lastName} name='lastName' onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="email">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" value={email} name='email' onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" value={password} name='password' onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="image">
                            <Form.Label>Imagen (URL)</Form.Label>
                            <Form.Control type="file" onChange={handleFileUpload} />
                        </Form.Group>

                        {errors.length > 0 && <FormError>{errors.map((elem, index) => <p key={index} className="my-0">{elem}</p>)}</FormError>}


                        <div className="d-grid ">
                            <Button variant="dark" disabled={loadingAvatar} type="submit"> {loadingAvatar ? 'LOADING IMAGE...' : 'SIGNUP'}</Button>
                        </div>

                    </Form>
                </Card>
            </Col>

        </Row>
    )
}


export default SignupForm

