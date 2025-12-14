'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaCommentDots } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Show tooltip after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowTooltip(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Hide tooltip when chat is opened
  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-chat-password': process.env.NEXT_PUBLIC_CHAT_PASSWORD ?? '',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = (await response.json()) as { choices?: { message: { content: string } }[] };
      const choice = data.choices?.[0];

      if (choice) {
        const botMessage: Message = {
          role: 'assistant',
          content: choice.message.content,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        console.error('Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-4 mr-2 bg-white text-black px-4 py-2 rounded-xl shadow-lg relative cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="font-medium text-sm">Got questions?</div>
            {/* Triangle pointer */}
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[350px] h-[500px] bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white">
                  <FaRobot />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Pepe</h3>
                  <p className="text-xs text-white/70">Ask me anything about Johnny</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col overflow-hidden bg-gray-900 relative">
              {!hasConsent ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-gray-900">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 text-2xl">
                    <FaCommentDots />
                  </div>
                  <h4 className="text-white font-bold mb-2">Start a Conversation</h4>
                  <p className="text-gray-300 text-sm mb-6">
                    To chat with Pepe, please accept that your messages will be sent to OpenAI for processing.
                  </p>
                  <button
                    onClick={() => setHasConsent(true)}
                    className="bg-primary hover:bg-primaryHover text-white px-6 py-2 rounded-full text-sm font-medium transition-colors w-full"
                  >
                    I Accept
                  </button>
                </div>
              ) : (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    {messages.length === 0 && (
                      <div className="text-center text-gray-400 text-sm mt-8">
                        <p>👋 Hi! I&apos;m Pepe.</p>
                        <p>Ask me about Johnny&apos;s projects, skills, or experience.</p>
                      </div>
                    )}
                    {messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${
                          msg.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                            msg.role === 'user'
                              ? 'bg-primary text-white rounded-br-none'
                              : 'bg-darkGray text-white rounded-bl-none'
                          }`}
                        >
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                              ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
                              li: ({ children }) => <li className="mb-1">{children}</li>,
                              a: ({ href, children }) => (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="underline hover:text-gray-300"
                                >
                                  {children}
                                </a>
                              ),
                              strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                              code: ({ children }) => (
                                <code className="bg-black/20 rounded px-1 py-0.5 font-mono text-xs">
                                  {children}
                                </code>
                              ),
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-darkGray rounded-2xl rounded-bl-none px-4 py-3 flex gap-1">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <form
                    onSubmit={handleSendMessage}
                    className="p-4 border-t border-gray-800 bg-gray-900"
                  >
                    <div className="relative">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your question..."
                        className="w-full bg-gray-800 text-white rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-gray-500"
                      />
                      <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primaryHover transition-colors"
                      >
                        <FaPaperPlane size={12} />
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary hover:bg-primaryHover text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-colors relative z-50"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaTimes />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaRobot />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
