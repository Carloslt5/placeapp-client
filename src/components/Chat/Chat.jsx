
import { useState, useEffect } from "react";
import ChatForm from '../ChatForm/ChatForm'
import chatService from './../../services/chat.services'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import './Chat.css'


const Chat = () => {

    const [messages, setMessages] = useState([])
    const [showModal, setShowModal] = useState(false)


    const getMessages = () => {

        chatService
            .getAllMessages()
            .then(({ data }) => {
                setMessages(data.reverse())
            })
            .catch(err => console.log(err))

    }

    const openChatHandler = () => {
        setShowModal(true)
    }

    const closeChatHandler = () => {
        setShowModal(false)
    }

    return (

        <>

            {/* 
            <Modal show={showModal} onHide={() => setShowModal(false)} size="md" centered>
                <Modal.Header closeButton>
                    <Modal.Title className="px-3">Chat</Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-4">
                    <ChatForm getMessages={getMessages} messages={messages} />
                </Modal.Body>
            </Modal> */}
            <div id="modalChat" centered>
                {showModal &&
                    <ChatForm getMessages={getMessages} messages={messages} />
                }
            </div>
            {!showModal
                ?
                <Button className='btnMatch' id="btnChat" onClick={openChatHandler}>
                    <FontAwesomeIcon icon={faComment} />
                </Button>
                :
                <Button className='btnMatch' id="btnChat" onClick={closeChatHandler}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                </Button>

            }


        </>


    )
}

export default Chat