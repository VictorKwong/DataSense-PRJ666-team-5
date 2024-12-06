import React, { useState } from 'react';

const ChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hi! I am the DataSense Bot. How can I assist you today?", sender: "bot" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for "Typing..." animation

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user's message to the chat
    const userMessage = { text: userInput, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput(""); // Clear input field
    setLoading(true); // Show "Typing..." animation

    try {
      // Call the API to get a response
      const response = await fetch('/api/nlp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();
      const botMessage = { text: data.reply || "I didn't understand that. Can you rephrase?", sender: "bot" };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error communicating with NLP API:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Oops! Something went wrong. Please try again later.", sender: "bot" },
      ]);
    } finally {
      setLoading(false); // Remove "Typing..." animation
    }
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
      {/* Header */}
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
        <h3 style={{ margin: 0 }}>DataSense Bot</h3>
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

      {/* Chat Messages */}
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
        {loading && (
          <div
            style={{
              textAlign: 'center',
              margin: '10px 0',
              fontStyle: 'italic',
              color: '#888',
            }}
          >
            Typing...
          </div>
        )}
      </div>

      {/* Input Area */}
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
          disabled={loading} // Disable input while bot is typing
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
          disabled={loading} // Disable button while bot is typing
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
