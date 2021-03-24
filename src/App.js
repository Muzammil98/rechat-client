import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

function App() {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [msgs, setMsgs] = useState([]);
  const socket = io("localhost:4000");

  useEffect(() => {
    const user = prompt("Your name?");
    appendMessage("You joined");
    setName(user);
  }, []);

  useEffect(() => {
    socket.emit("new-user", name);
    return () => {
      socket.close();
    };
  }, [name]);
 
  useEffect(() => {
    socket.on("chat-message", (data) => {
      console.log('DTA',data)
      appendMessage(`${data.name}: ${data.message}`);
    });
    socket.on("user-connected", (name) => {
      appendMessage(`${name} connected`);
    });
  
    return () => {
     
      socket.close();
     
    };
  }, [socket]);

  const appendMessage = (message) => {
    setMsgs((prev) => [...prev, message]);
  };
  
 
  const msgEmit = () => {
    const d = new Date();
    const time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    const msg = text + " " + time;
    appendMessage(`You: ${msg}`);

    socket.emit("send-chat-message", msg);
    setText("");
  };
  return (
    <div>
      <h2>Send a hi message</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => msgEmit()}>Send</button>
      
      <code>
        <ul>
          {msgs.map((msg, index) => (
            <li key={index}>{msg.toString()}</li>
          ))}
        </ul>
      </code>
    </div>
  );
}

export default App;
