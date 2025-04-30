

// import { useEffect, useRef, useState } from "react";
// import * as signalR from "@microsoft/signalr";
// import jwt_decode from "jwt-decode";
// import Cookies from "js-cookie";

// export default function Chat() {
//   const [connection, setConnection] = useState(null);
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const [receiverId, setReceiverId] = useState("");
//   const messageRef = useRef();

//   const accessToken = Cookies.get("accessToken");
//   const decodedToken = jwt_decode(accessToken);
//   const userId =
//     decodedToken[
//       "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
//     ];

//   useEffect(() => {
//     if (!accessToken || !userId) return;

//     const connect = new signalR.HubConnectionBuilder()
//       .withUrl(`https://localhost:7298/chathub?userId=${userId}`, {
//         accessTokenFactory: () => accessToken,
//       })
//       .withAutomaticReconnect()
//       .build();

//     connect.on("ReceiveMessage", (data) => {
//       setChat((prev) => [
//         ...prev,
//         {
//           senderId: data.senderId,
//           message: data.message,
//           sentAt: data.sentAt,
//         },
//       ]);
//     });

//     connect
//       .start()
//       .then(() => {
//         console.log("Connected to SignalR");
//         setConnection(connect);
//       })
//       .catch((err) => console.error("Connection failed:", err));
//   }, [accessToken, userId]);

//   const sendMessage = async () => {
//     const parsedReceiverId = parseInt(receiverId);
//     if (!connection || message.trim() === "" || isNaN(parsedReceiverId)) {
//       alert("Mesaj və ya receiverId düzgün deyil.");
//       return;
//     }
  
//     try {
//       await connection.invoke("SendMessage", parsedReceiverId, message);
//       setMessage("");
//       messageRef.current.focus();
//     } catch (err) {
//       console.error("Mesaj göndərilə bilmədi:", err);
//     }
//   };
  
//   const sendQuickReply = async (text) => {
//     const parsedReceiverId = parseInt(receiverId);
//     if (!connection || isNaN(parsedReceiverId)) {
//       alert("receiverId düzgün deyil.");
//       return;
//     }
  
//     try {
//       await connection.invoke("SendMessage", parsedReceiverId, text);
//       messageRef.current.focus();
//     } catch (err) {
//       console.error("Mesaj göndərilə bilmədi:", err);
//     }
//   };
  
//   return (
//     <div className="w-full min-h-screen bg-white flex flex-col items-center p-6">
//       <div className="w-full max-w-sm bg-purple-100 rounded-3xl shadow-lg overflow-hidden">
//         <div className="bg-purple-700 text-white text-center p-6 rounded-b-3xl">
//           <h2 className="text-xl font-semibold">Hello I'm Noaii</h2>
//           <div className="mt-4 w-20 h-20 mx-auto bg-purple-500 rounded-full flex items-center justify-center">
//             <span className="text-3xl">🤖</span>
//           </div>
//           <p className="mt-4 text-lg">How can I help you?</p>
//           <button className="mt-4 bg-white text-purple-700 px-6 py-2 rounded-full font-semibold shadow">
//             I want to know!
//           </button>
//         </div>

//         <div className="p-4 space-y-2 bg-white">
//           {/* ReceiverId input alanı */}
//           <input
//             type="text"
//             value={receiverId}
//             onChange={(e) => setReceiverId(e.target.value)}
//             placeholder="Karşı tarafın ID'si"
//             className="w-full border border-purple-300 px-3 py-2 rounded-full text-sm mb-2"
//           />

//           {/* Chat mesajları */}
//           <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
//             {chat.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`text-sm p-3 rounded-xl max-w-[80%] ${
//                   msg.senderId == userId
//                     ? "bg-purple-600 text-white ml-auto"
//                     : "bg-gray-200 text-gray-800"
//                 }`}
//               >
//                 {msg.message}
//               </div>
//             ))}
//           </div>

//           <div className="text-sm text-gray-400">...</div>

//           {/* Alt butonlar */}
//           <div className="flex justify-between mt-4">
//           <button
//     onClick={() => sendQuickReply("No, I dunno")}
//     className="bg-white border border-purple-600 text-purple-600 px-4 py-1 rounded-full font-medium"
//   >
//     No, I dunno
//   </button>
//             <button
//     onClick={() => sendQuickReply("OK")}
//     className="bg-purple-600 text-white px-4 py-1 rounded-full font-medium"
//   >
//     OK
//   </button>
//           </div>

