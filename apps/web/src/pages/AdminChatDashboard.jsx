import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { MessageSquare, Send, Search, LogOut, Loader2, AlertCircle } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AdminChatDashboard = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [sessions, setSessions] = useState([]);
  const [sessionPreviews, setSessionPreviews] = useState({});
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [replyInput, setReplyInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let interval;
    const fetchData = async () => {
      try {
        // 1. Fetch chat sessions (max 50, newest first)
        const sessionsRes = await pb.collection('chat_sessions').getList(1, 50, {
          sort: '-lastMessageAt',
          $autoCancel: false
        });
        
        // 2. Fetch recent messages to build previews for the sidebar
        const recentMsgsRes = await pb.collection('chat_messages').getList(1, 100, {
          sort: '-createdAt',
          $autoCancel: false
        });
        
        const previews = {};
        recentMsgsRes.items.forEach(msg => {
          if (!previews[msg.sessionId]) {
            previews[msg.sessionId] = msg.message;
          }
        });
        
        setSessionPreviews(previews);
        setSessions(sessionsRes.items);

        // 3. Fetch messages for the currently selected session (max 100, chronological)
        if (activeSessionId) {
          const msgRes = await pb.collection('chat_messages').getList(1, 100, {
            filter: `sessionId="${activeSessionId}"`,
            sort: 'createdAt',
            $autoCancel: false
          });
          setMessages(msgRes.items);
        }
        
        setIsLoading(false);
        setError(null);
      } catch (err) {
        console.error('Admin Dashboard Polling Error:', err);
        // Only set error if we don't have existing data to avoid flickering
        if (sessions.length === 0) {
          setError('Failed to load chat data. Retrying...');
        }
      }
    };

    // Initial fetch
    fetchData();
    
    // Set up 2-second polling interval
    interval = setInterval(fetchData, 2000);
    
    // Clean up on unmount
    return () => clearInterval(interval);
  }, [activeSessionId, sessions.length]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyInput.trim() || !activeSessionId || isSending) return;

    const messageText = replyInput.trim();
    setReplyInput('');
    setIsSending(true);

    const payload = {
      sessionId: activeSessionId,
      message: messageText,
      senderType: 'admin'
    };

    // Optimistic UI update
    const tempId = Date.now().toString();
    setMessages(prev => [...prev, {
      id: tempId,
      ...payload,
      senderName: currentUser?.name || 'Admin',
      createdAt: new Date().toISOString(),
      isOptimistic: true
    }]);

    try {
      const res = await apiServerClient.fetch('/chat/admin/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to send reply');
      }
      // The 2-second polling will automatically fetch the officially persisted message
    } catch (err) {
      console.error('Failed to send reply:', err);
      toast.error(err.message || 'Failed to send reply');
      // Rollback optimistic update
      setMessages(prev => prev.filter(m => m.id !== tempId));
    } finally {
      setIsSending(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return 'No messages yet';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const filteredSessions = sessions.filter(s => 
    (s.customerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.sessionId || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeSession = sessions.find(s => s.sessionId === activeSessionId);

  return (
    <>
      <Helmet>
        <title>Admin Chat Dashboard | Support</title>
      </Helmet>

      <div className="h-screen bg-slate-50 flex flex-col overflow-hidden font-sans">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2 rounded-lg">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Support Dashboard</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-600 hover:text-red-600 font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Sidebar */}
          <div className="w-80 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
            <div className="p-4 border-b border-slate-100">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search customers or ID..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 rounded-lg text-sm outline-none transition-all text-slate-900"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {error && (
                <div className="p-3 m-3 bg-red-50 text-red-600 rounded-lg flex items-start gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}
              
              {isLoading && sessions.length === 0 ? (
                <div className="p-8 text-center text-slate-500 flex flex-col items-center">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-900 mb-2" />
                  <span className="text-sm">Loading sessions...</span>
                </div>
              ) : filteredSessions.length === 0 ? (
                <div className="p-6 text-center text-slate-500 text-sm">
                  No active conversations found.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {filteredSessions.map(session => (
                    <button
                      key={session.id}
                      onClick={() => setActiveSessionId(session.sessionId)}
                      className={`w-full text-left p-4 hover:bg-slate-50 transition-colors flex gap-3 ${activeSessionId === session.sessionId ? 'bg-slate-50 border-l-4 border-l-slate-900' : 'border-l-4 border-l-transparent'}`}
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 font-bold">
                        {(session.customerName || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-semibold text-slate-900 truncate pr-2">{session.customerName || 'Unknown'}</h3>
                          <span className="text-xs text-slate-400 whitespace-nowrap">
                            {session.lastMessageAt ? new Date(session.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mb-1 text-[10px] uppercase tracking-wider font-mono">ID: {session.sessionId.substring(0, 8)}...</p>
                        <p className="text-xs text-slate-600 truncate">
                          {truncateText(sessionPreviews[session.sessionId])}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-slate-50">
            {activeSessionId ? (
              <>
                {/* Chat Header */}
                <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between shadow-sm z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-lg">
                      {(activeSession?.customerName || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-900">{activeSession?.customerName || 'Unknown Customer'}</h2>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-emerald-600 font-medium flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          Active Session
                        </span>
                        <span className="text-slate-300">|</span>
                        <span className="text-slate-500 font-mono">ID: {activeSession?.sessionId}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {isLoading && messages.length === 0 ? (
                     <div className="flex justify-center py-8">
                       <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                     </div>
                  ) : messages.length === 0 ? (
                     <div className="text-center py-8 text-slate-500 text-sm">
                       No messages in this conversation yet.
                     </div>
                  ) : (
                    messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.senderType === 'admin' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xl p-4 rounded-2xl shadow-sm ${
                          msg.senderType === 'admin' 
                            ? 'bg-slate-900 text-white rounded-tr-none' 
                            : 'bg-white border border-slate-200 text-slate-900 rounded-tl-none'
                        } ${msg.isOptimistic ? 'opacity-70' : 'opacity-100'}`}>
                          <div className={`text-[11px] font-semibold tracking-wide uppercase mb-1 ${msg.senderType === 'admin' ? 'text-slate-400' : 'text-slate-500'}`}>
                            {msg.senderType === 'admin' ? (msg.senderName || 'Support Admin') : (msg.senderName || activeSession?.customerName || 'Customer')}
                          </div>
                          <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                          <div className={`text-[10px] mt-2 text-right font-medium ${msg.senderType === 'admin' ? 'opacity-70 text-slate-300' : 'opacity-50 text-slate-500'}`}>
                            {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Sending...'}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Reply Input */}
                <div className="bg-white p-4 border-t border-slate-200">
                  <form onSubmit={handleSendReply} className="max-w-4xl mx-auto flex gap-3">
                    <input
                      type="text"
                      placeholder="Type your reply to the customer..."
                      value={replyInput}
                      onChange={(e) => setReplyInput(e.target.value)}
                      disabled={isSending}
                      className="flex-1 px-4 py-3 bg-slate-100 border-transparent focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 rounded-xl text-slate-900 outline-none transition-all disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={!replyInput.trim() || isSending}
                      className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm"
                    >
                      <span>{isSending ? 'Sending...' : 'Send'}</span>
                      {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-medium text-slate-600 mb-2">No Conversation Selected</h3>
                <p>Select a customer from the sidebar to view messages and reply.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default AdminChatDashboard;