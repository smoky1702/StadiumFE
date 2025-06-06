import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Xin chào! Tôi là Mi247 Bot, bạn cần hỗ trợ gì?', sender: 'bot', sourceType: 'greeting' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState([]);
  const [lastTopic, setLastTopic] = useState('');
  const messagesEndRef = useRef(null);
  const accessToken = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId') || '';
  const isLoggedIn = !!accessToken;

  // Tự động cuộn đến tin nhắn mới nhất
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Đóng chat khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      const chatContainer = document.querySelector('.chatbot-container');
      const chatButton = document.querySelector('.chat-toggle-button');
      
      if (isOpen && chatContainer && chatButton &&
          !chatContainer.contains(event.target) && 
          !chatButton.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    // Cập nhật ngữ cảnh hội thoại
    const lastMessages = messages.slice(-3).map(msg => msg.text);
    const updatedContext = [...lastMessages, input];
    setConversationContext(updatedContext);

    try {
      // Gọi API backend với Gemini AI
      const res = await axios.post(
        'https://stadiumbe.onrender.com/api/chatbot/query',
        {
          query: input,
          user_id: userId,
          conversation_context: updatedContext
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      const botReply = res.data.result.answer || 'Xin lỗi, tôi không hiểu câu hỏi của bạn.';
      const typingTime = Math.min(botReply.length * 20, 1500);
      
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { 
          text: botReply, 
          sender: 'bot',
          sourceType: res.data.result.sourceType || 'unknown'
        }]);
        
        // Log để debug
        if (res.data.result.sourceType === 'gemini_ai') {
          console.log('✅ Phản hồi từ Gemini AI');
        } else {
          console.log('⚠️ Fallback về rule-based system');
        }
      }, typingTime);

    } catch (err) {
      console.error('Lỗi khi gọi API chatbot:', err);
      setTimeout(() => {
        setIsTyping(false);
        
        let errorMessage = 'Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau.';
        
        if (err.response && err.response.status === 401) {
          errorMessage = 'Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại để tiếp tục.';
        }
        
        setMessages((prev) => [...prev, { 
          text: errorMessage, 
          sender: 'bot' 
        }]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  // Điều hướng đến trang đăng nhập và đóng chat
  const handleNavigateToLogin = () => {
    setIsOpen(false);
  };

  // Điều hướng đến trang đăng ký và đóng chat
  const handleNavigateToRegister = () => {
    setIsOpen(false);
  };

  // Nếu chưa đăng nhập, hiển thị một giao diện đơn giản yêu cầu đăng nhập
  if (!isLoggedIn) {
    return (
      <div>
        <div className="chat-toggle-button" onClick={toggleChat}>
          💬
        </div>

        {isOpen && (
          <div className="chatbot-container">
            <div className="chatbot-header">
              <span>Mi24/7 Chat AI</span>
              <button className="close-btn" onClick={toggleChat}>×</button>
            </div>
            <div className="chatbot-messages login-required">
              <div className="chatbot-message bot">
                <p>Vui lòng đăng nhập để sử dụng tính năng chat hỗ trợ!</p>
                <div className="login-buttons">
                  <button 
                    className="login-button" 
                    onClick={() => {
                      document.querySelector('button.navbar-action-button:nth-child(2)').click();
                      setIsOpen(false);
                    }}
                  >
                    Đăng nhập
                  </button>
                  <button 
                    className="register-button"
                    onClick={() => {
                      document.querySelector('button.navbar-action-button:nth-child(1)').click();
                      setIsOpen(false);
                    }}
                  >
                    Đăng ký
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="chat-toggle-button" onClick={toggleChat}>
        💬
      </div>

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <span>Mi24/7 Chat AI</span>
            <button className="close-btn" onClick={toggleChat}>×</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-message ${msg.sender} ${
                msg.sender === 'bot' && msg.sourceType === 'gemini_ai' ? 'ai-response' : 
                msg.sender === 'bot' && msg.sourceType && msg.sourceType !== 'greeting' && msg.sourceType !== 'gemini_ai' ? 'rule-based' : ''
              }`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="chatbot-message bot typing">
                <span className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button onClick={sendMessage}>Gửi</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
