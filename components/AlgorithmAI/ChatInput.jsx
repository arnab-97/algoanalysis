import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ChatInput({ onSendMessage, isLoading }) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  return (
    <div className="border-t-2 border-border-1 bg-bg-2 p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about algorithms..."
            className="w-full bg-bg-3 border-2 border-border-1 rounded-lg px-4 py-3 text-text-1 font-space resize-none focus:border-green focus:outline-none transition-colors duration-200 min-h-[50px] max-h-[120px]"
            disabled={isLoading}
            rows={1}
          />
          
          {/* Character count */}
          <div className="absolute bottom-1 right-2 text-xs text-text-1 opacity-50">
            {message.length}/1000
          </div>
        </div>
        
        <motion.button
          type="submit"
          disabled={!message.trim() || isLoading}
          className={`p-3 rounded-lg transition-all duration-200 ${
            message.trim() && !isLoading
              ? 'bg-gradient-to-r from-green to-cyan text-bg-1 hover:shadow-lg'
              : 'bg-bg-3 text-text-1 opacity-50 cursor-not-allowed'
          }`}
          whileHover={message.trim() && !isLoading ? { scale: 1.05 } : {}}
          whileTap={message.trim() && !isLoading ? { scale: 0.95 } : {}}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </motion.div>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </motion.button>
      </form>
      
      <div className="mt-2 text-xs text-text-1 opacity-60 text-center">
        Press Enter to send, Shift+Enter for new line
      </div>
    </div>
  );
}