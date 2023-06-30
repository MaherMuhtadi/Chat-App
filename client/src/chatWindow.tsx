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
            <p className="Message">
                { text }
            </p>
        </div>
    )
}

/**
 * Renders the component containing a message conversation.
 * Handles messages being sent and received and updates the conversation.
 */
function ChatWindow() {
    const [inputText, setInputText] = useState("")
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value)
    }
    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            send();
        }
    }
    const [conversation, updateConversation] = useState<JSX.Element[]>([])
    const send = () => {
        if (inputText.length > 0) {
            updateConversation(value => [...value, <Message text={ inputText } self={ true } />])
            setInputText("")
        }
    }

    return (
        <div id="ChatWindow">
            <h2>Chat Window</h2>

            <div id="Conversation">
                { conversation }
            </div>

            <div id="MessageInput">
                <input 
                    type="text" 
                    placeholder="Enter your message" 
                    value={ inputText } 
                    onChange={ handleInputChange } 
                    onKeyDown={ handleEnter }
                />
                <button onClick={ send }>📤</button>
            </div>
        </div>
    )
}

export default ChatWindow
