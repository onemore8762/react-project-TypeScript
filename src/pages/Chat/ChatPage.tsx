import React, {useEffect, useRef, useState} from 'react';
import {Button} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";


type ChatMessageType = {
    userId: number
    userName: string
    message: string
    photo: string
}


const ChatPage = () => {
    return (
        <div>
            <Chat/>
        </div>
    );
};


const Chat = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])


    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    );
};


const Messages: React.FC = () => {

    const messages = useAppSelector(state => state.chat.messages)
    const messageAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll ,setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget
        if(element.scrollHeight - element.scrollTop === element.clientHeight){
            !isAutoScroll && setIsAutoScroll(true)
        }else{
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if(isAutoScroll){
            messageAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])
    return (
        <div style={{height: 400, overflowY: 'auto'}} onScroll={scrollHandler}>
            {messages?.map((m, index) => <Message key={index} message={m}/>)}
            <div ref={messageAnchorRef}></div>
        </div>
    );
};

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({message}) => {
    console.log('message')
    return (
        <div>
            <img src={message.photo}/> <b> {message.userName}</b>
            <br/>
            <div>{message.message}</div>
            <hr/>

        </div>
    );
})
const AddMessageForm: React.FC = () => {
    const [message, setText] = useState('')
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.chat.status)


    const onClick = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setText('')
    }
    return (
        <div>
            <TextArea onChange={(e) => setText(e.currentTarget.value)} value={message}></TextArea>
            <Button onClick={onClick} disabled={status !== 'ready'}> Send message </Button>
        </div>
    );
};


export default ChatPage