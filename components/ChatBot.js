import React, { useState } from 'react';

const ChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I assist you today?", sender: "bot" },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user's message to the chat
    const userMessage = { text: userInput, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Send the user's message to the API
      const response = await fetch('/api/dialogflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await response.json();

      // Add the bot's response to the chat
      const botMessage = { text: data.reply || "I'm sorry, I didn't understand that.", sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error communicating with API:", error);
      const errorMessage = { text: "Something went wrong. Please try again later.", sender: "bot" };
      setMessages((prev) => [...prev, errorMessage]);
    }

    // Clear the input field
    setUserInput("");
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        width: '350px',
        height: '500px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
      }}
    >
      <header
        style={{
          backgroundColor: '#007bff',
          color: '#ffffff',
          padding: '10px 15px',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3 style={{ margin: 0 }}>Support Bot</h3>
        <button
          onClick={onClose}
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            color: '#ffffff',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          ✖
        </button>
      </header>
      <div
        style={{
          flex: 1,
          padding: '10px',
          overflowY: 'auto',
          backgroundColor: '#f4f4f4',
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: msg.sender === "bot" ? "flex-start" : "flex-end",
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                maxWidth: '70%',
                padding: '10px',
                borderRadius: '12px',
                backgroundColor: msg.sender === "bot" ? "#ffffff" : "#007bff",
                color: msg.sender === "bot" ? "#000000" : "#ffffff",
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                wordWrap: 'break-word',
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          padding: '10px',
          borderTop: '1px solid #ddd',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '20px',
            border: '1px solid #ccc',
            marginRight: '10px',
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            padding: '10px 15px',
            borderRadius: '20px',
            backgroundColor: '#007bff',
            color: '#ffffff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
