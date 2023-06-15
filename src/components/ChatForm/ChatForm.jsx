import { useState, useEffect, useContext } from 'react'
import { ListGroup, InputGroup, Form, Button, Card, Container } from 'react-bootstrap'
import './ChatForm.css'
import { io } from 'socket.io-client'
import chatService from './../../services/chat.services'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const socket = io(process.env.REACT_APP_URL)


const ChatForm = ({ getMessages, messages }) => {


    const [isConnected, setIsConnected] = useState(false)
    const [newMessage, setNewMessage] = useState('')

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
                getMessages()
            })
            .catch(err => console.log(err))

        setNewMessage('')

    }

    return (
        <>
            <Container className='p-2'>

                <ListGroup className='scroll-chat '>

                    {
                        messages
                            ?
                            messages?.map((message, index) => {
                                return (
                                    <ListGroup.Item key={index} className='d-flex justify-content-between items-chat'>
                                        <article className='d-flex gap-2 align-items-start'>
                                            <div className='d-flex align-items-center gap-2'>
                                                <img src={message.owner.avatar} alt="" className='rounded-circle' style={{ width: '20px', height: '20px' }} />
                                                <strong>{message.owner.name}:</strong>
                                            </div>
                                            {message.message}
                                        </article>
                                        <article>{message.createdAt.substring(11, 16)}</article>
                                    </ListGroup.Item >
                                )
                            })
                            :
                            <p>No hay mensajes</p>
                    }

                </ListGroup>

                <Form onSubmit={handleSubmit} >
                    <InputGroup>
                        <Form.Control
                            placeholder="Recipient's username"
                            aria-label="Recipient's username with two button addons"
                            onChange={handleInputChange}
                            name="userChatMessage"
                            value={newMessage}
                        />
                        <Button type="submit">
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </Button>
                    </InputGroup>
                </Form>
            </Container>

        </>
    )
}

export default ChatForm