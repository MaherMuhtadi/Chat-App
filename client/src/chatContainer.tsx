import { useState } from "react"
import Message from "./message"

/**
 * Returns the component containing a conversation
 * Handles messages being sent and received and updates the conversation
 */
function ChatContainer() {
    const [text, setText] = useState("")
    const [conversation, updateConversation] = useState<JSX.Element[]>([])
    const send = () => {
        if (text.length > 0) {
            updateConversation(value => [...value, <Message text={ text } />])
        }
    }

    return (
        <div id="ChatContainer">
            <h2>Chat Window</h2>

            <div id="Conversation">
                { conversation }
            </div>

            <div id="MessageInput">
                <input type="text" placeholder="Enter your message" onChange={e => setText(e.target.value)}></input>
                <button onClick={send}>📤</button>
            </div>
        </div>
    )
}

export default ChatContainer
