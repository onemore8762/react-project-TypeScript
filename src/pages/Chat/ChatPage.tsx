import React, {useEffect, useState} from 'react';
import {Button} from "antd";
import TextArea from "antd/es/input/TextArea";


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
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => {
            console.log('close')
            setTimeout(createChannel, 3000)
        }

        function createChannel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()

            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws?.addEventListener('close', closeHandler)
            setWsChannel(ws)
        }

        createChannel()
        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])


    return (
        <div>
            <Messages wsChannel={wsChannel}/>
            <AddMessageForm wsChannel={wsChannel}/>
        </div>
    );
};


const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>()
    useEffect(() => {
        const setNewMessage =  (e: MessageEvent) => {
            setMessages((prevMessage) => {
                if (prevMessage) {
                    return [...prevMessage, ...JSON.parse(e.data)]
                } else {
                    return [...JSON.parse(e.data)]
                }
            })
        }
        wsChannel?.addEventListener('message', setNewMessage)
        return () => {
            wsChannel?.removeEventListener('message', setNewMessage)
        }
    }, [wsChannel])

    return (
        <div style={{height: 400, overflowY: 'auto'}}>
            {messages?.map((m, index) => <Message key={index} message={m}/>)}
        </div>
    );
};

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return (
        <div>
            <img src={message.photo}/> <b> {message.userName}</b>
            <br/>
            <div>{message.message}</div>
            <hr/>
        </div>
    );
};
const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [text, setText] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        const openHandler = () => {
            setReadyStatus('ready')
        }
        wsChannel?.addEventListener('open', openHandler)

        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])


    const onClick = () => {
        if (!text) {
            return
        }
        wsChannel?.send(text)
        setText('')
    }
    return (
        <div>
            <TextArea onChange={(e) => setText(e.currentTarget.value)} value={text}></TextArea>
            <Button onClick={onClick} disabled={readyStatus !== 'ready'}> Send message </Button>
        </div>
    );
};


export default ChatPage