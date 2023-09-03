import { useEffect, useRef, useState } from "react";
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
    const [autoScroll, setAutoScroll] = useState(true);
    const conversationRef = useRef<HTMLDivElement>(null);

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

    // A 'message from server' event listener, receive, is added when the chat window is mounted
    // or the socket changes.
    useEffect(() => {
        socket.on("message from server", receive);
        return () => {
            socket.off("message from server", receive);
        }; // The cleanup function removes the event listener when the component is unmounted.
    }, [socket]); // The effect depends on the socket and is re-run when it changes.

    // Adds a scroll event listener to the conversation div when the chat window is mounted.
    useEffect(() => {
        const conversationDiv = conversationRef.current;

        // Sets autoScroll to true if the conversation is scrolled to the bottom and false otherwise.
        const handleScroll = () => {
            if (conversationDiv) {
                setAutoScroll(
                    conversationDiv.scrollTop + conversationDiv.clientHeight >=
                        conversationDiv.scrollHeight
                );
            }
        };

        if (conversationDiv) {
            conversationDiv.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (conversationDiv) {
                conversationDiv.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    //Auto scrolls the conversation to the bottom when it is updated.
    useEffect(() => {
        const conversationDiv = conversationRef.current;
        if (conversationDiv && autoScroll) {
            conversationDiv.scrollTop = conversationDiv.scrollHeight;
        }
    }, [conversation]);

    return (
        <div id="ChatWindow">
            <h2>Chat Window</h2>

            <div id="Conversation" ref={conversationRef}>
                {conversation}
            </div>

            <form id="MessageInput" onSubmit={send}>
                <input
                    type="text"
                    placeholder="Enter your message"
                    value={inputText}
                    onChange={handleInputChange}
                />
                <button type="submit">
                    <img src="send-icon.svg" alt="Send Button" />
                </button>
            </form>
        </div>
    );
}

export default ChatWindow;
