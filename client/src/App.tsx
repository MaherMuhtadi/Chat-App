import ChatWindow from "./chatWindow.tsx";
import { useState } from "react";
import { io } from "socket.io-client";
import { ClientSocket } from "../../server/shared/types.ts";

function App() {
    const [socket] = useState<ClientSocket>(io("http://localhost:3000"));
    return <ChatWindow socket={socket} />;
}

export default App;
