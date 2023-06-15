import { Container } from 'react-bootstrap'
import './SignupPage.css'
import SignupForm from '../../components/SignupForm/SignupForm'


const SignupPage = () => {
    return (

        <Container style={{ height: '100vh' }} >
            <SignupForm />
        </Container>

    )
}

export default SignupPage