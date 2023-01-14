let subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[],
}

let ws: WebSocket | null = null

type EventNamesType = 'messages-received' | 'status-changed'

const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessages))
}

const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}

const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('REFRESH PAGE')
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers["status-changed"].forEach(s => s(status))
}

function createChannel() {
    cleanUp()
    ws?.close()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    ws?.addEventListener('close', closeHandler)
    ws?.addEventListener('message', messageHandler)
    ws?.addEventListener('open', openHandler)
    ws?.addEventListener('error', errorHandler)
}

export const chatApi = {
    start() {
        createChannel()
    },
    stop() {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        ws?.close()
        cleanUp()
    },
    subscribe(eventName: EventNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)

    },

    send(message: string) {
        ws?.send(message)
    }
}


type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

export type ChatMessageType = {
    userId: number
    userName: string
    message: string
    photo: string
}
export type StatusType = 'pending' | 'ready' | 'error'