import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utills/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utills/constants";

const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const user = useSelector((store) => store.user)
    const userId = user?._id


    const fetchChatMessages = async () => {
        try {
            const chats = await axios.get(`${BASE_URL}chat/${targetUserId}`, { withCredentials: true })
            console.log(chats.data.messages);


            const chatmessages = chats.data.messages.map((chat) => {
                return { text: chat?.text, firstName: chat?.senderId?.firstName, lastName: chat?.senderId?.lastName, id: chat?.senderId?._id }
            })

            setMessages(chatmessages)
        }
        catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchChatMessages()
    }, [])

    const handleSend = () => {
        if (input.trim() === "") return;
        const socket = createSocketConnection()
        socket.emit("sendMessage", {
            firstName: user.firstName,
            lastName: user.lastName,
            userId,
            targetUserId,
            text: input
        }
        )
        setInput("")
    };

    useEffect(() => {
        if (!userId) return
        const socket = createSocketConnection();
        // as soon as the page loaded ,the socket connection is made and join chat event is emmited
        socket.emit("joinChat", { firstName: user?.firstName, lastName: user?.lastName, targetUserId, userId })
        socket.on("messageReceived", ({ firstName, text, lastName }) => {

            setMessages(messages => [...messages, { text, firstName, lastName }]);
        })

        return () => {
            socket.disconnect()
        }
    }, [userId, targetUserId])



    return (
        <div className="mx-auto p-4 flex flex-col items-center">
            {/* Chat Header */}
            <h2 className="text-lg font-semibold mb-3">
                Chat with User ID: <span className="text-blue-600">{userId}</span>
            </h2>

            {/* Messages Area */}
            <div className="border border-gray-300 p-3 h-96 w-1/2 overflow-y-auto mb-3 rounded-md  shadow-sm">
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div
                            key={index}

                        >
                            <div className={`chat chat-${msg.firstName === user.firstName ? "start" : "end"}`}>
                                <div className="chat-header">
                                    {msg.firstName} {msg.lastName}
                                    <time className="text-xs opacity-50">2 hours ago</time>
                                </div>
                                <div className="chat-bubble">{msg.text}</div>
                                <div className="chat-footer opacity-50">Seen</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-400">No messages yet...</p>
                )}
            </div>

            {/* Input & Button */}
            <div className="flex gap-2  w-1/2">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
                <button
                    onClick={handleSend}
                    className="btn btn-secondary text-white rounded-md "
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
