import { Form, Button, Row, Col, Card } from "react-bootstrap"
import './LoginForm.css'
import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../contexts/auth.context"
import { MessageContext } from '../../contexts/message.context'
import authService from './../../services/auth.services'
import FormError from "../FormError/FormError"


const LoginForm = () => {

    const { emitMessage } = useContext(MessageContext)
    const { authenticateUser, storeToken } = useContext(AuthContext)

    const [errors, setErrors] = useState([])

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        authService
            .login(loginData)
            .then(({ data }) => {
                storeToken(data.authToken)
                authenticateUser()
                emitMessage("Welcome to PlaceApp!")
                navigate(`/places`)
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }


    const { password, email } = loginData

    return (
        <Row className="justify-content-center">
            <Col md={{ span: 6 }}>

                <Card className="p-4">
                    <Form onSubmit={handleSubmit} >


                        <Form.Group className="mb-4" controlId="email">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
                        </Form.Group>

                        {errors.length > 0 && <FormError>{errors.map((elem, index) => <p key={index} className="my-0">{elem}</p>)}</FormError>}

                        <div className="d-grid mt-4">
                            <Button variant="dark" type="submit">LOGIN</Button>
                        </div>

                    </Form>


                </Card>
            </Col>
        </Row >
    )
}


export default LoginForm