import { useContext, useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import authService from './../../services/auth.services'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../contexts/auth.context"
import { MessageContext } from '../../contexts/message.context'
import FormError from "../FormError/FormError"
import './LoginForm.css'


const LoginForm = () => {

    const [errors, setErrors] = useState([])
    console.log('ESTOS SON LOS ERRORES', errors)

    const { emitMessage } = useContext(MessageContext)

    const { authenticateUser, storeToken } = useContext(AuthContext)

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
        <Row className="justify-content-center py-5">

            <Col md={{ span: 6 }} className="formBox">
                <Form onSubmit={handleSubmit} >


                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
                    </Form.Group>

                    {errors.length > 0 && <FormError>{errors.map((elem, index) => <p key={index} className="my-0">{elem}</p>)}</FormError>}

                    <div className="d-grid">
                        <Button variant="dark" type="submit">Acceder</Button>
                    </div>

                </Form>
            </Col>

        </Row>

    )
}

export default LoginForm