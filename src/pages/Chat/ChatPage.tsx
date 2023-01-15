import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Button} from "antd";
import TextArea from "antd/es/input/TextArea";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {UserOutlined} from "@ant-design/icons";
import s from './ChatPage.module.css'
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";

type ChatMessageType = {
    userId: number
    userName: string
    message: string
    photo: string
}


const ChatPage = () => {
    return (
        <div className={s.container}>
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
    }, [dispatch])


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
            messageAnchorRef.current?.scrollIntoView({block: 'end',behavior: 'smooth'})
        }
    }, [messages, isAutoScroll])
    return (
        <div style={{height: 400, overflowY: 'auto'}} onScroll={scrollHandler}>
            {messages?.map((m, index) => <Message key={index} message={m}/>)}
            <div ref={messageAnchorRef}></div>
        </div>
    );
};

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({message}) => {
    return (
        <>
            <hr/>
            <div style={{display: 'flex', margin: '15px 5px'}}>
                <div style={{ minWidth: 100}}>
                    <Avatar size={60} src={message.photo} icon={<UserOutlined/>}/>
                    <div> {message.userName}</div>
                </div>
                <div style={{ width: '210px'}}>{ message.message}</div>
            </div>
        </>
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
            <TextArea style={{width: 200, height: 25, resize: 'none'}} onChange={(e) => setText(e.currentTarget.value)} value={message}></TextArea>
            <Button onClick={onClick} disabled={status !== 'ready'}> Send message </Button>
        </div>
    );
};


export default ChatPage