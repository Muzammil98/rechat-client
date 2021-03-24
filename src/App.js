import React,{useState} from 'react'
import { io } from "socket.io-client";

function App() {
  const [msgs, setMsgs] = useState([])
  const socket = io("localhost:4000");

  socket.on('message',(message)=>{
   setMsgs((prev) => [...prev,message])
    console.log(msgs)

  })

  const msgEmit = () => {
      socket.emit('message','HI')
  }
  return (
    <div>
      Hello world
      <button onClick={()=>msgEmit()}>Send</button>
      <code>{JSON.stringify(msgs)}</code>
    </div>
  );
}

export default App;
