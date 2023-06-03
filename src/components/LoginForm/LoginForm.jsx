import { useContext, useState } from "react"
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import authService from './../../services/auth.services'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../contexts/auth.context"
import FormError from "../FormError/FormError";


const LoginForm = () => {

    const { user } = useContext(AuthContext)

    const { authenticateUser, storeToken } = useContext(AuthContext)

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState([])

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
                navigate(`/profile/${user._id}`)
            })
            .catch(err => console.log(err))
    }


    const { password, email } = loginData

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={{ span: 6 }} >
                    <Form onSubmit={handleSubmit}>


                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
                        </Form.Group>


                        <div className="d-grid">
                            <Button variant="dark" type="submit">Acceder</Button>
                        </div>

                    </Form>
                </Col>

            </Row>
        </Container>


    )
}

export default LoginForm