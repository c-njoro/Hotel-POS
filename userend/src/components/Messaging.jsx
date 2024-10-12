// import { Alert } from "@mui/material";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import io from "socket.io-client";
// import useMessages from "./hooks/messagesHook";

// // Connect to the server

// const Messaging = () => {
//   const {
//     data: messages,
//     isLoading: messagesLoading,
//     error: messagesError,
//     refetch: refetchMessages,
//   } = useMessages();
//   const socket = io("localhost:5000", {
//     transports: ["websocket", "polling"],
//   });
//   const [inputValue, setInputValue] = useState("");
//   const [databaseMessages, setDatabaseMessages] = useState([]);

//   function connectSocket() {
//     socket.on("connection", (socket) => {
//       console.log("We are connected: ", socket.id);
//     });
//   }

//   function receiveMessages() {
//     socket.on("receivedMessage", (message) => {
//       console.log("The receive message seen on client side");
//       setDatabaseMessages((prev) => [...prev, message]);
//     });
//   }

//   useEffect(() => {
//     receiveMessages();
//   }, []);

//   useEffect(() => {
//     connectSocket();

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const sendMessage = async () => {
//     if (!inputValue) {
//       Alert("No Input");
//       return;
//     }
//     const newMessage = {
//       sender: "66fa7e224b6bd60bbb2deb33",
//       receiver: "66fa7f5497f89fc474655dad",
//       text: inputValue,
//     };
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_MESSAGES_URL}/create`,
//         newMessage
//       );
//       console.log(response.data);
//       socket.emit("newMessage", response.data);
//       console.log("Emited the new message to backend");
//       setInputValue("");
//     } catch (error) {
//       console.log("Could not create message due to : ", error);
//     }
//   };

//   useEffect(() => {
//     if (messages) {
//       setDatabaseMessages(messages);
//     }
//   }, [messages]);

//   return (
//     <div>
//       <h2>Messages</h2>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         placeholder="Type your message"
//       />
//       <button onClick={sendMessage}>Send</button>

//       {databaseMessages.length > 0 ? (
//         databaseMessages.map((message, index) => (
//           <div key={index} className="border-t border-gray-400">
//             <p>sender: {message.sender}</p>
//             <p>receiver: {message.receiver}</p>
//             <p>text: {message.text}</p>
//           </div>
//         ))
//       ) : (
//         <div>No Messages</div>
//       )}
//     </div>
//   );
// };

// export default Messaging;