//           {/* Mesaj inputu */}
//           <div className="mt-4 flex items-center gap-2">
//             <input
//               type="text"
//               ref={messageRef}
//               placeholder="Message"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//               className="flex-1 border border-purple-300 px-3 py-2 rounded-full text-sm"
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-purple-600 text-white px-4 py-2 rounded-full"
//             >
//               ➤
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }











//esas budu hli animationlar var yasil hisse yoxdu asagidaki

// import { useEffect, useRef, useState } from "react";
// import * as signalR from "@microsoft/signalr";
// import jwt_decode from "jwt-decode";
// import Cookies from "js-cookie";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Chat() {
//   const [connection, setConnection] = useState(null);
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const [receiverId, setReceiverId] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const messageRef = useRef();

//   const accessToken = Cookies.get("accessToken");
//   const decodedToken = jwt_decode(accessToken);
//   const userId = decodedToken[
//     "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
//   ];

//   const playNotificationSound = () => {
//     const audio = new Audio("/notification.mp3");
//     audio.play();
//   };

//   useEffect(() => {
//     if (!accessToken || !userId) return;

//     const connect = new signalR.HubConnectionBuilder()
//       .withUrl(`https://localhost:7298/chathub?userId=${userId}`, {
//         accessTokenFactory: () => accessToken,
//       })
//       .withAutomaticReconnect()
//       .build();

//     connect.on("ReceiveMessage", (data) => {
//       playNotificationSound();
//       setChat((prev) => [
//         ...prev,
//         {
//           senderId: data.senderId,
//           message: data.message,
//           sentAt: data.sentAt,
//         },
//       ]);
//     });

//     connect
//       .start()
//       .then(() => {
//         console.log("Connected to SignalR");
//         setConnection(connect);
//       })
//       .catch((err) => console.error("Connection failed:", err));
//   }, [accessToken, userId]);

//   const sendMessage = async () => {
//     const parsedReceiverId = parseInt(receiverId);
//     if (!connection || message.trim() === "" || isNaN(parsedReceiverId)) {
//       alert("Mesaj və ya receiverId düzgün deyil.");
//       return;
//     }

//     try {
//       await connection.invoke("SendMessage", parsedReceiverId, message);
//       setMessage("");
//       messageRef.current.focus();
//     } catch (err) {
//       console.error("Mesaj göndərilə bilmədi:", err);
//     }
//   };

//   const sendQuickReply = async (text) => {
//     const parsedReceiverId = parseInt(receiverId);
//     if (!connection || isNaN(parsedReceiverId)) {
//       alert("receiverId düzgün deyil.");
//       return;
//     }

//     try {
//       await connection.invoke("SendMessage", parsedReceiverId, text);
//     } catch (err) {
//       console.error("Hızlı mesaj göndərilə bilmədi:", err);
//     }
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50">
//       <AnimatePresence>
//         {!isOpen ? (
//           <motion.button
//             key="open"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             transition={{ duration: 0.3 }}
//             onClick={() => setIsOpen(true)}
//             className="w-16 h-16 bg-purple-700 rounded-full shadow-lg flex items-center justify-center text-white text-3xl hover:scale-105 transition"
//           >
//             🤖
//           </motion.button>
//         ) : (
//           <motion.div
//             key="chat"
//             initial={{ opacity: 0, y: 100 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 100 }}
//             transition={{ duration: 0.4 }}
//             className="w-80 bg-purple-100 rounded-3xl shadow-lg overflow-hidden"
//           >
//             <div className="bg-purple-700 text-white text-center p-6 rounded-b-3xl relative">
//               <h2 className="text-xl font-semibold">Hello I'm Noaii</h2>
//               <div className="mt-4 w-20 h-20 mx-auto bg-purple-500 rounded-full flex items-center justify-center">
//                 <span className="text-3xl">🤖</span>
//               </div>
//               <p className="mt-4 text-lg">How can I help you?</p>
//               <button className="mt-4 bg-white text-purple-700 px-6 py-2 rounded-full font-semibold shadow">
//                 I want to know!
//               </button>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="absolute top-2 right-3 text-white text-xl font-bold"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="p-4 space-y-2 bg-white max-h-96 overflow-y-auto">
//               {chat.map((c, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className={`text-sm p-3 rounded-xl max-w-[80%] ${
//                     c.senderId == userId
//                       ? "bg-purple-600 text-white ml-auto"
//                       : "bg-gray-200 text-gray-800"
//                   }`}
//                 >
//                   {c.message}
//                   <div className="text-xs text-right mt-1 text-gray-400">
//                     {new Date(c.sentAt).toLocaleTimeString()}
//                   </div>
//                 </motion.div>
//               ))}

