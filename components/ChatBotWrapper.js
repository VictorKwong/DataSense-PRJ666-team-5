import React, { useState } from 'react';
import ChatBot from './ChatBot'; // Import your existing ChatBot component

const ChatBotWrapper = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {/* Floating Button to Toggle Chatbot */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
        <button
          style={{
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            backgroundColor: '#007bff',
            color: '#ffffff',
            fontSize: '24px',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => setChatOpen(!chatOpen)}
        >
          💬
        </button>
      </div>

      {/* ChatBot Component */}
      {chatOpen && <ChatBot onClose={() => setChatOpen(false)} />}
    </>
  );
};

export default ChatBotWrapper;
