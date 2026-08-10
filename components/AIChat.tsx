import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Minimize2, Loader2 } from 'lucide-react';
import { streamGeminiResponse } from '../services/geminiService';
import { ChatMessage, ChatSender } from '../types';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi! I'm JARVIS, Anurag's AI Assistant. Ask me anything about his skills, experience, or projects!",
      sender: ChatSender.SYSTEM,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Hide prompt when chat is opened
  useEffect(() => {
    if (isOpen) {
      setShowPrompt(false);
    }
  }, [isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: ChatSender.USER,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Prepare history for context
      const history = messages
        .filter(m => m.sender !== ChatSender.SYSTEM)
        .map(m => ({
          role: m.sender === ChatSender.USER ? 'user' : 'ai',
          content: m.text
        }));

      // Create placeholder for AI response
      const aiMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: aiMsgId,
        text: '',
        sender: ChatSender.AI,
        timestamp: new Date()
      }]);

      const streamResult = await streamGeminiResponse(history, userMsg.text);

      let fullText = '';
      for await (const chunk of streamResult) {
        const text = chunk.text;
        if (text) {
          fullText += text;
          setMessages(prev => prev.map(msg =>
            msg.id === aiMsgId ? { ...msg, text: fullText } : msg
          ));
        }
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "I'm having trouble connecting to my brain right now. Please try again later.",
        sender: ChatSender.SYSTEM,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Animated Prompt Tooltip */}
      {showPrompt && !isOpen && (
        <div className="fixed bottom-24 right-6 z-40 animate-bounce">
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow-xl flex items-center gap-2 relative">
            <Bot className="w-4 h-4" />
            <span className="font-medium text-sm whitespace-nowrap">Ask JARVIS!</span>
            <button
              onClick={() => setShowPrompt(false)}
              className="ml-2 hover:bg-white/20 rounded-full p-0.5 transition-colors"
              aria-label="Dismiss prompt"
            >
              <X className="w-3 h-3" />
            </button>
            {/* Arrow pointing to button */}
            <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-purple-600"></div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button with Pulse Animation */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && showPrompt && (
          <span className="absolute inset-0 rounded-full bg-primary-400 animate-ping opacity-75"></span>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${isOpen ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rotate-90' : 'bg-primary-600 text-white hover:bg-primary-500'
            }`}
          aria-label="Toggle AI Chat"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
      </div>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[500px] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl z-50 flex flex-col border border-slate-200 dark:border-slate-700 transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
          }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100">JARVIS</h3>
              <p className="text-xs text-primary-600 dark:text-primary-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Online
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <Minimize2 className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2 ${msg.sender === ChatSender.USER ? 'flex-row-reverse' : 'flex-row'
                }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.sender === ChatSender.USER ? 'bg-slate-200 dark:bg-slate-600' :
                  msg.sender === ChatSender.SYSTEM ? 'bg-slate-200 dark:bg-slate-700' : 'bg-primary-600'
                  }`}
              >
                {msg.sender === ChatSender.USER ? <User className="w-4 h-4 text-slate-700 dark:text-slate-200" /> : <Bot className="w-4 h-4 text-white" />}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${msg.sender === ChatSender.USER
                  ? 'bg-primary-600 text-white rounded-br-none'
                  : msg.sender === ChatSender.SYSTEM
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-bl-none'
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-slate-500 text-sm ml-10">
              <Loader2 className="w-4 h-4 animate-spin" /> Thinking...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 rounded-b-2xl">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about Anurag's experience..."
              className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-full py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all border border-slate-200 dark:border-slate-700"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-500 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};