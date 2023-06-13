import { Container } from 'react-bootstrap'
import './LoginPage.css'
import LoginForm from '../../components/LoginForm/LoginForm'


const LoginPage = () => {

    return (
        <Container style={{ height: '80vh' }} >
            <LoginForm />
        </Container>
    )
}


export default LoginPage