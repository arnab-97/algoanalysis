import { motion } from 'framer-motion';

export default function ChatHeader({ onClose, onClear }) {
  return (
    <div className="bg-gradient-to-r from-green-bg to-cyan-bg border-b-2 border-border-1 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <motion.div
            className="w-10 h-10 rounded-full bg-gradient-to-r from-green to-cyan flex items-center justify-center"
            animate={{
              boxShadow: [
                "0 0 10px rgba(30, 254, 91, 0.3)",
                "0 0 20px rgba(30, 254, 91, 0.5)",
                "0 0 10px rgba(30, 254, 91, 0.3)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg className="w-6 h-6 text-bg-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              <path d="M8 12h8M12 8v8"/>
            </svg>
          </motion.div>
          <div>
            <h3 className="text-text-1 font-space text-lg font-bold">Algorithm AI Assistant</h3>
            <p className="text-green text-sm">Powered by Gemini 2.0 Flash</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={onClear}
            className="p-2 text-text-1 hover:text-red hover:bg-red-bg rounded-lg transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Clear Chat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </motion.button>
          
          <motion.button
            onClick={onClose}
            className="p-2 text-text-1 hover:text-red hover:bg-red-bg rounded-lg transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
}