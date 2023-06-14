
import { useState, useEffect, useContext } from "react";
import ChatForm from '../ChatForm/ChatForm'
import chatService from './../../services/chat.services'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AuthContext } from '../../contexts/auth.context'
import { faComment, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import './Chat.css'


const Chat = () => {

    const { user } = useContext(AuthContext)

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
            {
                user && (
                    !showModal
                        ?
                        <Button className='btnMatch' id="btnChat" onClick={openChatHandler}>
                            <FontAwesomeIcon icon={faComment} />
                        </Button>
                        :
                        <>
                            <div id="modalChat" centered>
                                <ChatForm getMessages={getMessages} messages={messages} />
                            </div>
                            <Button className='btnMatch' id="btnChat" onClick={closeChatHandler}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </Button>
                        </>
                )
            }
        </>
    )
}

export default Chat