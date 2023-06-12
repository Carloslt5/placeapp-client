
import { useState, useEffect } from "react";
import ChatForm from '../ChatForm/ChatForm'
import chatService from './../../services/chat.services'


const Chat = () => {

    const [messages, setMessages] = useState([])

    const getMessages = () => {

        chatService
            .getAllMessages()
            .then(({ data }) => {
                setMessages(data.reverse())
            })
            .catch(err => console.log(err))

    }

    return (
        <>
            <h1>ESO ES EL CHAT BOX</h1>
            <ChatForm getMessages={getMessages} messages={messages} />
        </>
    )
}

export default Chat