//               <div className="mt-4 flex items-center gap-2">
//                 <input
//                   type="number"
//                   placeholder="Receiver ID"
//                   value={receiverId}
//                   onChange={(e) => setReceiverId(e.target.value)}
//                   className="flex-1 border border-purple-300 px-3 py-2 rounded-full text-sm"
//                 />
//               </div>

//               <div className="flex justify-between mt-4">
//                 <button
//                   onClick={() => sendQuickReply("No, I dunno")}
//                   className="bg-white border border-purple-600 text-purple-600 px-4 py-1 rounded-full font-medium"
//                 >
//                   No, I dunno
//                 </button>
//                 <button
//                   onClick={() => sendQuickReply("OK")}
//                   className="bg-purple-600 text-white px-4 py-1 rounded-full font-medium"
//                 >
//                   OK
//                 </button>
//               </div>

//               <div className="mt-4 flex items-center gap-2">
//                 <input
//                   type="text"
//                   ref={messageRef}
//                   placeholder="Message"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                   className="flex-1 border border-purple-300 px-3 py-2 rounded-full text-sm"
//                 />
//                 <button
//                   onClick={sendMessage}
//                   className="bg-purple-600 text-white px-4 py-2 rounded-full"
//                 >
//                   ➤
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }



////en duzgunu ennnn duzgun buduuuu asagidaki

// import { useEffect, useRef, useState } from "react";
// import * as signalR from "@microsoft/signalr";
// import jwt_decode from "jwt-decode";
// import Cookies from "js-cookie";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Chat() {
//   const [connection, setConnection] = useState(null);
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const [receiverId, setReceiverId] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const messageRef = useRef();

//   const accessToken = Cookies.get("accessToken");
//   const decodedToken = jwt_decode(accessToken);
//   const userId = decodedToken[
//     "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
//   ];

//   const playNotificationSound = () => {
//     const audio = new Audio("/notification.mp3");
//     audio.play();
//   };

//   useEffect(() => {
//     if (!accessToken || !userId) return;

//     const connect = new signalR.HubConnectionBuilder()
//       .withUrl(`https://localhost:7298/chathub?userId=${userId}`, {
//         accessTokenFactory: () => accessToken,
//       })
//       .withAutomaticReconnect()
//       .build();

//     connect.on("ReceiveMessage", (data) => {
//       playNotificationSound();
//       setChat((prev) => [
//         ...prev,
//         {
//           senderId: data.senderId,
//           message: data.message,
//           sentAt: data.sentAt,
//         },
//       ]);
//     });

//     connect
//       .start()
//       .then(() => {
//         console.log("Connected to SignalR");
//         setConnection(connect);
//       })
//       .catch((err) => console.error("Connection failed:", err));

//     return () => {
//       connect.off("ReceiveMessage");
//       connect.stop();
//     };
//   }, [accessToken, userId]);

//   const sendMessage = async () => {
//     const parsedReceiverId = parseInt(receiverId);
//     if (!connection || message.trim() === "" || isNaN(parsedReceiverId)) {
//       alert("Mesaj və ya receiverId düzgün deyil.");
//       return;
//     }

//     try {
//       await connection.invoke("SendMessage", parsedReceiverId, message);
//       setMessage("");
//       messageRef.current.focus();
//     } catch (err) {
//       console.error("Mesaj göndərilə bilmədi:", err);
//     }
//   };

//   const sendQuickReply = async (text) => {
//     const parsedReceiverId = parseInt(receiverId);
//     if (!connection || isNaN(parsedReceiverId)) {
//       alert("receiverId düzgün deyil.");
//       return;
//     }

