import './SignupForm.css'
import { Button, Form } from "react-bootstrap"

const SignupForm = () => {

    return (
        <>
            <Form>

                <Form.Group className="mb-3" controlId="text">
                    <Form.Label>Name: </Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>

                <Form.Group controlId="formFile">
                    <Form.Label>Default file input example</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>

                <div className="d-grid mt-4">
                    <Button variant="dark" type="submit">Signup</Button>
                </div>

            </Form>
        </>
    )
}

export default SignupForm

