import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import WelcomeScreen from './WelcomeScreen';

export default function AlgorithmAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch('/api/algorithm-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      setIsTyping(false);
      
      const aiMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      setIsTyping(false);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: 'ai',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const suggestedQuestions = [
    "Explain how bubble sort works",
    "What's the difference between DFS and BFS?",
    "How does binary search achieve O(log n)?",
    "When should I use dynamic programming?",
    "Explain time complexity with examples"
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-green to-cyan rounded-full shadow-lg flex items-center justify-center text-bg-1 hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            "0 0 20px rgba(30, 254, 91, 0.3)",
            "0 0 30px rgba(30, 254, 91, 0.5)",
            "0 0 20px rgba(30, 254, 91, 0.3)"
          ]
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L1 22l5.65-2.05C8.96 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.4 0-2.76-.3-4-.85L6 20l.85-2C6.3 16.76 6 15.4 6 14c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
          <circle cx="9" cy="12" r="1"/>
          <circle cx="12" cy="12" r="1"/>
          <circle cx="15" cy="12" r="1"/>
        </svg>
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-4xl h-[80vh] bg-bg-1 border-2 border-border-1 rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <ChatHeader onClose={() => setIsOpen(false)} onClear={clearChat} />
                
                <div className="flex-1 overflow-hidden">
                  {messages.length === 0 ? (
                    <WelcomeScreen 
                      onQuestionClick={sendMessage}
                      suggestedQuestions={suggestedQuestions}
                    />
                  ) : (
                    <div className="h-full overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <ChatMessage key={message.id} message={message} />
                      ))}
                      
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center space-x-2 text-text-1"
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green to-cyan flex items-center justify-center">
                            <svg className="w-4 h-4 text-bg-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                              <circle cx="9" cy="12" r="1"/>
                              <circle cx="12" cy="12" r="1"/>
                              <circle cx="15" cy="12" r="1"/>
                            </svg>
                          </div>
                          <div className="flex space-x-1">
                            <motion.div
                              className="w-2 h-2 bg-green rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-green rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-green rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            />
                          </div>
                          <span className="text-sm text-text-1">AI is thinking...</span>
                        </motion.div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>

                <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}