//     try {
//       await connection.invoke("SendMessage", parsedReceiverId, text);
//     } catch (err) {
//       console.error("Hızlı mesaj göndərilə bilmədi:", err);
//     }
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50">
//       <AnimatePresence>
//         {!isOpen ? (
//           <motion.button
//             key="open"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             transition={{ duration: 0.3 }}
//             onClick={() => setIsOpen(true)}
//             className="w-16 h-16 bg-purple-700 rounded-full shadow-lg flex items-center justify-center text-white text-3xl hover:scale-105 transition"
//           >
//             🤖
//           </motion.button>
//         ) : (
//           <motion.div
//             key="chat"
//             initial={{ opacity: 0, y: 100 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 100 }}
//             transition={{ duration: 0.4 }}
//             className="w-80 bg-purple-100 rounded-3xl shadow-lg overflow-hidden"
//           >
//             <div className="bg-purple-700 text-white text-center p-6 rounded-b-3xl relative">
//               <h2 className="text-xl font-semibold">Hello I'm Noaii</h2>
//               <div className="mt-4 w-20 h-20 mx-auto bg-purple-500 rounded-full flex items-center justify-center">
//                 <span className="text-3xl">🤖</span>
//               </div>
//               <p className="mt-4 text-lg">How can I help you?</p>
//               <button className="mt-4 bg-white text-purple-700 px-6 py-2 rounded-full font-semibold shadow">
//                 I want to know!
//               </button>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="absolute top-2 right-3 text-white text-xl font-bold"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="p-4 space-y-2 bg-white max-h-96 overflow-y-auto">
//               {chat.map((c, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className={`text-sm p-3 rounded-xl max-w-[80%] ${
//                     c.senderId == userId
//                       ? "bg-purple-600 text-white ml-auto"
//                       : "bg-gray-200 text-gray-800"
//                   }`}
//                 >
//                   {c.message}
//                   <div className="text-xs text-right mt-1 text-gray-400">
//                     {new Date(c.sentAt).toLocaleTimeString()}
//                   </div>
//                 </motion.div>
//               ))}

//               <div className="mt-4 flex items-center gap-2">
//                 <input
//                   type="number"
//                   placeholder="Receiver ID"
//                   value={receiverId}
//                   onChange={(e) => setReceiverId(e.target.value)}
//                   className="flex-1 border border-purple-300 px-3 py-2 rounded-full text-sm"
//                 />
//               </div>

//               <div className="flex justify-between mt-4">
//                 <button
//                   onClick={() => sendQuickReply("No, I dunno")}
//                   className="bg-white border border-purple-600 text-purple-600 px-4 py-1 rounded-full font-medium"
//                 >
//                   No, I dunno
//                 </button>
//                 <button
//                   onClick={() => sendQuickReply("OK")}
//                   className="bg-purple-600 text-white px-4 py-1 rounded-full font-medium"
//                 >
//                   OK
//                 </button>
//               </div>

//               <div className="mt-4 flex items-center gap-2">
//                 <input
//                   type="text"
//                   ref={messageRef}
//                   placeholder="Message"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                   className="flex-1 border border-purple-300 px-3 py-2 rounded-full text-sm"
//                 />
//                 <button
//                   onClick={sendMessage}
//                   className="bg-purple-600 text-white px-4 py-2 rounded-full"
//                 >
//                   ➤
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }




import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";

