import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

export default function Chat() {
  const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const messageRef = useRef();

  const accessToken = Cookies.get("accessToken");
  const decodedToken = jwt_decode(accessToken);
  const userId =
    decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ];

  useEffect(() => {
    if (!accessToken || !userId) return;

    const connect = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7298/chathub?userId=${userId}`, {
        accessTokenFactory: () => accessToken,
      })
      .withAutomaticReconnect()
      .build();

    connect.on("ReceiveMessage", (data) => {
      setChat((prev) => [
        ...prev,
        {
          senderId: data.senderId,
          message: data.message,
          sentAt: data.sentAt,
        },
      ]);
    });

    connect
      .start()
      .then(() => {
        console.log("Connected to SignalR");
        setConnection(connect);
      })
      .catch((err) => console.error("Connection failed:", err));
  }, [accessToken, userId]);

  const sendMessage = async () => {
    const parsedReceiverId = parseInt(receiverId);
    if (!connection || message.trim() === "" || isNaN(parsedReceiverId)) {
      alert("Mesaj və ya receiverId düzgün deyil.");
      return;
    }

    try {
      await connection.invoke("SendMessage", parsedReceiverId, message);
      setMessage("");
      messageRef.current.focus();
    } catch (err) {
      console.error("Mesaj göndərilə bilmədi:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4">💬 Chat</h2>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Qarşı tərəfin ID-si (receiverId):
        </label>
        <input
          type="text"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Məsələn: 2"
        />
      </div>

      <div className="h-64 overflow-y-auto border rounded p-3 mb-4 bg-gray-50">
        {chat.map((c, i) => (
          <div
            key={i}
            className={`mb-2 p-2 rounded ${
              c.senderId == userId
                ? "bg-blue-500 text-white ml-auto w-max"
                : "bg-gray-300 text-black mr-auto w-max"
            }`}
          >
            {c.message}
            <div className="text-xs text-right text-gray-600 mt-1">
              {new Date(c.sentAt).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          ref={messageRef}
          type="text"
          className="flex-1 border px-3 py-2 rounded"
          placeholder="Mesaj yaz..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Göndər
        </button>
      </div>
    </div>
  );
}
