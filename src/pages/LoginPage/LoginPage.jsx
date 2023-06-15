import { Container } from 'react-bootstrap'
import './LoginPage.css'
import LoginForm from '../../components/LoginForm/LoginForm'


const LoginPage = () => {

    return (
        <Container style={{ height: '100vh' }} >
            <LoginForm />
        </Container>
    )
}


export default LoginPage