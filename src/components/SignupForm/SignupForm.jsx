import { useState } from 'react'
import './SignupForm.css'
import { Button, Form } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import authService from './../../services/auth.services'

const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        // avatar: '',
    })

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        authService
            .signup(signupData)
            .then(({ data }) => navigate('/'))
            .catch(err => console.log(err))
    }


    const { name, lastName, password, email } = signupData


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
                {/* 
                <Form.Group controlId="avatar">
                    <Form.Label>Default file input example</Form.Label>
                    <Form.Control type="file" value={avatar} name='avatar' onChange={handleInputChange} />
                </Form.Group> */}

                <div className="d-grid mt-4">
                    <Button variant="dark" type="submit">Signup</Button>
                </div>

            </Form>
        </>
    )
}

export default SignupForm

