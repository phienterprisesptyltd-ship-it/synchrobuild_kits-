import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import apiServerClient from '@/lib/apiServerClient.js';
import { Button } from '@/components/ui/button.jsx';
import { toast } from 'sonner';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [hasName, setHasName] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let sid = localStorage.getItem('chatSessionId');
    if (!sid) {
      sid = crypto.randomUUID();
      localStorage.setItem('chatSessionId', sid);
    }
    setSessionId(sid);

    const savedName = localStorage.getItem('chatCustomerName');
    if (savedName) {
      setCustomerName(savedName);
      setHasName(true);
    }
  }, []);

  useEffect(() => {
    let interval;
    if (isOpen && hasName && sessionId) {
      const fetchMessages = async () => {
        try {
          const res = await apiServerClient.fetch(`/chat/messages?sessionId=${sessionId}`);
          if (!res.ok) {
            throw new Error(`Error fetching messages: ${res.status} ${res.statusText}`);
          }
          const data = await res.json();
          // Ensure data is an array before setting
          if (Array.isArray(data)) {
            setMessages(data);
          }
        } catch (err) {
          console.error('Failed to fetch messages', err);
        }
      };
      
      fetchMessages();
      interval = setInterval(fetchMessages, 2000);
    }
    return () => clearInterval(interval);
  }, [isOpen, hasName, sessionId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    if (nameInput.trim()) {
      const name = nameInput.trim();
      setCustomerName(name);
      setHasName(true);
      localStorage.setItem('chatCustomerName', name);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!messageInput.trim()) {
      console.warn('Validation failed: Message is empty');
      return;
    }
    if (!sessionId) {
      console.warn('Validation failed: Session ID is missing');
      return;
    }
    if (isSending) {
      return;
    }

    const payload = {
      sessionId,
      message: messageInput.trim(),
      senderType: 'customer',
      customerName: customerName
    };

    console.log('Initiating message send...');
    console.log('Payload being sent:', payload);

    // Save current input to restore it if sending fails
    const currentInput = messageInput;
    setMessageInput('');
    setIsSending(true);

    // Optimistic update
    const tempId = Date.now().toString();
    setMessages(prev => [...prev, {
      id: tempId,
      ...payload,
      createdAt: new Date().toISOString(),
      isOptimistic: true
    }]);

    try {
      const res = await apiServerClient.fetch('/chat/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        // Attempt to parse JSON error, fallback to text, fallback to status
        let errorMsg = `Error: ${res.status} ${res.statusText}`;
        try {
          const errData = await res.json();
          errorMsg = errData.error || errorMsg;
        } catch (jsonErr) {
          try {
            const errText = await res.text();
            if (errText) errorMsg = errText;
          } catch (textErr) {
            // Ignore text parse error
          }
        }
        console.error('API Error Response:', errorMsg);
        throw new Error(errorMsg);
      }
      
      console.log('Message sent successfully!');
    } catch (err) {
      console.error('Message send error caught:', err);
      toast.error(err.message || 'Failed to send message');
      
      // Rollback optimistic update and restore input
      setMessages(prev => prev.filter(m => m.id !== tempId));
      setMessageInput(currentInput);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[350px] h-[500px] shadow-2xl rounded-2xl bg-white flex flex-col overflow-hidden border border-slate-200"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between shadow-sm z-10">
              <div>
                <h3 className="font-bold text-lg leading-none">Support Chat</h3>
                <p className="text-slate-300 text-sm mt-1">We typically reply in minutes</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white transition-colors p-1"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 bg-slate-50 overflow-y-auto p-4 flex flex-col gap-3">
              {!hasName ? (
                <div className="h-full flex flex-col justify-center items-center text-center px-4">
                  <div className="w-12 h-12 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-slate-900 font-bold mb-2">Welcome!</h4>
                  <p className="text-slate-500 text-sm mb-6">Please enter your name to start chatting with our team.</p>
                  <form onSubmit={handleNameSubmit} className="w-full space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-slate-900 transition-all"
                      required
                    />
                    <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 rounded-xl font-semibold shadow-sm">
                      Start Chat
                    </Button>
                  </form>
                </div>
              ) : (
                <>
                  {messages.length === 0 ? (
                    <div className="text-center text-slate-500 text-sm my-auto bg-white border border-slate-200 p-4 rounded-xl">
                      Send a message to start the conversation.
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex w-full ${msg.senderType === 'admin' ? 'justify-start' : 'justify-end'}`}
                      >
                        <div className={`p-3 rounded-2xl text-sm leading-relaxed max-w-[85%] shadow-sm ${
                          msg.senderType === 'admin' 
                            ? 'bg-white border border-slate-200 text-slate-900 rounded-tl-none' 
                            : 'bg-slate-900 text-white rounded-tr-none'
                        } ${msg.isOptimistic ? 'opacity-70' : 'opacity-100'}`}>
                          <p>{msg.message}</p>
                          <span className={`text-[10px] mt-1 block font-medium ${msg.senderType === 'admin' ? 'opacity-50 text-slate-500' : 'opacity-80 text-slate-300'}`}>
                            {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Sending...'}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input Area */}
            {hasName && (
              <div className="p-3 bg-white border-t border-slate-200">
                <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    disabled={isSending}
                    className="flex-1 bg-slate-100 border border-transparent focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 rounded-full px-4 py-2.5 text-sm text-slate-900 outline-none transition-all disabled:opacity-50"
                  />
                  <button 
                    type="submit"
                    disabled={!messageInput.trim() || isSending}
                    className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white p-2.5 rounded-full flex-shrink-0 transition-colors shadow-sm"
                  >
                    {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 active:scale-95"
        aria-label="Toggle Chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default ChatWidget;