import axios from "axios";
import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import "./ChatGpt.css";

function ChatGpt() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a request to the server with the prompt
    axios
      .post("/chat", { prompt })
      .then((res) => {
        // Update the response state with the server's response
        console.log(res.data)
        setResponse(res.data);
        const chatMsg = document.createElement('div');
        chatMsg.classList.add('message');
        chatMsg.textContent = res.data;
        chatlog.appendChild(chatMsg);
        message.value = '';
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const chatlog = document.getElementById('chatlog');
  const message = document.getElementById('message');
  const sendBtn = document.getElementById('send');

  sendBtn?.addEventListener('click', () => {
    const msg = message.value;
    if (msg.trim()) {
      const chatMsg = document.createElement('div');
      chatMsg.classList.add('message');
      chatMsg.textContent = msg;
      chatlog.appendChild(chatMsg);
      message.value = '';
    }
  });

  message?.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      sendBtn.click();
    }
  });

  return (
    <div className="wrapper">
      <img className="logo" src="https://logowik.com/content/uploads/images/openai-chatgpt-4038641.logowik.com.webp"/>
      <form onSubmit={handleSubmit}>
        <input
          className="wrapper2"
          type="text"
          value={prompt}
          placeholder="Search.."
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className="button2" type="submit" >Submit</button>
      </form>
      <p style={{marginTop: 10, marginBottom: 10}}>Response:</p>
      <p>{response}</p>
    </div>
  );
  // return (
  //   <div id="chatbox">
  //     <div id="chatlog"></div>
  //     <input type="text" id="message" />
  //     <button onClick={handleSubmit} id="send">Send</button>
  //   </div>
  // );
}

export default withRouter(ChatGpt);
