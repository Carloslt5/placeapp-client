import { useState, useEffect, useContext } from 'react'
import { ListGroup, InputGroup, Form, Button, Card, Container } from 'react-bootstrap'
import { io } from 'socket.io-client'
import chatService from './../../services/chat.services'

const socket = io(process.env.REACT_APP_URL)


const ChatForm = ({ getMessages, messages }) => {


    const [isConnected, setIsConnected] = useState(false)
    const [newMessage, setNewMessage] = useState('')
    // const [allMessages, setAllMessages] = useState([])

    useEffect(() => {
        getMessages()

        socket.on('connect', () => setIsConnected(true))
        socket.on('chat_message', (data) => {
            getMessages()
        })

        return () => {
            socket.off('connect')
            socket.off('chat_message')
        }

    }, [])

    const handleInputChange = event => {
        setNewMessage(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()

        chatService
            .createMessage(newMessage)
            .then(({ data }) => {
                socket.emit('chat_message', data)
            })
            .catch(err => console.log(err))

        setNewMessage('')

    }

    return (
        <>
            <h1>Esto es el formulario del chat</h1>
            <h2>{isConnected ? 'CONNECT' : 'DISCONNECT'}</h2>

            <Container>

                <Card>
                    <ListGroup>

                        {
                            messages
                                ?
                                messages?.map((message, index) => {
                                    // console.log('esto deberia ser el mensaje', message)

                                    return (
                                        <ListGroup.Item key={index}> {message.message}</ListGroup.Item >
                                    )
                                })
                                :
                                <p>No hay mensajes</p>
                        }

                    </ListGroup>

                    <InputGroup>

                        <Form.Control
                            placeholder="Recipient's username"
                            aria-label="Recipient's username with two button addons"
                            onChange={handleInputChange}
                            name="userChatMessage"
                            value={newMessage}
                        />
                        <Button variant="outline-secondary" type="submit" onClick={handleSubmit}>Send</Button>

                    </InputGroup>

                </Card>


            </Container>

        </>
    )
}

export default ChatForm