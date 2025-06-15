import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ChatMessage({ message }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isUser = message.sender === 'user';
  const isLongMessage = message.text.length > 300;

  const formatMessage = (text) => {
    // Simple markdown-like formatting
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-bg-3 px-1 py-0.5 rounded text-cyan">$1</code>')
      .replace(/\n/g, '<br/>');
  };

  const displayText = isLongMessage && !isExpanded 
    ? message.text.substring(0, 300) + '...'
    : message.text;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex items-start space-x-3 max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <motion.div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser 
              ? 'bg-gradient-to-r from-blue to-purple' 
              : message.isError
                ? 'bg-gradient-to-r from-red to-red-bg'
                : 'bg-gradient-to-r from-green to-cyan'
          }`}
          whileHover={{ scale: 1.1 }}
        >
          {isUser ? (
            <svg className="w-4 h-4 text-bg-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4 text-bg-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              <circle cx="9" cy="12" r="1"/>
              <circle cx="12" cy="12" r="1"/>
              <circle cx="15" cy="12" r="1"/>
            </svg>
          )}
        </motion.div>

        {/* Message Content */}
        <motion.div
          className={`rounded-lg p-4 ${
            isUser
              ? 'bg-gradient-to-r from-blue-bg to-purple-bg border border-blue'
              : message.isError
                ? 'bg-red-bg border border-red'
                : 'bg-bg-2 border border-green'
          }`}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div 
            className={`text-text-1 font-space text-sm leading-relaxed ${
              isUser ? 'text-right' : 'text-left'
            }`}
            dangerouslySetInnerHTML={{ __html: formatMessage(displayText) }}
          />
          
          {isLongMessage && (
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-cyan hover:text-green transition-colors duration-200 text-sm font-space"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </motion.button>
          )}
          
          <div className={`text-xs text-text-1 opacity-60 mt-2 ${isUser ? 'text-right' : 'text-left'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}