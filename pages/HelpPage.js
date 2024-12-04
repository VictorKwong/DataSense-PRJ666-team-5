import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, TextField, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChatBot from '../components/ChatBot'; // Import ChatBot component

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chatOpen, setChatOpen] = useState(false);

  const faqs = [
    { question: "Why am I not receiving alerts?", answer: "Ensure your alert thresholds are set correctly in 'Alert Settings'." },
    { question: "What is the ideal temperature range for crops?", answer: "The ideal temperature depends on the crop. For instance, tomatoes thrive in 20°C to 25°C." },
    { question: "How can I reset my password?", answer: "Click on 'Forgot Password' at the login screen and follow the steps to reset it." },
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', position: 'relative', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#007bff' }}>Need Help?</h1>
        <p>Browse FAQs, ask our Support Bot, or send us an email for further assistance.</p>
      </header>

      {/* Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
        <TextField
          variant="outlined"
          placeholder="Search for help..."
          style={{ width: '60%', backgroundColor: '#ffffff', borderRadius: '4px' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          variant="contained"
          style={{
            marginLeft: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            textTransform: 'none',
          }}
        >
          Search
        </Button>
      </div>

      {/* FAQ Section */}
      <section>
        <h2 style={{ color: '#007bff', marginBottom: '20px' }}>Frequently Asked Questions</h2>
        {filteredFaqs.map((faq, index) => (
          <Accordion key={index} style={{ marginBottom: '10px' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ fontWeight: 'bold' }}>
              {faq.question}
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: '#f4f4f4', padding: '15px' }}>{faq.answer}</AccordionDetails>
          </Accordion>
        ))}
        {filteredFaqs.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666' }}>No FAQs found for your query.</p>
        )}
      </section>

      {/* Call-to-Action Section for Support Bot */}
      <section style={{ marginTop: '50px', textAlign: 'center' }}>
        <h2 style={{ color: '#007bff' }}>Ask Our Support Bot</h2>
        <p>Still have questions? Chat with our Support Bot for real-time help.</p>
        <Button
          variant="contained"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            marginTop: '10px',
            textTransform: 'none',
            padding: '10px 20px',
          }}
          onClick={() => setChatOpen(true)}
        >
          Start Chat
        </Button>
      </section>

      {/* Email Us Section */}
      <section style={{ marginTop: '50px', textAlign: 'center' }}>
        <h2 style={{ color: '#007bff' }}>Email Us</h2>
        <p>If you prefer, you can send us an email for further assistance.</p>
        <a
          href="mailto:support@datasense.com"
          style={{
            display: 'inline-block',
            marginTop: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '4px',
            textDecoration: 'none',
            textTransform: 'none',
          }}
        >
          Email Support
        </a>
      </section>

      {/* Chatbot Interface */}
      {chatOpen && <ChatBot onClose={() => setChatOpen(false)} />}

      {/* Floating Chatbot Button (as a fallback) */}
      {!chatOpen && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
          <button
            style={{
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              backgroundColor: '#007bff',
              color: 'white',
              fontSize: '24px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            }}
            onClick={() => setChatOpen(true)}
          >
            💬
          </button>
        </div>
      )}
    </div>
  );
};

export default HelpPage;
