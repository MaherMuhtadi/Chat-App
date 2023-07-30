import { useEffect, useState } from "react";
import { ClientSocket } from "../../server/shared/types";

/**
 * Renders a chat message with the specified text and sender information.
 * @param {Object} props - The component props.
 * @param {string} props.text - The content of the message.
 * @param {boolean} props.self - Indicates whether the message is from the user themselves.
 */
function Message({ text, self }: { text: string; self: boolean }) {
    const sender = self ? "Sent" : "Received";

    return (
        <div className={sender}>
            <p className="Message">{text}</p>
        </div>
    );
}

/**
 * Renders the component containing a message conversation.
 * Handles messages being sent and received and updates the conversation.
 */
function ChatWindow({ socket }: { socket: ClientSocket }) {
    const [inputText, setInputText] = useState("");
    const [conversation, updateConversation] = useState<JSX.Element[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };

    const send = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents form submission
        if (inputText.length > 0) {
            socket.emit("message to server", inputText);
            setInputText("");
        }
    };

    const receive = (text: string, self: boolean) => {
        updateConversation((value) => [
            ...value,
            <Message text={text} self={self} />,
        ]);
    };

    // A listener, receive, is set up for 'message from server' event once when the chat window is rendered.
    useEffect(() => {
        socket.on("message from server", receive);
        return () => {
            socket.off("message from server", receive);
        }; // The cleanup function removes the event listener when the component is unmounted.
    }, [socket]); // The effect depends on the socket and is re-run when it changes.

    return (
        <div id="ChatWindow">
            <h2>Chat Window</h2>

            <div id="Conversation">{conversation}</div>

            <form id="MessageInput" onSubmit={send}>
                <input
                    type="text"
                    placeholder="Enter your message"
                    value={inputText}
                    onChange={handleInputChange}
                />
                <button type="submit">📤</button>
            </form>
        </div>
    );
}

export default ChatWindow;
