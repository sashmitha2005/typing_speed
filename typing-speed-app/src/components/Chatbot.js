import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [showChat, setShowChat] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      // Add user message to chat
      setMessages([...messages, { text: input, user: true }]);
      setInput('');
      setLoading(true);

      try {
        // Call the API to get chatbot response
        const response = await axios.post(
          'https://api.openai.com/v1/completions',
          {
            model: 'text-davinci-003', // Ensure the model is correct
            prompt: `You are a typing speed expert. The user asked: "${input}". Provide a helpful response.`,
            max_tokens: 150,
            temperature: 0.7, // Adjust temperature for creativity
          },
          {
            headers: {
              'Authorization': `Bearer YOUR_API_KEY`,
              'Content-Type': 'application/json'
            }
          }
        );

        // Check if the response contains choices and text
        if (response.data.choices && response.data.choices.length > 0) {
          setMessages([...messages, { text: input, user: true }, { text: response.data.choices[0].text.trim(), user: false }]);
        } else {
          setMessages([...messages, { text: input, user: true }, { text: 'I did not understand your question. Can you please rephrase it?', user: false }]);
        }
      } catch (error) {
        console.error('Error fetching response from API:', error);
        setMessages([...messages, { text: input, user: true }, { text: 'Sorry, I am having trouble understanding that. Can you try another question?', user: false }]);
      }

      setLoading(false);
    }
  };

  return (
    <div className={`chatbot ${showChat ? 'show' : 'hide'}`}>
      <div className="chatbot-header" onClick={() => setShowChat(!showChat)}>
        <h3>Chatbot</h3>
      </div>
      <div className="chatbot-body">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.user ? 'user' : 'bot'}`}>
              {msg.text}
            </div>
          ))}
          {loading && <div className="chat-message bot">...typing</div>}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
