import { useState } from "react"

/**
 * Renders a chat message with the specified text and sender information.
 * @param {Object} props - The component props.
 * @param {string} props.text - The content of the message.
 * @param {boolean} props.self - Indicates whether the message is from the user themselves.
 */
function Message({text, self}: {text: string, self: boolean}) {
    const sender = self ? "Sent" : "Received"

    return (
        <div className={ sender }>
            <div className="Message">
                { text }
            </div>
        </div>
    )
}

/**
 * Renders the component containing a message conversation.
 * Handles messages being sent and received and updates the conversation.
 */
function ChatWindow() {
    const [text, setText] = useState("")
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    const [conversation, updateConversation] = useState<JSX.Element[]>([])
    const send = () => {
        if (text.length > 0) {
            updateConversation(value => [...value, <Message text={ text } self={ true } />])
        }
    }

    return (
        <div id="ChatWindow">
            <h2>Chat Window</h2>

            <div id="Conversation">
                { conversation }
            </div>

            <div id="MessageInput">
                <input type="text" placeholder="Enter your message" onChange={ handleInputChange }></input>
                <button onClick={ send }>📤</button>
            </div>
        </div>
    )
}

export default ChatWindow