export default function Chat() {
  const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const messageRef = useRef();
  const [hasUnreadMessage, setHasUnreadMessage] = useState(false);

  const accessToken = Cookies.get("accessToken");
  const decodedToken = jwt_decode(accessToken);
  const userId = decodedToken[
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
  ];

  const playNotificationSound = () => {
    const audio = new Audio("/notification.mp3");
    audio.play();
  };


  useEffect(() => {
    const fetchConversation = async () => {
      if (!userId || !receiverId) return;

      try {
        const res = await fetch(
          `https://fitgym.com.az/api/chat/conversation?user1Id=${userId}&user2Id=${receiverId}`,
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
          console.error("Söhbət tarixçəsi gətirilə bilmədi:", data);
        }
      } catch (err) {
        console.error("Error fetching conversation:", err);
      }
    };

    fetchConversation();
  }, [receiverId]);


  useEffect(() => {
    if (!accessToken || !userId) return;

    const connect = new signalR.HubConnectionBuilder()
      .withUrl(`https://fitgym.com.az/chathub?userId=${userId}`, {
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

  const sendQuickReply = async (text) => {
    const parsedReceiverId = parseInt(receiverId);
    if (!connection || isNaN(parsedReceiverId)) {
      alert("receiverId düzgün deyil.");
      return;
    }

    try {
      await connection.invoke("SendMessage", parsedReceiverId, text);
    } catch (err) {
      console.error("Hızlı mesaj göndərilə bilmədi:", err);
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




// import { useEffect, useRef, useState } from "react";
// import * as signalR from "@microsoft/signalr";
// import jwt_decode from "jwt-decode";
// import Cookies from "js-cookie";
// import { motion, AnimatePresence } from "framer-motion";

// // 🔔 Basit bir bildirim sesi için varsayılan tarayıcı beep
// const playNotificationSound = () => {
//   const audio = new Audio("/notification.mp3"); // public klasörüne ses dosyası koy
//   audio.play().catch((e) => console.warn("Ses çalınamadı:", e));
// };

// export default function Chat() {
//   const [connection, setConnection] = useState(null);
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const [receiverId, setReceiverId] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [hasUnreadMessage, setHasUnreadMessage] = useState(false);
//   const messageRef = useRef();

//   const accessToken = Cookies.get("accessToken");
//   const decodedToken = jwt_decode(accessToken);
//   const userId =
//     decodedToken[
//       "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
//     ];

//   useEffect(() => {
//     if (!accessToken || !userId) return;

//     const connect = new signalR.HubConnectionBuilder()
//       .withUrl(`https://localhost:7298/chathub?userId=${userId}`, {
//         accessTokenFactory: () => accessToken,
//       })
//       .withAutomaticReconnect()
//       .build();

//     connect.on("ReceiveMessage", (data) => {
//       playNotificationSound();
//       setChat((prev) => [
//         ...prev,
//         {
//           senderId: data.senderId,
//           message: data.message,
//           sentAt: data.sentAt,
//         },
//       ]);

//       if (!isOpen) {
//         setHasUnreadMessage(true);
//       }
//     });

//     connect
//       .start()
//       .then(() => {
//         console.log("Connected to SignalR");
//         setConnection(connect);
//       })
//       .catch((err) => console.error("Connection failed:", err));
//   }, [accessToken, userId]);

//   const sendMessage = async () => {
//     const parsedReceiverId = parseInt(receiverId);
//     if (!connection || message.trim() === "" || isNaN(parsedReceiverId)) {
//       alert("Mesaj və ya receiverId düzgün deyil.");
//       return;
//     }

//     try {
//       await connection.invoke("SendMessage", parsedReceiverId, message);
//       setMessage("");
//       messageRef.current.focus();
//     } catch (err) {
//       console.error("Mesaj göndərilə bilmədi:", err);
//     }
//   };

//   const sendQuickReply = async (text) => {
//     const parsedReceiverId = parseInt(receiverId);
//     if (!connection || isNaN(parsedReceiverId)) {
//       alert("receiverId düzgün deyil.");
//       return;
//     }

//     try {
//       await connection.invoke("SendMessage", parsedReceiverId, text);
//     } catch (err) {
//       console.error("Hızlı mesaj göndərilə bilmədi:", err);
//     }
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50">
//       <AnimatePresence>
//         {!isOpen ? (
//           <motion.button
//             key="open"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             transition={{ duration: 0.3 }}
//             onClick={() => {
//               setIsOpen(true);
//               setHasUnreadMessage(false);
//             }}
//             className="w-16 h-16 bg-purple-700 rounded-full shadow-lg flex items-center justify-center text-white text-3xl hover:scale-105 transition relative"
//           >
//             🤖
//             {hasUnreadMessage && (
//               <span className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full"></span>
//             )}
//           </motion.button>
//         ) : (
//           <motion.div
//             key="chatbox"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 50 }}
//             transition={{ duration: 0.3 }}
//             className="w-80 bg-purple-100 rounded-3xl shadow-lg overflow-hidden"
//           >
//             <div className="bg-purple-700 text-white text-center p-6 rounded-b-3xl relative">
//               <h2 className="text-xl font-semibold">Hello I'm Noaii</h2>
//               <div className="mt-4 w-20 h-20 mx-auto bg-purple-500 rounded-full flex items-center justify-center">
//                 <span className="text-3xl">🤖</span>
//               </div>
//               <p className="mt-4 text-lg">How can I help you?</p>
//               <button className="mt-4 bg-white text-purple-700 px-6 py-2 rounded-full font-semibold shadow">
//                 I want to know!
//               </button>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="absolute top-2 right-3 text-white text-xl font-bold"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="p-4 space-y-2 bg-white max-h-96 overflow-y-auto">
//               {chat.map((c, i) => (
//                 <div
//                   key={i}
//                   className={`text-sm p-3 rounded-xl max-w-[80%] ${
//                     c.senderId == userId
//                       ? "bg-purple-600 text-white ml-auto"
//                       : "bg-gray-200 text-gray-800"
//                   }`}
//                 >
//                   {c.message}
//                   <div className="text-xs text-right mt-1 text-gray-400">
//                     {new Date(c.sentAt).toLocaleTimeString()}
//                   </div>
//                 </div>
//               ))}

//               <div className="mt-4 flex items-center gap-2">
//                 <input
//                   type="number"
//                   placeholder="Receiver ID"
//                   value={receiverId}
//                   onChange={(e) => setReceiverId(e.target.value)}
//                   className="flex-1 border border-purple-300 px-3 py-2 rounded-full text-sm"
//                 />
//               </div>

//               <div className="flex justify-between mt-4">
//                 <button
//                   onClick={() => sendQuickReply("No, I dunno")}
//                   className="bg-white border border-purple-600 text-purple-600 px-4 py-1 rounded-full font-medium"
//                 >
//                   No, I dunno
//                 </button>
//                 <button
//                   onClick={() => sendQuickReply("OK")}
//                   className="bg-purple-600 text-white px-4 py-1 rounded-full font-medium"
//                 >
//                   OK
//                 </button>
//               </div>

//               <div className="mt-4 flex items-center gap-2">
//                 <input
//                   type="text"
//                   ref={messageRef}
//                   placeholder="Message"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                   className="flex-1 border border-purple-300 px-3 py-2 rounded-full text-sm"
//                 />
//                 <button
//                   onClick={sendMessage}
//                   className="bg-purple-600 text-white px-4 py-2 rounded-full"
//                 >
//                   ➤
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


//////////////// easa budu yuxaridaki


// import { useEffect, useRef, useState } from "react";
// import * as signalR from "@microsoft/signalr";
// import jwt_decode from "jwt-decode";
// import Cookies from "js-cookie";
// import { motion, AnimatePresence } from "framer-motion";

// // 🔔 Basit bir bildirim sesi için varsayılan tarayıcı beep
// const playNotificationSound = () => {
//   const audio = new Audio("/notification.mp3"); // public klasörüne ses dosyası koy
//   audio.play().catch((e) => console.warn("Ses çalınamadı:", e));
// };

// export default function Chat() {
//   const [connection, setConnection] = useState(null);
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const [receiverId, setReceiverId] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [newMessagesCount, setNewMessagesCount] = useState(0); // Yeni mesaj sayısı
//   const messageRef = useRef();

//   const accessToken = Cookies.get("accessToken");
//   const decodedToken = jwt_decode(accessToken);
//   const userId =
//     decodedToken[
//       "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
//     ];

//   useEffect(() => {
//     if (!accessToken || !userId) return;

//     const connect = new signalR.HubConnectionBuilder()
//       .withUrl(`https://localhost:7298/chathub?userId=${userId}`, {
//         accessTokenFactory: () => accessToken,
//       })
//       .withAutomaticReconnect()
//       .build();

//     connect.on("ReceiveMessage", (data) => {
//       playNotificationSound();
//       setChat((prev) => [
//         ...prev,
//         {
//           senderId: data.senderId,
//           message: data.message,
//           sentAt: data.sentAt,
//         },
//       ]);

//       if (!isOpen) {
//         setNewMessagesCount((prevCount) => prevCount + 1); // Yeni mesaj sayısını artır
//       }
//     });

//     connect
//       .start()
//       .then(() => {
//         console.log("Connected to SignalR");
//         setConnection(connect);
//       })
//       .catch((err) => console.error("Connection failed:", err));
//   }, [accessToken, userId, isOpen]);

//   const sendMessage = async () => {
//     const parsedReceiverId = parseInt(receiverId);
//     if (!connection || message.trim() === "" || isNaN(parsedReceiverId)) {
//       alert("Mesaj və ya receiverId düzgün deyil.");
//       return;
//     }

//     try {
//       await connection.invoke("SendMessage", parsedReceiverId, message);
//       setMessage("");
//       messageRef.current.focus();
//     } catch (err) {
//       console.error("Mesaj göndərilə bilmədi:", err);
//     }
//   };

//   const sendQuickReply = async (text) => {
//     const parsedReceiverId = parseInt(receiverId);
//     if (!connection || isNaN(parsedReceiverId)) {
//       alert("receiverId düzgün deyil.");
//       return;
//     }

//     try {
//       await connection.invoke("SendMessage", parsedReceiverId, text);
//     } catch (err) {
//       console.error("Hızlı mesaj göndərilə bilmədi:", err);
//     }
//   };

//   const handleOpenChat = () => {
//     setIsOpen(true);
//     setNewMessagesCount(0); // Chat açıldığında yeni mesaj sayısını sıfırla
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50">
//       <AnimatePresence>
//         {!isOpen ? (
//           <motion.button
//             key="open"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             transition={{ duration: 0.3 }}
//             onClick={handleOpenChat}
//             className="w-16 h-16 bg-purple-700 rounded-full shadow-lg flex items-center justify-center text-white text-3xl hover:scale-105 transition relative"
//           >
//             🤖
//             {newMessagesCount > 0 && (
//               <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full"></div>
//             )}
//             {newMessagesCount > 0 && (
//               <span className="absolute top-0 right-0 text-black text-xs font-bold">
//                 {newMessagesCount}
//               </span>
//             )}
//           </motion.button>
//         ) : (
//           <motion.div
//             key="chatbox"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 50 }}
//             transition={{ duration: 0.3 }}
//             className="w-80 bg-purple-100 rounded-3xl shadow-lg overflow-hidden"
//           >
//             <div className="bg-purple-700 text-white text-center p-6 rounded-b-3xl relative">
//               <h2 className="text-xl font-semibold">Hello I'm Noaii</h2>
//               <div className="mt-4 w-20 h-20 mx-auto bg-purple-500 rounded-full flex items-center justify-center">
//                 <span className="text-3xl">🤖</span>
//               </div>
//               <p className="mt-4 text-lg">How can I help you?</p>
//               <button className="mt-4 bg-white text-purple-700 px-6 py-2 rounded-full font-semibold shadow">
//                 I want to know!
//               </button>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="absolute top-2 right-3 text-white text-xl font-bold"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="p-4 space-y-2 bg-white max-h-96 overflow-y-auto">
//               {chat.map((c, i) => (
//                 <div
//                   key={i}
//                   className={`text-sm p-3 rounded-xl max-w-[80%] ${
//                     c.senderId == userId
//                       ? "bg-purple-600 text-white ml-auto"
//                       : "bg-gray-200 text-gray-800"
//                   }`}
//                 >
//                   {c.message}
//                   <div className="text-xs text-right mt-1 text-gray-400">
//                     {new Date(c.sentAt).toLocaleTimeString()}
//                   </div>
//                 </div>
//               ))}

//               <div className="mt-4 flex items-center gap-2">
//                 <input
//                   type="number"
//                   placeholder="Receiver ID"
//                   value={receiverId}
//                   onChange={(e) => setReceiverId(e.target.value)}
//                   className="flex-1 border border-purple-300 px-3 py-2 rounded-full text-sm"
//                 />
//               </div>

//               <div className="flex justify-between mt-4">
//                 <button
//                   onClick={() => sendQuickReply("No, I dunno")}
//                   className="bg-white border border-purple-600 text-purple-600 px-4 py-1 rounded-full font-medium"
//                 >
//                   No, I dunno
//                 </button>
//                 <button
//                   onClick={() => sendQuickReply("OK")}
//                   className="bg-purple-600 text-white px-4 py-1 rounded-full font-medium"
//                 >
//                   OK
//                 </button>
//               </div>

//               <div className="mt-4 flex items-center gap-2">
//                 <input
//                   type="text"
//                   ref={messageRef}
//                   placeholder="Message"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                   className="flex-1 border border-purple-300 px-3 py-2 rounded-full text-sm"
//                 />
//                 <button
//                   onClick={sendMessage}
//                   className="bg-purple-600 text-white px-4 py-2 rounded-full"
//                 >
//                   ➤
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }