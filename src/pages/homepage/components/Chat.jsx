import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useLocation } from "react-router-dom";

export default function Chat() {
  const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const messageRef = useRef();
  const location = useLocation();
  const [hasUnreadMessage, setHasUnreadMessage] = useState(false);

  const accessToken = Cookies.get("accessToken");
  const decodedToken = jwt_decode(accessToken);
  const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  const { id } = useParams();

  const playNotificationSound = () => {
    const audio = new Audio("/notification.mp3");
    audio.play();
  };

  useEffect(() => {
    const fetchConversation = async () => {
      if (!userId || !receiverId) return;

      try {
        const res = await fetch(
          `https://localhost:7298/api/chat/conversation?user1Id=${userId}&user2Id=${receiverId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok && data.isSuccess && Array.isArray(data.data)) {
          setChat(data.data);
        } else {
          console.error("Chat history could not be retrieved:", data);
        }
      } catch (err) {
        console.error("Error fetching conversation:", err);
      }
    };

    fetchConversation();
  }, [receiverId]);

  useEffect(() => {
    if (location.pathname === "/") {
      setReceiverId("-1");
    } else if (location.pathname.startsWith("/coach/")) {
      const id = location.pathname.split("/")[2];
      setReceiverId(id);
    } else {
      setReceiverId("-1");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!accessToken || !userId) return;

    const connect = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7298/chathub?userId=${userId}`, {
        accessTokenFactory: () => accessToken,
      })
      .withAutomaticReconnect()
      .build();

    connect.on("ReceiveMessage", (data) => {
      playNotificationSound();
      setChat((prev) => [
        ...prev,
        {
          senderId: data.senderId,
          message: data.message,
          sentAt: data.sentAt,
        },
      ]);
      if (!isOpen) {
        setHasUnreadMessage(true);
      }
    });

    connect
      .start()
      .then(() => {
        console.log("Connected to SignalR");
        setConnection(connect);
      })
      .catch((err) => console.error("Connection failed:", err));

    return () => {
      connect.off("ReceiveMessage");
      connect.stop();
    };
  }, [accessToken, userId]);

  const sendMessage = async () => {
    const parsedReceiverId = parseInt(receiverId);
    if (!connection || message.trim() === "" || isNaN(parsedReceiverId)) {
      alert("The message or receiverId is not correct.");
      return;
    }

    try {
      // Send message to AI if receiver is AI (AI's ID = -1)
      if (parsedReceiverId === -1) {
        
        setChat((prev) => [
          ...prev,
          {
            senderId: userId,
            message: message,
            sentAt: new Date().toISOString(),
          },
        ]);
      
        const aiResponse = await sendAIMessage(message);
        setMessage("");
        messageRef.current.focus();
      
       
        setChat((prev) => [
          ...prev,
          {
            senderId: -1,
            message: aiResponse,
            sentAt: new Date().toISOString(),
          },
        ]);
      }
       else {
        await connection.invoke("SendMessage", parsedReceiverId, message);
        setMessage("");
        messageRef.current.focus();
      }
    } catch (err) {
      console.error("The message could not be sent:", err);
    }
  };

  const sendAIMessage = async (userMessage) => {
    try {
      const res = await fetch("https://localhost:7298/api/chat/ask-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userMessage),
      });

      const data = await res.json();

      if (res.ok && data.response) {
        return data.response;
      } else {
        throw new Error("AI response error");
      }
    } catch (err) {
      console.error("AI Message failed:", err);
      return "Sorry, I couldn't understand your request.";
    }
  };

  const sendQuickReply = async (text) => {
    const parsedReceiverId = parseInt(receiverId);
    if (!connection || isNaN(parsedReceiverId)) {
      alert("receiverId is not correct.");
      return;
    }

    try {
      await connection.invoke("SendMessage", parsedReceiverId, text);
    } catch (err) {
      console.error("It was not possible to send a quick message:", err);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            key="open"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={() => {setIsOpen(true);setHasUnreadMessage(false);}}
            className="w-16 h-16 bg-purple-700 rounded-full shadow-lg flex items-center justify-center text-white text-3xl hover:scale-105 transition"
          >
            🤖
            {hasUnreadMessage && (
               <span className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full"></span>
             )}
          </motion.button>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.4 }}
            className="w-80 bg-purple-100 rounded-3xl shadow-lg overflow-hidden"
          >
            <div className="bg-purple-700 text-white text-center p-6 rounded-b-3xl relative">
              <h2 className="text-xl font-semibold">Hello I'm Noaii</h2>
              <div className="mt-4 w-20 h-20 mx-auto bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-3xl">🤖</span>
              </div>
              <p className="mt-4 text-lg">How can I help you?</p>
              <button className="mt-4 bg-white text-purple-700 px-6 py-2 rounded-full font-semibold shadow">
                I want to know!
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-3 text-white text-xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-4 space-y-2 bg-white max-h-96 overflow-y-auto">
              {chat.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`text-sm p-3 rounded-xl max-w-[80%] ${
                    c.senderId == userId
                      ? "bg-purple-600 text-white ml-auto"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {c.message}
                  <div className="text-xs text-right mt-1 text-gray-400">
                    {new Date(c.sentAt).toLocaleTimeString()}
                  </div>
                </motion.div>
              ))}

              <div className="mt-4 flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Receiver ID"
                  value={receiverId}
                  onChange={(e) => setReceiverId(e.target.value)}
                  className="flex-1 border border-purple-300 px-3 py-2 rounded-full text-sm"
                />
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => sendQuickReply("No, I dunno")}
                  className="bg-white border border-purple-600 text-purple-600 px-4 py-1 rounded-full font-medium"
                >
                  No, I dunno
                </button>
                <button
                  onClick={() => sendQuickReply("OK")}
                  className="bg-purple-600 text-white px-4 py-1 rounded-full font-medium"
                >
                  OK
                </button>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <input
                  type="text"
                  ref={messageRef}
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 border border-purple-300 px-3 py-2 rounded-full text-sm"
                />
                <button
                  onClick={sendMessage}
                  className="bg-purple-600 text-white px-4 py-2 rounded-full"
                >
                  ➤
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
