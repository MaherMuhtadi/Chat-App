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
    const [conversation, updateConversation] = useState<JSX.Element[]>([])
    const send = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // Prevent form submission
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

            <form id="MessageInput" onSubmit={ send }>
                <input 
                    type="text" 
                    placeholder="Enter your message" 
                    value={ inputText } 
                    onChange={ handleInputChange }
                />
                <button type="submit">📤</button>
            </form>
        </div>
    )
}

export default ChatWindow
