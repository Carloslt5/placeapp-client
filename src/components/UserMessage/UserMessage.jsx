import { Toast } from 'react-bootstrap'
import { useContext } from 'react'
import { MessageContext } from '../../contexts/message.context'


const UserMessage = () => {

    const { toastMessage, showToast, closeMessage } = useContext(MessageContext)

    return (
        <Toast onClose={closeMessage} show={showToast} delay={3000} autohide style={{ position: 'fixed', bottom: 50, right: 10 }}>
            <Toast.Header>
                <strong className="me-auto">System message</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
    )
}


export default UserMessage